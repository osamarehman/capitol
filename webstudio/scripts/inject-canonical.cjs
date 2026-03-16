#!/usr/bin/env node
/**
 * Injects canonical <link> tags into all Webstudio route files.
 * Run after `webstudio build` and before Docker build.
 *
 * Adds PageSettingsCanonicalLink from @webstudio-is/react-sdk/runtime
 * to each route's Outlet component, generating canonical URLs as:
 *   https://improveitmd.com{pathname}
 *
 * Ensures:
 * - Always https://improveitmd.com (never www)
 * - No query parameters in canonical
 * - Consistent with sitemap and robots.txt
 *
 * Idempotent: skips routes that already have canonical injection.
 */

const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, '..', 'app', 'routes');
const CANONICAL_ORIGIN = 'https://improveitmd.com';

// Marker comment to detect already-injected files
const MARKER = '// [inject-canonical]';

let success = 0, skipped = 0, errors = 0;

// Get all route files
const routeFiles = fs.readdirSync(ROUTES_DIR)
  .filter(f => f.endsWith('.tsx') && !f.startsWith('[_image]') && !f.startsWith('[robots') && !f.startsWith('[sitemap'));

for (const file of routeFiles) {
  const filePath = path.join(ROUTES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already injected
  if (content.includes(MARKER)) {
    skipped++;
    continue;
  }

  // Skip files that don't have the Outlet component pattern
  if (!content.includes('PageSettingsMeta') || !content.includes('useLoaderData')) {
    skipped++;
    continue;
  }

  try {
    // Step 1: Add PageSettingsCanonicalLink to the import from @webstudio-is/react-sdk/runtime
    content = content.replace(
      /import\s*\{([^}]*)\}\s*from\s*["']@webstudio-is\/react-sdk\/runtime["'];/,
      (match, imports) => {
        if (imports.includes('PageSettingsCanonicalLink')) return match;
        const trimmed = imports.trimEnd();
        const newImports = trimmed.endsWith(',')
          ? `${trimmed}\n  PageSettingsCanonicalLink,`
          : `${trimmed},\n  PageSettingsCanonicalLink,`;
        return `import {${newImports}\n} from "@webstudio-is/react-sdk/runtime";`;
      }
    );

    // Step 2: Add canonical link component after PageSettingsTitle in the Outlet JSX
    // Build canonical URL from the url loader data
    const canonicalComponent = `${MARKER} canonical URL (always non-www https)
      <PageSettingsCanonicalLink href={\`${CANONICAL_ORIGIN}\${new URL(url).pathname}\`} />`;

    content = content.replace(
      /(<PageSettingsTitle>.*?<\/PageSettingsTitle>)/s,
      `$1\n      ${canonicalComponent}`
    );

    fs.writeFileSync(filePath, content);
    console.log(`  ✓ ${file}`);
    success++;
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`);
    errors++;
  }
}

console.log(`\nCanonical injection: ${success} injected, ${skipped} skipped, ${errors} errors`);
if (errors > 0) process.exit(1);
