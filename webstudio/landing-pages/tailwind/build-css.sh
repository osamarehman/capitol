#!/bin/bash
set -euo pipefail
# Offline / authoring-time compile of the landing-page Tailwind CSS.
# NOT part of the deploy pipeline — run this manually whenever a landing-page
# .tsx changes, then commit the regenerated styles/*.css output.
#
# Tailwind v4 scans the @source globs declared inside each input CSS and emits
# only the utilities those pages actually use (plus the design tokens + custom
# @utility classes). The committed output is bundled verbatim by `react-router
# build` (via the route's `?url` CSS import) — no Tailwind tooling runs on the
# server.

cd "$(dirname "$0")/.."

# Tailwind CLI needs the `tailwindcss` package resolvable from this dir.
# Install locally on first run (landing-pages/node_modules is gitignored).
if [ ! -x node_modules/.bin/tailwindcss ]; then
  echo "Installing tailwindcss + @tailwindcss/cli locally ..."
  npm install --no-save tailwindcss@4 @tailwindcss/cli@4
fi
TW="node_modules/.bin/tailwindcss"

echo "Compiling community.css ..."
$TW -i styles/community.input.css -o styles/community.css --minify

echo "Compiling slate-roofing.css ..."
$TW -i styles/slate-roofing.input.css -o styles/slate-roofing.css --minify

echo "Done. Sizes:"
ls -lh styles/*.css | awk '{print "  "$5"  "$9}'
