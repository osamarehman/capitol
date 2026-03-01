#!/usr/bin/env tsx
/**
 * Populate Page Metadata (serviceType, city, state)
 *
 * This script:
 * 1. Fetches all published local pages
 * 2. Classifies each page's serviceType from slug (with Claude fallback)
 * 3. Extracts city from title and state from slug
 * 4. Outputs JSON map for review (--dry-run) or pushes to Strapi
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const OUTPUT_PATH = join(__dirname, '../data/page-metadata-map.json');

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  mainStoryRichText?: string;
}

interface PageMetadata {
  documentId: string;
  slug: string;
  title: string;
  serviceType: string;
  city: string;
  state: string;
  classifiedBy: 'slug' | 'ai';
}

class PageMetadataPopulator {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
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
  }

  /**
   * Determine service type from slug
   */
  private getServiceTypeFromSlug(slug: string): string | null {
    if (slug.includes('roofing')) return 'roofing';
    if (slug.includes('siding')) return 'siding';
    if (slug.includes('deck')) return 'deck';
    if (slug.includes('window')) return 'window';
    if (slug.includes('door')) return 'door';
    if (slug.includes('gutter')) return 'gutter';
    return null;
  }

  /**
   * Extract city name from page title or slug
   */
  private extractCity(page: LocalPage): string {
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

    // Fallback: parse from slug
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

    return cityName || 'Unknown';
  }

  /**
   * Extract state from slug
   */
  private extractState(slug: string): 'MD' | 'VA' | 'DC' {
    if (slug.includes('-virginia-') || slug.includes('-va-') || slug.startsWith('virginia-')) {
      return 'VA';
    }
    if (slug.includes('-dc-') || slug.startsWith('washington-dc')) {
      return 'DC';
    }
    return 'MD';
  }

  /**
   * Strip HTML tags
   */
  private stripHTML(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Use Claude to classify service type when slug matching fails
   */
  private async classifyWithAI(page: LocalPage): Promise<string> {
    this.aiCallCount++;
    console.log(`   🤖 AI call #${this.aiCallCount}: Classifying ${page.slug}...`);

    const contentSnippet = page.mainStoryRichText
      ? this.stripHTML(page.mainStoryRichText).slice(0, 500)
      : '';

    const prompt = `Classify this home improvement service page into exactly one category.

Slug: ${page.slug}
Title: ${page.title || 'N/A'}
Content preview: ${contentSnippet || 'N/A'}

Categories: roofing, siding, deck, window, door, gutter

Return ONLY the single category word, nothing else.`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 10,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = (response.content[0] as { type: string; text: string }).text.trim().toLowerCase();

      const validTypes = ['roofing', 'siding', 'deck', 'window', 'door', 'gutter'];
      if (validTypes.includes(text)) {
        return text;
      }

      console.log(`   ⚠️ AI returned unexpected value: "${text}", defaulting to "roofing"`);
      return 'roofing';
    } catch (error: any) {
      console.error(`   ⚠️ AI error: ${error.message}, defaulting to "roofing"`);
      return 'roofing';
    }
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
          'fields[0]': 'title',
          'fields[1]': 'slug',
          'fields[2]': 'mainStoryRichText',
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
   * Update a page with metadata
   */
  async updatePage(documentId: string, data: { serviceType: string; city: string; state: string }): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${documentId}`, { data });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${documentId}`);
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

    console.log('📊 Page Metadata Populator (serviceType + city + state)\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

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
      console.log('\n⚠️ No pages found');
      return;
    }

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    const results: PageMetadata[] = [];
    let successCount = 0;
    let aiClassifiedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      // Extract metadata
      const city = this.extractCity(page);
      const state = this.extractState(page.slug);
      let serviceType = this.getServiceTypeFromSlug(page.slug);
      let classifiedBy: 'slug' | 'ai' = 'slug';

      if (!serviceType) {
        serviceType = await this.classifyWithAI(page);
        classifiedBy = 'ai';
        aiClassifiedCount++;
      }

      console.log(`   Service: ${serviceType} (${classifiedBy}), City: ${city}, State: ${state}`);

      const metadata: PageMetadata = {
        documentId: page.documentId,
        slug: page.slug,
        title: page.title || '',
        serviceType,
        city,
        state,
        classifiedBy,
      };

      results.push(metadata);

      if (!dryRun) {
        const success = await this.updatePage(page.documentId, {
          serviceType,
          city,
          state,
        });

        if (success) {
          console.log(`   ✅ Updated`);
          successCount++;
        } else {
          errorCount++;
        }

        // Rate limiting
        await new Promise((resolve) => setTimeout(resolve, 100));
      } else {
        successCount++;
      }
    }

    // Save results JSON
    writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
    console.log(`\n📄 Saved metadata map to: ${OUTPUT_PATH}`);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully ${dryRun ? 'classified' : 'updated'}: ${successCount} pages`);
    console.log(`🤖 AI-classified serviceType: ${aiClassifiedCount} pages`);
    console.log(`📋 Slug-matched serviceType: ${successCount - aiClassifiedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log('='.repeat(60));

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Metadata populated! Verify at: ${STRAPI_URL}/admin`);
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
Usage: npx tsx scripts/populate-page-metadata.ts [options]

Options:
  --dry-run       Classify and save JSON but don't push to Strapi
  --limit=N       Process only first N pages
  --slug=<slug>   Process a specific page only
  --help          Show this help message

Examples:
  npx tsx scripts/populate-page-metadata.ts --dry-run
  npx tsx scripts/populate-page-metadata.ts --slug=pasadena-maryland-roofing-company-near-you
  npx tsx scripts/populate-page-metadata.ts --limit=5
`);
  process.exit(0);
}

const populator = new PageMetadataPopulator();
populator.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
