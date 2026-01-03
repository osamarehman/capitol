#!/usr/bin/env tsx
/**
 * Script 01: Export Webflow Data
 *
 * This script exports all data from Webflow:
 * 1. Collection schemas (field definitions)
 * 2. Collection items (with pagination)
 * 3. Assets (images, files)
 */

import { validateConfig, CONFIG } from '../src/config/index.js';
import { exportCollections } from '../src/webflow/collections.js';
import { exportAllCollectionItems, loadCollectionItems } from '../src/webflow/items.js';
import { extractAssetUrls, downloadAllAssets, saveAssetInfo } from '../src/webflow/assets.js';
import { logger } from '../src/utils/logger.js';

async function main() {
  logger.info('=== Webflow Export Script ===');
  logger.info(`Site ID: ${CONFIG.webflow.siteId}`);

  // Validate configuration
  try {
    validateConfig();
  } catch (error) {
    logger.error('Configuration error:', (error as Error).message);
    process.exit(1);
  }

  try {
    // Step 1: Export collections
    logger.info('\n--- Step 1: Exporting Collections ---');
    const collections = await exportCollections();
    logger.info(`Exported ${collections.length} collections`);

    // Step 2: Export items from each collection
    logger.info('\n--- Step 2: Exporting Collection Items ---');
    const results = await exportAllCollectionItems(collections);

    // Step 3: Download assets
    logger.info('\n--- Step 3: Downloading Assets ---');
    for (const result of results) {
      const items = loadCollectionItems(result.collectionSlug);
      const assets = extractAssetUrls(items, result.collectionSlug);

      if (assets.length > 0) {
        logger.info(`Found ${assets.length} assets in ${result.collectionSlug}`);
        saveAssetInfo(assets, result.collectionSlug);
        await downloadAllAssets(assets, 5);
      }
    }

    // Summary
    logger.info('\n=== Export Complete ===');
    logger.info('Collections:', collections.length);
    logger.info(
      'Total items:',
      results.reduce((sum, r) => sum + r.itemCount, 0)
    );
    logger.info('\nExported data saved to:', CONFIG.paths.root + '/data');
    logger.info('\nNext step: Run npm run generate-schemas');
  } catch (error) {
    logger.error('Export failed:', error);
    process.exit(1);
  }
}

main();
