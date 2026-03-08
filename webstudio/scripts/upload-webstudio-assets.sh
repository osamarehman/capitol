#!/bin/bash
set -euo pipefail

# One-time script: Upload all local webstudio assets to Strapi
# Creates mappings in asset-mappings.json for /assets/filename -> /uploads/strapi_path
# Run once, then use optimize-assets.sh to apply mappings on every deploy

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
PUBLIC_ASSETS="$PROJECT_DIR/public/assets"
MAPPINGS_FILE="$SCRIPT_DIR/asset-mappings.json"
STRAPI_URL="${STRAPI_URL:-http://localhost:1337}"
STRAPI_TOKEN="${STRAPI_TOKEN:-}"

if [ -z "$STRAPI_TOKEN" ]; then
  echo "ERROR: STRAPI_TOKEN required"
  exit 1
fi

if [ ! -d "$PUBLIC_ASSETS" ]; then
  echo "ERROR: No assets directory at $PUBLIC_ASSETS"
  exit 1
fi

# Initialize mappings if needed
if [ ! -f "$MAPPINGS_FILE" ]; then
  echo '{}' > "$MAPPINGS_FILE"
fi

UPLOADED=0
SKIPPED=0
FAILED=0
TOTAL=$(ls -1 "$PUBLIC_ASSETS" | wc -l)

echo "Uploading $TOTAL assets from $PUBLIC_ASSETS to Strapi..."

for asset in "$PUBLIC_ASSETS"/*; do
  [ -f "$asset" ] || continue
  filename=$(basename "$asset")
  asset_path="/assets/$filename"

  # Skip if already mapped
  if python3 -c "import json,sys; d=json.load(open('$MAPPINGS_FILE')); sys.exit(0 if '/assets/$filename' in d else 1)" 2>/dev/null; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Skip files that are from external CDNs (already mapped separately)
  case "$filename" in
    assets-global.website-files.com*|cdn.prod.website-files.com*|res.cloudinary.com*|uploads-ssl.webflow.com*|ik.imagekit.io*)
      SKIPPED=$((SKIPPED + 1))
      continue
      ;;
  esac

  # Upload to Strapi
  strapi_path=$(curl -sf -X POST \
    -H "Authorization: Bearer $STRAPI_TOKEN" \
    -F "files=@$asset" \
    -F "fileInfo={\"name\":\"$filename\"}" \
    "$STRAPI_URL/api/upload" 2>/dev/null | \
    python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['url'] if d else '')" 2>/dev/null || echo "")

  if [ -n "$strapi_path" ]; then
    # Add mapping: /assets/filename -> /uploads/strapi_path
    python3 -c "
import json
d = json.load(open('$MAPPINGS_FILE'))
d['/assets/$filename'] = '$strapi_path'
json.dump(d, open('$MAPPINGS_FILE', 'w'), indent=2)
"
    UPLOADED=$((UPLOADED + 1))
    echo "  [$UPLOADED/$TOTAL] $filename -> $strapi_path"
  else
    FAILED=$((FAILED + 1))
    echo "  FAILED: $filename"
  fi
done

echo ""
echo "Done! Uploaded: $UPLOADED, Skipped: $SKIPPED, Failed: $FAILED"
echo "Total mappings: $(python3 -c "import json; print(len(json.load(open('$MAPPINGS_FILE'))))")"
