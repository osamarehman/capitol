#!/usr/bin/env tsx
/**
 * Sync areasWeServeRichText into locationContactDetails
 *
 * For each published service page:
 *   1. Keeps the office header (from mapLocation config)
 *   2. Appends the areasWeServeRichText content below it
 *   3. Writes the combined HTML back to locationContactDetails
 *
 * Usage:
 *   npx tsx scripts/sync-areas-to-contact-details.ts --dry-run
 *   npx tsx scripts/sync-areas-to-contact-details.ts --dry-run --limit=3
 *   npx tsx scripts/sync-areas-to-contact-details.ts --slug=pasadena-maryland-roofing-company-near-you
 *   npx tsx scripts/sync-areas-to-contact-details.ts
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// ── Office configuration per mapLocation ──────────────────────────────

interface OfficeInfo {
  headerLocation: string;
  address: string;
  cityStateZip: string;
  phone: string;
  email: string;
}

const OFFICE_CONFIG: Record<string, OfficeInfo> = {
  Bowie: {
    headerLocation: 'Our Bowie Office',
    address: '12606 Hillmeade Station Dr.',
    cityStateZip: 'Bowie, MD 20720',
    phone: '301-769-6909',
    email: 'support@improveitmd.com',
  },
  Pasadena: {
    headerLocation: 'Our Bowie Office',
    address: '12606 Hillmeade Station Dr.',
    cityStateZip: 'Bowie, MD 20720',
    phone: '301-769-6909',
    email: 'support@improveitmd.com',
  },
  Gaithersburg: {
    headerLocation: 'Our Gaithersburg Office',
    address: '7916 Plum Creek Dr.',
    cityStateZip: 'Gaithersburg, MD 20879',
    phone: '301-769-6991',
    email: 'help@improveitmd.com',
  },
};

// ── Types ─────────────────────────────────────────────────────────────

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  mapLocation: string | null;
  areasWeServeRichText: string | null;
  locationContactDetails: string | null;
}

// ── Main class ────────────────────────────────────────────────────────

class SyncAreasToContactDetails {
  private strapiClient: AxiosInstance;

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
  }

  // ── City extraction ─────────────────────────────────────────────────

  private extractCityFromPage(page: LocalPage): string {
    if (page.title) {
      const parts = page.title.split(' - ');
      if (parts.length >= 2) {
        let city = parts[1].trim();
        if (city === 'DC' || city === 'Washington, DC') {
          city = 'Washington DC';
        }
        return city;
      }
    }

    const slug = page.slug;
    const cleanSlug = slug
      .replace(/-maryland-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio|flat-roofing|commercial-roofing).*$/, '');

    let cityName = cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (cityName === 'Washington Dc' || cityName === 'Dc') {
      cityName = 'Washington DC';
    }

    return cityName || 'Maryland';
  }

  private getStateAbbreviation(cityName: string): string {
    if (cityName === 'Washington DC' || cityName.includes('DC')) {
      return 'DC';
    }
    return 'MD';
  }

  // ── Strapi fetch ────────────────────────────────────────────────────

  async fetchAllPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published pages from Strapi...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get('/services', {
        params: {
          status: 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'fields[0]': 'slug',
          'fields[1]': 'title',
          'fields[2]': 'mapLocation',
          'fields[3]': 'areasWeServeRichText',
          'fields[4]': 'locationContactDetails',
        },
      });

      const pages = response.data.data as LocalPage[];
      allPages.push(...pages);

      const { pageCount, total } = response.data.meta.pagination;
      console.log(`   Fetched page ${page}/${pageCount} (${allPages.length}/${total})`);

      if (page >= pageCount) break;
      page++;
    }

    console.log(`✅ Found ${allPages.length} published pages`);
    return allPages;
  }

  // ── HTML builder ────────────────────────────────────────────────────

  buildLocationContactDetailsHTML(
    cityName: string,
    stateAbbr: string,
    office: OfficeInfo,
    areasWeServeContent: string
  ): string {
    const parts: string[] = [];

    // Office header
    parts.push(`<h2>${office.headerLocation} Serves ${cityName}, ${stateAbbr}</h2>`);
    parts.push(`<p>${office.address}<br>${office.cityStateZip}</p>`);
    parts.push(`<p>Phone: ${office.phone}<br>Email: ${office.email}</p>`);

    // Areas we serve content (already has its own <h2>, <p> tags)
    parts.push(areasWeServeContent);

    return parts.join('\n\n');
  }

  // ── Update Strapi ───────────────────────────────────────────────────

  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { locationContactDetails: html },
      });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${page.slug}`);
      if (error.response?.data) {
        console.error('   Strapi error:', JSON.stringify(error.response.data, null, 2));
      }
      return false;
    }
  }

  // ── Main run ────────────────────────────────────────────────────────

  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
    serviceFilter?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, serviceFilter } = options;

    console.log('🚀 Sync areasWeServeRichText → locationContactDetails\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Filter: slug = ${slug}`);
    if (serviceFilter) console.log(`Service Filter: ${serviceFilter}`);
    console.log('');

    let pages = await this.fetchAllPages();

    // Filter by slug
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`\n📌 Filtered to ${pages.length} page(s) matching slug: ${slug}`);
    }

    // Filter by service type
    if (serviceFilter) {
      pages = pages.filter((p) => p.slug.includes(serviceFilter));
      console.log(`📌 Filtered to ${pages.length} page(s) containing: ${serviceFilter}`);
    }

    // Apply limit
    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} page(s)`);
    }

    if (pages.length === 0) {
      console.log('\n⚠️  No pages found to update');
      return;
    }

    // Save backup of old locationContactDetails values
    if (!dryRun) {
      const backup: Record<string, { slug: string; documentId: string; locationContactDetails: string | null }> = {};
      for (const page of pages) {
        backup[page.documentId] = {
          slug: page.slug,
          documentId: page.documentId,
          locationContactDetails: page.locationContactDetails,
        };
      }
      const backupPath = join(__dirname, '../data/locationContactDetails-backup.json');
      writeFileSync(backupPath, JSON.stringify(backup, null, 2));
      console.log(`\n💾 Backed up old values to ${backupPath}`);
    }

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    const errors: Array<{ slug: string; error: string }> = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const cityName = this.extractCityFromPage(page);
      const stateAbbr = this.getStateAbbreviation(cityName);
      const mapLocation = page.mapLocation || '';
      const office = OFFICE_CONFIG[mapLocation];

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${cityName}, ${stateAbbr} | mapLocation: ${mapLocation || '(none)'}`);

      if (!office) {
        console.log(`   ⚠️  No office config for mapLocation="${mapLocation}" — skipping`);
        skippedCount++;
        continue;
      }

      if (!page.areasWeServeRichText) {
        console.log(`   ⚠️  No areasWeServeRichText content — skipping`);
        skippedCount++;
        continue;
      }

      // Build combined HTML
      const newHtml = this.buildLocationContactDetailsHTML(
        cityName,
        stateAbbr,
        office,
        page.areasWeServeRichText
      );

      if (dryRun) {
        console.log(`   📝 Preview (first 300 chars):\n      ${newHtml.substring(0, 300).replace(/\n/g, '\n      ')}...`);
        successCount++;
        continue;
      }

      try {
        const success = await this.updatePage(page, newHtml);
        if (success) {
          console.log(`   ✅ Updated`);
          successCount++;
        } else {
          errorCount++;
          errors.push({ slug: page.slug, error: 'Update failed' });
        }
        // Rate limit Strapi writes
        await new Promise((r) => setTimeout(r, 100));
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
        errors.push({ slug: page.slug, error: error.message });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ ${dryRun ? 'Would update' : 'Updated'}: ${successCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`⚠️  Skipped (no office/no content): ${skippedCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log('='.repeat(60));

    if (errors.length > 0 && errors.length <= 20) {
      console.log('\n❌ ERRORS:');
      for (const e of errors) {
        console.log(`  - ${e.slug}: ${e.error}`);
      }
    }

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Done! Verify at: ${STRAPI_URL}/admin`);
    }
  }
}

// ── CLI ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Usage: npm run sync-areas-to-contact-details [options]

Options:
  --dry-run           Preview changes without updating Strapi
  --limit=N           Process only first N pages
  --slug=<slug>       Update a specific page only
  --service=<keyword> Filter by service type (roofing, siding, window, etc.)
  --help              Show this help message

Examples:
  npm run sync-areas-to-contact-details -- --dry-run --limit=3
  npm run sync-areas-to-contact-details -- --slug=pasadena-maryland-roofing-company-near-you
  npm run sync-areas-to-contact-details
`);
  process.exit(0);
}

const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;
const serviceArg = args.find((a) => a.startsWith('--service='));
const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;

const syncer = new SyncAreasToContactDetails();
syncer.run({ dryRun: isDryRun, limit, slug, serviceFilter }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
