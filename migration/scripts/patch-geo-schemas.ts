#!/usr/bin/env tsx
/**
 * patch-geo-schemas.ts
 *
 * Applies targeted additive fixes to existing geo page schemas in Strapi.
 * Does NOT replace schemas — only adds missing fields and fixes known issues.
 *
 * Fixes applied to ALL geo page service types:
 *   - Add sameAs CID for Bowie HQ (if missing)
 *   - Add founder.description (if missing)
 *   - Add BreadcrumbList to @graph (if missing)
 *   - Add additionalProperty for neighborhoods (if missing)
 *   - Fix duplicate WebSite schema (keep only 1)
 *   - Fix improveitmd.com → www.improveitmd.com in WebSite url
 *
 * Additional fixes for ROOFING geo pages:
 *   - Add Atlas Pro Plus + MuleHide certs to award, hasCredential, memberOf
 *   - Add Atlas/MuleHide entries to knowsAbout
 *   - Add Atlas Scotchgard offer to hasOfferCatalog
 *
 * Additional fixes for FLAT ROOFING geo pages:
 *   - Add MuleHide cert to award, hasCredential, knowsAbout
 *
 * Usage:
 *   tsx scripts/patch-geo-schemas.ts --dry-run
 *   tsx scripts/patch-geo-schemas.ts --dry-run --service=roofing --limit=3
 *   tsx scripts/patch-geo-schemas.ts --slug=bowie-maryland-roofing-company-near-you
 *   tsx scripts/patch-geo-schemas.ts
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const SITE_URL = 'https://www.improveitmd.com';
const BOWIE_CID = 'https://maps.google.com/?cid=16068834676004648914';

const FOUNDER_DESCRIPTION =
  'Pat Jewell has 30+ years of experience in the exterior remodeling industry. He founded Capitol Improvements in 2010.';

// ── Service type → breadcrumb label mapping ────────────────────────

const SERVICE_BREADCRUMB_LABEL: Record<string, string> = {
  roofing: 'Roofing',
  siding: 'Siding',
  window: 'Windows',
  door: 'Doors',
  deck: 'Decks',
  gutter: 'Gutters',
  'flat-roofing': 'Flat Roofing',
};

// ── Roofing-specific additions ─────────────────────────────────────

const ROOFING_EXTRA_AWARDS = [
  'Atlas Pro Plus Certified Contractor 2026',
  'MuleHide Certified TPO Roofing Contractor',
];

const ROOFING_EXTRA_CREDENTIALS = [
  {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: 'Atlas Pro Plus Certified Contractor',
  },
  {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: 'MuleHide Certified TPO Roofing Contractor',
  },
];

const ROOFING_EXTRA_MEMBEROF = [
  {
    '@type': 'Organization',
    name: 'Atlas Pro Plus Contractor Program',
    url: 'https://www.atlasroofing.com',
  },
  {
    '@type': 'Organization',
    name: 'MuleHide Certified Contractor Program',
    url: 'https://www.mulehide.com',
  },
];

const ROOFING_EXTRA_KNOWS_ABOUT = [
  'Atlas Scotchgard Protector Shingles',
  'Atlas StormMaster Shingles',
  'MuleHide TPO Roofing',
];

// ── Flat roofing-specific additions ────────────────────────────────

const FLAT_ROOFING_EXTRA_AWARDS = ['MuleHide Certified TPO Roofing Contractor'];

const FLAT_ROOFING_EXTRA_CREDENTIALS = [
  {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'certification',
    name: 'MuleHide Certified TPO Roofing Contractor',
  },
];

const FLAT_ROOFING_EXTRA_KNOWS_ABOUT = ['MuleHide TPO Roofing'];

// ── Interfaces ─────────────────────────────────────────────────────

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  city: string | null;
  state: string | null;
  serviceType: string | null;
  mapSection: string | null;
  schemaMarkup: string | null;
}

// ── Helpers ────────────────────────────────────────────────────────

function getCity(page: LocalPage): string {
  if (page.city) return page.city;
  if (page.title) {
    const parts = page.title.split(' - ');
    if (parts.length >= 2) {
      let city = parts[1].trim();
      if (city === 'DC' || city === 'Washington, DC') city = 'Washington DC';
      return city;
    }
  }
  return 'Maryland';
}

function getState(page: LocalPage): string {
  if (page.state) return page.state;
  const city = getCity(page);
  if (city === 'Washington DC' || city.includes('DC')) return 'DC';
  return 'MD';
}

function parseNeighborhoods(mapSection: string): string[] {
  const neighborhoods: string[] = [];
  const regex = /<div class="pins_item"><img[^>]*>([^<]+)<\/div>/gi;
  let match;
  while ((match = regex.exec(mapSection)) !== null) {
    const name = match[1].trim();
    if (name) neighborhoods.push(name);
  }
  return neighborhoods;
}

function detectServiceCategory(page: LocalPage): string {
  const slug = page.slug || '';
  if (slug.includes('flat-roofing')) return 'flat-roofing';
  if (slug.includes('roofing')) return 'roofing';
  if (slug.includes('siding')) return 'siding';
  if (slug.includes('window')) return 'window';
  if (slug.includes('door') || slug.includes('front-door')) return 'door';
  if (slug.includes('deck')) return 'deck';
  if (slug.includes('gutter')) return 'gutter';
  return page.serviceType || 'unknown';
}

// ── Parse schemaMarkup HTML into script blocks ─────────────────────

function parseSchemaMarkup(
  markup: string
): { json: any; raw: string }[] {
  const blocks: { json: any; raw: string }[] = [];
  const regex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(markup)) !== null) {
    try {
      blocks.push({ json: JSON.parse(match[1]), raw: match[1] });
    } catch {
      // keep raw block if JSON parse fails
      blocks.push({ json: null, raw: match[1] });
    }
  }
  return blocks;
}

// ── Build output from blocks ───────────────────────────────────────

function buildMarkup(blocks: { json: any }[]): string {
  return blocks
    .map((b) => {
      const json = JSON.stringify(b.json);
      return `<script type="application/ld+json">${json}</script>`;
    })
    .join('');
}

// ── Add to array if not already present (by name/string match) ─────

function addToStringArray(arr: any[], items: string[]): boolean {
  let changed = false;
  for (const item of items) {
    if (!arr.includes(item)) {
      arr.push(item);
      changed = true;
    }
  }
  return changed;
}

function addToObjectArray(
  arr: any[],
  items: any[],
  matchKey: string
): boolean {
  let changed = false;
  for (const item of items) {
    const exists = arr.some((a) => a[matchKey] === item[matchKey]);
    if (!exists) {
      arr.push(item);
      changed = true;
    }
  }
  return changed;
}

// ── Core patch logic ───────────────────────────────────────────────

function patchSchema(
  page: LocalPage,
  blocks: { json: any; raw: string }[]
): { blocks: { json: any }[]; changes: string[] } {
  const changes: string[] = [];
  const city = getCity(page);
  const state = getState(page);
  const serviceCategory = detectServiceCategory(page);
  const neighborhoods = page.mapSection
    ? parseNeighborhoods(page.mapSection)
    : [];

  // 1. Fix duplicate WebSite blocks — keep only the first one
  let websiteCount = 0;
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i].json;
    if (!b) continue;

    // Standalone WebSite block
    if (b['@type'] === 'WebSite') {
      websiteCount++;
      if (websiteCount > 1) {
        blocks.splice(i, 1);
        changes.push('Removed duplicate WebSite block');
      }
      continue;
    }

    // WebSite inside @graph
    if (b['@graph'] && Array.isArray(b['@graph'])) {
      const wsIndices: number[] = [];
      b['@graph'].forEach((g: any, idx: number) => {
        if (g['@type'] === 'WebSite') wsIndices.push(idx);
      });
      if (wsIndices.length > 1) {
        // Remove all but first
        for (let j = wsIndices.length - 1; j > 0; j--) {
          b['@graph'].splice(wsIndices[j], 1);
          changes.push('Removed duplicate WebSite from @graph');
        }
      }
      // Count the remaining one
      if (wsIndices.length > 0) websiteCount++;
    }
  }

  // 2. Fix improveitmd.com → www.improveitmd.com in WebSite url
  for (const block of blocks) {
    const b = block.json;
    if (!b) continue;

    if (b['@type'] === 'WebSite' && b.url?.includes('improveitmd.com')) {
      b.url = b.url.replace('improveitmd.com', 'www.improveitmd.com');
      changes.push('Fixed WebSite url: v2 → www');
    }

    if (b['@graph']) {
      for (const g of b['@graph']) {
        if (g['@type'] === 'WebSite' && g.url?.includes('improveitmd.com')) {
          g.url = g.url.replace('improveitmd.com', 'www.improveitmd.com');
          changes.push('Fixed WebSite url in @graph: v2 → www');
        }
      }
    }
  }

  // 3. Find the main business entity in any block's @graph
  let business: any = null;
  let mainBlock: any = null;

  for (const block of blocks) {
    const b = block.json;
    if (!b?.['@graph']) continue;

    for (const g of b['@graph']) {
      const types = Array.isArray(g['@type']) ? g['@type'] : [g['@type']];
      if (
        types.includes('RoofingContractor') ||
        types.includes('GeneralContractor') ||
        types.includes('HomeAndConstructionBusiness')
      ) {
        business = g;
        mainBlock = b;
        break;
      }
    }
    if (business) break;
  }

  if (!business) {
    changes.push('WARNING: No business entity found in schema');
    return { blocks, changes };
  }

  // 4. Add sameAs CID (if missing)
  if (!business.sameAs) {
    business.sameAs = [BOWIE_CID];
    changes.push('Added sameAs array with Bowie CID');
  } else if (Array.isArray(business.sameAs)) {
    if (!business.sameAs.includes(BOWIE_CID)) {
      business.sameAs.push(BOWIE_CID);
      changes.push('Added Bowie CID to sameAs');
    }
  } else if (typeof business.sameAs === 'string') {
    if (business.sameAs !== BOWIE_CID) {
      business.sameAs = [business.sameAs, BOWIE_CID];
      changes.push('Converted sameAs to array and added Bowie CID');
    }
  }

  // 5. Add founder.description (if missing)
  if (business.founder) {
    if (!business.founder.description) {
      business.founder.description = FOUNDER_DESCRIPTION;
      changes.push('Added founder.description');
    }
  } else {
    business.founder = {
      '@type': 'Person',
      name: 'Pat Jewell',
      jobTitle: 'Owner & Founder',
      description: FOUNDER_DESCRIPTION,
    };
    changes.push('Added founder with description');
  }

  // 6. Add additionalProperty for neighborhoods (if has neighborhoods and missing)
  if (neighborhoods.length > 0) {
    if (!business.additionalProperty) {
      business.additionalProperty = [];
    }
    const hasNeighborhoodProp = business.additionalProperty.some(
      (p: any) => p.name?.includes('Neighborhoods')
    );
    if (!hasNeighborhoodProp) {
      business.additionalProperty.push({
        '@type': 'PropertyValue',
        name: 'Neighborhoods with Completed Projects',
        value: neighborhoods.join(', '),
      });
      changes.push(
        `Added neighborhoods additionalProperty (${neighborhoods.length} neighborhoods)`
      );
    }
  }

  // 7. Add BreadcrumbList to @graph (if missing)
  const hasBreadcrumb = mainBlock['@graph'].some(
    (g: any) => g['@type'] === 'BreadcrumbList'
  );
  if (!hasBreadcrumb) {
    const label =
      SERVICE_BREADCRUMB_LABEL[serviceCategory] || serviceCategory;
    mainBlock['@graph'].push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Service Areas',
          item: `${SITE_URL}/service-areas`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${city} ${label}`,
          item: `${SITE_URL}/services/${page.slug}`,
        },
      ],
    });
    changes.push(`Added BreadcrumbList (${city} ${label})`);
  }

  // 8. Service-specific additions: ROOFING
  if (serviceCategory === 'roofing') {
    // Awards
    if (!business.award) business.award = [];
    if (addToStringArray(business.award, ROOFING_EXTRA_AWARDS)) {
      changes.push('Added Atlas + MuleHide awards');
    }

    // Credentials
    if (!business.hasCredential) business.hasCredential = [];
    if (addToObjectArray(business.hasCredential, ROOFING_EXTRA_CREDENTIALS, 'name')) {
      changes.push('Added Atlas + MuleHide credentials');
    }

    // MemberOf
    if (!business.memberOf) business.memberOf = [];
    if (addToObjectArray(business.memberOf, ROOFING_EXTRA_MEMBEROF, 'name')) {
      changes.push('Added Atlas + MuleHide memberOf');
    }

    // KnowsAbout
    if (!business.knowsAbout) business.knowsAbout = [];
    if (addToStringArray(business.knowsAbout, ROOFING_EXTRA_KNOWS_ABOUT)) {
      changes.push('Added Atlas + MuleHide knowsAbout');
    }

    // Add Atlas Scotchgard offer
    if (business.hasOfferCatalog?.itemListElement) {
      const hasAtlasOffer = business.hasOfferCatalog.itemListElement.some(
        (o: any) =>
          o.name?.includes('Atlas Scotchgard') ||
          o.itemOffered?.name?.includes('Atlas Scotchgard')
      );
      if (!hasAtlasOffer) {
        business.hasOfferCatalog.itemListElement.push({
          '@type': 'Offer',
          name: 'Atlas Scotchgard Protector Shingle Roof',
          url: `${SITE_URL}/services/${page.slug}`,
          availability: 'https://schema.org/InStock',
          itemOffered: {
            '@type': 'Service',
            name: 'Atlas Scotchgard Protector Shingle Roof',
            description: `Atlas shingles with 3M Scotchgard Protector — resists black streaks caused by algae. Available in ${city}, ${state}.`,
            areaServed: {
              '@type': 'City',
              name: city,
              addressRegion: state,
            },
            provider: business['@id']
              ? { '@id': business['@id'] }
              : { '@type': 'Organization', name: 'Capitol Improvements' },
          },
        });
        changes.push('Added Atlas Scotchgard offer');
      }
    }
  }

  // 9. Service-specific additions: FLAT ROOFING
  if (serviceCategory === 'flat-roofing') {
    if (!business.award) business.award = [];
    if (addToStringArray(business.award, FLAT_ROOFING_EXTRA_AWARDS)) {
      changes.push('Added MuleHide award');
    }

    if (!business.hasCredential) business.hasCredential = [];
    if (addToObjectArray(business.hasCredential, FLAT_ROOFING_EXTRA_CREDENTIALS, 'name')) {
      changes.push('Added MuleHide credential');
    }

    if (!business.knowsAbout) business.knowsAbout = [];
    if (addToStringArray(business.knowsAbout, FLAT_ROOFING_EXTRA_KNOWS_ABOUT)) {
      changes.push('Added MuleHide knowsAbout');
    }
  }

  return { blocks, changes };
}

// ── Strapi paginated fetch ─────────────────────────────────────────

async function fetchPages(
  client: AxiosInstance,
  filter: Record<string, string>
): Promise<LocalPage[]> {
  const allPages: LocalPage[] = [];
  let pageNum = 1;

  while (true) {
    const params: Record<string, any> = {
      status: 'published',
      'pagination[page]': pageNum,
      'pagination[pageSize]': 100,
      'fields[0]': 'slug',
      'fields[1]': 'title',
      'fields[2]': 'city',
      'fields[3]': 'state',
      'fields[4]': 'serviceType',
      'fields[5]': 'mapSection',
      'fields[6]': 'schemaMarkup',
      ...filter,
    };

    const resp = await client.get<{
      data: LocalPage[];
      meta: { pagination: { pageCount: number; total: number } };
    }>('/services', { params });

    allPages.push(...resp.data.data);
    const { pageCount, total } = resp.data.meta.pagination;
    console.log(
      `  Fetched page ${pageNum}/${pageCount} (${allPages.length}/${total})`
    );

    if (pageNum >= pageCount) break;
    pageNum++;
  }

  return allPages;
}

// ── Main ───────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const slugArg = args.find((a) => a.startsWith('--slug='));
  const slugFilter = slugArg ? slugArg.split('=')[1] : undefined;
  const serviceArg = args.find((a) => a.startsWith('--service='));
  const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limitNum = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

  if (!STRAPI_API_TOKEN) {
    throw new Error('STRAPI_API_TOKEN environment variable is required');
  }

  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  console.log('=== Patch Geo Page Schemas ===');
  console.log(`Strapi URL: ${STRAPI_URL}`);
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  if (serviceFilter) console.log(`Service filter: ${serviceFilter}`);
  if (slugFilter) console.log(`Slug filter: ${slugFilter}`);
  if (limitNum) console.log(`Limit: ${limitNum}`);
  console.log('');

  // Build filter
  const filter: Record<string, string> = {};
  if (slugFilter) {
    filter['filters[slug]'] = slugFilter;
  } else if (serviceFilter) {
    filter['filters[serviceType]'] = serviceFilter;
  }

  // Fetch pages
  console.log('Fetching pages...');
  let pages = await fetchPages(client, filter);

  // Filter out pages without schemas
  pages = pages.filter((p) => p.schemaMarkup && p.schemaMarkup.trim());
  console.log(`${pages.length} pages with existing schemas\n`);

  if (limitNum) pages = pages.slice(0, limitNum);

  // Backup
  const backupDir = join(__dirname, '../data');
  if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');

  const backups: Record<string, any> = {};
  for (const page of pages) {
    backups[page.documentId] = {
      slug: page.slug,
      documentId: page.documentId,
      schemaMarkup: page.schemaMarkup,
    };
  }
  if (Object.keys(backups).length > 0 && !dryRun) {
    const bp = join(backupDir, `schemaMarkup-patch-backup-${ts}.json`);
    writeFileSync(bp, JSON.stringify(backups, null, 2));
    console.log(`Backed up ${Object.keys(backups).length} schemas\n`);
  }

  // Process
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const city = getCity(page);
    const state = getState(page);
    const serviceCategory = detectServiceCategory(page);
    const progress = `[${i + 1}/${pages.length}]`;

    console.log(`${progress} ${page.slug} (${city}, ${state}) [${serviceCategory}]`);

    const blocks = parseSchemaMarkup(page.schemaMarkup!);
    if (blocks.length === 0) {
      console.log('  SKIP: no parseable schema blocks');
      skipped++;
      continue;
    }

    const { blocks: patched, changes } = patchSchema(page, blocks);

    if (changes.length === 0) {
      console.log('  SKIP: no changes needed');
      skipped++;
      continue;
    }

    for (const c of changes) {
      console.log(`  + ${c}`);
    }

    if (dryRun) {
      updated++;
      continue;
    }

    try {
      const output = buildMarkup(patched);
      await client.put(`/services/${page.documentId}`, {
        data: { schemaMarkup: output },
      });
      console.log(`  UPDATED (${output.length} chars)`);
      updated++;
    } catch (err: any) {
      console.error(`  ERROR: ${err.message}`);
      failed++;
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log('\n=== Summary ===');
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
  if (!dryRun && updated > 0) {
    console.log(`\nVerify at: ${STRAPI_URL}/admin`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
