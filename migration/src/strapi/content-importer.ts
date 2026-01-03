import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { strapiClient } from './client.js';
import { CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { toCamelCase } from '../mappers/field-type-mapper.js';
import type { WebflowItem, WebflowCollection } from '../types/webflow.js';
import type { IdMapping } from '../types/strapi.js';

/**
 * Build a map of option IDs to option names for Option fields
 */
function buildOptionIdToNameMap(collection: WebflowCollection): Map<string, Map<string, string>> {
  const fieldOptionMaps = new Map<string, Map<string, string>>();

  for (const field of collection.fields) {
    if (field.type === 'Option') {
      const options = (field.validations as Record<string, unknown>)?.options;
      if (Array.isArray(options)) {
        const idToName = new Map<string, string>();
        for (const opt of options) {
          if (opt.id && opt.name) {
            idToName.set(opt.id, opt.name);
          }
        }
        fieldOptionMaps.set(field.slug, idToName);
      }
    }
  }

  return fieldOptionMaps;
}

/**
 * Transform Webflow item data to Strapi format
 */
function transformItemData(
  item: WebflowItem,
  collection: WebflowCollection
): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  const fieldData = item.fieldData || {};

  // Get field type mapping
  const fieldTypes = new Map(
    collection.fields.map((f) => [f.slug, f.type])
  );

  // Build option ID to name mapping for Option fields
  const optionMaps = buildOptionIdToNameMap(collection);

  for (const [fieldSlug, value] of Object.entries(fieldData)) {
    if (value === null || value === undefined) continue;

    // Skip system fields that are handled specially
    if (fieldSlug === 'name' || fieldSlug === 'slug') continue;

    const strapiFieldName = toCamelCase(fieldSlug);
    const fieldType = fieldTypes.get(fieldSlug);

    // Handle different field types
    switch (fieldType) {
      case 'Image':
      case 'MultiImage':
      case 'File':
        // Skip media fields - will be linked later after upload
        break;

      case 'Reference':
      case 'MultiReference':
        // Skip reference fields - will be linked later after all items imported
        break;

      case 'RichText':
        // Rich text is stored as HTML
        data[strapiFieldName] = value;
        break;

      case 'DateTime':
      case 'Date':
        // Ensure valid date format
        if (value) {
          try {
            data[strapiFieldName] = new Date(value as string).toISOString();
          } catch {
            logger.warn(`Invalid date value for ${fieldSlug}: ${value}`);
          }
        }
        break;

      case 'Option':
        // Option fields store the option ID in Webflow, need to convert to name for Strapi
        const optionMap = optionMaps.get(fieldSlug);
        if (optionMap && typeof value === 'string') {
          const optionName = optionMap.get(value);
          if (optionName) {
            data[strapiFieldName] = optionName;
          }
          // Skip if option ID not found (invalid value)
        } else if (typeof value === 'object' && value !== null && 'name' in value) {
          // Handle object format with name property
          data[strapiFieldName] = (value as { name: string }).name;
        } else if (typeof value === 'string' && optionMap) {
          // Value might already be a name, check if it's in the options
          const isValidName = Array.from(optionMap.values()).includes(value);
          if (isValidName) {
            data[strapiFieldName] = value;
          }
        }
        break;

      case 'VideoLink':
        // VideoLink fields contain an object with url property - extract just the URL
        if (typeof value === 'object' && value !== null && 'url' in value) {
          const url = (value as { url: string }).url;
          // Remove extra quotes if present
          data[strapiFieldName] = url.replace(/^"|"$/g, '');
        } else if (typeof value === 'string') {
          data[strapiFieldName] = value;
        }
        break;

      default:
        // Pass through other values (but handle potential objects)
        if (typeof value === 'object' && value !== null && 'url' in value) {
          // Generic object with URL - extract it
          const url = (value as { url: string }).url;
          data[strapiFieldName] = typeof url === 'string' ? url.replace(/^"|"$/g, '') : url;
        } else {
          data[strapiFieldName] = value;
        }
    }
  }

  // Handle name/title field (Webflow uses 'name', Strapi convention is 'title')
  if (fieldData.name && !data.title) {
    data.title = fieldData.name;
  }

  // Handle slug
  if (fieldData.slug) {
    data.slug = fieldData.slug;
  } else if (data.title) {
    // Generate slug from title
    data.slug = (data.title as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  return data;
}

/**
 * Import items from a collection
 */
export async function importCollectionItems(
  collection: WebflowCollection,
  strapiContentType: string
): Promise<IdMapping[]> {
  const itemsPath = join(CONFIG.paths.items, `${collection.slug}.json`);

  if (!existsSync(itemsPath)) {
    logger.warn(`Items file not found: ${itemsPath}`);
    return [];
  }

  const items = JSON.parse(readFileSync(itemsPath, 'utf-8')) as WebflowItem[];
  const idMappings: IdMapping[] = [];

  // Load existing mappings if resuming
  const mappingPath = join(CONFIG.paths.mappings, `${collection.slug}-ids.json`);
  const existingMappings: IdMapping[] = existsSync(mappingPath)
    ? JSON.parse(readFileSync(mappingPath, 'utf-8'))
    : [];
  const processedIds = new Set(existingMappings.map((m) => m.webflowId));

  logger.info(`Importing ${items.length} items to ${strapiContentType}...`);

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of items) {
    const webflowId = item.id;

    // Skip already processed items
    if (processedIds.has(webflowId)) {
      skipped++;
      continue;
    }

    try {
      const data = transformItemData(item, collection);

      // Skip items without required fields
      if (!data.title && !data.slug) {
        logger.warn(`Skipping item ${webflowId}: missing title and slug`);
        failed++;
        continue;
      }

      const result = await strapiClient.createEntry(strapiContentType, data);

      idMappings.push({
        webflowId,
        strapiDocumentId: result.documentId,
        strapiId: result.id,
      });

      imported++;
      logger.progress(imported + skipped + failed, items.length, `Importing ${collection.displayName}...`);
    } catch (error) {
      failed++;
      logger.error(`Failed to import item ${webflowId}:`, (error as Error).message);
    }
  }

  // Save mappings (including previous ones)
  mkdirSync(CONFIG.paths.mappings, { recursive: true });
  const allMappings = [...existingMappings, ...idMappings];
  writeFileSync(mappingPath, JSON.stringify(allMappings, null, 2));

  logger.info(
    `Completed: ${imported} imported, ${skipped} skipped, ${failed} failed`
  );

  return idMappings;
}

/**
 * Load ID mappings for a collection
 */
export function loadIdMappings(collectionSlug: string): IdMapping[] {
  const mappingPath = join(CONFIG.paths.mappings, `${collectionSlug}-ids.json`);

  if (!existsSync(mappingPath)) {
    return [];
  }

  return JSON.parse(readFileSync(mappingPath, 'utf-8'));
}

/**
 * Link reference fields after all items are imported
 */
export async function linkReferenceFields(
  collection: WebflowCollection,
  strapiContentType: string
): Promise<void> {
  const itemsPath = join(CONFIG.paths.items, `${collection.slug}.json`);
  const items = JSON.parse(readFileSync(itemsPath, 'utf-8')) as WebflowItem[];

  // Get ID mappings for this collection
  const idMappings = loadIdMappings(collection.slug);
  const strapiIdByWebflowId = new Map(
    idMappings.map((m) => [m.webflowId, m.strapiDocumentId])
  );

  // Find reference fields
  const referenceFields = collection.fields.filter(
    (f) => f.type === 'Reference' || f.type === 'MultiReference'
  );

  if (referenceFields.length === 0) {
    return;
  }

  logger.info(`Linking reference fields for ${collection.displayName}...`);

  // Load collection ID to API name mapping
  const collectionIdMapPath = join(CONFIG.paths.mappings, 'collection-id-map.json');
  const collectionIdMap: Record<string, string> = existsSync(collectionIdMapPath)
    ? JSON.parse(readFileSync(collectionIdMapPath, 'utf-8'))
    : {};

  for (const item of items) {
    const strapiDocumentId = strapiIdByWebflowId.get(item.id);
    if (!strapiDocumentId) continue;

    const updateData: Record<string, unknown> = {};
    let hasUpdates = false;

    for (const field of referenceFields) {
      const value = item.fieldData?.[field.slug];
      if (!value) continue;

      const targetCollectionId = field.metadata?.collectionId as string;
      const targetApiName = collectionIdMap[targetCollectionId];
      if (!targetApiName) continue;

      // Load target collection mappings
      const targetMappings = loadIdMappings(targetApiName);
      const targetIdMap = new Map(
        targetMappings.map((m) => [m.webflowId, m.strapiId])
      );

      const strapiFieldName = toCamelCase(field.slug);

      if (field.type === 'Reference') {
        // Single reference
        const targetStrapiId = targetIdMap.get(value as string);
        if (targetStrapiId) {
          updateData[strapiFieldName] = targetStrapiId;
          hasUpdates = true;
        }
      } else {
        // Multi-reference
        const webflowIds = value as string[];
        const strapiIds = webflowIds
          .map((id) => targetIdMap.get(id))
          .filter((id): id is number => id !== undefined);

        if (strapiIds.length > 0) {
          updateData[strapiFieldName] = strapiIds;
          hasUpdates = true;
        }
      }
    }

    if (hasUpdates) {
      try {
        await strapiClient.updateEntry(strapiContentType, strapiDocumentId, updateData);
      } catch (error) {
        logger.error(
          `Failed to link references for ${item.id}:`,
          (error as Error).message
        );
      }
    }
  }
}
