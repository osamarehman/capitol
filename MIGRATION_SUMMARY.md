# Capitol CMS Migration - Complete Summary

**Date Completed:** January 3, 2026
**Production URL:** https://cms.improveitmd.com
**Admin Panel:** https://cms.improveitmd.com/admin

---

## Project Overview

Successfully migrated content from **Webflow CMS** to **Strapi 5** with full CI/CD deployment to a VPS server.

---

## What Was Done

### 1. Strapi 5 CMS Setup
- Strapi 5.33.1 with PostgreSQL database
- Docker-based deployment (development and production)
- Multi-stage Dockerfile for optimized production builds
- ARM64 architecture support for VPS deployment

### 2. Content Types Migrated (16 Collections)

| Collection | Items | Description |
|------------|-------|-------------|
| Local Pages (services) | 385 | Main service pages |
| Service Area Cities | 175 | City service areas |
| Blog Posts | 28 | Blog articles |
| Landing Pages | 29 | Marketing pages |
| Blog alt (drafts) | 19 | Draft blog posts |
| James Hardie Colors | 19 | Product colors |
| Review/Testimonials | 18 | Customer reviews |
| Service Area Counties | 13 | County service areas |
| City Local Pages | 10 | City-specific pages |
| Timbertech Colors | 10 | Product colors |
| Sales | 5 | Sales pages |
| Videos | 3 | Video content |
| CASH FOR LANDs | 2 | Land purchase pages |
| CLEARING BUSINESSes | 1 | Business clearing |
| Local Pages - Maryland | 1 | Maryland pages |
| Local Pages - Virginia | 1 | Virginia pages |

**Total Content Items: 719**

### 3. Custom Fields Added to All Collections

Every content type includes these additional fields for enhanced functionality:

| Field | Type | Purpose |
|-------|------|---------|
| `schemaMarkup` | text | JSON-LD structured data for SEO |
| `customHtml` | text | Custom HTML snippets |
| `customContent` | richtext | Additional formatted content |
| `faqContent` | richtext | FAQ sections |

### 4. Code Snippets Collection (New)

A dedicated collection for storing reusable code:

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Name of the snippet |
| `slug` | uid | URL-friendly identifier |
| `description` | text | What this code does |
| `codeType` | enum | javascript, css, html, json, schema-markup, tracking, other |
| `code` | text | The actual code content |
| `location` | enum | head, body-start, body-end, inline, none |
| `isGlobal` | boolean | Apply to all pages |
| `pages` | text | Specific pages (comma-separated) |
| `priority` | integer | Load order |
| `isActive` | boolean | Enable/disable snippet |

### 5. Media Assets

| Metric | Count |
|--------|-------|
| Total Assets Uploaded | 2,764 |
| Image Assets Linked | 114 entries |
| Video URLs Linked | 399 entries |

### 6. Plugins Installed

- **SEO Plugin** (`@strapi-community/plugin-seo`) - Meta tags & social media previews
- **Sitemap Plugin** (`strapi-5-sitemap-plugin`) - Dynamic XML sitemap generation
- **GraphQL Plugin** (`@strapi/plugin-graphql`) - GraphQL API endpoint

### 7. CI/CD Pipeline

Automated deployment via GitHub Actions:

1. **Trigger:** Push to `main` branch (strapi/** paths)
2. **Build:** Docker image with ARM64 support via QEMU
3. **Registry:** GitHub Container Registry (ghcr.io)
4. **Deploy:** SSH to VPS, pull image, recreate containers
5. **Health Check:** Verify Strapi is running

---

## Infrastructure

### Production Server
- **Platform:** ARM64 (linux/arm64)
- **Container Runtime:** Docker with Docker Compose
- **Database:** PostgreSQL 16 (Alpine)
- **Reverse Proxy:** Configured for cms.improveitmd.com

### Docker Configuration
- Multi-stage build for smaller production images
- Persistent volumes for uploads and database
- Health checks for automatic container recovery
- Force recreate on deploy for clean updates

---

## API Endpoints

### REST API
Base URL: `https://cms.improveitmd.com/api`

| Endpoint | Collection |
|----------|------------|
| `/services` | Local Pages |
| `/blog` | Blog Posts |
| `/blog-alt` | Blog Drafts |
| `/lp` | Landing Pages |
| `/james-hardie` | James Hardie Colors |
| `/timbertech` | Timbertech Colors |
| `/service-area-cities` | Service Area Cities |
| `/service-area-counties` | Service Area Counties |
| `/city` | City Local Pages |
| `/maryland` | Local Pages Maryland |
| `/virginia` | Local Pages Virginia |
| `/videos` | Videos |
| `/review-testimonials` | Reviews/Testimonials |
| `/sales` | Sales |
| `/farmlands` | Cash for Lands |
| `/land` | Clearing Businesses |
| `/code-snippets` | Code Snippets |

### GraphQL
Endpoint: `https://cms.improveitmd.com/graphql`

### Sitemap
URL: `https://cms.improveitmd.com/api/strapi-5-sitemap-plugin/sitemap.xml`

---

## Migration Scripts

Located in `migration/scripts/`:

| Script | Purpose |
|--------|---------|
| `01-export-webflow.ts` | Export data from Webflow API |
| `02-generate-schemas.ts` | Generate Strapi content type schemas |
| `03-import-content.ts` | Import content to Strapi |
| `04-upload-assets.ts` | Upload media files |
| `05-verify-migration.ts` | Verify migration completeness |
| `link-assets.ts` | Link uploaded assets to entries |
| `link-video-urls.ts` | Link YouTube/Vimeo URLs to entries |

### Running Migration Commands

```bash
cd migration
npm install

# Full migration
npm run export              # Export from Webflow
npm run generate-schemas    # Generate Strapi schemas
npm run import-content      # Import content
npm run upload-assets       # Upload media
npm run verify              # Verify migration

# Or run all at once
npm run migrate:all
```

---

## Key Technical Decisions

### 1. All Fields Optional
All migrated fields set to `required: false` to handle incomplete Webflow items (drafts, partial content).

### 2. VideoLink as String
Webflow VideoLink fields (YouTube/Vimeo embeds) stored as URL strings, not media files.

### 3. ARM64 Build
Production builds use QEMU emulation for ARM64 architecture compatibility with VPS.

### 4. No Docker Cache
Disabled Docker layer caching to ensure fresh builds with all content types.

---

## Files Modified/Created

### Strapi (`strapi/`)
- `src/api/*/` - 17 content type schemas
- `config/plugins.ts` - Plugin configuration
- `Dockerfile.prod` - Production Docker build
- `docker-compose.prod.yml` - Production compose file

### Migration (`migration/`)
- `src/mappers/field-type-mapper.ts` - Field type conversion
- `src/strapi/schema-generator.ts` - Schema generation with custom fields
- `src/strapi/content-importer.ts` - Content import logic
- `src/strapi/asset-uploader.ts` - Asset upload and linking

### CI/CD (`.github/workflows/`)
- `deploy-strapi.yml` - Full deployment pipeline with ARM64 support

---

## Environment Variables

### Production (set via GitHub Secrets)
- `DATABASE_NAME` - PostgreSQL database name
- `DATABASE_USERNAME` - PostgreSQL username
- `DATABASE_PASSWORD` - PostgreSQL password
- `JWT_SECRET` - JWT signing secret
- `ADMIN_JWT_SECRET` - Admin JWT secret
- `APP_KEYS` - Application keys
- `API_TOKEN_SALT` - API token salt
- `TRANSFER_TOKEN_SALT` - Transfer token salt
- `VPS_HOST` - Server hostname/IP
- `VPS_USERNAME` - SSH username
- `VPS_SSH_KEY` - SSH private key
- `VPS_SSH_PORT` - SSH port

### Local Development (`migration/.env`)
- `WEBFLOW_ACCESS_TOKEN` - Webflow API token
- `WEBFLOW_SITE_ID` - Webflow site ID
- `STRAPI_URL` - Strapi API URL
- `STRAPI_API_TOKEN` - Strapi API token

---

## Next Steps / Maintenance

### Adding New Content Types
1. Create schema in `strapi/src/api/{name}/content-types/{name}/schema.json`
2. Add controller, routes, service files
3. Push to main branch to trigger deployment

### Updating Content
- Use Strapi admin panel at https://cms.improveitmd.com/admin
- Or use REST/GraphQL API with valid API token

### Adding Code Snippets
1. Go to Admin Panel → Code Snippets
2. Create new entry with code type, content, and location
3. Query via API and inject into frontend

### Backup
- Database: PostgreSQL in Docker volume `strapi-db-data`
- Uploads: Docker volume `strapi-uploads`
- Consider regular pg_dump backups

---

## Support

- **Strapi Documentation:** https://docs.strapi.io
- **GitHub Repository:** https://github.com/osamarehman/capitol
- **Admin Panel:** https://cms.improveitmd.com/admin
