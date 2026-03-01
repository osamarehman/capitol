import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../data/items/services-full.json');

interface WebflowItem {
  id: string;
  lastUpdated: string;
  createdOn: string;
  isArchived: boolean;
  isDraft: boolean;
  fieldData: Record<string, any>;
}

function analyzeServicesData() {
  console.log('Reading services-full.json...\n');
  const data: WebflowItem[] = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));

  // Count fields per item
  const fieldCountDistribution: Record<number, WebflowItem[]> = {};
  const allFieldNames = new Set<string>();

  for (const item of data) {
    const fieldCount = Object.keys(item.fieldData || {}).length;

    if (!fieldCountDistribution[fieldCount]) {
      fieldCountDistribution[fieldCount] = [];
    }
    fieldCountDistribution[fieldCount].push(item);

    for (const field of Object.keys(item.fieldData || {})) {
      allFieldNames.add(field);
    }
  }

  // Sort by field count
  const sortedCounts = Object.keys(fieldCountDistribution)
    .map(Number)
    .sort((a, b) => a - b);

  console.log('=' .repeat(70));
  console.log('SERVICES COLLECTION FIELD POPULATION REPORT');
  console.log('=' .repeat(70));
  console.log(`Total items: ${data.length}`);
  console.log(`Total possible fields: ${allFieldNames.size}`);
  console.log('');

  // Summary table
  console.log('-'.repeat(70));
  console.log('DISTRIBUTION: Items by Number of Fields Populated');
  console.log('-'.repeat(70));
  console.log(`${'Fields'.padStart(8)} | ${'Count'.padStart(6)} | ${'%'.padStart(6)} | ${'Bar'}`);
  console.log('-'.repeat(70));

  for (const count of sortedCounts) {
    const items = fieldCountDistribution[count];
    const percentage = ((items.length / data.length) * 100).toFixed(1);
    const barLength = Math.round((items.length / data.length) * 40);
    const bar = '█'.repeat(barLength);

    console.log(
      `${count.toString().padStart(8)} | ${items.length.toString().padStart(6)} | ${percentage.padStart(5)}% | ${bar}`
    );
  }

  console.log('-'.repeat(70));
  console.log('');

  // Group into categories
  const categories = {
    'Minimal (1-10 fields)': [] as WebflowItem[],
    'Partial (11-30 fields)': [] as WebflowItem[],
    'Good (31-45 fields)': [] as WebflowItem[],
    'Complete (46+ fields)': [] as WebflowItem[],
  };

  for (const item of data) {
    const count = Object.keys(item.fieldData || {}).length;
    if (count <= 10) {
      categories['Minimal (1-10 fields)'].push(item);
    } else if (count <= 30) {
      categories['Partial (11-30 fields)'].push(item);
    } else if (count <= 45) {
      categories['Good (31-45 fields)'].push(item);
    } else {
      categories['Complete (46+ fields)'].push(item);
    }
  }

  console.log('-'.repeat(70));
  console.log('SUMMARY BY CATEGORY');
  console.log('-'.repeat(70));

  for (const [category, items] of Object.entries(categories)) {
    const percentage = ((items.length / data.length) * 100).toFixed(1);
    console.log(`${category.padEnd(25)}: ${items.length.toString().padStart(4)} items (${percentage}%)`);
  }

  console.log('');

  // Show items with minimal fields (likely incomplete)
  console.log('-'.repeat(70));
  console.log('ITEMS WITH MINIMAL DATA (10 or fewer fields):');
  console.log('-'.repeat(70));

  const minimalItems = categories['Minimal (1-10 fields)'];
  for (const item of minimalItems.slice(0, 20)) {
    const fieldCount = Object.keys(item.fieldData || {}).length;
    const name = item.fieldData?.name || 'No name';
    const slug = item.fieldData?.slug || 'No slug';
    console.log(`  [${fieldCount} fields] ${name}`);
    console.log(`           slug: ${slug}`);
    console.log(`           id: ${item.id}`);
    console.log('');
  }

  if (minimalItems.length > 20) {
    console.log(`  ... and ${minimalItems.length - 20} more items with minimal data`);
  }

  console.log('');

  // Show draft vs published breakdown
  const draftItems = data.filter(item => item.isDraft);
  const publishedItems = data.filter(item => !item.isDraft);

  console.log('-'.repeat(70));
  console.log('DRAFT vs PUBLISHED STATUS');
  console.log('-'.repeat(70));
  console.log(`Published items: ${publishedItems.length}`);
  console.log(`Draft items: ${draftItems.length}`);
  console.log('');

  // Average fields for draft vs published
  const avgFieldsDraft = draftItems.length > 0
    ? (draftItems.reduce((sum, item) => sum + Object.keys(item.fieldData || {}).length, 0) / draftItems.length).toFixed(1)
    : 0;
  const avgFieldsPublished = publishedItems.length > 0
    ? (publishedItems.reduce((sum, item) => sum + Object.keys(item.fieldData || {}).length, 0) / publishedItems.length).toFixed(1)
    : 0;

  console.log(`Average fields (Draft): ${avgFieldsDraft}`);
  console.log(`Average fields (Published): ${avgFieldsPublished}`);
  console.log('');

  // Field coverage analysis
  console.log('-'.repeat(70));
  console.log('FIELD COVERAGE (fields sorted by population rate)');
  console.log('-'.repeat(70));

  const fieldCoverage: Record<string, number> = {};
  for (const field of allFieldNames) {
    fieldCoverage[field] = 0;
  }

  for (const item of data) {
    for (const field of Object.keys(item.fieldData || {})) {
      fieldCoverage[field]++;
    }
  }

  const sortedFields = Object.entries(fieldCoverage)
    .sort((a, b) => b[1] - a[1]);

  for (const [field, count] of sortedFields) {
    const percentage = ((count / data.length) * 100).toFixed(1);
    const status = count === data.length ? '✓' : count > data.length * 0.8 ? '○' : '·';
    console.log(`${status} ${field.padEnd(40)} ${count.toString().padStart(4)}/${data.length} (${percentage.padStart(5)}%)`);
  }

  console.log('');
  console.log('Legend: ✓ = 100% coverage, ○ = >80% coverage, · = <80% coverage');
}

analyzeServicesData();
