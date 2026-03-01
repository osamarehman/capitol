import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const STRAPI_URL = 'https://cms.improveitmd.com';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN!;

// Initialize Claude client
const anthropic = new Anthropic();

// Data files
const JOBS_CSV = path.join(__dirname, '../../jobs_city_aggregated.csv');
const CITY_TOTALS_CSV = path.join(__dirname, '../../jobs_city_totals.csv');
const SERVICES_FILE = path.join(__dirname, '../data/items/services-full.json');
const ID_MAPPINGS_FILE = path.join(__dirname, '../data/mappings/services-ids.json');
const OUTPUT_LOG = path.join(__dirname, '../data/map-sections-log.json');

// City name aliases for fuzzy matching
const CITY_ALIASES: Record<string, string> = {
  'washington': 'Washington DC',
  'washington dc': 'Washington DC',
  'dc': 'Washington DC',
  'district of columbia': 'Washington DC',
  'n. potomac': 'North Potomac',
  'north potomac': 'North Potomac',
  'ft. washington': 'Fort Washington',
  'ft washington': 'Fort Washington',
  'mt. airy': 'Mount Airy',
  'mt airy': 'Mount Airy',
};

// Google Maps embed URL template
const MAPS_URL_TEMPLATE = 'https://www.google.com/maps/d/u/0/embed?mid=10zevQxZd3uDXmovt2-bhd4AVDeVb0Rg&ehbc=2E312F&noprof=1&ll={LAT},{LONG}&z=12';

// Service mapping: slug keyword -> CSV trade name -> display label
const SERVICE_MAPPING: Record<string, { csvName: string; displayLabel: string }> = {
  'roofing': { csvName: 'ROOFING', displayLabel: 'Roof Replacements' },
  'commercial-roofing': { csvName: 'ROOFING', displayLabel: 'Commercial Roof Replacements' },
  'flat-roofing': { csvName: 'ROOFING', displayLabel: 'Flat Roof Replacements' },
  'siding': { csvName: 'SIDING', displayLabel: 'Siding Installations' },
  'gutter': { csvName: 'GUTTERS', displayLabel: 'Gutter Installations' },
  'door': { csvName: 'DOORS', displayLabel: 'Door Replacements' },
  'window': { csvName: 'WINDOWS', displayLabel: 'Window Replacements' },
  'deck': { csvName: 'DECKING', displayLabel: 'Deck Builds' },
  'patio': { csvName: 'HARDSCAPING', displayLabel: 'Patio & Hardscape Projects' },
  'hardscape': { csvName: 'HARDSCAPING', displayLabel: 'Patio & Hardscape Projects' },
  'trim': { csvName: 'SOFFIT, FASCIA & TRIM', displayLabel: 'Trim Work' },
};

// Standard trade names that map to specific services
const STANDARD_TRADE_NAMES = [
  'ROOFING', 'SIDING', 'GUTTERS', 'DOORS', 'WINDOWS',
  'DECKING', 'HARDSCAPING', 'SOFFIT, FASCIA & TRIM', 'PATIO & POOL'
];

// Unmatched trade names to add to all services
const UNMATCHED_TRADE_NAMES = [
  'BATH REMODEL', 'KITCHEN REMODEL', 'HOME REMODELING & IMPROVEMENTS',
  'REPAIRS', 'OTHER', 'CARPETS & FLOORING', 'FINISHING',
  'SHUTTERS', 'SPECIALTY COATINGS', ''
];

interface JobData {
  city: string;
  state: string;
  tradeName: string;
  jobCount: number;
  latitude: number;
  longitude: number;
}

interface WebflowItem {
  id: string;
  isDraft: boolean;
  fieldData: {
    name: string;
    slug: string;
    [key: string]: any;
  };
}

interface IdMapping {
  webflowId: string;
  strapiDocumentId: string;
  strapiId: number;
}

interface ProcessResult {
  slug: string;
  city: string;
  service: string;
  jobCount: number;
  success: boolean;
  error?: string;
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function parsePageName(name: string): { service: string; city: string; state: string } | null {
  // Format: "Service - City - State" e.g., "Roofing - Bowie - MD"
  const parts = name.split(' - ');
  if (parts.length >= 2) {
    return {
      service: parts[0].trim(),
      city: parts[1].trim(),
      state: parts[2]?.trim() || '',
    };
  }
  return null;
}

function getServiceKeyword(slug: string): string | null {
  // Check more specific keywords first (longer matches)
  const keywords = Object.keys(SERVICE_MAPPING).sort((a, b) => b.length - a.length);
  for (const keyword of keywords) {
    if (slug.includes(keyword)) {
      return keyword;
    }
  }
  return null;
}

function normalizeCity(city: string): string {
  // Normalize city names for matching
  const lower = city.toLowerCase().trim();
  // Check aliases first
  if (CITY_ALIASES[lower]) {
    return CITY_ALIASES[lower].toLowerCase();
  }
  return lower.replace(/[^a-z\s]/g, '').trim();
}

function fuzzyMatchCity(pageCity: string, csvCities: string[]): string | null {
  const normalizedPageCity = normalizeCity(pageCity);

  // Direct match
  for (const csvCity of csvCities) {
    if (normalizeCity(csvCity) === normalizedPageCity) {
      return csvCity;
    }
  }

  // Check if page city is contained in CSV city or vice versa
  for (const csvCity of csvCities) {
    const normalizedCsvCity = normalizeCity(csvCity);
    if (normalizedCsvCity.includes(normalizedPageCity) || normalizedPageCity.includes(normalizedCsvCity)) {
      return csvCity;
    }
  }

  // Partial match (first word)
  const pageFirstWord = normalizedPageCity.split(' ')[0];
  for (const csvCity of csvCities) {
    const csvFirstWord = normalizeCity(csvCity).split(' ')[0];
    if (pageFirstWord === csvFirstWord && pageFirstWord.length > 3) {
      return csvCity;
    }
  }

  return null;
}

async function generateNeighborhoodContent(
  city: string,
  state: string,
  service: string,
  jobCount: number,
  displayLabel: string
): Promise<string> {
  const prompt = `You are writing content for a home improvement company's local service page. Generate a single paragraph (100-150 words) for the map section of a ${service} service page for ${city}, ${state}.

The paragraph should:
1. Reference that each pin on the map represents a homeowner they've served
2. Mention 2-3 REAL neighborhoods, communities, or areas within ${city} (research actual neighborhood names)
3. Reference home styles common in the area
4. Mention HOA or community guidelines considerations if applicable
5. End with reassurance about quality work

Do NOT include any heading - just the paragraph text.
Do NOT use phrases like "we understand" or "we recognize" more than once.
Keep the tone professional but warm.

Example style:
"Each pin on this map represents a Pasadena homeowner we've had the opportunity to serve. From waterfront homes in communities like Riviera Beach and Lake Shore to inland neighborhoods such as Green Haven and Country Place, we understand the wide range of home styles found throughout Pasadena. We also recognize the importance of meeting HOA and community guidelines where applicable. Whether matching existing architectural character or ensuring roofing materials meet neighborhood standards, we make every roof replacement smooth, compliant, and built to last."

Now write a similar paragraph for ${city}, ${state} focused on ${service.toLowerCase()} services:`;

  const response = await anthropic.messages.create({
    model: 'claude-opus-4-5-20251101',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = response.content.find(block => block.type === 'text');
  return textBlock ? textBlock.text.trim() : '';
}

function buildMapSectionHtml(
  city: string,
  jobCount: number,
  displayLabel: string,
  paragraph: string,
  latitude: number,
  longitude: number
): string {
  const mapsUrl = MAPS_URL_TEMPLATE
    .replace('{LAT}', latitude.toString())
    .replace('{LONG}', longitude.toString());

  return `<h2>
    📍 ${jobCount}+ ${city} Homeowners Have Trusted Us for ${displayLabel}, Expert Guidance, and Honest Recommendations
</h2>
<p>
    ${paragraph}
</p>
<div class="responsive-map">
    <iframe style="border-width:0;" src="${mapsUrl}" width="640" height="480" frameborder="0"></iframe>
</div>`;
}

async function updateStrapiMapSection(documentId: string, mapSection: string): Promise<boolean> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/services/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: { mapSection } }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to update ${documentId}: ${response.status} - ${errorText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error updating ${documentId}:`, error);
    return false;
  }
}

async function main() {
  console.log('Loading data files...');

  // Load jobs data (by city + trade)
  const jobsCsv = fs.readFileSync(JOBS_CSV, 'utf8');
  const jobsData: JobData[] = parse(jobsCsv, { columns: true, skip_empty_lines: true }).map((row: any) => ({
    city: row.city,
    state: row.state,
    tradeName: row.tradeName,
    jobCount: parseInt(row.jobCount) || 0,
    latitude: parseFloat(row.latitude) || 0,
    longitude: parseFloat(row.longitude) || 0,
  }));

  // Load city totals (all services combined)
  const cityTotalsCsv = fs.readFileSync(CITY_TOTALS_CSV, 'utf8');
  const cityTotalsData = parse(cityTotalsCsv, { columns: true, skip_empty_lines: true });

  // Build city totals lookup
  const cityTotalsMap = new Map<string, { totalJobs: number; lat: number; lng: number }>();
  const allCityNames: string[] = [];
  for (const row of cityTotalsData) {
    const cityKey = normalizeCity(row.city);
    allCityNames.push(row.city);
    cityTotalsMap.set(cityKey, {
      totalJobs: parseInt(row.totalJobs) || 0,
      lat: parseFloat(row.latitude) || 0,
      lng: parseFloat(row.longitude) || 0,
    });
  }

  // Build job lookup map: "city|tradeName" -> JobData
  const jobsMap = new Map<string, JobData>();
  for (const job of jobsData) {
    const key = `${normalizeCity(job.city)}|${job.tradeName}`;
    const existing = jobsMap.get(key);
    if (!existing || job.jobCount > existing.jobCount) {
      jobsMap.set(key, job);
    }
  }

  // Build city coordinates map
  const cityCoords = new Map<string, { lat: number; lng: number }>();
  const cityJobTotals = new Map<string, number>();
  for (const [cityKey, data] of cityTotalsMap.entries()) {
    cityCoords.set(cityKey, { lat: data.lat, lng: data.lng });
    cityJobTotals.set(cityKey, data.totalJobs);
  }

  // Load Webflow services data
  const webflowItems: WebflowItem[] = JSON.parse(fs.readFileSync(SERVICES_FILE, 'utf8'));

  // Load ID mappings
  const idMappings: IdMapping[] = JSON.parse(fs.readFileSync(ID_MAPPINGS_FILE, 'utf8'));
  const webflowToStrapi = new Map<string, IdMapping>();
  for (const mapping of idMappings) {
    webflowToStrapi.set(mapping.webflowId, mapping);
  }

  console.log(`Loaded ${jobsData.length} job entries`);
  console.log(`Loaded ${webflowItems.length} Webflow pages`);
  console.log(`Loaded ${idMappings.length} ID mappings`);
  console.log('');

  // Filter to only published items (skip drafts) and exclude specific pages
  let publishedItems = webflowItems.filter(item => !item.isDraft);
  const excludedCount = publishedItems.filter(item => EXCLUDED_SLUGS.includes(item.fieldData.slug)).length;
  publishedItems = publishedItems.filter(item => !EXCLUDED_SLUGS.includes(item.fieldData.slug));

  console.log(`Processing ${publishedItems.length} published pages (skipping ${webflowItems.length - publishedItems.length - excludedCount} drafts, ${excludedCount} excluded)`);

  // Filter by specific slug if specified
  if (specificSlug) {
    publishedItems = publishedItems.filter(item => item.fieldData.slug === specificSlug);
    console.log(`Filtering to specific slug: ${specificSlug}`);
  }

  // Apply limit if specified
  if (limit && limit > 0) {
    publishedItems = publishedItems.slice(0, limit);
    console.log(`Limited to first ${limit} pages`);
  }
  console.log('');

  const results: ProcessResult[] = [];
  let successCount = 0;
  let skipCount = 0;

  // Process each page
  for (let i = 0; i < publishedItems.length; i++) {
    const item = publishedItems[i];
    const mapping = webflowToStrapi.get(item.id);

    if (!mapping) {
      console.log(`No Strapi mapping for: ${item.fieldData.name}`);
      skipCount++;
      continue;
    }

    const pageName = item.fieldData.name;
    const slug = item.fieldData.slug;
    const parsed = parsePageName(pageName);

    if (!parsed) {
      console.log(`Could not parse page name: ${pageName}`);
      skipCount++;
      continue;
    }

    const serviceKeyword = getServiceKeyword(slug);
    if (!serviceKeyword) {
      console.log(`No service keyword found in slug: ${slug}`);
      skipCount++;
      continue;
    }

    const serviceConfig = SERVICE_MAPPING[serviceKeyword];

    // Fuzzy match city name
    const matchedCity = fuzzyMatchCity(parsed.city, allCityNames);
    const cityKey = matchedCity ? normalizeCity(matchedCity) : normalizeCity(parsed.city);

    const jobKey = `${cityKey}|${serviceConfig.csvName}`;
    const jobData = jobsMap.get(jobKey);

    // Get job count - specific service + unmatched trade names for this city
    let jobCount = jobData?.jobCount || 0;

    // Add unmatched trade names to the count (BATH REMODEL, REPAIRS, etc.)
    for (const unmatchedTrade of UNMATCHED_TRADE_NAMES) {
      const unmatchedKey = `${cityKey}|${unmatchedTrade}`;
      const unmatchedData = jobsMap.get(unmatchedKey);
      if (unmatchedData) {
        jobCount += unmatchedData.jobCount;
      }
    }

    // If still no jobs, use city total as fallback
    if (jobCount === 0) {
      jobCount = cityJobTotals.get(cityKey) || 10; // Default to 10 if no data
    }

    // Get coordinates from matched city
    let coords = cityCoords.get(cityKey);
    if (!coords && jobData) {
      coords = { lat: jobData.latitude, lng: jobData.longitude };
    }
    if (!coords || coords.lat === 0) {
      coords = { lat: 38.9072, lng: -77.0369 }; // Default to DC center
    }

    // Debug logging for coordinate issues
    if (matchedCity) {
      console.log(`    Matched "${parsed.city}" -> "${matchedCity}" (${coords.lat}, ${coords.lng})`);
    }

    const result: ProcessResult = {
      slug,
      city: parsed.city,
      service: serviceConfig.displayLabel,
      jobCount,
      success: false,
    };

    try {
      // Generate content with Claude
      console.log(`[${i + 1}/${publishedItems.length}] Generating content for: ${parsed.city} - ${parsed.service}...`);

      const paragraph = await generateNeighborhoodContent(
        parsed.city,
        parsed.state || 'Maryland',
        parsed.service,
        jobCount,
        serviceConfig.displayLabel
      );

      // Build HTML
      const mapSectionHtml = buildMapSectionHtml(
        parsed.city,
        jobCount,
        serviceConfig.displayLabel,
        paragraph,
        coords.lat,
        coords.lng
      );

      // Update Strapi
      const updated = await updateStrapiMapSection(mapping.strapiDocumentId, mapSectionHtml);

      if (updated) {
        result.success = true;
        successCount++;
      } else {
        result.error = 'Failed to update Strapi';
      }

      // Rate limiting for Claude API
      await delay(500);

    } catch (error: any) {
      result.error = error.message || 'Unknown error';
      console.error(`Error processing ${slug}:`, error);
    }

    results.push(result);

    // Progress update every 20 items
    if ((i + 1) % 20 === 0) {
      console.log(`Progress: ${i + 1}/${publishedItems.length} (${successCount} successful)`);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('MAP SECTION GENERATION COMPLETE');
  console.log('='.repeat(70));
  console.log(`Total processed: ${results.length}`);
  console.log(`Successful: ${successCount}`);
  console.log(`Skipped: ${skipCount}`);
  console.log(`Failed: ${results.filter(r => !r.success && r.error).length}`);

  // Save results
  fs.writeFileSync(OUTPUT_LOG, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${OUTPUT_LOG}`);
}

// Dry run option and limit
const isDryRun = process.argv.includes('--dry-run');
const limitArg = process.argv.find(arg => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;
const slugArg = process.argv.find(arg => arg.startsWith('--slug='));
const specificSlug = slugArg ? slugArg.split('=')[1] : undefined;

// Exclusions - pages to skip
const EXCLUDED_SLUGS = [
  'pasadena-maryland-roofing-company-near-you',
];

if (isDryRun) {
  console.log('='.repeat(70));
  console.log('DRY RUN MODE - Analyzing data without making changes');
  console.log('='.repeat(70));
  console.log('');

  // Just show what would be processed
  const webflowItems: WebflowItem[] = JSON.parse(fs.readFileSync(SERVICES_FILE, 'utf8'));
  const publishedItems = webflowItems.filter(item => !item.isDraft);

  console.log(`Total pages: ${webflowItems.length}`);
  console.log(`Published pages: ${publishedItems.length}`);
  console.log(`Draft pages (skipped): ${webflowItems.length - publishedItems.length}`);
  console.log('');

  // Count by service type
  const serviceCounts: Record<string, number> = {};
  for (const item of publishedItems) {
    const slug = item.fieldData.slug;
    const keyword = getServiceKeyword(slug);
    if (keyword) {
      serviceCounts[keyword] = (serviceCounts[keyword] || 0) + 1;
    }
  }

  console.log('Pages by service type:');
  Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([service, count]) => {
      console.log(`  - ${service}: ${count} pages`);
    });

  console.log('');
  console.log('Run without --dry-run to generate content.');
  console.log('Use --limit=N to process only first N pages.');
} else {
  main().catch(console.error);
}
