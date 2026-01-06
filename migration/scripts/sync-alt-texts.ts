/**
 * Sync Webflow alt texts to Strapi media files
 *
 * This script reads the alt text fields from Webflow items and updates
 * the corresponding media files in Strapi with the proper alt text.
 */

import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import { CONFIG } from '../src/config/index.js';
import { logger } from '../src/utils/logger.js';

interface AssetMapping {
  localPath: string;
  webflowUrl: string;
  strapiId: number;
  strapiUrl: string;
  alt?: string;
}

interface IdMapping {
  webflowId: string;
  strapiDocumentId: string;
  strapiId: number;
}

// Map of image field to alt text field
const ALT_TEXT_FIELD_MAP: Record<string, string> = {
  'recent-project-keyword-image': 'alt-text-for-keyword-image',
  'project-image-1': 'alt-text-for-project-image-1',
  'project-image-2': 'alt-text-for-project-image-2',
  'project-image-3': 'alt-text-for-project-image-3',
  'community-image': 'community-image-alt-text',
  'open-graph-image-url': 'open-graph-title', // Use OG title as alt for OG image
  'blog-image': 'name', // Use item name as alt for blog images
};

// Collections to process
const COLLECTIONS = [
  { itemsFile: 'maryland', assetsFile: 'maryland', strapiType: 'local-pages-marylands' },
  { itemsFile: 'virginia', assetsFile: 'virginia', strapiType: 'local-pages-virginia' },
  { itemsFile: 'city', assetsFile: 'city', strapiType: 'city' },
  { itemsFile: 'lp', assetsFile: 'lp', strapiType: 'services' },
  { itemsFile: 'blog', assetsFile: 'blog', strapiType: 'blogs' },
  { itemsFile: 'blog-alt', assetsFile: 'blog-alt', strapiType: 'blog-alt-drafts' },
];

async function updateMediaAltText(mediaId: number, altText: string): Promise<boolean> {
  try {
    // Strapi 5 uses POST with form-data to update file info
    const FormData = (await import('form-data')).default;
    const formData = new FormData();
    formData.append('fileInfo', JSON.stringify({ alternativeText: altText }));

    await axios.post(
      `${CONFIG.strapi.baseUrl}/api/upload?id=${mediaId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          ...formData.getHeaders(),
        },
      }
    );
    return true;
  } catch (error) {
    logger.error(`Failed to update media ${mediaId}:`, (error as Error).message);
    return false;
  }
}

async function syncCollectionAltTexts(
  itemsFile: string,
  assetsFile: string
): Promise<number> {
  const itemsPath = join(CONFIG.paths.items, `${itemsFile}.json`);
  const assetMappingsPath = join(CONFIG.paths.mappings, `${assetsFile}-assets.json`);

  if (!existsSync(itemsPath)) {
    logger.warn(`Items file not found: ${itemsPath}`);
    return 0;
  }

  if (!existsSync(assetMappingsPath)) {
    logger.warn(`Asset mappings not found: ${assetMappingsPath}`);
    return 0;
  }

  const items = JSON.parse(readFileSync(itemsPath, 'utf-8'));
  const assetMappings: AssetMapping[] = JSON.parse(readFileSync(assetMappingsPath, 'utf-8'));

  // Build lookup: webflowUrl -> strapiId
  const strapiIdByUrl = new Map(assetMappings.map(a => [a.webflowUrl, a.strapiId]));

  let updated = 0;

  for (const item of items) {
    const fieldData = item.fieldData || {};
    const itemName = fieldData.name || fieldData.title || '';

    for (const [imageField, altTextField] of Object.entries(ALT_TEXT_FIELD_MAP)) {
      const imageData = fieldData[imageField];

      if (!imageData || typeof imageData !== 'object' || !imageData.url) {
        continue;
      }

      // Get alt text from the corresponding field
      let altText = altTextField === 'name'
        ? itemName
        : fieldData[altTextField];

      if (!altText || typeof altText !== 'string') {
        continue;
      }

      // Clean up alt text
      altText = altText.trim();
      if (!altText) continue;

      // Find the Strapi media ID
      const strapiId = strapiIdByUrl.get(imageData.url);
      if (!strapiId) {
        continue;
      }

      // Update the alt text in Strapi
      const success = await updateMediaAltText(strapiId, altText);
      if (success) {
        updated++;
        logger.debug(`Updated alt text for media ${strapiId}: "${altText.substring(0, 50)}..."`);
      }
    }
  }

  return updated;
}

async function main() {
  logger.info('Starting alt text sync...');
  logger.info(`Strapi URL: ${CONFIG.strapi.baseUrl}`);

  let totalUpdated = 0;

  for (const collection of COLLECTIONS) {
    logger.info(`\nProcessing ${collection.itemsFile}...`);

    const updated = await syncCollectionAltTexts(
      collection.itemsFile,
      collection.assetsFile
    );

    totalUpdated += updated;
    logger.info(`Updated ${updated} media files for ${collection.itemsFile}`);
  }

  logger.info(`\n=== Summary ===`);
  logger.info(`Total media files updated: ${totalUpdated}`);
}

main().catch((error) => {
  logger.error('Alt text sync failed:', error.message);
  process.exit(1);
});
