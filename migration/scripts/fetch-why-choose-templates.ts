#!/usr/bin/env tsx
/**
 * Fetch Why Choose Us templates from Pasadena pages
 */

import dotenv from 'dotenv';
import axios from 'axios';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchTemplates() {
  const client = axios.create({
    baseURL: `${STRAPI_URL}/api`,
    headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
  });

  const res = await client.get('/services', {
    params: {
      'filters[slug][$contains]': 'pasadena',
      'status': 'published',
    },
  });

  const templates: Record<string, string> = {};

  for (const page of res.data.data) {
    const slug = page.slug as string;
    let serviceType = '';

    if (slug.includes('roofing')) serviceType = 'roofing';
    else if (slug.includes('siding')) serviceType = 'siding';
    else if (slug.includes('deck')) serviceType = 'deck';
    else if (slug.includes('window')) serviceType = 'window';
    else if (slug.includes('door')) serviceType = 'door';
    else if (slug.includes('gutter')) serviceType = 'gutter';

    if (serviceType && page.whyChooseUsRichText) {
      templates[serviceType] = page.whyChooseUsRichText;
      console.log(`✅ Found ${serviceType} template from: ${slug}`);
      console.log(`   Length: ${page.whyChooseUsRichText.length} chars`);
    }
  }

  // Ensure data directory exists
  const dataDir = join(__dirname, '../data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Save templates to JSON file
  const outputPath = join(dataDir, 'why-choose-us-templates.json');
  writeFileSync(outputPath, JSON.stringify(templates, null, 2));

  console.log(`\n📄 Saved ${Object.keys(templates).length} templates to: ${outputPath}`);
}

fetchTemplates().catch(console.error);
