#!/usr/bin/env tsx
/**
 * Script: Link Service Areas to Local Pages
 *
 * This script links service area cities to their corresponding local pages
 * by matching slug patterns. Based on analysis of the actual data, the patterns are:
 *
 * - Roofing: {city}-{state}-roofing-company-near-you
 * - Siding: {city}-{state}-siding-contractors-near-you
 * - Windows: {city}-{state}-window-replacement-near-you
 * - Doors: {city}-{state}-front-door-replacement-near-you
 * - Decks: {city}-{state}-deck-builders-near-you
 * - Gutters: {city}-{state}-gutter-guards-gutters-near-you
 * - Exterior Trim: {city}-{state}-exterior-trim-contractors-near-you
 *
 * Where state: MD -> maryland, VA -> virginia, DC -> dc
 */

import { strapiClient } from '../src/strapi/client.js';
import { logger } from '../src/utils/logger.js';
import { CONFIG } from '../src/config/index.js';

// State abbreviation to full name mapping
const STATE_MAP: Record<string, string> = {
  MD: 'maryland',
  VA: 'virginia',
  DC: 'dc',
};

// Service slug patterns - exact patterns based on data analysis
// Each service has primary pattern and fallback patterns
const SERVICE_SLUG_PATTERNS: Record<string, string[]> = {
  roofing: [
    '{city}-{state}-roofing-company-near-you',
    '{city}-{state}-roofing-contractor-near-you',
    '{city}-{state}-roofing-contractors-near-you',
    '{city}-roofing-company-near-you',
    '{city}-roofing-contractor-near-you',
  ],
  siding: [
    '{city}-{state}-siding-contractors-near-you',
    '{city}-{state}-siding-contractor-near-you',
    '{city}-{state}-siding-company-near-you',
    '{city}-siding-contractors-near-you',
    '{city}-siding-contractor-near-you',
  ],
  windows: [
    '{city}-{state}-window-replacement-near-you',
    '{city}-{state}-windows-replacement-near-you',
    '{city}-{state}-window-contractor-near-you',
    '{city}-window-replacement-near-you',
  ],
  doors: [
    '{city}-{state}-front-door-replacement-near-you',
    '{city}-{state}-door-replacement-near-you',
    '{city}-{state}-door-installation-near-you',
    '{city}-front-door-replacement-near-you',
    '{city}-door-replacement-near-you',
  ],
  decks: [
    '{city}-{state}-deck-builders-near-you',
    '{city}-{state}-deck-builder-near-you',
    '{city}-{state}-deck-contractor-near-you',
    '{city}-deck-builders-near-you',
    '{city}-deck-builder-near-you',
    'deck-builder-{city}-{state}',
  ],
  gutters: [
    '{city}-{state}-gutter-guards-gutters-near-you',
    '{city}-{state}-gutters-near-you',
    '{city}-{state}-gutter-installation-near-you',
    '{city}-{state}-gutter-contractor-near-you',
    '{city}-gutter-guards-gutters-near-you',
    '{city}-gutters-near-you',
  ],
  exteriorTrim: [
    '{city}-{state}-exterior-trim-contractors-near-you',
    '{city}-{state}-exterior-trim-contractor-near-you',
    '{city}-{state}-trim-contractors-near-you',
    '{city}-exterior-trim-contractors-near-you',
    '{city}-exterior-trim-contractor-near-you',
  ],
};

// Additional keywords for fuzzy matching fallback
const SERVICE_KEYWORDS: Record<string, string[]> = {
  roofing: ['roofing', 'roof'],
  siding: ['siding'],
  windows: ['window', 'windows'],
  doors: ['door', 'front-door'],
  decks: ['deck', 'deck-builder'],
  gutters: ['gutter', 'gutters'],
  exteriorTrim: ['exterior-trim', 'trim'],
};

interface ServiceArea {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  state: string;
  serviceLinks?: {
    roofing?: { documentId: string };
    siding?: { documentId: string };
    exteriorTrim?: { documentId: string };
    decks?: { documentId: string };
    windows?: { documentId: string };
    gutters?: { documentId: string };
    doors?: { documentId: string };
  };
}

interface LocalPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
}

async function fetchAllEntries(contentType: string, populate?: string): Promise<unknown[]> {
  const allEntries: unknown[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const params: Record<string, unknown> = {
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      status: 'published',
    };
    if (populate) {
      params.populate = populate;
    }

    const entries = await strapiClient.getEntries(contentType, params);
    if (entries.length === 0) break;

    allEntries.push(...entries);
    if (entries.length < pageSize) break;
    page++;
  }

  return allEntries;
}

/**
 * Generate all possible slug patterns for a city and service
 */
function generateSlugPatterns(citySlug: string, stateAbbr: string, serviceKey: string): string[] {
  const patterns = SERVICE_SLUG_PATTERNS[serviceKey] || [];
  const stateName = STATE_MAP[stateAbbr] || stateAbbr.toLowerCase();

  return patterns.map((pattern) =>
    pattern.replace('{city}', citySlug).replace('{state}', stateName).toLowerCase()
  );
}

/**
 * Find a matching local page using multiple strategies
 */
function findMatchingPage(
  citySlug: string,
  cityTitle: string,
  stateAbbr: string,
  serviceKey: string,
  localPages: LocalPage[],
  localPageBySlug: Map<string, LocalPage>
): LocalPage | undefined {
  const citySlugLower = citySlug.toLowerCase();
  const stateName = STATE_MAP[stateAbbr] || stateAbbr.toLowerCase();

  // Strategy 1: Exact pattern matching
  const slugPatterns = generateSlugPatterns(citySlugLower, stateAbbr, serviceKey);
  for (const pattern of slugPatterns) {
    const page = localPageBySlug.get(pattern);
    if (page) {
      return page;
    }
  }

  // Strategy 2: Fuzzy match - slug contains city AND state AND service keyword
  const keywords = SERVICE_KEYWORDS[serviceKey] || [];
  for (const page of localPages) {
    const slug = page.slug?.toLowerCase();
    if (!slug) continue;

    // Must contain city name
    if (!slug.includes(citySlugLower)) continue;

    // Must contain state name (or be a generic state page)
    if (!slug.includes(stateName) && !slug.startsWith(citySlugLower + '-' + stateName)) continue;

    // Must contain service keyword
    const hasServiceKeyword = keywords.some((kw) => slug.includes(kw));
    if (!hasServiceKeyword) continue;

    // Verify no other conflicting service keywords
    const otherServiceKeywords = Object.entries(SERVICE_KEYWORDS)
      .filter(([key]) => key !== serviceKey)
      .flatMap(([, kws]) => kws);

    const hasOtherService = otherServiceKeywords.some(
      (kw) => slug.includes(kw) && !keywords.includes(kw)
    );

    if (!hasOtherService) {
      return page;
    }
  }

  // Strategy 3: Try without state in slug (some pages may not have state)
  const cityTitleSlug = cityTitle.toLowerCase().replace(/\s+/g, '-');
  for (const keyword of keywords) {
    const simplePatterns = [
      `${citySlugLower}-${keyword}-near-you`,
      `${citySlugLower}-${keyword}-contractor-near-you`,
      `${citySlugLower}-${keyword}-company-near-you`,
      `${cityTitleSlug}-${keyword}-near-you`,
    ];

    for (const pattern of simplePatterns) {
      const page = localPageBySlug.get(pattern);
      if (page) {
        return page;
      }
    }
  }

  return undefined;
}

async function main() {
  logger.info('=== Link Service Areas to Local Pages ===');
  logger.info(`Target Strapi: ${CONFIG.strapi.baseUrl}`);

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

  // Fetch all service areas
  logger.info('\nFetching service areas...');
  // Try to populate serviceLinks if the component exists, otherwise fetch without it
  let serviceAreas: ServiceArea[];
  try {
    serviceAreas = (await fetchAllEntries('service-areas', 'serviceLinks')) as ServiceArea[];
  } catch (error) {
    logger.info('serviceLinks component not yet deployed, fetching without populate...');
    serviceAreas = (await fetchAllEntries('service-areas')) as ServiceArea[];
  }
  logger.info(`Found ${serviceAreas.length} service areas`);

  // Fetch all local pages (published)
  logger.info('Fetching local pages...');
  const localPages = (await fetchAllEntries('services')) as LocalPage[];
  logger.info(`Found ${localPages.length} published local pages`);

  // Build slug lookup for local pages
  const localPageBySlug = new Map<string, LocalPage>();
  for (const page of localPages) {
    if (page.slug) {
      localPageBySlug.set(page.slug.toLowerCase(), page);
    }
  }

  // Track matched pages for summary
  const matchedPageIds = new Set<number>();
  const matchResults: Record<string, { matched: number; total: number }> = {};

  // Initialize match results for each service
  for (const serviceKey of Object.keys(SERVICE_SLUG_PATTERNS)) {
    matchResults[serviceKey] = { matched: 0, total: 0 };
  }

  // Process each service area
  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  logger.info('\n--- Linking Service Areas ---');

  for (const serviceArea of serviceAreas) {
    try {
      const citySlug = serviceArea.slug.toLowerCase();
      const stateAbbr = serviceArea.state || 'MD';
      const serviceLinks: Record<string, string | null> = {};
      let hasNewLinks = false;

      logger.info(`\nProcessing: ${serviceArea.title} (${citySlug}, ${stateAbbr})`);

      // Find matching local pages for each service type
      for (const serviceKey of Object.keys(SERVICE_SLUG_PATTERNS)) {
        matchResults[serviceKey].total++;

        // Check if already linked
        const existingLink = serviceArea.serviceLinks?.[serviceKey as keyof typeof serviceArea.serviceLinks];
        if (existingLink?.documentId) {
          logger.info(`  ${serviceKey}: already linked`);
          matchResults[serviceKey].matched++;
          continue;
        }

        // Find matching page
        const foundPage = findMatchingPage(
          citySlug,
          serviceArea.title,
          stateAbbr,
          serviceKey,
          localPages,
          localPageBySlug
        );

        if (foundPage) {
          serviceLinks[serviceKey] = foundPage.documentId;
          matchedPageIds.add(foundPage.id);
          hasNewLinks = true;
          matchResults[serviceKey].matched++;
          logger.info(`  ${serviceKey}: MATCHED -> ${foundPage.slug}`);
        } else {
          serviceLinks[serviceKey] = null;
          logger.info(`  ${serviceKey}: no match found`);
        }
      }

      if (!hasNewLinks) {
        skippedCount++;
        continue;
      }

      // Build the serviceLinks component data
      const updateData: Record<string, unknown> = {
        serviceLinks: {
          roofing: serviceLinks.roofing ? { documentId: serviceLinks.roofing } : null,
          siding: serviceLinks.siding ? { documentId: serviceLinks.siding } : null,
          exteriorTrim: serviceLinks.exteriorTrim ? { documentId: serviceLinks.exteriorTrim } : null,
          decks: serviceLinks.decks ? { documentId: serviceLinks.decks } : null,
          windows: serviceLinks.windows ? { documentId: serviceLinks.windows } : null,
          gutters: serviceLinks.gutters ? { documentId: serviceLinks.gutters } : null,
          doors: serviceLinks.doors ? { documentId: serviceLinks.doors } : null,
        },
      };

      // Update the service area
      await strapiClient.updateEntry('service-areas', serviceArea.documentId, updateData);
      updatedCount++;
      logger.info(`  -> Updated successfully`);
    } catch (error) {
      errorCount++;
      logger.error(`Failed to update ${serviceArea.title}:`, error);
    }
  }

  // Summary
  logger.info('\n' + '='.repeat(60));
  logger.info('=== Summary ===');
  logger.info(`Total service areas: ${serviceAreas.length}`);
  logger.info(`Updated: ${updatedCount}`);
  logger.info(`Skipped (no new links): ${skippedCount}`);
  logger.info(`Errors: ${errorCount}`);

  logger.info('\n--- Match Rate by Service ---');
  for (const [service, results] of Object.entries(matchResults)) {
    const rate = results.total > 0 ? ((results.matched / results.total) * 100).toFixed(1) : '0';
    logger.info(`  ${service}: ${results.matched}/${results.total} (${rate}%)`);
  }

  logger.info(`\nTotal local pages matched: ${matchedPageIds.size} / ${localPages.length}`);

  // Print unmatched local pages for review
  const unmatchedPages = localPages.filter((page) => !matchedPageIds.has(page.id));

  if (unmatchedPages.length > 0) {
    logger.info('\n--- Unmatched Local Pages ---');

    // Group by service keyword
    const serviceRelatedPages = unmatchedPages.filter((page) => {
      const slug = page.slug?.toLowerCase() || '';
      return Object.values(SERVICE_KEYWORDS)
        .flat()
        .some((kw) => slug.includes(kw));
    });

    if (serviceRelatedPages.length > 0) {
      logger.info(`\nService-related pages not matched (${serviceRelatedPages.length}):`);
      for (const page of serviceRelatedPages.slice(0, 50)) {
        logger.info(`  - ${page.slug}`);
      }
      if (serviceRelatedPages.length > 50) {
        logger.info(`  ... and ${serviceRelatedPages.length - 50} more`);
      }
    }
  }
}

main().catch((error) => {
  logger.error('Script failed:', error);
  process.exit(1);
});
