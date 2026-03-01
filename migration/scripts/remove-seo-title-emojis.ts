#!/usr/bin/env tsx
/**
 * Remove Emojis from seoTitleTag
 *
 * Strips all emoji characters from the seoTitleTag field across all local pages.
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

// Regex to match emoji characters
const EMOJI_REGEX = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{200D}\u{20E3}\u{E0020}-\u{E007F}\u{FE0F}]+/gu;

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  seoTitleTag?: string;
}

class SeoTitleEmojiRemover {
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
          'fields[1]': 'seoTitleTag',
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

  async updatePage(page: LocalPage, newTitle: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { seoTitleTag: newTitle },
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

    console.log('Remove Emojis from seoTitleTag\n');
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

    // Only pages that have emojis in seoTitleTag
    pages = pages.filter((p) => {
      if (!p.seoTitleTag) return false;
      return EMOJI_REGEX.test(p.seoTitleTag);
    });

    // Reset regex lastIndex after filtering
    EMOJI_REGEX.lastIndex = 0;

    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\nNo pages with emojis in seoTitleTag found.');
      return;
    }

    console.log(`\nFound ${pages.length} pages with emojis in seoTitleTag\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const oldTitle = page.seoTitleTag!;
      const newTitle = oldTitle.replace(EMOJI_REGEX, '').replace(/\s{2,}/g, ' ').trim();

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   Old: ${oldTitle}`);
      console.log(`   New: ${newTitle}`);

      if (dryRun) {
        successCount++;
        continue;
      }

      const success = await this.updatePage(page, newTitle);
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
Usage: npx tsx scripts/remove-seo-title-emojis.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --slug=<slug>      Only update a specific page by slug
  --help             Show this help message
`);
  process.exit(0);
}

const remover = new SeoTitleEmojiRemover();
remover.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
