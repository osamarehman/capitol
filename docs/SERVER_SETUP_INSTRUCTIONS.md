# Capitol CMS - Server Setup Instructions

## Overview

This document provides instructions for completing the Strapi CMS deployment on the production server at `cms.improveitmd.com`.

---

## What's Already Done (Local Development)

### 1. Strapi 5 CMS Setup
- Strapi 5.33.1 with PostgreSQL database
- Docker-based deployment (development and production configs)
- 16 content types migrated from Webflow CMS

### 2. Content Types Created
| Collection | Items | Description |
|------------|-------|-------------|
| Local Pages (services) | 385 | Main service pages |
| Blog Posts | 28 | Blog articles |
| Blog alt (draft)s | 19 | Draft blog posts |
| Landing Pages | 29 | Marketing landing pages |
| Service Area Cities | 175 | City service areas |
| Service Area Counties | 13 | County service areas |
| James Hardie Colors | 19 | Product colors |
| Timbertech Colors | 10 | Product colors |
| Review/Testimonials | 18 | Customer reviews |
| Videos | 3 | Video content |
| Sales | 5 | Sales pages |
| City Local Pages | 10 | City-specific pages |
| Local Pages - Maryland | 1 | Maryland pages |
| Local Pages - Virginia | 1 | Virginia pages |
| CASH FOR LANDs | 2 | Land purchase pages |
| CLEARING BUSINESSes | 1 | Business clearing |

### 3. Custom Fields Added to All Collections
Every content type includes these additional fields:
- `schemaMarkup` (text) - For JSON-LD structured data
- `customHtml` (text) - For custom HTML injection
- `customContent` (richtext) - Additional rich content
- `faqContent` (richtext) - FAQ content

### 4. Plugins Installed
- **SEO Plugin** (`@strapi-community/plugin-seo`) - Meta tags, SERP previews
- **Sitemap Plugin** (`strapi-5-sitemap-plugin`) - XML sitemap generation
- **GraphQL Plugin** (`@strapi/plugin-graphql`) - GraphQL API endpoint

### 5. CI/CD Pipeline
- GitHub Actions workflow at `.github/workflows/deploy-strapi.yml`
- Builds Docker image and pushes to GitHub Container Registry
- Deploys to VPS via SSH
- Triggers on push to `main` branch (strapi/** paths)

---

## What Needs to Be Done on Server

### Step 1: Verify Deployment Completed

Check if the GitHub Actions deployment succeeded:
```bash
# Check if containers are running
cd /opt/strapi
docker compose -f docker-compose.prod.yml ps

# Check Strapi logs
docker compose -f docker-compose.prod.yml logs --tail=50 strapi

# Verify health endpoint
curl -s http://localhost:1337/_health
```

Expected output: Strapi container running, health check returning OK.

### Step 2: Configure Reverse Proxy (Nginx/Caddy)

If not already configured, set up reverse proxy for `cms.improveitmd.com`:

**For Nginx:**
```nginx
server {
    listen 80;
    server_name cms.improveitmd.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cms.improveitmd.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**For Caddy (simpler, auto SSL):**
```
cms.improveitmd.com {
    reverse_proxy localhost:1337
}
```

### Step 3: Create Admin Account

1. Open https://cms.improveitmd.com/admin in browser
2. Create first administrator account:
   - First name: (your choice)
   - Last name: (your choice)
   - Email: (admin email)
   - Password: (strong password - save this!)

### Step 4: Create API Token for Migration

1. Login to admin panel
2. Go to **Settings** (gear icon) → **API Tokens**
3. Click **Create new API Token**
4. Configure:
   - Name: `migration`
   - Description: `Token for content migration`
   - Token duration: `Unlimited`
   - Token type: `Full access`
5. Click **Save**
6. **Copy the token immediately** (shown only once!)

### Step 5: Configure Sitemap Permissions

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. Find **Strapi-5-sitemap-plugin**
4. Enable `getSitemap` permission
5. Click **Save**

### Step 6: Configure Content Type Permissions (Optional)

To allow public read access to content:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. For each content type you want public:
   - Enable `find` (list all)
   - Enable `findOne` (get single item)
4. Click **Save**

---

## Content Migration to Production

After server setup is complete, run these commands from the **local development machine** (where the migration scripts are):

### Step 1: Update Migration Environment

Edit `migration/.env`:
```env
# Change from localhost to production
STRAPI_URL=https://cms.improveitmd.com
STRAPI_API_TOKEN=<paste-production-token-here>
```

### Step 2: Import Content

```bash
cd migration
npm run import-content
```

This imports all content directly to production Strapi.

### Step 3: Upload Assets (Images/Files)

```bash
npm run upload-assets
```

This uploads all media files from `migration/data/assets/` to production.

### Step 4: Verify Migration

```bash
npm run verify
```

Compares counts between Webflow export and Strapi.

---

## Server File Structure

After deployment, files on server:
```
/opt/strapi/
├── docker-compose.prod.yml    # Production compose file
├── .env                       # Environment variables (auto-created by CI/CD)
└── (Docker volumes for data persistence)
```

Docker volumes:
- `strapi-uploads` - Uploaded media files
- `strapi-db-data` - PostgreSQL database

---

## Important URLs

| URL | Description |
|-----|-------------|
| https://cms.improveitmd.com | Strapi home |
| https://cms.improveitmd.com/admin | Admin panel |
| https://cms.improveitmd.com/graphql | GraphQL Playground |
| https://cms.improveitmd.com/api/strapi-5-sitemap-plugin/sitemap.xml | XML Sitemap |

---

## Troubleshooting

### Container not starting
```bash
cd /opt/strapi
docker compose -f docker-compose.prod.yml logs strapi
```

### Database connection issues
```bash
docker compose -f docker-compose.prod.yml logs strapiDB
```

### Restart services
```bash
cd /opt/strapi
docker compose -f docker-compose.prod.yml restart
```

### Full reset (WARNING: deletes data)
```bash
cd /opt/strapi
docker compose -f docker-compose.prod.yml down -v
docker compose -f docker-compose.prod.yml up -d
```

### Check disk space
```bash
df -h
docker system df
```

### Clean old Docker images
```bash
docker image prune -f
```

---

## Environment Variables Reference

These are set automatically by CI/CD in `/opt/strapi/.env`:

| Variable | Description |
|----------|-------------|
| DATABASE_NAME | PostgreSQL database name |
| DATABASE_USERNAME | PostgreSQL username |
| DATABASE_PASSWORD | PostgreSQL password |
| JWT_SECRET | JWT signing secret |
| ADMIN_JWT_SECRET | Admin JWT secret |
| APP_KEYS | Application keys (comma-separated) |
| API_TOKEN_SALT | Salt for API tokens |
| TRANSFER_TOKEN_SALT | Salt for transfer tokens |
| STRAPI_URL | Public URL (https://cms.improveitmd.com) |

---

## Quick Health Check Commands

```bash
# Check all services
cd /opt/strapi && docker compose -f docker-compose.prod.yml ps

# Check Strapi health
curl -s https://cms.improveitmd.com/_health

# Check API is responding
curl -s https://cms.improveitmd.com/api/blog | head -100

# Check GraphQL
curl -s -X POST https://cms.improveitmd.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __typename }"}'
```

---

## Summary Checklist

- [ ] GitHub Actions deployment completed successfully
- [ ] Reverse proxy configured (Nginx/Caddy) with SSL
- [ ] Admin account created
- [ ] API token created for migration
- [ ] Sitemap permissions enabled
- [ ] Content migrated from local machine
- [ ] Assets uploaded from local machine
- [ ] Public API permissions configured (if needed)
- [ ] Health checks passing
