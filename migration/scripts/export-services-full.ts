import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { WebflowClient } from 'webflow-api';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const WEBFLOW_ACCESS_TOKEN = process.env.WEBFLOW_ACCESS_TOKEN!;
const SERVICES_COLLECTION_ID = '659443dd76955b59ed7975bd';
const OUTPUT_FILE = path.join(__dirname, '../data/items/services-full.json');

const webflow = new WebflowClient({
  accessToken: WEBFLOW_ACCESS_TOKEN,
});

interface WebflowItem {
  id: string;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, any>;
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function exportServicesCollection() {
  console.log('Fetching services collection from Webflow...');

  // First, get collection schema to see all available fields
  console.log('Fetching collection schema...');
  const collectionDetails = await webflow.collections.get(SERVICES_COLLECTION_ID);

  console.log(`Collection: ${collectionDetails.displayName}`);
  console.log(`Fields available (${collectionDetails.fields?.length || 0}):`);

  for (const field of collectionDetails.fields || []) {
    console.log(`  - ${field.slug} (${field.type})`);
  }
  console.log('');

  // Now fetch all items with pagination
  const ITEMS_PER_PAGE = 100;
  let offset = 0;
  const allItems: WebflowItem[] = [];

  console.log('Fetching all items...');

  while (true) {
    const response = await webflow.collections.items.listItems(SERVICES_COLLECTION_ID, {
      offset,
      limit: ITEMS_PER_PAGE,
    });

    const items = (response.items || []) as WebflowItem[];
    allItems.push(...items);

    const total = response.pagination?.total || 0;
    console.log(`Fetched ${allItems.length}/${total} items...`);

    if (allItems.length >= total || items.length === 0) {
      break;
    }

    offset += ITEMS_PER_PAGE;
    await delay(200); // Rate limiting
  }

  console.log(`\nTotal items fetched: ${allItems.length}`);

  // Analyze what fields are present in the data
  const fieldCounts: Record<string, number> = {};
  for (const item of allItems) {
    for (const fieldName of Object.keys(item.fieldData || {})) {
      fieldCounts[fieldName] = (fieldCounts[fieldName] || 0) + 1;
    }
  }

  console.log('\nFields present in items:');
  const sortedFields = Object.entries(fieldCounts).sort((a, b) => b[1] - a[1]);
  for (const [field, count] of sortedFields) {
    console.log(`  - ${field}: ${count}/${allItems.length} items`);
  }

  // Save to file
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allItems, null, 2));
  console.log(`\nSaved to: ${OUTPUT_FILE}`);

  // Also show a sample item with all fields
  const sampleItem = allItems.find(item => Object.keys(item.fieldData || {}).length > 10);
  if (sampleItem) {
    console.log('\nSample item with most fields:');
    console.log(JSON.stringify(sampleItem, null, 2).substring(0, 2000));
  }
}

exportServicesCollection().catch(console.error);
