#!/usr/bin/env node
/**
 * Injects canonical <link> tags into all Webstudio route files for Carolina.
 * Run after `webstudio build` and before Docker build.
 *
 * NOTE: CANONICAL_ORIGIN should be updated once the Carolina domain is set up.
 * For now, uses a placeholder that should be replaced during domain setup.
 */

const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, '..', 'app', 'routes');

// TODO: Update this when Carolina domain is configured
const CANONICAL_ORIGIN = process.env.SITE_ORIGIN || 'https://improveitcarolina.com';

const MARKER = '// [inject-canonical]';

let success = 0, skipped = 0, errors = 0;

const routeFiles = fs.readdirSync(ROUTES_DIR)
  .filter(f => f.endsWith('.tsx') && !f.startsWith('[_image]') && !f.startsWith('[robots') && !f.startsWith('[sitemap'));

for (const file of routeFiles) {
  const filePath = path.join(ROUTES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes(MARKER)) {
    if (content.includes('// [inject-canonical]') && !content.includes('{/* // [inject-canonical]')) {
      content = content.replace(
        /\/\/ \[inject-canonical\] canonical URL \(always non-www https\)/g,
        '{/* // [inject-canonical] canonical URL (always non-www https) */}'
      );
      fs.writeFileSync(filePath, content);
      console.log(`  \u2713 ${file} (fixed comment format)`);
      success++;
    } else {
      skipped++;
    }
    continue;
  }

  if (!content.includes('PageSettingsMeta') || !content.includes('useLoaderData')) {
    skipped++;
    continue;
  }

  try {
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

    const canonicalComponent = `{/* ${MARKER} canonical URL (always non-www https) */}
      <PageSettingsCanonicalLink href={\`${CANONICAL_ORIGIN}\${new URL(url).pathname}\`} />`;

    content = content.replace(
      /(<PageSettingsTitle>.*?<\/PageSettingsTitle>)/s,
      `$1\n      ${canonicalComponent}`
    );

    fs.writeFileSync(filePath, content);
    console.log(`  \u2713 ${file}`);
    success++;
  } catch (err) {
    console.error(`  \u2717 ${file}: ${err.message}`);
    errors++;
  }
}

console.log(`\nCanonical injection: ${success} injected, ${skipped} skipped, ${errors} errors`);
if (errors > 0) process.exit(1);
