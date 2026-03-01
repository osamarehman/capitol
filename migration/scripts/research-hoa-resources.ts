#!/usr/bin/env tsx
/**
 * Research HOA Resources for Cities
 *
 * This script:
 * 1. Gets unique cities from Strapi pages
 * 2. Uses AI to research HOA/community associations for each city
 * 3. Outputs a CSV file with HOA resources for review
 *
 * The CSV should be reviewed and verified before using it to update Strapi.
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import OpenAI from 'openai';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://cms.improveitmd.com';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const OUTPUT_CSV = join(__dirname, '../../hoa_resources.csv');

interface LocalPage {
  id: number;
  documentId: string;
  slug: string;
  title?: string;
}

interface HOAResource {
  city: string;
  state: string;
  hoa_name: string;
  hoa_url: string;
  is_community_based: string;
}

class HOAResearcher {
  private strapiClient: AxiosInstance;
  private openai: OpenAI;
  private existingData: HOAResource[] = [];

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

    // Load existing CSV if it exists
    if (existsSync(OUTPUT_CSV)) {
      const content = readFileSync(OUTPUT_CSV, 'utf-8');
      this.existingData = parse(content, { columns: true, skip_empty_lines: true });
      console.log(`📂 Loaded ${this.existingData.length} existing HOA records`);
    }
  }

  /**
   * Extract city name from page title
   */
  private extractCityFromPage(page: LocalPage): { city: string; state: string } | null {
    if (page.title) {
      const parts = page.title.split(' - ');
      if (parts.length >= 3) {
        let city = parts[1].trim();
        let state = parts[2].trim();

        if (city === 'DC' || city === 'Washington, DC') {
          city = 'Washington DC';
          state = 'DC';
        }
        if (state === 'MD') state = 'Maryland';
        if (state === 'VA') state = 'Virginia';

        return { city, state };
      }
    }
    return null;
  }

  /**
   * Get unique cities from Strapi pages
   */
  async getUniqueCities(): Promise<Array<{ city: string; state: string }>> {
    console.log('\n📋 Fetching cities from Strapi pages...');

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

    // Extract unique cities
    const cityMap = new Map<string, { city: string; state: string }>();
    for (const p of allPages) {
      const cityInfo = this.extractCityFromPage(p);
      if (cityInfo && cityInfo.city !== 'Maryland' && cityInfo.city !== 'Virginia') {
        const key = `${cityInfo.city}|${cityInfo.state}`;
        if (!cityMap.has(key)) {
          cityMap.set(key, cityInfo);
        }
      }
    }

    const cities = Array.from(cityMap.values()).sort((a, b) => a.city.localeCompare(b.city));
    console.log(`✅ Found ${cities.length} unique cities`);
    return cities;
  }

  /**
   * Check if city already has HOA data
   */
  private cityHasData(city: string): boolean {
    return this.existingData.some(
      (d) => d.city.toLowerCase() === city.toLowerCase()
    );
  }

  /**
   * Research HOAs for a city using AI
   */
  async researchHOAsForCity(city: string, state: string): Promise<HOAResource[]> {
    const prompt = `Research homeowner associations (HOAs) and community associations in ${city}, ${state}.

IMPORTANT GUIDELINES:
1. Only list HOAs/associations that you are CONFIDENT actually exist
2. If you're not sure about a specific association, DO NOT include it
3. Prefer associations with verifiable official websites
4. DO NOT include Facebook pages or groups - only official websites
5. Include community-based neighborhoods without websites if they are well-known
6. Focus on residential community associations, not commercial or civic groups

For each association found, provide:
- Name (official name of the HOA/association)
- URL (official website if available, leave empty if none - NO Facebook links)
- Is community-based (true if it's a community without a website, false otherwise)

If you cannot find any verified HOAs for this city, respond with "NONE_FOUND".

Respond in this exact JSON format (no markdown, just JSON):
[
  {"name": "Example HOA Name", "url": "https://example.com", "is_community_based": false},
  {"name": "Community Name", "url": "", "is_community_based": true}
]

Or if none found:
NONE_FOUND`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo',
        max_tokens: 2000,
        messages: [
          {
            role: 'system',
            content: 'You are a research assistant that finds HOA and community association information. Only include verified, real organizations. Never include Facebook pages or groups - only official websites.',
          },
          { role: 'user', content: prompt },
        ],
      });

      const content = response.choices[0]?.message?.content?.trim();
      if (!content) {
        return [];
      }

      const text = content;

      if (text === 'NONE_FOUND' || text.includes('NONE_FOUND')) {
        return [];
      }

      // Parse JSON response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.log(`   ⚠️ Could not parse response for ${city}`);
        return [];
      }

      const hoas = JSON.parse(jsonMatch[0]);
      return hoas.map((h: any) => ({
        city,
        state,
        hoa_name: h.name,
        hoa_url: h.url || '',
        is_community_based: h.is_community_based ? 'true' : 'false',
      }));
    } catch (error: any) {
      console.error(`   ❌ Error researching ${city}:`, error.message);
      return [];
    }
  }

  /**
   * Main execution
   */
  async run(options: { limit?: number; city?: string; skipExisting?: boolean } = {}): Promise<void> {
    const { limit, city: specificCity, skipExisting = true } = options;

    console.log('🔍 HOA Resource Research Tool\n');
    console.log(`Output file: ${OUTPUT_CSV}`);
    console.log(`Skip existing: ${skipExisting}`);
    if (limit) console.log(`Limit: ${limit} cities`);
    if (specificCity) console.log(`Specific city: ${specificCity}`);
    console.log('');

    // Get cities
    let cities = await this.getUniqueCities();

    // Filter to specific city if provided
    if (specificCity) {
      cities = cities.filter((c) => c.city.toLowerCase() === specificCity.toLowerCase());
    }

    // Skip cities that already have data
    if (skipExisting) {
      const beforeCount = cities.length;
      cities = cities.filter((c) => !this.cityHasData(c.city));
      if (beforeCount !== cities.length) {
        console.log(`📌 Skipping ${beforeCount - cities.length} cities with existing data`);
      }
    }

    // Apply limit
    if (limit && limit > 0) {
      cities = cities.slice(0, limit);
    }

    if (cities.length === 0) {
      console.log('\n⚠️ No cities to research');
      return;
    }

    console.log(`\n🔄 Researching HOAs for ${cities.length} cities...\n`);

    const allResults: HOAResource[] = [...this.existingData];
    let foundCount = 0;
    let emptyCount = 0;

    for (let i = 0; i < cities.length; i++) {
      const { city, state } = cities[i];
      console.log(`[${i + 1}/${cities.length}] Researching: ${city}, ${state}...`);

      const hoas = await this.researchHOAsForCity(city, state);

      if (hoas.length > 0) {
        console.log(`   ✅ Found ${hoas.length} HOA(s)`);
        allResults.push(...hoas);
        foundCount++;
      } else {
        console.log(`   ⚪ No HOAs found`);
        emptyCount++;
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Write results to CSV
    const csvContent = stringify(allResults, {
      header: true,
      columns: ['city', 'state', 'hoa_name', 'hoa_url', 'is_community_based'],
    });
    writeFileSync(OUTPUT_CSV, csvContent);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 RESEARCH SUMMARY');
    console.log('='.repeat(60));
    console.log(`Cities with HOAs found: ${foundCount}`);
    console.log(`Cities with no HOAs: ${emptyCount}`);
    console.log(`Total HOA records: ${allResults.length}`);
    console.log(`Output saved to: ${OUTPUT_CSV}`);
    console.log('='.repeat(60));
    console.log('\n⚠️ IMPORTANT: Please review and verify the CSV before using it to update Strapi.');
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const cityArg = args.find((arg) => arg.startsWith('--city='));
const city = cityArg ? cityArg.split('=')[1] : undefined;
const noSkip = args.includes('--no-skip');

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/research-hoa-resources.ts [options]

Options:
  --limit=N      Research only first N cities
  --city=<name>  Research a specific city only
  --no-skip      Don't skip cities with existing data
  --help         Show this help message

Examples:
  npx tsx scripts/research-hoa-resources.ts --limit=10
  npx tsx scripts/research-hoa-resources.ts --city=Bowie
`);
  process.exit(0);
}

const researcher = new HOAResearcher();
researcher.run({ limit, city, skipExisting: !noSkip }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
