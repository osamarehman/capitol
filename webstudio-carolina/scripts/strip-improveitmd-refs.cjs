#!/usr/bin/env node
/**
 * Strip all improveitmd.com references from Carolina generated files.
 * Replaces external MD domain URLs with same-origin Carolina paths so all
 * traffic flows through improveitcarolina.com.
 *
 * Replacements:
 *   - https://forms.improveitmd.com/api/*   -> /forms/api/*
 *   - https://app.improveitmd.com/forms/api/* -> /forms/api/*
 *   - https://cms.improveitmd.com/uploads/* -> https://improveitcarolina.com/uploads/*
 *   - https://cms.improveitmd.com/api/*     -> /api/*
 *   - https://cms.improveitmd.com/graphql   -> /graphql
 *   - https://improveitmd.com/uploads/*     -> https://improveitcarolina.com/uploads/*
 *   - https://improveitmd.com/global.js     -> /global.js
 *   - "https://improveitmd.com" host links  -> "https://improveitcarolina.com"
 *
 * NOTE: Internal links to specific MD pages (e.g. improveitmd.com/services/bowie-...)
 * are LEFT alone — those are content-level cross-references that should be edited
 * in the Webstudio CMS, not stripped post-build (would break the link target).
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');
const GEN_DIR = path.join(PROJECT_DIR, 'app', '__generated__');
const ROUTES_DIR = path.join(PROJECT_DIR, 'app', 'routes');
const DATA_JSON = path.join(PROJECT_DIR, '.webstudio', 'data.json');

function log(msg) {
  console.log(`[strip-md] ${msg}`);
}

// Order matters — most-specific first
const REPLACEMENTS = [
  // Form API endpoints — proxied through Carolina
  ['https://forms.improveitmd.com/api/', '/forms/api/'],
  ['https://app.improveitmd.com/forms/api/', '/forms/api/'],

  // Strapi CMS API — proxied through Carolina
  ['https://cms.improveitmd.com/uploads/', 'https://improveitcarolina.com/uploads/'],
  ['https://cms.improveitmd.com/api/', '/api/'],
  ['https://cms.improveitmd.com/graphql', '/graphql'],

  // Bare cms.improveitmd.com used in dynamic URL concatenation:
  //   'https://cms.improveitmd.com' + item?.url
  // Replace the host so the resulting URL points to Carolina (which proxies to Strapi)
  ["'https://cms.improveitmd.com'", "'https://improveitcarolina.com'"],
  ['"https://cms.improveitmd.com"', '"https://improveitcarolina.com"'],
  ["`https://cms.improveitmd.com`", "`https://improveitcarolina.com`"],
  // Same pattern but JSON-encoded (escaped quotes) — found in data.json
  ['\\"https://cms.improveitmd.com\\"', '\\"https://improveitcarolina.com\\"'],

  // Asset URLs — proxied through Carolina /uploads
  ['https://improveitmd.com/uploads/', 'https://improveitcarolina.com/uploads/'],

  // Global tracking script — local
  ['https://improveitmd.com/global.js', '/global.js'],

  // Email addresses — Carolina uses its own support email
  ['support@improveitmd.com', 'support@improveitcarolina.com'],
  ['info@improveitmd.com', 'support@improveitcarolina.com'],
  ['contact@improveitmd.com', 'support@improveitcarolina.com'],
];

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return 0;

  let content = fs.readFileSync(filePath, 'utf8');
  const before = content;

  for (const [from, to] of REPLACEMENTS) {
    content = content.split(from).join(to);
  }

  if (content !== before) {
    fs.writeFileSync(filePath, content);
    return 1;
  }
  return 0;
}

let totalPatched = 0;

// Patch all generated TSX/TS files
if (fs.existsSync(GEN_DIR)) {
  for (const f of fs.readdirSync(GEN_DIR)) {
    if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue;
    if (replaceInFile(path.join(GEN_DIR, f))) {
      totalPatched++;
    }
  }
}

// Patch CSS in generated dir
if (fs.existsSync(GEN_DIR)) {
  for (const f of fs.readdirSync(GEN_DIR)) {
    if (!f.endsWith('.css')) continue;
    if (replaceInFile(path.join(GEN_DIR, f))) {
      totalPatched++;
    }
  }
}

// Patch route source files
if (fs.existsSync(ROUTES_DIR)) {
  for (const f of fs.readdirSync(ROUTES_DIR)) {
    if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue;
    if (replaceInFile(path.join(ROUTES_DIR, f))) {
      totalPatched++;
    }
  }
}

// Patch data.json
if (replaceInFile(DATA_JSON)) {
  totalPatched++;
  log('  ✓ data.json');
}

log(`Done: ${totalPatched} file(s) patched`);

// Audit: report any remaining improveitmd.com references (excluding internal content links)
const ALLOW_PATTERNS = [
  // Allow internal blog/content links — those are page references in CMS content
  /improveitmd\.com\/(blog|services|locations|roofing|siding|windows|doors|gallery|deck-and-patios|farmlands|land|home-trailer-qr|chatwidget|video-gallery|videos|forestry-mulching|james-hardie-colors|timbertech-colors|service|exterior-trim|gutters|warranty|financing|roofing-cost-calculator|commercial-roof-cost-calculator|service-areas|testimonials|team|about|contact|quote|quote-requested|locations|warranty|lp|robots|sitemap|style-guide|mapembedtest)\b/,
];

let remainingCount = 0;
const sample = [];
const allFiles = [];
if (fs.existsSync(GEN_DIR)) {
  for (const f of fs.readdirSync(GEN_DIR)) {
    if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')) {
      allFiles.push(path.join(GEN_DIR, f));
    }
  }
}
allFiles.push(DATA_JSON);

for (const fp of allFiles) {
  if (!fs.existsSync(fp)) continue;
  const content = fs.readFileSync(fp, 'utf8');
  const matches = content.match(/[a-z.]*improveitmd\.com[/a-zA-Z0-9._\-?=&]*/g) || [];
  for (const m of matches) {
    const isAllowed = ALLOW_PATTERNS.some(p => p.test(m));
    if (!isAllowed) {
      remainingCount++;
      if (sample.length < 10) sample.push(`${path.basename(fp)}: ${m}`);
    }
  }
}

if (remainingCount > 0) {
  log(`⚠  ${remainingCount} non-content improveitmd refs remain. Sample:`);
  for (const s of sample) log(`    ${s}`);
} else {
  log('✓ No non-content improveitmd refs remain');
}
