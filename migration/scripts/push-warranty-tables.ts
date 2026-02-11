#!/usr/bin/env tsx
/**
 * Push Warranty Data Tables to Local Pages
 *
 * This script:
 * 1. Reads the warranty CSV data
 * 2. Groups entries by city
 * 3. Fetches all published local pages from Strapi
 * 4. Generates an HTML table for each city's warranty data
 * 5. Pushes the table to the `tableRichText` field for matching pages
 *
 * If no warranty entries exist for a city, that page is skipped.
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const CSV_PATH = join(__dirname, '../../Capitol - Warrenty Sheet - Data.csv');

interface WarrantyEntry {
  warrantyType: string;
  city: string;
  state: string;
  zipCode: string;
  steepSlopeSquares: string;
}

interface CityWarrantyData {
  city: string;
  state: string;
  entries: WarrantyEntry[];
}

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  tableRichText?: string;
}

class WarrantyTablePusher {
  private strapiClient: AxiosInstance;
  private cityMap: Map<string, CityWarrantyData> = new Map();

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

  /**
   * Load and parse the warranty CSV, group by city
   */
  loadCSV(): void {
    console.log('Loading warranty CSV...');

    const csvContent = readFileSync(CSV_PATH, 'utf-8');
    const records = parse(csvContent, {
      columns: false,
      skip_empty_lines: true,
      trim: true,
      from_line: 2, // skip header
    });

    for (const row of records) {
      // Columns: [index, warrantyType, city, state, zip, steepSlopeSquares]
      const warrantyType = row[1]?.trim();
      const city = row[2]?.trim();
      const state = row[3]?.trim();
      const zipCode = row[4]?.trim();
      const steepSlopeSquares = row[5]?.trim();

      if (!city || !warrantyType) continue;

      const entry: WarrantyEntry = {
        warrantyType,
        city,
        state,
        zipCode,
        steepSlopeSquares,
      };

      const cityKey = this.normalizeCityKey(city);

      if (!this.cityMap.has(cityKey)) {
        this.cityMap.set(cityKey, {
          city,
          state,
          entries: [],
        });
      }

      this.cityMap.get(cityKey)!.entries.push(entry);
    }

    let totalEntries = 0;
    for (const [, data] of this.cityMap) {
      totalEntries += data.entries.length;
    }

    console.log(`Loaded ${totalEntries} warranty entries across ${this.cityMap.size} cities`);
  }

  /**
   * Normalize city key with alias handling for common mismatches
   */
  private normalizeCityKey(city: string): string {
    let key = city.toLowerCase().replace(/[^a-z\s]/g, '').trim();

    // Alias mappings so page names match CSV city names
    const aliases: Record<string, string> = {
      'washington dc': 'washington',
      'ft washington': 'fort washington',
      'ft meade': 'fort meade',
      'mt airy': 'mount airy',
      'upper marlboro md': 'upper marlboro',
      'mont village': 'montgomery village',
      'mont village': 'montgomery village',
    };

    return aliases[key] || key;
  }

  /**
   * Extract city name from page title (format: "Service - City")
   */
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

    // Fallback: extract from slug
    const slug = page.slug;
    const cleanSlug = slug
      .replace(/-maryland-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio|flat-roofing|commercial-roofing).*$/, '');

    let cityName = cleanSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (cityName === 'Washington Dc' || cityName === 'Dc') {
      cityName = 'Washington DC';
    }

    return cityName;
  }

  /**
   * Generate HTML table for a city's warranty data
   */
  generateTableHTML(cityName: string, data: CityWarrantyData): string {
    const rows = data.entries
      .map(
        (e) =>
          `<tr><td>${e.warrantyType}</td><td>${e.zipCode}</td><td>${e.steepSlopeSquares}</td></tr>`
      )
      .join('\n');

    return `<h2>${cityName} Homeowners</h2>
<figure class="table">
<table>
<thead>
<tr><th>Warranty Type</th><th>ZIP Code</th><th>Steep Slope Squares</th></tr>
</thead>
<tbody>
${rows}
</tbody>
</table>
</figure>`;
  }

  /**
   * Fetch all published local pages from Strapi
   */
  async fetchAllPages(): Promise<LocalPage[]> {
    console.log('\nFetching all published pages from Strapi...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get<{
        data: LocalPage[];
        meta: { pagination: { total: number; pageCount: number } };
      }>('/services', {
        params: {
          status: 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      const pages = response.data.data;
      allPages.push(...pages);

      console.log(
        `  Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length}/${response.data.meta.pagination.total} pages)`
      );

      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`Found ${allPages.length} published pages`);
    return allPages;
  }

  /**
   * Update a page's tableRichText field
   */
  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { tableRichText: html },
      });
      return true;
    } catch (error: any) {
      console.error(`  Failed to update ${page.slug}`);
      if (error.response?.data) {
        console.error('  Strapi error:', JSON.stringify(error.response.data, null, 2));
      }
      return false;
    }
  }

  async run(options: { dryRun?: boolean; limit?: number; slug?: string } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('=== Warranty Table Pusher ===\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Filter: slug = ${slug}`);
    console.log('');

    this.loadCSV();

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`Filtered to ${pages.length} page(s) matching slug: ${slug}`);
    }

    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`Limited to first ${limit} page(s)`);
    }

    if (pages.length === 0) {
      console.log('\nNo pages found to update');
      return;
    }

    console.log(`\nProcessing ${pages.length} pages...\n`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const cityName = this.extractCityFromPage(page);
      const cityKey = this.normalizeCityKey(cityName);
      const cityData = this.cityMap.get(cityKey);

      if (!cityData) {
        console.log(`[${i + 1}/${pages.length}] ${page.slug} -> city="${cityName}" -> No warranty data, skipping`);
        skipped++;
        continue;
      }

      console.log(
        `[${i + 1}/${pages.length}] ${page.slug} -> city="${cityName}" -> ${cityData.entries.length} entries`
      );

      const html = this.generateTableHTML(cityName, cityData);

      if (dryRun) {
        console.log(`  [DRY RUN] Would update with ${cityData.entries.length} rows`);
        updated++;
        continue;
      }

      const success = await this.updatePage(page, html);
      if (success) {
        console.log(`  Updated successfully`);
        updated++;
      } else {
        errors++;
      }

      // Small delay between API calls
      await new Promise((r) => setTimeout(r, 200));
    }

    console.log('\n' + '='.repeat(50));
    console.log('SUMMARY');
    console.log('='.repeat(50));
    console.log(`Updated: ${updated}`);
    console.log(`Skipped (no data): ${skipped}`);
    console.log(`Errors: ${errors}`);
    console.log(`Total: ${pages.length}`);
    console.log('='.repeat(50));
  }
}

// Parse CLI args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: tsx scripts/push-warranty-tables.ts [options]

Options:
  --dry-run       Preview changes without updating Strapi
  --limit=N       Process only first N pages
  --slug=<slug>   Update a specific page only
  --help          Show this help message

Examples:
  tsx scripts/push-warranty-tables.ts --dry-run
  tsx scripts/push-warranty-tables.ts --limit=5
  tsx scripts/push-warranty-tables.ts --slug=pasadena-maryland-roofing-company-near-you
`);
  process.exit(0);
}

const pusher = new WarrantyTablePusher();
pusher.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
