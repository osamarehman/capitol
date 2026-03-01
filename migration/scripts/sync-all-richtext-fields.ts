/**
 * Sync ALL RichText fields from Webflow export data to Strapi
 *
 * This script re-imports HTML content for all RichText fields,
 * with configurable exclusions.
 */

import axios from 'axios';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CONFIG } from '../src/config/index.js';
import { logger } from '../src/utils/logger.js';
import { toCamelCase } from '../src/mappers/field-type-mapper.js';

// All RichText fields (Webflow slug format)
const ALL_RICHTEXT_FIELDS = [
  'recent-project-description',
  'residential-calc-header',
  'main-story-rich-text',
  'secondary-story-rich-text',
  'supporting-text-rich-text',
  'community-guidelines-rich-text',
  'location-improvements-rich-text',
  'consultant-title-description',
  'location-contact-details',
  'echo-rich-text',
  'map-section',
  'custom-content',
  'faq-content',
  // Service FAQ descriptions (Webflow uses service-faq-desc-X)
  'service-faq-desc-1',
  'service-faq-desc-2',
  'service-faq-desc-3',
  'service-faq-desc-4',
  'service-faq-desc-5',
  'service-faq-desc-6',
  // FAQ answers
  'faq-answer-1',
  'faq-answer-2',
  'faq-answer-3',
  'faq-answer-4',
  'faq-answer-5',
  'faq-answer-6',
  'faq-answer-7',
  'faq-answer-8',
  'faq-answer-9',
  'faq-answer-10',
  'faq-answer-11',
  'faq-answer-12',
  'faq-answer-13',
  'faq-answer-14',
  'faq-answer-15',
];

// Fields to EXCLUDE from sync (already updated or should not be overwritten)
const EXCLUDED_FIELDS = [
  'recent-project-description',    // Already synced
  'residential-calc-header',       // Already synced
  'header-description',            // Not a RichText field, user wants to preserve
];

// Slugs to EXCLUDE from sync (specific pages to skip)
const EXCLUDED_SLUGS = [
  'pasadena-maryland-roofing-company-near-you',  // Pasadena roofing page
];

// Map Webflow field names to Strapi field names where they differ
const FIELD_NAME_MAP: Record<string, string> = {
  'service-faq-desc-1': 'servicesModalDesc1',
  'service-faq-desc-2': 'servicesModalDesc2',
  'service-faq-desc-3': 'servicesModalDesc3',
  'service-faq-desc-4': 'servicesModalDesc4',
  'service-faq-desc-5': 'servicesModalDesc5',
  'service-faq-desc-6': 'servicesModalDesc6',
};

// Get fields to sync (excluding the ones we don't want)
const FIELDS_TO_SYNC = ALL_RICHTEXT_FIELDS.filter(f => !EXCLUDED_FIELDS.includes(f));

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

function getStrapiFieldName(webflowSlug: string): string {
  // Check if there's a custom mapping
  if (FIELD_NAME_MAP[webflowSlug]) {
    return FIELD_NAME_MAP[webflowSlug];
  }
  // Otherwise use standard camelCase conversion
  return toCamelCase(webflowSlug);
}

async function syncCollectionWithMapping(
  itemsSlug: string,
  mappingSlug: string,
  strapiContentType: string
): Promise<{ updated: number; skipped: number; failed: number; excludedPages: number }> {
  const stats = { updated: 0, skipped: 0, failed: 0, excludedPages: 0 };

  // Load Webflow items
  const itemsPath = join(CONFIG.paths.items, `${itemsSlug}.json`);
  if (!existsSync(itemsPath)) {
    logger.warn(`Items file not found: ${itemsPath}`);
    return stats;
  }

  const items: WebflowItem[] = JSON.parse(readFileSync(itemsPath, 'utf-8'));
  logger.info(`Loaded ${items.length} items from ${itemsSlug}`);

  // Load ID mappings
  const mappingPath = join(CONFIG.paths.mappings, `${mappingSlug}-ids.json`);
  if (!existsSync(mappingPath)) {
    logger.warn(`Mapping file not found: ${mappingPath}`);
    return stats;
  }

  const mappings: IdMapping[] = JSON.parse(readFileSync(mappingPath, 'utf-8'));
  const strapiIdByWebflowId = new Map(mappings.map(m => [m.webflowId, m.strapiDocumentId]));
  logger.info(`Loaded ${mappings.length} ID mappings from ${mappingSlug}`);

  for (const item of items) {
    const fieldData = item.fieldData || {};
    const slug = fieldData.slug as string;

    // Skip excluded pages
    if (slug && EXCLUDED_SLUGS.includes(slug)) {
      stats.excludedPages++;
      logger.info(`Skipping excluded page: ${slug}`);
      continue;
    }

    const strapiDocumentId = strapiIdByWebflowId.get(item.id);
    if (!strapiDocumentId) {
      stats.skipped++;
      continue;
    }

    const updates: Record<string, unknown> = {};
    let hasUpdates = false;

    for (const webflowSlug of FIELDS_TO_SYNC) {
      const value = fieldData[webflowSlug];
      if (value && typeof value === 'string') {
        const strapiFieldName = getStrapiFieldName(webflowSlug);
        updates[strapiFieldName] = value;
        hasUpdates = true;
      }
    }

    if (hasUpdates) {
      const success = await updateRecord(strapiContentType, strapiDocumentId, updates);
      if (success) {
        stats.updated++;
        logger.debug(`Updated ${strapiDocumentId} (${slug || 'no slug'}): ${Object.keys(updates).length} fields`);
      } else {
        stats.failed++;
      }
    } else {
      stats.skipped++;
    }

    // Log progress every 50 items
    const processed = stats.updated + stats.skipped + stats.failed + stats.excludedPages;
    if (processed % 50 === 0) {
      logger.progress(processed, items.length, `Syncing ${itemsSlug}...`);
    }
  }

  return stats;
}

async function main() {
  logger.info('=== Syncing ALL RichText Fields from Webflow to Strapi ===');
  logger.info(`Strapi URL: ${CONFIG.strapi.baseUrl}`);
  logger.info('');
  logger.info(`Fields to sync (${FIELDS_TO_SYNC.length}):`);
  FIELDS_TO_SYNC.forEach(f => logger.info(`  - ${f} -> ${getStrapiFieldName(f)}`));
  logger.info('');
  logger.info(`Excluded fields: ${EXCLUDED_FIELDS.join(', ')}`);
  logger.info(`Excluded pages: ${EXCLUDED_SLUGS.join(', ')}`);
  logger.info('');

  // Use services-full for item data (has complete fields) with services ID mappings
  logger.info(`Processing services-full (items) + services (mappings) -> services (Strapi)...`);

  const stats = await syncCollectionWithMapping('services-full', 'services', 'services');

  logger.info(`  Updated: ${stats.updated}`);
  logger.info(`  Skipped: ${stats.skipped}`);
  logger.info(`  Failed: ${stats.failed}`);
  logger.info(`  Excluded pages: ${stats.excludedPages}`);

  logger.info('\n=== Summary ===');
  logger.info(`Total updated: ${stats.updated}`);
  logger.info(`Total skipped: ${stats.skipped}`);
  logger.info(`Total failed: ${stats.failed}`);
  logger.info(`Total excluded pages: ${stats.excludedPages}`);
}

main().catch((error) => {
  logger.error('Sync failed:', error.message);
  process.exit(1);
});
