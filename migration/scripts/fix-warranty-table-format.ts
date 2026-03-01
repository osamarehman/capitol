#!/usr/bin/env tsx
/**
 * Fix Warranty Table Format in tableRichText
 *
 * Changes:
 * 1. Reorder columns: Warranty Type | Size (Squares) | Location
 * 2. Merge Address + City + State + ZIP into one "Location" column
 * 3. Remove state name (Maryland, Virginia, etc.) from street address
 * 4. Keep H2 + paragraph above the table unchanged
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

// State names to strip from street addresses
const STATE_NAMES = [
  ', Maryland', ', Virginia', ', Washington DC', ', DC',
  ' Maryland', ' Virginia',
];

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  tableRichText?: string;
}

function cleanStreetAddress(address: string): string {
  let cleaned = address;
  for (const state of STATE_NAMES) {
    cleaned = cleaned.replace(new RegExp(state + '$', 'i'), '');
    cleaned = cleaned.replace(new RegExp(state + ',', 'i'), ',');
  }
  return cleaned.trim();
}

function restructureTable(html: string): string | null {
  // Extract everything before the table wrapper
  const tableWrapperMatch = html.match(/^([\s\S]*?)(<div class="table-wrapper">|<figure class="table">)/);
  if (!tableWrapperMatch) return null;

  const prefix = tableWrapperMatch[1]; // H2 + paragraph

  // Parse table rows from tbody
  const tbodyMatch = html.match(/<tbody>([\s\S]*?)<\/tbody>/);
  if (!tbodyMatch) return null;

  // Parse each row
  const rowRegex = /<tr>([\s\S]*?)<\/tr>/gi;
  const cellRegex = /<td>([\s\S]*?)<\/td>/gi;

  const rows: string[][] = [];
  let rowMatch;
  while ((rowMatch = rowRegex.exec(tbodyMatch[1])) !== null) {
    const cells: string[] = [];
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
      cells.push(cellMatch[1].trim());
    }
    if (cells.length > 0) rows.push(cells);
  }

  if (rows.length === 0) return null;

  // Parse header to figure out column indices
  const theadMatch = html.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>[\s\S]*?<\/thead>/);
  if (!theadMatch) return null;

  const headerRegex = /<th>([\s\S]*?)<\/th>/gi;
  const headers: string[] = [];
  let headerMatch;
  while ((headerMatch = headerRegex.exec(theadMatch[1])) !== null) {
    headers.push(headerMatch[1].trim().toLowerCase());
  }

  // Find column indices
  const addressIdx = headers.findIndex((h) => h.includes('address'));
  const warrantyIdx = headers.findIndex((h) => h.includes('warranty'));
  const sizeIdx = headers.findIndex((h) => h.includes('size') || h.includes('square') || h.includes('steep'));
  const cityIdx = headers.findIndex((h) => h === 'city');
  const stateIdx = headers.findIndex((h) => h.includes('state'));
  const zipIdx = headers.findIndex((h) => h.includes('zip'));

  if (warrantyIdx === -1 || sizeIdx === -1) return null;

  // Build new rows: Warranty Type | Size | Location
  const newRows = rows.map((cells) => {
    const warrantyType = cells[warrantyIdx] || '';
    const size = cells[sizeIdx] || '';

    // Build location from available parts
    let locationParts: string[] = [];

    if (addressIdx !== -1 && cells[addressIdx]) {
      const cleanAddr = cleanStreetAddress(cells[addressIdx]);
      if (cleanAddr) locationParts.push(cleanAddr);
    }

    if (cityIdx !== -1 && cells[cityIdx]) {
      locationParts.push(cells[cityIdx]);
    }

    // Add state + zip together
    const state = stateIdx !== -1 ? cells[stateIdx] || '' : '';
    const zip = zipIdx !== -1 ? cells[zipIdx] || '' : '';
    if (state && zip) {
      locationParts.push(`${state} ${zip}`);
    } else if (state) {
      locationParts.push(state);
    } else if (zip) {
      locationParts.push(zip);
    }

    const location = locationParts.join(', ');

    return `<tr><td>${warrantyType}</td><td>${size}</td><td>${location}</td></tr>`;
  }).join('');

  // Build new table
  const newTable = `<div class="table-wrapper"><table class="warranty-table"><thead><tr><th>Warranty Type</th><th>Size (Squares)</th><th>Location</th></tr></thead><tbody>${newRows}</tbody></table></div>`;

  return prefix + newTable;
}

class WarrantyTableFixer {
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
          'fields[1]': 'tableRichText',
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
        data: { tableRichText: html },
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

  async run(options: { dryRun?: boolean; limit?: number; slug?: string } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('Fix Warranty Table Format\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit}`);
    console.log('');

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
    }

    // Only pages that have a warranty table
    pages = pages.filter((p) => p.tableRichText && p.tableRichText.includes('warranty-table'));

    if (limit && limit > 0) pages = pages.slice(0, limit);

    if (pages.length === 0) {
      console.log('\nNo pages with warranty tables found.');
      return;
    }

    console.log(`\nProcessing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);

      const newHTML = restructureTable(page.tableRichText!);

      if (!newHTML) {
        console.log(`   Skipped (could not parse table)`);
        skippedCount++;
        continue;
      }

      if (dryRun) {
        // Show a preview of first row
        const firstRowMatch = newHTML.match(/<tbody><tr><td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td>/);
        if (firstRowMatch) {
          console.log(`   Sample: ${firstRowMatch[1]} | ${firstRowMatch[2]} | ${firstRowMatch[3]}`);
        }
        successCount++;
        continue;
      }

      const success = await this.updatePage(page, newHTML);
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
    console.log(`Skipped: ${skippedCount}`);
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
Usage: npx tsx scripts/fix-warranty-table-format.ts [options]

Options:
  --dry-run      Preview changes
  --limit=N      Process only N pages
  --slug=<slug>  Update a specific page
  --help         Show help
`);
  process.exit(0);
}

const fixer = new WarrantyTableFixer();
fixer.run({ dryRun: isDryRun, limit, slug }).catch(console.error);
