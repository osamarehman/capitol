#!/usr/bin/env tsx
/**
 * Script: Link Video URLs to Entries
 *
 * This script updates VideoLink fields (headerVideo, testimonialVideo) with the actual URL strings.
 * These are YouTube/Vimeo embed URLs, not uploaded media files.
 */

import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';
import { toCamelCase } from '../src/mappers/field-type-mapper.js';
import type { IdMapping } from '../src/types/strapi.js';

// VideoLink field names in Webflow
const VIDEO_LINK_FIELDS = ['header-video', 'testimonial-video', 'video-link'];

// Collection slug to Strapi endpoint mapping
const COLLECTION_TO_ENDPOINT: Record<string, string> = {
  'services': 'services',
  'blog-alt': 'blog-alt',
  'blog': 'blog',
  'sales': 'sales',
  'lp': 'lp',
  'james-hardie': 'james-hardie',
  'service-area-cities': 'service-area-cities',
  'service-area-counties': 'service-area-counties',
  'land': 'land',
  'timbertech': 'timbertech',
  'maryland': 'maryland',
  'virginia': 'virginia',
  'city': 'city',
  'videos': 'videos',
  'review-testimonials': 'review-testimonials',
  'farmlands': 'farmlands',
};

async function updateVideoUrlsForCollection(
  collectionSlug: string,
  strapiEndpoint: string
): Promise<number> {
  const idMappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-ids.json`);
  const itemsPath = join(CONFIG.paths.items, `${collectionSlug}.json`);

  if (!existsSync(idMappingsPath) || !existsSync(itemsPath)) {
    return 0;
  }

  const idMappings: IdMapping[] = JSON.parse(readFileSync(idMappingsPath, 'utf-8'));
  const items = JSON.parse(readFileSync(itemsPath, 'utf-8'));

  const strapiDocIdByWebflowId = new Map(
    idMappings.map((m) => [m.webflowId, m.strapiDocumentId])
  );

  let updated = 0;
  let errors = 0;

  for (const item of items) {
    const webflowId = item.id;
    const strapiDocumentId = strapiDocIdByWebflowId.get(webflowId);

    if (!strapiDocumentId) continue;

    const fieldData = item.fieldData || {};
    const updateData: Record<string, string> = {};
    let hasUpdates = false;

    for (const fieldSlug of VIDEO_LINK_FIELDS) {
      const value = fieldData[fieldSlug];

      // VideoLink objects have a 'url' property with the embed URL
      if (value && typeof value === 'object' && 'url' in value) {
        const videoUrl = (value as { url: string }).url;
        if (videoUrl && typeof videoUrl === 'string') {
          const strapiFieldName = toCamelCase(fieldSlug);
          updateData[strapiFieldName] = videoUrl;
          hasUpdates = true;
        }
      }
    }

    if (hasUpdates) {
      try {
        await strapiClient.updateEntry(strapiEndpoint, strapiDocumentId, updateData);
        updated++;

        if (updated % 50 === 0) {
          logger.info(`Updated ${updated} entries...`);
        }
      } catch (error) {
        errors++;
        if (errors <= 3) {
          logger.error(`Failed to update ${strapiDocumentId}: ${(error as Error).message}`);
        }
      }
    }
  }

  if (errors > 3) {
    logger.error(`... and ${errors - 3} more errors`);
  }

  return updated;
}

async function main() {
  logger.info('=== Video URL Linking Script ===');

  // Check Strapi connection
  logger.info('Checking Strapi connection...');
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }

  // Get all ID mapping files
  const mappingsDir = CONFIG.paths.mappings;
  const idFiles = readdirSync(mappingsDir).filter((f: string) => f.endsWith('-ids.json'));

  let totalUpdated = 0;

  for (const file of idFiles) {
    const collectionSlug = file.replace('-ids.json', '');
    const endpoint = COLLECTION_TO_ENDPOINT[collectionSlug];

    if (!endpoint) {
      continue;
    }

    logger.info(`\nProcessing ${collectionSlug} -> ${endpoint}`);
    const updated = await updateVideoUrlsForCollection(collectionSlug, endpoint);

    if (updated > 0) {
      totalUpdated += updated;
      logger.info(`Updated ${updated} entries with video URLs`);
    } else {
      logger.info(`No video URLs to update`);
    }
  }

  logger.info(`\n=== Complete ===`);
  logger.info(`Total entries updated with video URLs: ${totalUpdated}`);
}

main().catch(console.error);
