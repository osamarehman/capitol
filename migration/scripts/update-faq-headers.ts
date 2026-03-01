#!/usr/bin/env tsx
/**
 * Update FAQ Headers
 *
 * Changes the <h2 class="faqs-title"> from service-specific titles like
 * "Roof Repair and Roof Replacement Services in Annapolis MD"
 * to the new format:
 * "Common Questions Homeowners Ask About Roofing in Annapolis, MD"
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const SERVICE_LABEL: Record<string, string> = {
  roofing: 'Roofing',
  siding: 'Siding',
  deck: 'Deck Building',
  window: 'Window Replacement',
  door: 'Door Replacement',
  gutter: 'Gutters',
};

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  serviceType?: string;
  city?: string;
  state?: string;
  faqsRichText?: string;
}

class FAQHeaderUpdater {
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
          'fields[2]': 'serviceType',
          'fields[3]': 'city',
          'fields[4]': 'state',
          'fields[5]': 'faqsRichText',
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

  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { faqsRichText: htmlContent },
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

  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
    service?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, service } = options;

    console.log('📝 FAQ Header Updater\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (service) console.log(`Service filter: ${service}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    let pages = await this.fetchAllPages();

    // Filter by slug
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to slug: ${slug} (${pages.length} match)`);
    }

    // Filter by service type
    if (service) {
      pages = pages.filter((p) => p.serviceType === service);
      console.log(`📌 Filtered to ${pages.length} ${service} pages`);
    }

    // Only process pages that have faqsRichText with a faqs-title h2
    pages = pages.filter((p) => {
      if (!p.faqsRichText) return false;
      if (!p.faqsRichText.includes('faqs-title')) return false;
      if (!p.serviceType || !SERVICE_LABEL[p.serviceType]) {
        console.log(`   ⏭️ Skipping ${p.slug} (no serviceType)`);
        return false;
      }
      if (!p.city) {
        console.log(`   ⏭️ Skipping ${p.slug} (no city)`);
        return false;
      }
      return true;
    });

    // Apply limit
    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\n⚠️ No pages found to update.');
      return;
    }

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const city = page.city!;
      const state = page.state || 'MD';
      const serviceType = page.serviceType!;
      const serviceLabel = SERVICE_LABEL[serviceType];

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      const newTitle = `Common Questions Homeowners Ask About ${serviceLabel} in ${city}, ${state}`;

      // Replace the h2 faqs-title content
      const updatedHTML = page.faqsRichText!.replace(
        /<h2 class="faqs-title">[^<]*<\/h2>/,
        `<h2 class="faqs-title">${newTitle}</h2>`
      );

      if (updatedHTML === page.faqsRichText) {
        console.log(`   ⏭️ No change (header not found or already correct)`);
        skippedCount++;
        continue;
      }

      // Extract old title for logging
      const oldMatch = page.faqsRichText!.match(/<h2 class="faqs-title">([^<]*)<\/h2>/);
      const oldTitle = oldMatch ? oldMatch[1] : '(unknown)';

      console.log(`   Old: ${oldTitle}`);
      console.log(`   New: ${newTitle}`);

      if (dryRun) {
        successCount++;
        continue;
      }

      const success = await this.updatePage(page, updatedHTML);
      if (success) {
        console.log(`   ✅ Updated`);
        successCount++;
      } else {
        errorCount++;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ ${dryRun ? 'Would update' : 'Updated'}: ${successCount} pages`);
    console.log(`⏭️ Skipped: ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log('='.repeat(60));
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const serviceArg = args.find((arg) => arg.startsWith('--service='));
const service = serviceArg ? serviceArg.split('=')[1] : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/update-faq-headers.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --service=<type>   Only update specific service type (roofing, siding, deck, window, door, gutter)
  --slug=<slug>      Only update a specific page by slug
  --help             Show this help message

Examples:
  npx tsx scripts/update-faq-headers.ts --dry-run --limit=5
  npx tsx scripts/update-faq-headers.ts --slug=annapolis-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/update-faq-headers.ts --service=roofing --dry-run
  npx tsx scripts/update-faq-headers.ts
`);
  process.exit(0);
}

const updater = new FAQHeaderUpdater();
updater.run({ dryRun: isDryRun, limit, service, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
