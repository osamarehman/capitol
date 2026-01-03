import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { webflow, fetchWithRateLimit } from './client.js';
import { CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';
import type { WebflowCollection, WebflowField } from '../types/webflow.js';

/**
 * Fetch all collections and their field schemas from Webflow
 */
export async function exportCollections(): Promise<WebflowCollection[]> {
  logger.info('Fetching collections from Webflow...');

  // Get list of collections
  const response = await fetchWithRateLimit(() =>
    webflow.collections.list(CONFIG.webflow.siteId)
  );

  const collections: WebflowCollection[] = [];

  if (!response.collections || response.collections.length === 0) {
    logger.warn('No collections found in Webflow site');
    return collections;
  }

  logger.info(`Found ${response.collections.length} collections`);

  // Fetch detailed info for each collection (including fields)
  for (const collection of response.collections) {
    logger.info(`Fetching details for collection: ${collection.displayName}`);

    const details = await fetchWithRateLimit(() =>
      webflow.collections.get(collection.id!)
    );

    const collectionData: WebflowCollection = {
      id: details.id!,
      displayName: details.displayName!,
      singularName: details.singularName!,
      slug: details.slug!,
      fields: (details.fields || []).map((field): WebflowField => ({
        id: field.id!,
        type: field.type as WebflowField['type'],
        slug: field.slug!,
        displayName: field.displayName!,
        isRequired: field.isRequired || false,
        isEditable: field.isEditable !== false,
        validations: field.validations as Record<string, unknown> | undefined,
        metadata: field.metadata as WebflowField['metadata'],
      })),
    };

    collections.push(collectionData);
    logger.info(`  - ${collectionData.fields.length} fields`);
  }

  // Save to file
  mkdirSync(CONFIG.paths.collections, { recursive: true });
  const outputPath = join(CONFIG.paths.collections, 'collections.json');
  writeFileSync(outputPath, JSON.stringify(collections, null, 2));
  logger.info(`Saved collections schema to ${outputPath}`);

  return collections;
}

/**
 * Load previously exported collections from file
 */
export function loadCollections(): WebflowCollection[] {
  const filePath = join(CONFIG.paths.collections, 'collections.json');

  if (!existsSync(filePath)) {
    throw new Error(`Collections file not found: ${filePath}. Run export first.`);
  }

  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
