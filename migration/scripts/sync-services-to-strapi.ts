import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const STRAPI_URL = 'https://cms.improveitmd.com';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN!;

const SERVICES_FULL_FILE = path.join(__dirname, '../data/items/services-full.json');
const ID_MAPPINGS_FILE = path.join(__dirname, '../data/mappings/services-ids.json');

// Default content for servicesTitleDescription
const DEFAULT_SERVICES_HEADING = 'Services we offer';
const DEFAULT_SERVICES_PARAGRAPH = '<p>We offer replacement services for <a href="/roofing">roofing</a>, <a href="/siding">siding</a>, <a href="/windows">windows</a>, <a href="/gutters">gutters</a>, <a href="/exterior-trim">exterior trim</a>, <a href="/decks-and-patios">decks</a>, <a href="/decks-and-patios">patios</a>, and <a href="/doors">doors</a>. <br></p>';

interface WebflowItem {
  id: string;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, any>;
}

interface IdMapping {
  webflowId: string;
  strapiDocumentId: string;
  strapiId: number;
}

interface UpdateResult {
  webflowId: string;
  strapiDocumentId: string;
  name: string;
  slug: string;
  success: boolean;
  changes: string[];
  error?: string;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateStrapiItem(
  documentId: string,
  data: Record<string, any>,
  action: 'update' | 'unpublish' = 'update'
): Promise<boolean> {
  try {
    const url = `${STRAPI_URL}/api/services/${documentId}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data }),
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

async function unpublishStrapiItem(documentId: string): Promise<boolean> {
  try {
    const url = `${STRAPI_URL}/api/services/${documentId}`;

    // First get the current item
    const getResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    });

    if (!getResponse.ok) {
      console.error(`Failed to get ${documentId}: ${getResponse.status}`);
      return false;
    }

    // Now unpublish using the draft/publish endpoint
    const unpublishUrl = `${STRAPI_URL}/api/services/${documentId}/actions/unpublish`;

    const response = await fetch(unpublishUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      // If already unpublished, that's fine
      if (errorText.includes('already') || response.status === 400) {
        return true;
      }
      console.error(`Failed to unpublish ${documentId}: ${response.status} - ${errorText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error unpublishing ${documentId}:`, error);
    return false;
  }
}

function isRoofingPage(item: WebflowItem): boolean {
  const name = (item.fieldData?.name || '').toLowerCase();
  const slug = (item.fieldData?.slug || '').toLowerCase();
  return name.includes('roofing') || name.includes('roofer') ||
         slug.includes('roofing') || slug.includes('roofer');
}

async function syncServicesToStrapi() {
  console.log('Loading data files...');

  const webflowItems: WebflowItem[] = JSON.parse(fs.readFileSync(SERVICES_FULL_FILE, 'utf-8'));
  const idMappings: IdMapping[] = JSON.parse(fs.readFileSync(ID_MAPPINGS_FILE, 'utf-8'));

  // Create mapping from webflow ID to strapi document ID
  const webflowToStrapi = new Map<string, IdMapping>();
  for (const mapping of idMappings) {
    webflowToStrapi.set(mapping.webflowId, mapping);
  }

  console.log(`Loaded ${webflowItems.length} Webflow items`);
  console.log(`Loaded ${idMappings.length} ID mappings`);
  console.log('');

  const results: UpdateResult[] = [];
  let draftCount = 0;
  let roofingCalcCount = 0;
  let servicesModalCount = 0;

  // Process each Webflow item
  for (let i = 0; i < webflowItems.length; i++) {
    const item = webflowItems[i];
    const mapping = webflowToStrapi.get(item.id);

    if (!mapping) {
      console.log(`No Strapi mapping found for Webflow item: ${item.id} (${item.fieldData?.name})`);
      continue;
    }

    const result: UpdateResult = {
      webflowId: item.id,
      strapiDocumentId: mapping.strapiDocumentId,
      name: item.fieldData?.name || 'Unknown',
      slug: item.fieldData?.slug || 'unknown',
      success: true,
      changes: [],
    };

    const updateData: Record<string, any> = {};

    // 1. Check if item is draft in Webflow - log for manual unpublishing
    // Note: Strapi 5 doesn't allow unpublishing via REST API, must be done in admin panel
    if (item.isDraft) {
      draftCount++;
      result.changes.push('DRAFT in Webflow (needs manual unpublish in Strapi admin)');
    }

    // 2. Turn on residentialCalc for roofing pages
    if (isRoofingPage(item)) {
      roofingCalcCount++;
      updateData.residentialCalc = true;
      result.changes.push('Enabled residentialCalc');
    }

    // 3. Set servicesTitleDescription (rich text with heading + constant paragraph)
    const faqHeading = item.fieldData?.['service-faq-heading'] || DEFAULT_SERVICES_HEADING;
    const servicesTitleDescriptionContent = `<h2>${faqHeading}</h2>${DEFAULT_SERVICES_PARAGRAPH}`;
    updateData.servicesTitleDescription = servicesTitleDescriptionContent;
    result.changes.push(`Set servicesTitleDescription with heading: "${faqHeading}"`);

    // 4. Set servicesModal1-6 and servicesModalDesc1-6 from Webflow FAQs
    for (let j = 1; j <= 6; j++) {
      const faqTitle = item.fieldData?.[`service-faq-${j}`];
      const faqDesc = item.fieldData?.[`service-faq-desc-${j}`];

      if (faqTitle) {
        updateData[`servicesModal${j}`] = faqTitle;
        servicesModalCount++;
      }
      if (faqDesc) {
        updateData[`servicesModalDesc${j}`] = faqDesc;
      }
    }

    // Only update if we have changes beyond just the heading
    if (Object.keys(updateData).length > 0) {
      const updated = await updateStrapiItem(mapping.strapiDocumentId, updateData);
      if (!updated) {
        result.success = false;
        result.error = 'Failed to update';
      }
    }

    results.push(result);

    // Progress and rate limiting
    if ((i + 1) % 20 === 0) {
      console.log(`Processed ${i + 1}/${webflowItems.length} items...`);
      await delay(200);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('SYNC COMPLETE');
  console.log('='.repeat(70));

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`Total processed: ${results.length}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);
  console.log('');
  console.log(`Items set to draft: ${draftCount}`);
  console.log(`Roofing pages with calc enabled: ${roofingCalcCount}`);
  console.log(`Services modal entries populated: ${servicesModalCount}`);

  // Show failed items
  if (failed > 0) {
    console.log('\nFailed items:');
    for (const result of results.filter(r => !r.success)) {
      console.log(`  - ${result.name} (${result.slug}): ${result.error}`);
    }
  }

  // Save results log
  const logFile = path.join(__dirname, '../data/sync-services-log.json');
  fs.writeFileSync(logFile, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${logFile}`);
}

// Dry run option
const isDryRun = process.argv.includes('--dry-run');

if (isDryRun) {
  console.log('='.repeat(70));
  console.log('DRY RUN MODE - No changes will be made');
  console.log('='.repeat(70));
  console.log('');

  const webflowItems: WebflowItem[] = JSON.parse(fs.readFileSync(SERVICES_FULL_FILE, 'utf-8'));
  const idMappings: IdMapping[] = JSON.parse(fs.readFileSync(ID_MAPPINGS_FILE, 'utf-8'));

  const webflowToStrapi = new Map<string, IdMapping>();
  for (const mapping of idMappings) {
    webflowToStrapi.set(mapping.webflowId, mapping);
  }

  let draftCount = 0;
  let roofingCount = 0;
  let withFaqHeading = 0;
  let withFaqs = 0;

  for (const item of webflowItems) {
    const mapping = webflowToStrapi.get(item.id);
    if (!mapping) continue;

    if (item.isDraft) draftCount++;
    if (isRoofingPage(item)) roofingCount++;
    if (item.fieldData?.['service-faq-heading']) withFaqHeading++;
    if (item.fieldData?.['service-faq-1']) withFaqs++;
  }

  console.log('Changes that would be made:');
  console.log(`  - ${draftCount} items would be set to draft`);
  console.log(`  - ${roofingCount} roofing pages would have residentialCalc enabled`);
  console.log(`  - ${withFaqHeading} items have custom FAQ headings`);
  console.log(`  - ${webflowItems.length - withFaqHeading} items would use default heading "Services we offer"`);
  console.log(`  - ${withFaqs} items have FAQ data to sync`);
  console.log('');
  console.log('Run without --dry-run to apply changes.');
} else {
  syncServicesToStrapi().catch(console.error);
}
