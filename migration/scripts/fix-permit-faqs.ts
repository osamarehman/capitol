#!/usr/bin/env tsx
/**
 * Fix Permit FAQ Answers
 *
 * Corrects inaccurate permit-related FAQ answers across all pages.
 * Reality: Most roofing jobs do NOT require a permit in MD/VA.
 * Only Washington DC requires a permit. District Heights requires
 * a town-level permit (not county). A handful of other townships
 * may have their own requirements, but county-level permits are
 * generally not required for residential roofing.
 *
 * This script:
 * 1. Fetches all pages with faqsRichText
 * 2. Identifies pages with permit-related FAQ questions
 * 3. Uses Claude to rewrite ONLY the permit Q&A with accurate info
 * 4. Rebuilds the accordion HTML and pushes to Strapi
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

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
  faqsRichText?: string;
}

class PermitFAQFixer {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
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
  }

  /**
   * Strip HTML tags
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
    const questionRegex = /<h3[^>]*class="faqs-question"[^>]*>(.*?)<\/h3>/gi;
    const answerRegex = /<p[^>]*class="faqs-answer"[^>]*>(.*?)<\/p>/gi;

    const questions: string[] = [];
    const answers: string[] = [];

    let match;
    while ((match = questionRegex.exec(html)) !== null) {
      questions.push(this.stripHTML(match[1]));
    }
    while ((match = answerRegex.exec(html)) !== null) {
      let answer = match[1].replace(/<a[^>]*>.*?<\/a>/gi, '').trim();
      answer = this.stripHTML(answer);
      answers.push(answer);
    }

    for (let i = 0; i < Math.min(questions.length, answers.length); i++) {
      faqs.push({ question: questions[i], answer: answers[i] });
    }

    return faqs;
  }

  /**
   * Check if a FAQ pair is about permits
   */
  private isPermitFAQ(faq: FAQPair): boolean {
    const text = (faq.question + ' ' + faq.answer).toLowerCase();
    return text.includes('permit') || text.includes('permitting');
  }

  /**
   * Rewrite just the permit FAQ using Claude
   */
  private async rewritePermitFAQ(
    faq: FAQPair,
    city: string,
    state: string,
    serviceType: string
  ): Promise<FAQPair> {
    this.aiCallCount++;

    const systemPrompt = 'You are an SEO copywriter for Capitol Improvements, a home improvement company serving Maryland, Virginia, and Washington DC.';

    const userPrompt = `Rewrite this single FAQ item about permits. The current answer contains inaccurate permit information that needs to be corrected.

City: ${city}, ${state}
Service: ${serviceType}

Current question: ${faq.question}
Current answer: ${faq.answer}

CRITICAL PERMIT FACTS — use these as the source of truth:
- Most residential roofing/siding/window/door/gutter/deck jobs in Maryland and Virginia do NOT require a building permit
- Washington DC DOES require permits for most home improvement work
- District Heights, MD requires a TOWN-level permit (not county-level)
- A small number of other municipalities may have their own permit requirements, but this is the exception, not the rule
- County-level permits (Anne Arundel County, Prince George's County, Montgomery County, etc.) are generally NOT required for standard residential roofing replacement
- When in doubt, our team checks local requirements for the homeowner

Rules:
- Keep the question as a real question ending with "?"
- Keep the answer 2-3 sentences max
- Naturally include "${city}" and the service type
- Make the answer factually accurate based on the permit facts above
- If the city is Washington DC, say permits ARE required
- If the city is District Heights, mention the town permit requirement
- For all other cities, the answer should reflect that permits are generally NOT required but we verify local requirements as a courtesy

Return ONLY a JSON object: {"question": "...", "answer": "..."}
No markdown, no code fences, just the raw JSON object.`;

    const response = await this.anthropic.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    const text = (response.content[0] as { type: string; text: string }).text.trim();
    const jsonStr = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(jsonStr);
  }

  /**
   * Build a single FAQ item HTML
   */
  private buildFAQItem(question: string, answer: string, link: string): string {
    return `<div class="faqs-item"><div class="faqs-question-wrapper"><h3 class="faqs-question">${question}</h3><div class="faqs-chevron-wrapper">${CHEVRON_SVG}</div></div><div class="faqs-content"><div class="faqs-answer-wrapper"><p class="faqs-answer">${answer} <a href="${link}">Learn more.</a></p></div></div></div>`;
  }

  /**
   * Rebuild full accordion HTML from FAQ pairs
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
          'fields[0]': 'title',
          'fields[1]': 'slug',
          'fields[2]': 'serviceType',
          'fields[3]': 'city',
          'fields[4]': 'state',
          'fields[5]': 'faqsRichText',
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
  async updatePage(documentId: string, html: string): Promise<boolean> {
    try {
      await this.strapiClient.put(`/services/${documentId}`, {
        data: { faqsRichText: html },
      });
      return true;
    } catch (error: any) {
      console.error(`   ❌ Failed to update ${documentId}`);
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
  } = {}): Promise<void> {
    const { dryRun = false, limit, slug } = options;

    console.log('🔧 Permit FAQ Fixer\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    let pages = await this.fetchAllPages();

    if (slug) {
      pages = pages.filter((p) => p.slug === slug);
      console.log(`📌 Filtered to slug: ${slug} (${pages.length} match)`);
    }

    // Filter to pages that have FAQs and a valid serviceType
    pages = pages.filter((p) => p.faqsRichText && p.serviceType && SERVICE_CONFIG[p.serviceType]);

    // Identify pages with permit FAQs
    const pagesWithPermitFAQs: { page: LocalPage; faqs: FAQPair[]; permitIndex: number }[] = [];

    for (const page of pages) {
      const faqs = this.parseExistingFAQs(page.faqsRichText!);
      const permitIdx = faqs.findIndex((f) => this.isPermitFAQ(f));
      if (permitIdx !== -1) {
        pagesWithPermitFAQs.push({ page, faqs, permitIndex: permitIdx });
      }
    }

    console.log(`📌 Found ${pagesWithPermitFAQs.length} pages with permit-related FAQs`);

    if (limit && limit > 0) {
      pagesWithPermitFAQs.splice(limit);
      console.log(`📌 Limited to first ${limit} pages`);
    }

    if (pagesWithPermitFAQs.length === 0) {
      console.log('\n⚠️ No pages with permit FAQs found');
      return;
    }

    console.log(`\n🔄 Processing ${pagesWithPermitFAQs.length} pages...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < pagesWithPermitFAQs.length; i++) {
      const { page, faqs, permitIndex } = pagesWithPermitFAQs[i];
      const city = page.city || 'Unknown';
      const state = page.state || 'MD';
      const serviceType = page.serviceType!;

      console.log(`[${i + 1}/${pagesWithPermitFAQs.length}] ${page.slug}`);
      console.log(`   City: ${city}, State: ${state}, Service: ${serviceType}`);
      console.log(`   Permit FAQ #${permitIndex + 1}: "${faqs[permitIndex].question}"`);

      try {
        // Rewrite just the permit FAQ
        const rewritten = await this.rewritePermitFAQ(faqs[permitIndex], city, state, serviceType);
        console.log(`   ✏️  New Q: "${rewritten.question}"`);
        console.log(`   ✏️  New A: "${rewritten.answer.slice(0, 120)}..."`);

        // Replace the permit FAQ in the array
        faqs[permitIndex] = rewritten;

        // Rebuild full HTML
        const html = this.buildAccordionHTML(faqs, serviceType, city, state);

        if (dryRun) {
          successCount++;
          continue;
        }

        const success = await this.updatePage(page.documentId, html);
        if (success) {
          console.log(`   ✅ Updated`);
          successCount++;
        } else {
          errorCount++;
        }

        await new Promise((resolve) => setTimeout(resolve, 150));
      } catch (error: any) {
        console.error(`   ❌ Error: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Successfully ${dryRun ? 'would fix' : 'fixed'}: ${successCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total with permit FAQs: ${pagesWithPermitFAQs.length} pages`);
    console.log(`🤖 AI calls made: ${this.aiCallCount}`);
    console.log('='.repeat(60));
  }
}

// Parse CLI args
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const limitArg = args.find((a) => a.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = args.find((a) => a.startsWith('--slug='));
const slug = slugArg ? slugArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/fix-permit-faqs.ts [options]

Options:
  --dry-run       Preview corrections without updating Strapi
  --limit=N       Process only first N affected pages
  --slug=<slug>   Fix a specific page only
  --help          Show this help message

Examples:
  npx tsx scripts/fix-permit-faqs.ts --dry-run --limit=5
  npx tsx scripts/fix-permit-faqs.ts --slug=pasadena-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/fix-permit-faqs.ts
`);
  process.exit(0);
}

const fixer = new PermitFAQFixer();
fixer.run({ dryRun: isDryRun, limit, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
