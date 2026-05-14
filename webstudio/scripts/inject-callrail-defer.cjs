#!/usr/bin/env node
/**
 * Post-sync patch: remove the inline CallRail `<Script src=".../swap.js">`
 * from CustomCode so it does not run before React hydration.
 *
 * CallRail rewrites every `<a href="tel:...">` element at parse time. When
 * that mutation lands before React Router 7's `entry.client` finishes
 * hydrating, the SSR HTML and the live DOM no longer match — React fires
 * #418 (hydration text mismatch), falls back to a full root re-render
 * (#423), and the main thread blocks long enough for Chrome to show the
 * "Page Unresponsive" modal. The intermittency comes from Cloudflare
 * Rocket Loader (CallRail has no `data-cfasync="false"`).
 *
 * After this patch, CallRail is loaded by `scripts/global.js` on the
 * `window.load` event — after hydration completes.
 *
 * Idempotent: detects whether the CallRail tag is already absent and
 * skips. Follows the same pattern as `inject-gtm.cjs` /
 * `inject-tracking-fix.cjs`.
 *
 * Patches:
 *   - `.webstudio/data.json` (raw HTML in build.pages.meta.code)
 *   - `app/__generated__/_index.tsx` (escaped TSX form inside CustomCode)
 */

const fs = require('fs');
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');

// Exact forms emitted by Webstudio (the URL is the project's CallRail
// company/account ID, stable across syncs).
const TSX_PATTERN =
  '<Script type={"text/javascript"} src={"//cdn.callrail.com/companies/525296352/400499118ad609fc155c/12/swap.js"}></Script>';
const HTML_PATTERN =
  '<script type="text/javascript" src="//cdn.callrail.com/companies/525296352/400499118ad609fc155c/12/swap.js"></script>';

let removed = 0;

// --- data.json (raw HTML inside JSON string) ---
if (fs.existsSync(dataJsonPath)) {
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  const before = data?.build?.pages?.meta?.code || '';
  if (before.includes(HTML_PATTERN)) {
    // Also strip an immediately-following newline if present, to avoid
    // leaving a blank line in CustomCode.
    const after = before
      .split(HTML_PATTERN + '\n').join('')
      .split(HTML_PATTERN).join('');
    data.build.pages.meta.code = after;
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
    console.log('  ✓ data.json: removed inline CallRail <script>');
    removed++;
  } else {
    console.log('  · data.json: CallRail already absent, skipping');
  }
}

// --- _index.tsx (escaped TSX form) ---
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes(TSX_PATTERN)) {
    content = content.split(TSX_PATTERN).join('');
    fs.writeFileSync(indexPath, content);
    console.log('  ✓ _index.tsx: removed inline CallRail <Script>');
    removed++;
  } else {
    console.log('  · _index.tsx: CallRail already absent, skipping');
  }
}

console.log(`\nCallRail defer: ${removed} file(s) patched`);
