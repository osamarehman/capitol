#!/usr/bin/env tsx
/**
 * Regenerate FAQ Content with OpenAI + Page Context
 *
 * Fetches real page content (mainStoryRichText, recentProjectDescription,
 * residentialCalcHeader, mapSection) and uses OpenAI to generate locally
 * relevant FAQ Q&A pairs. Outputs accordion HTML to faqsRichText.
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import OpenAI from 'openai';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const CACHE_PATH = join(__dirname, '../data/faq-cache.json');

const CHEVRON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

// Title patterns per service type (from reformat-faqs-accordion.ts)
const SERVICE_CONFIG: Record<string, { titlePattern: string; defaultLink: string }> = {
  roofing: {
    titlePattern: 'Roof Repair and Roof Replacement Services in {city} {state}',
    defaultLink: '/roofing',
  },
  siding: {
    titlePattern: 'Siding Installation and Siding Replacement Services in {city} {state}',
    defaultLink: '/siding',
  },
  deck: {
    titlePattern: 'Deck Building and Deck Repair Services in {city} {state}',
    defaultLink: '/decks',
  },
  window: {
    titlePattern: 'Window Replacement Services in {city} {state}',
    defaultLink: '/windows',
  },
  door: {
    titlePattern: 'Door Replacement Services in {city} {state}',
    defaultLink: '/doors',
  },
  gutter: {
    titlePattern: 'Gutter Guards & Gutter Services in {city} {state}',
    defaultLink: '/gutters',
  },
};

interface FAQPair {
  question: string;
  answer: string;
}

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
  mainStoryRichText?: string;
  recentProjectDescription?: string;
  residentialCalcHeader?: string;
  mapSection?: string;
}

interface CachedFAQ {
  faqs: FAQPair[];
  generatedAt: string;
}

class FAQRegenerator {
  private strapiClient: AxiosInstance;
  private openai: OpenAI;
  private cache: Record<string, CachedFAQ> = {};
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

    // Load cache
    if (existsSync(CACHE_PATH)) {
      this.cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      console.log(`📂 Loaded ${Object.keys(this.cache).length} cached FAQ entries`);
    }
  }

  private saveCache(): void {
    writeFileSync(CACHE_PATH, JSON.stringify(this.cache, null, 2));
  }

  /**
   * Strip HTML tags to get plain text for AI context
   */
  private stripHTML(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extract city name from page
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

    const slug = page.slug;
    const cleanSlug = slug
      .replace(/-maryland-.*$/, '')
      .replace(/-virginia-.*$/, '')
      .replace(/-md-.*$/, '')
      .replace(/-va-.*$/, '')
      .replace(/-dc-.*$/, '')
      .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio).*$/, '');

    const city = cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return city || 'Maryland';
  }

  /**
   * Extract state info from slug
   */
  private extractStateFromSlug(slug: string): { abbr: string; full: string } {
    if (slug.includes('-virginia-') || slug.includes('-va-') || slug.startsWith('virginia-')) {
      return { abbr: 'VA', full: 'Virginia' };
    }
    if (slug.includes('-dc-') || slug.startsWith('washington-dc')) {
      return { abbr: 'DC', full: 'DC' };
    }
    return { abbr: 'MD', full: 'Maryland' };
  }

  /**
   * Determine service type from slug
   */
  private getServiceType(slug: string): string | null {
    if (slug.includes('roofing')) return 'roofing';
    if (slug.includes('siding')) return 'siding';
    if (slug.includes('deck')) return 'deck';
    if (slug.includes('window')) return 'window';
    if (slug.includes('door')) return 'door';
    if (slug.includes('gutter')) return 'gutter';
    return null;
  }

  /**
   * Build page context string from available fields
   */
  private buildPageContext(page: LocalPage): string {
    const sections: string[] = [];

    if (page.mainStoryRichText) {
      const text = this.stripHTML(page.mainStoryRichText);
      if (text.length > 50) sections.push(`Main content: ${text.slice(0, 1500)}`);
    }

    if (page.recentProjectDescription) {
      const text = this.stripHTML(page.recentProjectDescription);
      if (text.length > 50) sections.push(`Recent projects: ${text.slice(0, 500)}`);
    }

    if (page.residentialCalcHeader) {
      const text = this.stripHTML(page.residentialCalcHeader);
      if (text.length > 20) sections.push(`Calculator section: ${text.slice(0, 300)}`);
    }

    if (page.mapSection) {
      const text = this.stripHTML(page.mapSection);
      if (text.length > 20) sections.push(`Service area: ${text.slice(0, 300)}`);
    }

    return sections.join('\n\n');
  }

  /**
   * Generate FAQs using OpenAI
   */
  async generateFAQs(
    city: string,
    stateAbbr: string,
    serviceType: string,
    pageContext: string,
    documentId: string
  ): Promise<FAQPair[]> {
    // Check cache
    if (this.cache[documentId]) {
      console.log(`   📂 Using cached FAQs`);
      return this.cache[documentId].faqs;
    }

    this.aiCallCount++;
    console.log(`   🤖 AI call #${this.aiCallCount}: Generating FAQs for ${city}, ${stateAbbr} (${serviceType})...`);

    const serviceLabel = serviceType === 'deck' ? 'deck building' :
                         serviceType === 'window' ? 'window replacement' :
                         serviceType === 'door' ? 'door replacement' :
                         serviceType === 'gutter' ? 'gutter installation' :
                         `${serviceType} services`;

    const prompt = `You are writing FAQs for a local home improvement company's service page.

City: ${city}, ${stateAbbr}
Service: ${serviceLabel}

Here is content from the page for context:
---
${pageContext || 'No additional page context available.'}
---

Generate exactly 6 FAQ items. Each should have a short question (as a heading, not ending in a question mark) and a 1-2 sentence answer. Focus on the specific service in this specific city.
Make answers practical, professional, and locally relevant. Do not repeat the same information across answers.

Return ONLY a JSON array: [{"question": "...", "answer": "..."}, ...]
No markdown, no code fences, just the raw JSON array.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'o3',
        messages: [{ role: 'user', content: prompt }],
      });

      const text = response.choices[0]?.message?.content?.trim() || '';

      // Parse JSON - handle potential markdown fences
      const jsonStr = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
      const faqs: FAQPair[] = JSON.parse(jsonStr);

      if (!Array.isArray(faqs) || faqs.length === 0) {
        throw new Error('Invalid FAQ response format');
      }

      // Cache result
      this.cache[documentId] = {
        faqs,
        generatedAt: new Date().toISOString(),
      };
      this.saveCache();

      return faqs;
    } catch (error: any) {
      console.error(`   ⚠️ AI error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Build a single FAQ item HTML
   */
  private buildFAQItem(question: string, answer: string, link: string): string {
    return `<div class="faqs-item"><div class="faqs-question-wrapper"><h3 class="faqs-question">${question}</h3><div class="faqs-chevron-wrapper">${CHEVRON_SVG}</div></div><div class="faqs-content"><div class="faqs-answer-wrapper"><p class="faqs-answer">${answer} <a href="${link}">Learn more.</a></p></div></div></div>`;
  }

  /**
   * Generate the full accordion HTML from AI-generated FAQs
   */
  private buildAccordionHTML(
    faqs: FAQPair[],
    serviceType: string,
    city: string,
    stateAbbr: string
  ): string {
    const config = SERVICE_CONFIG[serviceType];
    if (!config) return '';

    const title = config.titlePattern
      .replace(/\{city\}/g, city)
      .replace(/\{state\}/g, stateAbbr);

    const itemsHTML = faqs
      .map((faq) => this.buildFAQItem(faq.question, faq.answer, config.defaultLink))
      .join('');

    return `<div class="faqs-inner-wrapper"><h2 class="faqs-title">${title}</h2><div class="faqs-list">${itemsHTML}</div></div>`;
  }

  /**
   * Fetch all published pages with context fields
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
          'fields[0]': 'title',
          'fields[1]': 'slug',
          'fields[2]': 'mainStoryRichText',
          'fields[3]': 'recentProjectDescription',
          'fields[4]': 'residentialCalcHeader',
          'fields[5]': 'mapSection',
          'pagination[page]': page,
          'pagination[pageSize]': pageSize,
        },
      });

      allPages.push(...response.data.data);

      if (page >= response.data.meta.pagination.pageCount) break;
      page++;
    }

    console.log(`✅ Found ${allPages.length} published pages`);
    return allPages;
  }

  /**
   * Update a page's faqsRichText
   */
  async updatePage(page: LocalPage, htmlContent: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${page.documentId}`, {
        data: {
          faqsRichText: htmlContent,
        },
      });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${page.slug}`);
      if (error.response?.data) {
        console.error('   Error:', JSON.stringify(error.response.data, null, 2));
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
    service?: string;
    slug?: string;
  } = {}): Promise<void> {
    const { dryRun = false, limit, service, slug } = options;

    console.log('🤖 FAQ Regenerator (OpenAI + Page Context)\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log(`AI Model: o3`);
    if (service) console.log(`Service filter: ${service}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    // Fetch pages with context fields
    let pages = await this.fetchAllPages();

    // Filter by slug if provided
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to slug: ${slug} (${pages.length} match)`);
    }

    // Filter by service type
    if (service) {
      pages = pages.filter((p) => this.getServiceType(p.slug) === service);
      console.log(`📌 Filtered to ${pages.length} ${service} pages`);
    } else {
      pages = pages.filter((p) => {
        const serviceType = this.getServiceType(p.slug);
        return serviceType && SERVICE_CONFIG[serviceType];
      });
      console.log(`📌 Found ${pages.length} pages with matching service types`);
    }

    // Apply limit
    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\n⚠️ No pages found to update');
      return;
    }

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const city = this.extractCityFromPage(page);
      const state = this.extractStateFromSlug(page.slug);
      const serviceType = this.getServiceType(page.slug);

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}, State: ${state.abbr}, Service: ${serviceType}`);

      if (!serviceType || !SERVICE_CONFIG[serviceType]) {
        console.log(`   ⏭️ Skipped (no config for service type)`);
        skippedCount++;
        continue;
      }

      // Build page context for AI
      const pageContext = this.buildPageContext(page);
      const contextLength = pageContext.length;
      console.log(`   📄 Page context: ${contextLength} chars`);

      try {
        // Generate FAQs via AI
        const faqs = await this.generateFAQs(city, state.abbr, serviceType, pageContext, page.documentId);
        console.log(`   ✅ Generated ${faqs.length} FAQ items`);

        // Build HTML
        const htmlContent = this.buildAccordionHTML(faqs, serviceType, city, state.abbr);

        if (dryRun) {
          console.log(`   📝 Preview (${htmlContent.length} chars):`);
          for (const faq of faqs) {
            console.log(`      Q: ${faq.question}`);
            console.log(`      A: ${faq.answer.slice(0, 80)}...`);
          }
          successCount++;
          continue;
        }

        // Push to Strapi
        const success = await this.updatePage(page, htmlContent);
        if (success) {
          console.log(`   ✅ Updated successfully`);
          successCount++;
        } else {
          errorCount++;
        }

        // Rate limiting pause
        await new Promise((resolve) => setTimeout(resolve, 200));
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
    console.log(`⏭️ Skipped: ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log(`🤖 AI calls made: ${this.aiCallCount}`);
    console.log('='.repeat(60));

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 Update completed! Verify at: ${STRAPI_URL}/admin`);
    }
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const serviceArg = args.find((arg) => arg.startsWith('--service='));
const service = serviceArg ? serviceArg.split('=')[1] : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/regenerate-faqs.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --service=<type>   Only update specific service type (roofing, siding, deck, window, door, gutter)
  --slug=<slug>      Only update a specific page by slug
  --help             Show this help message

Examples:
  npx tsx scripts/regenerate-faqs.ts --dry-run --limit=3
  npx tsx scripts/regenerate-faqs.ts --slug=pasadena-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/regenerate-faqs.ts --service=roofing --dry-run
  npx tsx scripts/regenerate-faqs.ts --limit=5
`);
  process.exit(0);
}

const regenerator = new FAQRegenerator();
regenerator.run({ dryRun: isDryRun, limit, service, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
