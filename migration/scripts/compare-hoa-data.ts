#!/usr/bin/env tsx
/**
 * Compare HOA Data: CSV vs Strapi
 *
 * This script:
 * 1. Loads HOA data from the CSV file
 * 2. Fetches current community guidelines from Strapi
 * 3. Creates a comparison report
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
const REPORT_PATH = join(__dirname, '../../hoa_comparison_report.md');

interface HOAResource {
  city: string;
  state: string;
  hoa_name: string;
  hoa_url: string;
  is_community_based: string;
}

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  communityGuidelinesRichText?: string;
}

class HOAComparison {
  private strapiClient: AxiosInstance;
  private csvData: Map<string, HOAResource[]> = new Map();

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
   * Load HOA data from CSV
   */
  loadCSVData(): void {
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
      if (!this.csvData.has(cityKey)) {
        this.csvData.set(cityKey, []);
      }
      this.csvData.get(cityKey)!.push(record);
    }

    console.log(`✅ Loaded HOA data for ${this.csvData.size} cities (${records.length} total records)`);
  }

  /**
   * Check if URL is a Facebook link
   */
  private isFacebookUrl(url: string): boolean {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('facebook.com') ||
           lowerUrl.includes('fb.com') ||
           lowerUrl.includes('fb.me');
  }

  /**
   * Extract city from page title
   */
  private extractCityFromPage(page: LocalPage): string {
    if (page.title) {
      const parts = page.title.split(' - ');
      if (parts.length >= 2) {
        let city = parts[1].trim();
        if (city === 'DC' || city === 'Washington, DC') {
          city = 'Washington DC';
        }
        return city;
      }
    }
    return '';
  }

  /**
   * Check if page has community guidelines content
   */
  private hasGuidelinesContent(page: LocalPage): boolean {
    return !!(page.communityGuidelinesRichText && page.communityGuidelinesRichText.trim().length > 0);
  }

  /**
   * Extract HOA links from HTML content
   */
  private extractLinksFromHTML(html: string): string[] {
    const linkRegex = /href="([^"]+)"/g;
    const links: string[] = [];
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      links.push(match[1]);
    }
    return links;
  }

  /**
   * Fetch all pages from Strapi
   */
  async fetchStrapiPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching pages from Strapi...');

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

      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`✅ Fetched ${allPages.length} pages from Strapi`);
    return allPages;
  }

  /**
   * Generate comparison report
   */
  async generateReport(): Promise<void> {
    this.loadCSVData();
    const pages = await this.fetchStrapiPages();

    // Statistics
    const stats = {
      totalPages: pages.length,
      pagesWithGuidelines: 0,
      pagesWithoutGuidelines: 0,
      citiesInCSV: this.csvData.size,
      totalHOAsInCSV: 0,
      hoasWithUrls: 0,
      hoasWithFacebookUrls: 0,
      hoasCommunityBased: 0,
      citiesWithNoHOAs: [] as string[],
      facebookLinks: [] as { city: string; hoa: string; url: string }[],
    };

    // Count CSV stats
    for (const [city, hoas] of this.csvData) {
      stats.totalHOAsInCSV += hoas.length;
      for (const hoa of hoas) {
        if (hoa.hoa_url) {
          stats.hoasWithUrls++;
          if (this.isFacebookUrl(hoa.hoa_url)) {
            stats.hoasWithFacebookUrls++;
            stats.facebookLinks.push({
              city: hoa.city,
              hoa: hoa.hoa_name,
              url: hoa.hoa_url,
            });
          }
        }
        if (hoa.is_community_based === 'true' || hoa.is_community_based === 'TRUE') {
          stats.hoasCommunityBased++;
        }
      }
    }

    // Analyze pages
    const citiesWithPages = new Set<string>();
    const citiesWithGuidelines = new Set<string>();

    for (const page of pages) {
      const city = this.extractCityFromPage(page);
      if (city) {
        citiesWithPages.add(city.toLowerCase());
        if (this.hasGuidelinesContent(page)) {
          stats.pagesWithGuidelines++;
          citiesWithGuidelines.add(city.toLowerCase());
        } else {
          stats.pagesWithoutGuidelines++;
        }
      }
    }

    // Find cities with pages but no HOA data
    for (const city of citiesWithPages) {
      if (!this.csvData.has(city)) {
        stats.citiesWithNoHOAs.push(city);
      }
    }

    // Generate Markdown report
    const report = `# HOA Data Comparison Report

Generated: ${new Date().toISOString()}

## Summary Statistics

| Metric | Value |
|--------|-------|
| Total Strapi Pages | ${stats.totalPages} |
| Pages with Community Guidelines | ${stats.pagesWithGuidelines} |
| Pages without Community Guidelines | ${stats.pagesWithoutGuidelines} |
| Cities in CSV | ${stats.citiesInCSV} |
| Total HOAs in CSV | ${stats.totalHOAsInCSV} |
| HOAs with URLs | ${stats.hoasWithUrls} |
| HOAs with Facebook URLs | ${stats.hoasWithFacebookUrls} |
| Community-based HOAs (no website) | ${stats.hoasCommunityBased} |

## Facebook Links Found (${stats.facebookLinks.length})

These links should be removed or replaced:

| City | HOA Name | Facebook URL |
|------|----------|--------------|
${stats.facebookLinks.map(f => `| ${f.city} | ${f.hoa} | ${f.url} |`).join('\n')}

## Cities with Pages but No HOA Data (${stats.citiesWithNoHOAs.length})

These cities have service pages but no HOA data in the CSV:

${stats.citiesWithNoHOAs.sort().map(c => `- ${c}`).join('\n')}

## HOAs by City

${Array.from(this.csvData.entries())
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([city, hoas]) => {
    const hoaList = hoas.map(h => {
      const urlInfo = h.hoa_url
        ? (this.isFacebookUrl(h.hoa_url) ? '⚠️ Facebook' : '✅ Website')
        : (h.is_community_based === 'true' ? '🏘️ Community' : '❌ No URL');
      return `  - ${h.hoa_name} (${urlInfo})`;
    }).join('\n');
    return `### ${city.charAt(0).toUpperCase() + city.slice(1)} (${hoas.length} HOAs)\n${hoaList}`;
  })
  .join('\n\n')}
`;

    // Write report
    writeFileSync(REPORT_PATH, report);
    console.log(`\n📄 Report saved to: ${REPORT_PATH}`);

    // Print summary to console
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPARISON SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Strapi Pages: ${stats.totalPages}`);
    console.log(`Pages with Guidelines: ${stats.pagesWithGuidelines}`);
    console.log(`Pages without Guidelines: ${stats.pagesWithoutGuidelines}`);
    console.log(`Cities in CSV: ${stats.citiesInCSV}`);
    console.log(`Total HOAs: ${stats.totalHOAsInCSV}`);
    console.log(`HOAs with URLs: ${stats.hoasWithUrls}`);
    console.log(`⚠️ Facebook Links: ${stats.hoasWithFacebookUrls}`);
    console.log(`Community-based: ${stats.hoasCommunityBased}`);
    console.log('='.repeat(60));
  }
}

const comparison = new HOAComparison();
comparison.generateReport().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
