# Strapi CMS Manager

**Live at:** https://backup.improveitmd.com
**Service:** `backup-dashboard.service`
**Entry point:** `/root/backup_dashboard.py` (thin wrapper) → `/root/strapi_manager/`

Expanded from the original backup-only dashboard into a full Strapi management tool. Manages database backups, content browsing, CSV import/export, schema modification, and deployment — all through a browser UI.

---

## Architecture

```
/root/
├── backup_dashboard.py              # 12-line wrapper, launches the package
└── strapi_manager/                   # 2050 lines across 15 files
    ├── app.py                        # Flask app factory, blueprint registration
    ├── config.py                     # All constants (paths, containers, field types)
    ├── state.py                      # Thread-safe dicts for background ops
    ├── auth.py                       # Cookie auth, login_required decorator, login/logout
    ├── helpers.py                    # API client, content type discovery, schema tools
    ├── templates.py                  # Shared layout (nav tabs), login/error templates
    └── routes/
        ├── __init__.py               # Blueprint registry
        ├── backups.py                # Backup CRUD + restore (background thread)
        ├── collections.py            # Browse content types + field details
        ├── data.py                   # Paginated data viewer with search/sort
        ├── csv_io.py                 # CSV export, sample download, import with preview
        ├── schema.py                 # Add/modify fields, new collections, apply changes
        ├── deploy.py                 # Docker rebuild + git push (background threads)
        └── api.py                    # AJAX polling endpoints for background ops
```

**31 routes** across 7 blueprints + 1 auth blueprint.

### Key design decisions

- **Modular Flask Blueprints** — each feature tab is a separate file, easy to maintain
- **Direct filesystem schema access** — reads/writes `schema.json` files in production (`/opt/strapi-build/strapi/src/api/`) and git repo (`/root/capitol/strapi/src/api/`)
- **Strapi REST API** for data — reads entries via `https://cms.improveitmd.com/api/` with Bearer token auth
- **Background threads** for long ops — restore, deploy, and CSV import run in daemon threads with status polling via AJAX
- **Mandatory backup before schema changes** — every schema write auto-creates a `strapi-pre-schema-*.sql.gz` backup first
- **In-memory pending changes** — schema changes are previewed as diffs before writing; stored in a dict keyed by UUID, expire after 1 hour
- **60-second content type cache** — avoids re-reading filesystem on every request

---

## What each tab does

### Backups (`/backups`)
- Lists all `.sql.gz` files in `/root/backups/` with size and date
- **Create** — runs `pg_dump` via `docker exec` on the DB container
- **Download** — serves the gzipped SQL file
- **Restore** — background thread: stops Strapi → drops DB → restores from dump → restarts Strapi
- **Delete** — removes the backup file

### Collections (`/collections`)
- Card grid of all 9 content types discovered from production schema files
- Shows display name, API path (`/api/{plural}`), field count, live entry count from API
- Detail view (`/collections/<name>`) — field table (name, type, required, default, enum values) + collapsible raw JSON

### Data (`/data`)
- Collection picker → paginated table view
- Auto-selects best 6 columns (prioritizes title/slug, skips rich text/media/JSON)
- Search filters on `title` field (or first string field)
- Sortable column headers (click to sort ascending)
- Pagination with Previous/Next and "Page X of Y"
- Booleans shown as colored badges, enums as indigo tags, media as thumbnails

### CSV (`/csv`)
- **Export** — paginates through all entries via API, writes CSV. Media fields become full URLs, rich text/JSON/relations are skipped.
- **Sample** — downloads a CSV with just the header row + one example row showing expected data formats (dates, booleans, URLs, etc.)
- **Import** — upload form → preview (matched/unmatched columns, slug conflict count, first 10 rows) → execute with conflict mode:
  - *Skip existing* — if slug already exists, skip the row
  - *Update existing* — if slug exists, PUT update
  - *Create all new* — POST every row regardless
- Import runs in a background thread with live progress polling

### Schema (`/schema`)
- Card grid of all collections with "Add Field" and "Modify Fields" links
- **"+ New Collection"** button at top-right

#### Add Field (`/schema/<name>/add-field`)
- Form: field name (camelCase validated), type dropdown, type-specific options
- Supported types: string, text, rich text (CKEditor), integer, float, decimal, boolean, date, datetime, email, UID, enumeration, JSON, media
- Shows diff preview before applying
- Choose targets: production filesystem, git repo, or both

#### Modify Field (`/schema/<name>/modify-field/<field>`)
- Pre-filled form with current values
- Only allows safe changes:
  - Toggle required/searchable
  - Change default value
  - Safe type transitions: string↔text, integer→float/decimal, float→decimal
  - Add enum values (never remove)
- Shows diff preview before applying

#### New Collection (`/schema/new-collection`)
- Form: display name, auto-generated singular/plural (editable), draft & publish toggle
- Dynamic field list — starts with `title` (string) + `slug` (UID) pre-filled, add/remove fields
- Preview shows full `schema.json` + list of files to create
- Creates complete directory structure:
  ```
  src/api/{name}/content-types/{name}/schema.json
  src/api/{name}/controllers/{name}.ts
  src/api/{name}/routes/{name}.ts
  src/api/{name}/services/{name}.ts
  ```

#### Apply (`/schema/apply/<id>`)
- Auto-creates backup (`strapi-pre-schema-{timestamp}.sql.gz`)
- Writes schema.json to selected targets (production and/or git)
- Invalidates content type cache

### Deploy (`/deploy`)
- Shows container health status (polls `/_health`)
- **Direct Deploy** — background thread: backup → `docker compose down` → `build --no-cache` → `up -d` → health check (6 attempts, 10s intervals)
- **Git Deploy** — background thread: backup → `git add strapi/src/api/` → `git commit` → `git push origin main` (triggers CI/CD)
- Live status polling during deploy

---

## Configuration

All in the systemd service file: `/etc/systemd/system/backup-dashboard.service`

| Env var | Purpose |
|---------|---------|
| `BACKUP_DASH_USERNAME` | Login username (default: `admin`) |
| `BACKUP_DASH_PASSWORD` | Login password |
| `FLASK_SECRET_KEY` | Cookie signing secret |
| `STRAPI_API_TOKEN` | Strapi API bearer token for data/import operations |

### Paths (hardcoded in `config.py`)

| Constant | Value |
|----------|-------|
| `BACKUP_DIR` | `/root/backups` |
| `PROD_SCHEMA_BASE` | `/opt/strapi-build/strapi/src/api` |
| `GIT_SCHEMA_BASE` | `/root/capitol/strapi/src/api` |
| `DOCKER_COMPOSE_DIR` | `/opt/strapi-build/strapi` |
| `STRAPI_API_URL` | `https://cms.improveitmd.com/api` |

### Docker containers

| Name | Role |
|------|------|
| `strapi-prod` | Strapi app (from `docker-compose.prod.yml`) |
| `strapi-db-prod` | PostgreSQL 16 database |

---

## Debugging

### Service won't start
```bash
systemctl status backup-dashboard --no-pager
journalctl -u backup-dashboard -n 50 --no-pager
```

### Python import error after code change
```bash
python3 -c "from strapi_manager.app import create_app; create_app()"
```
This will show the exact traceback without systemd wrapping.

### Data tab shows "Empty response" or error
Strapi container isn't running or isn't healthy:
```bash
docker ps --format '{{.Names}}\t{{.Status}}'
docker logs strapi-prod --tail 30
```
If Strapi shows `getaddrinfo EAI_AGAIN strapiDB`, it was started outside of Docker Compose. Fix:
```bash
cd /opt/strapi-build/strapi
docker compose -f docker-compose.prod.yml up -d
```

### 502 Bad Gateway after schema change
A schema error prevents Strapi from starting. Check logs:
```bash
docker logs strapi-prod --tail 50
```
If the schema is invalid, restore the previous version:
```bash
# Find the auto-backup
ls -lt /root/backups/strapi-pre-schema-* | head -3

# Restore the schema file from git
cd /root/capitol
git checkout HEAD -- strapi/src/api/{collection-name}/content-types/{collection-name}/schema.json
cp strapi/src/api/{name}/content-types/{name}/schema.json /opt/strapi-build/strapi/src/api/{name}/content-types/{name}/schema.json
```
Then rebuild:
```bash
cd /opt/strapi-build/strapi
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
```

### Collections page shows wrong field counts
The content type cache is 60 seconds. Wait or restart the service:
```bash
systemctl restart backup-dashboard
```

### CSV import fails
- Check the API token is set in the systemd service file
- Strapi must be running and healthy
- The import runs via the Strapi REST API, not direct DB writes
- Check import status via the polling endpoint: `/api/import-status?id=<import_id>`

### Deploy stuck or failed
```bash
# Check deploy status
curl -s -b "backup_auth_token=$(python3 -c "import hashlib; print(hashlib.sha256('admin:backup-dash-s3cr3t-k3y-change-me:authenticated'.encode()).hexdigest())")" http://127.0.0.1:5001/api/deploy-status | python3 -m json.tool
```
The deploy status clears after 60 seconds. If it's stuck on "active", restart the dashboard service.

---

## Safety features

1. **No field deletion** — the UI only adds or modifies fields, never removes them
2. **No narrowing type changes** — can't go from text→integer, only safe transitions
3. **Enum values: add only** — can add new enum values but never remove existing ones
4. **Mandatory backup** — every schema write creates `strapi-pre-schema-*.sql.gz` first
5. **Diff preview** — all schema changes show a unified diff and require explicit confirmation
6. **Confirmation dialogs** — restore, delete, deploy, and import all require JS confirm()

---

## What's next / known limitations

### Not yet implemented
- **Relation fields** — can't add/manage relations between collections from the UI
- **Component fields** — no support for Strapi components or dynamic zones
- **Single types** — only handles collection types, not Strapi single types
- **Bulk field operations** — can only add/modify one field at a time
- **API permissions** — after creating a new collection, you still need to set API permissions in Strapi admin (`Settings → Roles → Public`)
- **Media upload** — CSV import skips media fields; media must be uploaded via Strapi admin

### Known quirks
- **Content type cache** — 60-second TTL means freshly applied schema changes may take a minute to appear in the Collections tab
- **Pending changes are in-memory** — if the service restarts, unapplied pending changes are lost
- **Import is sequential** — processes one row at a time via the API; large imports (1000+ rows) can be slow
- **`strapiDB` vs `strapi-db-prod`** — there's a legacy `strapiDB` container from a previous setup alongside the compose-managed `strapi-db-prod`; only the compose-managed one should be used
- **Strapi must be started via Docker Compose** — using `docker start strapi-prod` alone will fail DNS resolution; always use `docker compose -f docker-compose.prod.yml up -d` from `/opt/strapi-build/strapi/`
