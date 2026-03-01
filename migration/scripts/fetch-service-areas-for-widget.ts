#!/usr/bin/env tsx
/**
 * Script: Fetch Service Areas for Widget
 *
 * Fetches service areas with populated serviceLinks and outputs in the format
 * needed for the service area widget (service_area_records.js)
 */

import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  logger.info('=== Fetch Service Areas for Widget ===');
  logger.info(`Source Strapi: ${CONFIG.strapi.baseUrl}`);

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

  // Fetch all service areas with serviceLinks populated
  logger.info('Fetching service areas with serviceLinks...');

  const allEntries: unknown[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const params: Record<string, unknown> = {
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'populate[counties]': '*',
      'populate[serviceLinks][populate]': '*',
      status: 'published',
    };

    const entries = await strapiClient.getEntries('service-areas', params);
    if (entries.length === 0) break;

    allEntries.push(...entries);
    logger.info(`  Fetched page ${page}: ${entries.length} entries`);

    if (entries.length < pageSize) break;
    page++;
  }

  logger.info(`\nTotal service areas fetched: ${allEntries.length}`);

  // Check if serviceLinks are populated
  const entriesWithLinks = allEntries.filter((entry: any) => {
    const sl = entry.serviceLinks;
    return sl && (sl.roofing || sl.siding || sl.exteriorTrim || sl.decks || sl.windows || sl.gutters || sl.doors);
  });
  logger.info(`Entries with at least one service link: ${entriesWithLinks.length}`);

  // Create the output object in the format expected by the widget
  const outputData = {
    ok: true,
    status: 200,
    statusText: 'OK',
    data: {
      data: allEntries,
      meta: {
        pagination: {
          page: 1,
          pageSize: allEntries.length,
          pageCount: 1,
          total: allEntries.length,
        },
      },
    },
  };

  // Write to service_area_records.js
  const outputPath = path.resolve(process.cwd(), '../service-area-widget/service_area_records.js');
  const jsContent = `const inputData = (${JSON.stringify(outputData, null, 2)})`;

  fs.writeFileSync(outputPath, jsContent);
  logger.info(`\nWrote ${allEntries.length} service areas to: ${outputPath}`);

  // Also write a JSON version for reference
  const jsonOutputPath = path.resolve(process.cwd(), '../service-area-widget/service_areas_data.json');
  fs.writeFileSync(jsonOutputPath, JSON.stringify(outputData, null, 2));
  logger.info(`Wrote JSON version to: ${jsonOutputPath}`);

  // Show sample entry with serviceLinks
  if (entriesWithLinks.length > 0) {
    logger.info('\n--- Sample Entry with Service Links ---');
    const sample = entriesWithLinks[0] as any;
    logger.info(`City: ${sample.title}`);
    logger.info('Service Links:');
    const sl = sample.serviceLinks || {};
    Object.keys(sl).forEach((key) => {
      if (sl[key] && typeof sl[key] === 'object') {
        logger.info(`  ${key}: ${sl[key].slug || sl[key].id || 'linked'}`);
      }
    });
  }
}

main().catch((error) => {
  logger.error('Script failed:', error);
  process.exit(1);
});
