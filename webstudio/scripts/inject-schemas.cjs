#!/usr/bin/env node
/**
 * Injects JSON-LD structured data schema markup into Webstudio route files.
 * Run after `webstudio build` and before Docker build.
 *
 * Adds schema as additional "script:ld+json" entries in the meta() function
 * of each route file, so schemas render server-side in <head> for SEO.
 *
 * Idempotent: skips routes that already have the schema injected.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const ROUTES_DIR = path.join(ROOT, 'webstudio/app/routes');
const SCHEMAS_DIR = path.join(ROOT, 'docs/schemas/core');

const MAPPINGS = [
  { schema: 'home.json', route: '_index.tsx' },
  { schema: 'about.json', route: '[about]._index.tsx' },
  { schema: 'team.json', route: '[team]._index.tsx' },
  { schema: 'testimonials.json', route: '[testimonials]._index.tsx' },
  { schema: 'gallery.json', route: '[gallery]._index.tsx' },
  { schema: 'contact.json', route: '[contact]._index.tsx' },
  { schema: 'quote.json', route: '[quote]._index.tsx' },
  { schema: 'financing.json', route: '[financing]._index.tsx' },
  { schema: 'warranty.json', route: '[warranty]._index.tsx' },
  { schema: 'blog.json', route: '[blog]._index.tsx' },
  { schema: 'video_gallery.json', route: '[video-gallery]._index.tsx' },
  { schema: 'roofing.json', route: '[roofing]._index.tsx' },
  { schema: 'roofing_asphalt.json', route: '[roofing].[asphalt-roofing]._index.tsx' },
  { schema: 'roofing_metal.json', route: '[roofing].[metal-roofing]._index.tsx' },
  { schema: 'roofing_flat.json', route: '[roofing].[flat-roofing]._index.tsx' },
  { schema: 'roofing_commercial.json', route: '[roofing].[commercial-roofing]._index.tsx' },
  { schema: 'siding.json', route: '[siding]._index.tsx' },
  { schema: 'siding_james_hardie.json', route: '[siding].[james-hardie]._index.tsx' },
  { schema: 'siding_vinyl.json', route: '[siding].[vinyl]._index.tsx' },
  { schema: 'windows.json', route: '[windows]._index.tsx' },
  { schema: 'doors.json', route: '[doors]._index.tsx' },
  { schema: 'gutters.json', route: '[gutters]._index.tsx' },
  { schema: 'exterior_trim.json', route: '[exterior-trim]._index.tsx' },
  { schema: 'decks.json', route: '[decks-and-patios]._index.tsx' },
  { schema: 'decks_rooftop.json', route: '[deck-and-patios].[rooftop-deck]._index.tsx' },
  { schema: 'decks_ipe.json', route: '[deck-and-patios].[ipe-deck-builder]._index.tsx' },
  { schema: 'decks_flagstone.json', route: '[deck-and-patios].[flagstone-patios]._index.tsx' },
  { schema: 'roofing_cost_calculator.json', route: '[roofing-cost-calculator]._index.tsx' },
  { schema: 'commercial_roof_calculator.json', route: '[commercial-roof-cost-calculator]._index.tsx' },
  { schema: 'service_areas.json', route: '[service-areas]._index.tsx' },
  { schema: 'location_bowie.json', route: '[locations].[bowie]._index.tsx' },
  { schema: 'location_gaithersburg.json', route: '[locations].[gaithersburg]._index.tsx' },
  { schema: 'location_dc.json', route: '[locations].[washington-dc]._index.tsx' },
];

let success = 0, skipped = 0, errors = 0;

for (const { schema, route } of MAPPINGS) {
  const schemaPath = path.join(SCHEMAS_DIR, schema);
  const routePath = path.join(ROUTES_DIR, route);

  if (!fs.existsSync(schemaPath)) { console.error(`  MISSING SCHEMA: ${schema}`); errors++; continue; }
  if (!fs.existsSync(routePath)) { console.error(`  MISSING ROUTE: ${route}`); errors++; continue; }

  const schemaJson = fs.readFileSync(schemaPath, 'utf8').trim();
  let schemaObj;
  try { schemaObj = JSON.parse(schemaJson); } catch (e) { console.error(`  INVALID JSON in ${schema}: ${e.message}`); errors++; continue; }

  let routeContent = fs.readFileSync(routePath, 'utf8');

  if (routeContent.includes('// [inject-schemas]')) {
    console.log(`  SKIP (exists): ${route}`);
    skipped++;
    continue;
  }

  // Inject before `return metas;` inside the meta() function
  const target = '  return metas;\n};';
  if (!routeContent.includes(target)) {
    console.error(`  NO meta() PATTERN: ${route}`);
    errors++;
    continue;
  }

  // Format the schema object with 2-space indent, then indent each line by 4 spaces for nesting
  const jsonStr = JSON.stringify(schemaObj, null, 2)
    .split('\n')
    .map((line, i) => i === 0 ? line : '    ' + line)
    .join('\n');

  const injection = `  // [inject-schemas] JSON-LD structured data\n  metas.push({\n    "script:ld+json": ${jsonStr}\n  });\n\n`;

  routeContent = routeContent.replace(target, injection + target);
  fs.writeFileSync(routePath, routeContent, 'utf8');
  console.log(`  OK: ${schema} -> ${route}`);
  success++;
}

console.log(`inject-schemas: ${success} injected, ${skipped} skipped, ${errors} errors`);
if (errors > 0) process.exit(1);
