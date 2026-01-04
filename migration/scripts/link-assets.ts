#!/usr/bin/env tsx
/**
 * Script: Link Assets to Entries
 *
 * This script links uploaded assets to their content entries using correct Strapi 5 endpoints.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';
import { toCamelCase } from '../src/mappers/field-type-mapper.js';
import type { AssetMapping, IdMapping } from '../src/types/strapi.js';

// VideoLink fields should NOT be linked as media - they store URL strings
// These are handled separately by link-video-urls.ts
const VIDEO_URL_FIELDS = ['header-video', 'testimonial-video', 'video-link'];

// Correct mapping of asset file slug to Strapi API plural name
const COLLECTION_TO_ENDPOINT: Record<string, string> = {
  'blog-alt': 'blog-alt',
  'services': 'services',
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

async function linkAssetsForCollection(
  collectionSlug: string,
  strapiEndpoint: string
): Promise<number> {
  const assetMappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-assets.json`);
  const idMappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-ids.json`);
  const itemsPath = join(CONFIG.paths.items, `${collectionSlug}.json`);

  if (!existsSync(assetMappingsPath)) {
    logger.info(`No asset mappings for ${collectionSlug}`);
    return 0;
  }

  if (!existsSync(idMappingsPath)) {
    logger.info(`No ID mappings for ${collectionSlug}`);
    return 0;
  }

  if (!existsSync(itemsPath)) {
    logger.info(`No items file for ${collectionSlug}`);
    return 0;
  }

  const assetMappings: AssetMapping[] = JSON.parse(readFileSync(assetMappingsPath, 'utf-8'));
  const idMappings: IdMapping[] = JSON.parse(readFileSync(idMappingsPath, 'utf-8'));
  const items = JSON.parse(readFileSync(itemsPath, 'utf-8'));

  if (assetMappings.length === 0) {
    return 0;
  }

  // Build lookup maps
  const assetByWebflowUrl = new Map(assetMappings.map((a) => [a.webflowUrl, a]));
  const strapiDocIdByWebflowId = new Map(
    idMappings.map((m) => [m.webflowId, m.strapiDocumentId])
  );

  logger.info(`Linking ${assetMappings.length} assets to ${items.length} entries in ${strapiEndpoint}...`);

  let linked = 0;
  let errors = 0;

  for (const item of items) {
    const webflowId = item.id;
    const strapiDocumentId = strapiDocIdByWebflowId.get(webflowId);

    if (!strapiDocumentId) continue;

    const fieldData = item.fieldData || {};
    const updateData: Record<string, unknown> = {};
    let hasUpdates = false;

    for (const [fieldSlug, value] of Object.entries(fieldData)) {
      // Skip VideoLink fields - they are URL strings, not media
      if (VIDEO_URL_FIELDS.includes(fieldSlug)) {
        continue;
      }

      // Handle single image/file
      if (value && typeof value === 'object' && 'url' in value) {
        const assetData = value as { url: string };
        const assetMapping = assetByWebflowUrl.get(assetData.url);

        if (assetMapping) {
          const strapiFieldName = toCamelCase(fieldSlug);
          updateData[strapiFieldName] = assetMapping.strapiId;
          hasUpdates = true;
        }
      }

      // Handle multi-image/file
      if (Array.isArray(value)) {
        const strapiIds: number[] = [];

        for (const v of value) {
          if (v && typeof v === 'object' && 'url' in v) {
            const assetMapping = assetByWebflowUrl.get((v as { url: string }).url);
            if (assetMapping) {
              strapiIds.push(assetMapping.strapiId);
            }
          }
        }

        if (strapiIds.length > 0) {
          const strapiFieldName = toCamelCase(fieldSlug);
          updateData[strapiFieldName] = strapiIds;
          hasUpdates = true;
        }
      }
    }

    if (hasUpdates) {
      try {
        await strapiClient.updateEntry(strapiEndpoint, strapiDocumentId, updateData);
        linked++;
      } catch (error) {
        errors++;
        if (errors <= 3) {
          logger.error(`Failed to link assets for ${strapiDocumentId}: ${(error as Error).message}`);
        }
      }
    }
  }

  if (errors > 3) {
    logger.error(`... and ${errors - 3} more errors`);
  }

  return linked;
}

async function main() {
  logger.info('=== Asset Linking Script ===');

  // Check Strapi connection
  logger.info('Checking Strapi connection...');
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }

  // Get all asset mapping files
  const mappingsDir = CONFIG.paths.mappings;
  const fs = await import('fs');
  const assetFiles = fs.readdirSync(mappingsDir).filter((f: string) => f.endsWith('-assets.json'));

  let totalLinked = 0;

  for (const file of assetFiles) {
    const collectionSlug = file.replace('-assets.json', '');
    const endpoint = COLLECTION_TO_ENDPOINT[collectionSlug];

    if (!endpoint) {
      logger.warn(`No endpoint mapping for ${collectionSlug}`);
      continue;
    }

    logger.info(`\nProcessing ${collectionSlug} -> ${endpoint}`);
    const linked = await linkAssetsForCollection(collectionSlug, endpoint);
    totalLinked += linked;
    logger.info(`Linked ${linked} entries`);
  }

  logger.info(`\n=== Complete ===`);
  logger.info(`Total entries with assets linked: ${totalLinked}`);
}

main().catch(console.error);
