#!/usr/bin/env tsx
/**
 * Rewrite FAQs for SEO with Claude Opus 4.6
 *
 * This script:
 * 1. Fetches all published pages with existing FAQs
 * 2. Parses current FAQ question/answer pairs from faqsRichText HTML
 * 3. Sends existing FAQs + page context to Claude Opus 4.6 for SEO rewrite
 * 4. Builds accordion HTML and pushes updated faqsRichText to Strapi
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
const CACHE_PATH = join(__dirname, '../data/faq-seo-cache.json');
const OLD_CACHE_PATH = join(__dirname, '../data/faq-cache.json');

const CHEVRON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

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
  serviceType?: string;
  city?: string;
  state?: string;
  residentialCalcHeader?: string;
  faqsRichText?: string;
}

interface CachedFAQ {
  faqs: FAQPair[];
  generatedAt: string;
}

class FAQSEORewriter {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private cache: Record<string, CachedFAQ> = {};
  private oldCache: Record<string, { faqs: FAQPair[] }> = {};
  private aiCallCount = 0;

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    this.strapiClient = axios.create({
      baseURL: `${STRAPI_URL}/api`,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    this.anthropic = new Anthropic({ apiKey });

    // Load SEO cache
    if (existsSync(CACHE_PATH)) {
      this.cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8'));
      console.log(`📂 Loaded ${Object.keys(this.cache).length} cached SEO FAQ entries`);
    }

    // Load old o3 cache as fallback for pages with no existing FAQs
    if (existsSync(OLD_CACHE_PATH)) {
      this.oldCache = JSON.parse(readFileSync(OLD_CACHE_PATH, 'utf-8'));
      console.log(`📂 Loaded ${Object.keys(this.oldCache).length} old FAQ cache entries (fallback)`);
    }
  }

  private saveCache(): void {
    writeFileSync(CACHE_PATH, JSON.stringify(this.cache, null, 2));
  }

  /**
   * Strip HTML tags to get plain text
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
   * Parse existing FAQ pairs from faqsRichText HTML
   */
  private parseExistingFAQs(html: string): FAQPair[] {
    const faqs: FAQPair[] = [];

    // Match question/answer pairs from accordion HTML
    const questionRegex = /<h3[^>]*class="faqs-question"[^>]*>(.*?)<\/h3>/gi;
    const answerRegex = /<p[^>]*class="faqs-answer"[^>]*>(.*?)<\/p>/gi;

    const questions: string[] = [];
    const answers: string[] = [];

    let match;
    while ((match = questionRegex.exec(html)) !== null) {
      questions.push(this.stripHTML(match[1]));
    }
    while ((match = answerRegex.exec(html)) !== null) {
      // Strip the "Learn more." link from answers
      let answer = match[1].replace(/<a[^>]*>.*?<\/a>/gi, '').trim();
      answer = this.stripHTML(answer);
      // Remove trailing period if "Learn more." was removed
      answer = answer.replace(/\s*$/, '');
      answers.push(answer);
    }

    for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
      faqs.push({ question: questions[i], answer: answers[i] });
    }

    return faqs;
  }

  /**
   * Rewrite FAQs using Claude Opus 4.6
   */
  async rewriteFAQs(
    page: LocalPage,
    existingFAQs: FAQPair[],
    force: boolean
  ): Promise<FAQPair[]> {
    // Check cache unless --force
    if (!force && this.cache[page.documentId]) {
      console.log(`   📂 Using cached SEO FAQs`);
      return this.cache[page.documentId].faqs;
    }

    this.aiCallCount++;

    const city = page.city || 'Unknown';
    const state = page.state || 'MD';
    const serviceType = page.serviceType || 'roofing';

    console.log(`   🤖 AI call #${this.aiCallCount}: Rewriting FAQs for ${city}, ${state} (${serviceType})...`);

    const calcText = page.residentialCalcHeader
      ? this.stripHTML(page.residentialCalcHeader).slice(0, 500)
      : 'No quoting tool data available.';

    const existingFAQsJSON = JSON.stringify(existingFAQs, null, 2);

    const systemPrompt = 'You are an SEO copywriter for Capitol Improvements, a home improvement company serving Maryland, Virginia, and Washington DC.';

    const userPrompt = `Rewrite these 6 FAQ items for the following service page. Optimize for local SEO — questions should match real search queries homeowners would type into Google.

City: ${city}, ${state}
Service: ${serviceType}
Page title: ${page.title || page.slug}

Quoting tool info (use this for cost-related answers):
${calcText}

Current FAQs:
${existingFAQsJSON}

Rules:
- Return exactly 6 FAQ items
- Every question MUST be a real question ending with "?"
- Questions should target long-tail local keywords (e.g. "How much does roof replacement cost in Pasadena, MD?")
- Answers should be 2-3 sentences max, professional, and naturally include "${city}" and the service type
- Do not repeat the same keyword pattern across all 6 questions — vary the intent (cost, timeline, materials, process, local relevance, trust)
- Exactly 1 of the 6 questions MUST be geographically specific to ${city} — reference a real local concern unique to that area (e.g. coastal wind damage for Annapolis, storm damage for inland Waldorf, salt air corrosion for Chesapeake Bay towns, urban row-home constraints for Baltimore, historic district rules for Frederick). The other 5 can be standard service questions.
- For any cost-related question, base the answer on the quoting tool info provided above. Do not invent pricing.
- Avoid generic filler — every sentence should add value

Return ONLY a JSON array: [{"question": "...", "answer": "..."}, ...]
No markdown, no code fences, just the raw JSON array.`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-opus-4-6',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      });

      const text = (response.content[0] as { type: string; text: string }).text.trim();

      // Parse JSON - handle potential markdown fences
      const jsonStr = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
      const faqs: FAQPair[] = JSON.parse(jsonStr);

      if (!Array.isArray(faqs) || faqs.length === 0) {
        throw new Error('Invalid FAQ response format');
      }

      // Cache result
      this.cache[page.documentId] = {
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
   * Generate the full accordion HTML
   */
  private buildAccordionHTML(
    faqs: FAQPair[],
    serviceType: string,
    city: string,
    state: string
  ): string {
    const config = SERVICE_CONFIG[serviceType];
    if (!config) return '';

    const title = config.titlePattern
      .replace(/\{city\}/g, city)
      .replace(/\{state\}/g, state);

    const itemsHTML = faqs
      .map((faq) => this.buildFAQItem(faq.question, faq.answer, config.defaultLink))
      .join('');

    return `<div class="faqs-inner-wrapper"><h2 class="faqs-title">${title}</h2><div class="faqs-list">${itemsHTML}</div></div>`;
  }

  /**
   * Fetch all published pages with needed fields
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
          'fields[2]': 'serviceType',
          'fields[3]': 'city',
          'fields[4]': 'state',
          'fields[5]': 'residentialCalcHeader',
          'fields[6]': 'faqsRichText',
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
        data: { faqsRichText: htmlContent },
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
    slug?: string;
    service?: string;
    force?: boolean;
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug, service, force = false } = options;

    console.log('🤖 FAQ SEO Rewriter (Claude Opus 4.6)\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    console.log(`AI Model: claude-opus-4-6`);
    console.log(`Force regenerate: ${force}`);
    if (service) console.log(`Service filter: ${service}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    let pages = await this.fetchAllPages();

    // Filter by slug
    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to slug: ${slug} (${pages.length} match)`);
    }

    // Filter by service type (from Strapi field)
    if (service) {
      pages = pages.filter((p) => p.serviceType === service);
      console.log(`📌 Filtered to ${pages.length} ${service} pages`);
    }

    // Filter to only pages with a valid serviceType
    pages = pages.filter((p) => {
      if (p.serviceType && SERVICE_CONFIG[p.serviceType]) return true;
      console.log(`   ⏭️ Skipping ${p.slug} (no serviceType set — run populate-page-metadata first)`);
      return false;
    });

    // Apply limit
    if (limit && limit > 0) {
      pages = pages.slice(0, limit);
      console.log(`📌 Limited to first ${limit} pages`);
    }

    if (pages.length === 0) {
      console.log('\n⚠️ No pages found to update. Make sure serviceType is populated (run populate-page-metadata first).');
      return;
    }

    console.log(`\n🔄 Processing ${pages.length} pages...\n`);

    let successCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const city = page.city || 'Unknown';
      const state = page.state || 'MD';
      const serviceType = page.serviceType!;

      console.log(`[${i + 1}/${pages.length}] ${page.slug}`);
      console.log(`   City: ${city}, State: ${state}, Service: ${serviceType}`);

      // Parse existing FAQs from HTML
      let existingFAQs: FAQPair[] = [];
      if (page.faqsRichText) {
        existingFAQs = this.parseExistingFAQs(page.faqsRichText);
        console.log(`   📄 Parsed ${existingFAQs.length} existing FAQ pairs from HTML`);
      }

      // Fallback to old cache if no existing FAQs
      if (existingFAQs.length === 0 && this.oldCache[page.documentId]) {
        existingFAQs = this.oldCache[page.documentId].faqs;
        console.log(`   📂 Using ${existingFAQs.length} FAQ pairs from old cache (fallback)`);
      }

      if (existingFAQs.length === 0) {
        console.log(`   ⏭️ No existing FAQs found, skipping`);
        skippedCount++;
        continue;
      }

      try {
        // Rewrite FAQs with Claude
        const faqs = await this.rewriteFAQs(page, existingFAQs, force);
        console.log(`   ✅ Generated ${faqs.length} SEO FAQ items`);

        // Build HTML
        const htmlContent = this.buildAccordionHTML(faqs, serviceType, city, state);

        if (dryRun) {
          console.log(`   📝 Preview (${htmlContent.length} chars):`);
          for (const faq of faqs) {
            console.log(`      Q: ${faq.question}`);
            console.log(`      A: ${faq.answer.slice(0, 100)}...`);
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
    console.log(`⏭️ Skipped (no existing FAQs): ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
    console.log(`🤖 AI calls made: ${this.aiCallCount}`);
    console.log('='.repeat(60));

    if (!dryRun && successCount > 0) {
      console.log(`\n🎉 SEO FAQ rewrite completed! Verify at: ${STRAPI_URL}/admin`);
    }
  }
}

// Parse CLI arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const isForce = args.includes('--force');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const serviceArg = args.find((arg) => arg.startsWith('--service='));
const service = serviceArg ? serviceArg.split('=')[1] : undefined;
const slugArg = args.find((arg) => arg.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/rewrite-faqs-seo.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --service=<type>   Only update specific service type (roofing, siding, deck, window, door, gutter)
  --slug=<slug>      Only update a specific page by slug
  --force            Ignore cache and regenerate all
  --help             Show this help message

Examples:
  npx tsx scripts/rewrite-faqs-seo.ts --dry-run --limit=3
  npx tsx scripts/rewrite-faqs-seo.ts --slug=pasadena-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/rewrite-faqs-seo.ts --service=roofing --dry-run
  npx tsx scripts/rewrite-faqs-seo.ts --force --limit=10
`);
  process.exit(0);
}

const rewriter = new FAQSEORewriter();
rewriter.run({ dryRun: isDryRun, limit, service, slug, force: isForce }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
