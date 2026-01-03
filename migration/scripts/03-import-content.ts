#!/usr/bin/env tsx
/**
 * Script 03: Import Content to Strapi
 *
 * This script imports exported Webflow items into Strapi.
 * Run this after:
 * - 01-export-webflow.ts
 * - 02-generate-schemas.ts
 * - Strapi restart and API token generation
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { loadCollections } from '../src/webflow/collections.js';
import { importCollectionItems, linkReferenceFields } from '../src/strapi/content-importer.js';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

/**
 * Get the pluralName from a Strapi schema file
 */
function getPluralName(singularName: string): string {
  const schemaPath = join(
    CONFIG.paths.schemas,
    singularName,
    'content-types',
    singularName,
    'schema.json'
  );

  if (!existsSync(schemaPath)) {
    logger.warn(`Schema not found: ${schemaPath}, using singularName + 's'`);
    return singularName + 's';
  }

  const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
  return schema.info?.pluralName || singularName + 's';
}

async function main() {
  logger.info('=== Content Import Script ===');

  // Check Strapi API token
  if (!CONFIG.strapi.apiToken) {
    logger.error('STRAPI_API_TOKEN not configured in .env');
    logger.error('Create a Full Access API token in Strapi admin panel:');
    logger.error('  Settings > Global settings > API Tokens');
    process.exit(1);
  }

  // Check Strapi health
  logger.info('Checking Strapi connection...');
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    logger.error('Make sure Strapi is running: cd strapi && docker-compose up -d');
    process.exit(1);
  }

  // Validate API token
  const isValidToken = await strapiClient.validateToken();
  if (!isValidToken) {
    logger.error('Invalid Strapi API token');
    process.exit(1);
  }

  logger.info('Strapi connection successful');

  try {
    // Load collections
    const collections = loadCollections();
    logger.info(`Found ${collections.length} collections to import`);

    // Load collection ID to API name mapping
    const collectionIdMapPath = join(CONFIG.paths.mappings, 'collection-id-map.json');
    if (!existsSync(collectionIdMapPath)) {
      logger.error('Collection mapping not found. Run schema generation first:');
      logger.error('  npm run generate-schemas');
      process.exit(1);
    }
    const collectionIdMap: Record<string, string> = JSON.parse(
      readFileSync(collectionIdMapPath, 'utf-8')
    );

    // Phase 1: Import all items (without references)
    logger.info('\n--- Phase 1: Importing Items ---');

    for (const collection of collections) {
      const singularName = collectionIdMap[collection.id];
      if (!singularName) {
        logger.warn(`No Strapi content type found for ${collection.displayName}`);
        continue;
      }

      // Get the actual pluralName from schema for API endpoint
      const pluralName = getPluralName(singularName);
      logger.info(`\nImporting ${collection.displayName} -> ${pluralName}`);

      await importCollectionItems(collection, pluralName);
    }

    // Phase 2: Link reference fields
    logger.info('\n--- Phase 2: Linking References ---');

    for (const collection of collections) {
      const singularName = collectionIdMap[collection.id];
      if (!singularName) continue;

      const pluralName = getPluralName(singularName);
      await linkReferenceFields(collection, pluralName);
    }

    // Summary
    logger.info('\n=== Import Complete ===');
    logger.info('Next step: Run npm run upload-assets');
  } catch (error) {
    logger.error('Import failed:', error);
    process.exit(1);
  }
}

main();
