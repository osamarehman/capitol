#!/usr/bin/env tsx
/**
 * Remove "Learn more." links from FAQ answer texts
 *
 * Strips <a href="...">Learn more.</a> from inside faqs-answer paragraphs.
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

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  faqsRichText?: string;
}

class FAQLearnMoreRemover {
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
          'status': 'published',
          'fields[0]': 'slug',
          'fields[1]': 'faqsRichText',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      allPages.push(...response.data.data);
      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`Found ${allPages.length} published pages`);
    return allPages;
  }

  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { faqsRichText: htmlContent },
      });
      return true;
    } catch (error: any) {
      console.error(`   Failed to update ${page.slug}`);
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
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('Remove "Learn more." links from FAQ answers\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`Filtered to slug: ${slug} (${pages.length} match)`);
    }

    // Only pages that have the learn more link pattern
    pages = pages.filter((p) => {
      if (!p.faqsRichText) return false;
      return /<a\s[^>]*>Learn more\.<\/a>/i.test(p.faqsRichText);
    });

    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\nNo pages with "Learn more." links found.');
      return;
    }

    console.log(`\nFound ${pages.length} pages with "Learn more." links\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      // Remove the learn more link and any preceding whitespace
      const updatedHTML = page.faqsRichText!.replace(
        /\s*<a\s[^>]*>Learn more\.<\/a>/gi,
        ''
      );

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      if (dryRun) {
        successCount++;
        continue;
      }

      const success = await this.updatePage(page, updatedHTML);
      if (success) {
        console.log(`   Updated`);
        successCount++;
      } else {
        errorCount++;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`${dryRun ? 'Would update' : 'Updated'}: ${successCount} pages`);
    console.log(`Failed: ${errorCount} pages`);
    console.log(`Total processed: ${pages.length} pages`);
    console.log('='.repeat(60));
  }
}

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/remove-faq-learn-more.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --slug=<slug>      Only update a specific page by slug
  --help             Show this help message
`);
  process.exit(0);
}

const remover = new FAQLearnMoreRemover();
remover.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
