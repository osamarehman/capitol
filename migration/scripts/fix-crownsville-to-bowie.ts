#!/usr/bin/env tsx
/**
 * Fix Crownsville → Bowie
 *
 * Reassigns all 114 pages with mapLocation "Crownsville" to "Bowie"
 * and replaces Crownsville office details in locationContactDetails HTML
 * with Bowie office info.
 *
 * Usage:
 *   npx tsx scripts/fix-crownsville-to-bowie.ts --dry-run   # preview changes
 *   npx tsx scripts/fix-crownsville-to-bowie.ts              # apply changes
 */

import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  mapLocation: string | null;
  locationContactDetails: string | null;
}

// ── Replacement rules for locationContactDetails HTML ──────────────────

const REPLACEMENTS: Array<{ pattern: RegExp; replacement: string }> = [
  // Location link
  { pattern: /\/locations\/crownsville/g, replacement: '/locations/bowie' },

  // Address line 1 (with or without period)
  { pattern: /414 Kyle Rd\.?/g, replacement: '12606 Hillmeade Station Dr.' },

  // City/State/Zip
  { pattern: /Crownsville,?\s*MD\s*21032/g, replacement: 'Bowie, MD 20720' },

  // Phone numbers used on Crownsville pages
  { pattern: /301\.786\.0560/g, replacement: '301.769.6909' },
  { pattern: /410\.587\.0128/g, replacement: '301.769.6909' },

  // Email variants used on Crownsville pages
  { pattern: /hello@improveitmd\.com/g, replacement: 'support@improveitmd.com' },
  { pattern: /customerservice@improveitmd\.com/g, replacement: 'support@improveitmd.com' },
];

// ── Helpers ────────────────────────────────────────────────────────────

async function fetchAllPages(filters?: Record<string, unknown>): Promise<LocalPage[]> {
  const allPages: LocalPage[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const params: Record<string, unknown> = {
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'fields[0]': 'slug',
      'fields[1]': 'title',
      'fields[2]': 'mapLocation',
      'fields[3]': 'locationContactDetails',
      status: 'published',
      ...filters,
    };

    const entries = await strapiClient.getEntries('services', params);
    if (entries.length === 0) break;

    allPages.push(...(entries as unknown as LocalPage[]));
    if (entries.length < pageSize) break;
    page++;
  }

  return allPages;
}

function applyReplacements(html: string): string {
  let result = html;
  for (const { pattern, replacement } of REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// ── Main ──────────────────────────────────────────────────────────────

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  logger.info('=== Fix Crownsville → Bowie ===');
  logger.info(`Target Strapi: ${CONFIG.strapi.baseUrl}`);
  logger.info(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);

  // Check connection
  const isHealthy = await strapiClient.healthCheck();
  if (!isHealthy) {
    logger.error(`Cannot connect to Strapi at ${CONFIG.strapi.baseUrl}`);
    process.exit(1);
  }
  const isValid = await strapiClient.validateToken();
  if (!isValid) {
    logger.error('Invalid Strapi API token');
    process.exit(1);
  }
  logger.info('Strapi connection OK\n');

  // Step 1: Fetch all Crownsville pages
  logger.info('Fetching pages with mapLocation = Crownsville...');
  const crownsvillePages = await fetchAllPages({
    'filters[mapLocation][$eq]': 'Crownsville',
  });
  logger.info(`Found ${crownsvillePages.length} Crownsville pages\n`);

  if (crownsvillePages.length === 0) {
    logger.info('No Crownsville pages found — nothing to do.');
    return;
  }

  // Step 2: Update each page
  let updated = 0;
  let errors = 0;

  for (let i = 0; i < crownsvillePages.length; i++) {
    const page = crownsvillePages[i];
    const label = `[${i + 1}/${crownsvillePages.length}] ${page.slug}`;

    const updateData: Record<string, unknown> = {
      mapLocation: 'Bowie',
    };

    // Fix locationContactDetails HTML if present
    let contactChanged = false;
    if (page.locationContactDetails) {
      const fixed = applyReplacements(page.locationContactDetails);
      if (fixed !== page.locationContactDetails) {
        updateData.locationContactDetails = fixed;
        contactChanged = true;
      }
    }

    logger.info(`${label}  mapLocation→Bowie${contactChanged ? '  contactDetails→updated' : ''}`);

    if (dryRun) {
      updated++;
      continue;
    }

    try {
      await strapiClient.updateEntry('services', page.documentId, updateData);
      updated++;
      // Small delay to avoid overwhelming the API
      await new Promise((r) => setTimeout(r, 100));
    } catch (err: any) {
      logger.error(`  FAILED: ${err.message}`);
      errors++;
    }
  }

  // Step 3: Verification
  logger.info('\n--- Verification ---');

  if (!dryRun) {
    const remaining = await fetchAllPages({
      'filters[mapLocation][$eq]': 'Crownsville',
    });
    logger.info(`Crownsville pages remaining: ${remaining.length}`);

    if (remaining.length > 0) {
      logger.error('WARNING: Some pages still have mapLocation = Crownsville!');
      for (const p of remaining.slice(0, 10)) {
        logger.error(`  - ${p.slug}`);
      }
    }

    // Check for leftover Crownsville references in contact details
    // Fetch all Bowie pages (the ones we just updated) to scan their content
    const bowiePages = await fetchAllPages({
      'filters[mapLocation][$eq]': 'Bowie',
    });

    let leftoverCount = 0;
    for (const p of bowiePages) {
      const html = p.locationContactDetails || '';
      if (html.includes('Crownsville') || html.includes('414 Kyle Rd')) {
        leftoverCount++;
        if (leftoverCount <= 5) {
          logger.error(`  Leftover Crownsville ref in: ${p.slug}`);
        }
      }
    }
    if (leftoverCount > 0) {
      logger.error(`WARNING: ${leftoverCount} Bowie pages still reference Crownsville in contactDetails`);
    } else {
      logger.info('No leftover Crownsville references in contactDetails');
    }
  }

  // Summary
  logger.info('\n' + '='.repeat(60));
  logger.info(`${dryRun ? 'Would update' : 'Updated'}: ${updated}`);
  logger.info(`Failed: ${errors}`);
  logger.info(`Total: ${crownsvillePages.length}`);
  logger.info('='.repeat(60));
}

main().catch((err) => {
  logger.error('Fatal:', err);
  process.exit(1);
});
