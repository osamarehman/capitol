#!/usr/bin/env tsx
/**
 * Script: Update Service Area Coordinates
 *
 * This script updates service-area entries in Strapi with coordinates
 * and zoom levels from the original Webflow data.
 *
 * Uses slug matching instead of ID mapping for reliability.
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

interface WebflowCity {
  id: string;
  fieldData: {
    name: string;
    slug: string;
    'cordinates-lat-long'?: string; // Note: typo in original Webflow field name
    'city-zoom-level'?: number;
    [key: string]: unknown;
  };
  isDraft: boolean;
}

interface StrapiServiceArea {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  coordinatesLatLong?: string;
  zoomLevel?: number;
}

async function main() {
  logger.info('=== Update Service Area Coordinates ===');
  logger.info(`Target Strapi: ${CONFIG.strapi.baseUrl}`);

  // Check Strapi connection
  logger.info('Checking Strapi connection...');
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

  logger.info('Strapi connection successful');

  // Load Webflow data
  const citiesPath = join(CONFIG.paths.items, 'service-area-cities.json');

  if (!existsSync(citiesPath)) {
    logger.error('Webflow cities data file not found.');
    process.exit(1);
  }

  const cities: WebflowCity[] = JSON.parse(readFileSync(citiesPath, 'utf-8'));
  logger.info(`Loaded ${cities.length} cities from Webflow data`);

  // Fetch all service areas from Strapi
  logger.info('Fetching service areas from Strapi...');
  const strapiAreas = await strapiClient.getEntries('service-areas', {
    'pagination[pageSize]': 200,
    'fields[0]': 'slug',
    'fields[1]': 'title',
    'fields[2]': 'coordinatesLatLong',
    'fields[3]': 'zoomLevel',
  }) as StrapiServiceArea[];

  logger.info(`Found ${strapiAreas.length} service areas in Strapi`);

  // Build lookup map: slug -> documentId
  const slugToDocumentId = new Map<string, string>();
  for (const area of strapiAreas) {
    slugToDocumentId.set(area.slug, area.documentId);
  }

  let updateCount = 0;
  let skipCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;

  logger.info('\n--- Updating Coordinates ---');

  for (const city of cities) {
    const slug = city.fieldData.slug;
    const strapiDocumentId = slugToDocumentId.get(slug);

    if (!strapiDocumentId) {
      logger.warn(`No Strapi entry found for slug: ${slug} (${city.fieldData.name})`);
      notFoundCount++;
      continue;
    }

    const coordinates = city.fieldData['cordinates-lat-long'];
    const zoomLevel = city.fieldData['city-zoom-level'];

    // Skip if no coordinate data
    if (!coordinates && !zoomLevel) {
      skipCount++;
      continue;
    }

    try {
      // Build update payload
      const updateData: Record<string, unknown> = {};

      if (coordinates) {
        // Coordinates are in "lat, long" format in Webflow
        updateData.coordinatesLatLong = coordinates;
      }

      if (zoomLevel !== undefined && zoomLevel !== null) {
        updateData.zoomLevel = zoomLevel;
      }

      logger.info(`Updating: ${city.fieldData.name} (${slug})`);
      logger.info(`  Coordinates: ${coordinates || 'N/A'}`);
      logger.info(`  Zoom Level: ${zoomLevel || 'N/A'}`);

      // Update in Strapi using document ID
      await strapiClient.updateEntry('service-areas', strapiDocumentId, updateData);

      updateCount++;
      logger.info(`  Updated successfully`);
    } catch (error) {
      errorCount++;
      const errMsg = error instanceof Error ? error.message : String(error);
      logger.error(`Failed to update ${city.fieldData.name}: ${errMsg}`);
    }
  }

  // Summary
  logger.info('\n=== Update Summary ===');
  logger.info(`Total cities in Webflow: ${cities.length}`);
  logger.info(`Updated with coordinates: ${updateCount}`);
  logger.info(`Skipped (no coordinate data): ${skipCount}`);
  logger.info(`Not found in Strapi: ${notFoundCount}`);
  logger.info(`Failed: ${errorCount}`);
}

main().catch((error) => {
  logger.error('Update failed:', error);
  process.exit(1);
});
