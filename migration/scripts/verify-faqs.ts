#!/usr/bin/env tsx
/**
 * Verify FAQs were successfully updated
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function verifyFAQs() {
  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('🔍 Verifying FAQ updates in production...\n');

  // Sample pages to check
  const sampleSlugs = [
    'alexandria-virginia-roofing-company-near-you',
    'bowie-maryland-roofing-company-near-you',
    'gaithersburg-maryland-deck-builders-near-you',
    'annapolis-maryland-roofing-company-near-you',
    'washington-dc-roofing-company-near-you',
  ];

  console.log(`Checking ${sampleSlugs.length} sample pages...\n`);

  let successCount = 0;
  let missingCount = 0;

  for (const slug of sampleSlugs) {
    const response = await client.get('/services', {
      params: {
        'filters[slug][$eq]': slug,
        'publicationState': 'live',
      },
    });

    const pages = response.data.data;

    if (pages.length === 0) {
      console.log(`❌ ${slug}: Page not found`);
      continue;
    }

    const page = pages[0];
    const hasFAQs = !!page.faqsRichText;
    const faqLength = page.faqsRichText ? page.faqsRichText.length : 0;

    if (hasFAQs && faqLength > 1000) {
      console.log(`✅ ${slug}`);
      console.log(`   FAQs: ${faqLength} characters`);

      // Extract title from HTML
      const titleMatch = page.faqsRichText.match(/<h2[^>]*>(.*?)<\/h2>/);
      if (titleMatch) {
        console.log(`   Title: ${titleMatch[1]}`);
      }

      successCount++;
    } else if (hasFAQs) {
      console.log(`⚠️  ${slug}`);
      console.log(`   FAQs exist but seem short: ${faqLength} characters`);
    } else {
      console.log(`❌ ${slug}`);
      console.log(`   No FAQs found`);
      missingCount++;
    }

    console.log('');
  }

  console.log('='.repeat(60));
  console.log('VERIFICATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Pages with FAQs: ${successCount}/${sampleSlugs.length}`);
  console.log(`❌ Pages missing FAQs: ${missingCount}/${sampleSlugs.length}`);
  console.log('='.repeat(60));

  if (successCount === sampleSlugs.length) {
    console.log('\n🎉 All sampled pages have FAQs!');
  }
}

verifyFAQs().catch(console.error);
