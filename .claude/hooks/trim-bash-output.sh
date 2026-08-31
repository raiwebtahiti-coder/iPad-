#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash). Rewrites noisy install/build/test commands
# so their own output is pre-trimmed to error lines + the last 30 lines
# before it ever reaches the model, instead of dumping full logs into context.
# Commands that don't match a noisy pattern pass through unchanged.
set -euo pipefail

input="$(cat)"
command="$(jq -r '.tool_input.command // empty' <<<"$input")"

if [[ -z "$command" ]]; then
  echo '{}'
  exit 0
fi

# Only wrap commands likely to produce noisy output: package installs,
# builds, and test runs. Everything else (cat, git diff, grep, ls, ...)
# passes through untouched so exact output isn't mangled.
noisy_pattern='(^|[;&|[:space:]])(npm|yarn|pnpm|pip3?|cargo|go|mvn|gradle|gradlew|make|docker|pytest|jest|vitest|rspec|tox)([[:space:]].*)?(install|build|test|run)'
if ! [[ "$command" =~ $noisy_pattern ]]; then
  echo '{}'
  exit 0
fi

filter='awk '\''{lines[NR]=$0} END{
  total=NR; start=(total>30)?total-29:1; errn=0;
  for(i=1;i<=total;i++){
    l=tolower(lines[i]);
    if (l ~ /error|exception|fail|traceback|fatal/) { errn++; err[errn]=i }
  }
  if (errn>0) {
    print "--- error lines ---";
    for(i=1;i<=errn;i++) print lines[err[i]];
    print "--- last 30 lines ---";
  }
  for(i=start;i<=total;i++) print lines[i];
}'\'''

wrapped="{ $command
} 2>&1 | $filter; exit \"\${PIPESTATUS[0]}\""

jq -n --arg cmd "$wrapped" \
  '{hookSpecificOutput: {hookEventName: "PreToolUse", permissionDecision: "allow", updatedInput: {command: $cmd}}}'
