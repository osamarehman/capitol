#!/bin/bash
set -euo pipefail

# Optimize assets script - runs after webstudio sync/build, before docker build
# Uses a mappings file to replace external URLs with Strapi URLs
# Run with --upload flag to download new external assets and upload to Strapi
#
# Usage:
#   ./optimize-assets.sh            # Apply existing mappings + fix hydration
#   ./optimize-assets.sh --upload   # Download new externals, upload to Strapi, update mappings

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
GEN_DIR="$PROJECT_DIR/app/__generated__"
PUBLIC_DIR="$PROJECT_DIR/public/assets"
CACHE_DIR="$PROJECT_DIR/.asset-cache"
MAPPINGS_FILE="$PROJECT_DIR/scripts/asset-mappings.json"
STRAPI_URL="${STRAPI_URL:-http://localhost:1337}"
STRAPI_TOKEN="${STRAPI_TOKEN:-}"

UPLOAD_MODE=false
if [[ "${1:-}" == "--upload" ]]; then
  UPLOAD_MODE=true
fi

mkdir -p "$CACHE_DIR" "$PUBLIC_DIR"

log() {
  echo "[optimize] $*"
}

# ============================================================
# STEP 1: Upload new external assets to Strapi (only with --upload)
# ============================================================
if [ "$UPLOAD_MODE" = true ]; then
  log "=== Step 1: Discovering and uploading external assets ==="

  if [ -z "$STRAPI_TOKEN" ]; then
    log "ERROR: STRAPI_TOKEN required for --upload mode"
    exit 1
  fi

  # Initialize mappings file if it doesn't exist
  if [ ! -f "$MAPPINGS_FILE" ]; then
    echo '{}' > "$MAPPINGS_FILE"
  fi

  # Find all external image/asset URLs in generated files
  EXTERNAL_URLS=$(grep -ohP '(https://res\.cloudinary\.com/[^"'\'')\s&\\]+|https://uploads-ssl\.webflow\.com/[^"'\'')\s&\\]+|https://cdn\.prod\.website-files\.com/[^"'\'')\s&\\]+|https://assets-global\.website-files\.com/[^"'\'')\s&\\]+|https://improveitmd\.wstd\.io/cgi/image/[^"'\''?\s&\\]+|https://ik\.imagekit\.io/[^"'\'')\s&\\]+)' "$GEN_DIR"/*.tsx 2>/dev/null | sed 's/\\$//' | sort -u || true)

  NEW_COUNT=0

  for clean_url in $EXTERNAL_URLS; do
    # Skip if already mapped
    if python3 -c "import json; d=json.load(open('$MAPPINGS_FILE')); exit(0 if '$clean_url' in d else 1)" 2>/dev/null; then
      continue
    fi

    # Generate filename from URL
    filename=$(echo "$clean_url" | sed 's|https\?://||; s|[/:?&=]|_|g')
    cached_file="$CACHE_DIR/$filename"

    # Download
    if [ ! -f "$cached_file" ]; then
      log "  Downloading: $clean_url"
      if ! curl -sfL --max-time 30 -o "$cached_file" "$clean_url" 2>/dev/null; then
        log "  WARN: Failed to download, skipping"
        rm -f "$cached_file"
        continue
      fi
      fsize=$(stat -c%s "$cached_file" 2>/dev/null || echo "0")
      if [ "$fsize" -lt 100 ]; then
        log "  WARN: File too small ($fsize bytes), skipping"
        rm -f "$cached_file"
        continue
      fi
    fi

    # Upload to Strapi
    log "  Uploading to Strapi: $filename"
    strapi_path=$(curl -sf -X POST \
      -H "Authorization: Bearer $STRAPI_TOKEN" \
      -F "files=@$cached_file" \
      -F "fileInfo={\"name\":\"$filename\"}" \
      "$STRAPI_URL/api/upload" 2>/dev/null | \
      python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['url'] if d else '')" 2>/dev/null || echo "")

    if [ -n "$strapi_path" ]; then
      new_url="https://improveitmd.com${strapi_path}"
      log "  Mapped: $clean_url -> $new_url"

      # Add to mappings
      python3 -c "
import json
d = json.load(open('$MAPPINGS_FILE'))
d['$clean_url'] = '$new_url'
json.dump(d, open('$MAPPINGS_FILE', 'w'), indent=2)
"
      NEW_COUNT=$((NEW_COUNT + 1))
    else
      log "  WARN: Upload failed for $filename"
    fi
  done

  log "  Uploaded $NEW_COUNT new assets to Strapi"
  log "  Total mappings: $(python3 -c "import json; print(len(json.load(open('$MAPPINGS_FILE'))))")"
fi

# ============================================================
# STEP 2: Apply URL mappings to generated files
# ============================================================
log "=== Step 2: Applying asset URL mappings ==="

if [ -f "$MAPPINGS_FILE" ]; then
  MAPPING_COUNT=$(python3 -c "import json; print(len(json.load(open('$MAPPINGS_FILE'))))")
  if [ "$MAPPING_COUNT" -gt 0 ]; then
    # Generate sed commands from mappings
    python3 -c "
import json, sys
mappings = json.load(open(sys.argv[1]))
for old_url, new_url in mappings.items():
    old_esc = old_url.replace('&', r'\&').replace('.', r'\.')
    new_esc = new_url.replace('&', r'\&')
    print(f's|{old_esc}|{new_esc}|g')
" "$MAPPINGS_FILE" > /tmp/asset-sed-commands.txt

    REPLACED=0
    for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css "$PROJECT_DIR/.webstudio/data.json"; do
      [ -f "$f" ] || continue
      before=$(md5sum "$f" | cut -d' ' -f1)
      sed -i -f /tmp/asset-sed-commands.txt "$f"
      after=$(md5sum "$f" | cut -d' ' -f1)
      if [ "$before" != "$after" ]; then
        REPLACED=$((REPLACED + 1))
      fi
    done
    rm -f /tmp/asset-sed-commands.txt
    log "  Applied $MAPPING_COUNT mappings, modified $REPLACED files"
  else
    log "  No mappings to apply"
  fi
else
  log "  No mappings file found (run with --upload first)"
fi

# Replace cms.improveitmd.com URLs with v2 domain (proxied to local Strapi via Caddy)
# Must use full URL so IPX image proxy can fetch via HTTP (relative paths only check local files)
log "  Replacing cms.improveitmd.com URLs with improveitmd.com/uploads/ paths..."
for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css "$PROJECT_DIR/.webstudio/data.json"; do
  [ -f "$f" ] || continue
  sed -i 's|https://cms\.improveitmd\.com/uploads/|https://improveitmd.com/uploads/|g' "$f"
done

# Also replace wstd.io URLs with local /assets/ paths
log "  Replacing wstd.io image URLs with local assets..."
for f in "$GEN_DIR"/*.tsx; do
  sed -i 's|https://improveitmd\.wstd\.io/cgi/image/\([^"?]*\)\(\.[a-zA-Z]*\)[^"]*|/assets/\1\2|g' "$f"
done

# ============================================================
# STEP 3: Fix hydration issues
# ============================================================
log "=== Step 3: Fixing hydration issues ==="

for f in "$GEN_DIR"/*.tsx; do
  # Remove whitespace text nodes between elements (cause hydration errors)
  sed -i 's|{"\\n\\n\\n"}||g; s|{"\\n\\n"}||g; s|{"\\n"}||g' "$f"
  sed -i 's|>{" "}<|><|g' "$f"
  sed -i 's|{"\n\n\n"}||g; s|{"\n\n"}||g; s|{"\n"}||g' "$f"
  # Remove standalone {" "} lines (multiline whitespace nodes missed by single-line sed)
  sed -i '/^{" "}$/d' "$f"
done

log "  Cleaned whitespace text nodes from $(ls "$GEN_DIR"/*.tsx | wc -l) files"

# Fix undefined concatenation in dynamic pages (e.g. services slug)
# When LocalPagesData fields are null, "string" + undefined = "stringundefined"
log "  Fixing undefined concatenation in dynamic pages..."
CONCAT_FIXES=0
for f in "$GEN_DIR"/*.tsx; do
  before=$(md5sum "$f" | cut -d' ' -f1)

  # Fix URL concatenation: src={"https://..." + data?.field?.url}
  # Add || "" fallback so null fields produce empty string instead of "undefined"
  sed -i -E 's|src=\{"(https?://[^"]+)" \+ ([^}]+)\}|src={"\1" + (\2 \|\| "")}|g' "$f"

  # Fix non-src URL concatenation (e.g. socialImageUrl, href): "https://..." + data?.chain,
  perl -i -pe 's/"(https?:\/\/[^"]+)" \+ ([A-Za-z][\w?.\[\]]*),/"$1" + ($2 || ""),/g' "$f"

  # Fix text concatenation: {"text " + data?.field + " more text"}
  # Pattern: "literal" + expression + "literal" or "literal" + expression (end)
  # Use perl for more complex replacements
  perl -i -pe '
    # Fix: {"text" + data?.chain + "text"} -> {"text" + (data?.chain || "") + "text"}
    s/\{"([^"]*)" \+ ((?:(?!\|\|)[^+}])+?) \+ "([^"]*)"\}/{"$1" + ($2 || "") + "$3"}/g;
    # Fix: {"text" + data?.chain} -> {"text" + (data?.chain || "")}
    s/\{"([^"]*)" \+ ((?:(?!\|\||\+ ")[^}])+?)\}/{"$1" + ($2 || "")}/g;
  ' "$f"

  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    CONCAT_FIXES=$((CONCAT_FIXES + 1))
  fi
done
log "  Fixed undefined concatenation in $CONCAT_FIXES files"

# Remove clientOnly from style-only HtmlEmbeds (CSS is safe to SSR, reduces hydration mismatches)
# The code prop is a single-line string with \n escapes, e.g. code={"<style>\n..."}\nclientOnly={true}
# Only remove clientOnly when code starts with <style> and has no <script> tags
log "  Removing clientOnly from style-only HtmlEmbeds..."
STYLE_FIXES=0
for f in "$GEN_DIR"/*.tsx; do
  before=$(md5sum "$f" | cut -d' ' -f1)
  perl -i -pe '
    if (/^code=\{"<style>/ && !/<script/ && /"\}\s*$/) {
      $style_line = 1;
    } elsif ($style_line && /^clientOnly=\{true\}/) {
      $_ = "";  # Remove the clientOnly line
      $style_line = 0;
    } else {
      $style_line = 0;
    }
  ' "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    STYLE_FIXES=$((STYLE_FIXES + 1))
  fi
done
log "  Removed clientOnly from style-only embeds in $STYLE_FIXES files"

# ============================================================
# STEP 4: Remove resources with empty URLs
# ============================================================
log "=== Step 4: Removing empty-URL resources ==="

for f in "$GEN_DIR"/*.server.tsx; do
  while IFS= read -r varname; do
    [ -z "$varname" ] && continue
    sed -i "/\[\"${varname}\", ${varname}\],/d" "$f"
    log "  Removed empty-URL resource '$varname' from $(basename "$f")"
  done < <(grep -B5 'url: ""' "$f" 2>/dev/null | grep -oP 'const \K\w+(?=: ResourceRequest)' || true)
done

# ============================================================
# STEP 5: Replace font CDN URLs with local paths
# ============================================================
log "=== Step 5: Fixing font URLs ==="

for f in "$GEN_DIR"/*.tsx; do
  sed -i "s|https://improveitmd\.com/cgi/asset/|/fonts/|g" "$f"
done

log "  Font URLs patched"

# ============================================================
# STEP 6: Replace any remaining v2.improveitmd.com references
# ============================================================
log "=== Step 6: Replacing v2.improveitmd.com with improveitmd.com ==="

for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css; do
  [ -f "$f" ] || continue
  sed -i 's|v2\.improveitmd\.com|improveitmd.com|g' "$f"
done

log "  v2 domain refs patched"

# ============================================================
# STEP 7: Replace www.improveitmd.com with improveitmd.com
# ============================================================
log "=== Step 7: Replacing www.improveitmd.com with improveitmd.com ==="

WWW_FIXES=0
for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css "$PROJECT_DIR/.webstudio/data.json"; do
  [ -f "$f" ] || continue
  before=$(md5sum "$f" | cut -d' ' -f1)
  sed -i 's|https://www\.improveitmd\.com|https://improveitmd.com|g' "$f"
  sed -i 's|http://www\.improveitmd\.com|https://improveitmd.com|g' "$f"
  sed -i 's|www\.improveitmd\.com|improveitmd.com|g' "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    WWW_FIXES=$((WWW_FIXES + 1))
  fi
done

log "  Replaced www refs in $WWW_FIXES files"

log "=== Optimization complete ==="
