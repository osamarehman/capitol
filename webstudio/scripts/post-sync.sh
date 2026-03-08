#!/bin/bash
# Post-sync patch: fix CORS font URLs, hydration whitespace, and broken resources
DIR="$(cd "$(dirname "$0")/../app/__generated__" && pwd)"

for f in "$DIR"/*.tsx; do
  # Replace v2.improveitmd.com font URLs with local /fonts/ paths
  sed -i "s|https://v2\.improveitmd\.com/cgi/asset/|/fonts/|g" "$f"

  # Remove whitespace text nodes between head elements (cause hydration errors)
  sed -i 's|{"\\n\\n\\n"}||g; s|{"\\n\\n"}||g; s|{"\\n"}||g' "$f"
done

# Remove resources with empty URLs from server files (prevents "Failed to parse URL" errors)
for f in "$DIR"/*.server.tsx; do
  # Remove Map entries that reference resources with url: ""
  # First find variable names with empty URLs, then remove their Map entries
  while IFS= read -r varname; do
    [ -z "$varname" ] && continue
    # Remove the Map entry line: ["varname", varname],
    sed -i "/\[\"${varname}\", ${varname}\],/d" "$f"
    echo "  removed empty-URL resource '$varname' from $(basename "$f")"
  done < <(grep -B5 'url: ""' "$f" | grep -oP 'const \K\w+(?=: ResourceRequest)')
done

echo "post-sync: patched $(ls "$DIR"/*.tsx | wc -l) generated files"
