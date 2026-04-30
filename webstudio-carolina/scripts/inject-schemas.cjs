#!/usr/bin/env node
/**
 * Injects JSON-LD schema markup into Webstudio route files (Carolina).
 *
 * Replaces the default WebSite schema with page-specific structured data.
 * Schema files are loaded from docs/schemas/core/ when they exist.
 * Falls back to a basic WebSite + HomeAndConstructionBusiness schema.
 *
 * TODO: Create page-specific schema files in docs/schemas/core/ for Carolina.
 */

const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, '..', 'app', 'routes');
const SCHEMAS_DIR = path.join(__dirname, '..', 'docs', 'schemas', 'core');
const MARKER = '// [inject-schemas]';
const FORCE = process.argv.includes('--force');

// TODO: Update when Carolina domain is configured
const SITE_ORIGIN = process.env.SITE_ORIGIN || 'https://improveitcarolina.com';

// Default schema for all pages (used when no page-specific schema exists)
const DEFAULT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Capitol Family Exteriors",
      "url": SITE_ORIGIN
    },
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": `${SITE_ORIGIN}/#corporation`,
      "name": "Capitol Family Exteriors",
      "url": SITE_ORIGIN,
      "logo": "https://improveitcarolina.com/assets/capitol_improvements_logo_main.svg",
      "email": "support@improveitcarolina.com",
      "priceRange": "$",
      "description": "Capitol Family Exteriors provides expert roofing, siding, windows, doors, gutters, and deck services in the Wilmington, NC area and surrounding communities.",
      "areaServed": [
        {
          "@type": "State",
          "name": "North Carolina"
        }
      ]
    }
  ]
};

// Route → schema file mapping (add entries as schemas are created)
const ROUTE_SCHEMA_MAP = {
  '_index.tsx': 'home.json',
  '[about]._index.tsx': 'about.json',
  '[roofing]._index.tsx': 'roofing.json',
  '[siding]._index.tsx': 'siding.json',
  '[windows]._index.tsx': 'windows.json',
  '[doors]._index.tsx': 'doors.json',
  '[gutters]._index.tsx': 'gutters.json',
  '[contact]._index.tsx': 'contact.json',
  '[gallery]._index.tsx': 'gallery.json',
};

let success = 0, skipped = 0, errors = 0;

const routeFiles = fs.readdirSync(ROUTES_DIR)
  .filter(f => f.endsWith('.tsx') && !f.startsWith('[_image]') && !f.startsWith('[robots') && !f.startsWith('[sitemap'));

for (const file of routeFiles) {
  const filePath = path.join(ROUTES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes(MARKER) && !FORCE) {
    skipped++;
    continue;
  }

  if (!content.includes('meta:') && !content.includes('MetaFunction')) {
    skipped++;
    continue;
  }

  // Load page-specific schema or use default
  let schema = DEFAULT_SCHEMA;
  const schemaFile = ROUTE_SCHEMA_MAP[file];
  if (schemaFile) {
    const schemaPath = path.join(SCHEMAS_DIR, schemaFile);
    if (fs.existsSync(schemaPath)) {
      try {
        schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      } catch (e) {
        console.log(`  \u26a0 ${file}: invalid schema file ${schemaFile}`);
      }
    }
  }

  try {
    // Find the meta function and inject/replace the schema
    const schemaJson = JSON.stringify(schema, null, 6).replace(/^/gm, '        ').trim();

    const newSchemaBlock = `${MARKER} JSON-LD structured data
  metas.push({
    "script:ld+json": ${schemaJson}
  });`;

    // Pattern 1: Default Webstudio template (if (siteName) { metas.push({...}) })
    const defaultPattern = /if \(siteName\) \{\s*\n\s*metas\.push\(\{\s*\n\s*"script:ld\+json":\s*\{[\s\S]*?\},?\s*\n\s*\}\);\s*\n\s*\}/;

    // Pattern 2: Already injected by this script
    const injectedPattern = /\/\/ \[inject-schemas\] JSON-LD structured data\s*\n\s*metas\.push\(\{\s*"script:ld\+json":\s*[\s\S]*?\}\);/;

    // Pattern 3: Generic metas.push with script:ld+json
    const genericPattern = /metas\.push\(\{\s*"script:ld\+json":\s*\{[\s\S]*?\}\s*\}\);/;

    if (defaultPattern.test(content)) {
      content = content.replace(defaultPattern, newSchemaBlock);
      fs.writeFileSync(filePath, content);
      console.log(`  \u2713 ${file}`);
      success++;
    } else if (content.includes(MARKER) && FORCE && injectedPattern.test(content)) {
      content = content.replace(injectedPattern, newSchemaBlock);
      fs.writeFileSync(filePath, content);
      console.log(`  \u2713 ${file} (re-injected)`);
      success++;
    } else if (genericPattern.test(content)) {
      content = content.replace(genericPattern, newSchemaBlock);
      fs.writeFileSync(filePath, content);
      console.log(`  \u2713 ${file}`);
      success++;
    } else {
      skipped++;
    }
  } catch (err) {
    console.error(`  \u2717 ${file}: ${err.message}`);
    errors++;
  }
}

console.log(`\nSchema injection: ${success} injected, ${skipped} skipped, ${errors} errors`);
