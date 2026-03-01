#!/usr/bin/env tsx
/**
 * Test script to fetch Pasadena FAQs and inspect the structure
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchPasadena() {
  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('Fetching Pasadena roofing page...\n');

  const response = await client.get('/services', {
    params: {
      'filters[slug][$contains]': 'pasadena',
      'publicationState': 'live',
      'pagination[pageSize]': 20,
    },
  });

  const pages = response.data.data;

  console.log(`Found ${pages.length} Pasadena roofing pages:\n`);

  for (const page of pages) {
    console.log(`- ${page.name || page.slug} (${page.documentId})`);
  }

  // Check all pages for FAQs
  console.log('\n' + '='.repeat(60));
  console.log('FAQ COUNT FOR EACH PASADENA PAGE:');
  console.log('='.repeat(60) + '\n');

  let pageWithMostFAQs = null;
  let maxFAQCount = 0;

  for (const page of pages) {
    let faqCount = 0;
    for (let i = 1; i <= 15; i++) {
      if (page[`faqQuestion${i}`]) faqCount++;
    }

    console.log(`${page.slug}: ${faqCount} FAQs`);

    if (faqCount > maxFAQCount) {
      maxFAQCount = faqCount;
      pageWithMostFAQs = page;
    }
  }

  if (pageWithMostFAQs && maxFAQCount > 0) {
    const pasadena = pageWithMostFAQs;
    console.log('\n' + '='.repeat(60));
    console.log('USING AS TEMPLATE:', pasadena.name || pasadena.slug);
    console.log('FAQ COUNT:', maxFAQCount);
    console.log('='.repeat(60) + '\n');

    // Check which FAQ fields exist
    console.log('FAQ Content:', pasadena.faqContent ? 'EXISTS' : 'MISSING');

    for (let i = 1; i <= 15; i++) {
      const hasQ = !!pasadena[`faqQuestion${i}`];
      const hasA = !!pasadena[`faqAnswer${i}`];

      if (hasQ || hasA) {
        console.log(`FAQ ${i}: Q=${hasQ ? 'YES' : 'NO'}, A=${hasA ? 'YES' : 'NO'}`);
      }
    }

    // Show first FAQ as example
    if (pasadena.faqQuestion1) {
      console.log('\n' + '='.repeat(60));
      console.log('EXAMPLE FAQ #1:');
      console.log('='.repeat(60));
      console.log('\nfaqContent:');
      console.log(pasadena.faqContent || '(none)');
      console.log('\nfaqQuestion1:');
      console.log(pasadena.faqQuestion1);
      console.log('\nfaqAnswer1 (first 300 chars):');
      console.log((pasadena.faqAnswer1 || '').substring(0, 300));
      console.log('\n' + '='.repeat(60));
    }
  } else {
    console.log('\n⚠️  No Pasadena pages have FAQs!');
  }
}

fetchPasadena().catch(console.error);
