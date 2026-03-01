#!/usr/bin/env tsx
/**
 * Reformat Warranty Tables with AI-generated neighborhood content
 *
 * This script:
 * 1. Reads warranty CSV data grouped by city
 * 2. Uses AI to generate an h2 + paragraph highlighting neighborhoods served
 * 3. Builds the new table-wrapper / warranty-table HTML format
 * 4. Pushes to tableRichText for all matching pages
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const CSV_PATH = join(__dirname, '../../Capitol - Warrenty Sheet - Data.csv');
const CACHE_PATH = join(__dirname, '../data/warranty-h2-cache.json');

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

interface CityContent {
  neighborhoods: string;
}

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
}

class WarrantyTableReformatter {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private cityMap: Map<string, CityWarrantyData> = new Map();
  private contentCache: Record<string, CityContent> = {};
  private aiCallCount = 0;

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.anthropic = new Anthropic({ apiKey });

    // Load cache
    if (existsSync(CACHE_PATH)) {
      this.contentCache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      console.log(`📂 Loaded ${Object.keys(this.contentCache).length} cached city contents`);
    }
  }

  /**
   * Save cache to disk
   */
  private saveCache(): void {
    writeFileSync(CACHE_PATH, JSON.stringify(this.contentCache, null, 2));
  }

  /**
   * Load and parse the warranty CSV, group by city
   */
  loadCSV(): void {
    console.log('📄 Loading warranty CSV...');

    const csvContent = readFileSync(CSV_PATH, 'utf-8');
    const records = parse(csvContent, {
      columns: false,
      skip_empty_lines: true,
      trim: true,
      from_line: 2,
    });

    for (const row of records) {
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
        this.cityMap.set(cityKey, { city, state, entries: [] });
      }

      this.cityMap.get(cityKey)!.entries.push(entry);
    }

    let totalEntries = 0;
    for (const [, data] of this.cityMap) {
      totalEntries += data.entries.length;
    }

    console.log(`✅ Loaded ${totalEntries} warranty entries across ${this.cityMap.size} cities`);
  }

  /**
   * Normalize city key
   */
  private normalizeCityKey(city: string): string {
    let key = city.toLowerCase().replace(/[^a-z\s]/g, '').trim();

    const aliases: Record<string, string> = {
      'washington dc': 'washington',
      'ft washington': 'fort washington',
      'ft meade': 'fort meade',
      'mt airy': 'mount airy',
      'upper marlboro md': 'upper marlboro',
      'mont village': 'montgomery village',
    };

    return aliases[key] || key;
  }

  /**
   * Extract city name from page
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

    const slug = page.slug;
    const cleanSlug = slug
      .replace(/-maryland-.*$/, '')
      .replace(/-virginia-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-va-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio|flat-roofing|commercial-roofing).*$/, '');

    let cityName = cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (cityName === 'Washington Dc' || cityName === 'Dc') {
      cityName = 'Washington DC';
    }

    return cityName;
  }

  /**
   * Extract state info from slug
   */
  private extractStateFromSlug(slug: string): string {
    if (slug.includes('-virginia-') || slug.includes('-va-') || slug.startsWith('virginia-')) {
      return 'VA';
    }
    if (slug.includes('-dc-') || slug.startsWith('washington-dc')) {
      return 'DC';
    }
    return 'MD';
  }

  /**
   * Generate AI neighborhood names for a city
   */
  async generateCityContent(cityName: string, stateAbbr: string, data: CityWarrantyData): Promise<CityContent> {
    const cacheKey = cityName.toLowerCase();

    if (this.contentCache[cacheKey]) {
      return this.contentCache[cacheKey];
    }

    this.aiCallCount++;
    console.log(`   🤖 AI call #${this.aiCallCount}: Generating neighborhoods for ${cityName}...`);

    const zipCodes = [...new Set(data.entries.map((e) => e.zipCode))].join(', ');

    const prompt = `List 3-4 real, well-known neighborhood or subdivision names in ${cityName}, ${stateAbbr} (ZIP codes: ${zipCodes}).

Return ONLY a comma-separated list of names. No extra text, no numbering, no explanation.

Example: Maple Heights, Riverside Estates, Old Town, Willowbrook`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = (response.content[0] as { type: string; text: string }).text.trim();

      const content: CityContent = { neighborhoods: text };

      this.contentCache[cacheKey] = content;
      this.saveCache();

      return content;
    } catch (error: any) {
      console.error(`   ⚠️ AI error for ${cityName}: ${error.message}`);
      const fallback: CityContent = { neighborhoods: 'various local neighborhoods' };
      this.contentCache[cacheKey] = fallback;
      this.saveCache();
      return fallback;
    }
  }

  /**
   * Build the new table HTML format
   */
  /**
   * Normalize city name to Title Case
   */
  private titleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  buildTableHTML(content: CityContent, data: CityWarrantyData, cityName: string, stateAbbr: string): string {
    const rows = data.entries
      .map(
        (e) =>
          `<tr><td>${e.warrantyType}</td><td>${e.steepSlopeSquares}</td><td>${this.titleCase(e.city)}</td><td>${e.state.toUpperCase()}</td><td>${e.zipCode}</td></tr>`
      )
      .join('');

    const h2 = `Recent GAF Roofing Installs in ${cityName}`;
    const paragraph = `Below are several recent roofing projects we have completed in ${cityName}, ${stateAbbr}. These installs feature local homes in neighborhoods including ${content.neighborhoods}.`;

    return `<h2>${h2}</h2><p>${paragraph}</p><div class="table-wrapper"><table class="warranty-table"><thead><tr><th>Warranty Type</th><th>Size (Squares)</th><th>City</th><th>State</th><th>ZIP</th></tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  /**
   * Fetch all published pages
   */
  async fetchAllPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published pages from Strapi...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get<{
        data: LocalPage[];
        meta: { pagination: { total: number; pageCount: number } };
      }>('/services', {
        params: {
          'status': 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      allPages.push(...response.data.data);
      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`✅ Found ${allPages.length} published pages`);
    return allPages;
  }

  /**
   * Update page
   */
  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { tableRichText: html },
      });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${page.slug}`);
      if (error.response?.data) {
        console.error('   Error:', JSON.stringify(error.response.data, null, 2));
      }
      return false;
    }
  }

  /**
   * Main execution
   */
  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('📊 Warranty Table Reformatter (with AI neighborhoods)\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    this.loadCSV();

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to slug: ${slug} (${pages.length} match)`);
    }

    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\n⚠️ No pages found to update');
      return;
    }

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const cityName = this.extractCityFromPage(page);
      const cityKey = this.normalizeCityKey(cityName);
      const stateAbbr = this.extractStateFromSlug(page.slug);
      const cityData = this.cityMap.get(cityKey);

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      if (!cityData) {
        console.log(`   City: ${cityName} -> No warranty data, skipping`);
        skippedCount++;
        continue;
      }

      console.log(`   City: ${cityName}, State: ${stateAbbr}, Entries: ${cityData.entries.length}`);

      // Generate or retrieve cached AI content
      const content = await this.generateCityContent(cityName, stateAbbr, cityData);

      if (dryRun) {
        console.log(`   H2: "Recent GAF Roofing Installs in ${cityName}"`);
        console.log(`   Neighborhoods: "${content.neighborhoods}"`);
        console.log(`   ✅ Would update with ${cityData.entries.length} rows`);
        successCount++;
        continue;
      }

      try {
        const html = this.buildTableHTML(content, cityData, cityName, stateAbbr);
        const success = await this.updatePage(page, html);

        if (success) {
          console.log(`   ✅ Updated successfully`);
          successCount++;
        } else {
          errorCount++;
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully ${dryRun ? 'would update' : 'updated'}: ${successCount} pages`);
    console.log(`⏭️ Skipped (no warranty data): ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log(`🤖 AI calls made: ${this.aiCallCount}`);
    console.log('='.repeat(60));

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Update completed! Verify at: ${STRAPI_URL}/admin`);
    }
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
Usage: npx tsx scripts/reformat-warranty-tables.ts [options]

Options:
  --dry-run       Preview changes without updating Strapi
  --limit=N       Process only first N pages
  --slug=<slug>   Update a specific page only
  --help          Show this help message

Examples:
  npx tsx scripts/reformat-warranty-tables.ts --dry-run
  npx tsx scripts/reformat-warranty-tables.ts --slug=pasadena-maryland-roofing-company-near-you
  npx tsx scripts/reformat-warranty-tables.ts --limit=5
`);
  process.exit(0);
}

const reformatter = new WarrantyTableReformatter();
reformatter.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
