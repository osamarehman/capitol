import { createReadStream, readFileSync, existsSync, writeFileSync, mkdirSync, statSync } from 'fs';
import { join, basename, extname } from 'path';
import axios from 'axios';
import FormData from 'form-data';
import { CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { withRetry } from '../utils/retry.js';
import { strapiClient } from './client.js';
import { toCamelCase } from '../mappers/field-type-mapper.js';
import type { WebflowAssetInfo } from '../types/webflow.js';
import type { AssetMapping, IdMapping } from '../types/strapi.js';

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  avif: 'image/avif',
  pdf: 'application/pdf',
  mp4: 'video/mp4',
  webm: 'video/webm',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

function getMimeType(filename: string): string {
  const ext = extname(filename).toLowerCase().replace('.', '');
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Upload a single asset to Strapi
 */
export async function uploadAsset(
  localPath: string,
  webflowUrl: string,
  alt?: string
): Promise<AssetMapping | null> {
  if (!existsSync(localPath)) {
    logger.warn(`Asset file not found: ${localPath}`);
    return null;
  }

  // Check file size
  const stats = statSync(localPath);
  if (stats.size === 0) {
    logger.warn(`Empty file, skipping: ${localPath}`);
    return null;
  }

  return withRetry(
    async () => {
      const form = new FormData();
      const filename = basename(localPath);

      form.append('files', createReadStream(localPath), {
        filename,
        contentType: getMimeType(filename),
      });

      // Use Webflow alt text if available, otherwise generate from filename
      const alternativeText = alt || filename.split('.')[0].replace(/[_-]/g, ' ');

      form.append(
        'fileInfo',
        JSON.stringify({
          name: filename,
          alternativeText,
          caption: '',
        })
      );

      const response = await axios.post(
        `${CONFIG.strapi.baseUrl}/api/upload`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          timeout: 60000,
        }
      );

      const uploadedFile = response.data[0];

      return {
        localPath,
        webflowUrl,
        strapiId: uploadedFile.id,
        strapiUrl: uploadedFile.url,
        alt: alternativeText,
      };
    },
    { maxAttempts: 3, baseDelayMs: 2000 }
  );
}

/**
 * Upload all assets for a collection
 */
export async function uploadCollectionAssets(
  collectionSlug: string,
  concurrency: number = 3
): Promise<AssetMapping[]> {
  // Load asset info
  const assetInfoPath = join(CONFIG.paths.assets, `${collectionSlug}-info.json`);

  if (!existsSync(assetInfoPath)) {
    logger.info(`No assets found for collection: ${collectionSlug}`);
    return [];
  }

  const assets: WebflowAssetInfo[] = JSON.parse(readFileSync(assetInfoPath, 'utf-8'));

  if (assets.length === 0) {
    return [];
  }

  logger.info(`Uploading ${assets.length} assets for ${collectionSlug}...`);

  // Load existing mappings (for resume support)
  const mappingPath = join(CONFIG.paths.mappings, `${collectionSlug}-assets.json`);
  const existingMappings: AssetMapping[] = existsSync(mappingPath)
    ? JSON.parse(readFileSync(mappingPath, 'utf-8'))
    : [];
  const uploadedUrls = new Set(existingMappings.map((m) => m.webflowUrl));

  // Filter out already uploaded assets
  const pendingAssets = assets.filter((a) => !uploadedUrls.has(a.url));

  if (pendingAssets.length === 0) {
    logger.info('All assets already uploaded');
    return existingMappings;
  }

  logger.info(`${pendingAssets.length} assets pending upload`);

  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(concurrency);

  const newMappings: AssetMapping[] = [];
  let completed = 0;

  const tasks = pendingAssets.map((asset) =>
    limit(async () => {
      try {
        // Pass alt text from Webflow to Strapi
        const mapping = await uploadAsset(asset.localPath, asset.url, asset.alt);
        if (mapping) {
          newMappings.push(mapping);
        }
        completed++;
        logger.progress(completed, pendingAssets.length, `Uploading assets...`);
      } catch (error) {
        logger.error(`Failed to upload ${asset.filename}:`, (error as Error).message);
      }
    })
  );

  await Promise.all(tasks);

  // Save all mappings
  const allMappings = [...existingMappings, ...newMappings];
  mkdirSync(CONFIG.paths.mappings, { recursive: true });
  writeFileSync(mappingPath, JSON.stringify(allMappings, null, 2));

  logger.info(`Uploaded ${newMappings.length} assets`);

  return allMappings;
}

/**
 * Link uploaded assets to their entries
 */
export async function linkAssetsToEntries(
  collectionSlug: string,
  strapiContentType: string
): Promise<void> {
  // Load mappings
  const assetMappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-assets.json`);
  const idMappingsPath = join(CONFIG.paths.mappings, `${collectionSlug}-ids.json`);
  const itemsPath = join(CONFIG.paths.items, `${collectionSlug}.json`);

  if (!existsSync(assetMappingsPath) || !existsSync(idMappingsPath)) {
    logger.warn(`Mappings not found for ${collectionSlug}`);
    return;
  }

  const assetMappings: AssetMapping[] = JSON.parse(readFileSync(assetMappingsPath, 'utf-8'));
  const idMappings: IdMapping[] = JSON.parse(readFileSync(idMappingsPath, 'utf-8'));
  const items = JSON.parse(readFileSync(itemsPath, 'utf-8'));

  // Build lookup maps
  const assetByWebflowUrl = new Map(assetMappings.map((a) => [a.webflowUrl, a]));
  const strapiDocIdByWebflowId = new Map(
    idMappings.map((m) => [m.webflowId, m.strapiDocumentId])
  );

  logger.info(`Linking assets to entries for ${collectionSlug}...`);

  let linked = 0;

  for (const item of items) {
    const webflowId = item.id;
    const strapiDocumentId = strapiDocIdByWebflowId.get(webflowId);

    if (!strapiDocumentId) continue;

    const fieldData = item.fieldData || {};
    const updateData: Record<string, unknown> = {};
    let hasUpdates = false;

    for (const [fieldSlug, value] of Object.entries(fieldData)) {
      // Handle single image/file
      if (value && typeof value === 'object' && 'url' in value) {
        const assetData = value as { url: string };
        const assetMapping = assetByWebflowUrl.get(assetData.url);

        if (assetMapping) {
          const strapiFieldName = toCamelCase(fieldSlug);
          updateData[strapiFieldName] = assetMapping.strapiId;
          hasUpdates = true;
        }
      }

      // Handle multi-image/file
      if (Array.isArray(value)) {
        const strapiIds: number[] = [];

        for (const v of value) {
          if (v && typeof v === 'object' && 'url' in v) {
            const assetMapping = assetByWebflowUrl.get((v as { url: string }).url);
            if (assetMapping) {
              strapiIds.push(assetMapping.strapiId);
            }
          }
        }

        if (strapiIds.length > 0) {
          const strapiFieldName = toCamelCase(fieldSlug);
          updateData[strapiFieldName] = strapiIds;
          hasUpdates = true;
        }
      }
    }

    if (hasUpdates) {
      try {
        await strapiClient.updateEntry(strapiContentType, strapiDocumentId, updateData);
        linked++;
      } catch (error) {
        logger.error(`Failed to link assets for ${webflowId}:`, (error as Error).message);
      }
    }
  }

  logger.info(`Linked assets to ${linked} entries`);
}
