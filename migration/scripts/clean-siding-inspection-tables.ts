import 'dotenv/config';
import { JSDOM } from 'jsdom';
import Anthropic from '@anthropic-ai/sdk';

const STRAPI_URL = process.env.STRAPI_URL!;
const API_TOKEN = process.env.STRAPI_API_TOKEN!;
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

const strapiHeaders = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

async function fetchSidingPages() {
  const allPages: any[] = [];
  let page = 1;
  const pageSize = 25;

  while (true) {
    const url = `${STRAPI_URL}/api/services?filters[slug][$containsi]=siding&fields[0]=inspectionRichText&fields[1]=title&fields[2]=slug&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const res = await fetch(url, { headers: strapiHeaders });
    const json = await res.json();
    allPages.push(...json.data);
    if (page >= json.meta.pagination.pageCount) break;
    page++;
  }

  return allPages;
}

function extractCity(title: string): string {
  // Title format: "Siding - City - State" or "Siding - City"
  const parts = title.split(' - ').map((s: string) => s.trim());
  return parts.length >= 2 ? parts[1] : parts[0];
}

function extractState(title: string): string {
  const parts = title.split(' - ').map((s: string) => s.trim());
  if (parts.length >= 3) {
    const st = parts[2];
    if (st === 'MD') return 'Maryland';
    if (st === 'VA') return 'Virginia';
    if (st === 'DC') return 'Washington, DC';
    return st;
  }
  return 'Maryland';
}

interface TableStats {
  keptRows: number;
  removedRows: number;
  totalRows: number;
  totalSquares: number;
  tableHtml: string;
}

function cleanTable(html: string): TableStats {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const table = doc.querySelector('table');
  if (!table) return { keptRows: 0, removedRows: 0, totalRows: 0, totalSquares: 0, tableHtml: '' };

  // Find column indices
  const headerCells = table.querySelectorAll('thead th');
  let sidingSqColIndex = -1;
  let sidingSqFtColIndex = -1;

  headerCells.forEach((th, i) => {
    const text = th.textContent?.trim() || '';
    if (text === 'Siding Sq') sidingSqColIndex = i;
    if (text === 'Siding SqFt') sidingSqFtColIndex = i;
  });

  // Remove "Siding Sq" header
  if (sidingSqColIndex >= 0) {
    headerCells[sidingSqColIndex].remove();
  }

  // Process body rows
  const bodyRows = table.querySelectorAll('tbody tr');
  const totalRows = bodyRows.length;
  let removedRows = 0;
  let totalSquares = 0;

  bodyRows.forEach((row) => {
    const cells = row.querySelectorAll('td');
    const sqFtValue = sidingSqFtColIndex >= 0 ? cells[sidingSqFtColIndex]?.textContent?.trim() : '';

    if (!sqFtValue) {
      row.remove();
      removedRows++;
      return;
    }

    // Sum up Siding Sq values for stats
    if (sidingSqColIndex >= 0 && cells[sidingSqColIndex]) {
      const sqVal = parseFloat(cells[sidingSqColIndex].textContent?.trim()?.replace(/,/g, '') || '0');
      if (!isNaN(sqVal)) totalSquares += sqVal;
      cells[sidingSqColIndex].remove();
    }
  });

  // Extract just the table wrapper div
  const wrapper = doc.querySelector('.table-wrapper');
  const tableHtml = wrapper ? wrapper.outerHTML : table.outerHTML;

  return {
    keptRows: totalRows - removedRows,
    removedRows,
    totalRows,
    totalSquares: Math.round(totalSquares),
    tableHtml,
  };
}

async function generateH2AndParagraph(
  city: string,
  state: string,
  totalSquares: number,
  propertyCount: number
): Promise<{ h2: string; paragraph: string }> {
  const prompt = `Generate an H2 heading and a subtext paragraph for a siding company's local service page.

City: ${city}
State: ${state}
Total Squares of Siding: ${totalSquares.toLocaleString()}
Number of Properties: ${propertyCount}

Follow this EXACT format and tone:

H2 example: "1,098 Squares of Bowie Siding Inspected, Repaired, and Replaced"
Subtext example: "Our team has physically inspected, repaired, or replaced siding across 380 properties throughout the Bowie community, covering more than 1,098 squares of exterior area. This deep-rooted local history across Bowie, MD proves we have the specialized expertise to manage the unique material transitions—like siding-to-brick—found in our local architecture, ensuring every home stays 'Weather-Tight' against ${state}'s seasonal demands."

Rules:
- H2 must start with the actual number of squares (formatted with commas), then city name
- H2 must end with "Inspected, Repaired, and Replaced"
- Paragraph must mention the exact property count and squares number
- Paragraph must mention the city name and state naturally
- Keep the "Weather-Tight" phrase in single quotes
- Mention material transitions relevant to siding (siding-to-brick, vinyl-to-hardie, etc.)
- Reference the state's weather/seasons
- Keep it to one paragraph, similar length to the example
- Do NOT use markdown formatting

Respond in exactly this JSON format (no other text):
{"h2": "...", "paragraph": "..."}`;

  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = (response.content[0] as any).text.trim();
  try {
    return JSON.parse(text);
  } catch {
    // Try to extract JSON from the response
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error(`Failed to parse AI response: ${text}`);
  }
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log('Fetching siding pages...');
  const pages = await fetchSidingPages();
  console.log(`Total siding pages: ${pages.length}\n`);

  const populated = pages.filter((p: any) => p.inspectionRichText && p.inspectionRichText.trim());
  console.log(`Pages with inspectionRichText: ${populated.length}`);
  console.log(`Pages without: ${pages.length - populated.length}\n`);

  let totalUpdated = 0;
  let totalFailed = 0;
  let grandRowsRemoved = 0;
  let grandRowsKept = 0;

  for (const page of populated) {
    const city = extractCity(page.title);
    const state = extractState(page.title);
    const stats = cleanTable(page.inspectionRichText);

    console.log(`[${page.title}] (${page.documentId})`);
    console.log(`  City: ${city}, State: ${state}`);
    console.log(`  Rows: ${stats.totalRows} -> ${stats.keptRows} kept, ${stats.removedRows} removed`);
    console.log(`  Total Squares: ${stats.totalSquares}`);

    grandRowsRemoved += stats.removedRows;
    grandRowsKept += stats.keptRows;

    if (stats.keptRows === 0) {
      console.log('  SKIPPED: No rows with data remain.\n');
      continue;
    }

    // Generate new H2 and paragraph via AI
    console.log('  Generating H2 and paragraph...');
    let h2: string, paragraph: string;
    try {
      const result = await generateH2AndParagraph(city, state, stats.totalSquares, stats.keptRows);
      h2 = result.h2;
      paragraph = result.paragraph;
    } catch (err) {
      console.error(`  FAILED to generate text: ${err}\n`);
      totalFailed++;
      continue;
    }

    console.log(`  H2: ${h2}`);
    console.log(`  Para: ${paragraph.substring(0, 80)}...`);

    // Assemble final HTML
    const finalHtml = `<h2>${h2}</h2>\n<p>${paragraph}</p>\n${stats.tableHtml}`;

    if (dryRun) {
      console.log('  (dry run - skipped)\n');
      continue;
    }

    try {
      const res = await fetch(`${STRAPI_URL}/api/services/${page.documentId}`, {
        method: 'PUT',
        headers: strapiHeaders,
        body: JSON.stringify({ data: { inspectionRichText: finalHtml } }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`  FAILED: ${res.status} ${err}\n`);
        totalFailed++;
      } else {
        console.log('  UPDATED\n');
        totalUpdated++;
      }
    } catch (err) {
      console.error(`  ERROR: ${err}\n`);
      totalFailed++;
    }
  }

  console.log('='.repeat(60));
  console.log(`Summary:`);
  console.log(`  Pages updated: ${totalUpdated}`);
  console.log(`  Pages failed: ${totalFailed}`);
  console.log(`  Total rows removed: ${grandRowsRemoved}`);
  console.log(`  Total rows kept: ${grandRowsKept}`);
}

main().catch(console.error);
