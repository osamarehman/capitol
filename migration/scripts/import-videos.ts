#!/usr/bin/env tsx
/**
 * Import Videos to Strapi
 *
 * Re-imports video content after it was accidentally deleted
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

interface WebflowVideo {
  id: string;
  fieldData: {
    name: string;
    slug: string;
    'video-copy'?: string;
    'video-short-description'?: string;
    'video-thumbnail'?: { url: string; alt?: string };
    'punch-line'?: string;
    'video-link'?: { url: string };
    'schema-markup'?: string;
    'custom-html'?: string;
    'custom-content'?: string;
    'faq-content'?: string;
  };
}

interface IdMapping {
  webflowId: string;
  strapiDocumentId: string;
  strapiId: number;
}

function transformVideoData(item: WebflowVideo): Record<string, unknown> {
  const fieldData = item.fieldData;

  return {
    title: fieldData.name,
    slug: fieldData.slug,
    videoCopy: fieldData['video-copy'] || null,
    videoShortDescription: fieldData['video-short-description'] || null,
    punchLine: fieldData['punch-line'] || null,
    videoLink: fieldData['video-link']?.url || null,
    schemaMarkup: fieldData['schema-markup'] || null,
    customHtml: fieldData['custom-html'] || null,
    customContent: fieldData['custom-content'] || null,
    faqContent: fieldData['faq-content'] || null,
  };
}

async function main() {
  logger.info('=== Import Videos Script ===');

  // Check Strapi connection
  logger.info('Checking Strapi connection...');
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }

  const isValidToken = await strapiClient.validateToken();
  if (!isValidToken) {
    logger.error('Invalid Strapi API token');
    process.exit(1);
  }

  logger.info('Strapi connection successful');

  // Load video items
  const videosPath = join(CONFIG.paths.items, 'videos.json');
  const videos: WebflowVideo[] = JSON.parse(readFileSync(videosPath, 'utf-8'));

  logger.info(`Found ${videos.length} videos to import`);

  const idMappings: IdMapping[] = [];

  for (const video of videos) {
    try {
      const data = transformVideoData(video);
      logger.info(`Importing: ${data.title}`);

      const result = await strapiClient.createEntry('videos', data);

      idMappings.push({
        webflowId: video.id,
        strapiDocumentId: result.documentId,
        strapiId: result.id,
      });

      logger.info(`  ✓ Created with ID: ${result.id}`);
    } catch (error) {
      logger.error(`Failed to import ${video.fieldData.name}:`, (error as Error).message);
    }
  }

  // Save new ID mappings
  const mappingPath = join(CONFIG.paths.mappings, 'videos-ids.json');
  writeFileSync(mappingPath, JSON.stringify(idMappings, null, 2));
  logger.info(`\nSaved ID mappings to ${mappingPath}`);

  logger.info('\n=== Import Complete ===');
  logger.info(`Imported ${idMappings.length}/${videos.length} videos`);
  logger.info('\nNext: Run the asset upload script to add thumbnails');
}

main();
