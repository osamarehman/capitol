#!/bin/bash
set -euo pipefail

# Optimize assets script for Carolina site
# Runs after webstudio sync/build, before docker build
# Adapts external URLs, fixes hydration issues, normalizes domains

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
GEN_DIR="$PROJECT_DIR/app/__generated__"
PUBLIC_DIR="$PROJECT_DIR/public/assets"
CACHE_DIR="$PROJECT_DIR/.asset-cache"
MAPPINGS_FILE="$PROJECT_DIR/scripts/asset-mappings.json"
STRAPI_URL="${STRAPI_URL:-http://localhost:1337}"
STRAPI_TOKEN="${STRAPI_TOKEN:-}"

# Carolina uses the shared Strapi CMS at improveitmd.com
# When Carolina gets its own domain, update SITE_DOMAIN
SITE_DOMAIN="${SITE_DOMAIN:-improveitmd.com}"

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

  if [ ! -f "$MAPPINGS_FILE" ]; then
    echo '{}' > "$MAPPINGS_FILE"
  fi

  EXTERNAL_URLS=$(grep -ohP '(https://res\.cloudinary\.com/[^"'\'')\s&\\]+|https://uploads-ssl\.webflow\.com/[^"'\'')\s&\\]+|https://cdn\.prod\.website-files\.com/[^"'\'')\s&\\]+|https://assets-global\.website-files\.com/[^"'\'')\s&\\]+|https://ik\.imagekit\.io/[^"'\'')\s&\\]+)' "$GEN_DIR"/*.tsx 2>/dev/null | sed 's/\\$//' | sort -u || true)

  NEW_COUNT=0

  for clean_url in $EXTERNAL_URLS; do
    if python3 -c "import json; d=json.load(open('$MAPPINGS_FILE')); exit(0 if '$clean_url' in d else 1)" 2>/dev/null; then
      continue
    fi

    filename=$(echo "$clean_url" | sed 's|https\?://||; s|[/:?&=]|_|g')
    cached_file="$CACHE_DIR/$filename"

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

    log "  Uploading to Strapi: $filename"
    strapi_path=$(curl -sf -X POST \
      -H "Authorization: Bearer $STRAPI_TOKEN" \
      -F "files=@$cached_file" \
      -F "fileInfo={\"name\":\"$filename\"}" \
      "$STRAPI_URL/api/upload" 2>/dev/null | \
      python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['url'] if d else '')" 2>/dev/null || echo "")

    if [ -n "$strapi_path" ]; then
      new_url="https://${SITE_DOMAIN}${strapi_path}"
      log "  Mapped: $clean_url -> $new_url"
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
    python3 -c "
import json, sys
mappings = json.load(open(sys.argv[1]))
for old_url, new_url in mappings.items():
    old_esc = old_url.replace('&', r'\&').replace('.', r'\.')
    new_esc = new_url.replace('&', r'\&')
    print(f's|{old_esc}|{new_esc}|g')
" "$MAPPINGS_FILE" > /tmp/carolina-asset-sed-commands.txt

    REPLACED=0
    for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css "$PROJECT_DIR/.webstudio/data.json"; do
      [ -f "$f" ] || continue
      before=$(md5sum "$f" | cut -d' ' -f1)
      sed -i -f /tmp/carolina-asset-sed-commands.txt "$f"
      after=$(md5sum "$f" | cut -d' ' -f1)
      if [ "$before" != "$after" ]; then
        REPLACED=$((REPLACED + 1))
      fi
    done
    rm -f /tmp/carolina-asset-sed-commands.txt
    log "  Applied $MAPPING_COUNT mappings, modified $REPLACED files"
  else
    log "  No mappings to apply"
  fi
else
  log "  No mappings file found (run with --upload first)"
fi

# Replace cms.improveitmd.com URLs with shared proxy (both sites use same Strapi CMS)
log "  Replacing cms.improveitmd.com URLs with ${SITE_DOMAIN}/uploads/ paths..."
for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css "$PROJECT_DIR/.webstudio/data.json"; do
  [ -f "$f" ] || continue
  sed -i "s|https://cms\.improveitmd\.com/uploads/|https://${SITE_DOMAIN}/uploads/|g" "$f"
done

# ============================================================
# STEP 3: Fix hydration issues
# ============================================================
log "=== Step 3: Fixing hydration issues ==="

for f in "$GEN_DIR"/*.tsx; do
  sed -i 's|{"\\n\\n\\n"}||g; s|{"\\n\\n"}||g; s|{"\\n"}||g' "$f"
  sed -i 's|>{" "}<|><|g' "$f"
  sed -i 's|{"\n\n\n"}||g; s|{"\n\n"}||g; s|{"\n"}||g' "$f"
  sed -i '/^{" "}$/d' "$f"
done

log "  Cleaned whitespace text nodes from $(ls "$GEN_DIR"/*.tsx | wc -l) files"

# Fix undefined concatenation in dynamic pages
log "  Fixing undefined concatenation in dynamic pages..."
CONCAT_FIXES=0
for f in "$GEN_DIR"/*.tsx; do
  before=$(md5sum "$f" | cut -d' ' -f1)

  sed -i -E 's|src=\{"(https?://[^"]+)" \+ ([^}]+)\}|src={"\1" + (\2 \|\| "")}|g' "$f"
  perl -i -pe 's/"(https?:\/\/[^"]+)" \+ ([A-Za-z][\w?.\[\]]*),/"$1" + ($2 || ""),/g' "$f"
  perl -i -pe '
    s/\{"([^"]*)" \+ ((?:(?!\|\|)[^+}])+?) \+ "([^"]*)"\}/{"$1" + ($2 || "") + "$3"}/g;
    s/\{"([^"]*)" \+ ((?:(?!\|\||\+ ")[^}])+?)\}/{"$1" + ($2 || "")}/g;
  ' "$f"

  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    CONCAT_FIXES=$((CONCAT_FIXES + 1))
  fi
done
log "  Fixed undefined concatenation in $CONCAT_FIXES files"

# Remove clientOnly from style-only HtmlEmbeds
log "  Removing clientOnly from style-only HtmlEmbeds..."
STYLE_FIXES=0
for f in "$GEN_DIR"/*.tsx; do
  before=$(md5sum "$f" | cut -d' ' -f1)
  perl -i -pe '
    if (/^code=\{"<style>/ && !/<script/ && /"\}\s*$/) {
      $style_line = 1;
    } elsif ($style_line && /^clientOnly=\{true\}/) {
      $_ = "";
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
  sed -i "s|https://${SITE_DOMAIN}/cgi/asset/|/fonts/|g" "$f"
done

log "  Font URLs patched"

# ============================================================
# STEP 6: Replace www references
# ============================================================
log "=== Step 6: Normalizing domain references ==="

WWW_FIXES=0
for f in "$GEN_DIR"/*.tsx "$GEN_DIR"/*.ts "$GEN_DIR"/*.css "$PROJECT_DIR/.webstudio/data.json"; do
  [ -f "$f" ] || continue
  before=$(md5sum "$f" | cut -d' ' -f1)
  sed -i "s|https://www\.${SITE_DOMAIN}|https://${SITE_DOMAIN}|g" "$f"
  sed -i "s|http://www\.${SITE_DOMAIN}|https://${SITE_DOMAIN}|g" "$f"
  sed -i "s|www\.${SITE_DOMAIN}|${SITE_DOMAIN}|g" "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    WWW_FIXES=$((WWW_FIXES + 1))
  fi
done

log "  Replaced www refs in $WWW_FIXES files"

# ============================================================
# STEP 7: Cloudflare Rocket Loader fix
# ============================================================
log "=== Step 7: Fixing Cloudflare Rocket Loader conflicts ==="
RL_FIXES=0
for f in "$GEN_DIR"/*.tsx; do
  before=$(md5sum "$f" | cut -d' ' -f1)
  sed -i "s|<Script type={\"module\"} src={\"https://${SITE_DOMAIN}/global.js\"}|<Script data-cfasync={\"false\"} type={\"module\"} src={\"https://${SITE_DOMAIN}/global.js\"}|g" "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    RL_FIXES=$((RL_FIXES + 1))
  fi
done
log "  Fixed Rocket Loader conflicts in $RL_FIXES files"

# ============================================================
# STEP 8: Fix contact email (Carolina uses its own email, not MD's)
# ============================================================
log "=== Step 8: Fixing contact email ==="

EMAIL_FIXES=0
for f in "$GEN_DIR"/*.server.tsx; do
  [ -f "$f" ] || continue
  before=$(md5sum "$f" | cut -d' ' -f1)
  sed -i 's|info@improveitmd\.com|support@improveitcarolina.com|g' "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    EMAIL_FIXES=$((EMAIL_FIXES + 1))
  fi
done
log "  Fixed contact email in $EMAIL_FIXES files"

# ============================================================
# STEP 9: Fix Google site verification tag (Carolina-specific)
# ============================================================
log "=== Step 9: Replacing Google site verification tag ==="

GSV_FIXES=0
for f in "$GEN_DIR"/*.tsx; do
  [ -f "$f" ] || continue
  before=$(md5sum "$f" | cut -d' ' -f1)
  sed -i 's|ci94s2JMjxodrBBcRJQvPTnAp81MSY_4BAZuVHTaeKk|Sp03xOXurOHle-gpEkYKi4OjyFMymN8llYLXt9OGDLg|g' "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    GSV_FIXES=$((GSV_FIXES + 1))
  fi
done
log "  Replaced Google site verification in $GSV_FIXES files"

# ============================================================
# STEP 10: Replace ALL GA4 properties with Carolina-specific ID (G-839XJ1CRJZ)
# ============================================================
log "=== Step 10: Replacing GA4 property IDs ==="

GA4_FIXES=0
for f in "$GEN_DIR"/*.tsx "$PROJECT_DIR/.webstudio/data.json"; do
  [ -f "$f" ] || continue
  before=$(md5sum "$f" | cut -d' ' -f1)
  # Replace MD GA4 with Carolina GA4
  sed -i 's|G-EVSBMR91V3|G-839XJ1CRJZ|g' "$f"
  # Also catch any remaining old MD property
  sed -i 's|G-NRVKK7VK0R|G-839XJ1CRJZ|g' "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    GA4_FIXES=$((GA4_FIXES + 1))
  fi
done
log "  Replaced GA4 property IDs in $GA4_FIXES files"

# ============================================================
# STEP 11: Replace hero video with trimmed version (same as MD)
# ============================================================
log "=== Step 11: Replacing hero video with trimmed version ==="

VIDEO_FIXES=0
TRIMMED_WEBM="https://improveitmd.com/uploads/Webflow_Capitol_Improvements_36944c2fc2_trimmed2_4df3b2dd00.webm"
TRIMMED_POSTER="https://improveitmd.com/uploads/poster_01_start_6150850079.jpg"

for f in "$GEN_DIR"/*.tsx; do
  [ -f "$f" ] || continue
  before=$(md5sum "$f" | cut -d' ' -f1)
  # Replace untrimmed webm with trimmed version
  sed -i "s|https://improveitmd\.com/uploads/Webflow_Capitol_Improvements_36944c2fc2\.webm|${TRIMMED_WEBM}|g" "$f"
  sed -i "s|https://cms\.improveitmd\.com/uploads/Webflow_Capitol_Improvements_36944c2fc2\.webm|${TRIMMED_WEBM}|g" "$f"
  # Replace old ImageKit mp4 fallback with trimmed webm
  sed -i "s|https://ik\.imagekit\.io/einkpz9gr/65ca32dc202550e25648683a_Capitol%20Improvements%20-%20Roofing%20and%20Siding%20Contractors\.mp4|${TRIMMED_WEBM}|g" "$f"
  # Replace old poster with MD poster
  sed -i "s|https://improveitmd\.com/uploads/662f3b433b72d65bdb7e82a5_65ca32dc202550e25648683a_Capitol_Improvements_Roofing_and_Siding_Contractors_poster_00001_iosgam_94e2ceb1dc\.webp|${TRIMMED_POSTER}|g" "$f"
  after=$(md5sum "$f" | cut -d' ' -f1)
  if [ "$before" != "$after" ]; then
    VIDEO_FIXES=$((VIDEO_FIXES + 1))
  fi
done
log "  Replaced hero video URLs in $VIDEO_FIXES files"

log "=== Optimization complete ==="
