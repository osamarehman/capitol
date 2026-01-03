import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '../../.env') });

export const CONFIG = {
  webflow: {
    accessToken: process.env.WEBFLOW_ACCESS_TOKEN!,
    siteId: process.env.WEBFLOW_SITE_ID!,
    rateLimit: {
      requestsPerMinute: 60,
      retryAttempts: 3,
      retryDelayMs: 1000,
    },
  },
  strapi: {
    baseUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    apiToken: process.env.STRAPI_API_TOKEN || '',
  },
  paths: {
    root: join(__dirname, '../..'),
    collections: join(__dirname, '../../data/collections'),
    items: join(__dirname, '../../data/items'),
    assets: join(__dirname, '../../data/assets'),
    mappings: join(__dirname, '../../data/mappings'),
    schemas: join(__dirname, '../../../strapi/src/api'),
  },
  debug: process.env.DEBUG === 'true',
};

// Validate required config
export function validateConfig(): void {
  if (!CONFIG.webflow.accessToken) {
    throw new Error('WEBFLOW_ACCESS_TOKEN is required');
  }
  if (!CONFIG.webflow.siteId) {
    throw new Error('WEBFLOW_SITE_ID is required');
  }
}
