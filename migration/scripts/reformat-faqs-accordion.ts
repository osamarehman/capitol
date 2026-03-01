#!/usr/bin/env tsx
/**
 * Reformat FAQs Rich Text to Accordion Format
 *
 * Converts all faqsRichText content to the standard accordion HTML structure
 * with faqs-inner-wrapper, faqs-item, chevron SVGs, etc.
 *
 * Uses predefined templates per service type (roofing, siding, deck, window, door, gutter)
 * and replaces city/state names dynamically.
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const CHEVRON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';

interface FAQItem {
  question: string;
  answer: string;
  link: string;
}

interface ServiceTemplate {
  titlePattern: string; // e.g. "Roof Repair and Roof Replacement Services in {city} {state}"
  items: FAQItem[];
}

// FAQ templates per service type - content extracted from existing Pasadena pages
const SERVICE_TEMPLATES: Record<string, ServiceTemplate> = {
  roofing: {
    titlePattern: 'Roof Repair and Roof Replacement Services in {city} {state}',
    items: [
      {
        question: 'Asphalt Shingled Roofing',
        answer: "Standard, classic, you won't find a better value, and with a variety of styles you can make it uniquely your own.",
        link: '/roofing/asphalt-roofing',
      },
      {
        question: 'Standing Seam Metal Roofing',
        answer: "Distinct, durable, and long-lasting, plus it's easier on the environment and your electricity bill.",
        link: '/roofing/metal-roofing',
      },
      {
        question: 'Flat Roofing',
        answer: 'Most often used to maximize useable space, such as on row homes. We install TPO to create a flat roof without seams.',
        link: '/roofing/flat-roofing',
      },
      {
        question: 'Commercial Roofing',
        answer: 'Keep your building looking professional and your clients safe. We offer shingle, metal, and flat roofing for businesses.',
        link: '/roofing/commercial-roofing',
      },
      {
        question: 'Roof Installation',
        answer: 'We install new roofs that last a lifetime. If you are unsure which style of roof is best for you home click the link to find out about the different types and styles.',
        link: '/roofing',
      },
      {
        question: 'Roof Replacement',
        answer: 'Tearing off the old roof and installing you a roof that lasts a Lifetime. We do it every day and in fact most roofs get replaced in a day.',
        link: '/roofing',
      },
    ],
  },
  siding: {
    titlePattern: 'Siding Installation and Siding Replacement Services in {city} {state}',
    items: [
      {
        question: 'Vinyl Siding',
        answer: "Affordable, versatile, and low-maintenance, vinyl siding comes in countless colors and styles to match your home's aesthetic.",
        link: '/siding/vinyl-siding',
      },
      {
        question: 'Fiber Cement Siding',
        answer: "Durable, fire-resistant, and built to withstand {stateFull}'s weather while maintaining its beauty for decades.",
        link: '/siding/fiber-cement-siding',
      },
      {
        question: 'Wood Siding',
        answer: 'Natural, timeless elegance that adds character and warmth to your {city} home with proper care and maintenance.',
        link: '/siding/wood-siding',
      },
      {
        question: 'Commercial Siding',
        answer: 'Protect your business investment with professional-grade siding that stands up to the elements and enhances curb appeal.',
        link: '/siding/commercial-siding',
      },
      {
        question: 'Siding Installation',
        answer: "We install new siding that protects and beautifies your home for years to come. If you're unsure which style is best, click to explore your options.",
        link: '/siding',
      },
      {
        question: 'Siding Replacement',
        answer: 'Removing old, damaged siding and installing fresh, durable protection for your home. Most siding projects are completed efficiently with minimal disruption.',
        link: '/siding',
      },
    ],
  },
  deck: {
    titlePattern: 'Deck Building and Deck Repair Services in {city} {state}',
    items: [
      {
        question: 'Pressure-Treated Wood Decks',
        answer: 'Affordable, reliable, and time-tested. Pressure-treated lumber provides excellent value and durability for your outdoor living space.',
        link: '/decks/pressure-treated-decks',
      },
      {
        question: 'Composite Decking',
        answer: 'Low-maintenance, long-lasting, and eco-friendly with the look of real wood without the upkeep. Perfect for busy homeowners.',
        link: '/decks/composite-decking',
      },
      {
        question: 'Cedar and Hardwood Decks',
        answer: 'Premium, natural beauty with rich tones and natural resistance to insects and decay. A stunning addition to any home.',
        link: '/decks/wood-decking',
      },
      {
        question: 'Multi-Level Decks',
        answer: 'Maximize your outdoor space and create distinct entertainment areas. Perfect for sloped yards or homes wanting elevated design.',
        link: '/decks/custom-decks',
      },
      {
        question: 'Deck Installation',
        answer: 'We build custom decks designed to last a lifetime. If you are unsure which material or style is best for your home click the link to find out about the different options.',
        link: '/decks',
      },
      {
        question: 'Deck Repair and Replacement',
        answer: 'Replacing worn boards, reinforcing structure, or complete deck replacement. We work efficiently and most deck projects are completed in just a few days.',
        link: '/decks',
      },
    ],
  },
  window: {
    titlePattern: 'Window Replacement Services in {city} {state}',
    items: [
      {
        question: 'Vinyl Replacement Windows',
        answer: 'Energy-efficient, low-maintenance, and affordable, vinyl windows offer excellent insulation and come in a variety of styles to match your home.',
        link: '/windows/vinyl-windows',
      },
      {
        question: 'Double-Hung Windows',
        answer: 'Classic and versatile, with both sashes that move up and down for easy cleaning and superior ventilation control.',
        link: '/windows/double-hung-windows',
      },
      {
        question: 'Bay and Bow Windows',
        answer: 'Add architectural interest and extra space to your {city} home while flooding rooms with natural light and expanding your view.',
        link: '/windows/bay-bow-windows',
      },
      {
        question: 'Energy-Efficient Windows',
        answer: "Lower your energy bills and increase comfort with advanced Low-E glass and multi-pane technology designed for {stateFull}'s climate.",
        link: '/windows/energy-efficient-windows',
      },
      {
        question: 'Window Installation',
        answer: 'We install new windows that enhance your home\'s beauty and efficiency. If you are unsure which style of window is best for your home click the link to find out about the different types and styles.',
        link: '/windows',
      },
      {
        question: 'Full Window Replacement',
        answer: 'Complete window replacement from old to new. We handle every detail professionally and most window replacement projects are completed in just one to two days.',
        link: '/windows',
      },
    ],
  },
  door: {
    titlePattern: 'Door Replacement Services in {city} {state}',
    items: [
      {
        question: 'Entry Door Replacement',
        answer: "Make a lasting first impression with a beautiful, secure entry door. Choose from wood, fiberglass, or steel options to match your home's style.",
        link: '/doors/entry-doors',
      },
      {
        question: 'French Door Installation',
        answer: 'Elegant and timeless, French doors bring natural light into your home while creating seamless indoor-outdoor flow.',
        link: '/doors/french-doors',
      },
      {
        question: 'Sliding Glass Door Replacement',
        answer: 'Perfect for patios and decks, our energy-efficient sliding doors provide easy access and beautiful views.',
        link: '/doors/sliding-doors',
      },
      {
        question: 'Storm Door Installation',
        answer: 'Add an extra layer of protection and ventilation to your entryway. Storm doors extend the life of your main door and improve energy efficiency.',
        link: '/doors/storm-doors',
      },
      {
        question: 'New Door Installation',
        answer: "We install new doors that enhance your home's curb appeal and security. If you are unsure which style of door is best for your home click the link to find out about the different types and styles.",
        link: '/doors',
      },
      {
        question: 'Full Door Replacement',
        answer: 'Replacing your old, drafty doors with energy-efficient models that last for decades. We complete most door replacements in a single day.',
        link: '/doors',
      },
    ],
  },
  gutter: {
    titlePattern: 'Gutter Guards & Gutter Services in {city} {state}',
    items: [
      {
        question: 'Gutter Guard Installation',
        answer: 'Protect your gutters from leaves and debris while reducing maintenance. Our gutter guards keep water flowing freely year-round.',
        link: '/gutters/gutter-guards',
      },
      {
        question: 'Seamless Gutter Installation',
        answer: 'Custom-fitted to your home with no leaky joints. Our seamless gutters provide superior protection and a clean, finished look.',
        link: '/gutters/seamless-gutters',
      },
      {
        question: 'Gutter Repair',
        answer: 'Leaking, sagging, or overflowing gutters? We fix all gutter problems to restore proper drainage and protect your foundation.',
        link: '/gutters/gutter-repair',
      },
      {
        question: 'Gutter Replacement',
        answer: 'Old gutters failing? We remove your worn-out system and install new, durable gutters that protect your {city} home for years to come.',
        link: '/gutters',
      },
      {
        question: 'Downspout Installation & Repair',
        answer: 'Proper downspout placement is critical for directing water away from your foundation. We install and repair downspouts to ensure complete protection.',
        link: '/gutters',
      },
      {
        question: 'Commercial Gutter Services',
        answer: 'Keep your business property protected from water damage. We offer complete gutter solutions for commercial buildings in {city}.',
        link: '/gutters/commercial-gutters',
      },
    ],
  },
};

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
}

class FAQReformatter {
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

    // Fallback: extract from slug
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
    // Default to Maryland
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
   * Build a single FAQ item HTML
   */
  private buildFAQItem(question: string, answer: string, link: string): string {
    return `<div class="faqs-item"><div class="faqs-question-wrapper"><h3 class="faqs-question">${question}</h3><div class="faqs-chevron-wrapper">${CHEVRON_SVG}</div></div><div class="faqs-content"><div class="faqs-answer-wrapper"><p class="faqs-answer">${answer} <a href="${link}">Learn more.</a></p></div></div></div>`;
  }

  /**
   * Generate the full accordion HTML for a page
   */
  generateAccordionHTML(serviceType: string, city: string, stateAbbr: string, stateFull: string): string {
    const template = SERVICE_TEMPLATES[serviceType];
    if (!template) return '';

    // Build title
    const title = template.titlePattern
      .replace(/\{city\}/g, city)
      .replace(/\{state\}/g, stateAbbr);

    // Build FAQ items
    const itemsHTML = template.items
      .map((item) => {
        const answer = item.answer
          .replace(/\{city\}/g, city)
          .replace(/\{stateFull\}/g, stateFull);
        return this.buildFAQItem(item.question, answer, item.link);
      })
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

    console.log('📋 FAQ Accordion Reformatter\n');
    console.log(`Strapi URL: ${STRAPI_URL}`);
    console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
    if (service) console.log(`Service filter: ${service}`);
    if (slug) console.log(`Slug filter: ${slug}`);
    if (limit) console.log(`Limit: ${limit} pages`);
    console.log('');

    // Fetch pages
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
        return serviceType && SERVICE_TEMPLATES[serviceType];
      });
      console.log(`📌 Found ${pages.length} pages with matching templates`);
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

      if (!serviceType || !SERVICE_TEMPLATES[serviceType]) {
        console.log(`   ⏭️ Skipped (no template for service type)`);
        skippedCount++;
        continue;
      }

      const htmlContent = this.generateAccordionHTML(serviceType, city, state.abbr, state.full);

      if (dryRun) {
        console.log(`   ✅ Would update with accordion format (${htmlContent.length} chars)`);
        successCount++;
        continue;
      }

      try {
        const success = await this.updatePage(page, htmlContent);
        if (success) {
          console.log(`   ✅ Updated successfully`);
          successCount++;
        } else {
          errorCount++;
        }
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
    console.log(`⏭️ Skipped: ${skippedCount} pages`);
    console.log(`❌ Failed: ${errorCount} pages`);
    console.log(`📄 Total processed: ${pages.length} pages`);
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
Usage: npx tsx scripts/reformat-faqs-accordion.ts [options]

Options:
  --dry-run          Preview changes without updating Strapi
  --limit=N          Process only first N pages
  --service=<type>   Only update specific service type (roofing, siding, deck, window, door, gutter)
  --slug=<slug>      Only update a specific page by slug
  --help             Show this help message

Examples:
  npx tsx scripts/reformat-faqs-accordion.ts --dry-run
  npx tsx scripts/reformat-faqs-accordion.ts --slug=pasadena-maryland-roofing-company-near-you --dry-run
  npx tsx scripts/reformat-faqs-accordion.ts --service=siding
  npx tsx scripts/reformat-faqs-accordion.ts --limit=5
`);
  process.exit(0);
}

const reformatter = new FAQReformatter();
reformatter.run({ dryRun: isDryRun, limit, service, slug }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
