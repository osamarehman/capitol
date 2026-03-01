#!/usr/bin/env tsx
/**
 * Extended HOA Resource Research
 *
 * This script uses multiple keyword strategies to find HOA resources
 * for cities that didn't have results in the initial search.
 *
 * Keywords used:
 * - HOA (Homeowner Association)
 * - Home Owners Association
 * - Civic Association
 * - Community Association
 * - Neighborhood Association
 * - Property Owners Association
 * - Residents Association
 * - Improvement Association
 */

import dotenv from 'dotenv';
import axios, { AxiosInstance } from 'axios';
import Anthropic from '@anthropic-ai/sdk';
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
const HOA_CSV_PATH = join(__dirname, '../../hoa_resources.csv');

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

class ExtendedHOAResearcher {
  private strapiClient: AxiosInstance;
  private anthropic: Anthropic;
  private existingData: HOAResource[] = [];
  private citiesWithData: Set<string> = new Set();

  constructor() {
    if (!STRAPI_API_TOKEN) {
      throw new Error('STRAPI_API_TOKEN environment variable is required');
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicKey) {
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

    this.anthropic = new Anthropic({ apiKey: anthropicKey });

    // Load existing CSV
    if (existsSync(HOA_CSV_PATH)) {
      const content = readFileSync(HOA_CSV_PATH, 'utf-8');
      this.existingData = parse(content, { columns: true, skip_empty_lines: true });

      // Track which cities already have data
      for (const record of this.existingData) {
        this.citiesWithData.add(record.city.toLowerCase().trim());
      }

      console.log(`📂 Loaded ${this.existingData.length} existing HOA records`);
      console.log(`   Cities with data: ${this.citiesWithData.size}`);
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
   * Get cities that need research (no existing data)
   */
  async getCitiesWithoutData(): Promise<Array<{ city: string; state: string }>> {
    console.log('\n📋 Finding cities without HOA data...');

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

    // Extract unique cities without data
    const cityMap = new Map<string, { city: string; state: string }>();
    for (const p of allPages) {
      const cityInfo = this.extractCityFromPage(p);
      if (cityInfo && cityInfo.city !== 'Maryland' && cityInfo.city !== 'Virginia') {
        const key = cityInfo.city.toLowerCase().trim();
        if (!this.citiesWithData.has(key) && !cityMap.has(key)) {
          cityMap.set(key, cityInfo);
        }
      }
    }

    const cities = Array.from(cityMap.values()).sort((a, b) => a.city.localeCompare(b.city));
    console.log(`✅ Found ${cities.length} cities without HOA data`);
    return cities;
  }

  /**
   * Extended HOA research with multiple keyword strategies
   */
  async researchHOAsExtended(city: string, state: string): Promise<HOAResource[]> {
    const prompt = `You are researching community organizations in ${city}, ${state} that homeowners might need to contact before doing exterior home improvements like roofing, siding, or decks.

Search using these different terms and approaches:
1. "${city} HOA" or "${city} Homeowner Association"
2. "${city} Home Owners Association"
3. "${city} Civic Association"
4. "${city} Community Association"
5. "${city} Neighborhood Association"
6. "${city} Property Owners Association"
7. "${city} Residents Association"
8. "${city} Improvement Association"
9. "${city} MD community groups" (for Maryland cities)
10. County-level HOA registries or databases for the area

IMPORTANT GUIDELINES:
1. Only include organizations you are CONFIDENT exist
2. Include any type of community organization that might have guidelines for exterior home improvements
3. For smaller cities, check if there are county-level resources (e.g., Anne Arundel County, Prince George's County, Montgomery County, etc.)
4. Include Facebook groups or community pages if they appear to be official community organizations
5. If you find a county HOA registry or database, include that as a resource
6. Even informal community associations or neighborhood watch groups with exterior guidelines can be included

For each organization found, provide:
- Name (official name)
- URL (website, Facebook page, or other online presence - leave empty if none)
- Is community-based (true if it's a community without a dedicated website, false otherwise)

If you truly cannot find ANY community organizations for this city after exhaustive search, respond with "NONE_FOUND".

Respond in this exact JSON format (no markdown, just JSON):
[
  {"name": "Example Association Name", "url": "https://example.com", "is_community_based": false},
  {"name": "Community Name", "url": "", "is_community_based": true}
]

Or if none found:
NONE_FOUND`;

    try {
      const response = await this.anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }],
      });

      const content = response.content[0];
      if (content.type !== 'text') {
        return [];
      }

      const text = content.text.trim();

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
  async run(options: { limit?: number; city?: string } = {}): Promise<void> {
    const { limit, city: specificCity } = options;

    console.log('🔍 Extended HOA Resource Research\n');
    console.log('Using multiple keyword strategies:');
    console.log('  - HOA / Homeowner Association');
    console.log('  - Civic Association');
    console.log('  - Community Association');
    console.log('  - Neighborhood Association');
    console.log('  - Property Owners Association');
    console.log('  - County-level resources');
    console.log('');

    // Get cities without data
    let cities = await this.getCitiesWithoutData();

    // Filter to specific city if provided
    if (specificCity) {
      cities = cities.filter((c) => c.city.toLowerCase() === specificCity.toLowerCase());
    }

    // Apply limit
    if (limit && limit > 0) {
      cities = cities.slice(0, limit);
    }

    if (cities.length === 0) {
      console.log('\n✅ All cities already have HOA data!');
      return;
    }

    console.log(`\n🔄 Researching ${cities.length} cities...\n`);

    const newRecords: HOAResource[] = [];
    let foundCount = 0;
    let emptyCount = 0;

    for (let i = 0; i < cities.length; i++) {
      const { city, state } = cities[i];
      console.log(`[${i + 1}/${cities.length}] Researching: ${city}, ${state}...`);

      const hoas = await this.researchHOAsExtended(city, state);

      if (hoas.length > 0) {
        console.log(`   ✅ Found ${hoas.length} resource(s)`);
        newRecords.push(...hoas);
        foundCount++;
      } else {
        console.log(`   ⚪ No resources found`);
        emptyCount++;
      }

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    // Merge with existing data and save
    const allRecords = [...this.existingData, ...newRecords];
    const csvContent = stringify(allRecords, {
      header: true,
      columns: ['city', 'state', 'hoa_name', 'hoa_url', 'is_community_based'],
    });
    writeFileSync(HOA_CSV_PATH, csvContent);

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 EXTENDED RESEARCH SUMMARY');
    console.log('='.repeat(60));
    console.log(`Cities researched: ${cities.length}`);
    console.log(`Cities with new resources: ${foundCount}`);
    console.log(`Cities still without resources: ${emptyCount}`);
    console.log(`New HOA records added: ${newRecords.length}`);
    console.log(`Total HOA records now: ${allRecords.length}`);
    console.log(`Output saved to: ${HOA_CSV_PATH}`);
    console.log('='.repeat(60));

    if (newRecords.length > 0) {
      console.log('\n✅ New resources added! Run the update script to apply changes:');
      console.log('   npm run update-community-guidelines -- --skip-no-hoa');
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const cityArg = args.find((arg) => arg.startsWith('--city='));
const city = cityArg ? cityArg.split('=')[1] : undefined;

if (args.includes('--help')) {
  console.log(`
Usage: npx tsx scripts/research-hoa-extended.ts [options]

Options:
  --limit=N      Research only first N cities
  --city=<name>  Research a specific city only
  --help         Show this help message

Examples:
  npx tsx scripts/research-hoa-extended.ts
  npx tsx scripts/research-hoa-extended.ts --limit=10
  npx tsx scripts/research-hoa-extended.ts --city=Jessup
`);
  process.exit(0);
}

const researcher = new ExtendedHOAResearcher();
researcher.run({ limit, city }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
