# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Capitol is a CMS migration project that moves content from Webflow CMS to Strapi 5. The project includes:
- **Strapi 5** backend with PostgreSQL (Docker-based)
- **TypeScript migration scripts** for Webflow data export/import
- **CI/CD pipeline** for production deployment

Production URL: `https://cms.improveitmd.com`

The `old/` directory contains legacy code and should be ignored.

## Project Structure

```
capitol/
├── strapi/                    # Strapi 5 CMS backend
│   ├── config/                # Database, server, admin configuration
│   ├── src/api/               # Content types (generated from Webflow)
│   ├── Dockerfile             # Development container
│   ├── Dockerfile.prod        # Production multi-stage build
│   ├── docker-compose.yml     # Dev: Strapi + PostgreSQL
│   └── docker-compose.prod.yml
├── migration/                 # TypeScript migration scripts
│   ├── src/
│   │   ├── webflow/           # Webflow API client and exporters
│   │   ├── strapi/            # Strapi client and importers
│   │   ├── mappers/           # Field type mapping
│   │   └── utils/             # Logger, retry, rate-limiter
│   ├── scripts/               # Numbered migration scripts
│   └── data/                  # Exported data, assets, ID mappings
├── .github/workflows/         # CI/CD pipeline
└── docs/                      # Reference documentation
```

## Development Commands

### Strapi (Local Development)

```bash
# Start Strapi with PostgreSQL
cd strapi
docker-compose up -d

# View logs
docker-compose logs -f strapi

# Restart after schema changes
docker-compose restart strapi

# Stop
docker-compose down
```

Admin panel: `http://localhost:1337/admin`

### Migration Scripts

```bash
cd migration
npm install

# Run migration steps in order:
npm run export              # 1. Export Webflow data
npm run generate-schemas    # 2. Generate Strapi schemas
npm run import-content      # 3. Import content to Strapi
npm run upload-assets       # 4. Upload assets to Strapi
npm run verify              # 5. Verify migration

# Or run all at once:
npm run migrate:all
```

### Environment Variables

**Strapi** (`strapi/.env`):
- `DATABASE_*` - PostgreSQL connection
- `APP_KEYS`, `JWT_SECRET`, `ADMIN_JWT_SECRET` - Security keys
- `API_TOKEN_SALT`, `TRANSFER_TOKEN_SALT` - Token salts

**Migration** (`migration/.env`):
- `WEBFLOW_ACCESS_TOKEN` - Webflow API token
- `WEBFLOW_SITE_ID` - Webflow site ID
- `STRAPI_URL` - Strapi API URL
- `STRAPI_API_TOKEN` - Strapi API token (create in admin panel)

## Architecture

### Webflow to Strapi Field Mapping

| Webflow Type | Strapi Type |
|--------------|-------------|
| PlainText | string |
| RichText | richtext |
| Number | decimal |
| Switch | boolean |
| DateTime/Date | datetime/date |
| Image | media (single) |
| MultiImage | media (multiple) |
| Email | email |
| Option | enumeration |
| Reference | relation (manyToOne) |
| MultiReference | relation (manyToMany) |

### Migration Flow

1. **Export** - Fetch collections, items (paginated), download assets with alt text
2. **Schema Generation** - Create Strapi content-type JSON schemas
3. **Import** - Create entries via Strapi REST API, save ID mappings
4. **Asset Upload** - Upload files with alt text, link to entries
5. **Verify** - Compare counts and validate data integrity

### CI/CD Pipeline

Triggers on push to `main` (strapi/** paths):
1. Build Docker image with multi-stage production build
2. Push to GitHub Container Registry
3. Deploy to VPS via SSH
4. Health check verification

## Key Files

- `strapi/config/database.ts` - PostgreSQL configuration
- `migration/src/mappers/field-type-mapper.ts` - Field type conversion logic
- `migration/src/strapi/schema-generator.ts` - Strapi schema generation
- `.github/workflows/deploy-strapi.yml` - CI/CD pipeline
