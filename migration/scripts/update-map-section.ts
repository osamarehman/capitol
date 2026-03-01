#!/usr/bin/env tsx
/**
 * update-map-section.ts
 *
 * Fetches all published local pages from Strapi production,
 * backs up the current mapSection content, transforms it into
 * the new pins__section template format, and pushes updates.
 *
 * Usage:
 *   tsx scripts/update-map-section.ts --dry-run          # Preview changes
 *   tsx scripts/update-map-section.ts --limit=5           # Process first 5 pages
 *   tsx scripts/update-map-section.ts --slug=<slug>       # Process single page
 *   tsx scripts/update-map-section.ts                     # Run for real
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title: string;
  mapSection: string | null;
  city: string | null;
}

class MapSectionUpdater {
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
          status: 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'fields[0]': 'slug',
          'fields[1]': 'title',
          'fields[2]': 'mapSection',
          'fields[3]': 'city',
        },
      });

      const pages = response.data.data;
      allPages.push(...pages);

      console.log(
        `  Fetched page ${page}/${response.data.meta.pagination.pageCount} ` +
          `(${allPages.length}/${response.data.meta.pagination.total})`
      );

      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`Found ${allPages.length} published pages`);
    return allPages;
  }

  /**
   * Strip HTML tags from a string, keeping only text content.
   */
  stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }

  /**
   * Extract heading content, paragraph content, and iframe element from existing mapSection.
   * Handles both h2 and h3 tags, and strips inner HTML tags (strong, etc.) for clean output.
   */
  parseExistingMapSection(html: string): {
    h2Content: string;
    pContent: string;
    iframeTag: string;
  } | null {
    // Extract iframe tag first - required for all cases
    const iframeMatch = html.match(/<iframe[\s\S]*?<\/iframe>/i)
      || html.match(/<iframe[\s\S]*?\/>/i);
    if (!iframeMatch) return null;

    // Extract heading: try h2 first, then h3
    const h2Match = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const h3Match = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    const headingMatch = h2Match || h3Match;

    // Extract all meaningful paragraphs (skip empty/whitespace-only like <p>‍</p>)
    const allParagraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)];
    const meaningfulParagraphs = allParagraphs.filter((m) => {
      const text = this.stripTags(m[1]).replace(/[\u200B\u200D\uFEFF\u00AD]/g, '').trim();
      return text.length > 10;
    });

    let h2Content: string;
    let pContent: string;

    if (headingMatch) {
      // Standard case: heading in h2/h3, description in first meaningful paragraph
      h2Content = this.stripTags(headingMatch[1]);
      pContent = meaningfulParagraphs.length > 0
        ? this.stripTags(meaningfulParagraphs[0][1])
        : '';
    } else if (meaningfulParagraphs.length >= 2) {
      // Fallback: no h2/h3, but heading is in first <p><strong> and description in second <p>
      h2Content = this.stripTags(meaningfulParagraphs[0][1]);
      pContent = this.stripTags(meaningfulParagraphs[1][1]);
    } else if (meaningfulParagraphs.length === 1) {
      // Only one meaningful paragraph - use as heading
      h2Content = this.stripTags(meaningfulParagraphs[0][1]);
      pContent = '';
    } else {
      // No heading content at all - skip this page
      return null;
    }

    if (!h2Content) return null;

    return {
      h2Content,
      pContent,
      iframeTag: iframeMatch[0].trim(),
    };
  }

  /**
   * Build the new mapSection HTML using the pins__section template.
   */
  buildNewMapSection(h2Content: string, pContent: string, iframeTag: string): string {
    return `<div class="pins__section">
  <div class="pins__content">
    <h2>${h2Content}</h2>
    <p>${pContent}</p>
  </div>
  <div class="pins__map-wrapper">
    <div class="pins__map-embed">
      ${iframeTag}
    </div>
  </div>
</div>`;
  }

  async updatePage(page: LocalPage, newMapSection: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          mapSection: newMapSection,
        },
      });
      return true;
    } catch (error: any) {
      console.error(`  Failed to update ${page.slug}`);
      if (error.response?.data) {
        console.error(
          '  Strapi error:',
          JSON.stringify(error.response.data, null, 2)
        );
      }
      return false;
    }
  }

  async run(options: {
    dryRun: boolean;
    limit?: number;
    slug?: string;
  }): Promise<void> {
    const { dryRun, limit, slug } = options;

    console.log('=== Map Section Updater ===');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
    if (limit) console.log(`Limit: ${limit}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    console.log('');

    // Fetch all pages
    let pages = await this.fetchAllPages();

    // Filter by slug if provided
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      if (pages.length === 0) {
        console.error(`No page found with slug: ${slug}`);
        return;
      }
    }

    // Apply limit
    if (limit) {
      pages = pages.slice(0, limit);
    }

    // Filter to only pages that have mapSection content
    const pagesWithMap = pages.filter((p) => p.mapSection && p.mapSection.trim().length > 0);
    console.log(`\n${pagesWithMap.length} pages have mapSection content out of ${pages.length} total`);

    // Skip pages already in the new format
    const pagesToUpdate = pagesWithMap.filter(
      (p) => !p.mapSection!.includes('pins__section')
    );
    const alreadyUpdated = pagesWithMap.length - pagesToUpdate.length;
    if (alreadyUpdated > 0) {
      console.log(`${alreadyUpdated} pages already in new format (skipped)`);
    }
    console.log(`${pagesToUpdate.length} pages to update\n`);

    if (pagesToUpdate.length === 0) {
      console.log('Nothing to update.');
      return;
    }

    // === BACKUP ===
    const backupDir = join(__dirname, '../data');
    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = join(backupDir, `mapSection-backup-${timestamp}.json`);

    const backup: Record<
      string,
      { slug: string; documentId: string; title: string; mapSection: string | null }
    > = {};
    for (const page of pagesToUpdate) {
      backup[page.documentId] = {
        slug: page.slug,
        documentId: page.documentId,
        title: page.title,
        mapSection: page.mapSection,
      };
    }
    writeFileSync(backupPath, JSON.stringify(backup, null, 2));
    console.log(`Backed up ${pagesToUpdate.length} pages to: ${backupPath}\n`);

    // === TRANSFORM AND PUSH ===
    let updated = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < pagesToUpdate.length; i++) {
      const page = pagesToUpdate[i];
      const progress = `[${i + 1}/${pagesToUpdate.length}]`;

      // Parse existing content
      const parsed = this.parseExistingMapSection(page.mapSection!);
      if (!parsed) {
        console.log(
          `${progress} SKIP ${page.slug} - could not parse existing mapSection`
        );
        skipped++;
        continue;
      }

      // Build new HTML
      const newMapSection = this.buildNewMapSection(
        parsed.h2Content,
        parsed.pContent,
        parsed.iframeTag
      );

      if (dryRun) {
        console.log(`${progress} [DRY RUN] ${page.slug}`);
        if (i === 0) {
          console.log('  --- Sample output ---');
          console.log(newMapSection.split('\n').map(l => '  ' + l).join('\n'));
          console.log('  ---');
        }
        updated++;
        continue;
      }

      // Push update
      const success = await this.updatePage(page, newMapSection);
      if (success) {
        console.log(`${progress} Updated: ${page.slug}`);
        updated++;
      } else {
        failed++;
      }

      // Rate limit
      await new Promise((r) => setTimeout(r, 200));
    }

    console.log('\n=== Summary ===');
    console.log(`Updated: ${updated}`);
    console.log(`Skipped (unparseable): ${skipped}`);
    console.log(`Failed: ${failed}`);
    console.log(`Backup: ${backupPath}`);
  }
}

// Parse CLI args
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`Usage: tsx scripts/update-map-section.ts [options]

Transforms the mapSection field for all local pages from flat HTML
into the new pins__section template format.

Options:
  --dry-run       Preview changes without updating Strapi
  --limit=N       Process only first N pages
  --slug=<slug>   Update a specific page by slug
  --help          Show this help`);
  process.exit(0);
}

const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

const updater = new MapSectionUpdater();
updater
  .run({ dryRun: isDryRun, limit, slug })
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
