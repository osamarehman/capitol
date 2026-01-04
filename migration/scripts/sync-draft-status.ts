#!/usr/bin/env tsx
/**
 * Script: Sync Draft Status from Webflow to Strapi
 *
 * This script unpublishes Strapi entries that are marked as drafts in Webflow.
 * It uses the ID mappings to find corresponding Strapi entries.
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';
import type { IdMapping } from '../src/types/strapi.js';

// Collection mappings (same as other scripts)
const COLLECTION_MAPPINGS: Record<string, string> = {
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

interface WebflowItem {
  id: string;
  isDraft: boolean;
  isArchived: boolean;
  fieldData: Record<string, unknown>;
}

async function unpublishEntry(endpoint: string, documentId: string): Promise<boolean> {
  try {
    // In Strapi 5, use PUT with status=draft query param to unpublish
    await axios.put(
      `${CONFIG.strapi.baseUrl}/api/${endpoint}/${documentId}`,
      { data: {} },
      {
        params: { status: 'draft' },
        headers: {
          Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error) {
    const axiosError = error as { response?: { status: number; data?: { error?: { message?: string } } } };
    // 400 error might mean already unpublished
    if (axiosError.response?.status === 400) {
      const msg = axiosError.response?.data?.error?.message || '';
      if (msg.includes('already') || msg.includes('draft')) {
        return true; // Already unpublished
      }
    }
    logger.error(`Failed to unpublish ${documentId}: ${(error as Error).message}`);
    return false;
  }
}

async function syncDraftStatusForCollection(
  collectionSlug: string,
  strapiEndpoint: string
): Promise<{ unpublished: number; alreadyDraft: number; notFound: number }> {
  const itemsPath = join(CONFIG.paths.items, `${collectionSlug}.json`);
  const idMappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-ids.json`);

  const result = { unpublished: 0, alreadyDraft: 0, notFound: 0 };

  if (!existsSync(itemsPath)) {
    logger.warn(`No items file for ${collectionSlug}`);
    return result;
  }

  if (!existsSync(idMappingsPath)) {
    logger.warn(`No ID mappings for ${collectionSlug}`);
    return result;
  }

  const items: WebflowItem[] = JSON.parse(readFileSync(itemsPath, 'utf-8'));
  const idMappings: IdMapping[] = JSON.parse(readFileSync(idMappingsPath, 'utf-8'));

  // Build lookup map
  const strapiDocIdByWebflowId = new Map(
    idMappings.map((m) => [m.webflowId, m.strapiDocumentId])
  );

  // Find draft items
  const draftItems = items.filter((item) => item.isDraft === true);

  if (draftItems.length === 0) {
    logger.info(`No draft items in ${collectionSlug}`);
    return result;
  }

  logger.info(`Found ${draftItems.length} draft items in ${collectionSlug}`);

  for (const item of draftItems) {
    const strapiDocumentId = strapiDocIdByWebflowId.get(item.id);

    if (!strapiDocumentId) {
      result.notFound++;
      continue;
    }

    const success = await unpublishEntry(strapiEndpoint, strapiDocumentId);
    if (success) {
      result.unpublished++;
    }
  }

  return result;
}

async function main() {
  logger.info('=== Sync Draft Status Script ===');
  logger.info(`Strapi URL: ${CONFIG.strapi.baseUrl}`);

  let totalUnpublished = 0;
  let totalNotFound = 0;

  for (const [collectionSlug, endpoint] of Object.entries(COLLECTION_MAPPINGS)) {
    logger.info(`\nProcessing ${collectionSlug} -> ${endpoint}`);
    const result = await syncDraftStatusForCollection(collectionSlug, endpoint);
    totalUnpublished += result.unpublished;
    totalNotFound += result.notFound;

    if (result.unpublished > 0) {
      logger.info(`Unpublished ${result.unpublished} entries`);
    }
  }

  logger.info(`\n=== Complete ===`);
  logger.info(`Total entries unpublished: ${totalUnpublished}`);
  if (totalNotFound > 0) {
    logger.warn(`Entries not found in Strapi: ${totalNotFound}`);
  }
}

main().catch(console.error);
