#!/usr/bin/env tsx
/**
 * Generate FAQs for City Pages (using faqsRichText field)
 *
 * This script:
 * 1. Fetches the Pasadena Roofing faqsRichText as a template
 * 2. Fetches all published local pages (excluding Pasadena)
 * 3. Generates city-specific FAQs using AI based on the template
 * 4. Updates each page with the generated faqsRichText in production
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';

// Load environment variables
dotenv.config();

// Production Strapi configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const PASADENA_ROOFING_DOCUMENT_ID = 'cqk0aiavvd8vb1h019m64so0';

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  name?: string;
  city?: string;
  mapLocation?: string;
  faqsRichText?: string;
  [key: string]: unknown;
}

class FAQGenerator {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private templateFAQsHTML: string | null = null;
  private templatePage: LocalPage | null = null;

  constructor() {
    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Initialize Anthropic client
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }
    this.anthropic = new Anthropic({ apiKey });
  }

  /**
   * Fetch the Pasadena Roofing page as template
   */
  async fetchPasadenaTemplate(): Promise<void> {
    console.log('📋 Fetching Pasadena Roofing FAQs as template...');

    const response = await this.strapiClient.get<{ data: LocalPage }>(`/services/${PASADENA_ROOFING_DOCUMENT_ID}`);
    this.templatePage = response.data.data;

    if (!this.templatePage.faqsRichText) {
      throw new Error('Pasadena Roofing page has no faqsRichText content');
    }

    this.templateFAQsHTML = this.templatePage.faqsRichText;

    console.log(`✅ Found template page: ${this.templatePage.slug}`);
    console.log(`   faqsRichText content length: ${this.templateFAQsHTML.length} characters`);
  }

  /**
   * Extract city name from page slug or name
   */
  private extractCityFromPage(page: LocalPage): string {
    // Try city field first
    if (page.city) {
      return page.city as string;
    }

    // Try to extract from slug (e.g., "bowie-maryland-roofing-company-near-you" -> "Bowie")
    const slug = page.slug as string;
    const parts = slug.split('-');
    if (parts.length > 0) {
      // Capitalize first part
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }

    return 'the area';
  }

  /**
   * Extract service type from slug
   */
  private extractServiceFromSlug(slug: string): string {
    if (slug.includes('roofing')) return 'Roofing';
    if (slug.includes('siding')) return 'Siding';
    if (slug.includes('window')) return 'Window Replacement';
    if (slug.includes('door')) return 'Door Replacement';
    if (slug.includes('deck')) return 'Deck Building';
    if (slug.includes('gutter')) return 'Gutter Guards & Gutters';
    if (slug.includes('exterior') || slug.includes('trim')) return 'Exterior Trim';
    return 'Home Improvement';
  }

  /**
   * Fetch all published local pages (excluding Pasadena roofing)
   */
  async fetchAllPublishedPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published local pages...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get<{
        data: LocalPage[];
        meta: { pagination: { total: number; pageCount: number } }
      }>('/services', {
        params: {
          'publicationState': 'live',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      const pages = response.data.data;
      allPages.push(...pages);

      console.log(`   Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length}/${response.data.meta.pagination.total} pages)`);

      if (page >= response.data.meta.pagination.pageCount) {
        break;
      }
      page++;
    }

    // Filter out the Pasadena roofing template page
    const filteredPages = allPages.filter(p => p.documentId !== PASADENA_ROOFING_DOCUMENT_ID);

    console.log(`✅ Found ${filteredPages.length} published pages (excluding template)`);

    return filteredPages;
  }

  /**
   * Generate city-specific FAQs HTML using Claude AI
   */
  async generateFAQsForCity(page: LocalPage): Promise<string> {
    if (!this.templateFAQsHTML || !this.templatePage) {
      throw new Error('Template FAQs not loaded');
    }

    const cityName = this.extractCityFromPage(page);
    const serviceName = this.extractServiceFromSlug(page.slug);
    const pageName = page.name || page.slug;

    console.log(`   🤖 Generating ${serviceName} FAQs for ${cityName}...`);

    const prompt = `You are helping create FAQs for local home improvement service pages.

I have HTML-formatted FAQs from the Pasadena, MD roofing page, and I need you to generate similar FAQs for a ${cityName} ${serviceName} page.

TEMPLATE PAGE: Roofing - Pasadena - MD
TARGET PAGE: ${pageName}
TARGET CITY: ${cityName}
TARGET SERVICE: ${serviceName}

TEMPLATE FAQs HTML:
${this.templateFAQsHTML}

Please generate FAQs for the ${cityName} ${serviceName} page following these guidelines:

1. **Keep the exact same HTML structure** - preserve all div classes, h2, h3, p tags, and SVG icons
2. **Adapt the title** - Change "Roofing FAQs – Pasadena, MD" to "${serviceName} FAQs – ${cityName}, MD" (or appropriate state)
3. **Adapt questions and answers** to be relevant for ${cityName} and ${serviceName} specifically
4. **Replace "Pasadena" with "${cityName}"** throughout the content
5. **Replace "roofing"/"roof" with appropriate service terms** if the service is different (e.g., "siding", "window", "deck", etc.)
6. **Maintain the same number of FAQ items** as the template
7. **Keep the same tone, style, and level of detail**
8. **Preserve all HTML formatting exactly** - do not change class names, structure, or the SVG chevron icon
9. If the template mentions specific local details about Pasadena, either:
   - Adapt them appropriately for ${cityName} if you have knowledge about the area
   - Make them more general if you don't have specific information
10. Ensure all content is helpful, accurate, and professional

Return ONLY the complete HTML content for the faqsRichText field. Do not include any explanatory text, markdown formatting, or code block markers - just the raw HTML that will go directly into the Strapi field.`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 8000,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      // Extract the HTML from the response
      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      let htmlContent = content.text.trim();

      // Remove any markdown code block markers if present
      htmlContent = htmlContent.replace(/^```html\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/,'');

      return htmlContent;
    } catch (error) {
      console.error(`   ❌ Error generating FAQs for ${pageName}:`, error);
      throw error;
    }
  }

  /**
   * Update a page with new FAQs
   */
  async updatePageFAQs(page: LocalPage, faqsHTML: string): Promise<void> {
    const pageName = page.name || page.slug;

    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          faqsRichText: faqsHTML,
        },
      });

      console.log(`   ✅ Updated FAQs for: ${pageName}`);
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${pageName}`);

      if (error.response?.data) {
        console.error('   Strapi error response:', JSON.stringify(error.response.data, null, 2));
      }

      throw error;
    }
  }

  /**
   * Main execution flow
   */
  async run(): Promise<void> {
    console.log('🚀 Starting FAQ Generation for City Pages\n');
    console.log(`Production Strapi URL: ${STRAPI_URL}`);
    console.log(`Template: Pasadena Roofing (${PASADENA_ROOFING_DOCUMENT_ID})\n`);

    try {
      // Step 1: Fetch Pasadena template
      await this.fetchPasadenaTemplate();

      // Step 2: Fetch all published pages
      const pages = await this.fetchAllPublishedPages();

      if (pages.length === 0) {
        console.log('\n⚠️  No pages found to update');
        return;
      }

      // Step 3: Generate and update FAQs for each page
      console.log(`\n🔄 Generating FAQs for ${pages.length} pages...\n`);

      let successCount = 0;
      let errorCount = 0;
      const errors: Array<{ page: string; error: string }> = [];

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const pageName = page.name || page.slug;

        console.log(`[${i + 1}/${pages.length}] Processing: ${pageName}`);

        try {
          // Generate FAQs
          const generatedHTML = await this.generateFAQsForCity(page);

          // Update in Strapi
          await this.updatePageFAQs(page, generatedHTML);

          successCount++;

          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error: any) {
          console.error(`   ❌ Failed to process ${pageName}`);
          errorCount++;
          errors.push({
            page: pageName,
            error: error.message || String(error),
          });

          // Continue with next page even if one fails
          continue;
        }
      }

      // Summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 SUMMARY');
      console.log('='.repeat(60));
      console.log(`✅ Successfully updated: ${successCount} pages`);
      console.log(`❌ Failed: ${errorCount} pages`);
      console.log(`📄 Total processed: ${pages.length} pages`);
      console.log('='.repeat(60));

      if (errors.length > 0 && errors.length <= 10) {
        console.log('\n❌ ERRORS:');
        errors.forEach(e => {
          console.log(`  - ${e.page}: ${e.error}`);
        });
      }

      console.log();

      if (successCount > 0) {
        console.log('🎉 FAQ generation completed!');
        console.log(`\nYou can verify the updates at: ${STRAPI_URL}/admin`);
      }

    } catch (error) {
      console.error('\n❌ Fatal error:', error);
      process.exit(1);
    }
  }
}

// Run the script
const generator = new FAQGenerator();
generator.run().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
