import { createWriteStream, mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join, basename } from 'path';
import https from 'https';
import http from 'http';
import { CONFIG } from '../config/index.js';
import { logger } from '../utils/logger.js';
import { withRetry } from '../utils/retry.js';
import type { WebflowItem, WebflowAssetInfo } from '../types/webflow.js';

/**
 * Extract asset URLs from collection items (including alt text)
 */
export function extractAssetUrls(
  items: WebflowItem[],
  collectionSlug: string
): WebflowAssetInfo[] {
  const assets: WebflowAssetInfo[] = [];

  for (const item of items) {
    const itemId = item.id;
    const fieldData = item.fieldData || {};

    for (const [fieldSlug, value] of Object.entries(fieldData)) {
      // Handle single image/file fields
      if (isAssetField(value)) {
        const assetData = value as { url: string; fileId?: string; alt?: string };
        if (assetData.url) {
          const filename = generateFilename(assetData.url, itemId, fieldSlug);
          assets.push({
            url: assetData.url,
            filename,
            localPath: join(CONFIG.paths.assets, collectionSlug, filename),
            fieldSlug,
            itemId,
            collectionSlug,
            alt: assetData.alt || undefined,
          });
        }
      }

      // Handle multi-image/file fields (array)
      if (Array.isArray(value)) {
        value.forEach((arrayItem, index) => {
          if (isAssetField(arrayItem)) {
            const assetData = arrayItem as { url: string; alt?: string };
            if (assetData.url) {
              const filename = generateFilename(
                assetData.url,
                itemId,
                `${fieldSlug}_${index}`
              );
              assets.push({
                url: assetData.url,
                filename,
                localPath: join(CONFIG.paths.assets, collectionSlug, filename),
                fieldSlug,
                itemId,
                collectionSlug,
                alt: assetData.alt || undefined,
              });
            }
          }
        });
      }
    }
  }

  return assets;
}

/**
 * Check if a value is an asset field (has url property)
 */
function isAssetField(value: unknown): boolean {
  return (
    value !== null &&
    typeof value === 'object' &&
    'url' in value &&
    typeof (value as { url: unknown }).url === 'string'
  );
}

/**
 * Generate a unique filename for an asset
 */
function generateFilename(url: string, itemId: string, fieldSlug: string): string {
  try {
    const urlObj = new URL(url);
    const originalName = basename(urlObj.pathname);
    const ext = originalName.split('.').pop() || 'jpg';
    // Use a sanitized version of the itemId and fieldSlug
    const safeItemId = itemId.replace(/[^a-zA-Z0-9]/g, '');
    const safeFieldSlug = fieldSlug.replace(/[^a-zA-Z0-9_]/g, '');
    return `${safeItemId}_${safeFieldSlug}.${ext}`;
  } catch {
    // Fallback if URL parsing fails
    return `${itemId}_${fieldSlug}.jpg`;
  }
}

/**
 * Download a single asset
 */
export async function downloadAsset(asset: WebflowAssetInfo): Promise<void> {
  const dir = join(CONFIG.paths.assets, asset.collectionSlug);
  mkdirSync(dir, { recursive: true });

  // Skip if already exists
  if (existsSync(asset.localPath)) {
    logger.debug(`Asset already exists: ${asset.filename}`);
    return;
  }

  return withRetry(
    async () => {
      return new Promise<void>((resolve, reject) => {
        const protocol = asset.url.startsWith('https') ? https : http;

        const request = protocol.get(asset.url, (response) => {
          // Handle redirects
          if (response.statusCode === 301 || response.statusCode === 302) {
            const redirectUrl = response.headers.location;
            if (redirectUrl) {
              downloadAsset({ ...asset, url: redirectUrl })
                .then(resolve)
                .catch(reject);
              return;
            }
          }

          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download ${asset.url}: HTTP ${response.statusCode}`));
            return;
          }

          const file = createWriteStream(asset.localPath);
          response.pipe(file);

          file.on('finish', () => {
            file.close();
            logger.debug(`Downloaded: ${asset.filename}`);
            resolve();
          });

          file.on('error', (err) => {
            file.close();
            reject(err);
          });
        });

        request.on('error', reject);
        request.setTimeout(30000, () => {
          request.destroy();
          reject(new Error(`Timeout downloading ${asset.url}`));
        });
      });
    },
    { maxAttempts: 3, baseDelayMs: 2000 }
  );
}

/**
 * Download all assets with concurrency control
 */
export async function downloadAllAssets(
  assets: WebflowAssetInfo[],
  concurrency: number = 5
): Promise<void> {
  if (assets.length === 0) {
    logger.info('No assets to download');
    return;
  }

  logger.info(`Downloading ${assets.length} assets (concurrency: ${concurrency})...`);

  // Dynamic import for p-limit (ESM only)
  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(concurrency);

  let completed = 0;
  const total = assets.length;

  const tasks = assets.map((asset) =>
    limit(async () => {
      try {
        await downloadAsset(asset);
        completed++;
        logger.progress(completed, total, `Downloading assets...`);
      } catch (error) {
        logger.error(`Failed to download ${asset.filename}:`, (error as Error).message);
      }
    })
  );

  await Promise.all(tasks);
  logger.info(`Downloaded ${completed}/${total} assets`);
}

/**
 * Save asset info for later use
 */
export function saveAssetInfo(
  assets: WebflowAssetInfo[],
  collectionSlug: string
): void {
  mkdirSync(CONFIG.paths.assets, { recursive: true });
  const outputPath = join(CONFIG.paths.assets, `${collectionSlug}-info.json`);
  writeFileSync(outputPath, JSON.stringify(assets, null, 2));
  logger.info(`Saved asset info to ${outputPath}`);
}

/**
 * Load asset info from file
 */
export function loadAssetInfo(collectionSlug: string): WebflowAssetInfo[] {
  const filePath = join(CONFIG.paths.assets, `${collectionSlug}-info.json`);

  if (!existsSync(filePath)) {
    return [];
  }

  return JSON.parse(readFileSync(filePath, 'utf-8'));
}
