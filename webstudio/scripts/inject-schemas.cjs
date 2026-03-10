#!/usr/bin/env node
/**
 * Injects JSON-LD structured data schema markup into Webstudio route files.
 * Run after `webstudio build` and before Docker build.
 *
 * Replaces the default WebSite-only schema in each route's meta() function
 * with the page-specific schema from docs/schemas/core/. Schemas render
 * server-side in <head> for SEO crawlers.
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

const FORCE = process.argv.includes('--force');
if (FORCE) console.log('  --force: will re-inject all schemas\n');

let success = 0, skipped = 0, errors = 0;

// Pattern for the default WebSite block (first injection)
const websiteBlockPattern = /  if \(siteName\) \{\n    metas\.push\(\{\n      "script:ld\+json": \{\n        "@context": "https:\/\/schema\.org",\n        "@type": "WebSite",\n        name: siteName,\n        url: origin,\n      \},\n    \}\);\n  \}/;

// Pattern for a previously injected schema block (re-injection)
const injectedBlockPattern = /  \/\/ \[inject-schemas\] JSON-LD structured data\n  metas\.push\(\{\n    "script:ld\+json": \{[\s\S]*?\n  \}\);/;

for (const { schema, route } of MAPPINGS) {
  const schemaPath = path.join(SCHEMAS_DIR, schema);
  const routePath = path.join(ROUTES_DIR, route);

  if (!fs.existsSync(schemaPath)) { console.error(`  MISSING SCHEMA: ${schema}`); errors++; continue; }
  if (!fs.existsSync(routePath)) { console.error(`  MISSING ROUTE: ${route}`); errors++; continue; }

  const schemaJson = fs.readFileSync(schemaPath, 'utf8').trim();
  let schemaObj;
  try { schemaObj = JSON.parse(schemaJson); } catch (e) { console.error(`  INVALID JSON in ${schema}: ${e.message}`); errors++; continue; }

  let routeContent = fs.readFileSync(routePath, 'utf8');

  // Format the schema object with 2-space indent, then indent each line by 4 spaces
  const jsonStr = JSON.stringify(schemaObj, null, 2)
    .split('\n')
    .map((line, i) => i === 0 ? line : '    ' + line)
    .join('\n');

  const replacement = `  // [inject-schemas] JSON-LD structured data\n  metas.push({\n    "script:ld+json": ${jsonStr}\n  });`;

  if (routeContent.includes('// [inject-schemas]')) {
    if (FORCE) {
      // Re-inject: replace existing injected block with updated schema
      if (injectedBlockPattern.test(routeContent)) {
        routeContent = routeContent.replace(injectedBlockPattern, replacement);
        fs.writeFileSync(routePath, routeContent, 'utf8');
        console.log(`  UPDATED: ${schema} -> ${route}`);
        success++;
      } else {
        console.error(`  CANNOT RE-INJECT: ${route}`);
        errors++;
      }
    } else {
      console.log(`  SKIP (exists): ${route}`);
      skipped++;
    }
    continue;
  }

  // First injection: replace the default WebSite block
  if (!websiteBlockPattern.test(routeContent)) {
    console.error(`  NO WebSite BLOCK: ${route}`);
    errors++;
    continue;
  }

  routeContent = routeContent.replace(websiteBlockPattern, replacement);
  fs.writeFileSync(routePath, routeContent, 'utf8');
  console.log(`  OK: ${schema} -> ${route}`);
  success++;
}

console.log(`inject-schemas: ${success} injected, ${skipped} skipped, ${errors} errors`);
if (errors > 0) process.exit(1);
