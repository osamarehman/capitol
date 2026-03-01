#!/usr/bin/env tsx
/**
 * Script: Bulk Publish Service Areas
 *
 * Publishes all draft service-area entries in Strapi.
 */

import https from 'https';
import { logger } from '../src/utils/logger.js';

const API_TOKEN = process.env.STRAPI_API_TOKEN || '77626a0a1961d67057c102d76d1107b2865f546bc3dc681d9693dcf598d67890d10191241805780746fe7b1e211004ee0f1a9a4e6b4bd0e6dee8d47fca9b103902db07d2d336fb85f859a3e41d07917ffb4c24a2cd3980e902ed46a38903c88890b415036a444722eac62af7093cc064ff2777f5cc05b5b808f981f24c55351e';
const BASE_URL = 'cms.improveitmd.com';

async function makeRequest(method: string, path: string, body?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      path: `/api${path}`,
      method,
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(json)}`));
          } else {
            resolve(json);
          }
        } catch {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function getAllServiceAreas(): Promise<Array<{ documentId: string; title: string; publishedAt: string | null }>> {
  const entries: Array<{ documentId: string; title: string; publishedAt: string | null }> = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const response = await makeRequest('GET', `/service-areas?pagination[page]=${page}&pagination[pageSize]=${pageSize}&status=draft`) as {
      data: Array<{ documentId: string; title: string; publishedAt: string | null }>;
      meta: { pagination: { pageCount: number } };
    };

    entries.push(...response.data);

    if (page >= response.meta.pagination.pageCount) {
      break;
    }
    page++;
  }

  return entries;
}

async function publishEntry(documentId: string): Promise<void> {
  await makeRequest('POST', `/service-areas/${documentId}/actions/publish`, {});
}

async function main() {
  logger.info('=== Bulk Publish Service Areas ===');

  // Get all draft entries
  logger.info('Fetching all service area entries...');
  const entries = await getAllServiceAreas();
  logger.info(`Found ${entries.length} draft entries`);

  // Filter to only unpublished
  const drafts = entries.filter((e) => !e.publishedAt);
  logger.info(`${drafts.length} entries are drafts (unpublished)`);

  if (drafts.length === 0) {
    logger.info('No drafts to publish!');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  for (const entry of drafts) {
    try {
      logger.info(`Publishing: ${entry.title} (${entry.documentId})`);
      await publishEntry(entry.documentId);
      successCount++;
    } catch (error) {
      errorCount++;
      logger.error(`Failed to publish ${entry.title}:`, error);
    }
  }

  logger.info('\n=== Publish Summary ===');
  logger.info(`Successfully published: ${successCount}`);
  logger.info(`Failed: ${errorCount}`);
}

main().catch((error) => {
  logger.error('Publish failed:', error);
  process.exit(1);
});
