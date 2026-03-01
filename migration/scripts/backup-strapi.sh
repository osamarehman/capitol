#!/bin/bash
# Backup Strapi Production Database
# Usage: bash scripts/backup-strapi.sh
#
# Creates both .dump (binary, for pg_restore) and .sql (plain text) backups
# Saves to migration/backups/ with date stamp

set -e

SSH_KEY="$HOME/.ssh/Capitol"
SERVER="root@49.13.148.177"
DB_CONTAINER="strapi-db-prod"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BACKUP_DIR="$SCRIPT_DIR/../backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

echo "=== Strapi Production Database Backup ==="
echo "Date: $DATE"
echo ""

# Create binary dump (for pg_restore - faster, smaller)
echo "📦 Creating binary dump on server..."
ssh -i "$SSH_KEY" "$SERVER" "docker exec $DB_CONTAINER pg_dump -U strapi -d strapi --format=custom --file=/tmp/strapi-backup.dump"

echo "⬇️ Downloading binary dump..."
scp -i "$SSH_KEY" "$SERVER:/tmp/strapi-backup.dump" "$BACKUP_DIR/strapi-backup-$DATE.dump"

# Create plain SQL dump (human-readable, for manual inspection)
echo "📄 Creating SQL dump on server..."
ssh -i "$SSH_KEY" "$SERVER" "docker exec $DB_CONTAINER pg_dump -U strapi -d strapi --format=plain --file=/tmp/strapi-backup.sql"

echo "⬇️ Downloading SQL dump..."
scp -i "$SSH_KEY" "$SERVER:/tmp/strapi-backup.sql" "$BACKUP_DIR/strapi-backup-$DATE.sql"

# Cleanup server temp files
echo "🧹 Cleaning up server temp files..."
ssh -i "$SSH_KEY" "$SERVER" "rm -f /tmp/strapi-backup.dump /tmp/strapi-backup.sql"

# Show results
echo ""
echo "✅ Backup complete!"
echo ""
ls -lh "$BACKUP_DIR/strapi-backup-$DATE".*
echo ""
echo "Files saved to: $BACKUP_DIR/"
