#!/usr/bin/env tsx
/**
 * Script: Regenerate ID Mappings
 *
 * This script regenerates ID mappings by matching Webflow items to Strapi entries via slug.
 * Use this when the Strapi database has been reset or the mappings are stale.
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';
import type { IdMapping } from '../src/types/strapi.js';

// Mapping of item file slug to Strapi API plural name
const COLLECTION_MAPPINGS: Record<string, { endpoint: string; slugField: string }> = {
  'blog-alt': { endpoint: 'blog-alt', slugField: 'slug' },
  'services': { endpoint: 'services', slugField: 'slug' },
  'blog': { endpoint: 'blog', slugField: 'slug' },
  'sales': { endpoint: 'sales', slugField: 'slug' },
  'lp': { endpoint: 'lp', slugField: 'slug' },
  'james-hardie': { endpoint: 'james-hardie', slugField: 'slug' },
  'service-area-cities': { endpoint: 'service-area-cities', slugField: 'slug' },
  'service-area-counties': { endpoint: 'service-area-counties', slugField: 'slug' },
  'land': { endpoint: 'land', slugField: 'slug' },
  'timbertech': { endpoint: 'timbertech', slugField: 'slug' },
  'maryland': { endpoint: 'maryland', slugField: 'slug' },
  'virginia': { endpoint: 'virginia', slugField: 'slug' },
  'city': { endpoint: 'city', slugField: 'slug' },
  'videos': { endpoint: 'videos', slugField: 'slug' },
  'review-testimonials': { endpoint: 'review-testimonials', slugField: 'slug' },
  'farmlands': { endpoint: 'farmlands', slugField: 'slug' },
};

async function fetchAllStrapiEntries(endpoint: string): Promise<Map<string, { documentId: string; id: number }>> {
  const entries = new Map<string, { documentId: string; id: number }>();
  let page = 1;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await axios.get(
        `${CONFIG.strapi.baseUrl}/api/${endpoint}`,
        {
          params: {
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
            'fields[0]': 'slug',
            'fields[1]': 'documentId',
          },
          headers: {
            Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          },
        }
      );

      const { data, meta } = response.data;

      for (const entry of data) {
        if (entry.slug) {
          entries.set(entry.slug, {
            documentId: entry.documentId,
            id: entry.id,
          });
        }
      }

      const totalPages = meta.pagination.pageCount || 1;
      hasMore = page < totalPages;
      page++;
    } catch (error) {
      logger.error(`Error fetching ${endpoint} page ${page}: ${(error as Error).message}`);
      hasMore = false;
    }
  }

  return entries;
}

async function regenerateMappingsForCollection(
  collectionSlug: string,
  config: { endpoint: string; slugField: string }
): Promise<number> {
  const itemsPath = join(CONFIG.paths.items, `${collectionSlug}.json`);
  const mappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-ids.json`);

  if (!existsSync(itemsPath)) {
    logger.warn(`No items file for ${collectionSlug}`);
    return 0;
  }

  const items = JSON.parse(readFileSync(itemsPath, 'utf-8'));
  logger.info(`Fetching Strapi entries for ${config.endpoint}...`);
  const strapiEntries = await fetchAllStrapiEntries(config.endpoint);
  logger.info(`Found ${strapiEntries.size} entries in Strapi`);

  const newMappings: IdMapping[] = [];
  let matched = 0;
  let notFound = 0;

  for (const item of items) {
    const webflowId = item.id;
    const slug = item.fieldData?.slug || item.fieldData?.name?.toLowerCase().replace(/\s+/g, '-');

    if (!slug) {
      notFound++;
      continue;
    }

    const strapiEntry = strapiEntries.get(slug);
    if (strapiEntry) {
      newMappings.push({
        webflowId,
        strapiDocumentId: strapiEntry.documentId,
        strapiId: strapiEntry.id,
      });
      matched++;
    } else {
      notFound++;
    }
  }

  // Save new mappings
  writeFileSync(mappingsPath, JSON.stringify(newMappings, null, 2));
  logger.info(`Matched ${matched}/${items.length} entries (${notFound} not found)`);

  return matched;
}

async function main() {
  logger.info('=== Regenerate ID Mappings Script ===');
  logger.info(`Strapi URL: ${CONFIG.strapi.baseUrl}`);

  let totalMatched = 0;

  for (const [collectionSlug, config] of Object.entries(COLLECTION_MAPPINGS)) {
    logger.info(`\nProcessing ${collectionSlug} -> ${config.endpoint}`);
    const matched = await regenerateMappingsForCollection(collectionSlug, config);
    totalMatched += matched;
  }

  logger.info(`\n=== Complete ===`);
  logger.info(`Total entries matched: ${totalMatched}`);
}

main().catch(console.error);
