#!/usr/bin/env tsx
/**
 * Script 05: Verify Migration
 *
 * This script verifies the migration was successful by comparing
 * item counts and checking data integrity.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { loadCollections } from '../src/webflow/collections.js';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

interface VerificationResult {
  collection: string;
  webflowCount: number;
  strapiCount: number;
  match: boolean;
  assetsMapped: number;
  assetsUploaded: number;
}

async function main() {
  logger.info('=== Migration Verification Script ===');

  // Check Strapi connection
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }

  try {
    const collections = loadCollections();
    const results: VerificationResult[] = [];

    // Load collection ID to API name mapping
    const collectionIdMapPath = join(CONFIG.paths.mappings, 'collection-id-map.json');
    const collectionIdMap: Record<string, string> = existsSync(collectionIdMapPath)
      ? JSON.parse(readFileSync(collectionIdMapPath, 'utf-8'))
      : {};

    logger.info('\nVerifying each collection...\n');

    for (const collection of collections) {
      const strapiContentType = collectionIdMap[collection.id];
      if (!strapiContentType) {
        logger.warn(`No mapping for ${collection.displayName}`);
        continue;
      }

      // Count Webflow items
      const itemsPath = join(CONFIG.paths.items, `${collection.slug}.json`);
      const webflowItems = existsSync(itemsPath)
        ? JSON.parse(readFileSync(itemsPath, 'utf-8'))
        : [];

      // Count Strapi items
      const pluralName = strapiContentType.replace(/-/g, '_') + 's';
      let strapiCount = 0;

      try {
        const entries = await strapiClient.getEntries(pluralName, {
          'pagination[pageSize]': 1,
          'pagination[page]': 1,
        });
        // Get total from pagination if available
        strapiCount = entries.length; // This is just first page

        // Try to get actual count
        const countResponse = await strapiClient.getEntries(pluralName, {
          'pagination[pageSize]': 100,
        });
        strapiCount = countResponse.length;
      } catch {
        logger.warn(`Could not count entries for ${pluralName}`);
      }

      // Count assets
      const assetInfoPath = join(CONFIG.paths.assets, `${collection.slug}-info.json`);
      const assetMappingsPath = join(CONFIG.paths.mappings, `${collection.slug}-assets.json`);

      const assetsMapped = existsSync(assetInfoPath)
        ? JSON.parse(readFileSync(assetInfoPath, 'utf-8')).length
        : 0;

      const assetsUploaded = existsSync(assetMappingsPath)
        ? JSON.parse(readFileSync(assetMappingsPath, 'utf-8')).length
        : 0;

      const result: VerificationResult = {
        collection: collection.displayName,
        webflowCount: webflowItems.length,
        strapiCount,
        match: webflowItems.length === strapiCount,
        assetsMapped,
        assetsUploaded,
      };

      results.push(result);

      const status = result.match ? '\u2713' : '\u2717';
      logger.info(
        `${status} ${result.collection}: ` +
          `Webflow=${result.webflowCount}, Strapi=${result.strapiCount}, ` +
          `Assets=${result.assetsUploaded}/${result.assetsMapped}`
      );
    }

    // Summary
    logger.info('\n=== Verification Summary ===');

    const allMatch = results.every((r) => r.match);
    const totalWebflow = results.reduce((sum, r) => sum + r.webflowCount, 0);
    const totalStrapi = results.reduce((sum, r) => sum + r.strapiCount, 0);
    const totalAssetsMapped = results.reduce((sum, r) => sum + r.assetsMapped, 0);
    const totalAssetsUploaded = results.reduce((sum, r) => sum + r.assetsUploaded, 0);

    logger.info(`Collections verified: ${results.length}`);
    logger.info(`Total items: Webflow=${totalWebflow}, Strapi=${totalStrapi}`);
    logger.info(`Total assets: ${totalAssetsUploaded}/${totalAssetsMapped} uploaded`);

    if (allMatch && totalAssetsMapped === totalAssetsUploaded) {
      logger.info('\n\u2713 Migration verified successfully!');
    } else {
      logger.warn('\n\u26A0 Some discrepancies found. Review the output above.');
    }

    logger.info('\nStrapi admin panel: http://localhost:1337/admin');
    logger.info('Production URL will be: https://cms.improveitmd.com');
  } catch (error) {
    logger.error('Verification failed:', error);
    process.exit(1);
  }
}

main();
