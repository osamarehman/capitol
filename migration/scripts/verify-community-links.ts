#!/usr/bin/env tsx
/**
 * Verify Community Guidelines Links
 *
 * This script:
 * 1. Fetches all communityGuidelinesRichText from Strapi production
 * 2. Extracts all URLs from the HTML
 * 3. Verifies each URL is accessible
 * 4. Reports broken links
 * 5. Optionally removes/fixes broken links
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// URL verification settings
const URL_VERIFICATION_TIMEOUT = 15000; // 15 seconds
const URL_VERIFICATION_CONCURRENCY = 3; // verify 3 URLs at a time

interface ServicePage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  communityGuidelinesRichText?: string;
}

interface ExtractedLink {
  url: string;
  hoaName: string;
  pageSlug: string;
  pageDocumentId: string;
}

interface VerificationResult {
  url: string;
  hoaName: string;
  pageSlug: string;
  pageDocumentId: string;
  verified: boolean;
  statusCode?: number;
  error?: string;
}

class CommunityLinksVerifier {
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
   * Extract all links from communityGuidelinesRichText
   */
  extractLinks(pages: ServicePage[]): ExtractedLink[] {
    console.log('\n🔗 Extracting links from community guidelines...');

    const links: ExtractedLink[] = [];

    // Regex to match <a> tags with href
    const linkRegex = /<a[^>]*href="([^"]+)"[^>]*>.*?<span class="hoa-name">([^<]+)<\/span>/gs;

    for (const page of pages) {
      if (!page.communityGuidelinesRichText) continue;

      let match;
      while ((match = linkRegex.exec(page.communityGuidelinesRichText)) !== null) {
        const url = match[1];
        const hoaName = match[2];

        // Skip mailto, tel, and anchor links
        if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('#')) {
          continue;
        }

        links.push({
          url,
          hoaName,
          pageSlug: page.slug,
          pageDocumentId: page.documentId,
        });
      }
    }

    // Deduplicate by URL
    const uniqueUrls = new Map<string, ExtractedLink[]>();
    for (const link of links) {
      if (!uniqueUrls.has(link.url)) {
        uniqueUrls.set(link.url, []);
      }
      uniqueUrls.get(link.url)!.push(link);
    }

    console.log(`   Found ${links.length} total links (${uniqueUrls.size} unique URLs)`);
    return links;
  }

  /**
   * Verify a single URL
   */
  async verifyUrl(url: string): Promise<{ verified: boolean; statusCode?: number; error?: string }> {
    try {
      // Try HEAD request first (faster)
      const response = await axios.head(url, {
        timeout: URL_VERIFICATION_TIMEOUT,
        maxRedirects: 5,
        validateStatus: (status) => status >= 200 && status < 400,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
      });
      return { verified: true, statusCode: response.status };
    } catch (headError: any) {
      // Fallback to GET request (some servers don't support HEAD)
      try {
        const response = await axios.get(url, {
          timeout: URL_VERIFICATION_TIMEOUT,
          maxRedirects: 5,
          validateStatus: (status) => status >= 200 && status < 400,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
          },
          maxContentLength: 1024 * 1024, // 1MB max
        });
        return { verified: true, statusCode: response.status };
      } catch (getError: any) {
        const statusCode = getError.response?.status;
        const errorMsg = getError.code || statusCode || getError.message;
        return { verified: false, statusCode, error: String(errorMsg) };
      }
    }
  }

  /**
   * Verify all URLs
   */
  async verifyAllUrls(links: ExtractedLink[]): Promise<VerificationResult[]> {
    console.log('\n🔍 Verifying URLs...');

    // Get unique URLs
    const uniqueUrls = [...new Set(links.map(l => l.url))];
    console.log(`   Verifying ${uniqueUrls.length} unique URLs...`);

    const urlResults = new Map<string, { verified: boolean; statusCode?: number; error?: string }>();

    // Verify in batches
    for (let i = 0; i < uniqueUrls.length; i += URL_VERIFICATION_CONCURRENCY) {
      const batch = uniqueUrls.slice(i, i + URL_VERIFICATION_CONCURRENCY);
      const results = await Promise.all(
        batch.map(async (url) => {
          const result = await this.verifyUrl(url);
          return { url, ...result };
        })
      );

      for (const result of results) {
        urlResults.set(result.url, {
          verified: result.verified,
          statusCode: result.statusCode,
          error: result.error,
        });
      }

      process.stdout.write(`\r   Progress: ${Math.min(i + URL_VERIFICATION_CONCURRENCY, uniqueUrls.length)}/${uniqueUrls.length} URLs verified`);
    }

    console.log('\n');

    // Map back to full results
    const allResults: VerificationResult[] = links.map(link => ({
      ...link,
      ...urlResults.get(link.url)!,
    }));

    return allResults;
  }

  /**
   * Convert link to text-only (remove href, keep name)
   */
  private convertLinkToTextOnly(html: string, url: string, hoaName: string): string {
    // Match the full <li> containing this link and convert to static
    const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedName = hoaName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Pattern to match the full li item with this URL
    const pattern = new RegExp(
      `<li class="hoa-item">\\s*<a[^>]*href="${escapedUrl}"[^>]*>\\s*<span class="hoa-name">${escapedName}</span>\\s*<span class="hoa-url">[^<]*</span>\\s*</a>\\s*</li>`,
      'gs'
    );

    const replacement = `<li class="hoa-item hoa-item--static">
            <div class="hoa-link" role="note" aria-label="Website unavailable">
                <span class="hoa-name">${hoaName}</span> <span class="hoa-meta">Website unavailable</span>
            </div>
        </li>`;

    return html.replace(pattern, replacement);
  }

  /**
   * Fix broken links in a page by converting them to text-only
   */
  async fixBrokenLinks(
    page: ServicePage,
    brokenLinks: VerificationResult[]
  ): Promise<boolean> {
    if (!page.communityGuidelinesRichText) return false;

    let updatedHtml = page.communityGuidelinesRichText;

    for (const link of brokenLinks) {
      updatedHtml = this.convertLinkToTextOnly(updatedHtml, link.url, link.hoaName);
    }

    // Only update if something changed
    if (updatedHtml === page.communityGuidelinesRichText) {
      return false;
    }

    try {
      await this.strapiClient.put(`/services/${page.pageDocumentId || page.documentId}`, {
        data: {
          communityGuidelinesRichText: updatedHtml,
        },
      });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${page.slug}: ${error.message}`);
      return false;
    }
  }

  /**
   * Main execution
   */
  async run(options: { fix?: boolean; limit?: number } = {}): Promise<void> {
    const { fix = false, limit } = options;

    console.log('🔗 Community Links Verifier\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${fix ? 'FIX BROKEN LINKS' : 'REPORT ONLY'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    // Fetch pages
    let pages = await this.fetchAllPages();

    // Apply limit
    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} page(s)`);
    }

    // Extract links
    const links = this.extractLinks(pages);

    if (links.length === 0) {
      console.log('\n✅ No links found in community guidelines');
      return;
    }

    // Verify URLs
    const results = await this.verifyAllUrls(links);

    // Separate verified and broken
    const brokenLinks = results.filter(r => !r.verified);
    const verifiedLinks = results.filter(r => r.verified);

    console.log('\n📊 VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Working links: ${verifiedLinks.length}`);
    console.log(`❌ Broken links: ${brokenLinks.length}`);
    console.log('='.repeat(60));

    if (brokenLinks.length === 0) {
      console.log('\n🎉 All links are working!');
      return;
    }

    // Group broken links by page
    const brokenByPage = new Map<string, VerificationResult[]>();
    for (const link of brokenLinks) {
      if (!brokenByPage.has(link.pageSlug)) {
        brokenByPage.set(link.pageSlug, []);
      }
      brokenByPage.get(link.pageSlug)!.push(link);
    }

    console.log(`\n❌ BROKEN LINKS (${brokenLinks.length} total across ${brokenByPage.size} pages):\n`);

    // Group by URL to show affected pages
    const brokenByUrl = new Map<string, VerificationResult[]>();
    for (const link of brokenLinks) {
      if (!brokenByUrl.has(link.url)) {
        brokenByUrl.set(link.url, []);
      }
      brokenByUrl.get(link.url)!.push(link);
    }

    for (const [url, links] of brokenByUrl) {
      const firstLink = links[0];
      console.log(`  ${firstLink.hoaName}`);
      console.log(`  URL: ${url}`);
      console.log(`  Error: ${firstLink.error || `HTTP ${firstLink.statusCode}`}`);
      console.log(`  Affected pages: ${links.length}`);
      if (links.length <= 3) {
        links.forEach(l => console.log(`    - ${l.pageSlug}`));
      } else {
        links.slice(0, 3).forEach(l => console.log(`    - ${l.pageSlug}`));
        console.log(`    ... and ${links.length - 3} more`);
      }
      console.log('');
    }

    // Save report
    const reportPath = join(__dirname, '../../broken_links_report.json');
    writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        totalLinks: links.length,
        workingLinks: verifiedLinks.length,
        brokenLinks: brokenLinks.length,
        affectedPages: brokenByPage.size,
      },
      brokenLinks: brokenLinks.map(l => ({
        url: l.url,
        hoaName: l.hoaName,
        pageSlug: l.pageSlug,
        error: l.error || `HTTP ${l.statusCode}`,
      })),
    }, null, 2));
    console.log(`📄 Full report saved to: broken_links_report.json`);

    // Fix broken links if requested
    if (fix) {
      console.log('\n🔧 Fixing broken links...\n');

      let fixedCount = 0;
      let failedCount = 0;

      for (const [pageSlug, pageLinks] of brokenByPage) {
        const page = pages.find(p => p.slug === pageSlug);
        if (!page) continue;

        console.log(`  Fixing ${pageSlug} (${pageLinks.length} broken links)...`);

        // Create a modified page object with documentId
        const pageWithDocId = {
          ...page,
          pageDocumentId: page.documentId,
        };

        const success = await this.fixBrokenLinks(pageWithDocId as any, pageLinks);
        if (success) {
          console.log(`    ✅ Fixed`);
          fixedCount++;
        } else {
          console.log(`    ❌ Failed`);
          failedCount++;
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      console.log('\n📊 FIX SUMMARY');
      console.log('='.repeat(60));
      console.log(`✅ Pages fixed: ${fixedCount}`);
      console.log(`❌ Pages failed: ${failedCount}`);
      console.log('='.repeat(60));
    } else {
      console.log('\n💡 Run with --fix to convert broken links to text-only');
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const shouldFix = args.includes('--fix');
const limitArg = args.find(arg => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/verify-community-links.ts [options]

Options:
  --fix          Fix broken links by converting them to text-only
  --limit=N      Process only first N pages
  --help         Show this help message

Examples:
  npx tsx scripts/verify-community-links.ts           # Report only
  npx tsx scripts/verify-community-links.ts --fix     # Fix broken links
`);
  process.exit(0);
}

const verifier = new CommunityLinksVerifier();
verifier.run({ fix: shouldFix, limit }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
