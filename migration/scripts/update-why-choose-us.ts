#!/usr/bin/env tsx
/**
 * Update "Why Choose Us" Rich Text for Roofing Pages
 *
 * This script:
 * 1. Fetches all published roofing local pages from Strapi
 * 2. Extracts the city name from each page
 * 3. Updates the whyChooseUsRichText field with dynamic city name
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Production Strapi configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  whyChooseUsRichText?: string;
  [key: string]: unknown;
}

/**
 * Generate the Why Choose Us HTML content with dynamic city name
 */
function generateWhyChooseUsHTML(cityName: string): string {
  return `<div class="features-header-wrapper">
    <h2>
        Why ${cityName} Homeowners Choose Us
    </h2>
    <p>
        Certified installers, local know-how, and warranties that protect your investment.
    </p>
</div>
<div class="features-list">
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767917242/certification-file-svgrepo-com_1_brz9jx.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                GAF Master Elite Certified
            </h3>
            <p>
                Top 3% of roofing contractors nationwide
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767917241/badge-svgrepo-com_dd5q0k.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                FORTIFIED Roofing Certified
            </h3>
            <p>
                One of the few Maryland contractors certified for high-wind roofing systems
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916686/hammer_icon_haniri.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Regional Expertise
            </h3>
            <p>
                Understanding of Maryland's diverse climate zones and building requirements
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/badge-icon_hljgdo.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Manufacturer-Backed Warranties
            </h3>
            <p>
                Offering extended warranty coverage through GAF certification
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/holding-house-icon_lxtzdg.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Quality Materials
            </h3>
            <p>
                Using premium roofing products suited to Maryland conditions
            </p>
        </div>
    </div>
</div>
<div class="features-content-wrapper">
    <div class="features-image-wrapper">
        <div class="features_image-block">
            <p>
                <img class="certification-image" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767996620/2026_MASTER_ELITE_CERTIFICATE_gngjii.jpg">
            </p>
            <blockquote class="features-caption">
                <p>
                    2026 GAF Master Elite Certification for Capitol Improvements
                </p>
            </blockquote>
        </div>
        <div class="features_image-block">
            <p>
                <img class="certification-image" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767996620/Fortified_Certificate_hdmyuh.jpg">
            </p>
            <blockquote class="features-caption">
                <p>
                    2026 Fortified Roofing Certification for Capitol Improvements
                </p>
            </blockquote>
        </div>
    </div>
    <blockquote class="features-caption">
        <p>
            © 2026 Captiol Improvements
        </p>
    </blockquote>
</div>
<style>

  .features-header-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
    text-align: center;
  }

  .features-list {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem;
    justify-content: center;
  }

  .features-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    width: 100%;
    max-width: 20rem;
    text-align: center;
  }
  .item-text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .features-icon {
    width: 3rem;
    height: 3rem;
    max-width: 100%;
    object-fit: contain;
    display: inline-block;
  }
  @media screen and (max-width: 991px) {
    .features-list {
      gap: 2rem;
    }
  }
  .features-content-wrapper {
    padding-top: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2.5rem;
  }
  .features-image-wrapper {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: end;
  }
  .certification-image {
    width: 100%;
    display: block;
  }
  .features-caption {
    text-align: center;
    font-size: 0.875rem;
  }
  .features_image-block {
    display: flex;
    width: 50%;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  @media screen and (max-width: 767px) {
    .features-content-wrapper {
      gap: 2rem;
    }
  }
  @media screen and (max-width: 991px) {
    .features-image-wrapper {
      flex-direction: column;
    }
    .features_image-block {
     width: 100%;
    }
  }
</style>`;
}

class WhyChooseUsUpdater {
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
   * Extract city name from page title or slug
   * Title format: "Service - City - State" (e.g., "Roofing - Bowie - MD")
   */
  private extractCityFromPage(page: LocalPage): string {
    // Try to extract from title first (format: "Roofing - City - MD")
    if (page.title) {
      const parts = page.title.split(' - ');
      if (parts.length >= 2) {
        let city = parts[1].trim();
        // Normalize "DC" to "Washington DC"
        if (city === 'DC' || city === 'Washington, DC') {
          city = 'Washington DC';
        }
        return city;
      }
    }

    // Fallback: extract from slug (e.g., "bowie-maryland-roofing-company-near-you")
    const slug = page.slug;
    // Remove common suffixes and extract first part
    const cleanSlug = slug
      .replace(/-maryland-roofing-company-near-you$/, '')
      .replace(/-md-roofing-company-near-you$/, '')
      .replace(/-roofing.*$/, '')
      .replace(/-contractors.*$/, '');

    // Convert slug to title case
    let cityName = cleanSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Normalize DC variations
    if (cityName === 'Washington Dc' || cityName === 'Dc') {
      cityName = 'Washington DC';
    }

    return cityName || 'Maryland';
  }

  /**
   * Fetch all published roofing pages
   */
  async fetchRoofingPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published roofing pages...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get<{
        data: LocalPage[];
        meta: { pagination: { total: number; pageCount: number } };
      }>('/services', {
        params: {
          'filters[slug][$contains]': 'roofing',
          'status': 'published',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      const pages = response.data.data;
      allPages.push(...pages);

      console.log(
        `   Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length}/${response.data.meta.pagination.total} pages)`
      );

      if (page >= response.data.meta.pagination.pageCount) {
        break;
      }
      page++;
    }

    console.log(`✅ Found ${allPages.length} published roofing pages`);

    return allPages;
  }

  /**
   * Update a page with the Why Choose Us content
   */
  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          whyChooseUsRichText: htmlContent,
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
   * Main execution flow
   */
  async run(options: { dryRun?: boolean; limit?: number; slug?: string } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('🚀 Starting Why Choose Us Update for Roofing Pages\n');
    console.log(`Production Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Filter: slug = ${slug}`);
    console.log('');

    try {
      // Fetch all roofing pages
      let pages = await this.fetchRoofingPages();

      // Filter by specific slug if provided
      if (slug) {
        pages = pages.filter((p) => p.slug === slug);
        console.log(`\n📌 Filtered to ${pages.length} page(s) matching slug: ${slug}`);
      }

      // Apply limit if specified
      if (limit && limit > 0) {
        pages = pages.slice(0, limit);
        console.log(`📌 Limited to first ${limit} page(s)`);
      }

      if (pages.length === 0) {
        console.log('\n⚠️  No pages found to update');
        return;
      }

      console.log(`\n🔄 Processing ${pages.length} pages...\n`);

      let successCount = 0;
      let errorCount = 0;
      const errors: Array<{ page: string; error: string }> = [];

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const cityName = this.extractCityFromPage(page);

        console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
        console.log(`   City: ${cityName}`);

        if (dryRun) {
          console.log(`   ✅ Would update with city: ${cityName}`);
          successCount++;
          continue;
        }

        try {
          const htmlContent = generateWhyChooseUsHTML(cityName);
          const success = await this.updatePage(page, htmlContent);

          if (success) {
            console.log(`   ✅ Updated successfully`);
            successCount++;
          } else {
            errorCount++;
            errors.push({ page: page.slug, error: 'Update failed' });
          }

          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 200));
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
      console.log(`❌ Failed: ${errorCount} pages`);
      console.log(`📄 Total processed: ${pages.length} pages`);
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
    } catch (error) {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

// Run the script
const updater = new WhyChooseUsUpdater();
updater.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
