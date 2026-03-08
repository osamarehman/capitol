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

# Step 4: Optimize assets (download externals, upload to Strapi, fix hydration)
log "Optimizing assets and fixing hydration..."
bash scripts/optimize-assets.sh 2>&1 | tee -a "$LOG_FILE"

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
