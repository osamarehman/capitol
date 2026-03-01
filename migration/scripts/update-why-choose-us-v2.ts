#!/usr/bin/env tsx
/**
 * Update Why Choose Us Rich Text for All Service Pages
 *
 * This script:
 * 1. Fetches all published local pages from Strapi
 * 2. Generates city-specific "Why Choose Us" HTML from template
 * 3. Updates the whyChooseUsRichText field
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Pages to exclude from updates
const EXCLUDED_SLUGS = [
  'pasadena-maryland-roofing-company-near-you', // Template page
];

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  whyChooseUsRichText?: string;
}

// Template HTML with CITY_PLACEHOLDER
const WHY_CHOOSE_US_TEMPLATE = `<div class="features-header-wrapper">
    <h2>
        Why CITY_PLACEHOLDER Homeowners Choose Us
    </h2>
    <p>
        Certified installers, local know-how, and warranties that protect your investment.
    </p>
</div>
<div class="features-list">
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770298422/GafMasterElite_kvteks.avif">
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
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770320689/FORTIFIED-logo-program-01-1024x485_uehkpv.png">
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
   * Extract city name from page title
   */
  private extractCityFromPage(page: LocalPage): string {
    if (page.title) {
      const parts = page.title.split(' - ');
      if (parts.length >= 2) {
        let city = parts[1].trim();
        // Handle special cases
        if (city === 'DC' || city === 'Washington, DC') {
          city = 'Washington DC';
        }
        return city;
      }
    }

    // Fallback: extract from slug
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

    return city || 'Maryland';
  }

  /**
   * Generate Why Choose Us HTML for a city
   */
  generateWhyChooseUsHTML(city: string): string {
    return WHY_CHOOSE_US_TEMPLATE.replace('CITY_PLACEHOLDER', city);
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
   * Main execution
   */
  async run(options: { dryRun?: boolean; limit?: number; slug?: string } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('🏆 Why Choose Us Update Tool\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    if (slug) console.log(`Slug filter: ${slug}`);
    console.log('');

    // Fetch pages
    let pages = await this.fetchAllPages();

    // Filter out excluded pages
    const beforeExclusion = pages.length;
    pages = pages.filter((p) => !EXCLUDED_SLUGS.includes(p.slug));
    if (beforeExclusion !== pages.length) {
      console.log(`\n📌 Excluded ${beforeExclusion - pages.length} template page(s)`);
    }

    // Filter by slug if provided
    if (slug) {
      pages = pages.filter((p) => p.slug === slug || p.slug.includes(slug));
      console.log(`📌 Filtered to ${pages.length} page(s) matching: ${slug}`);
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
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const city = this.extractCityFromPage(page);

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}`);

      if (dryRun) {
        console.log(`   ✅ Would update with: "Why ${city} Homeowners Choose Us"`);
        successCount++;
        continue;
      }

      try {
        const htmlContent = this.generateWhyChooseUsHTML(city);
        const success = await this.updatePage(page, htmlContent);

        if (success) {
          console.log(`   ✅ Updated successfully`);
          successCount++;
        } else {
          errorCount++;
        }

        // Small delay
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
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

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Update completed! Verify at: ${STRAPI_URL}/admin`);
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

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/update-why-choose-us-v2.ts [options]

Options:
  --dry-run       Preview changes without updating Strapi
  --limit=N       Process only first N pages
  --slug=<slug>   Update pages matching this slug
  --help          Show this help message

Examples:
  npx tsx scripts/update-why-choose-us-v2.ts --dry-run
  npx tsx scripts/update-why-choose-us-v2.ts --limit=5
  npx tsx scripts/update-why-choose-us-v2.ts --slug=bowie
`);
  process.exit(0);
}

const updater = new WhyChooseUsUpdater();
updater.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
