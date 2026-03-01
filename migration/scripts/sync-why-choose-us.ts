#!/usr/bin/env tsx
/**
 * Sync Why Choose Us Rich Text for All Service Pages
 *
 * Uses templates from Pasadena pages (by service type) and replaces
 * "Pasadena" with each page's city name.
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const TEMPLATES_PATH = join(__dirname, '../data/why-choose-us-templates.json');

// No exclusions - all pages get content (templates already saved separately)
const EXCLUDED_SLUGS: string[] = [];

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
}

class WhyChooseUsSyncer {
  private strapiClient: AxiosInstance;
  private templates: Record<string, string> = {};

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

    // Load templates
    if (!existsSync(TEMPLATES_PATH)) {
      throw new Error(`Templates file not found: ${TEMPLATES_PATH}\nRun fetch-why-choose-templates.ts first.`);
    }
    this.templates = JSON.parse(readFileSync(TEMPLATES_PATH, 'utf-8'));
    console.log(`📂 Loaded ${Object.keys(this.templates).length} templates`);
  }

  /**
   * Extract city name from page title
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
      .replace(/-virginia-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-va-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio).*$/, '');

    const city = cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return city || 'Maryland';
  }

  /**
   * Determine service type from slug
   */
  private getServiceType(slug: string): string | null {
    if (slug.includes('roofing')) return 'roofing';
    if (slug.includes('siding')) return 'siding';
    if (slug.includes('deck')) return 'deck';
    if (slug.includes('window')) return 'window';
    if (slug.includes('door')) return 'door';
    if (slug.includes('gutter')) return 'gutter';
    return null;
  }

  /**
   * Generate Why Choose Us HTML by replacing Pasadena with city name
   */
  generateWhyChooseUsHTML(template: string, city: string): string {
    // Replace "Pasadena" with the city name (case-sensitive)
    return template.replace(/Pasadena/g, city);
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
   * Update a page
   */
  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          whyChooseUsRichText: htmlContent,
        },
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
    service?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, service } = options;

    console.log('🏆 Why Choose Us Sync Tool\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (service) console.log(`Service filter: ${service}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    // Fetch pages
    let pages = await this.fetchAllPages();

    // Filter out template pages (Pasadena)
    pages = pages.filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
    console.log(`📌 Excluded ${EXCLUDED_SLUGS.length} Pasadena template pages`);

    // Filter by service type if provided
    if (service) {
      pages = pages.filter((p) => this.getServiceType(p.slug) === service);
      console.log(`📌 Filtered to ${pages.length} ${service} pages`);
    } else {
      // Only process pages that have a matching template
      pages = pages.filter((p) => {
        const serviceType = this.getServiceType(p.slug);
        return serviceType && this.templates[serviceType];
      });
      console.log(`📌 Found ${pages.length} pages with matching templates`);
    }

    // Apply limit
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
      const city = this.extractCityFromPage(page);
      const serviceType = this.getServiceType(page.slug);

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}, Service: ${serviceType}`);

      if (!serviceType || !this.templates[serviceType]) {
        console.log(`   ⏭️ Skipped (no template for service type)`);
        skippedCount++;
        continue;
      }

      if (dryRun) {
        console.log(`   ✅ Would update: "Why ${city} Homeowners Choose Us" (${serviceType} template)`);
        successCount++;
        continue;
      }

      try {
        const htmlContent = this.generateWhyChooseUsHTML(this.templates[serviceType], city);
        const success = await this.updatePage(page, htmlContent);

        if (success) {
          console.log(`   ✅ Updated successfully`);
          successCount++;
        } else {
          errorCount++;
        }

        // Small delay
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
    console.log(`⏭️ Skipped: ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log('='.repeat(60));

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Update completed! Verify at: ${STRAPI_URL}/admin`);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const serviceArg = args.find((arg) => arg.startsWith('--service='));
const service = serviceArg ? serviceArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/sync-why-choose-us.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --service=<type>   Only update specific service type (roofing, siding, deck, window, door, gutter)
  --help             Show this help message

Examples:
  npx tsx scripts/sync-why-choose-us.ts --dry-run
  npx tsx scripts/sync-why-choose-us.ts --service=roofing --dry-run
  npx tsx scripts/sync-why-choose-us.ts --service=siding
  npx tsx scripts/sync-why-choose-us.ts --limit=10
`);
  process.exit(0);
}

const syncer = new WhyChooseUsSyncer();
syncer.run({ dryRun: isDryRun, limit, service }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
