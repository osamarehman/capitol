#!/usr/bin/env tsx
/**
 * Find pages that have FAQs to use as template
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function findPagesWithFAQs() {
  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('Searching for pages with FAQs...\n');

  const allPages: any[] = [];
  let page = 1;

  // Fetch all published pages
  while (true) {
    const response = await client.get('/services', {
      params: {
        'publicationState': 'live',
        'pagination[page]': page,
        'pagination[pageSize]': 100,
      },
    });

    const pages = response.data.data;
    allPages.push(...pages);

    console.log(`Fetched page ${page}/${response.data.meta.pagination.pageCount} (${allPages.length} total)`);

    if (page >= response.data.meta.pagination.pageCount) {
      break;
    }
    page++;
  }

  console.log(`\nTotal pages fetched: ${allPages.length}`);
  console.log('Analyzing FAQ content...\n');

  const pagesWithFAQs: any[] = [];

  for (const page of allPages) {
    let faqCount = 0;
    for (let i = 1; i <= 15; i++) {
      if (page[`faqQuestion${i}`]) faqCount++;
    }

    if (faqCount > 0) {
      pagesWithFAQs.push({
        slug: page.slug,
        name: page.name,
        documentId: page.documentId,
        faqCount,
      });
    }
  }

  console.log('='.repeat(60));
  console.log(`PAGES WITH FAQs: ${pagesWithFAQs.length} out of ${allPages.length}`);
  console.log('='.repeat(60) + '\n');

  if (pagesWithFAQs.length > 0) {
    // Sort by FAQ count descending
    pagesWithFAQs.sort((a, b) => b.faqCount - a.faqCount);

    console.log('Top 20 pages with most FAQs:\n');
    for (let i = 0; i < Math.min(20, pagesWithFAQs.length); i++) {
      const p = pagesWithFAQs[i];
      console.log(`${i + 1}. ${p.slug} (${p.faqCount} FAQs)`);
    }

    // Show details of the page with most FAQs
    const topPage = allPages.find(p => p.documentId === pagesWithFAQs[0].documentId);
    if (topPage) {
      console.log('\n' + '='.repeat(60));
      console.log('TOP PAGE DETAILS:');
      console.log('='.repeat(60));
      console.log(`Name: ${topPage.name || topPage.slug}`);
      console.log(`Slug: ${topPage.slug}`);
      console.log(`Document ID: ${topPage.documentId}`);
      console.log(`FAQ Count: ${pagesWithFAQs[0].faqCount}`);
      console.log(`\nFAQ Content: ${topPage.faqContent ? 'EXISTS' : 'MISSING'}`);
      console.log('\nFirst FAQ:');
      console.log(`Q1: ${topPage.faqQuestion1}`);
      console.log(`A1: ${(topPage.faqAnswer1 || '').substring(0, 200)}...`);
    }
  } else {
    console.log('⚠️  No pages have FAQs!');
  }
}

findPagesWithFAQs().catch(console.error);
