#!/bin/bash
set -euo pipefail

# Webstudio Carolina deploy script
# Syncs from Webstudio cloud, runs post-sync patches, builds Docker image, and deploys

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="/var/log/webstudio-carolina-deploy.log"
LOCK_FILE="/tmp/webstudio-carolina-deploy.lock"

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

log "=== Starting Webstudio Carolina deploy ==="

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

# Step 3b: Restore global.js and favicon (webstudio build regenerates public/)
log "Restoring global.js and favicon..."
cp scripts/global.js public/global.js 2>/dev/null || log "  WARN: No global.js to restore"
cp scripts/favicon.ico public/favicon.ico 2>/dev/null || log "  WARN: No favicon.ico to restore"

# Step 4: Optimize assets (fix hydration, URL mappings)
log "Optimizing assets and fixing hydration..."
bash scripts/optimize-assets.sh 2>&1 | tee -a "$LOG_FILE"

# Step 4b: Inject JSON-LD schema markup into generated pages
log "Injecting schema markup..."
node scripts/inject-schemas.cjs --force 2>&1 | tee -a "$LOG_FILE"

# Step 4c: Patch deploy page with password protection
log "Patching deploy page auth..."
node scripts/patch-deploy-page.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4c2: Rewrite hardcoded v2.improveitmd.com deploy URLs to relative same-origin
log "Rewriting deploy page URLs to relative paths..."
node scripts/inject-deploy-urls.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d: Inject canonical tags into all routes
log "Injecting canonical tags..."
node scripts/inject-canonical.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2: GTM-only tracking — install GTM-N5QXSSGM, remove GA4 + Facebook
# Pixel, and emit a single generate_lead_ca dataLayer event on any form submit.
# (Self-guards /deploy, so no separate disable-on-deploy step is needed.)
log "Installing GTM + generate_lead_ca (removing GA4 + FB Pixel)..."
node scripts/inject-gtm.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2c: Strip all improveitmd.com references — proxy through Carolina
log "Stripping improveitmd.com references..."
node scripts/strip-improveitmd-refs.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d2d: Add GraphQL aliases (carolinaLp -> lp, etc.)
# Webstudio data bindings expect lp/blog/etc. but Carolina Strapi exposes
# carolinaLp/carolinaBlog/etc. — aliases keep the bindings working.
log "Injecting GraphQL aliases..."
node scripts/inject-graphql-aliases.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d3: Hero video/image swap - image first, then video, then back to image
log "Patching hero video/image swap..."
node scripts/inject-hero-video.cjs --force 2>&1 | tee -a "$LOG_FILE"

# Step 4d3b: Preload above-the-fold font weights (normal + bold)
log "Preloading fonts..."
node scripts/inject-font-preload.cjs 2>&1 | tee -a "$LOG_FILE"

# Step 4d4: Google Sheets webhook for form submissions
if [ -n "${GOOGLE_SHEETS_WEBHOOK:-}" ]; then
  log "Injecting Google Sheets form webhook..."
  GOOGLE_SHEETS_WEBHOOK="$GOOGLE_SHEETS_WEBHOOK" node scripts/inject-sheets-webhook.cjs 2>&1 | tee -a "$LOG_FILE"
else
  log "GOOGLE_SHEETS_WEBHOOK not set, skipping sheets integration"
fi

# Step 5: Build Docker image (no cache to pick up all changes)
log "Building Docker image..."
docker build --no-cache -t webstudio-carolina:latest . 2>&1 | tee -a "$LOG_FILE"

# Step 6: Deploy with docker compose
log "Deploying container..."
docker compose -f docker-compose.prod.yml down 2>&1 | tee -a "$LOG_FILE" || true
docker compose -f docker-compose.prod.yml up -d 2>&1 | tee -a "$LOG_FILE"

# Step 7: Wait for health check (port 3001 externally, 3000 internally)
log "Waiting for health check..."
for i in $(seq 1 30); do
  if curl -sf http://localhost:3001/ > /dev/null 2>&1; then
    log "=== Deploy successful! Carolina site is live on port 3001 ==="
    exit 0
  fi
  sleep 2
done

log "ERROR: Health check failed after 60s"
docker logs webstudio-carolina --tail 20 2>&1 | tee -a "$LOG_FILE"
exit 1
