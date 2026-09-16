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

echo "dist prêt :"
find "$out" -type f | sed "s|$out/|  |" | sort
