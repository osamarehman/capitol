#!/usr/bin/env tsx
/**
 * Generate FAQs for City Pages
 *
 * This script:
 * 1. Fetches the Pasadena Roofing FAQs as a template
 * 2. Fetches all published local pages (excluding Pasadena)
 * 3. Generates city-specific FAQs using AI based on the template
 * 4. Updates each page with the generated FAQs in production
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';

// Load environment variables
dotenv.config();

// Production Strapi configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '86044e370bbafc30990016c1cc680e97973759f9dbf5a712117eaf8ec6e2fbd48a54024b0735dd4c949249e7da3e619830287d05bd30f1bb70f431951324177bce86f6fcd17a5b0f59268471a00482f81d46c5d3998d6ff889770dc99b5124c32ce6803541fa46f79c6420688aa7f7981a53562c28580f0caba072fff52c287a';

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  city: string;
  mapLocation?: string;
  [key: string]: unknown;
}

interface FAQTemplate {
  faqContent?: string;
  faqQuestion1?: string;
  faqAnswer1?: string;
  faqQuestion2?: string;
  faqAnswer2?: string;
  faqQuestion3?: string;
  faqAnswer3?: string;
  faqQuestion4?: string;
  faqAnswer4?: string;
  faqQuestion5?: string;
  faqAnswer5?: string;
  faqQuestion6?: string;
  faqAnswer6?: string;
  faqQuestion7?: string;
  faqAnswer7?: string;
  faqQuestion8?: string;
  faqAnswer8?: string;
  faqQuestion9?: string;
  faqAnswer9?: string;
  faqQuestion10?: string;
  faqAnswer10?: string;
  faqQuestion11?: string;
  faqAnswer11?: string;
  faqQuestion12?: string;
  faqAnswer12?: string;
  faqQuestion13?: string;
  faqAnswer13?: string;
  faqQuestion14?: string;
  faqAnswer14?: string;
  faqQuestion15?: string;
  faqAnswer15?: string;
}

class FAQGenerator {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private templateFAQs: FAQTemplate | null = null;
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

    // Fetch all pages and filter for Pasadena Roofing
    const response = await this.strapiClient.get<{ data: LocalPage[] }>('/services', {
      params: {
        'filters[mapLocation][$eq]': 'Pasadena',
        'filters[slug][$contains]': 'roofing',
        'publicationState': 'live', // Only published pages
        'pagination[pageSize]': 100,
      },
    });

    const pasadenaPages = response.data.data;

    if (pasadenaPages.length === 0) {
      throw new Error('Could not find Pasadena Roofing page');
    }

    // Use the first match (should be the main Pasadena roofing page)
    this.templatePage = pasadenaPages[0];

    // Extract FAQ fields
    this.templateFAQs = this.extractFAQs(this.templatePage);

    const faqCount = this.countFAQs(this.templateFAQs);
    console.log(`✅ Found template page: ${this.templatePage.name || this.templatePage.slug}`);
    console.log(`   Template has ${faqCount} FAQ pairs`);
  }

  /**
   * Extract FAQ fields from a page
   */
  private extractFAQs(page: LocalPage): FAQTemplate {
    const faqs: FAQTemplate = {};

    if (page.faqContent) {
      faqs.faqContent = page.faqContent as string;
    }

    for (let i = 1; i <= 15; i++) {
      const questionKey = `faqQuestion${i}`;
      const answerKey = `faqAnswer${i}`;

      if (page[questionKey]) {
        faqs[questionKey as keyof FAQTemplate] = page[questionKey] as string;
      }
      if (page[answerKey]) {
        faqs[answerKey as keyof FAQTemplate] = page[answerKey] as string;
      }
    }

    return faqs;
  }

  /**
   * Count how many FAQ pairs exist
   */
  private countFAQs(faqs: FAQTemplate): number {
    let count = 0;
    for (let i = 1; i <= 15; i++) {
      const questionKey = `faqQuestion${i}` as keyof FAQTemplate;
      if (faqs[questionKey]) {
        count++;
      }
    }
    return count;
  }

  /**
   * Fetch all published local pages (excluding Pasadena)
   */
  async fetchAllPublishedPages(): Promise<LocalPage[]> {
    console.log('\n📋 Fetching all published local pages...');

    const allPages: LocalPage[] = [];
    let page = 1;
    const pageSize = 100;

    while (true) {
      const response = await this.strapiClient.get<{ data: LocalPage[]; meta: { pagination: { total: number; pageCount: number } } }>('/services', {
        params: {
          'publicationState': 'live', // Only published pages
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

    // Filter out Pasadena pages (since we're using it as template)
    const nonPasadenaPages = allPages.filter(p => {
      const isPasadena = p.mapLocation === 'Pasadena' || (p.slug && (p.slug as string).toLowerCase().includes('pasadena'));
      return !isPasadena;
    });

    console.log(`✅ Found ${nonPasadenaPages.length} published non-Pasadena pages`);

    return nonPasadenaPages;
  }

  /**
   * Generate city-specific FAQs using Claude AI
   */
  async generateFAQsForCity(page: LocalPage): Promise<FAQTemplate> {
    if (!this.templateFAQs || !this.templatePage) {
      throw new Error('Template FAQs not loaded');
    }

    const cityName = page.city || (page.name as string) || (page.slug as string);
    const pageName = page.name || (page.slug as string);

    console.log(`   🤖 Generating FAQs for: ${pageName}...`);

    // Build the template FAQ text
    let templateText = '';
    if (this.templateFAQs.faqContent) {
      templateText += `FAQ Content/Intro:\n${this.templateFAQs.faqContent}\n\n`;
    }

    templateText += 'FAQs:\n';
    for (let i = 1; i <= 15; i++) {
      const questionKey = `faqQuestion${i}` as keyof FAQTemplate;
      const answerKey = `faqAnswer${i}` as keyof FAQTemplate;

      if (this.templateFAQs[questionKey] && this.templateFAQs[answerKey]) {
        templateText += `\nQ${i}: ${this.templateFAQs[questionKey]}\n`;
        templateText += `A${i}: ${this.templateFAQs[answerKey]}\n`;
      }
    }

    // Generate using Claude
    const prompt = `You are helping create FAQs for local roofing service pages.

I have a template from the Pasadena roofing page, and I need you to generate similar FAQs for the ${cityName} page.

TEMPLATE PAGE: ${this.templatePage.name || this.templatePage.slug}
TARGET PAGE: ${pageName}
TARGET CITY: ${cityName}

TEMPLATE FAQs:
${templateText}

Please generate FAQs for the ${cityName} page following these guidelines:
1. Keep the same structure and number of FAQ pairs as the template
2. Adapt questions and answers to be relevant for ${cityName} specifically
3. Replace "Pasadena" with "${cityName}" where appropriate
4. Maintain the same tone, style, and level of detail
5. Keep any HTML formatting (like <strong>, <p>, <ul>, etc.) if present in answers
6. Ensure answers are helpful, accurate, and professional
7. If the template mentions specific locations, landmarks, or details about Pasadena, adapt them appropriately for ${cityName} (or make them more general if you don't have specific information about ${cityName})

Return the FAQs in the following JSON format:
{
  "faqContent": "FAQ intro/header text",
  "faqQuestion1": "Question 1 text",
  "faqAnswer1": "Answer 1 text",
  "faqQuestion2": "Question 2 text",
  "faqAnswer2": "Answer 2 text",
  ...continue for all FAQ pairs in the template...
}

IMPORTANT: Only include FAQ pairs that exist in the template. If the template has 8 FAQ pairs, only return 8 pairs (faqQuestion1-8, faqAnswer1-8).`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: prompt,
        }],
      });

      // Extract the JSON from the response
      const content = response.content[0];
      if (content.type !== 'text') {
        throw new Error('Unexpected response type from Claude');
      }

      let responseText = content.text;

      // Try to extract JSON from markdown code blocks first
      const codeBlockMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (codeBlockMatch) {
        responseText = codeBlockMatch[1];
      } else {
        // Try to find JSON object in the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          responseText = jsonMatch[0];
        }
      }

      // Parse the JSON response
      let generatedFAQs: FAQTemplate;
      try {
        generatedFAQs = JSON.parse(responseText);
      } catch (parseError) {
        console.error(`   ❌ Failed to parse JSON. Response text:`);
        console.error(responseText.substring(0, 500));
        throw new Error('Could not parse JSON from Claude response');
      }

      return generatedFAQs;
    } catch (error) {
      console.error(`   ❌ Error generating FAQs for ${pageName}:`, error);
      throw error;
    }
  }

  /**
   * Update a page with new FAQs
   */
  async updatePageFAQs(page: LocalPage, faqs: FAQTemplate): Promise<void> {
    const pageName = page.name || (page.slug as string);

    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: faqs,
      });

      console.log(`   ✅ Updated FAQs for: ${pageName}`);
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${pageName}`);

      if (error.response?.data) {
        console.error('   Strapi error response:', JSON.stringify(error.response.data, null, 2));
      }

      if (error.response?.status === 400) {
        console.error('   This is likely due to invalid data format or field validation errors');
        console.error('   First few FAQ fields being sent:');
        console.error('   faqContent:', faqs.faqContent?.substring(0, 100));
        console.error('   faqQuestion1:', faqs.faqQuestion1?.substring(0, 100));
        console.error('   faqAnswer1:', faqs.faqAnswer1?.substring(0, 100));
      }

      throw error;
    }
  }

  /**
   * Main execution flow
   */
  async run(): Promise<void> {
    console.log('🚀 Starting FAQ Generation for City Pages\n');
    console.log(`Production Strapi URL: ${STRAPI_URL}\n`);

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

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const pageName = page.name || (page.slug as string);

        console.log(`[${i + 1}/${pages.length}] Processing: ${pageName}`);

        try {
          // Generate FAQs
          const generatedFAQs = await this.generateFAQsForCity(page);

          // Update in Strapi
          await this.updatePageFAQs(page, generatedFAQs);

          successCount++;

          // Add a small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`   ❌ Failed to process ${pageName}`);
          errorCount++;

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
      console.log('='.repeat(60) + '\n');

      if (successCount > 0) {
        console.log('🎉 FAQ generation completed successfully!');
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
