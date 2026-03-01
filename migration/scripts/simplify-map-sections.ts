#!/usr/bin/env tsx
/**
 * Simplify Map Section Paragraphs with AI
 *
 * This script:
 * 1. Fetches all published pages that have a mapSection
 * 2. Extracts the <p> content from mapSection HTML
 * 3. Uses AI to shorten the paragraph to ~half length
 * 4. Rebuilds mapSection with shortened paragraph
 * 5. Special case: fixes Pasadena roofing iframe URL
 * 6. Pushes updated mapSection back to Strapi
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const CACHE_PATH = join(__dirname, '../data/map-section-cache.json');

// Pasadena fix constants
const PASADENA_SLUG = 'pasadena-maryland-roofing-company-near-you';
const WRONG_MAP_MID = '1_ei-5jFGRAwRvevtAJMweWS4JcqSezs';
const CORRECT_MAP_MID = '10zevQxZd3uDXmovt2-bhd4AVDeVb0Rg';
const PASADENA_LL = '39.1073,-76.5713';
const PASADENA_ZOOM = '12';

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  mapSection?: string | null;
}

class MapSectionSimplifier {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private cache: Record<string, string> = {};
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

    // Load cache
    if (existsSync(CACHE_PATH)) {
      this.cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      console.log(`Loaded ${Object.keys(this.cache).length} cached paragraphs`);
    }
  }

  private saveCache(): void {
    writeFileSync(CACHE_PATH, JSON.stringify(this.cache, null, 2));
  }

  /**
   * Extract the <p> text content from mapSection HTML
   */
  private extractParagraph(html: string): string | null {
    const match = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (!match) return null;
    // Strip any inner HTML tags to get plain text
    return match[1].replace(/<[^>]+>/g, '').trim();
  }

  /**
   * Extract the <h2> block (entire tag) from mapSection HTML
   */
  private extractH2(html: string): string | null {
    const match = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/i);
    return match ? match[0] : null;
  }

  /**
   * Extract the responsive-map div (iframe block) from mapSection HTML
   */
  private extractMapDiv(html: string): string | null {
    const match = html.match(/<div\s+class="responsive-map"[\s\S]*?<\/div>/i);
    return match ? match[0] : null;
  }

  /**
   * Fix Pasadena iframe URL
   */
  private fixPasadenaIframe(mapDiv: string): string {
    // Replace wrong map ID with correct one
    let fixed = mapDiv.replace(WRONG_MAP_MID, CORRECT_MAP_MID);

    // Replace /d/u/1/ with /d/u/0/
    fixed = fixed.replace(/\/d\/u\/1\//g, '/d/u/0/');

    // Add ll and z params if missing
    if (!fixed.includes('&ll=')) {
      fixed = fixed.replace(
        /&ehbc=2E312F/,
        `&ehbc=2E312F&noprof=1&ll=${PASADENA_LL}&z=${PASADENA_ZOOM}`
      );
    }

    return fixed;
  }

  /**
   * Shorten a paragraph using AI
   */
  async shortenParagraph(documentId: string, paragraph: string): Promise<string> {
    // Check cache
    if (this.cache[documentId]) {
      return this.cache[documentId];
    }

    this.aiCallCount++;
    console.log(`   AI call #${this.aiCallCount}: Shortening paragraph...`);

    const prompt = `Shorten this paragraph to exactly 50% of its length (currently ${paragraph.length} characters, target ~${Math.round(paragraph.length / 2)} characters). Be aggressive with cuts — remove filler, redundant phrases, and unnecessary qualifiers. Keep neighborhood names, factual content, and professional tone. Do not add any new information. Return only the shortened paragraph text, no HTML tags.

Original: ${paragraph}`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = (response.content[0] as { type: string; text: string }).text.trim();

      this.cache[documentId] = text;
      this.saveCache();

      return text;
    } catch (error: any) {
      console.error(`   AI error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Rebuild the mapSection HTML with shortened paragraph
   */
  rebuildHTML(h2: string, shortenedParagraph: string, mapDiv: string): string {
    return `${h2}\n<p>${shortenedParagraph}</p>\n${mapDiv}`;
  }

  /**
   * Fetch all published pages with mapSection populated
   */
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
          'fields[0]': 'title',
          'fields[1]': 'slug',
          'fields[2]': 'mapSection',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      allPages.push(...response.data.data);
      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    // Filter to only pages with mapSection content
    const withMap = allPages.filter((p) => p.mapSection && p.mapSection.trim().length > 0);
    console.log(`Found ${allPages.length} total pages, ${withMap.length} with mapSection`);
    return withMap;
  }

  /**
   * Update a page's mapSection
   */
  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { mapSection: html },
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

  /**
   * Main execution
   */
  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('Map Section Simplifier\n');
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

    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\nNo pages found to update');
      return;
    }

    console.log(`\nProcessing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const mapHTML = page.mapSection!;

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      // Extract components
      const h2 = this.extractH2(mapHTML);
      const paragraph = this.extractParagraph(mapHTML);
      let mapDiv = this.extractMapDiv(mapHTML);

      if (!h2 || !paragraph || !mapDiv) {
        console.log(`   Skipping: could not parse mapSection HTML`);
        console.log(`     h2: ${h2 ? 'found' : 'MISSING'}, p: ${paragraph ? 'found' : 'MISSING'}, map: ${mapDiv ? 'found' : 'MISSING'}`);
        skippedCount++;
        continue;
      }

      console.log(`   Original paragraph: ${paragraph.length} chars`);

      // Special case: fix Pasadena iframe
      const isPasadena = page.slug === PASADENA_SLUG;
      if (isPasadena) {
        console.log(`   Pasadena detected: fixing iframe URL`);
        mapDiv = this.fixPasadenaIframe(mapDiv);
      }

      try {
        // Shorten paragraph with AI
        const shortened = await this.shortenParagraph(page.documentId, paragraph);
        console.log(`   Shortened paragraph: ${shortened.length} chars (${Math.round((shortened.length / paragraph.length) * 100)}% of original)`);

        const newHTML = this.rebuildHTML(h2, shortened, mapDiv);

        if (dryRun) {
          console.log(`   H2: ${h2.substring(0, 80)}...`);
          console.log(`   New paragraph: "${shortened}"`);
          if (isPasadena) {
            console.log(`   Iframe URL fixed: mid=${CORRECT_MAP_MID}, ll=${PASADENA_LL}`);
          }
          console.log(`   Would update`);
          successCount++;
          continue;
        }

        const success = await this.updatePage(page, newHTML);
        if (success) {
          console.log(`   Updated successfully`);
          successCount++;
        } else {
          errorCount++;
        }

        // Small delay between updates
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error(`   Error: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`Successfully ${dryRun ? 'would update' : 'updated'}: ${successCount} pages`);
    console.log(`Skipped (unparseable): ${skippedCount} pages`);
    console.log(`Failed: ${errorCount} pages`);
    console.log(`Total processed: ${pages.length} pages`);
    console.log(`AI calls made: ${this.aiCallCount}`);
    console.log('='.repeat(60));

    if (!dryRun && successCount > 0) {
      console.log(`\nUpdate completed! Verify at: ${STRAPI_URL}/admin`);
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
Usage: npx tsx scripts/simplify-map-sections.ts [options]

Options:
  --dry-run       Preview changes without updating Strapi
  --limit=N       Process only first N pages
  --slug=<slug>   Update a specific page only
  --help          Show this help message

Examples:
  npx tsx scripts/simplify-map-sections.ts --dry-run --limit=5
  npx tsx scripts/simplify-map-sections.ts --slug=pasadena-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/simplify-map-sections.ts --dry-run
  npx tsx scripts/simplify-map-sections.ts
`);
  process.exit(0);
}

const simplifier = new MapSectionSimplifier();
simplifier.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
