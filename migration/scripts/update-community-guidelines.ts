#!/usr/bin/env tsx
/**
 * Update Community Guidelines Rich Text for All Service Pages
 *
 * This script:
 * 1. Reads HOA resources from CSV file
 * 2. Verifies that HOA URLs actually exist (HTTP HEAD request)
 * 3. Fetches all published local pages from Strapi
 * 4. Generates city-specific community guidelines HTML
 * 5. Updates the communityGuidelinesRichText field
 *
 * URLs that fail verification are displayed as text-only (no link)
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const HOA_CSV_PATH = join(__dirname, '../../hoa_resources.csv');
const URL_VERIFICATION_CACHE_PATH = join(__dirname, '../../url_verification_cache.json');

// URL verification settings
const URL_VERIFICATION_TIMEOUT = 10000; // 10 seconds
const URL_VERIFICATION_CONCURRENCY = 5; // verify 5 URLs at a time

// Pages to exclude from updates
const EXCLUDED_SLUGS = [
  'pasadena-maryland-roofing-company-near-you',
];

// Service type mappings
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

interface VerifiedHOAResource extends HOAResource {
  url_verified: boolean; // true if URL works, false if broken/unreachable
}

interface URLVerificationCache {
  [url: string]: {
    verified: boolean;
    checkedAt: string;
    error?: string;
  };
}

class CommunityGuidelinesUpdater {
  private strapiClient: AxiosInstance;
  private hoaData: Map<string, HOAResource[]> = new Map();
  private verifiedHoaData: Map<string, VerifiedHOAResource[]> = new Map();
  private urlVerificationCache: URLVerificationCache = {};
  private verificationStats = { verified: 0, failed: 0, skipped: 0 };
  private facebookRemovedCount = 0;

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
   * Check if a URL is a Facebook link
   */
  private isFacebookUrl(url: string): boolean {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('facebook.com') ||
           lowerUrl.includes('fb.com') ||
           lowerUrl.includes('fb.me');
  }

  /**
   * Load URL verification cache from file
   */
  private loadVerificationCache(): void {
    try {
      if (existsSync(URL_VERIFICATION_CACHE_PATH)) {
        const content = readFileSync(URL_VERIFICATION_CACHE_PATH, 'utf-8');
        this.urlVerificationCache = JSON.parse(content);
        console.log(`📦 Loaded ${Object.keys(this.urlVerificationCache).length} cached URL verifications`);
      }
    } catch (error) {
      console.log('⚠️ Could not load URL verification cache, starting fresh');
      this.urlVerificationCache = {};
    }
  }

  /**
   * Save URL verification cache to file
   */
  private saveVerificationCache(): void {
    try {
      writeFileSync(URL_VERIFICATION_CACHE_PATH, JSON.stringify(this.urlVerificationCache, null, 2));
      console.log(`💾 Saved URL verification cache`);
    } catch (error) {
      console.error('⚠️ Could not save URL verification cache');
    }
  }

  /**
   * Verify a single URL exists (HEAD request with fallback to GET)
   */
  private async verifyUrl(url: string): Promise<{ verified: boolean; error?: string }> {
    // Check cache first (cache valid for 24 hours)
    const cached = this.urlVerificationCache[url];
    if (cached) {
      const cacheAge = Date.now() - new Date(cached.checkedAt).getTime();
      const cacheValidMs = 24 * 60 * 60 * 1000; // 24 hours
      if (cacheAge < cacheValidMs) {
        return { verified: cached.verified, error: cached.error };
      }
    }

    try {
      // Try HEAD request first (faster)
      await axios.head(url, {
        timeout: URL_VERIFICATION_TIMEOUT,
        maxRedirects: 5,
        validateStatus: (status) => status >= 200 && status < 400,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HOA-Verifier/1.0)',
        },
      });

      this.urlVerificationCache[url] = {
        verified: true,
        checkedAt: new Date().toISOString(),
      };
      return { verified: true };
    } catch (headError: any) {
      // Fallback to GET request (some servers don't support HEAD)
      try {
        await axios.get(url, {
          timeout: URL_VERIFICATION_TIMEOUT,
          maxRedirects: 5,
          validateStatus: (status) => status >= 200 && status < 400,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; HOA-Verifier/1.0)',
          },
          // Only fetch headers, abort after response starts
          responseType: 'stream',
        });

        this.urlVerificationCache[url] = {
          verified: true,
          checkedAt: new Date().toISOString(),
        };
        return { verified: true };
      } catch (getError: any) {
        const errorMsg = getError.code || getError.response?.status || getError.message;
        this.urlVerificationCache[url] = {
          verified: false,
          checkedAt: new Date().toISOString(),
          error: String(errorMsg),
        };
        return { verified: false, error: String(errorMsg) };
      }
    }
  }

  /**
   * Verify all HOA URLs in batches
   */
  async verifyAllUrls(skipVerification: boolean = false, removeFacebook: boolean = false): Promise<void> {
    if (skipVerification) {
      console.log('\n⏭️ Skipping URL verification (using cached results only)');
      // Use cached results only
      for (const [city, hoas] of this.hoaData) {
        const verifiedHoas: VerifiedHOAResource[] = hoas.map((hoa) => {
          // Filter out Facebook URLs if flag is set
          if (removeFacebook && this.isFacebookUrl(hoa.hoa_url)) {
            console.log(`   📘 Removing Facebook link: ${hoa.hoa_name} (${hoa.hoa_url})`);
            this.facebookRemovedCount++;
            return { ...hoa, hoa_url: '', url_verified: false };
          }
          if (!hoa.hoa_url || hoa.is_community_based === 'true' || hoa.is_community_based === 'TRUE') {
            return { ...hoa, url_verified: false };
          }
          const cached = this.urlVerificationCache[hoa.hoa_url];
          return { ...hoa, url_verified: cached?.verified ?? false };
        });
        this.verifiedHoaData.set(city, verifiedHoas);
      }
      return;
    }

    console.log('\n🔍 Verifying HOA URLs...');

    // Collect all unique URLs to verify (excluding Facebook if flag is set)
    const urlsToVerify = new Set<string>();
    const facebookUrls: string[] = [];
    for (const hoas of this.hoaData.values()) {
      for (const hoa of hoas) {
        if (hoa.hoa_url && hoa.is_community_based !== 'true' && hoa.is_community_based !== 'TRUE') {
          if (removeFacebook && this.isFacebookUrl(hoa.hoa_url)) {
            facebookUrls.push(hoa.hoa_url);
          } else {
            urlsToVerify.add(hoa.hoa_url);
          }
        }
      }
    }

    if (removeFacebook && facebookUrls.length > 0) {
      console.log(`   📘 Skipping ${facebookUrls.length} Facebook URL(s) (will be removed)`);
      this.facebookRemovedCount = facebookUrls.length;
    }

    console.log(`   Found ${urlsToVerify.size} unique URLs to verify`);

    // Verify URLs in batches
    const urls = Array.from(urlsToVerify);
    let processed = 0;
    const brokenUrls: Array<{ url: string; error: string }> = [];

    for (let i = 0; i < urls.length; i += URL_VERIFICATION_CONCURRENCY) {
      const batch = urls.slice(i, i + URL_VERIFICATION_CONCURRENCY);
      const results = await Promise.all(
        batch.map(async (url) => {
          const result = await this.verifyUrl(url);
          return { url, ...result };
        })
      );

      for (const result of results) {
        if (result.verified) {
          this.verificationStats.verified++;
        } else {
          this.verificationStats.failed++;
          brokenUrls.push({ url: result.url, error: result.error || 'Unknown error' });
        }
      }

      processed += batch.length;
      process.stdout.write(`\r   Progress: ${processed}/${urls.length} URLs verified`);
    }

    console.log('\n');

    // Save cache
    this.saveVerificationCache();

    // Report broken URLs
    if (brokenUrls.length > 0) {
      console.log(`\n⚠️ Found ${brokenUrls.length} broken/unreachable URLs:`);
      for (const { url, error } of brokenUrls.slice(0, 20)) {
        console.log(`   ❌ ${url} (${error})`);
      }
      if (brokenUrls.length > 20) {
        console.log(`   ... and ${brokenUrls.length - 20} more`);
      }
    }

    console.log(`\n📊 URL Verification Summary:`);
    console.log(`   ✅ Verified: ${this.verificationStats.verified}`);
    console.log(`   ❌ Broken: ${this.verificationStats.failed}`);

    // Build verified HOA data map
    for (const [city, hoas] of this.hoaData) {
      const verifiedHoas: VerifiedHOAResource[] = hoas.map((hoa) => {
        // Filter out Facebook URLs if flag is set
        if (removeFacebook && this.isFacebookUrl(hoa.hoa_url)) {
          return { ...hoa, hoa_url: '', url_verified: false };
        }
        if (!hoa.hoa_url || hoa.is_community_based === 'true' || hoa.is_community_based === 'TRUE') {
          return { ...hoa, url_verified: false };
        }
        const cached = this.urlVerificationCache[hoa.hoa_url];
        return { ...hoa, url_verified: cached?.verified ?? false };
      });
      this.verifiedHoaData.set(city, verifiedHoas);
    }
  }

  /**
   * Get verified HOA resources for a city
   */
  getVerifiedHOAsForCity(city: string): VerifiedHOAResource[] {
    const cityKey = city.toLowerCase().trim();
    return this.verifiedHoaData.get(cityKey) || [];
  }

  /**
   * Load HOA data from CSV
   */
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

    // Group by city (case-insensitive)
    for (const record of records) {
      const cityKey = record.city.toLowerCase().trim();
      if (!this.hoaData.has(cityKey)) {
        this.hoaData.set(cityKey, []);
      }
      this.hoaData.get(cityKey)!.push(record);
    }

    console.log(`✅ Loaded HOA data for ${this.hoaData.size} cities (${records.length} total records)`);
  }

  /**
   * Get HOA resources for a city
   */
  getHOAsForCity(city: string): HOAResource[] {
    const cityKey = city.toLowerCase().trim();
    return this.hoaData.get(cityKey) || [];
  }

  /**
   * Extract city and state from page title
   */
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

    // Fallback from slug
    const slug = page.slug;
    const cleanSlug = slug
      .replace(/-maryland-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio).*$/, '');

    const city = cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return { city: city || 'Maryland', state: 'MD' };
  }

  /**
   * Extract service type from slug
   */
  private extractServiceFromSlug(slug: string): string {
    const keywords = Object.keys(SERVICE_MAPPINGS).sort((a, b) => b.length - a.length);
    for (const keyword of keywords) {
      if (slug.includes(keyword)) {
        return SERVICE_MAPPINGS[keyword];
      }
    }
    return 'exterior work';
  }

  /**
   * Generate the community guidelines HTML (using verified HOA data)
   */
  generateCommunityGuidelinesHTML(
    city: string,
    serviceName: string,
    hoas: VerifiedHOAResource[]
  ): string {
    // Generate HOA list items
    let hoaListItems = '';

    for (const hoa of hoas) {
      const isCommunityBased = hoa.is_community_based === 'true' || hoa.is_community_based === 'TRUE';
      const hasVerifiedUrl = hoa.hoa_url && hoa.url_verified;

      if (isCommunityBased || !hoa.hoa_url || !hasVerifiedUrl) {
        // Community-based OR no URL OR URL failed verification - show name only (no meta text)
        hoaListItems += `
        <li class="hoa-item hoa-item--static">
            <span class="hoa-name">${this.escapeHtml(hoa.hoa_name)}</span>
        </li>`;
      } else {
        // Has verified website - create clickable link
        const displayUrl = hoa.hoa_url
          .replace(/^https?:\/\//, '')
          .replace(/^www\./, '')
          .replace(/\/$/, '');

        hoaListItems += `
        <li class="hoa-item">
            <a class="hoa-link" target="_blank" rel="noopener noreferrer" href="${this.escapeHtml(hoa.hoa_url)}"><span class="hoa-name">${this.escapeHtml(hoa.hoa_name)}</span> <span class="hoa-url">${this.escapeHtml(displayUrl)}</span></a>
        </li>`;
      }
    }

    return `<header class="hoa-header">
    <h2>
        Homeowner Associations (HOA) &amp; Community Resources
    </h2>
    <p class="hoa-subtitle">
        Some ${city} neighborhoods are part of homeowner, HOA, or community associations with guidelines for exterior work (including ${serviceName} materials, colors, and visible design elements). Requirements vary by community and are managed by each association.
    </p>
</header>
<div class="hoa-content">
    <h3 class="hoa-section-title">
        Helpful community resources
    </h3>
    <p>
        This section is provided as a convenient reference to help you quickly determine whether your neighborhood has an HOA and where to find the appropriate resources.
    </p>
    <ul class="hoa-list" role="list">${hoaListItems}
    </ul>
    <div class="hoa-callout" role="note" aria-label="Important guidance">
        <h3 class="hoa-callout-title">
            Before you start
        </h3>
        <p class="hoa-callout-text">
            If your home is located in one of the communities listed above, contact your association directly and obtain their current ${serviceName} or exterior guidelines before starting a project. Capitol Improvements does not interpret, modify, or override HOA requirements. Once you provide your association's guidelines, we will recommend materials and systems that comply so your project proceeds smoothly and without delays.
        </p>
    </div>
</div>`;
  }

  /**
   * Generate minimal HTML for cities without HOA data
   */
  generateMinimalHTML(city: string, serviceName: string): string {
    return `<header class="hoa-header">
    <h2>
        Homeowner Associations (HOA) &amp; Community Resources
    </h2>
    <p class="hoa-subtitle">
        Some ${city} neighborhoods may be part of homeowner, HOA, or community associations with guidelines for exterior work (including ${serviceName} materials, colors, and visible design elements). Requirements vary by community and are managed by each association.
    </p>
</header>
<div class="hoa-content">
    <div class="hoa-callout" role="note" aria-label="Important guidance">
        <h3 class="hoa-callout-title">
            Before you start
        </h3>
        <p class="hoa-callout-text">
            If your home is located in a community with an HOA, contact your association directly and obtain their current ${serviceName} or exterior guidelines before starting a project. Capitol Improvements does not interpret, modify, or override HOA requirements. Once you provide your association's guidelines, we will recommend materials and systems that comply so your project proceeds smoothly and without delays.
        </p>
    </div>
</div>`;
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Fetch all published pages
   */
  async fetchAllPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published pages from Strapi...');

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
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      allPages.push(...response.data.data);

      console.log(
        `   Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length}/${response.data.meta.pagination.total} pages)`
      );

      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`✅ Found ${allPages.length} published pages`);
    return allPages;
  }

  /**
   * Update a page
   */
  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          communityGuidelinesRichText: htmlContent,
        },
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

  /**
   * Main execution
   */
  async run(options: {
    dryRun?: boolean;
    limit?: number;
    slug?: string;
    serviceFilter?: string;
    skipNoHoa?: boolean;
    skipVerification?: boolean;
    removeFacebook?: boolean;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, serviceFilter, skipNoHoa = false, skipVerification = false, removeFacebook = false } = options;

    console.log('🏘️ Community Guidelines Update Tool\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log(`URL Verification: ${skipVerification ? 'SKIP (use cache only)' : 'ENABLED'}`);
    console.log(`Remove Facebook links: ${removeFacebook ? 'YES' : 'NO'}`);
    console.log(`Skip cities without HOA data: ${skipNoHoa}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (serviceFilter) console.log(`Service filter: ${serviceFilter}`);
    console.log('');

    // Load HOA data and verification cache
    this.loadHOAData();
    this.loadVerificationCache();

    // Verify all HOA URLs
    await this.verifyAllUrls(skipVerification, removeFacebook);

    // Fetch pages
    let pages = await this.fetchAllPages();

    // Filter out excluded pages
    const beforeExclusion = pages.length;
    pages = pages.filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
    if (beforeExclusion !== pages.length) {
      console.log(`\n📌 Excluded ${beforeExclusion - pages.length} page(s)`);
    }

    // Filter by slug if provided
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to ${pages.length} page(s) matching slug: ${slug}`);
    }

    // Filter by service if provided
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

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;
    const errors: Array<{ page: string; error: string }> = [];

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const { city, state } = this.extractCityFromPage(page);
      const serviceName = this.extractServiceFromSlug(page.slug);
      const hoas = this.getVerifiedHOAsForCity(city);

      // Count verified links vs total
      const verifiedLinkCount = hoas.filter((h) => h.url_verified).length;

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}, Service: ${serviceName}`);
      console.log(`   HOAs found: ${hoas.length} (${verifiedLinkCount} with verified links)`);

      // Skip if no HOA data and skipNoHoa is true
      if (hoas.length === 0 && skipNoHoa) {
        console.log(`   ⏭️ Skipped (no HOA data)`);
        skippedCount++;
        continue;
      }

      if (dryRun) {
        console.log(`   ✅ Would update`);
        successCount++;
        continue;
      }

      try {
        const htmlContent = hoas.length > 0
          ? this.generateCommunityGuidelinesHTML(city, serviceName, hoas)
          : this.generateMinimalHTML(city, serviceName);

        const success = await this.updatePage(page, htmlContent);

        if (success) {
          console.log(`   ✅ Updated successfully`);
          successCount++;
        } else {
          errorCount++;
          errors.push({ page: page.slug, error: 'Update failed' });
        }

        // Small delay
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
        errors.push({ page: page.slug, error: error.message });
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully ${dryRun ? 'would update' : 'updated'}: ${successCount} pages`);
    console.log(`⏭️ Skipped: ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    if (this.facebookRemovedCount > 0) {
      console.log(`📘 Facebook links removed: ${this.facebookRemovedCount}`);
    }
    console.log('='.repeat(60));

    if (errors.length > 0 && errors.length <= 10) {
      console.log('\n❌ ERRORS:');
      errors.forEach((e) => {
        console.log(`  - ${e.page}: ${e.error}`);
      });
    }

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Update completed! Verify at: ${STRAPI_URL}/admin`);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const skipNoHoa = args.includes('--skip-no-hoa');
const skipVerification = args.includes('--skip-verification');
const removeFacebook = args.includes('--remove-facebook');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;
const serviceArg = args.find((arg) => arg.startsWith('--service='));
const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npm run update-community-guidelines [options]

Options:
  --dry-run            Preview changes without updating Strapi
  --limit=N            Process only first N pages
  --slug=<slug>        Update a specific page only
  --service=<key>      Filter by service type (roofing, siding, etc.)
  --skip-no-hoa        Skip cities without HOA data in CSV
  --skip-verification  Skip URL verification (use cached results only)
  --remove-facebook    Remove all Facebook links from HOA data
  --help               Show this help message

URL Verification:
  - The script verifies each HOA URL before creating links
  - Broken/unreachable URLs are displayed as text-only (no link)
  - Results are cached in url_verification_cache.json for 24 hours
  - Use --skip-verification to skip and use cached results only

Facebook Link Removal:
  - Use --remove-facebook to filter out all Facebook URLs
  - HOAs with Facebook links will be displayed as text-only (no link)
  - Useful for ensuring only official websites are linked

Examples:
  npm run update-community-guidelines -- --dry-run
  npm run update-community-guidelines -- --service=roofing --limit=5
  npm run update-community-guidelines -- --skip-no-hoa
  npm run update-community-guidelines -- --skip-verification
  npm run update-community-guidelines -- --remove-facebook --dry-run
`);
  process.exit(0);
}

const updater = new CommunityGuidelinesUpdater();
updater.run({ dryRun: isDryRun, limit, slug, serviceFilter, skipNoHoa, skipVerification, removeFacebook }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
