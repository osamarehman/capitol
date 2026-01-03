import type { WebflowField, WebflowFieldType } from '../types/webflow.js';
import type { StrapiAttribute } from '../types/strapi.js';
import { logger } from '../utils/logger.js';

/**
 * Map Webflow field types to Strapi attribute definitions
 */
// NOTE: All fields set to required: false to allow importing incomplete Webflow items (drafts)
const FIELD_TYPE_MAP: Record<
  WebflowFieldType,
  (field: WebflowField) => StrapiAttribute
> = {
  // Text types - use 'text' for unlimited length
  PlainText: () => ({
    type: 'text',
    required: false,
  }),

  RichText: () => ({
    type: 'richtext',
    required: false,
  }),

  // Number types
  Number: () => ({
    type: 'decimal',
    required: false,
  }),

  // Boolean
  Switch: () => ({
    type: 'boolean',
    required: false,
    default: false,
  }),

  // Date/Time
  DateTime: () => ({
    type: 'datetime',
    required: false,
  }),

  Date: () => ({
    type: 'date',
    required: false,
  }),

  // Media types
  Image: () => ({
    type: 'media',
    multiple: false,
    required: false,
    allowedTypes: ['images'],
  }),

  MultiImage: () => ({
    type: 'media',
    multiple: true,
    required: false,
    allowedTypes: ['images'],
  }),

  Video: () => ({
    type: 'string',
    required: false,
  }),

  VideoLink: () => ({
    type: 'string',
    required: false,
  }),

  File: () => ({
    type: 'media',
    multiple: false,
    required: false,
    allowedTypes: ['files'],
  }),

  // Contact/Link types
  Link: () => ({
    type: 'string',
    required: false,
  }),

  Email: () => ({
    type: 'email',
    required: false,
  }),

  Phone: () => ({
    type: 'string',
    required: false,
  }),

  // Color
  Color: () => ({
    type: 'string',
    required: false,
    regex: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
  }),

  // Option/Enum
  Option: (field) => {
    const options = extractOptions(field);
    return {
      type: 'enumeration',
      required: false,
      enum: options.length > 0 ? options : ['default'],
    };
  },

  // Reference types
  Reference: () => ({
    type: 'relation',
    relation: 'manyToOne',
    target: 'api::placeholder.placeholder', // Will be replaced during schema generation
    required: false,
  }),

  MultiReference: () => ({
    type: 'relation',
    relation: 'manyToMany',
    target: 'api::placeholder.placeholder', // Will be replaced during schema generation
    required: false,
  }),

  // User reference
  User: () => ({
    type: 'relation',
    relation: 'manyToOne',
    target: 'plugin::users-permissions.user',
    required: false,
  }),
};

/**
 * Extract options from an Option field
 */
function extractOptions(field: WebflowField): string[] {
  // Options can be in validations.options (Webflow API v2) or metadata.options
  const options = (field.validations as Record<string, unknown>)?.options || field.metadata?.options;
  if (!Array.isArray(options)) {
    return [];
  }
  return options
    .map((opt) => opt.name || opt.id)
    .filter((name): name is string => typeof name === 'string');
}

/**
 * Map a Webflow field to a Strapi attribute
 */
export function mapFieldType(field: WebflowField): StrapiAttribute {
  const mapper = FIELD_TYPE_MAP[field.type];

  if (!mapper) {
    logger.warn(`Unknown Webflow field type: ${field.type}, defaulting to string`);
    return { type: 'string', required: field.isRequired };
  }

  return mapper(field);
}

/**
 * Convert string to kebab-case
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')       // Collapse multiple hyphens into one
    .replace(/^-|-$/g, '');    // Remove leading/trailing hyphens
}

/**
 * Convert string to camelCase
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^./, (c) => c.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Sanitize a string to be a valid Strapi identifier
 */
export function sanitizeIdentifier(str: string): string {
  // Start with letter, contain only letters, numbers, underscores
  let result = str.replace(/[^a-zA-Z0-9_]/g, '_');
  if (/^[0-9]/.test(result)) {
    result = '_' + result;
  }
  return result;
}
