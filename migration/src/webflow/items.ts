import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { webflow, fetchWithRateLimit } from './client.js';
import { CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';
import type { WebflowItem, ExportResult, WebflowCollection } from '../types/webflow.js';

const ITEMS_PER_PAGE = 100; // Webflow max

/**
 * Export all items from a single collection with pagination
 */
export async function exportCollectionItems(
  collectionId: string,
  collectionSlug: string
): Promise<ExportResult> {
  logger.info(`Exporting items from collection: ${collectionSlug}`);

  let offset = 0;
  const allItems: WebflowItem[] = [];

  while (true) {
    const response = await fetchWithRateLimit(() =>
      webflow.collections.items.listItems(collectionId, {
        offset,
        limit: ITEMS_PER_PAGE,
      })
    );

    const items = (response.items || []) as WebflowItem[];
    allItems.push(...items);

    logger.debug(
      `Fetched ${items.length} items (total: ${allItems.length}/${response.pagination?.total || '?'})`
    );

    // Check if we've fetched all items
    const total = response.pagination?.total || 0;
    if (allItems.length >= total || items.length === 0) {
      break;
    }

    offset += ITEMS_PER_PAGE;
  }

  // Save items to file
  mkdirSync(CONFIG.paths.items, { recursive: true });
  const outputPath = join(CONFIG.paths.items, `${collectionSlug}.json`);
  writeFileSync(outputPath, JSON.stringify(allItems, null, 2));

  logger.info(`Exported ${allItems.length} items to ${outputPath}`);

  return {
    collectionId,
    collectionSlug,
    itemCount: allItems.length,
    items: allItems,
  };
}

/**
 * Export items from all collections
 */
export async function exportAllCollectionItems(
  collections: WebflowCollection[]
): Promise<ExportResult[]> {
  const results: ExportResult[] = [];

  for (const collection of collections) {
    const result = await exportCollectionItems(collection.id, collection.slug);
    results.push(result);
  }

  // Save summary
  const summary = results.map(r => ({
    collectionId: r.collectionId,
    collectionSlug: r.collectionSlug,
    itemCount: r.itemCount,
  }));

  writeFileSync(
    join(CONFIG.paths.items, '_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  logger.info(`Exported ${results.reduce((sum, r) => sum + r.itemCount, 0)} total items`);

  return results;
}

/**
 * Load previously exported items for a collection
 */
export function loadCollectionItems(collectionSlug: string): WebflowItem[] {
  const filePath = join(CONFIG.paths.items, `${collectionSlug}.json`);

  if (!existsSync(filePath)) {
    throw new Error(`Items file not found: ${filePath}. Run export first.`);
  }

  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
