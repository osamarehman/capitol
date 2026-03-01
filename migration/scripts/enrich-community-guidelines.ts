#!/usr/bin/env tsx
/**
 * Enrich communityGuidelinesRichText with HOA Contact Details
 *
 * This script:
 * 1. Loads HOA resources from CSV (grouped by city)
 * 2. Fetches all published service pages with communityGuidelinesRichText
 * 3. Per unique city, calls OpenAI (gpt-4o) to enrich HOA entries with
 *    email, phone, and mailing address
 * 4. Caches AI results per city so pages sharing a city reuse the same response
 * 5. Builds deterministic HTML in the new cleaner format (<h2>/<h3>/<h4>)
 * 6. Backs up old values, then updates Strapi via PUT
 *
 * Usage:
 *   npx tsx scripts/enrich-community-guidelines.ts --dry-run
 *   npx tsx scripts/enrich-community-guidelines.ts --dry-run --limit=3
 *   npx tsx scripts/enrich-community-guidelines.ts --slug=odenton-maryland-roofing-company-near-you
 *   npx tsx scripts/enrich-community-guidelines.ts --service=roofing --limit=5
 *   npx tsx scripts/enrich-community-guidelines.ts
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import OpenAI from 'openai';
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const HOA_CSV_PATH = join(__dirname, '../../hoa_resources.csv');
const BACKUP_PATH = join(__dirname, '../data/communityGuidelinesRichText-backup.json');
const AI_CACHE_PATH = join(__dirname, '../data/enriched-hoa-cache.json');

// Pages to exclude from updates
const EXCLUDED_SLUGS: string[] = [];

// Service type mappings (slug keyword → display name)
const SERVICE_MAPPINGS: Record<string, string> = {
  'roofing': 'roofing',
  'flat-roofing': 'roofing',
  'commercial-roofing': 'roofing',
  'siding': 'siding',
  'window': 'window replacement',
  'door': 'door replacement',
  'gutter': 'gutter',
  'deck': 'deck building',
  'trim': 'exterior trim',
  'patio': 'patio',
};

// ── Types ─────────────────────────────────────────────────────────────

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  communityGuidelinesRichText?: string;
}

interface HOAResource {
  city: string;
  state: string;
  hoa_name: string;
  hoa_url: string;
  is_community_based: string;
}

interface EnrichedHOA {
  hoaName: string;
  website: string | null;
  email: string | null;
  phone: string | null;
  mailingAddress: string | null;
}

interface AICache {
  [cityKey: string]: {
    enrichedAt: string;
    hoas: EnrichedHOA[];
  };
}

// ── Main class ────────────────────────────────────────────────────────

class CommunityGuidelinesEnricher {
  private strapiClient: AxiosInstance;
  private openai: OpenAI;
  private hoaData: Map<string, HOAResource[]> = new Map();
  private aiCache: AICache = {};
  private aiCallCount = 0;

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }

    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.openai = new OpenAI({ apiKey: openaiKey });
  }

  // ── CSV loading ─────────────────────────────────────────────────────

  loadHOAData(): void {
    console.log('📂 Loading HOA resources from CSV...');

    if (!existsSync(HOA_CSV_PATH)) {
      throw new Error(`HOA CSV file not found: ${HOA_CSV_PATH}`);
    }

    const content = readFileSync(HOA_CSV_PATH, 'utf-8');
    const records: HOAResource[] = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    for (const record of records) {
      const cityKey = record.city.toLowerCase().trim();
      if (!this.hoaData.has(cityKey)) {
        this.hoaData.set(cityKey, []);
      }
      this.hoaData.get(cityKey)!.push(record);
    }

    console.log(`✅ Loaded HOA data for ${this.hoaData.size} cities (${records.length} total records)`);
  }

  // ── AI cache ────────────────────────────────────────────────────────

  loadAICache(): void {
    try {
      if (existsSync(AI_CACHE_PATH)) {
        const content = readFileSync(AI_CACHE_PATH, 'utf-8');
        this.aiCache = JSON.parse(content);
        console.log(`📦 Loaded AI cache with ${Object.keys(this.aiCache).length} cities`);
      }
    } catch {
      console.log('⚠️ Could not load AI cache, starting fresh');
      this.aiCache = {};
    }
  }

  saveAICache(): void {
    try {
      const dir = dirname(AI_CACHE_PATH);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(AI_CACHE_PATH, JSON.stringify(this.aiCache, null, 2));
      console.log(`💾 Saved AI cache (${Object.keys(this.aiCache).length} cities)`);
    } catch (error) {
      console.error('⚠️ Could not save AI cache');
    }
  }

  // ── City/service extraction ─────────────────────────────────────────

  private extractCityFromPage(page: LocalPage): { city: string; state: string } {
    if (page.title) {
      const parts = page.title.split(' - ');
      if (parts.length >= 3) {
        let city = parts[1].trim();
        let state = parts[2].trim();

        if (city === 'DC' || city === 'Washington, DC') {
          city = 'Washington DC';
          state = 'DC';
        }

        return { city, state };
      }
    }

    const slug = page.slug;
    const isDC = slug.includes('-dc-') || slug.startsWith('washington-dc');
    const cleanSlug = slug
      .replace(/-maryland-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio).*$/, '');

    let city = cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    if (isDC) {
      city = 'Washington DC';
      return { city, state: 'DC' };
    }

    return { city: city || 'Maryland', state: 'MD' };
  }

  private extractServiceFromSlug(slug: string): string {
    const keywords = Object.keys(SERVICE_MAPPINGS).sort((a, b) => b.length - a.length);
    for (const keyword of keywords) {
      if (slug.includes(keyword)) {
        return SERVICE_MAPPINGS[keyword];
      }
    }
    return 'exterior work';
  }

  // ── Strapi fetch ────────────────────────────────────────────────────

  async fetchAllPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published pages from Strapi...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get('/services', {
        params: {
          status: 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
          'fields[0]': 'slug',
          'fields[1]': 'title',
          'fields[2]': 'communityGuidelinesRichText',
        },
      });

      const pages = response.data.data as LocalPage[];
      allPages.push(...pages);

      const { pageCount, total } = response.data.meta.pagination;
      console.log(`   Fetched page ${page}/${pageCount} (${allPages.length}/${total})`);

      if (page >= pageCount) break;
      page++;
    }

    console.log(`✅ Found ${allPages.length} published pages`);
    return allPages;
  }

  // ── AI enrichment ───────────────────────────────────────────────────

  async enrichHOAsForCity(cityKey: string, cityName: string, state: string, hoas: HOAResource[]): Promise<EnrichedHOA[]> {
    // Check cache first
    const cached = this.aiCache[cityKey];
    if (cached) {
      console.log(`   📦 Using cached AI data for ${cityName}`);
      return cached.hoas;
    }

    // Build the HOA list for the prompt
    const hoaList = hoas.map((h) => {
      const url = h.hoa_url ? h.hoa_url : 'No website known';
      const type = (h.is_community_based === 'true' || h.is_community_based === 'TRUE')
        ? ' (community-based, no website)'
        : '';
      return `- ${h.hoa_name}${type}: ${url}`;
    }).join('\n');

    const prompt = `You are a research assistant. I need contact information for HOA and community associations in ${cityName}, ${state}.

Here are the associations I need enriched:
${hoaList}

For EACH association above, return a JSON array with these fields:
- "hoaName": exact name as provided above
- "website": the URL if known (use the one provided, or null)
- "email": public contact email if you know it (or null)
- "phone": public phone number if you know it (or null)
- "mailingAddress": mailing/office address if you know it (or null)

CRITICAL RULES:
1. Return ONLY a valid JSON array, no markdown fences, no explanation
2. Keep the exact hoaName as provided
3. Keep the website URL as provided (don't change it)
4. Only include contact details you are reasonably confident about
5. Use null for any field you don't know — do NOT make up information
6. Phone numbers should be formatted as (XXX) XXX-XXXX
7. Return one object per HOA in the same order as listed above

Return ONLY the JSON array.`;

    try {
      this.aiCallCount++;
      console.log(`   🤖 Calling AI for ${cityName} (${hoas.length} HOAs)...`);

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 4000,
        temperature: 0.1,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from OpenAI');
      }

      // Clean up response — strip markdown fences if present
      let cleaned = content.trim();
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');

      const enriched: EnrichedHOA[] = JSON.parse(cleaned);

      // Validate structure
      if (!Array.isArray(enriched)) {
        throw new Error('AI response is not an array');
      }

      // Cache the result
      this.aiCache[cityKey] = {
        enrichedAt: new Date().toISOString(),
        hoas: enriched,
      };

      // Rate limit
      await new Promise((r) => setTimeout(r, 1500));

      return enriched;
    } catch (error: any) {
      console.error(`   ❌ AI error for ${cityName}: ${error.message}`);
      // Fallback: return basic data without enrichment
      return hoas.map((h) => ({
        hoaName: h.hoa_name,
        website: h.hoa_url || null,
        email: null,
        phone: null,
        mailingAddress: null,
      }));
    }
  }

  // ── HTML builder ────────────────────────────────────────────────────

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  buildEnrichedHTML(city: string, state: string, serviceName: string, enrichedHoas: EnrichedHOA[]): string {
    const parts: string[] = [];
    const stateDisplay = state === 'DC' ? 'DC' : 'Maryland';

    // Main heading
    parts.push(`<h2>HOA &amp; Community Association Links — ${this.escapeHtml(city)}, ${stateDisplay}</h2>`);

    // Intro paragraph
    parts.push(`<p>Many ${this.escapeHtml(city)} neighborhoods are governed by homeowner or community associations that enforce architectural and exterior improvement guidelines. To make things easier for you, we've gathered direct links to local HOA and community association websites below — along with phone numbers and emails where publicly available — so you can quickly locate your association and review their requirements.</p>`);

    // Section heading
    parts.push(`<h3>${this.escapeHtml(city)} HOA &amp; Community Association Websites</h3>`);

    // Per-HOA entries
    for (const hoa of enrichedHoas) {
      parts.push(`<h4>${this.escapeHtml(hoa.hoaName)}</h4>`);

      const lines: string[] = [];

      // Website
      if (hoa.website) {
        lines.push(`<strong>Website:</strong> <a href="${this.escapeHtml(hoa.website)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(hoa.website)}</a>`);
      } else {
        lines.push(`<strong>Website:</strong> <i>No public website listed</i>`);
      }

      // Email
      if (hoa.email) {
        lines.push(`<strong>Email:</strong> <a href="mailto:${this.escapeHtml(hoa.email)}">${this.escapeHtml(hoa.email)}</a>`);
      } else {
        lines.push(`<strong>Email:</strong> <i>No public email listed — try contacting via website.</i>`);
      }

      // Phone
      if (hoa.phone) {
        const phoneDigits = hoa.phone.replace(/\D/g, '');
        lines.push(`<strong>Phone:</strong> <a href="tel:${phoneDigits}">${this.escapeHtml(hoa.phone)}</a>`);
      } else {
        lines.push(`<strong>Phone:</strong> <i>No public phone listed — email is best.</i>`);
      }

      // Mailing Address
      if (hoa.mailingAddress) {
        lines.push(`<strong>Mailing Address:</strong> ${this.escapeHtml(hoa.mailingAddress)}`);
      } else {
        lines.push(`<strong>Mailing Address:</strong> <i>No public mailing address listed.</i>`);
      }

      parts.push(`<p>\n${lines.join('<br>\n')}\n</p>`);
    }

    // Static footer
    parts.push(`<hr>`);
    parts.push(`<h3>⚠️ Important — Check With Your HOA Before Starting</h3>`);
    parts.push(`<p>If your home is located in an HOA or community association, it is very important to contact your association and obtain their current exterior and architectural guidelines before starting any project.</p>`);
    parts.push(`<p>Capitol Improvements does not interpret, modify, or override HOA rules. Once you provide your association's guidelines, we will recommend materials and systems that comply so your project can move forward smoothly and without delays.</p>`);

    return parts.join('\n');
  }

  buildMinimalHTML(city: string, state: string, serviceName: string): string {
    const parts: string[] = [];
    const stateDisplay = state === 'DC' ? 'DC' : 'Maryland';

    parts.push(`<h2>HOA &amp; Community Association Links — ${this.escapeHtml(city)}, ${stateDisplay}</h2>`);
    parts.push(`<p>Many ${this.escapeHtml(city)} neighborhoods are governed by homeowner or community associations that enforce architectural and exterior improvement guidelines. To make things easier for you, we've gathered direct links to local HOA and community association websites below — along with phone numbers and emails where publicly available — so you can quickly locate your association and review their requirements.</p>`);
    parts.push(`<hr>`);
    parts.push(`<h3>⚠️ Important — Check With Your HOA Before Starting</h3>`);
    parts.push(`<p>If your home is located in an HOA or community association, it is very important to contact your association and obtain their current exterior and architectural guidelines before starting any project.</p>`);
    parts.push(`<p>Capitol Improvements does not interpret, modify, or override HOA rules. Once you provide your association's guidelines, we will recommend materials and systems that comply so your project can move forward smoothly and without delays.</p>`);

    return parts.join('\n');
  }

  // ── Update Strapi ───────────────────────────────────────────────────

  async updatePage(page: LocalPage, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: { communityGuidelinesRichText: html },
      });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${page.slug}`);
      if (error.response?.data) {
        console.error('   Strapi error:', JSON.stringify(error.response.data, null, 2));
      }
      return false;
    }
  }

  // ── Main run ────────────────────────────────────────────────────────

  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
    serviceFilter?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, serviceFilter } = options;

    console.log('🏘️ Enrich Community Guidelines with HOA Contact Details\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (serviceFilter) console.log(`Service filter: ${serviceFilter}`);
    console.log('');

    // Step 1: Load HOA data and AI cache
    this.loadHOAData();
    this.loadAICache();

    // Step 2: Fetch pages
    let pages = await this.fetchAllPages();

    // Filter out excluded pages
    const beforeExclusion = pages.length;
    pages = pages.filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
    if (beforeExclusion !== pages.length) {
      console.log(`\n📌 Excluded ${beforeExclusion - pages.length} page(s)`);
    }

    // Filter by slug
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to ${pages.length} page(s) matching slug: ${slug}`);
    }

    // Filter by service
    if (serviceFilter) {
      pages = pages.filter((p) => p.slug.includes(serviceFilter));
      console.log(`📌 Filtered to ${pages.length} page(s) containing: ${serviceFilter}`);
    }

    // Apply limit
    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} page(s)`);
    }

    if (pages.length === 0) {
      console.log('\n⚠️ No pages found to update');
      return;
    }

    // Step 3: Backup old values
    if (!dryRun) {
      const backup: Record<string, { slug: string; documentId: string; communityGuidelinesRichText: string | null }> = {};
      for (const page of pages) {
        backup[page.documentId] = {
          slug: page.slug,
          documentId: page.documentId,
          communityGuidelinesRichText: page.communityGuidelinesRichText || null,
        };
      }
      const dir = dirname(BACKUP_PATH);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(BACKUP_PATH, JSON.stringify(backup, null, 2));
      console.log(`\n💾 Backed up old values to ${BACKUP_PATH}`);
    }

    // Step 4: Pre-enrich all unique cities via AI (to maximize cache hits)
    const citySet = new Map<string, { city: string; state: string; hoas: HOAResource[] }>();
    for (const page of pages) {
      const { city, state } = this.extractCityFromPage(page);
      const cityKey = city.toLowerCase().trim();
      if (!citySet.has(cityKey)) {
        const hoas = this.hoaData.get(cityKey) || [];
        citySet.set(cityKey, { city, state, hoas });
      }
    }

    console.log(`\n🌐 Enriching HOA data for ${citySet.size} unique cities...\n`);

    const enrichedByCity = new Map<string, EnrichedHOA[]>();
    let cityIndex = 0;
    for (const [cityKey, { city, state, hoas }] of citySet) {
      cityIndex++;
      console.log(`[City ${cityIndex}/${citySet.size}] ${city}, ${state} (${hoas.length} HOAs)`);

      if (hoas.length === 0) {
        console.log(`   ⏭️ No HOA data — will use minimal HTML`);
        enrichedByCity.set(cityKey, []);
        continue;
      }

      const enriched = await this.enrichHOAsForCity(cityKey, city, state, hoas);
      enrichedByCity.set(cityKey, enriched);
      console.log(`   ✅ Enriched ${enriched.length} HOAs`);
    }

    // Save AI cache after all enrichment
    this.saveAICache();

    // Step 5: Process pages
    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const errors: Array<{ slug: string; error: string }> = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { city, state } = this.extractCityFromPage(page);
      const cityKey = city.toLowerCase().trim();
      const serviceName = this.extractServiceFromSlug(page.slug);
      const enrichedHoas = enrichedByCity.get(cityKey) || [];

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}, ${state}, Service: ${serviceName}, HOAs: ${enrichedHoas.length}`);

      // Build HTML
      const htmlContent = enrichedHoas.length > 0
        ? this.buildEnrichedHTML(city, state, serviceName, enrichedHoas)
        : this.buildMinimalHTML(city, state, serviceName);

      if (dryRun) {
        console.log(`   📝 Preview (first 400 chars):\n      ${htmlContent.substring(0, 400).replace(/\n/g, '\n      ')}...`);
        successCount++;
        continue;
      }

      try {
        const success = await this.updatePage(page, htmlContent);
        if (success) {
          console.log(`   ✅ Updated`);
          successCount++;
        } else {
          errorCount++;
          errors.push({ slug: page.slug, error: 'Update failed' });
        }
        // Rate limit Strapi writes
        await new Promise((r) => setTimeout(r, 100));
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
        errors.push({ slug: page.slug, error: error.message });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ ${dryRun ? 'Would update' : 'Updated'}: ${successCount} pages`);
    console.log(`⏭️ Skipped: ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log(`🤖 AI calls made: ${this.aiCallCount} (${Object.keys(this.aiCache).length} cities cached)`);
    console.log('='.repeat(60));

    if (errors.length > 0 && errors.length <= 20) {
      console.log('\n❌ ERRORS:');
      for (const e of errors) {
        console.log(`  - ${e.slug}: ${e.error}`);
      }
    }

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Done! Verify at: ${STRAPI_URL}/admin`);
    }
  }
}

// ── CLI ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Usage: npm run enrich-community-guidelines [options]

Options:
  --dry-run           Preview changes without updating Strapi
  --limit=N           Process only first N pages
  --slug=<slug>       Update a specific page only
  --service=<keyword> Filter by service type (roofing, siding, window, etc.)
  --help              Show this help message

How it works:
  1. Loads HOA data from hoa_resources.csv (grouped by city)
  2. Fetches all published service pages from Strapi
  3. For each unique city, calls OpenAI (gpt-4o) to enrich HOA entries
     with email, phone, and mailing address
  4. Caches AI results per city (saved to migration/data/enriched-hoa-cache.json)
  5. Builds clean HTML with <h2>/<h3>/<h4> headings and contact details
  6. Backs up old values to migration/data/communityGuidelinesRichText-backup.json
  7. Updates Strapi via PUT

AI Caching:
  - AI results are cached per city in enriched-hoa-cache.json
  - Re-running the script will reuse cached results (no duplicate AI calls)
  - Delete the cache file to force fresh AI enrichment

Examples:
  npm run enrich-community-guidelines -- --dry-run --limit=3
  npm run enrich-community-guidelines -- --slug=odenton-maryland-roofing-company-near-you
  npm run enrich-community-guidelines -- --service=roofing --limit=5
  npm run enrich-community-guidelines
`);
  process.exit(0);
}

const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;
const serviceArg = args.find((a) => a.startsWith('--service='));
const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;

const enricher = new CommunityGuidelinesEnricher();
enricher.run({ dryRun: isDryRun, limit, slug, serviceFilter }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
