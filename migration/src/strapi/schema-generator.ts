import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { mapFieldType, toKebabCase, toCamelCase } from '../mappers/field-type-mapper.js';
import { CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';
import type { WebflowCollection, WebflowField } from '../types/webflow.js';
import type { StrapiSchema, StrapiAttribute } from '../types/strapi.js';

// Map of Webflow collection IDs to Strapi API names
const collectionIdToApiName = new Map<string, string>();

// System fields to skip
const SYSTEM_FIELDS = ['_id', 'slug', '_archived', '_draft', 'name', 'id'];

// Custom fields to add to all collections
const CUSTOM_FIELDS: Record<string, StrapiAttribute> = {
  // Schema markup for structured data (JSON-LD)
  schemaMarkup: {
    type: 'text',
    required: false,
  },
  // Custom HTML for dynamic content
  customHtml: {
    type: 'text',
    required: false,
  },
  // Additional richtext content field
  customContent: {
    type: 'richtext',
    required: false,
  },
  // FAQ richtext field
  faqContent: {
    type: 'richtext',
    required: false,
  },
};

/**
 * Generate Strapi schemas for all Webflow collections
 */
export function generateStrapiSchemas(
  collections: WebflowCollection[]
): Map<string, StrapiSchema> {
  const schemas = new Map<string, StrapiSchema>();

  // First pass: create basic schema structure and build ID mapping
  for (const collection of collections) {
    const singularName = toKebabCase(collection.singularName || collection.displayName);
    const pluralName = toKebabCase(collection.slug);

    collectionIdToApiName.set(collection.id, singularName);

    const schema: StrapiSchema = {
      kind: 'collectionType',
      collectionName: pluralName.replace(/-/g, '_'),
      info: {
        singularName,
        pluralName,
        displayName: collection.displayName,
        description: `Migrated from Webflow collection: ${collection.displayName}`,
      },
      options: {
        draftAndPublish: true,
      },
      attributes: {},
    };

    // Add title/name field (Strapi convention)
    schema.attributes['title'] = {
      type: 'string',
      required: true,
    };

    // Add slug field
    schema.attributes['slug'] = {
      type: 'uid',
      targetField: 'title',
      required: true,
    };

    // Add custom fields to all collections
    for (const [fieldName, fieldDef] of Object.entries(CUSTOM_FIELDS)) {
      schema.attributes[fieldName] = { ...fieldDef };
    }

    schemas.set(collection.id, schema);
  }

  // Second pass: add fields with proper reference resolution
  for (const collection of collections) {
    const schema = schemas.get(collection.id)!;

    for (const field of collection.fields) {
      // Skip system fields
      if (SYSTEM_FIELDS.includes(field.slug.toLowerCase())) {
        continue;
      }

      // Skip non-editable fields
      if (!field.isEditable) {
        continue;
      }

      const attributeName = toCamelCase(field.slug);

      // Skip if already defined (like slug, title)
      if (schema.attributes[attributeName]) {
        continue;
      }

      const attribute = mapFieldType(field);

      // Handle reference fields - resolve target collection
      if (attribute.type === 'relation') {
        const targetCollectionId = field.metadata?.collectionId as string | undefined;

        if (targetCollectionId) {
          const targetApiName = collectionIdToApiName.get(targetCollectionId);
          if (targetApiName) {
            attribute.target = `api::${targetApiName}.${targetApiName}`;
          } else {
            // Skip relations with unknown targets - convert to string field
            logger.warn(
              `Reference field "${field.slug}" in "${collection.displayName}" ` +
                `points to unknown collection: ${targetCollectionId}. Converting to string.`
            );
            schema.attributes[attributeName] = {
              type: 'string',
              required: attribute.required || false,
            };
            continue;
          }
        } else {
          // No target collection ID - skip the relation field
          logger.warn(
            `Reference field "${field.slug}" in "${collection.displayName}" has no target. Skipping.`
          );
          continue;
        }
      }

      schema.attributes[attributeName] = attribute;
    }
  }

  return schemas;
}

/**
 * Write Strapi schema files to disk
 */
export function writeStrapiSchemas(schemas: Map<string, StrapiSchema>): void {
  // Create mappings directory
  mkdirSync(CONFIG.paths.mappings, { recursive: true });

  for (const [collectionId, schema] of schemas) {
    const apiName = schema.info.singularName;
    const apiPath = join(CONFIG.paths.schemas, apiName);

    // Create directory structure
    const contentTypesPath = join(apiPath, 'content-types', apiName);
    const routesPath = join(apiPath, 'routes');
    const controllersPath = join(apiPath, 'controllers');
    const servicesPath = join(apiPath, 'services');

    mkdirSync(contentTypesPath, { recursive: true });
    mkdirSync(routesPath, { recursive: true });
    mkdirSync(controllersPath, { recursive: true });
    mkdirSync(servicesPath, { recursive: true });

    // Write schema.json
    writeFileSync(
      join(contentTypesPath, 'schema.json'),
      JSON.stringify(schema, null, 2)
    );

    // Write route file (TypeScript for Strapi 5)
    writeFileSync(
      join(routesPath, `${apiName}.ts`),
      `import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::${apiName}.${apiName}');
`
    );

    // Write controller file
    writeFileSync(
      join(controllersPath, `${apiName}.ts`),
      `import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::${apiName}.${apiName}');
`
    );

    // Write service file
    writeFileSync(
      join(servicesPath, `${apiName}.ts`),
      `import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::${apiName}.${apiName}');
`
    );

    logger.info(`Generated schema for: ${apiName}`);
  }

  // Save collection ID mapping for later use during import
  const mappingPath = join(CONFIG.paths.mappings, 'collection-id-map.json');
  writeFileSync(
    mappingPath,
    JSON.stringify(Object.fromEntries(collectionIdToApiName), null, 2)
  );
  logger.info(`Saved collection ID mapping to ${mappingPath}`);
}

/**
 * Get the collection ID to API name mapping
 */
export function getCollectionIdMapping(): Map<string, string> {
  return collectionIdToApiName;
}
