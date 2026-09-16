#!/usr/bin/env bash
# Prepare the folder Netlify publishes: only what the public should receive.
# Working files (BUILD-PLAN.md, .claude, .git, this script) stay out of it.
set -euo pipefail
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out="$root/dist"

rm -rf "$out"
mkdir -p "$out"

cp "$root/index.html" "$root/style.css" "$root/script.js" "$root/robots.txt" "$root/sitemap.xml" "$out/"
cp -r "$root/assets" "$out/assets"

# Notes and placeholders are for the repository, not for the web.
find "$out/assets" -name '*.md' -delete
find "$out/assets" -name '.gitkeep' -delete

# Les en-têtes voyagent avec le dossier publié : ils s'appliquent aussi bien
# à un dépôt-glisser dans Netlify qu'à une mise en ligne par git.
cat > "$out/_headers" <<'HEAD'
# Images, polices et vidéos : elles ne changent pas sans changer de nom.
/assets/*
  Cache-Control: public, max-age=2592000

# La page et le code gardent leur nom : le navigateur revalide et Netlify
# répond 304 si rien n'a bougé, donc une mise en ligne est visible tout de suite.
/index.html
  Cache-Control: public, max-age=0, must-revalidate
/style.css
  Cache-Control: public, max-age=0, must-revalidate
/script.js
  Cache-Control: public, max-age=0, must-revalidate

/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: geolocation=(), microphone=(), camera=()
HEAD

echo "dist prêt :"
find "$out" -type f | sed "s|$out/|  |" | sort
