#!/bin/bash
# Restore Strapi Production Database from Backup
# Usage: bash scripts/restore-strapi.sh <backup-file.dump>
#
# IMPORTANT: This will DROP and recreate the entire strapi database!
# Make sure you have a current backup before running this.

set -e

SSH_KEY="$HOME/.ssh/Capitol"
SERVER="root@49.13.148.177"
DB_CONTAINER="strapi-db-prod"
STRAPI_CONTAINER="strapi-prod"

if [ -z "$1" ]; then
  echo "Usage: bash scripts/restore-strapi.sh <path-to-backup.dump>"
  echo ""
  echo "Available backups:"
  SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
  ls -lh "$SCRIPT_DIR/../backups/"*.dump 2>/dev/null || echo "  No .dump files found in backups/"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ File not found: $BACKUP_FILE"
  exit 1
fi

echo "=== Strapi Production Database Restore ==="
echo "Backup file: $BACKUP_FILE"
echo "Server: $SERVER"
echo "DB Container: $DB_CONTAINER"
echo ""
echo "⚠️  WARNING: This will DROP and recreate the entire strapi database!"
echo ""
read -p "Are you sure you want to proceed? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Aborted."
  exit 0
fi

# Stop Strapi to prevent connections
echo ""
echo "🛑 Stopping Strapi container..."
ssh -i "$SSH_KEY" "$SERVER" "docker stop $STRAPI_CONTAINER" || true

# Upload backup to server
echo "⬆️ Uploading backup to server..."
scp -i "$SSH_KEY" "$BACKUP_FILE" "$SERVER:/tmp/strapi-restore.dump"

# Copy into DB container
echo "📦 Copying backup into database container..."
ssh -i "$SSH_KEY" "$SERVER" "docker cp /tmp/strapi-restore.dump $DB_CONTAINER:/tmp/strapi-restore.dump"

# Drop and recreate database, then restore
echo "🔄 Dropping and recreating database..."
ssh -i "$SSH_KEY" "$SERVER" "docker exec $DB_CONTAINER psql -U strapi -d postgres -c 'DROP DATABASE IF EXISTS strapi;'"
ssh -i "$SSH_KEY" "$SERVER" "docker exec $DB_CONTAINER psql -U strapi -d postgres -c 'CREATE DATABASE strapi OWNER strapi;'"

echo "📥 Restoring from backup..."
ssh -i "$SSH_KEY" "$SERVER" "docker exec $DB_CONTAINER pg_restore -U strapi -d strapi --no-owner --no-privileges /tmp/strapi-restore.dump"

# Cleanup
echo "🧹 Cleaning up temp files..."
ssh -i "$SSH_KEY" "$SERVER" "rm -f /tmp/strapi-restore.dump"
ssh -i "$SSH_KEY" "$SERVER" "docker exec $DB_CONTAINER rm -f /tmp/strapi-restore.dump"

# Restart Strapi
echo "🚀 Starting Strapi container..."
ssh -i "$SSH_KEY" "$SERVER" "docker start $STRAPI_CONTAINER"

# Wait for health check
echo "⏳ Waiting for Strapi to start (30s)..."
sleep 30

# Health check
echo "🏥 Health check..."
STATUS=$(ssh -i "$SSH_KEY" "$SERVER" "curl -s -o /dev/null -w '%{http_code}' http://localhost:1337/admin" 2>/dev/null || echo "000")

if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ] || [ "$STATUS" = "302" ]; then
  echo "✅ Strapi is up and running! (HTTP $STATUS)"
else
  echo "⚠️ Strapi returned HTTP $STATUS - check logs with:"
  echo "   ssh -i ~/.ssh/Capitol root@49.13.148.177 'docker logs strapi-prod --tail 50'"
fi

echo ""
echo "✅ Restore complete!"
echo "   Verify at: https://cms.improveitmd.com/admin"
