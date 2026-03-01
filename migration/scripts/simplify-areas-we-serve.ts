#!/usr/bin/env tsx
/**
 * Simplify "Areas We Serve" Rich Text for All Service Pages
 *
 * Replaces verbose HTML with concise content listing actual neighborhood
 * names (via AI) and ZIP codes only.
 *
 * Usage:
 *   npx tsx scripts/simplify-areas-we-serve.ts --dry-run          # preview
 *   npx tsx scripts/simplify-areas-we-serve.ts --dry-run --limit=3
 *   npx tsx scripts/simplify-areas-we-serve.ts --slug=odenton-maryland-roofing-company-near-you
 *   npx tsx scripts/simplify-areas-we-serve.ts --service=roofing --limit=5
 *   npx tsx scripts/simplify-areas-we-serve.ts                    # full run
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const JOBS_CSV_PATH = join(__dirname, '../../jobs_processed copy.csv');

// Valid MD/DC/VA ZIP code prefixes (200-246)
const VALID_ZIP_PREFIXES = Array.from({ length: 47 }, (_, i) => String(200 + i));

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  areasWeServeRichText?: string;
}

interface CityZipData {
  city: string;
  state: string;
  zipCodes: string[];
}

class AreasWeServeSimplifier {
  private strapiClient: AxiosInstance;
  private openai: OpenAI;
  private cityZipMap: Map<string, CityZipData> = new Map();

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.openai = new OpenAI({ apiKey: openaiKey });
  }

  // ── CSV loading ─────────────────────────────────────────────────────

  loadZipCodesFromCSV(): void {
    console.log('📂 Loading ZIP codes from CSV...');

    const csvContent = readFileSync(JOBS_CSV_PATH, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    for (const record of records) {
      const city = record.city?.trim();
      const state = record.state?.trim() || 'Maryland';
      const zipCode = record.zipCode?.trim();

      if (!city || !zipCode) continue;

      const cityKey = this.normalizeCityKey(city);

      if (!this.cityZipMap.has(cityKey)) {
        this.cityZipMap.set(cityKey, { city, state, zipCodes: [] });
      }

      const cityData = this.cityZipMap.get(cityKey)!;
      if (!cityData.zipCodes.includes(zipCode)) {
        cityData.zipCodes.push(zipCode);
      }
    }

    for (const [, data] of this.cityZipMap) {
      data.zipCodes.sort();
    }

    console.log(`✅ Loaded ZIP codes for ${this.cityZipMap.size} cities`);
  }

  private normalizeCityKey(city: string): string {
    return city.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  }

  private getZipCodesForCity(cityName: string): string[] {
    const cityKey = this.normalizeCityKey(cityName);
    return this.cityZipMap.get(cityKey)?.zipCodes || [];
  }

  // ── ZIP extraction from HTML ────────────────────────────────────────

  /**
   * Extract 5-digit ZIP codes from existing HTML content,
   * filtered to MD/DC/VA ranges (prefixes 200-246).
   */
  extractZipCodesFromHTML(html: string): string[] {
    const matches = html.match(/\b\d{5}\b/g);
    if (!matches) return [];

    const unique = [...new Set(matches)];
    return unique
      .filter((zip) => VALID_ZIP_PREFIXES.includes(zip.substring(0, 3)))
      .sort();
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
          'fields[2]': 'areasWeServeRichText',
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

  // ── AI neighborhood generation ──────────────────────────────────────

  async generateNeighborhoods(cityName: string, stateAbbr: string, zipCodes: string[]): Promise<string> {
    const zipCodesText = zipCodes.length > 0 ? zipCodes.join(', ') : 'N/A';

    const prompt = `You are generating a concise list of real neighborhood names for ${cityName}, ${stateAbbr}.

CRITICAL RULES:
1. Return ONLY a comma-separated list of neighborhood/subdivision names
2. Only include names you are CERTAIN exist in or very near ${cityName}, ${stateAbbr}
3. If you are not sure about specific neighborhoods, return fewer names rather than risk inventing them
4. Do NOT include the city name itself in the list
5. Aim for 5-15 neighborhood names
6. Do NOT include any explanation, just the comma-separated list

ZIP codes served: ${zipCodesText}

Return ONLY the comma-separated neighborhood names, nothing else.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      let neighborhoods = content.trim();
      neighborhoods = neighborhoods.replace(/^```.*\n?/i, '').replace(/\n?```$/i, '');
      neighborhoods = neighborhoods.replace(/^["']|["']$/g, '');

      return neighborhoods;
    } catch (error: any) {
      console.error(`   ❌ AI error for ${cityName}: ${error.message}`);
      return '';
    }
  }

  // ── HTML builder ────────────────────────────────────────────────────

  buildSimplifiedHTML(
    cityName: string,
    stateAbbr: string,
    neighborhoods: string,
    zipCodes: string[]
  ): string {
    const parts: string[] = [];

    parts.push(`<h2>${cityName}, ${stateAbbr} Areas We Serve</h2>`);

    if (neighborhoods) {
      parts.push(`<p><strong>Neighborhoods:</strong><br>\n${neighborhoods}</p>`);
    }

    if (zipCodes.length > 0) {
      parts.push(`<p><strong>ZIP Codes:</strong><br>\n${zipCodes.join(', ')}</p>`);
    }

    return parts.join('\n\n');
  }

  // ── Update Strapi ───────────────────────────────────────────────────

  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { areasWeServeRichText: html },
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

    console.log('🚀 Simplify Areas We Serve Content\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Filter: slug = ${slug}`);
    if (serviceFilter) console.log(`Service Filter: ${serviceFilter}`);
    console.log('');

    // Step 1: Load CSV (fallback ZIP source)
    this.loadZipCodesFromCSV();

    // Step 2: Fetch all pages
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

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let errorCount = 0;
    const errors: Array<{ slug: string; error: string }> = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const cityName = this.extractCityFromPage(page);
      const stateAbbr = this.getStateAbbreviation(cityName);

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${cityName}, ${stateAbbr}`);

      // Step 1: Extract ZIP codes from existing HTML
      let zipCodes: string[] = [];
      if (page.areasWeServeRichText) {
        zipCodes = this.extractZipCodesFromHTML(page.areasWeServeRichText);
      }

      // Step 2: Fall back to CSV if no ZIPs found in HTML
      if (zipCodes.length === 0) {
        zipCodes = this.getZipCodesForCity(cityName);
        if (zipCodes.length > 0) {
          console.log(`   ZIP Codes (from CSV fallback): ${zipCodes.join(', ')}`);
        } else {
          console.log(`   ⚠️  No ZIP codes found in HTML or CSV`);
        }
      } else {
        console.log(`   ZIP Codes (from HTML): ${zipCodes.join(', ')}`);
      }

      // Step 3: Generate neighborhoods via AI
      console.log(`   🤖 Generating neighborhoods...`);
      const neighborhoods = await this.generateNeighborhoods(cityName, stateAbbr, zipCodes);
      if (neighborhoods) {
        console.log(`   ✅ Neighborhoods: ${neighborhoods.substring(0, 80)}...`);
      }

      // Rate limit after AI call
      await new Promise((r) => setTimeout(r, 1000));

      // Step 4: Build simplified HTML
      const newHtml = this.buildSimplifiedHTML(cityName, stateAbbr, neighborhoods, zipCodes);

      if (dryRun) {
        console.log(`   📝 Preview:\n${newHtml.substring(0, 300).replace(/\n/g, '\n      ')}...`);
        successCount++;
        continue;
      }

      // Step 5: Update in Strapi
      try {
        const success = await this.updatePage(page, newHtml);
        if (success) {
          console.log(`   ✅ Updated`);
          successCount++;
        } else {
          errorCount++;
          errors.push({ slug: page.slug, error: 'Update failed' });
        }
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
Usage: npm run simplify-areas-we-serve [options]

Options:
  --dry-run           Preview changes without updating Strapi
  --limit=N           Process only first N pages
  --slug=<slug>       Update a specific page only
  --service=<keyword> Filter by service type (roofing, siding, window, etc.)
  --help              Show this help message

Examples:
  npm run simplify-areas-we-serve -- --dry-run --limit=3
  npm run simplify-areas-we-serve -- --slug=odenton-maryland-roofing-company-near-you
  npm run simplify-areas-we-serve -- --service=roofing --limit=5
  npm run simplify-areas-we-serve
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

const simplifier = new AreasWeServeSimplifier();
simplifier.run({ dryRun: isDryRun, limit, slug, serviceFilter }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
