#!/usr/bin/env node
/**
 * Patches the /deploy page client-side script so that the deploy webhook
 * URLs are RELATIVE (same-origin) instead of hardcoded to v2.improveitmd.com.
 *
 * Why: the Webstudio project ships a hardcoded `DEPLOY_URL = 'https://v2.improveitmd.com'`
 * embedded in an HtmlEmbed. On Carolina (improveitcarolina.com) that causes CORS
 * failures and hits the wrong webhook entirely. This patch rewrites it to use
 * relative paths so the page calls /deploy/trigger and /deploy/status on the
 * same origin (Caddy proxies these to the Carolina deploy webhook on port 9001).
 *
 * Idempotent: safe to run on every deploy.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');
const GENERATED_DIR = path.join(PROJECT_DIR, 'app', '__generated__');
const GENERATED_FILE = path.join(GENERATED_DIR, '[deploy]._index.tsx');
const DATA_FILE = path.join(PROJECT_DIR, '.webstudio', 'data.json');

let totalChanged = 0;

function patch(file, label) {
  if (!fs.existsSync(file)) {
    console.log(`  SKIP ${label} (file not found)`);
    return;
  }

  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  // 1) Rewrite the JS variable: const DEPLOY_URL = 'https://...';  ->  const DEPLOY_URL = '';
  // Same-origin requests if DEPLOY_URL is empty string (since '' + '/deploy/trigger' = '/deploy/trigger')
  after = after.replace(
    /const DEPLOY_URL\s*=\s*['"]https?:\/\/[^'"]*['"]\s*;/g,
    "const DEPLOY_URL = '';"
  );

  // 2) Rewrite any direct hardcoded fetch URLs that mention v2.improveitmd.com or improveitmd.com /deploy/
  after = after.replace(
    /https?:\/\/v2\.improveitmd\.com\/deploy\//g,
    '/deploy/'
  );
  after = after.replace(
    /https?:\/\/improveitmd\.com\/deploy\//g,
    '/deploy/'
  );

  // 3) Update the visible subtitle so the deploy card no longer says "v2.improveitmd.com"
  //    on the Carolina site.
  after = after.replace(
    /<p class=\\"subtitle\\">v2\.improveitmd\.com<\/p>/g,
    '<p class=\\"subtitle\\">improveitcarolina.com<\/p>'
  );
  after = after.replace(
    /<p class="subtitle">v2\.improveitmd\.com<\/p>/g,
    '<p class="subtitle">improveitcarolina.com</p>'
  );

  if (before === after) {
    console.log(`  OK ${label} (no changes needed - already patched or no match)`);
    return;
  }

  fs.writeFileSync(file, after, 'utf8');
  totalChanged++;
  console.log(`  OK ${label} (patched)`);
}

console.log('inject-deploy-urls (Carolina):');
patch(GENERATED_FILE, 'generated tsx');
patch(DATA_FILE, 'webstudio data.json');
console.log(`inject-deploy-urls: done (${totalChanged} files modified)`);
