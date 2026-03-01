#!/usr/bin/env tsx
/**
 * Add GAF certification link to GAF Master Elite logo in whyChooseUsRichText
 *
 * Wraps the GAF logo <img> with an <a> tag linking to the GAF certification page.
 * Only affects roofing pages (since GAF is roofing-specific).
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

const GAF_LINK = 'https://www.gaf.com/en-us/roofing-contractors/residential/usa/md/bowie/capitol-improvements-llc-1005901';

// Match the GAF logo image that is NOT already wrapped in an <a> tag
const GAF_LOGO_PATTERN = /(<img\s[^>]*GafMasterElite[^>]*>)/gi;

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  serviceType?: string;
  whyChooseUsRichText?: string;
}

class GAFLinkAdder {
  private strapiClient: AxiosInstance;

  constructor() {
    if (!STRAPI_API_TOKEN) throw new Error('STRAPI_API_TOKEN required');
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
    console.log('\nFetching all published pages...');
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
          'fields[1]': 'serviceType',
          'fields[2]': 'whyChooseUsRichText',
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

  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { whyChooseUsRichText: html },
      });
      return true;
    } catch (error: any) {
      console.error(`   Failed to update ${page.slug}`);
      return false;
    }
  }

  async run(options: { dryRun?: boolean; limit?: number; slug?: string } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('Add GAF Certification Link to Logo\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log(`Link: ${GAF_LINK}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit}`);
    console.log('');

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
    }

    // Only pages that have the GAF logo in whyChooseUs and it's NOT already linked
    pages = pages.filter((p) => {
      if (!p.whyChooseUsRichText) return false;
      if (!GAF_LOGO_PATTERN.test(p.whyChooseUsRichText)) return false;
      GAF_LOGO_PATTERN.lastIndex = 0;
      // Skip if already linked
      if (p.whyChooseUsRichText.includes(`href="${GAF_LINK}"`)) return false;
      return true;
    });

    if (limit && limit > 0) pages = pages.slice(0, limit);

    if (pages.length === 0) {
      console.log('\nNo pages need GAF link update.');
      return;
    }

    console.log(`\nProcessing ${pages.length} pages...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      // Wrap the GAF logo img with an anchor tag
      const updatedHTML = page.whyChooseUsRichText!.replace(
        GAF_LOGO_PATTERN,
        `<a href="${GAF_LINK}" target="_blank" rel="noopener noreferrer">$1</a>`
      );

      if (updatedHTML === page.whyChooseUsRichText) {
        console.log(`   No change needed`);
        continue;
      }

      if (dryRun) {
        console.log(`   Would wrap GAF logo with link`);
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
    console.log(`${dryRun ? 'Would update' : 'Updated'}: ${successCount}`);
    console.log(`Failed: ${errorCount}`);
    console.log(`Total: ${pages.length}`);
    console.log('='.repeat(60));
  }
}

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/add-gaf-link.ts [options]

Options:
  --dry-run      Preview changes
  --limit=N      Process only N pages
  --slug=<slug>  Update a specific page
  --help         Show help
`);
  process.exit(0);
}

const adder = new GAFLinkAdder();
adder.run({ dryRun: isDryRun, limit, slug }).catch(console.error);
