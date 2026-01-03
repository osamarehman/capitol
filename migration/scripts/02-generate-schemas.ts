#!/usr/bin/env tsx
/**
 * Script 02: Generate Strapi Schemas
 *
 * This script generates Strapi 5 content-type schemas from exported Webflow collections.
 * Run this after 01-export-webflow.ts
 *
 * Generated files:
 * - strapi/src/api/[collection]/content-types/[collection]/schema.json
 * - strapi/src/api/[collection]/routes/[collection].ts
 * - strapi/src/api/[collection]/controllers/[collection].ts
 * - strapi/src/api/[collection]/services/[collection].ts
 */

import { existsSync } from 'fs';
import { loadCollections } from '../src/webflow/collections.js';
import { generateStrapiSchemas, writeStrapiSchemas } from '../src/strapi/schema-generator.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

async function main() {
  logger.info('=== Schema Generation Script ===');

  // Check if export was run
  const collectionsPath = `${CONFIG.paths.collections}/collections.json`;
  if (!existsSync(collectionsPath)) {
    logger.error('Collections data not found. Run export script first:');
    logger.error('  npm run export');
    process.exit(1);
  }

  try {
    // Load exported collections
    logger.info('Loading exported collections...');
    const collections = loadCollections();
    logger.info(`Loaded ${collections.length} collections`);

    // Log collection summary
    for (const collection of collections) {
      logger.info(`  - ${collection.displayName}: ${collection.fields.length} fields`);
    }

    // Generate Strapi schemas
    logger.info('\nGenerating Strapi schemas...');
    const schemas = generateStrapiSchemas(collections);

    // Write schema files
    logger.info('\nWriting schema files...');
    writeStrapiSchemas(schemas);

    // Summary
    logger.info('\n=== Schema Generation Complete ===');
    logger.info(`Generated ${schemas.size} content types`);
    logger.info(`\nSchema files written to: ${CONFIG.paths.schemas}`);
    logger.info('\nNext steps:');
    logger.info('1. Restart Strapi to load new content types:');
    logger.info('   cd strapi && docker-compose restart strapi');
    logger.info('2. Verify content types in admin panel: http://localhost:1337/admin');
    logger.info('3. Create an API token for migration');
    logger.info('4. Run: npm run import-content');
  } catch (error) {
    logger.error('Schema generation failed:', error);
    process.exit(1);
  }
}

main();
