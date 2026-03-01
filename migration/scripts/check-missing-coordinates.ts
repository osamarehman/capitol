#!/usr/bin/env tsx
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

async function main() {
  logger.info('Checking for missing coordinates...');
  
  const areas = await strapiClient.getEntries('service-areas', {
    'pagination[pageSize]': 200,
    'fields[0]': 'slug',
    'fields[1]': 'title',
    'fields[2]': 'coordinatesLatLong',
    'fields[3]': 'state',
  });

  const missing = areas.filter((a: any) => !a.coordinatesLatLong);
  
  logger.info(`\nTotal service areas: ${areas.length}`);
  logger.info(`Missing coordinates: ${missing.length}`);
  logger.info('\nCities missing coordinates:');
  
  for (const area of missing) {
    console.log(`  - ${(area as any).title} (${(area as any).state}) - slug: ${(area as any).slug}`);
  }
}

main().catch(console.error);
