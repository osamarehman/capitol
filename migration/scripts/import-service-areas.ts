#!/usr/bin/env tsx
/**
 * Script: Import Service Areas to Strapi
 *
 * This script imports service area cities from Webflow data into the new
 * unified service-area collection in Strapi, with counties attached as components.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

// State ID to state name mapping (from Webflow)
const STATE_MAP: Record<string, 'MD' | 'DC' | 'VA'> = {
  'de1ef54a1e70c15a7c2f713163f0850d': 'MD',
  'e9e91a854320193b6ce72581c1d7d10d': 'VA',
  'c61b204fd2b452a20e822d599f943c4f': 'DC',
};

interface WebflowCity {
  id: string;
  fieldData: {
    name: string;
    slug: string;
    county?: string; // Reference to county ID
    [key: string]: unknown;
  };
  isDraft: boolean;
}

interface WebflowCounty {
  id: string;
  fieldData: {
    name: string;
    slug: string;
    state?: string; // State reference ID
  };
}

interface CountyComponent {
  name: string;
  state?: 'MD' | 'DC' | 'VA';
}

async function main() {
  logger.info('=== Service Area Import Script ===');
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
  const countiesPath = join(CONFIG.paths.items, 'service-area-counties.json');

  if (!existsSync(citiesPath) || !existsSync(countiesPath)) {
    logger.error('Webflow data files not found. Run export first.');
    process.exit(1);
  }

  const cities: WebflowCity[] = JSON.parse(readFileSync(citiesPath, 'utf-8'));
  const counties: WebflowCounty[] = JSON.parse(readFileSync(countiesPath, 'utf-8'));

  logger.info(`Loaded ${cities.length} cities and ${counties.length} counties from Webflow data`);

  // Build county lookup by ID
  const countyById = new Map<string, WebflowCounty>();
  for (const county of counties) {
    countyById.set(county.id, county);
  }

  // Track imported entries for ID mapping
  const idMapping: Record<string, { strapiId: number; documentId: string }> = {};
  let successCount = 0;
  let errorCount = 0;

  // Import cities as service-area entries
  logger.info('\n--- Importing Service Areas ---');

  for (const city of cities) {
    try {
      // Skip drafts
      if (city.isDraft) {
        logger.info(`Skipping draft: ${city.fieldData.name}`);
        continue;
      }

      // Get county info
      const countyId = city.fieldData.county;
      const countyData = countyId ? countyById.get(countyId) : null;

      // Build county component array
      const countiesComponent: CountyComponent[] = [];
      if (countyData) {
        const stateId = countyData.fieldData.state;
        const stateName = stateId ? STATE_MAP[stateId] : undefined;
        countiesComponent.push({
          name: countyData.fieldData.name,
          state: stateName,
        });
      }

      // Determine city's state from county
      let cityState: 'MD' | 'DC' | 'VA' | undefined;
      if (countyData?.fieldData.state) {
        cityState = STATE_MAP[countyData.fieldData.state];
      }

      // Build Strapi entry data (with publishedAt to create as published)
      const entryData: Record<string, unknown> = {
        title: city.fieldData.name,
        slug: city.fieldData.slug,
        state: cityState,
        counties: countiesComponent,
      };

      // Create entry in Strapi
      logger.info(`Creating: ${city.fieldData.name} (${cityState || 'unknown state'})`);
      const result = await strapiClient.createEntry('service-areas', entryData);

      idMapping[city.id] = {
        strapiId: result.id,
        documentId: result.documentId,
      };

      successCount++;
      logger.info(`  Created with documentId: ${result.documentId}`);
    } catch (error) {
      errorCount++;
      logger.error(`Failed to import ${city.fieldData.name}:`, error);
    }
  }

  // Save ID mapping
  const mappingPath = join(CONFIG.paths.mappings, 'service-areas-ids.json');
  writeFileSync(mappingPath, JSON.stringify(idMapping, null, 2));
  logger.info(`\nID mapping saved to: ${mappingPath}`);

  // Summary
  logger.info('\n=== Import Summary ===');
  logger.info(`Total cities: ${cities.length}`);
  logger.info(`Successful imports: ${successCount}`);
  logger.info(`Failed imports: ${errorCount}`);
}

main().catch((error) => {
  logger.error('Import failed:', error);
  process.exit(1);
});
