# Strapi Headless CMS - API Guide

**Production URL:** `https://cms.improveitmd.com`
**API Base URL:** `https://cms.improveitmd.com/api`
**GraphQL Endpoint:** `https://cms.improveitmd.com/graphql`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Available Endpoints](#available-endpoints)
3. [REST API Usage](#rest-api-usage)
4. [GraphQL Usage](#graphql-usage)
5. [Query Parameters](#query-parameters)
6. [Frontend Integration Examples](#frontend-integration-examples)
7. [Media/Assets](#mediaassets)
8. [Code Snippets Collection](#code-snippets-collection)

---

## Authentication

### Public Access (Read-Only)
For public content, configure permissions in Strapi Admin:
1. Go to **Settings → Users & Permissions → Roles → Public**
2. Enable `find` and `findOne` for collections you want public
3. No authentication header needed for public endpoints

### API Token (Full Access)
For authenticated requests, use Bearer token:

```
Authorization: Bearer YOUR_API_TOKEN
```

Create API tokens in: **Admin → Settings → API Tokens**

---

## Available Endpoints

### Content Collections

| Endpoint | Collection | Description |
|----------|------------|-------------|
| `/api/services` | Local Pages | Main service pages (385 items) |
| `/api/blog` | Blog Posts | Blog articles (28 items) |
| `/api/blog-alt` | Blog Drafts | Draft blog posts (19 items) |
| `/api/lp` | Landing Pages | Marketing landing pages (29 items) |
| `/api/james-hardie` | James Hardie Colors | Product colors (19 items) |
| `/api/timbertech` | Timbertech Colors | Product colors (10 items) |
| `/api/service-area-cities` | Service Area Cities | City service areas (175 items) |
| `/api/service-area-counties` | Service Area Counties | County service areas (13 items) |
| `/api/city` | City Local Pages | City-specific pages (10 items) |
| `/api/maryland` | Maryland Pages | Maryland local pages (1 item) |
| `/api/virginia` | Virginia Pages | Virginia local pages (1 item) |
| `/api/videos` | Videos | Video content (3 items) |
| `/api/review-testimonials` | Reviews | Customer testimonials (18 items) |
| `/api/sales` | Sales | Sales pages (5 items) |
| `/api/farmlands` | Cash for Lands | Land purchase pages (2 items) |
| `/api/land` | Clearing Business | Business clearing (1 item) |
| `/api/code-snippets` | Code Snippets | Reusable code (JS, CSS, HTML, JSON) |

### Special Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/upload/files` | Media library files |
| `/graphql` | GraphQL playground & API |
| `/api/strapi-5-sitemap-plugin/sitemap.xml` | XML Sitemap |
| `/_health` | Health check endpoint |

---

## REST API Usage

### Get All Items (List)

```bash
GET https://cms.improveitmd.com/api/services
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123xyz",
      "title": "Roofing - Washington DC",
      "slug": "roofing-washington-dc",
      "seoTitleTag": "Roofing Contractors in Washington DC",
      "seoMetaDescription": "Professional roofing services...",
      "createdAt": "2026-01-03T07:15:49.764Z",
      "updatedAt": "2026-01-03T07:15:49.764Z",
      "publishedAt": "2026-01-03T07:15:49.793Z"
    },
    // ... more items
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 16,
      "total": 385
    }
  }
}
```

### Get Single Item by Document ID

```bash
GET https://cms.improveitmd.com/api/services/abc123xyz
```

### Get Single Item by Slug (Filter)

```bash
GET https://cms.improveitmd.com/api/services?filters[slug][$eq]=roofing-washington-dc
```

### Get Item with Relations & Media

```bash
GET https://cms.improveitmd.com/api/services/abc123xyz?populate=*
```

---

## Query Parameters

### Pagination

```bash
# Page-based pagination
?pagination[page]=1&pagination[pageSize]=10

# Offset-based pagination
?pagination[start]=0&pagination[limit]=10

# Get total count
?pagination[withCount]=true
```

### Sorting

```bash
# Sort ascending
?sort=title:asc

# Sort descending
?sort=createdAt:desc

# Multiple sorts
?sort[0]=title:asc&sort[1]=createdAt:desc
```

### Filtering

```bash
# Exact match
?filters[slug][$eq]=roofing-washington-dc

# Contains (case-sensitive)
?filters[title][$contains]=Roofing

# Contains (case-insensitive)
?filters[title][$containsi]=roofing

# Not equal
?filters[isActive][$ne]=false

# Greater than
?filters[priority][$gt]=5

# Less than or equal
?filters[priority][$lte]=10

# In array
?filters[codeType][$in][0]=javascript&filters[codeType][$in][1]=css

# Is null
?filters[description][$null]=true

# Is not null
?filters[description][$notNull]=true

# Multiple filters (AND)
?filters[isActive][$eq]=true&filters[isGlobal][$eq]=true
```

### Field Selection

```bash
# Only return specific fields
?fields[0]=title&fields[1]=slug&fields[2]=seoTitleTag
```

### Population (Relations & Media)

```bash
# Populate all relations
?populate=*

# Populate specific relation
?populate[0]=headerImage

# Nested population
?populate[headerImage][fields][0]=url&populate[headerImage][fields][1]=alternativeText

# Deep population
?populate=deep
```

### Combined Example

```bash
GET https://cms.improveitmd.com/api/services?
  filters[slug][$containsi]=roofing&
  sort=title:asc&
  pagination[page]=1&
  pagination[pageSize]=10&
  fields[0]=title&
  fields[1]=slug&
  fields[2]=seoMetaDescription&
  populate[headerImage][fields][0]=url
```

---

## GraphQL Usage

### Endpoint
```
POST https://cms.improveitmd.com/graphql
```

### Example Queries

**Get all blog posts:**
```graphql
query {
  blogs {
    title
    slug
    seoMetaDescription
    createdAt
  }
}
```

**Get single service by slug:**
```graphql
query {
  services(filters: { slug: { eq: "roofing-washington-dc" } }) {
    title
    slug
    seoTitleTag
    seoMetaDescription
    h1Hangline
    headerDescription
  }
}
```

**Get paginated results:**
```graphql
query {
  services(
    pagination: { page: 1, pageSize: 10 }
    sort: "title:asc"
  ) {
    title
    slug
  }
}
```

**Get code snippets for head:**
```graphql
query {
  codeSnippets(
    filters: {
      location: { eq: "head" }
      isActive: { eq: true }
    }
    sort: "priority:desc"
  ) {
    title
    codeType
    code
    isGlobal
    pages
  }
}
```

### Using GraphQL with Fetch

```javascript
const query = `
  query GetServices($slug: String!) {
    services(filters: { slug: { eq: $slug } }) {
      title
      slug
      seoMetaDescription
    }
  }
`;

const response = await fetch('https://cms.improveitmd.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_TOKEN' // if needed
  },
  body: JSON.stringify({
    query,
    variables: { slug: 'roofing-washington-dc' }
  })
});

const { data } = await response.json();
```

---

## Frontend Integration Examples

### JavaScript (Fetch)

```javascript
// Fetch all services
async function getServices() {
  const response = await fetch('https://cms.improveitmd.com/api/services?pagination[pageSize]=100');
  const { data } = await response.json();
  return data;
}

// Fetch single service by slug
async function getServiceBySlug(slug) {
  const response = await fetch(
    `https://cms.improveitmd.com/api/services?filters[slug][$eq]=${slug}&populate=*`
  );
  const { data } = await response.json();
  return data[0] || null;
}
```

### React / Next.js

```javascript
// hooks/useStrapi.js
import { useState, useEffect } from 'react';

const STRAPI_URL = 'https://cms.improveitmd.com/api';

export function useStrapi(endpoint, params = '') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${STRAPI_URL}/${endpoint}${params}`);
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint, params]);

  return { data, loading, error };
}

// Usage in component
function BlogList() {
  const { data: posts, loading } = useStrapi('blog', '?sort=createdAt:desc');

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.documentId}>
          <a href={`/blog/${post.slug}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
}
```

### Next.js (App Router - Server Components)

```javascript
// app/services/[slug]/page.js
const STRAPI_URL = 'https://cms.improveitmd.com/api';

async function getService(slug) {
  const res = await fetch(
    `${STRAPI_URL}/services?filters[slug][$eq]=${slug}&populate=*`,
    { next: { revalidate: 60 } } // ISR: revalidate every 60 seconds
  );
  const { data } = await res.json();
  return data[0];
}

export default async function ServicePage({ params }) {
  const service = await getService(params.slug);

  if (!service) {
    return <div>Not found</div>;
  }

  return (
    <article>
      <h1>{service.title}</h1>
      <p>{service.headerDescription}</p>
    </article>
  );
}

// Generate static paths
export async function generateStaticParams() {
  const res = await fetch(`${STRAPI_URL}/services?fields[0]=slug`);
  const { data } = await res.json();

  return data.map(service => ({
    slug: service.slug,
  }));
}
```

### Vue.js

```javascript
// composables/useStrapi.js
import { ref, onMounted } from 'vue';

const STRAPI_URL = 'https://cms.improveitmd.com/api';

export function useStrapi(endpoint) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const response = await fetch(`${STRAPI_URL}/${endpoint}`);
      const json = await response.json();
      data.value = json.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  });

  return { data, loading, error };
}
```

### PHP

```php
<?php
function getFromStrapi($endpoint, $params = '') {
    $url = "https://cms.improveitmd.com/api/{$endpoint}{$params}";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        // 'Authorization: Bearer YOUR_API_TOKEN' // if needed
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Get all services
$services = getFromStrapi('services', '?pagination[pageSize]=100');

// Get single service by slug
$service = getFromStrapi('services', '?filters[slug][$eq]=roofing-washington-dc');
```

### Python

```python
import requests

STRAPI_URL = 'https://cms.improveitmd.com/api'

def get_from_strapi(endpoint, params=None):
    url = f"{STRAPI_URL}/{endpoint}"
    headers = {
        'Content-Type': 'application/json',
        # 'Authorization': 'Bearer YOUR_API_TOKEN'  # if needed
    }
    response = requests.get(url, headers=headers, params=params)
    return response.json()

# Get all services
services = get_from_strapi('services', {'pagination[pageSize]': 100})

# Get single service by slug
service = get_from_strapi('services', {
    'filters[slug][$eq]': 'roofing-washington-dc',
    'populate': '*'
})
```

---

## Media/Assets

### Image URLs

Media files are served from: `https://cms.improveitmd.com/uploads/`

When you populate media fields, you get:

```json
{
  "headerImage": {
    "id": 123,
    "url": "/uploads/image_abc123.jpg",
    "alternativeText": "Roofing project",
    "width": 1920,
    "height": 1080,
    "formats": {
      "thumbnail": {
        "url": "/uploads/thumbnail_image_abc123.jpg",
        "width": 245,
        "height": 156
      },
      "small": {
        "url": "/uploads/small_image_abc123.jpg",
        "width": 500,
        "height": 318
      },
      "medium": {
        "url": "/uploads/medium_image_abc123.jpg",
        "width": 750,
        "height": 477
      },
      "large": {
        "url": "/uploads/large_image_abc123.jpg",
        "width": 1000,
        "height": 636
      }
    }
  }
}
```

### Constructing Full Image URL

```javascript
const STRAPI_BASE = 'https://cms.improveitmd.com';

function getImageUrl(image, size = null) {
  if (!image) return null;

  let url = image.url;

  // Use specific size if available
  if (size && image.formats && image.formats[size]) {
    url = image.formats[size].url;
  }

  // Make absolute URL
  if (url.startsWith('/')) {
    url = `${STRAPI_BASE}${url}`;
  }

  return url;
}

// Usage
const thumbnailUrl = getImageUrl(service.headerImage, 'thumbnail');
const fullUrl = getImageUrl(service.headerImage);
```

---

## Code Snippets Collection

### Query Code for Specific Location

```javascript
// Get all head scripts
async function getHeadScripts() {
  const response = await fetch(
    'https://cms.improveitmd.com/api/code-snippets?' +
    'filters[location][$eq]=head&' +
    'filters[isActive][$eq]=true&' +
    'sort=priority:desc'
  );
  const { data } = await response.json();
  return data;
}

// Get scripts for specific page
async function getPageScripts(pagePath) {
  const response = await fetch(
    'https://cms.improveitmd.com/api/code-snippets?' +
    'filters[isActive][$eq]=true&' +
    'filters[$or][0][isGlobal][$eq]=true&' +
    `filters[$or][1][pages][$containsi]=${pagePath}`
  );
  const { data } = await response.json();
  return data;
}
```

### Inject Code into Page

```javascript
// Next.js example - app/layout.js
async function getGlobalScripts() {
  const res = await fetch(
    'https://cms.improveitmd.com/api/code-snippets?' +
    'filters[isGlobal][$eq]=true&' +
    'filters[isActive][$eq]=true&' +
    'filters[location][$eq]=head'
  );
  const { data } = await res.json();
  return data;
}

export default async function RootLayout({ children }) {
  const headScripts = await getGlobalScripts();

  return (
    <html>
      <head>
        {headScripts.map(script => (
          <Fragment key={script.documentId}>
            {script.codeType === 'javascript' && (
              <script dangerouslySetInnerHTML={{ __html: script.code }} />
            )}
            {script.codeType === 'css' && (
              <style dangerouslySetInnerHTML={{ __html: script.code }} />
            )}
            {script.codeType === 'json' && (
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: script.code }}
              />
            )}
          </Fragment>
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Common Patterns

### Get All Items for Static Site Generation

```javascript
async function getAllSlugs(collection) {
  let allItems = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://cms.improveitmd.com/api/${collection}?` +
      `fields[0]=slug&` +
      `pagination[page]=${page}&` +
      `pagination[pageSize]=100`
    );
    const { data, meta } = await response.json();

    allItems = [...allItems, ...data];
    hasMore = page < meta.pagination.pageCount;
    page++;
  }

  return allItems.map(item => item.slug);
}
```

### SEO Meta Tags

```javascript
// Get SEO data for a page
function getSeoMeta(item) {
  return {
    title: item.seoTitleTag || item.title,
    description: item.seoMetaDescription || '',
    openGraph: {
      title: item.openGraphTitle || item.seoTitleTag || item.title,
      description: item.openGraphDescription || item.seoMetaDescription || '',
    }
  };
}
```

### Handle Rich Text

Strapi rich text fields return HTML or Markdown depending on configuration:

```javascript
// If HTML
<div dangerouslySetInnerHTML={{ __html: item.content }} />

// If Markdown - use a library like marked
import { marked } from 'marked';
<div dangerouslySetInnerHTML={{ __html: marked(item.content) }} />
```

---

## Rate Limits & Caching

### Recommended Practices

1. **Cache responses** - Use ISR (Next.js) or cache headers
2. **Batch requests** - Fetch multiple items in one request
3. **Use pagination** - Don't fetch all items at once
4. **Field selection** - Only request fields you need

### Example with Caching (Next.js)

```javascript
// Revalidate every 60 seconds
const res = await fetch(url, {
  next: { revalidate: 60 }
});

// Or cache indefinitely and revalidate on demand
const res = await fetch(url, {
  next: { tags: ['services'] }
});

// Revalidate in API route
import { revalidateTag } from 'next/cache';
revalidateTag('services');
```

---

## Error Handling

```javascript
async function fetchFromStrapi(endpoint) {
  try {
    const response = await fetch(`https://cms.improveitmd.com/api/${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.error) {
      throw new Error(json.error.message);
    }

    return { data: json.data, meta: json.meta, error: null };
  } catch (error) {
    console.error('Strapi fetch error:', error);
    return { data: null, meta: null, error: error.message };
  }
}
```

---

## Quick Reference

| Action | REST Endpoint |
|--------|---------------|
| List all | `GET /api/{collection}` |
| Get one | `GET /api/{collection}/{documentId}` |
| Filter by slug | `GET /api/{collection}?filters[slug][$eq]=value` |
| With relations | `GET /api/{collection}?populate=*` |
| Paginate | `GET /api/{collection}?pagination[page]=1&pagination[pageSize]=10` |
| Sort | `GET /api/{collection}?sort=field:asc` |
| Search | `GET /api/{collection}?filters[title][$containsi]=keyword` |

---

## Support

- **Strapi Docs:** https://docs.strapi.io/dev-docs/api/rest
- **GraphQL Docs:** https://docs.strapi.io/dev-docs/api/graphql
- **Admin Panel:** https://cms.improveitmd.com/admin
