#!/usr/bin/env tsx
/**
 * Test script to fetch the faqsRichText field from Pasadena roofing
 */

import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchFaqsRichText() {
  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  console.log('Fetching Pasadena roofing page by documentId...\n');

  const documentId = 'cqk0aiavvd8vb1h019m64so0';

  const response = await client.get(`/services/${documentId}`);
  const page = response.data.data;

  console.log('='.repeat(60));
  console.log('PAGE DETAILS:');
  console.log('='.repeat(60));
  console.log(`Name: ${page.name}`);
  console.log(`Slug: ${page.slug}`);
  console.log(`Document ID: ${page.documentId}`);
  console.log('\n' + '='.repeat(60));
  console.log('faqsRichText CONTENT:');
  console.log('='.repeat(60));

  if (page.faqsRichText) {
    console.log('\n✅ faqsRichText field EXISTS\n');
    console.log('Content length:', JSON.stringify(page.faqsRichText).length, 'characters');
    console.log('\nFirst 1000 characters of faqsRichText:');
    console.log(JSON.stringify(page.faqsRichText, null, 2).substring(0, 1000));
    console.log('\n...');
  } else {
    console.log('\n❌ faqsRichText field is EMPTY or MISSING');
  }

  console.log('\n' + '='.repeat(60));
}

fetchFaqsRichText().catch(console.error);
