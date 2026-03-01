#!/usr/bin/env tsx
/**
 * Update "Areas We Serve" Rich Text for All Service Pages
 *
 * This script:
 * 1. Reads ZIP codes from the jobs CSV file for each city
 * 2. Fetches all published local pages from Strapi
 * 3. Uses AI to generate city-specific "Areas We Serve" content
 * 4. Updates the areasWeServeRichText field with generated content
 *
 * The AI is given strict guardrails to prevent hallucination:
 * - Only uses ZIP codes from the actual CSV data
 * - Follows exact HTML template structure
 * - Does not invent specific neighborhood names unless verified
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

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Production Strapi configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// CSV file path
const JOBS_CSV_PATH = join(__dirname, '../../jobs_processed copy.csv');

// Pages to exclude from updates
const EXCLUDED_SLUGS = [
  'pasadena-maryland-roofing-company-near-you',
];

// Service type mappings from slug keywords
const SERVICE_MAPPINGS: Record<string, { name: string; description: string }> = {
  'roofing': { name: 'Roofing', description: 'roof replacement and roofing services' },
  'flat-roofing': { name: 'Flat Roofing', description: 'flat roof replacement and commercial roofing services' },
  'commercial-roofing': { name: 'Commercial Roofing', description: 'commercial roof replacement and roofing services' },
  'siding': { name: 'Siding', description: 'siding installation and replacement services' },
  'window': { name: 'Window Replacement', description: 'window replacement and installation services' },
  'door': { name: 'Door Replacement', description: 'door replacement and installation services' },
  'gutter': { name: 'Gutters', description: 'gutter installation and gutter guard services' },
  'deck': { name: 'Deck Building', description: 'deck building and outdoor living services' },
  'trim': { name: 'Exterior Trim', description: 'exterior trim, soffit, and fascia services' },
  'patio': { name: 'Patio & Hardscaping', description: 'patio and hardscaping services' },
};

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  areasWeServeRichText?: string;
  [key: string]: unknown;
}

interface CityZipData {
  city: string;
  state: string;
  zipCodes: string[];
}

class AreasWeServeUpdater {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private cityZipMap: Map<string, CityZipData> = new Map();

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
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

    this.anthropic = new Anthropic({ apiKey: anthropicKey });
  }

  /**
   * Load and parse the jobs CSV to extract ZIP codes per city
   */
  loadZipCodesFromCSV(): void {
    console.log('📂 Loading ZIP codes from CSV...');

    const csvContent = readFileSync(JOBS_CSV_PATH, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Aggregate ZIP codes by city
    for (const record of records) {
      const city = record.city?.trim();
      const state = record.state?.trim() || 'Maryland';
      const zipCode = record.zipCode?.trim();

      if (!city || !zipCode) continue;

      const cityKey = this.normalizeCityKey(city);

      if (!this.cityZipMap.has(cityKey)) {
        this.cityZipMap.set(cityKey, {
          city: city,
          state: state,
          zipCodes: [],
        });
      }

      const cityData = this.cityZipMap.get(cityKey)!;
      if (!cityData.zipCodes.includes(zipCode)) {
        cityData.zipCodes.push(zipCode);
      }
    }

    // Sort ZIP codes for each city
    for (const [, data] of this.cityZipMap) {
      data.zipCodes.sort();
    }

    console.log(`✅ Loaded ZIP codes for ${this.cityZipMap.size} cities`);
  }

  /**
   * Normalize city name for matching
   */
  private normalizeCityKey(city: string): string {
    return city.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  }

  /**
   * Get ZIP codes for a city
   */
  getZipCodesForCity(cityName: string): string[] {
    const cityKey = this.normalizeCityKey(cityName);
    const cityData = this.cityZipMap.get(cityKey);
    return cityData?.zipCodes || [];
  }

  /**
   * Extract city name from page title or slug
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
      .replace(/-md-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio).*$/, '');

    let cityName = cleanSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (cityName === 'Washington Dc' || cityName === 'Dc') {
      cityName = 'Washington DC';
    }

    return cityName || 'Maryland';
  }

  /**
   * Extract service type from slug
   */
  private extractServiceFromSlug(slug: string): { name: string; description: string } {
    // Check longer keywords first
    const keywords = Object.keys(SERVICE_MAPPINGS).sort((a, b) => b.length - a.length);
    for (const keyword of keywords) {
      if (slug.includes(keyword)) {
        return SERVICE_MAPPINGS[keyword];
      }
    }
    return { name: 'Home Improvement', description: 'home improvement services' };
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

      const pages = response.data.data;
      allPages.push(...pages);

      console.log(
        `   Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length}/${response.data.meta.pagination.total} pages)`
      );

      if (page >= response.data.meta.pagination.pageCount) {
        break;
      }
      page++;
    }

    console.log(`✅ Found ${allPages.length} published pages`);
    return allPages;
  }

  /**
   * Generate Areas We Serve HTML using Claude AI with strict guardrails
   */
  async generateAreasWeServeHTML(
    cityName: string,
    stateName: string,
    serviceName: string,
    serviceDescription: string,
    zipCodes: string[]
  ): Promise<string> {
    const zipCodesText = zipCodes.length > 0
      ? zipCodes.join(', ')
      : 'the surrounding area';

    const prompt = `You are generating HTML content for a home improvement company's "Areas We Serve" section.

CRITICAL INSTRUCTIONS - READ CAREFULLY:
1. You MUST follow the exact HTML template structure provided below
2. You MUST NOT invent or hallucinate specific neighborhood names unless you are 100% certain they exist in ${cityName}, ${stateName}
3. If you are uncertain about specific neighborhoods, use GENERAL area descriptions instead (e.g., "northern neighborhoods", "waterfront communities", "established residential areas")
4. The ZIP codes provided are REAL and VERIFIED - use them exactly as given
5. Keep the content factual and avoid making specific claims you cannot verify

VERIFIED DATA:
- City: ${cityName}
- State: ${stateName}
- Service: ${serviceName}
- Service Description: ${serviceDescription}
- Verified ZIP Codes: ${zipCodesText}

HTML TEMPLATE TO FOLLOW (adapt the content but keep the exact HTML structure):

<h2 data-start="239" data-end="285">
    ${cityName}, ${stateName === 'Maryland' ? 'MD' : stateName === 'District of Columbia' ? 'DC' : stateName} Neighborhoods & Areas We Serve
</h2>
<p data-start="287" data-end="404">
    Capitol Improvements provides ${serviceDescription} throughout ${cityName}, ${stateName === 'Maryland' ? 'MD' : stateName === 'District of Columbia' ? 'DC' : stateName} and the surrounding area.
</p>
<p data-start="406" data-end="610">
    <strong data-start="406" data-end="444">[First Category of Neighborhoods]</strong><br>
    [List of neighborhoods or general area descriptions - DO NOT INVENT if uncertain]
</p>
<p data-start="612" data-end="776">
    <strong data-start="612" data-end="645">[Second Category of Neighborhoods]</strong><br>
    [List of neighborhoods or general area descriptions - DO NOT INVENT if uncertain]
</p>
<p data-start="778" data-end="868">
    <strong data-start="778" data-end="800">ZIP Codes We Serve</strong><br>
    We serve all ${cityName} homes in ZIP code${zipCodes.length > 1 ? 's' : ''} <strong>${zipCodes.length > 0 ? zipCodes.map(z => `<strong data-start="844" data-end="853">${z}</strong>`).join(', ').replace(/, ([^,]*)$/, ' and $1') : 'the local area'}</strong>.
</p>

GUIDELINES FOR NEIGHBORHOOD CATEGORIES:
- For coastal/waterfront cities: Use "Waterfront & Coastal Communities" and "Inland Neighborhoods"
- For suburban cities: Use "Established Residential Areas" and "Newer Developments" or geographic divisions like "Northern ${cityName}" and "Southern ${cityName}"
- For urban areas: Use "Historic Districts" and "Residential Neighborhoods"
- If you don't know specific neighborhoods, use general descriptions like:
  - "Established single-family home communities"
  - "Newer townhome and condo developments"
  - "Tree-lined residential streets"
  - "Family-friendly subdivisions"

WHAT TO AVOID:
- Do NOT make up neighborhood names
- Do NOT include specific street names unless you're certain
- Do NOT include statistics or numbers you're not sure about
- Do NOT add extra HTML elements or change the structure

Return ONLY the HTML content - no explanations, no markdown code blocks, just raw HTML.`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      let htmlContent = content.text.trim();
      // Remove any markdown code block markers if present
      htmlContent = htmlContent.replace(/^```html\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

      return htmlContent;
    } catch (error) {
      console.error(`   ❌ Error generating content for ${cityName}:`, error);
      throw error;
    }
  }

  /**
   * Update a page with the Areas We Serve content
   */
  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          areasWeServeRichText: htmlContent,
        },
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

  /**
   * Main execution flow
   */
  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
    serviceFilter?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, serviceFilter } = options;

    console.log('🚀 Starting Areas We Serve Update\n');
    console.log(`Production Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Filter: slug = ${slug}`);
    if (serviceFilter) console.log(`Service Filter: ${serviceFilter}`);
    console.log('');

    try {
      // Load ZIP codes from CSV
      this.loadZipCodesFromCSV();

      // Fetch all pages
      let pages = await this.fetchAllPages();

      // Filter out excluded pages
      const beforeExclusion = pages.length;
      pages = pages.filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
      if (beforeExclusion !== pages.length) {
        console.log(`\n📌 Excluded ${beforeExclusion - pages.length} page(s): ${EXCLUDED_SLUGS.join(', ')}`);
      }

      // Filter by specific slug if provided
      if (slug) {
        pages = pages.filter((p) => p.slug === slug);
        console.log(`📌 Filtered to ${pages.length} page(s) matching slug: ${slug}`);
      }

      // Filter by service type if provided
      if (serviceFilter) {
        pages = pages.filter((p) => p.slug.includes(serviceFilter));
        console.log(`📌 Filtered to ${pages.length} page(s) containing: ${serviceFilter}`);
      }

      // Apply limit if specified
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
      let skippedCount = 0;
      const errors: Array<{ page: string; error: string }> = [];

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const cityName = this.extractCityFromPage(page);
        const service = this.extractServiceFromSlug(page.slug);
        const zipCodes = this.getZipCodesForCity(cityName);

        // Determine state from city data or default to Maryland
        const cityData = this.cityZipMap.get(this.normalizeCityKey(cityName));
        let stateName = cityData?.state || 'Maryland';
        if (cityName === 'Washington DC' || cityName.includes('DC')) {
          stateName = 'District of Columbia';
        }

        console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
        console.log(`   City: ${cityName}, State: ${stateName}`);
        console.log(`   Service: ${service.name}`);
        console.log(`   ZIP Codes: ${zipCodes.length > 0 ? zipCodes.join(', ') : 'None found in CSV'}`);

        if (dryRun) {
          console.log(`   ✅ Would generate and update`);
          successCount++;
          continue;
        }

        try {
          // Generate content with AI
          console.log(`   🤖 Generating content...`);
          const htmlContent = await this.generateAreasWeServeHTML(
            cityName,
            stateName,
            service.name,
            service.description,
            zipCodes
          );

          // Update in Strapi
          const success = await this.updatePage(page, htmlContent);

          if (success) {
            console.log(`   ✅ Updated successfully`);
            successCount++;
          } else {
            errorCount++;
            errors.push({ page: page.slug, error: 'Update failed' });
          }

          // Rate limiting - wait between AI calls
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error: any) {
          console.error(`   ❌ Error: ${error.message}`);
          errorCount++;
          errors.push({ page: page.slug, error: error.message });
        }
      }

      // Summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 SUMMARY');
      console.log('='.repeat(60));
      console.log(`✅ Successfully ${dryRun ? 'would update' : 'updated'}: ${successCount} pages`);
      console.log(`❌ Failed: ${errorCount} pages`);
      console.log(`⏭️  Skipped: ${skippedCount} pages`);
      console.log(`📄 Total processed: ${pages.length} pages`);
      console.log('='.repeat(60));

      if (errors.length > 0 && errors.length <= 10) {
        console.log('\n❌ ERRORS:');
        errors.forEach((e) => {
          console.log(`  - ${e.page}: ${e.error}`);
        });
      }

      if (!dryRun && successCount > 0) {
        console.log(`\n🎉 Update completed! Verify at: ${STRAPI_URL}/admin`);
      }
    } catch (error) {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;
const serviceArg = args.find((arg) => arg.startsWith('--service='));
const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;

// Show help
if (args.includes('--help')) {
  console.log(`
Usage: npm run update-areas-we-serve [options]

Options:
  --dry-run           Preview changes without updating Strapi
  --limit=N           Process only first N pages
  --slug=<slug>       Update a specific page only
  --service=<keyword> Filter by service type (roofing, siding, window, etc.)
  --help              Show this help message

Examples:
  npm run update-areas-we-serve -- --dry-run
  npm run update-areas-we-serve -- --service=roofing --limit=5
  npm run update-areas-we-serve -- --slug=pasadena-maryland-roofing-company-near-you
`);
  process.exit(0);
}

// Run the script
const updater = new AreasWeServeUpdater();
updater.run({ dryRun: isDryRun, limit, slug, serviceFilter }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
