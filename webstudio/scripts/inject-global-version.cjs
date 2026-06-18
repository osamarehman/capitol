#!/usr/bin/env node
/**
 * inject-global-version.cjs
 *
 * Cache-busts global.js by appending a content hash query string to every
 * reference, so each deploy produces a brand-new URL that Cloudflare has never
 * cached — eliminating the manual "Purge Everything" dance.
 *
 * Why a query string (global.js?v=<hash>) and not a hashed filename:
 *   - Cloudflare caches per full URL INCLUDING the query string (verified on
 *     this zone), so ?v=<hash> is a distinct cache key every deploy.
 *   - The file on disk stays public/global.js, so the existing Caddy `handle
 *     /global.js { ... }` cache block keeps applying (no Caddy change needed).
 *   - The static server ignores the query, so /global.js?v=<hash> serves the
 *     same bytes whose hash produced <hash>.
 *
 * Run order: AFTER scripts/optimize-assets.sh (which adds data-cfasync by
 * matching the bare URL) and AFTER the public/global.js esbuild minify, so the
 * hash matches the deployed bytes. Idempotent: re-running replaces any existing
 * ?v=... with the current hash.
 *
 * Usage: node scripts/inject-global-version.cjs
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const GLOBAL_JS = path.join(ROOT, 'public', 'global.js');
const GENERATED_DIR = path.join(ROOT, 'app', '__generated__');
// Match the URL with an optional pre-existing ?v=... so re-runs are idempotent.
const URL_RE = /https:\/\/improveitmd\.com\/global\.js(?:\?v=[a-f0-9]+)?/g;

function main() {
  if (!fs.existsSync(GLOBAL_JS)) {
    console.error('[inject-global-version] ERROR: public/global.js not found — run the esbuild minify step first.');
    process.exit(1);
  }
  const bytes = fs.readFileSync(GLOBAL_JS);
  const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const versioned = `https://improveitmd.com/global.js?v=${hash}`;
  console.log(`[inject-global-version] global.js hash=${hash} (${bytes.length} bytes) -> ${versioned}`);

  if (!fs.existsSync(GENERATED_DIR)) {
    console.error('[inject-global-version] ERROR: app/__generated__ not found — run after webstudio build.');
    process.exit(1);
  }

  const files = fs.readdirSync(GENERATED_DIR).filter((f) => f.endsWith('.tsx'));
  let patchedFiles = 0;
  let changedRefs = 0;
  let totalRefsFound = 0;
  for (const f of files) {
    const fp = path.join(GENERATED_DIR, f);
    const src = fs.readFileSync(fp, 'utf8');
    const matches = src.match(URL_RE);
    if (!matches) continue;
    totalRefsFound += matches.length;
    // Only write if something actually changes (some may already be at the right version).
    const next = src.replace(URL_RE, versioned);
    if (next !== src) {
      fs.writeFileSync(fp, next);
      patchedFiles++;
      changedRefs += matches.length;
    }
  }
  console.log(`[inject-global-version] ${totalRefsFound} reference(s) found; updated ${changedRefs} across ${patchedFiles} file(s) (scanned ${files.length}).`);
  if (totalRefsFound === 0) {
    console.warn('[inject-global-version] WARNING: no global.js references found to version. ' +
      'If the site-wide head tag moved, update URL_RE.');
  }
}

main();
