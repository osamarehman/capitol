import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROWS_PER_FILE = 2000;
const filePath = path.join(__dirname, '../../jobs_processed copy.csv');

console.log(`Reading: ${filePath}`);
const csvContent = fs.readFileSync(filePath, 'utf-8');

const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

const totalRows = records.length;
const numFiles = Math.ceil(totalRows / ROWS_PER_FILE);
const columns = Object.keys(records[0] || {});

console.log(`Total rows: ${totalRows}`);
console.log(`Splitting into ${numFiles} files (${ROWS_PER_FILE} rows each)`);
console.log('');

for (let i = 0; i < numFiles; i++) {
  const start = i * ROWS_PER_FILE;
  const end = Math.min(start + ROWS_PER_FILE, totalRows);
  const chunk = records.slice(start, end);

  const outputPath = path.join(__dirname, `../../jobs_processed_part_${i + 1}.csv`);
  const output = stringify(chunk, {
    header: true,
    columns: columns,
  });

  fs.writeFileSync(outputPath, output);
  console.log(`Created: jobs_processed_part_${i + 1}.csv (rows ${start + 1}-${end})`);
}

console.log('');
console.log('Done!');
