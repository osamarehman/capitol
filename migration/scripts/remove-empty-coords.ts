import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const files = [
  path.join(__dirname, '../../jobs_processed.csv'),
  path.join(__dirname, '../../jobs_processed copy.csv'),
];

for (const filePath of files) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    continue;
  }

  console.log(`Processing: ${filePath}`);
  const csvContent = fs.readFileSync(filePath, 'utf-8');

  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const originalCount = records.length;

  // Filter out rows with empty latitude or longitude
  const filtered = records.filter((row: any) => {
    return row.latitude && row.longitude &&
           row.latitude.trim() !== '' &&
           row.longitude.trim() !== '';
  });

  const removedCount = originalCount - filtered.length;

  // Write back to the same file
  const output = stringify(filtered, {
    header: true,
    columns: Object.keys(records[0] || {}),
  });

  fs.writeFileSync(filePath, output);
  console.log(`  Original rows: ${originalCount}`);
  console.log(`  Removed (empty coords): ${removedCount}`);
  console.log(`  Remaining rows: ${filtered.length}`);
  console.log('');
}

console.log('Done!');
