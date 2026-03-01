#!/usr/bin/env tsx
/**
 * Regenerate locationContactDetails for All Service Pages
 *
 * Rebuilds the locationContactDetails HTML field with a consistent structure:
 *   1. Static office info header (based on mapLocation)
 *   2. AI-generated neighborhoods + CSV-sourced ZIP codes
 *   3. Preserved "Exterior Remodeling Services" cross-link content (if it existed)
 *
 * Usage:
 *   npx tsx scripts/regenerate-location-contact-details.ts --dry-run          # preview
 *   npx tsx scripts/regenerate-location-contact-details.ts --dry-run --limit=3
 *   npx tsx scripts/regenerate-location-contact-details.ts --slug=odenton-maryland-roofing-company-near-you
 *   npx tsx scripts/regenerate-location-contact-details.ts --skip-ai          # zip codes only, no AI
 *   npx tsx scripts/regenerate-location-contact-details.ts                    # full run
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const JOBS_CSV_PATH = join(__dirname, '../../jobs_processed.csv');

// ── Office configuration per mapLocation ──────────────────────────────

interface OfficeInfo {
  headerLocation: string; // e.g. "Our Bowie Office"
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
    headerLocation: 'Our Bowie Office',  // Pasadena pages use Bowie office
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
  locationContactDetails: string | null;
}

interface CityZipData {
  city: string;
  state: string;
  zipCodes: string[];
}

// ── Main class ────────────────────────────────────────────────────────

class LocationContactDetailsRegenerator {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic | null = null;
  private cityZipMap: Map<string, CityZipData> = new Map();

  constructor(private skipAi: boolean) {
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

    if (!skipAi) {
      const anthropicKey = process.env.ANTHROPIC_API_KEY;
      if (!anthropicKey) {
        throw new Error('ANTHROPIC_API_KEY environment variable is required (or use --skip-ai)');
      }
      this.anthropic = new Anthropic({ apiKey: anthropicKey });
    }
  }

  // ── CSV loading ───────────────────────────────────────────────────

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

  // ── Strapi fetch ──────────────────────────────────────────────────

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
          'fields[3]': 'locationContactDetails',
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

  // ── City extraction ───────────────────────────────────────────────

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

  // ── Exterior remodeling preservation ──────────────────────────────

  private extractExteriorRemodelingSection(html: string | null): string | null {
    if (!html) return null;

    // Match <h2> or <h3> containing "Exterior Remodeling" or "Other Services We Offer"
    // through the end of the content
    const patterns = [
      /<h[23][^>]*>.*?Exterior Remodeling Services.*?<\/h[23]>[\s\S]*$/i,
      /<h[23][^>]*>.*?Other Services We Offer.*?<\/h[23]>[\s\S]*$/i,
    ];

    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) {
        return match[0].trim();
      }
    }

    return null;
  }

  // ── AI neighborhood generation ────────────────────────────────────

  async generateNeighborhoods(cityName: string, stateAbbr: string, zipCodes: string[]): Promise<string> {
    if (!this.anthropic) {
      return '';
    }

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
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      // Clean up response
      let neighborhoods = content.text.trim();
      neighborhoods = neighborhoods.replace(/^```.*\n?/i, '').replace(/\n?```$/i, '');
      neighborhoods = neighborhoods.replace(/^["']|["']$/g, '');

      return neighborhoods;
    } catch (error: any) {
      console.error(`   ❌ AI error for ${cityName}: ${error.message}`);
      return '';
    }
  }

  // ── HTML builder ──────────────────────────────────────────────────

  buildLocationContactDetailsHTML(
    cityName: string,
    stateAbbr: string,
    office: OfficeInfo,
    neighborhoods: string,
    zipCodes: string[],
    exteriorSection: string | null
  ): string {
    const parts: string[] = [];

    // Section 1: Office info header
    parts.push(`<h2>${office.headerLocation} Serves ${cityName}, ${stateAbbr}</h2>`);
    parts.push(`<p>${office.address}<br>${office.cityStateZip}</p>`);
    parts.push(`<p>Phone: ${office.phone}<br>Email: ${office.email}</p>`);

    // Section 2: Areas we serve
    parts.push(`<h2>${cityName}, ${stateAbbr} Areas We Serve</h2>`);

    if (neighborhoods) {
      parts.push(`<p><strong>Neighborhoods:</strong><br>\n${neighborhoods}</p>`);
    }

    if (zipCodes.length > 0) {
      parts.push(`<p><strong>ZIP Codes:</strong><br>\n${zipCodes.join(', ')}</p>`);
    }

    // Section 3: Preserved exterior remodeling section
    if (exteriorSection) {
      parts.push(exteriorSection);
    }

    return parts.join('\n\n');
  }

  // ── Update Strapi ─────────────────────────────────────────────────

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

  // ── Main run ──────────────────────────────────────────────────────

  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('🚀 Regenerate locationContactDetails\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log(`AI: ${this.skipAi ? 'DISABLED (--skip-ai)' : 'ENABLED'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Filter: slug = ${slug}`);
    console.log('');

    // Step 1: Load CSV
    this.loadZipCodesFromCSV();

    // Step 2: Fetch all pages
    let pages = await this.fetchAllPages();

    // Filter by slug
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`\n📌 Filtered to ${pages.length} page(s) matching slug: ${slug}`);
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
    let noOfficeCount = 0;
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
        noOfficeCount++;
        continue;
      }

      const zipCodes = this.getZipCodesForCity(cityName);
      console.log(`   ZIP Codes: ${zipCodes.length > 0 ? zipCodes.join(', ') : 'None in CSV'}`);

      // Extract exterior remodeling section from existing HTML
      const exteriorSection = this.extractExteriorRemodelingSection(page.locationContactDetails);
      if (exteriorSection) {
        console.log(`   📋 Preserving Exterior Remodeling section`);
      }

      // Generate neighborhoods via AI (unless --skip-ai)
      let neighborhoods = '';
      if (!this.skipAi) {
        console.log(`   🤖 Generating neighborhoods...`);
        neighborhoods = await this.generateNeighborhoods(cityName, stateAbbr, zipCodes);
        if (neighborhoods) {
          console.log(`   ✅ Neighborhoods: ${neighborhoods.substring(0, 80)}...`);
        }
        // Rate limit after AI call
        await new Promise((r) => setTimeout(r, 1500));
      }

      // Build the new HTML
      const newHtml = this.buildLocationContactDetailsHTML(
        cityName,
        stateAbbr,
        office,
        neighborhoods,
        zipCodes,
        exteriorSection
      );

      if (dryRun) {
        console.log(`   📝 Preview (first 200 chars): ${newHtml.substring(0, 200).replace(/\n/g, '\\n')}...`);
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
    console.log(`⚠️  No office config (skipped): ${noOfficeCount} pages`);
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

// ── CLI ───────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/regenerate-location-contact-details.ts [options]

Options:
  --dry-run           Preview changes without updating Strapi
  --limit=N           Process only first N pages
  --slug=<slug>       Update a specific page only
  --skip-ai           Skip AI neighborhood generation (ZIP codes only)
  --help              Show this help message

Examples:
  npx tsx scripts/regenerate-location-contact-details.ts --dry-run --limit=3
  npx tsx scripts/regenerate-location-contact-details.ts --slug=odenton-maryland-roofing-company-near-you
  npx tsx scripts/regenerate-location-contact-details.ts --skip-ai --dry-run
  npx tsx scripts/regenerate-location-contact-details.ts
`);
  process.exit(0);
}

const isDryRun = args.includes('--dry-run');
const skipAi = args.includes('--skip-ai');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

const regenerator = new LocationContactDetailsRegenerator(skipAi);
regenerator.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
