#!/bin/bash
set -euo pipefail

# Webstudio deploy script
# Syncs from Webstudio cloud, runs post-sync patches, builds Docker image, and deploys

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="/var/log/webstudio-deploy.log"
LOCK_FILE="/tmp/webstudio-deploy.lock"

export STRAPI_URL="${STRAPI_URL:-http://localhost:1337}"
export STRAPI_TOKEN="${STRAPI_TOKEN:-}"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

cleanup() {
  rm -f "$LOCK_FILE"
}
trap cleanup EXIT

# Prevent concurrent deploys
if [ -f "$LOCK_FILE" ]; then
  LOCK_PID=$(cat "$LOCK_FILE" 2>/dev/null || echo "")
  if [ -n "$LOCK_PID" ] && kill -0 "$LOCK_PID" 2>/dev/null; then
    log "ERROR: Deploy already in progress (PID $LOCK_PID)"
    exit 1
  fi
  log "WARN: Stale lock file found, removing"
  rm -f "$LOCK_FILE"
fi
echo $$ > "$LOCK_FILE"

cd "$SCRIPT_DIR"

log "=== Starting Webstudio deploy ==="

# Step 1: Install webstudio CLI if not available
if ! command -v webstudio &>/dev/null && [ ! -f node_modules/.bin/webstudio ]; then
  log "Installing webstudio CLI..."
  npm install --no-save webstudio 2>&1 | tee -a "$LOG_FILE"
fi

# Step 2: Sync project data from Webstudio cloud
log "Syncing project data from Webstudio cloud..."
npx webstudio sync 2>&1 | tee -a "$LOG_FILE"

# Step 3: Build project (generates routes, no asset download - assets served from Strapi)
log "Building project..."
npx webstudio build --template docker 2>&1 | tee -a "$LOG_FILE"

# Step 3b: Restore global.js (minified) and favicon (webstudio build regenerates public/)
log "Restoring global.js (minified) and favicon..."
if [ -x node_modules/.bin/esbuild ]; then
  node_modules/.bin/esbuild scripts/global.js --minify --target=es2020 --outfile=public/global.js 2>&1 | tee -a "$LOG_FILE"
else
  log "  esbuild not found — copying global.js unminified"
  cp scripts/global.js public/global.js 2>&1 | tee -a "$LOG_FILE"
fi
cp scripts/favicon.ico public/favicon.ico 2>&1 | tee -a "$LOG_FILE"

# Step 3c: Fix <html lang=""> (webstudio template ships language="" -> empty lang,
# which makes mobile browsers auto-translate the page and break React hydration).
# Runs post-build because `webstudio build` can overwrite app/root.tsx from template.
log "Fixing <html lang> fallback..."
node scripts/inject-html-lang.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 3d: Fix SVG-icon hydration crash on /services/[slug] etc. Webstudio puts some
# SVGRepo icon <style> tags in an <HtmlEmbed> INSIDE <svg><g>; the SDK wraps embed
# content in a <div>, and <div> is invalid inside <svg> -> hydration mismatch
# (#418 -> #423 full re-render = freeze/"crash"). Convert those to native <style>.
log "Fixing SVG-icon <style> embeds (hydration)..."
node scripts/inject-svg-style-embed.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 3e: Fix blog date hydration crash. The Webstudio <Time> SDK formats the
# display date in the RUNTIME's local timezone; blog dates are stored as midnight
# UTC, so the server (UTC) renders one calendar day while a US-Eastern visitor's
# browser renders the previous day -> text mismatch (#425) -> #418 -> #423 full
# re-render ("crash"). Never reproduced headless because headless runs in UTC.
# Adds suppressHydrationWarning so React keeps the server's (correct) date.
log "Fixing blog <Time> date hydration (timezone)..."
node scripts/inject-blog-time-hydration.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4: Optimize assets (download externals, upload to Strapi, fix hydration)
log "Optimizing assets and fixing hydration..."
bash scripts/optimize-assets.sh 2>&1 | tee -a "$LOG_FILE"

# Step 4b: Inject JSON-LD schema markup into generated pages
log "Injecting schema markup..."
node scripts/inject-schemas.cjs --force 2>&1 | tee -a "$LOG_FILE"

# Step 4c: Patch deploy page with password protection
log "Patching deploy page auth..."
node scripts/patch-deploy-page.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4c2: Fix doubled-slug TOC/back-to-top anchors on /services/$slug pages
log "Fixing service-page TOC anchor links..."
node scripts/inject-fix-toc-links.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d: Inject canonical tags into all routes
log "Injecting canonical tags..."
node scripts/inject-canonical.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2: Fix duplicate GA4 events in tracking script
log "Patching GA4 tracking (dedup page_view + add generate_lead)..."
node scripts/inject-tracking-fix.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2a: Fix dead lead handler + mirror all custom events into GTM dataLayer
log "Upgrading tracking to v6 (unified generate_lead; no GTM-id in comments)..."
node scripts/inject-gtm-events.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2b: Inject Google Tag Manager into CustomCode (skips /deploy at runtime)
log "Injecting GTM..."
node scripts/inject-gtm.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2c: Move CallRail out of CustomCode (loaded post-hydration via global.js)
log "Deferring CallRail..."
node scripts/inject-callrail-defer.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2d: Move Elfsight platform.js out of HtmlEmbed (also loaded post-hydration)
log "Deferring Elfsight..."
node scripts/inject-elfsight-defer.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2e: Defer Facebook Pixel fbevents.js out of the critical path
log "Deferring Facebook Pixel..."
node scripts/inject-fb-pixel-defer.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2f: Preload above-the-fold font weights (normal + bold)
log "Preloading fonts..."
node scripts/inject-font-preload.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d3: Hero video/image swap - image first, then video, then back to image
log "Patching hero video/image swap..."
node scripts/inject-hero-video.cjs --force 2>&1 | tee -a "$LOG_FILE"

# Step 4d3a: Lazy-load the Google My Maps iframe (defers ~560ms off initial load)
log "Lazy-loading My Maps iframe..."
node scripts/inject-lazy-mymap.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d3c: Repoint hero <source> to the re-encoded (smaller) webm
log "Optimizing hero video reference..."
node scripts/inject-video-optimize.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d3d: Clamp /_image quality to <=72 (Webstudio emits q_80)
log "Clamping image quality to <=72..."
node scripts/inject-image-quality-clamp.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4e: Fetch gallery data from Strapi for build-time HTML injection
log "Fetching gallery data from Strapi..."
node scripts/fetch-gallery-data.cjs --strapi-url "${STRAPI_URL:-http://localhost:1337}" 2>&1 | tee -a "$LOG_FILE"

# Step 4f: Copy gallery slider to public (fallback) and patch Dockerfile
# The inject-gallery-slider.cjs must run INSIDE Docker after npm run build,
# because webstudio build --template docker regenerates the Dockerfile and
# npm run build inside Docker overwrites any local build/ modifications.
log "Setting up gallery slider injection..."
cp scripts/gallery-slider.js public/gallery-slider.js 2>/dev/null || true
# Patch Dockerfile to run gallery inject after npm run build
if ! grep -q 'inject-gallery-slider' Dockerfile; then
  sed -i 's|RUN npm run build|RUN npm run build\nRUN node scripts/inject-gallery-slider.cjs|' Dockerfile
  log "  Patched Dockerfile with gallery slider injection step"
else
  log "  Dockerfile already has gallery slider injection"
fi

# Step 4g: Cache-bust global.js with a content-hash query string (?v=<hash>) on
# every reference, so each deploy is a fresh Cloudflare cache key and no manual
# "Purge Everything" is needed. MUST run after optimize-assets.sh (which adds
# data-cfasync by matching the bare URL) and after the public/global.js minify.
log "Versioning global.js references (cache-bust)..."
node scripts/inject-global-version.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4h: Inject custom Lovable landing pages (/community, /roofing/slate-roofing).
# Runs LAST among the inject steps so the earlier canonical/schema/tracking
# patches don't touch these self-contained routes (they ship their own canonical,
# JSON-LD, and scoped CSS). Restores app/routes, app/landing, and public/landing
# which `webstudio build` regenerates from scratch.
log "Injecting custom landing pages..."
node scripts/inject-landing-pages.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 5: Build Docker image (no cache to pick up all changes)
log "Building Docker image..."
docker build --no-cache -t webstudio-prod:latest . 2>&1 | tee -a "$LOG_FILE"

# Step 6: Deploy with docker compose
log "Deploying container..."
docker compose -f docker-compose.prod.yml down 2>&1 | tee -a "$LOG_FILE" || true
docker compose -f docker-compose.prod.yml up -d 2>&1 | tee -a "$LOG_FILE"

# Step 7: Wait for health check
log "Waiting for health check..."
for i in $(seq 1 30); do
  if curl -sf http://localhost:3000/ > /dev/null 2>&1; then
    log "=== Deploy successful! Site is live ==="
    exit 0
  fi
  sleep 2
done

log "ERROR: Health check failed after 60s"
docker logs webstudio-prod --tail 20 2>&1 | tee -a "$LOG_FILE"
exit 1
