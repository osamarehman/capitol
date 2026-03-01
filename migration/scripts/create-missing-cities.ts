#!/usr/bin/env tsx
/**
 * Script: Create Missing Cities in Service Areas
 *
 * Creates cities that have local pages but don't exist in service-areas collection.
 * Based on analysis:
 * - Virginia cities: Arlington, Alexandria, Springfield, Falls Church, McLean, Annandale
 * - Maryland cities: Takoma Park, Chevy Chase, Damascus, Glenwood
 */

import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

// Cities to create based on local pages that exist but no service-area entry
// Note: counties field is a repeatable component, not included here (can be added manually)
const MISSING_CITIES = [
  // Virginia cities
  { title: 'Arlington', slug: 'arlington', state: 'VA' },
  { title: 'Alexandria', slug: 'alexandria', state: 'VA' },
  { title: 'Springfield', slug: 'springfield', state: 'VA' },
  { title: 'Falls Church', slug: 'falls-church', state: 'VA' },
  { title: 'McLean', slug: 'mclean', state: 'VA' },
  { title: 'Annandale', slug: 'annandale', state: 'VA' },
  // Maryland cities
  { title: 'Takoma Park', slug: 'takoma-park', state: 'MD' },
  { title: 'Chevy Chase', slug: 'chevy-chase', state: 'MD' },
  { title: 'Damascus', slug: 'damascus', state: 'MD' },
  { title: 'Glenwood', slug: 'glenwood', state: 'MD' },
];

async function main() {
  logger.info('=== Create Missing Cities in Service Areas ===');
  logger.info(`Target Strapi: ${CONFIG.strapi.baseUrl}`);

  // Check Strapi connection
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }

  const isValidToken = await strapiClient.validateToken();
  if (!isValidToken) {
    logger.error('Invalid Strapi API token');
    process.exit(1);
  }

  logger.info('Strapi connection successful\n');

  // Fetch existing service areas to check for duplicates
  logger.info('Fetching existing service areas...');
  const existingAreas = await strapiClient.getEntries('service-areas', {
    'pagination[pageSize]': 100,
    status: 'published',
  });

  const existingSlugs = new Set(existingAreas.map((sa: any) => sa.slug?.toLowerCase()));
  logger.info(`Found ${existingAreas.length} existing service areas\n`);

  let createdCount = 0;
  let skippedCount = 0;

  for (const city of MISSING_CITIES) {
    if (existingSlugs.has(city.slug.toLowerCase())) {
      logger.info(`SKIP: ${city.title} already exists`);
      skippedCount++;
      continue;
    }

    try {
      const data = {
        title: city.title,
        slug: city.slug,
        state: city.state,
        // Initialize with empty serviceLinks (will be populated by link script)
        serviceLinks: {
          roofing: null,
          siding: null,
          exteriorTrim: null,
          decks: null,
          windows: null,
          gutters: null,
          doors: null,
        },
      };

      const created = await strapiClient.createEntry('service-areas', data);
      logger.info(`CREATED: ${city.title} (${city.state}) - documentId: ${created.documentId}`);

      // Publish the entry
      await strapiClient.publishEntry('service-areas', created.documentId);
      logger.info(`  -> Published`);

      createdCount++;
    } catch (error) {
      logger.error(`FAILED to create ${city.title}:`, error);
    }
  }

  logger.info('\n=== Summary ===');
  logger.info(`Created: ${createdCount}`);
  logger.info(`Skipped (already exist): ${skippedCount}`);
}

main().catch((error) => {
  logger.error('Script failed:', error);
  process.exit(1);
});
