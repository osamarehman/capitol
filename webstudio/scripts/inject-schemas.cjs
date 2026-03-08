#!/usr/bin/env node
/**
 * Injects JSON-LD structured data schema markup into Webstudio generated page files.
 * Run after `webstudio build` and before Docker build.
 *
 * - Reads schema JSON from docs/schemas/core/
 * - Injects <script type="application/ld+json"> via HtmlEmbed into each page's <Body>
 * - Skips pages that already have schema markup (idempotent)
 *
 * Domain config: update ASSET_DOMAIN below when switching from v2 to production.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const GENERATED_DIR = path.join(ROOT, 'webstudio/app/__generated__');
const SCHEMAS_DIR = path.join(ROOT, 'docs/schemas/core');

const MAPPINGS = [
  { schema: 'home.json', tsx: '_index.tsx' },
  { schema: 'about.json', tsx: '[about]._index.tsx' },
  { schema: 'team.json', tsx: '[team]._index.tsx' },
  { schema: 'testimonials.json', tsx: '[testimonials]._index.tsx' },
  { schema: 'gallery.json', tsx: '[gallery]._index.tsx' },
  { schema: 'contact.json', tsx: '[contact]._index.tsx' },
  { schema: 'quote.json', tsx: '[quote]._index.tsx' },
  { schema: 'financing.json', tsx: '[financing]._index.tsx' },
  { schema: 'warranty.json', tsx: '[warranty]._index.tsx' },
  { schema: 'blog.json', tsx: '[blog]._index.tsx' },
  { schema: 'video_gallery.json', tsx: '[video-gallery]._index.tsx' },
  { schema: 'roofing.json', tsx: '[roofing]._index.tsx' },
  { schema: 'roofing_asphalt.json', tsx: '[roofing].[asphalt-roofing]._index.tsx' },
  { schema: 'roofing_metal.json', tsx: '[roofing].[metal-roofing]._index.tsx' },
  { schema: 'roofing_flat.json', tsx: '[roofing].[flat-roofing]._index.tsx' },
  { schema: 'roofing_commercial.json', tsx: '[roofing].[commercial-roofing]._index.tsx' },
  { schema: 'siding.json', tsx: '[siding]._index.tsx' },
  { schema: 'siding_james_hardie.json', tsx: '[siding].[james-hardie]._index.tsx' },
  { schema: 'siding_vinyl.json', tsx: '[siding].[vinyl]._index.tsx' },
  { schema: 'windows.json', tsx: '[windows]._index.tsx' },
  { schema: 'doors.json', tsx: '[doors]._index.tsx' },
  { schema: 'gutters.json', tsx: '[gutters]._index.tsx' },
  { schema: 'exterior_trim.json', tsx: '[exterior-trim]._index.tsx' },
  { schema: 'decks.json', tsx: '[decks-and-patios]._index.tsx' },
  { schema: 'decks_rooftop.json', tsx: '[deck-and-patios].[rooftop-deck]._index.tsx' },
  { schema: 'decks_ipe.json', tsx: '[deck-and-patios].[ipe-deck-builder]._index.tsx' },
  { schema: 'decks_flagstone.json', tsx: '[deck-and-patios].[flagstone-patios]._index.tsx' },
  { schema: 'roofing_cost_calculator.json', tsx: '[roofing-cost-calculator]._index.tsx' },
  { schema: 'commercial_roof_calculator.json', tsx: '[commercial-roof-cost-calculator]._index.tsx' },
  { schema: 'service_areas.json', tsx: '[service-areas]._index.tsx' },
  { schema: 'location_bowie.json', tsx: '[locations].[bowie]._index.tsx' },
  { schema: 'location_gaithersburg.json', tsx: '[locations].[gaithersburg]._index.tsx' },
  { schema: 'location_dc.json', tsx: '[locations].[washington-dc]._index.tsx' },
];

let success = 0, skipped = 0, errors = 0;

for (const { schema, tsx } of MAPPINGS) {
  const schemaPath = path.join(SCHEMAS_DIR, schema);
  const tsxPath = path.join(GENERATED_DIR, tsx);

  if (!fs.existsSync(schemaPath)) { console.error(`  MISSING SCHEMA: ${schema}`); errors++; continue; }
  if (!fs.existsSync(tsxPath)) { console.error(`  MISSING TSX: ${tsx}`); errors++; continue; }

  const schemaJson = fs.readFileSync(schemaPath, 'utf8').trim();
  try { JSON.parse(schemaJson); } catch (e) { console.error(`  INVALID JSON in ${schema}: ${e.message}`); errors++; continue; }

  let tsxContent = fs.readFileSync(tsxPath, 'utf8');

  if (tsxContent.includes('application/ld+json')) { console.log(`  SKIP (exists): ${tsx}`); skipped++; continue; }

  const bodyPattern = /(<Body\s*\n\s*className=\{[^}]+\}>)/;
  if (!tsxContent.match(bodyPattern)) { console.error(`  NO Body TAG: ${tsx}`); errors++; continue; }

  const escapedJson = schemaJson.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

  const htmlEmbedBlock = `\n<HtmlEmbed\ncode={\`<script type="application/ld+json">\n${escapedJson}\n</script>\`}\nclientOnly={true}\nclassName={\`w-html-embed\`} />`;

  tsxContent = tsxContent.replace(bodyPattern, `$1${htmlEmbedBlock}`);
  fs.writeFileSync(tsxPath, tsxContent, 'utf8');
  console.log(`  OK: ${schema} -> ${tsx}`);
  success++;
}

console.log(`inject-schemas: ${success} injected, ${skipped} skipped, ${errors} errors`);
if (errors > 0) process.exit(1);
