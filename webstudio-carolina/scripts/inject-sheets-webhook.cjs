#!/usr/bin/env node
/**
 * Patches the catch-all route action to forward successful form submissions
 * to a Google Sheets webhook (fire-and-forget, non-blocking).
 *
 * Reads GOOGLE_SHEETS_WEBHOOK from environment. If not set, skips injection.
 */

const fs = require('fs');
const path = require('path');

const MARKER = '// [inject-sheets-webhook]';
const ROUTES_DIR = path.join(__dirname, '..', 'app', 'routes');
const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK || '';

function log(msg) {
  console.log(`[sheets-webhook] ${msg}`);
}

if (!WEBHOOK_URL) {
  log('GOOGLE_SHEETS_WEBHOOK not set, skipping');
  process.exit(0);
}

// Patch all route files that have a form action
const routeFiles = fs.readdirSync(ROUTES_DIR).filter(f => f.endsWith('.tsx'));
let patched = 0;

for (const file of routeFiles) {
  const filePath = path.join(ROUTES_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if no action handler or already patched
  if (!content.includes('loadResource(fetch, resource)')) continue;
  if (content.includes(MARKER)) {
    log(`  SKIP ${file} (already patched)`);
    continue;
  }

  // Inject the webhook forward after the successful loadResource call
  const oldCode = `const { ok, statusText } = await loadResource(fetch, resource);
    if (ok) {
      return { success: true };
    }`;

  const newCode = `const { ok, statusText } = await loadResource(fetch, resource);
    if (ok) {
      ${MARKER}
      // Forward form data to Google Sheets (fire-and-forget)
      try {
        const sheetsData = {
          ...Object.fromEntries(formData),
          _form_name: typeof resourceName === "string" ? resourceName : "unknown",
          _page_url: url.href,
          _submitted_at: new Date().toISOString(),
        };
        fetch("${WEBHOOK_URL}", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sheetsData),
        }).catch(() => {}); // non-blocking, ignore errors
      } catch (_) {}
      return { success: true };
    }`;

  if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    fs.writeFileSync(filePath, content);
    log(`  OK ${file}`);
    patched++;
  } else {
    log(`  SKIP ${file} (action pattern not found)`);
  }
}

log(`Done: ${patched} route(s) patched`);
