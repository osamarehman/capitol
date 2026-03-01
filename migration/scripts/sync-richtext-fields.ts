/**
 * Sync RichText fields from Webflow export data to Strapi
 *
 * This script re-imports HTML content for specific RichText fields that
 * may have been corrupted by the blocks conversion script.
 *
 * Target fields:
 * - recentProjectDescription (from Webflow: recent-project-description)
 * - residentialCalcHeader (from Webflow: residential-calc-header)
 */

import axios from 'axios';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CONFIG } from '../src/config/index.js';
import { logger } from '../src/utils/logger.js';
import { toCamelCase } from '../src/mappers/field-type-mapper.js';

// Fields to sync (Webflow slug -> Strapi camelCase)
const RICHTEXT_FIELDS_TO_SYNC = [
  'recent-project-description',
  'residential-calc-header',
];

interface IdMapping {
  webflowId: string;
  strapiDocumentId: string;
  strapiId: number;
}

interface WebflowItem {
  id: string;
  fieldData?: Record<string, unknown>;
}

async function updateRecord(
  contentType: string,
  documentId: string,
  data: Record<string, unknown>
): Promise<boolean> {
  try {
    await axios.put(
      `${CONFIG.strapi.baseUrl}/api/${contentType}/${documentId}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error: any) {
    logger.error(`Failed to update ${contentType}/${documentId}:`, error.response?.data || error.message);
    return false;
  }
}

async function syncCollectionWithMapping(
  itemsSlug: string,
  mappingSlug: string,
  strapiContentType: string
): Promise<{ updated: number; skipped: number; failed: number }> {
  const stats = { updated: 0, skipped: 0, failed: 0 };

  // Load Webflow items (from services-full which has complete data)
  const itemsPath = join(CONFIG.paths.items, `${itemsSlug}.json`);
  if (!existsSync(itemsPath)) {
    logger.warn(`Items file not found: ${itemsPath}`);
    return stats;
  }

  const items: WebflowItem[] = JSON.parse(readFileSync(itemsPath, 'utf-8'));
  logger.info(`Loaded ${items.length} items from ${itemsSlug}`);

  // Load ID mappings (from services which has the Strapi mappings)
  const mappingPath = join(CONFIG.paths.mappings, `${mappingSlug}-ids.json`);
  if (!existsSync(mappingPath)) {
    logger.warn(`Mapping file not found: ${mappingPath}`);
    return stats;
  }

  const mappings: IdMapping[] = JSON.parse(readFileSync(mappingPath, 'utf-8'));
  const strapiIdByWebflowId = new Map(mappings.map(m => [m.webflowId, m.strapiDocumentId]));
  logger.info(`Loaded ${mappings.length} ID mappings from ${mappingSlug}`);

  for (const item of items) {
    const strapiDocumentId = strapiIdByWebflowId.get(item.id);
    if (!strapiDocumentId) {
      stats.skipped++;
      continue;
    }

    const fieldData = item.fieldData || {};
    const updates: Record<string, unknown> = {};
    let hasUpdates = false;

    for (const webflowSlug of RICHTEXT_FIELDS_TO_SYNC) {
      const value = fieldData[webflowSlug];
      if (value && typeof value === 'string') {
        const strapiFieldName = toCamelCase(webflowSlug);
        updates[strapiFieldName] = value;
        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      const success = await updateRecord(strapiContentType, strapiDocumentId, updates);
      if (success) {
        stats.updated++;
        logger.debug(`Updated ${strapiDocumentId}: ${Object.keys(updates).join(', ')}`);
      } else {
        stats.failed++;
      }
    } else {
      stats.skipped++;
    }

    // Log progress every 50 items
    const processed = stats.updated + stats.skipped + stats.failed;
    if (processed % 50 === 0) {
      logger.progress(processed, items.length, `Syncing ${itemsSlug}...`);
    }
  }

  return stats;
}

async function main() {
  logger.info('=== Syncing RichText Fields from Webflow to Strapi ===');
  logger.info(`Target fields: ${RICHTEXT_FIELDS_TO_SYNC.map(f => toCamelCase(f)).join(', ')}`);
  logger.info(`Strapi URL: ${CONFIG.strapi.baseUrl}`);
  logger.info('');

  // Use services-full for item data (has complete fields) with services ID mappings
  logger.info(`\nProcessing services-full (items) + services (mappings) -> services (Strapi)...`);

  const stats = await syncCollectionWithMapping('services-full', 'services', 'services');

  logger.info(`  Updated: ${stats.updated}, Skipped: ${stats.skipped}, Failed: ${stats.failed}`);

  logger.info('\n=== Summary ===');
  logger.info(`Total updated: ${stats.updated}`);
  logger.info(`Total skipped: ${stats.skipped}`);
  logger.info(`Total failed: ${stats.failed}`);
}

main().catch((error) => {
  logger.error('Sync failed:', error.message);
  process.exit(1);
});
