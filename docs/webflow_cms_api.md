## Complete Guide: Migrating Data and Assets Using Webflow CMS API

The Webflow CMS API enables you to programmatically export, migrate, and import your entire content library including collections, items, and assets. Here's a comprehensive guide to help you migrate your full data with assets.[1][2]

## Authentication Setup

You'll need to generate API credentials before making any requests:[3]

- Navigate to your Workspace Settings in Webflow
- Click on the "Apps and Integrations" tab
- Create a new Data Client app or generate a site-specific API token
- Copy your access token securely (you won't see it again)
- For Data Client apps, you'll need scopes: `cms:read`, `cms:write`, `assets:read`, `assets:write`[1]

## Exporting CMS Collections

### Using the API (Recommended for Complex Data)

The Webflow API v2 provides endpoints to retrieve all collection items programmatically:[2][4]

```javascript
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });

// Get all collections for a site
const collections = await webflow.collections.list(siteId);

// Export items from each collection with pagination
for (const collection of collections.collections) {
  let offset = 0;
  const limit = 100;
  let allItems = [];
  
  while (true) {
    const response = await webflow.collections.items.listItems(
      collection.id,
      { offset, limit }
    );
    
    allItems.push(...response.items);
    
    if (allItems.length >= response.pagination.total) break;
    offset += limit;
  }
  
  // Save items to JSON or process further
  console.log(`Exported ${allItems.length} items from ${collection.displayName}`);
}
```

The API returns paginated results, so you must loop through all pages to retrieve complete data. Each response includes pagination metadata with `limit`, `offset`, and `total` count.[4][5]

### Using CSV Export (Simple Data)

For simpler migrations without complex relationships:[6][7]

- Open the Webflow Designer
- Go to the Collections panel
- Select your target collection
- Click the "Export" button to download a CSV file
- This exports all items including archived ones

**Note:** CSV exports don't preserve complex reference field relationships and require manual linking.[7]

## Migrating Assets

### Downloading Existing Assets

Assets (images, documents) referenced in your CMS need separate handling since Webflow doesn't provide bulk asset downloads:[8]

**Step 1: Extract asset URLs from exported CMS data**
```javascript
// Parse your exported collection items
const imageUrls = items
  .map(item => item.imageField?.url)
  .filter(url => url);

// Save to text file
fs.writeFileSync('image-urls.txt', imageUrls.join('\n'));
```

**Step 2: Download assets programmatically**
```javascript
const https = require('https');
const fs = require('fs');
const path = require('path');

async function downloadAsset(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

// Download each asset
for (const url of imageUrls) {
  const filename = path.basename(new URL(url).pathname);
  await downloadAsset(url, `./assets/${filename}`);
}
```

### Uploading Assets to New Site

Webflow requires an MD5 hash for each uploaded asset to prevent duplicates and ensure data integrity:[1]

```javascript
import crypto from 'crypto';
import fs from 'fs';

// Generate MD5 hash for a file
function generateFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex');
}

// Create asset folder (optional organization)
const folder = await webflow.assets.createFolder(siteId, {
  displayName: "Migrated Assets"
});

// Upload asset
const filePath = './assets/image.jpg';
const fileHash = generateFileHash(filePath);
const fileBuffer = fs.readFileSync(filePath);

const asset = await webflow.assets.create(siteId, {
  fileName: "image.jpg",
  fileHash: fileHash,
  parentFolder: folder.id
});

// Upload file to returned URL
// Webflow provides a signed upload URL in the response
```

Assets must meet size requirements: images up to 4MB, documents up to 10MB. Supported formats include PNG, JPEG, GIF, SVG, WebP, AVIF for images, and PDF for documents.[1]

## Complete Migration Workflow

### Phase 1: Export from Source Site
1. Use the API to fetch all collections and their schemas
2. Export all collection items with pagination handling
3. Extract all asset URLs from image fields, file fields, and rich text
4. Download assets to local storage with organized folder structure

### Phase 2: Prepare Target Site
1. Manually recreate collection structures in the target site (or use API to create collections)
2. Create asset folders using the Assets API for organization[1]
3. Map old collection IDs to new collection IDs for reference fields

### Phase 3: Upload Assets
1. Generate MD5 hashes for all downloaded assets
2. Upload assets using the Assets API with proper folder organization[1]
3. Store mapping of old asset URLs to new asset IDs

### Phase 4: Import CMS Items
1. Transform exported data: replace old asset URLs with new asset IDs
2. Update reference field IDs to match new collection item IDs
3. Create items using the Collections API with proper field mappings
4. Handle staged vs published states appropriately

## Handling Reference Fields

Reference fields link items between collections. The API approach is superior for preserving these relationships:[7]

```javascript
// Create parent items first
const newParentIds = {};
for (const oldItem of parentCollectionItems) {
  const newItem = await webflow.collections.items.createItem(
    newParentCollectionId,
    { fields: transformFields(oldItem) }
  );
  newParentIds[oldItem.id] = newItem.id;
}

// Create child items with updated references
for (const oldItem of childCollectionItems) {
  const fields = transformFields(oldItem);
  // Update reference field with new parent ID
  fields.referenceField = newParentIds[oldItem.parentReference];
  
  await webflow.collections.items.createItem(
    newChildCollectionId,
    { fields }
  );
}
```

## Best Practices

- **Use API v2** for all new integrations, as v1 is deprecated[9]
- **Implement rate limiting** to avoid API throttling during bulk operations
- **Handle errors gracefully** with retry logic for failed uploads
- **Validate data** before import to catch field type mismatches
- **Test on staging site** before migrating production data
- **Keep audit logs** of old-to-new ID mappings for troubleshooting
- **Batch operations** when possible, but stay within pagination limits (typically 100 items per request)[5][4]

This approach gives you complete control over your migration process while preserving all relationships and assets across your Webflow CMS collections.[2][1]

[1](https://developers.webflow.com/data/v2.0.0-beta/docs/cms-tutorial)
[2](https://developers.webflow.com/data/reference/cms)
[3](https://www.memberstack.com/blog/webflow-api)
[4](https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints)
[5](https://community.parabola.io/t/api-export-only-exporting-100-of-129-rows-google-sheets-webflow-cms/672)
[6](https://www.digidop.com/blog/export-webflow-cms-data-step-by-step-guide)
[7](https://weshallconquer.com/blog/complex-webflow-migration-challenges)
[8](https://www.lightningux.design/blog/how-to-download-all-blog-images-from-webflow-cms-automatically)
[9](https://developers.webflow.com/data/docs/migrating-to-v2)
[10](https://developers.webflow.com/data/docs/working-with-assets)
[11](https://wishlist.webflow.com/ideas/WEBFLOW-I-6103)
[12](https://www.youtube.com/watch?v=alkw2vTLtM4)
[13](https://www.youtube.com/watch?v=lSpvsHCTXNg)