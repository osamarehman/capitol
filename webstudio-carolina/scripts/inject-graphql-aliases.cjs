#!/usr/bin/env node
/**
 * Aligns Webstudio data bindings with Carolina-specific GraphQL field names.
 *
 * Carolina Strapi exposes carolinaLp/carolinaBlog/etc. while Webstudio bindings
 * use lp/blog/etc. Two-sided patch:
 *   1. *.server.tsx — add a GraphQL alias so the response key matches the
 *      Webstudio binding name: `carolinaLp(...)` -> `lp: carolinaLp(...)`.
 *   2. *.tsx (component files) — rewrite stray bindings that still reference
 *      `data?.carolinaLp?.[0]?` so they read from the aliased key
 *      `data?.lp?.[0]?`. Some bindings in the cloud project escaped the
 *      Webstudio alias rename and would otherwise return undefined in prod.
 */

const fs = require('fs');
const path = require('path');

const GEN_DIR = path.join(__dirname, '..', 'app', '__generated__');

const ALIASES = [
  // [Carolina field, alias used by Webstudio]
  { carolina: 'carolinaLp', alias: 'lp' },
  { carolina: 'carolinaBlog', alias: 'blog' },
  { carolina: 'carolinaBlogPost', alias: 'blogPost' },
  { carolina: 'carolinaGallery', alias: 'gallery' },
  { carolina: 'carolinaLocalPage', alias: 'localPage' },
];

function log(msg) {
  console.log(`[graphql-alias] ${msg}`);
}

if (!fs.existsSync(GEN_DIR)) {
  log('WARN: __generated__ not found, skipping');
  process.exit(0);
}

let totalPatched = 0;

const allFiles = fs.readdirSync(GEN_DIR).filter(f => f.endsWith('.tsx'));
const serverFiles = allFiles.filter(f => f.endsWith('.server.tsx'));
const componentFiles = allFiles.filter(f => !f.endsWith('.server.tsx'));

// Pass 1: patch *.server.tsx GraphQL queries with response aliases.
for (const file of serverFiles) {
  const fp = path.join(GEN_DIR, file);
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;

  for (const { carolina, alias } of ALIASES) {
    const aliasPrefix = `${alias}: `;
    const alreadyHasAlias = new RegExp(`${alias}:\\s*${carolina}\\b`).test(content);
    if (alreadyHasAlias) continue;

    // Match `\n  carolinaXyz(` inside the JSON-encoded GraphQL string,
    // or a bare `carolinaXyz(` preceded by whitespace.
    const pattern = new RegExp(`(\\\\n\\s*|\\s+)(${carolina})(\\s*\\()`, 'g');
    if (pattern.test(content)) {
      content = content.replace(pattern, `$1${aliasPrefix}$2$3`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fp, content);
    log(`  OK ${file}`);
    totalPatched++;
  }
}

// Pass 2: rewrite stale `data?.carolinaXyz?.[0]?` bindings in component files
// to read from the aliased key. Without this the page renders empty fields
// even though the loader fetched the data correctly.
for (const file of componentFiles) {
  const fp = path.join(GEN_DIR, file);
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;

  for (const { carolina, alias } of ALIASES) {
    const pattern = new RegExp(`\\?\\.${carolina}\\?\\.\\[0\\]`, 'g');
    if (pattern.test(content)) {
      content = content.replace(pattern, `?.${alias}?.[0]`);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(fp, content);
    log(`  OK ${file} (component bindings)`);
    totalPatched++;
  }
}

// Also patch data.json
const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
if (fs.existsSync(dataJsonPath)) {
  let raw = fs.readFileSync(dataJsonPath, 'utf8');
  let changed = false;
  for (const { carolina, alias } of ALIASES) {
    const alreadyHasAlias = new RegExp(`${alias}:\\s*${carolina}\\b`).test(raw);
    if (alreadyHasAlias) continue;
    // In data.json the GraphQL is JSON-encoded too: \n  carolinaLp(...
    const pattern = new RegExp(`(\\\\n\\s*|\\s+)(${carolina})(\\s*\\()`, 'g');
    if (pattern.test(raw)) {
      raw = raw.replace(pattern, `$1${alias}: $2$3`);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(dataJsonPath, raw);
    log('  OK data.json');
    totalPatched++;
  }
}

log(`Done: ${totalPatched} file(s) patched`);
