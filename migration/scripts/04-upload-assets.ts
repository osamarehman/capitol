#!/usr/bin/env tsx
/**
 * Script 04: Upload Assets to Strapi
 *
 * This script uploads downloaded assets to Strapi and links them to entries.
 * Run this after 03-import-content.ts
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { loadCollections } from '../src/webflow/collections.js';
import { uploadCollectionAssets, linkAssetsToEntries } from '../src/strapi/asset-uploader.js';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

async function main() {
  logger.info('=== Asset Upload Script ===');

  // Check Strapi connection
  logger.info('Checking Strapi connection...');
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }

  if (!CONFIG.strapi.apiToken) {
    logger.error('STRAPI_API_TOKEN not configured');
    process.exit(1);
  }

  try {
    // Load collections
    const collections = loadCollections();

    // Load collection ID to API name mapping
    const collectionIdMapPath = join(CONFIG.paths.mappings, 'collection-id-map.json');
    const collectionIdMap: Record<string, string> = existsSync(collectionIdMapPath)
      ? JSON.parse(readFileSync(collectionIdMapPath, 'utf-8'))
      : {};

    // Phase 1: Upload assets
    logger.info('\n--- Phase 1: Uploading Assets ---');

    for (const collection of collections) {
      const strapiContentType = collectionIdMap[collection.id];
      if (!strapiContentType) continue;

      logger.info(`\nProcessing assets for ${collection.displayName}...`);
      await uploadCollectionAssets(collection.slug, 3);
    }

    // Phase 2: Link assets to entries
    logger.info('\n--- Phase 2: Linking Assets to Entries ---');

    for (const collection of collections) {
      const strapiContentType = collectionIdMap[collection.id];
      if (!strapiContentType) continue;

      const pluralName = strapiContentType.replace(/-/g, '_') + 's';
      await linkAssetsToEntries(collection.slug, pluralName);
    }

    // Summary
    logger.info('\n=== Asset Upload Complete ===');
    logger.info('Next step: Run npm run verify');
  } catch (error) {
    logger.error('Asset upload failed:', error);
    process.exit(1);
  }
}

main();
