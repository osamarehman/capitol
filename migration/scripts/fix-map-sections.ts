#!/usr/bin/env tsx
/**
 * Fix mapSection for pages that have FAQ content or placeholder instead of map embed
 *
 * Targeted fix for 5 pages:
 * 1. virginia-deck-builders-near-you (placeholder content)
 * 2. rockville-maryland-roofing-company-near-you (FAQ content)
 * 3. waldorf-maryland-roofing-company-near-you (FAQ content)
 * 4. frederick-maryland-roofing-company-near-you (FAQ content)
 * 5. gaithersburg-maryland-deck-builders-near-you (missing iframe only)
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import Anthropic from '@anthropic-ai/sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const anthropic = new Anthropic();

// Google Maps embed URL template (same as generate-map-sections.ts)
const MAPS_URL_TEMPLATE =
  'https://www.google.com/maps/d/u/0/embed?mid=10zevQxZd3uDXmovt2-bhd4AVDeVb0Rg&ehbc=2E312F&noprof=1&ll={LAT},{LONG}&z=12';

// CSV paths
const JOBS_CSV = join(__dirname, '../../jobs_city_aggregated.csv');
const CITY_TOTALS_CSV = join(__dirname, '../../jobs_city_totals.csv');

// Unmatched trade names that get added to all service types
const UNMATCHED_TRADE_NAMES = [
  'BATH REMODEL', 'KITCHEN REMODEL', 'HOME REMODELING & IMPROVEMENTS',
  'REPAIRS', 'OTHER', 'CARPETS & FLOORING', 'FINISHING',
  'SHUTTERS', 'SPECIALTY COATINGS', '',
];

// Pages to fix with their expected data
interface PageFix {
  slug: string;
  documentId: string;
  city: string;
  state: string;
  serviceType: string;
  displayLabel: string;
  csvTradeName: string;
  // If true, keep existing H2+paragraph and just add iframe
  iframeOnly?: boolean;
  // Override for state-level pages that don't match a single city
  isStatePage?: boolean;
}

const PAGES_TO_FIX: PageFix[] = [
  {
    slug: 'rockville-maryland-roofing-company-near-you',
    documentId: 'qy3s3t7m36ws7rg2jfrbs9dx',
    city: 'Rockville',
    state: 'MD',
    serviceType: 'roofing',
    displayLabel: 'Roof Replacements',
    csvTradeName: 'ROOFING',
  },
  {
    slug: 'waldorf-maryland-roofing-company-near-you',
    documentId: 'wehn6ieru8q93hts66qllzwr',
    city: 'Waldorf',
    state: 'MD',
    serviceType: 'roofing',
    displayLabel: 'Roof Replacements',
    csvTradeName: 'ROOFING',
  },
  {
    slug: 'frederick-maryland-roofing-company-near-you',
    documentId: 'q4htq9l0dkdzilgc7gycpych',
    city: 'Frederick',
    state: 'MD',
    serviceType: 'roofing',
    displayLabel: 'Roof Replacements',
    csvTradeName: 'ROOFING',
  },
  {
    slug: 'gaithersburg-maryland-deck-builders-near-you',
    documentId: 'ftx9mpatoh74676bqujek69y',
    city: 'Gaithersburg',
    state: 'MD',
    serviceType: 'deck',
    displayLabel: 'Deck Builds',
    csvTradeName: 'DECKING',
    iframeOnly: true,
  },
  {
    slug: 'virginia-deck-builders-near-you',
    documentId: 'ms2y4mirvs6a4ge7a7l2o5c4',
    city: 'Virginia',
    state: 'VA',
    serviceType: 'deck',
    displayLabel: 'Deck Builds',
    csvTradeName: 'DECKING',
    isStatePage: true,
  },
];

function normalizeCity(city: string): string {
  return city.toLowerCase().trim().replace(/[^a-z\s]/g, '').trim();
}

interface JobLookup {
  jobsByKey: Map<string, number>;
  cityTotals: Map<string, { totalJobs: number; lat: number; lng: number }>;
}

function loadJobData(): JobLookup {
  // Load aggregated jobs
  const jobsCsv = fs.readFileSync(JOBS_CSV, 'utf8');
  const jobsRaw = parse(jobsCsv, { columns: true, skip_empty_lines: true });

  const jobsByKey = new Map<string, number>();
  for (const row of jobsRaw) {
    const key = `${normalizeCity(row.city)}|${row.tradeName}`;
    const existing = jobsByKey.get(key) || 0;
    jobsByKey.set(key, Math.max(existing, parseInt(row.jobCount) || 0));
  }

  // Load city totals
  const cityTotalsCsv = fs.readFileSync(CITY_TOTALS_CSV, 'utf8');
  const cityTotalsRaw = parse(cityTotalsCsv, { columns: true, skip_empty_lines: true });

  const cityTotals = new Map<string, { totalJobs: number; lat: number; lng: number }>();
  for (const row of cityTotalsRaw) {
    const key = normalizeCity(row.city);
    const existing = cityTotals.get(key);
    // Aggregate if same normalized city appears multiple times
    if (existing) {
      existing.totalJobs += parseInt(row.totalJobs) || 0;
    } else {
      cityTotals.set(key, {
        totalJobs: parseInt(row.totalJobs) || 0,
        lat: parseFloat(row.latitude) || 0,
        lng: parseFloat(row.longitude) || 0,
      });
    }
  }

  return { jobsByKey, cityTotals };
}

function getJobCount(page: PageFix, lookup: JobLookup): number {
  if (page.isStatePage) {
    // For state-level pages, sum all city totals in that state
    const cityTotalsCsv = fs.readFileSync(CITY_TOTALS_CSV, 'utf8');
    const rows = parse(cityTotalsCsv, { columns: true, skip_empty_lines: true });
    let stateTotal = 0;
    for (const row of rows) {
      if (row.state === page.state) {
        stateTotal += parseInt(row.totalJobs) || 0;
      }
    }
    return stateTotal || 90;
  }

  // Use city total (all services combined) for a more meaningful number
  const cityKey = normalizeCity(page.city);
  const cityData = lookup.cityTotals.get(cityKey);
  if (cityData && cityData.totalJobs > 0) {
    return cityData.totalJobs;
  }

  // Fallback to service-specific + unmatched
  const serviceKey = `${cityKey}|${page.csvTradeName}`;
  let count = lookup.jobsByKey.get(serviceKey) || 0;
  for (const trade of UNMATCHED_TRADE_NAMES) {
    count += lookup.jobsByKey.get(`${cityKey}|${trade}`) || 0;
  }

  return count || 10;
}

function getCoordinates(page: PageFix, lookup: JobLookup): { lat: number; lng: number } {
  if (page.isStatePage && page.state === 'VA') {
    // Northern Virginia center
    return { lat: 38.85, lng: -77.25 };
  }

  const cityKey = normalizeCity(page.city);
  const cityData = lookup.cityTotals.get(cityKey);
  if (cityData && cityData.lat !== 0) {
    return { lat: cityData.lat, lng: cityData.lng };
  }

  // Default to DC area center
  return { lat: 38.9072, lng: -77.0369 };
}

async function generateParagraph(
  city: string,
  state: string,
  service: string,
  displayLabel: string,
  isStatePage: boolean,
): Promise<string> {
  const locationDesc = isStatePage
    ? `Northern Virginia and surrounding Virginia communities`
    : `${city}, ${state}`;

  const prompt = `You are writing content for a home improvement company's local service page. Generate a single paragraph (100-150 words) for the map section of a ${service} service page for ${locationDesc}.

The paragraph should:
1. Reference that each pin on the map represents a homeowner they've served
2. Mention 2-3 REAL neighborhoods, communities, or areas within ${locationDesc} (research actual neighborhood names)
3. Reference home styles common in the area
4. Mention HOA or community guidelines considerations if applicable
5. End with reassurance about quality work

Do NOT include any heading - just the paragraph text.
Do NOT use phrases like "we understand" or "we recognize" more than once.
Keep the tone professional but warm.

Example style:
"Each pin on this map represents a Pasadena homeowner we've had the opportunity to serve. From waterfront homes in communities like Riviera Beach and Lake Shore to inland neighborhoods such as Green Haven and Country Place, we understand the wide range of home styles found throughout Pasadena. We also recognize the importance of meeting HOA and community guidelines where applicable. Whether matching existing architectural character or ensuring roofing materials meet neighborhood standards, we make every roof replacement smooth, compliant, and built to last."

Now write a similar paragraph for ${locationDesc} focused on ${service.toLowerCase()} services:`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === 'text');
  return textBlock ? (textBlock as any).text.trim() : '';
}

function buildMapSectionHtml(
  city: string,
  jobCount: number,
  displayLabel: string,
  paragraph: string,
  lat: number,
  lng: number,
): string {
  const mapsUrl = MAPS_URL_TEMPLATE
    .replace('{LAT}', lat.toString())
    .replace('{LONG}', lng.toString());

  return `<h2>📍 ${jobCount}+ ${city} Homeowners Have Trusted Us for ${displayLabel}, Expert Guidance, and Honest Recommendations</h2>
<p>${paragraph}</p>
<div class="responsive-map"><iframe style="border-width:0;" src="${mapsUrl}" width="640" height="480" frameborder="0"></iframe></div>`;
}

function buildIframeHtml(lat: number, lng: number): string {
  const mapsUrl = MAPS_URL_TEMPLATE
    .replace('{LAT}', lat.toString())
    .replace('{LONG}', lng.toString());

  return `<div class="responsive-map"><iframe style="border-width:0;" src="${mapsUrl}" width="640" height="480" frameborder="0"></iframe></div>`;
}

class MapSectionFixer {
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

  async updatePage(documentId: string, mapSection: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${documentId}`, {
        data: { mapSection },
      });
      return true;
    } catch (error: any) {
      console.error(`   Failed to update ${documentId}`);
      if (error.response?.data) {
        console.error('   Error:', JSON.stringify(error.response.data, null, 2));
      }
      return false;
    }
  }

  async fetchCurrentMapSection(documentId: string): Promise<string | null> {
    try {
      const res = await this.strapiClient.get(`/services/${documentId}`, {
        params: {
          'status': 'published',
          'fields[0]': 'mapSection',
        },
      });
      return res.data.data?.mapSection || null;
    } catch {
      return null;
    }
  }

  async run(options: { dryRun?: boolean; slug?: string } = {}): Promise<void> {
    const { dryRun = false, slug } = options;

    console.log('Fix Map Sections - Targeted Fix\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    console.log('');

    const lookup = loadJobData();
    console.log('Loaded job data from CSVs\n');

    let pages = [...PAGES_TO_FIX];
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
    }

    if (pages.length === 0) {
      console.log('No pages to fix.');
      return;
    }

    console.log(`Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${page.city}, Service: ${page.serviceType}`);

      const jobCount = getJobCount(page, lookup);
      const coords = getCoordinates(page, lookup);

      console.log(`   Jobs: ${jobCount}, Coords: ${coords.lat}, ${coords.lng}`);

      let newMapSection: string;

      if (page.iframeOnly) {
        // Just append iframe to existing content
        const current = await this.fetchCurrentMapSection(page.documentId);
        if (!current) {
          console.log(`   ERROR: Could not fetch current mapSection`);
          errorCount++;
          continue;
        }

        // Remove trailing empty paragraphs
        const cleaned = current.replace(/<p>\s*‍?\s*<\/p>\s*$/, '');
        const iframe = buildIframeHtml(coords.lat, coords.lng);
        newMapSection = cleaned + '\n' + iframe;
        console.log(`   Appending iframe to existing content`);
      } else {
        // Generate full content
        console.log(`   Generating AI paragraph...`);
        const paragraph = await generateParagraph(
          page.city,
          page.state,
          page.serviceType,
          page.displayLabel,
          !!page.isStatePage,
        );

        console.log(`   Paragraph: "${paragraph.substring(0, 100)}..."`);

        newMapSection = buildMapSectionHtml(
          page.city,
          jobCount,
          page.displayLabel,
          paragraph,
          coords.lat,
          coords.lng,
        );
      }

      if (dryRun) {
        console.log(`   Would update (${newMapSection.length} chars)`);
        console.log(`   Preview: ${newMapSection.substring(0, 200)}...`);
        successCount++;
        continue;
      }

      const success = await this.updatePage(page.documentId, newMapSection);
      if (success) {
        console.log(`   Updated successfully`);
        successCount++;
      } else {
        errorCount++;
      }

      // Rate limit for AI calls
      await new Promise((resolve) => setTimeout(resolve, 500));
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
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/fix-map-sections.ts [options]

Fixes 5 pages with broken mapSection content:
  - virginia-deck-builders-near-you (placeholder)
  - rockville-maryland-roofing-company-near-you (FAQ content)
  - waldorf-maryland-roofing-company-near-you (FAQ content)
  - frederick-maryland-roofing-company-near-you (FAQ content)
  - gaithersburg-maryland-deck-builders-near-you (missing iframe)

Options:
  --dry-run      Preview changes
  --slug=<slug>  Fix a specific page only
  --help         Show help
`);
  process.exit(0);
}

const fixer = new MapSectionFixer();
fixer.run({ dryRun: isDryRun, slug }).catch(console.error);
