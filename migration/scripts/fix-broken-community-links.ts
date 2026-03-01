#!/usr/bin/env tsx
/**
 * Fix Broken Community Links
 *
 * This script fixes specific broken URLs in communityGuidelinesRichText:
 * 1. Updates tantallon.info to new domain (tantalloncitizensassociation.com)
 * 2. Removes stoneybeach.org and lakeshoremd.org (domains don't exist)
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// URL fixes to apply
const URL_UPDATES: Record<string, string> = {
  'https://www.tantallon.info': 'https://www.tantalloncitizensassociation.com/',
};

// URLs to remove (convert to text-only)
const URLS_TO_REMOVE = [
  'https://www.stoneybeach.org',
  'https://www.lakeshoremd.org',
];

interface ServicePage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  communityGuidelinesRichText?: string;
}

class BrokenLinkFixer {
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

  /**
   * Fetch all published services pages
   */
  async fetchAllPages(): Promise<ServicePage[]> {
    console.log('\n📋 Fetching all published services from Strapi...');

    const allPages: ServicePage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get<{
        data: ServicePage[];
        meta: { pagination: { total: number; pageCount: number } };
      }>('/services', {
        params: {
          'status': 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'fields[0]': 'slug',
          'fields[1]': 'title',
          'fields[2]': 'communityGuidelinesRichText',
        },
      });

      allPages.push(...response.data.data);

      console.log(
        `   Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length}/${response.data.meta.pagination.total} pages)`
      );

      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`✅ Found ${allPages.length} published services`);
    return allPages;
  }

  /**
   * Convert a link to text-only format (just the community name)
   */
  private convertLinkToTextOnly(html: string, url: string): string {
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match the li item with this URL
    const pattern = new RegExp(
      `<li class="hoa-item">\\s*<a[^>]*href="${escapedUrl}"[^>]*>\\s*<span class="hoa-name">([^<]+)</span>\\s*<span class="hoa-url">[^<]*</span>\\s*</a>\\s*</li>`,
      'gs'
    );

    return html.replace(pattern, (match, hoaName) => {
      return `<li class="hoa-item hoa-item--static">
            <span class="hoa-name">${hoaName}</span>
        </li>`;
    });
  }

  /**
   * Update a URL in the HTML
   */
  private updateUrl(html: string, oldUrl: string, newUrl: string): string {
    const escapedOldUrl = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Update href attribute
    const hrefPattern = new RegExp(`href="${escapedOldUrl}"`, 'g');
    let updatedHtml = html.replace(hrefPattern, `href="${newUrl}"`);

    // Also update the display URL in hoa-url span
    const displayOld = oldUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
    const displayNew = newUrl.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');

    // Update display URL
    const displayPattern = new RegExp(
      `<span class="hoa-url">${displayOld.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</span>`,
      'g'
    );
    updatedHtml = updatedHtml.replace(displayPattern, `<span class="hoa-url">${displayNew}</span>`);

    return updatedHtml;
  }

  /**
   * Process a single page
   */
  async processPage(page: ServicePage, dryRun: boolean): Promise<{ updated: boolean; changes: string[] }> {
    if (!page.communityGuidelinesRichText) {
      return { updated: false, changes: [] };
    }

    let html = page.communityGuidelinesRichText;
    const changes: string[] = [];

    // Apply URL updates
    for (const [oldUrl, newUrl] of Object.entries(URL_UPDATES)) {
      if (html.includes(oldUrl)) {
        html = this.updateUrl(html, oldUrl, newUrl);
        changes.push(`Updated: ${oldUrl} → ${newUrl}`);
      }
    }

    // Remove broken URLs
    for (const url of URLS_TO_REMOVE) {
      if (html.includes(url)) {
        html = this.convertLinkToTextOnly(html, url);
        changes.push(`Removed: ${url}`);
      }
    }

    if (changes.length === 0) {
      return { updated: false, changes: [] };
    }

    if (dryRun) {
      return { updated: true, changes };
    }

    // Apply update
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          communityGuidelinesRichText: html,
        },
      });
      return { updated: true, changes };
    } catch (error: any) {
      console.error(`   ❌ Failed to update: ${error.message}`);
      return { updated: false, changes: [] };
    }
  }

  /**
   * Main execution
   */
  async run(dryRun: boolean = true): Promise<void> {
    console.log('🔧 Broken Community Links Fixer\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log('');

    console.log('📝 Fixes to apply:');
    for (const [oldUrl, newUrl] of Object.entries(URL_UPDATES)) {
      console.log(`   UPDATE: ${oldUrl} → ${newUrl}`);
    }
    for (const url of URLS_TO_REMOVE) {
      console.log(`   REMOVE: ${url}`);
    }
    console.log('');

    // Fetch pages
    const pages = await this.fetchAllPages();

    console.log('\n🔄 Processing pages...\n');

    let updatedCount = 0;
    let skippedCount = 0;
    const allChanges: Array<{ slug: string; changes: string[] }> = [];

    for (const page of pages) {
      const { updated, changes } = await this.processPage(page, dryRun);

      if (updated) {
        updatedCount++;
        allChanges.push({ slug: page.slug, changes });
        console.log(`✅ ${page.slug}`);
        changes.forEach(c => console.log(`   ${c}`));
      } else {
        skippedCount++;
      }

      // Small delay for live updates
      if (!dryRun && updated) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Pages ${dryRun ? 'to update' : 'updated'}: ${updatedCount}`);
    console.log(`⏭️ Pages unchanged: ${skippedCount}`);
    console.log(`📄 Total processed: ${pages.length}`);
    console.log('='.repeat(60));

    if (dryRun && updatedCount > 0) {
      console.log('\n💡 Run with --live to apply these changes');
    } else if (!dryRun && updatedCount > 0) {
      console.log(`\n🎉 Successfully updated ${updatedCount} pages!`);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const isLive = args.includes('--live');

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/fix-broken-community-links.ts [options]

Options:
  --live    Apply changes (default is dry run)
  --help    Show this help message

URLs to fix:
  - tantallon.info → tantalloncitizensassociation.com (redirect)
  - stoneybeach.org → remove (domain doesn't exist)
  - lakeshoremd.org → remove (domain doesn't exist)
`);
  process.exit(0);
}

const fixer = new BrokenLinkFixer();
fixer.run(!isLive).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
