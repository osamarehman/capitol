#!/usr/bin/env tsx
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';

// Coordinates looked up from web sources
const MISSING_COORDINATES: Record<string, string> = {
  'stevensville': '38.9746, -76.3184',
  'dunkirk': '38.7218, -76.6605',
  'lothian': '38.8317, -76.6111',
  'harwood': '38.8654, -76.6207',
  'davidsonville': '38.9229, -76.6284',
  'mitchellville': '38.9251, -76.7427',
  'millersville': '39.0575, -76.6486',
  'baltimore': '39.2904, -76.6122',
};

async function main() {
  logger.info('=== Populating Missing Coordinates ===');

  // Get all service areas from Strapi
  const areas = await strapiClient.getEntries('service-areas', {
    'pagination[pageSize]': 200,
    'fields[0]': 'slug',
    'fields[1]': 'title',
    'fields[2]': 'coordinatesLatLong',
  });

  let updateCount = 0;

  for (const area of areas) {
    const slug = (area as any).slug;
    const currentCoords = (area as any).coordinatesLatLong;
    const documentId = (area as any).documentId;

    // Skip if already has coordinates
    if (currentCoords) continue;

    // Check if we have coordinates for this city
    const newCoords = MISSING_COORDINATES[slug];
    if (!newCoords) {
      logger.warn(`No coordinates available for: ${(area as any).title} (${slug})`);
      continue;
    }

    try {
      logger.info(`Updating ${(area as any).title}: ${newCoords}`);
      await strapiClient.updateEntry('service-areas', documentId, {
        coordinatesLatLong: newCoords,
      });
      updateCount++;
      logger.info(`  Updated successfully`);
    } catch (error) {
      logger.error(`Failed to update ${(area as any).title}:`, error);
    }
  }

  logger.info(`\n=== Summary ===`);
  logger.info(`Updated: ${updateCount} cities`);
}

main().catch(console.error);
