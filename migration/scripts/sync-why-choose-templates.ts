#!/usr/bin/env tsx
/**
 * Sync Why Choose Us templates for Windows, Siding, and Decks pages.
 * Roofing is already done - skipped.
 * Replaces "Pasadena" with each page's city name.
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

// ── Templates ────────────────────────────────────────────────────────────

const TEMPLATES: Record<string, string> = {
  window: `<div class="features-header-wrapper">
    <h2>
        Why Pasadena Homeowners Choose Us
    </h2>
    <p>
        Certified installers, local know-how, and warranties that protect your investment.
    </p>
</div>
<div class="features-list">
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770300238/ProVia_b4qh0r.webp">
        </p>
        <div class="item-text-wrapper">
            <h3>
                ProVia Certified Installers
            </h3>
            <p>
                Trained and certified to install ProVia products to manufacturer standards
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770526208/five-star-rating-icon_1_plpmjl.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                A True 5-Star Rating
            </h3>
            <p>
                We maintain a true 5-star rating online because we do quality work and genuinely care about our customers
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916686/hammer_icon_haniri.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Precision Installation
            </h3>
            <p>
                Installed correctly to prevent drafts, leaks, and long-term issues
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
                Strong warranties that protect your investment
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/holding-house-icon_lxtzdg.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Energy-Efficient Performance
            </h3>
            <p>
                Advanced glass and insulation designed to improve comfort and reduce energy costs
            </p>
        </div>
    </div>
</div>
<div class="features-content-wrapper">
    <div class="features-image-wrapper">
        <div class="features_image-block">
            <p>
                <img class="certification-image" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770527324/ProVia_Certificate_Fitted_Crop_yosl1x.jpg">
            </p>
            <blockquote class="features-caption">
                <p>
                    ProVia Certified Installer
                </p>
            </blockquote>
        </div>
        <div class="features_image-block">
            <p>
                <img class="certification-image" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770527324/ProVia_Certificate_2_fitted_crop_mr5dfd.jpg">
            </p>
            <blockquote class="features-caption">
                <p>
                    ProVia Certified Installer
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
    width: auto;
    max-width: 5rem;
    height: 3rem;
    object-fit: contain;
    display: block;
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
    object-fit: contain;
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
</style>`,

  siding: `<div class="features-header-wrapper">
    <h2>
        Why Pasadena Homeowners Choose Us
    </h2>
    <p>
        Certified installers, local know-how, and warranties that protect your investment.
    </p>
</div>
<div class="features-list">
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770299159/James-Hardie-Preferred_rarr7e.webp">
        </p>
        <div class="item-text-wrapper">
            <h3>
                James Hardie Preferred Partner
            </h3>
            <p>
                Authorized to install James Hardie fiber cement siding
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770526208/five-star-rating-icon_1_plpmjl.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                5-Star Rated for Hardie Siding
            </h3>
            <p>
                The only Preferred Contractor locally with a perfect rating
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916686/hammer_icon_haniri.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Proven Installation Specialists
            </h3>
            <p>
                Detail-driven workmanship on every siding project
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/badge-icon_hljgdo.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Chosen by Local Homeowners
            </h3>
            <p>
                Known for reliability, communication, and results
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/holding-house-icon_lxtzdg.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Built with James Hardie Materials
            </h3>
            <p>
                Authentic products engineered for durability and protection
            </p>
        </div>
    </div>
</div>
<div class="features-content-wrapper">
    <div class="features-image-wrapper">
        <div class="features_image-block">
            <p>
                <img class="certification-image" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770317869/WhatsApp_Image_2026-02-05_at_10.34.06_AM_aay5kl.jpg">
            </p>
            <blockquote class="features-caption">
                <p>
                    5-Star Rated for Hardie Siding
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
    width: auto;
    max-width: 5rem;
    height: 3rem;
    object-fit: contain;
    display: block;
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
    aspect-ratio: 2/1;
    object-fit: contain;
    display: block;
  }
  .features-caption {
    text-align: center;
    font-size: 0.875rem;
  }
  .features_image-block {
    display: flex;
    width: 100%;
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
  }
</style>`,

  deck: `<div class="features-header-wrapper">
    <h2>
        Why Pasadena Homeowners Choose Us
    </h2>
    <p>
        Certified, trusted, and highly rated for TimberTech decking installations.
    </p>
</div>
<div class="features-list">
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770299800/BoardProPlatnium_ebzeqm.png">
        </p>
        <div class="item-text-wrapper">
            <h3>
                TimberTech Platinum Certified
            </h3>
            <p>
                The highest recognition level offered to TimberTech contractors
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770526208/five-star-rating-icon_1_plpmjl.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                One of the ONLY 5-Star Rated TimberTech Contractors
            </h3>
            <p>
                One of the ONLY rated 5 stars for TimberTech deck installations and service
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916686/hammer_icon_haniri.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Expert TimberTech Installers
            </h3>
            <p>
                Trained and experienced in TimberTech composite and PVC decking systems
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/badge-icon_hljgdo.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Trusted Local Contractor
            </h3>
            <p>
                Serving homeowners with dependable craftsmanship and honest service
            </p>
        </div>
    </div>
    <div class="features-item">
        <p>
            <img class="features-icon" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1767916685/holding-house-icon_lxtzdg.svg">
        </p>
        <div class="item-text-wrapper">
            <h3>
                Premium Materials
            </h3>
            <p>
                We install genuine TimberTech products built for long-term performance
            </p>
        </div>
    </div>
</div>
<div class="features-content-wrapper">
    <div class="features-image-wrapper">
        <div class="features_image-block">
            <p>
                <img class="certification-image" src="https://res.cloudinary.com/ddeeo6usc/image/upload/v1770317869/WhatsApp_Image_2026-02-05_at_10.34.02_AM_cropped_dp8tdb.jpg">
            </p>
            <blockquote class="features-caption">
                <p>
                    5-Star Rated TimberTech Contractor
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
    width: auto;
    max-width: 5rem;
    height: 3rem;
    object-fit: contain;
    display: block;
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
    aspect-ratio: 2/1;
    object-fit: contain;
    display: block;
  }
  .features-caption {
    text-align: center;
    font-size: 0.875rem;
  }
  .features_image-block {
    display: flex;
    width: 100%;
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
  }
</style>`,
};

// ── Pasadena template pages to skip ──────────────────────────────────────

const EXCLUDED_SLUGS = [
  'pasadena-maryland-roofing-company-near-you',
  'pasadena-maryland-siding-contractors-near-you',
  'pasadena-maryland-deck-builders-near-you',
  'pasadena-maryland-window-replacement-near-you',
  'pasadena-maryland-front-door-replacement-near-you',
  'pasadena-maryland-gutter-guards-gutters-near-you',
];

// ── Interfaces ───────────────────────────────────────────────────────────

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────

function getServiceType(slug: string): string | null {
  if (slug.includes('window')) return 'window';
  if (slug.includes('siding')) return 'siding';
  if (slug.includes('deck')) return 'deck';
  return null; // skip roofing, door, gutter
}

function extractCity(page: LocalPage): string {
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
  const cleanSlug = page.slug
    .replace(/-maryland-.*$/, '')
    .replace(/-md-.*$/, '')
    .replace(/-dc-.*$/, '')
    .replace(/-(roofing|siding|window|door|gutter|deck|trim|patio).*$/, '');
  return cleanSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') || 'Maryland';
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  if (!STRAPI_API_TOKEN) {
    throw new Error('STRAPI_API_TOKEN is required');
  }

  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitArg = args.find((a) => a.startsWith('--limit='));
  const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
  const serviceArg = args.find((a) => a.startsWith('--service='));
  const serviceFilter = serviceArg ? serviceArg.split('=')[1] : undefined;

  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    timeout: 30000,
  });

  console.log('🏆 Why Choose Us Template Sync');
  console.log(`   Strapi: ${STRAPI_URL}`);
  console.log(`   Mode: ${dryRun ? 'DRY RUN' : 'LIVE UPDATE'}`);
  console.log(`   Services: ${serviceFilter || 'window, siding, deck'}`);
  if (limit) console.log(`   Limit: ${limit}`);
  console.log('');

  // Fetch all published pages
  const allPages: LocalPage[] = [];
  let page = 1;
  while (true) {
    const resp = await client.get('/services', {
      params: {
        status: 'published',
        'pagination[page]': page,
        'pagination[pageSize]': 100,
      },
    });
    allPages.push(...resp.data.data);
    if (page >= resp.data.meta.pagination.pageCount) break;
    page++;
  }
  console.log(`📋 Found ${allPages.length} total published pages`);

  // Filter to relevant service pages
  let pages = allPages.filter((p) => {
    if (EXCLUDED_SLUGS.includes(p.slug)) return false;
    const svc = getServiceType(p.slug);
    if (!svc) return false;
    if (serviceFilter && svc !== serviceFilter) return false;
    return true;
  });

  if (limit) pages = pages.slice(0, limit);

  console.log(`🔄 Will update ${pages.length} pages (window/siding/deck)\n`);

  let success = 0;
  let errors = 0;

  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const svc = getServiceType(p.slug)!;
    const city = extractCity(p);
    const html = TEMPLATES[svc].replace(/Pasadena/g, city);

    console.log(`[${i + 1}/${pages.length}] ${p.slug}  →  ${city} (${svc})`);

    if (dryRun) {
      console.log(`   ✅ Would update: "Why ${city} Homeowners Choose Us"`);
      success++;
      continue;
    }

    try {
      await client.put(`/services/${p.documentId}`, {
        data: { whyChooseUsRichText: html },
      });
      console.log(`   ✅ Updated`);
      success++;
      await new Promise((r) => setTimeout(r, 100));
    } catch (err: any) {
      console.error(`   ❌ Failed: ${err.response?.data?.error?.message || err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ ${dryRun ? 'Would update' : 'Updated'}: ${success}`);
  console.log(`❌ Failed: ${errors}`);
  console.log(`📄 Total: ${pages.length}`);
  console.log('='.repeat(60));
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
