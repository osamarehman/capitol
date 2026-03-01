#!/usr/bin/env tsx
/**
 * Rewrite inspectionRichText with natural-language H2 + paragraph
 * and restructured tables.
 *
 * Changes:
 * 1. H2 format: "{metric} Serviced and Inspected: We Know {City} {Service}"
 * 2. Paragraph: AI-generated natural language (cached)
 * 3. Table: merge Address+City+State+Zip → Location, remove Stories/Ridges/Valleys/Eaves
 * 4. Notes: blank where data is missing
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
const MEASUREMENTS_PATH = join(__dirname, '../../hover_measurements.json');
const INSPECTION_DATA_PATH = join(__dirname, '../../hover_inspection_data.json');
const CACHE_PATH = join(__dirname, '../data/inspection-rewrite-cache.json');

// City aliases: CMS city → measurement city
const CITY_ALIASES: Record<string, string> = {
  'Ft Washington': 'Fort Washington',
  'Ft Meade': 'Fort Meade',
  'Mont Village': 'Montgomery Village',
  'Mont. Village': 'Montgomery Village',
  'Mt Airy': 'Mount Airy',
  'Washington DC': 'Washington',
  'Washington, DC': 'Washington',
  'DC': 'Washington',
};

interface MeasurementRecord {
  street: string;
  city: string;
  state: string;
  zip: string;
  stories: string;
  siding_sqft: number;
  siding_squares: number;
  trim_sqft: number;
  soffit_sqft: number;
  material_types: Record<string, number>;
  roof_area_sqft: number;
  roof_squares: number;
  roof_facets: number;
  ridges_hips_ft: number;
  valleys_ft: number;
  eaves_ft: number;
  dominant_pitch: number;
  gutter_length_ft: number;
  entry_doors: number;
  sliding_glass_doors: number;
}

interface CityStats {
  properties: number;
  total_roof_squares: number;
  total_roof_sqft: number;
  total_facets: number;
  total_siding_squares: number;
  total_siding_sqft: number;
  total_trim_sqft: number;
  total_soffit_sqft: number;
  total_gutter_ft: number;
  total_eaves_ft: number;
  total_entry_doors: number;
  total_sliding_glass: number;
}

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  serviceType?: string;
  city?: string;
  state?: string;
  inspectionRichText?: string;
}

type ServiceType = 'roofing' | 'siding' | 'gutter' | 'door';

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

function stripHouseNumber(address: string): string {
  return address.replace(/^\d+[A-Za-z]?\s*[-]?\s*/, '').trim();
}

function classifyPitch(pitch: number): string {
  if (pitch >= 8) return 'High';
  if (pitch >= 4) return 'Moderate';
  return 'Low';
}

function materialMixStr(materials: Record<string, number>): string {
  if (!materials || Object.keys(materials).length === 0) return '';
  const sorted = Object.entries(materials).sort((a, b) => b[1] - a[1]);
  return sorted.map(([mat, cnt]) => `${mat} (${cnt})`).join(', ');
}

// ── H2 generation (template-based) ──────────────────────────────────────────

function generateH2(service: ServiceType, city: string, stats: CityStats): string {
  switch (service) {
    case 'roofing':
      return `${formatNumber(stats.total_roof_squares)} Squares Serviced and Inspected: We Know ${city} Roofing`;
    case 'siding':
      return `${formatNumber(stats.total_siding_squares)} Squares of Siding Serviced and Inspected: We Know ${city} Siding`;
    case 'gutter':
      return `${formatNumber(stats.total_gutter_ft)} Linear Feet Serviced and Inspected: We Know ${city} Gutters`;
    case 'door': {
      const total = stats.total_entry_doors + stats.total_sliding_glass;
      return `${formatNumber(total)} Doors Serviced and Inspected: We Know ${city} Doors`;
    }
  }
}

// ── Notes lookup from pre-generated data ────────────────────────────────────

// Key: "normalizedStreet|city|state|service" → note text
type NotesLookup = Map<string, string>;

function normalizeStreet(street: string): string {
  return stripHouseNumber(street).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function buildNotesKey(street: string, city: string, state: string, service: string): string {
  return `${normalizeStreet(street)}|${city.toLowerCase()}|${state.toLowerCase()}|${service}`;
}

function loadNotesLookup(): NotesLookup {
  const lookup: NotesLookup = new Map();

  if (!existsSync(INSPECTION_DATA_PATH)) {
    console.log('Warning: hover_inspection_data.json not found, notes will be empty');
    return lookup;
  }

  const data = JSON.parse(readFileSync(INSPECTION_DATA_PATH, 'utf-8'));

  // Column indices for notes (last column) per service type:
  // roofing: 12 columns (Address, City, State, Zip, Stories, Roof Sq, Pitch, Facets, Ridges, Valleys, Eaves, Notes)
  // siding: 11 columns (Address, City, State, Zip, Stories, Siding Sq, SqFt, Trim, Soffit, Materials, Notes)
  // gutter: 9 columns (Address, City, State, Zip, Stories, Gutter Length, Eaves, Roof Pitch, Drainage Notes)
  const cellRegex = /<td>([\s\S]*?)<\/td>/gi;

  for (const [cityKey, services] of Object.entries(data) as [string, any][]) {
    // cityKey is "City, State" e.g. "Bowie, MD"
    const parts = cityKey.split(', ');
    const city = parts[0];
    const state = parts[1] || 'MD';

    for (const [svc, info] of Object.entries(services) as [string, any][]) {
      if (svc === 'door') continue; // door tables don't have notes

      const html = info.html || '';
      const rowRegex = /<tbody>[\s\S]*?<\/tbody>/i;
      const tbodyMatch = html.match(rowRegex);
      if (!tbodyMatch) continue;

      const trRegex = /<tr>([\s\S]*?)<\/tr>/gi;
      let trMatch;
      while ((trMatch = trRegex.exec(tbodyMatch[0])) !== null) {
        const cells: string[] = [];
        let cellMatch;
        const localCellRegex = /<td>([\s\S]*?)<\/td>/gi;
        while ((cellMatch = localCellRegex.exec(trMatch[1])) !== null) {
          cells.push(cellMatch[1].trim());
        }
        if (cells.length < 2) continue;

        const street = cells[0]; // First cell is street address
        const note = cells[cells.length - 1]; // Last cell is notes

        if (note && note !== 'N/A' && note !== 'Standard drainage' && note.length > 3) {
          const key = buildNotesKey(street, city, state, svc);
          lookup.set(key, note);
        }
      }
    }
  }

  console.log(`Loaded ${lookup.size} pre-generated notes from hover_inspection_data.json`);
  return lookup;
}

// ── Table builders ──────────────────────────────────────────────────────────

function buildLocation(street: string, city: string, state: string, zip: string): string {
  const cleanStreet = stripHouseNumber(street);
  return `${cleanStreet}, ${city}, ${state} ${zip}`;
}

function buildRoofingTable(properties: MeasurementRecord[], notesLookup: NotesLookup): string {
  const rows = properties.map((p) => {
    const location = buildLocation(p.street, p.city, p.state, p.zip);
    const hasData = p.roof_squares > 0 || p.roof_facets > 0;
    const key = buildNotesKey(p.street, p.city, p.state, 'roofing');
    const note = hasData ? (notesLookup.get(key) || '') : '';
    return `<tr><td>${location}</td><td>${p.roof_squares}</td><td>${p.dominant_pitch}/12</td><td>${p.roof_facets}</td><td>${note}</td></tr>`;
  }).join('');

  return (
    '<thead><tr>' +
    '<th>Location</th><th>Roof Sq</th><th>Pitch</th><th>Facets</th><th>Notes</th>' +
    '</tr></thead>' +
    '<tbody>' + rows + '</tbody>'
  );
}

function buildSidingTable(properties: MeasurementRecord[], notesLookup: NotesLookup): string {
  const rows = properties.map((p) => {
    const location = buildLocation(p.street, p.city, p.state, p.zip);
    const hasData = p.siding_sqft > 0;
    const materials = hasData ? materialMixStr(p.material_types) : '';
    const key = buildNotesKey(p.street, p.city, p.state, 'siding');
    const note = hasData ? (notesLookup.get(key) || '') : '';
    return (
      `<tr><td>${location}</td>` +
      `<td>${hasData ? p.siding_squares : ''}</td>` +
      `<td>${hasData ? formatNumber(p.siding_sqft) : ''}</td>` +
      `<td>${hasData ? formatNumber(p.trim_sqft) : ''}</td>` +
      `<td>${hasData ? formatNumber(p.soffit_sqft) : ''}</td>` +
      `<td>${materials}</td>` +
      `<td>${note}</td></tr>`
    );
  }).join('');

  return (
    '<thead><tr>' +
    '<th>Location</th><th>Siding Sq</th><th>Siding SqFt</th>' +
    '<th>Trim SqFt</th><th>Soffit SqFt</th><th>Materials</th><th>Notes</th>' +
    '</tr></thead>' +
    '<tbody>' + rows + '</tbody>'
  );
}

function buildGutterTable(properties: MeasurementRecord[], notesLookup: NotesLookup): string {
  const rows = properties.map((p) => {
    const location = buildLocation(p.street, p.city, p.state, p.zip);
    const pitchLabel = classifyPitch(p.dominant_pitch);
    const hasData = p.gutter_length_ft > 0;
    const key = buildNotesKey(p.street, p.city, p.state, 'gutter');
    const note = hasData ? (notesLookup.get(key) || '') : '';
    return (
      `<tr><td>${location}</td>` +
      `<td>${hasData ? Math.round(p.gutter_length_ft) : ''}</td>` +
      `<td>${p.dominant_pitch}/12 (${pitchLabel})</td>` +
      `<td>${note}</td></tr>`
    );
  }).join('');

  return (
    '<thead><tr>' +
    '<th>Location</th><th>Gutter Length (ft)</th><th>Roof Pitch</th><th>Notes</th>' +
    '</tr></thead>' +
    '<tbody>' + rows + '</tbody>'
  );
}

function buildDoorTable(properties: MeasurementRecord[]): string {
  const rows = properties.map((p) => {
    const location = buildLocation(p.street, p.city, p.state, p.zip);
    return (
      `<tr><td>${location}</td>` +
      `<td>${p.entry_doors || ''}</td>` +
      `<td>${p.sliding_glass_doors || ''}</td></tr>`
    );
  }).join('');

  return (
    '<thead><tr>' +
    '<th>Location</th><th>Entry Doors</th><th>Sliding Glass Doors</th>' +
    '</tr></thead>' +
    '<tbody>' + rows + '</tbody>'
  );
}

function buildTableHTML(service: ServiceType, properties: MeasurementRecord[], notesLookup: NotesLookup): string {
  let tableInner: string;
  switch (service) {
    case 'roofing':
      tableInner = buildRoofingTable(properties, notesLookup);
      break;
    case 'siding':
      tableInner = buildSidingTable(properties, notesLookup);
      break;
    case 'gutter':
      tableInner = buildGutterTable(properties, notesLookup);
      break;
    case 'door':
      tableInner = buildDoorTable(properties);
      break;
  }
  return (
    '<div class="table-wrapper"><figure class="table">' +
    '<table class="warranty-table">' +
    tableInner +
    '</table></figure></div>'
  );
}

// ── Main class ──────────────────────────────────────────────────────────────

class InspectionRewriter {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private cache: Record<string, { paragraph: string; generatedAt: string }> = {};
  private cityGroups: Map<string, MeasurementRecord[]> = new Map();
  private cityStats: Map<string, CityStats> = new Map();
  private aiCallCount = 0;

  constructor() {
    if (!STRAPI_API_TOKEN) throw new Error('STRAPI_API_TOKEN required');

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY required');

    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.anthropic = new Anthropic({ apiKey });

    if (existsSync(CACHE_PATH)) {
      this.cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      console.log(`Loaded ${Object.keys(this.cache).length} cached paragraphs`);
    }
  }

  private saveCache(): void {
    writeFileSync(CACHE_PATH, JSON.stringify(this.cache, null, 2));
  }

  loadMeasurements(): void {
    console.log('Loading hover_measurements.json...');
    const records: MeasurementRecord[] = JSON.parse(readFileSync(MEASUREMENTS_PATH, 'utf-8'));

    // Filter out Unknown cities
    const filtered = records.filter((r) => r.city !== 'Unknown');

    // Group by city, state
    for (const r of filtered) {
      const key = `${r.city}, ${r.state}`;
      if (!this.cityGroups.has(key)) {
        this.cityGroups.set(key, []);
      }
      this.cityGroups.get(key)!.push(r);
    }

    // Compute stats per city
    for (const [key, props] of this.cityGroups) {
      this.cityStats.set(key, {
        properties: props.length,
        total_roof_squares: Math.round(props.reduce((s, p) => s + p.roof_area_sqft, 0) / 100),
        total_roof_sqft: props.reduce((s, p) => s + p.roof_area_sqft, 0),
        total_facets: props.reduce((s, p) => s + p.roof_facets, 0),
        total_siding_squares: Math.round(props.reduce((s, p) => s + p.siding_sqft, 0) / 100),
        total_siding_sqft: props.reduce((s, p) => s + p.siding_sqft, 0),
        total_trim_sqft: props.reduce((s, p) => s + p.trim_sqft, 0),
        total_soffit_sqft: props.reduce((s, p) => s + p.soffit_sqft, 0),
        total_gutter_ft: props.reduce((s, p) => s + p.gutter_length_ft, 0),
        total_eaves_ft: props.reduce((s, p) => s + p.eaves_ft, 0),
        total_entry_doors: props.reduce((s, p) => s + p.entry_doors, 0),
        total_sliding_glass: props.reduce((s, p) => s + p.sliding_glass_doors, 0),
      });
    }

    console.log(`Loaded ${filtered.length} records across ${this.cityGroups.size} cities`);
  }

  private resolveCityKey(cmsCity: string, state: string): string {
    const resolved = CITY_ALIASES[cmsCity] || cmsCity;
    return `${resolved}, ${state}`;
  }

  async generateParagraph(
    service: ServiceType,
    city: string,
    state: string,
    stats: CityStats,
    force: boolean
  ): Promise<string> {
    const cacheKey = `${city}-${state}-${service}`;
    if (!force && this.cache[cacheKey]) {
      return this.cache[cacheKey].paragraph;
    }

    this.aiCallCount++;
    const cityState = `${city}, ${state}`;

    let dataContext: string;
    switch (service) {
      case 'roofing':
        dataContext = `- ${stats.properties} properties inspected\n- ${formatNumber(stats.total_roof_squares)} total squares of roofing\n- ${formatNumber(stats.total_facets)} roof facets`;
        break;
      case 'siding':
        dataContext = `- ${stats.properties} properties inspected\n- ${formatNumber(stats.total_siding_squares)} squares of siding\n- ${formatNumber(stats.total_siding_sqft)} sqft of siding\n- ${formatNumber(stats.total_soffit_sqft)} sqft of soffit`;
        break;
      case 'gutter':
        dataContext = `- ${stats.properties} properties inspected\n- ${formatNumber(stats.total_gutter_ft)} linear feet of gutter lines\n- ${formatNumber(stats.total_eaves_ft)} linear feet of eaves`;
        break;
      case 'door':
        dataContext = `- ${stats.properties} properties inspected\n- ${formatNumber(stats.total_entry_doors)} entry doors\n- ${formatNumber(stats.total_sliding_glass)} sliding glass doors`;
        break;
    }

    const serviceLabels: Record<ServiceType, string> = {
      roofing: 'roof repairs and replacements',
      siding: 'siding installations and repairs',
      gutter: 'gutter services and maintenance',
      door: 'door replacements and installations',
    };

    const prompt = `Write a 2-sentence paragraph for a home improvement company's local service page about ${service} in ${cityState}.

Data from our property inspections:
${dataContext}

Example style (roofing in Annapolis):
"We've recently diagnosed 71 Annapolis properties, providing real-time assessments and expert roof repairs. Our recent service logs prove we have the local expertise to keep your roof "Leak-Proof" in every rainy season."

Rules:
- Write exactly 2 sentences in a natural, conversational tone
- First sentence: mention the number of properties diagnosed/assessed in ${city} and what we provide (${serviceLabels[service]})
- Second sentence: reference our service logs/local expertise as proof, end with a specific quality promise relevant to ${service}
- Use the real numbers from the data naturally
- Sound like a human wrote it — confident, local, specific
- Do NOT use generic marketing filler or overly formal language
- Output ONLY the paragraph text, no HTML, no quotes, no markdown`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{ role: 'user', content: prompt }],
      });

      const text = (response.content[0] as { type: string; text: string }).text.trim();

      this.cache[cacheKey] = { paragraph: text, generatedAt: new Date().toISOString() };
      this.saveCache();

      return text;
    } catch (error: any) {
      console.error(`   AI error: ${error.message}`);
      // Fallback to template
      return `We've recently diagnosed ${stats.properties} ${city} properties, providing real-time assessments and expert ${serviceLabels[service]}. Our recent service logs prove we have the local expertise to deliver quality results in every season.`;
    }
  }

  buildFullHTML(
    service: ServiceType,
    city: string,
    stats: CityStats,
    properties: MeasurementRecord[],
    paragraph: string,
    notesLookup: NotesLookup
  ): string {
    const h2 = generateH2(service, city, stats);
    const tableHTML = buildTableHTML(service, properties, notesLookup);
    return `<h2>${h2}</h2>\n<p>${paragraph}</p>\n${tableHTML}`;
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
          'fields[0]': 'title',
          'fields[1]': 'slug',
          'fields[2]': 'serviceType',
          'fields[3]': 'city',
          'fields[4]': 'state',
          'fields[5]': 'inspectionRichText',
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
        data: { inspectionRichText: html },
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
   * Check if a service type has meaningful data to display
   */
  private hasServiceData(service: ServiceType, stats: CityStats): boolean {
    switch (service) {
      case 'roofing':
        return stats.total_roof_sqft > 0;
      case 'siding':
        return stats.total_siding_sqft > 0;
      case 'gutter':
        return stats.total_gutter_ft > 0 || stats.total_eaves_ft > 0;
      case 'door':
        return stats.total_entry_doors > 0 || stats.total_sliding_glass > 0;
    }
  }

  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
    service?: string;
    city?: string;
    force?: boolean;
    skipAi?: boolean;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, service, city: cityFilter, force = false, skipAi = false } = options;

    console.log('Rewrite inspectionRichText\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log(`AI: ${skipAi ? 'DISABLED (template)' : 'ENABLED'}`);
    console.log(`Force regenerate: ${force}`);
    if (service) console.log(`Service filter: ${service}`);
    if (cityFilter) console.log(`City filter: ${cityFilter}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    this.loadMeasurements();
    const notesLookup = loadNotesLookup();

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`Filtered to slug: ${slug} (${pages.length} match)`);
    }

    if (service) {
      pages = pages.filter((p) => p.serviceType === service);
      console.log(`Filtered to ${pages.length} ${service} pages`);
    }

    // Only pages with serviceType that we handle
    const validServices = new Set(['roofing', 'siding', 'gutter', 'door']);
    pages = pages.filter((p) => {
      if (!p.serviceType || !validServices.has(p.serviceType)) return false;
      if (!p.city) return false;
      return true;
    });

    if (cityFilter) {
      pages = pages.filter((p) => p.city!.toLowerCase().includes(cityFilter.toLowerCase()));
      console.log(`Filtered to ${pages.length} pages matching city "${cityFilter}"`);
    }

    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\nNo pages found to update.');
      return;
    }

    console.log(`\nProcessing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    const serviceLabels: Record<string, string> = {
      roofing: 'roof repairs and replacements',
      siding: 'siding installations and repairs',
      gutter: 'gutter services and maintenance',
      door: 'door replacements and installations',
    };

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const svc = page.serviceType as ServiceType;
      const city = page.city!;
      const state = page.state || 'MD';

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}, State: ${state}, Service: ${svc}`);

      // Resolve city to measurement key
      const cityKey = this.resolveCityKey(city, state);
      const stats = this.cityStats.get(cityKey);
      const properties = this.cityGroups.get(cityKey);

      if (!stats || !properties) {
        console.log(`   Skipped (no measurement data for "${cityKey}")`);
        skippedCount++;
        continue;
      }

      if (!this.hasServiceData(svc, stats)) {
        console.log(`   Skipped (zero ${svc} data)`);
        skippedCount++;
        continue;
      }

      // Generate paragraph
      let paragraph: string;
      if (skipAi) {
        paragraph = `We've recently diagnosed ${stats.properties} ${city} properties, providing real-time assessments and expert ${serviceLabels[svc]}. Our recent service logs prove we have the local expertise to deliver quality results in every season.`;
      } else {
        paragraph = await this.generateParagraph(svc, city, state, stats, force);
        // Rate limit
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // Build full HTML
      const html = this.buildFullHTML(svc, city, stats, properties, paragraph, notesLookup);
      const h2 = generateH2(svc, city, stats);

      console.log(`   H2: ${h2}`);
      console.log(`   Paragraph: ${paragraph.slice(0, 100)}...`);
      console.log(`   Table rows: ${properties.length}`);

      if (dryRun) {
        successCount++;
        continue;
      }

      const success = await this.updatePage(page, html);
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
    console.log(`Skipped: ${skippedCount} pages`);
    console.log(`Failed: ${errorCount} pages`);
    console.log(`Total processed: ${pages.length} pages`);
    console.log(`AI calls made: ${this.aiCallCount}`);
    console.log('='.repeat(60));
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isForce = args.includes('--force');
const skipAi = args.includes('--skip-ai');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const serviceArg = args.find((a) => a.startsWith('--service='));
const service = serviceArg ? serviceArg.split('=')[1] : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;
const cityArg = args.find((a) => a.startsWith('--city='));
const city = cityArg ? cityArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/rewrite-inspection-richtext.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --service=<type>   Only update specific service type (roofing, siding, gutter, door)
  --slug=<slug>      Only update a specific page by slug
  --city=<name>      Filter by city name (partial match)
  --force            Ignore cache and regenerate all paragraphs
  --skip-ai          Use template text instead of AI for paragraphs
  --help             Show this help message

Examples:
  npx tsx scripts/rewrite-inspection-richtext.ts --dry-run --limit=5
  npx tsx scripts/rewrite-inspection-richtext.ts --city=Annapolis --service=roofing --dry-run
  npx tsx scripts/rewrite-inspection-richtext.ts --slug=annapolis-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/rewrite-inspection-richtext.ts --service=roofing --limit=10
  npx tsx scripts/rewrite-inspection-richtext.ts --skip-ai
`);
  process.exit(0);
}

const rewriter = new InspectionRewriter();
rewriter.run({ dryRun: isDryRun, limit, service, slug, city, force: isForce, skipAi }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
