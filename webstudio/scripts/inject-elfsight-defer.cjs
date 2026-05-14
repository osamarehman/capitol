#!/usr/bin/env node
/**
 * Post-sync patch: strip the inline Elfsight `<script src=".../platform.js">`
 * from every Webstudio HtmlEmbed that contains it, so the script does not
 * run before React hydration completes.
 *
 * Elfsight's platform.js scans for `.elfsight-app-*` containers and
 * injects widget DOM into them. Its `defer` attribute only waits for HTML
 * parse, not React hydration, so on pages using the widget (currently
 * `/lp/$slug` and `/testimonials`) the mutation races with hydration —
 * React fires #418 (text mismatch), falls back to #423 (full root
 * re-render), and the main thread blocks long enough for Chrome to show
 * the "Page Unresponsive" modal.
 *
 * The widget container `<div class="elfsight-app-...">` is kept in the
 * markup so the SSR/CSR React trees remain identical. The script is
 * loaded later by `scripts/global.js` on the `window.load` event, at
 * which point Elfsight injects the widget into the already-hydrated
 * container.
 *
 * Idempotent: detects whether the Elfsight script tag is already absent.
 *
 * Patches:
 *   - `.webstudio/data.json` (every `"value":` field of an HtmlEmbed
 *     containing the platform.js URL — there can be more than one)
 *   - every `app/__generated__/*.tsx` file containing an HtmlEmbed
 *     `code={...}` with the platform.js URL
 */

const fs = require('fs');
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const generatedDir = path.join(__dirname, '..', 'app', '__generated__');

// Exact forms emitted by Webstudio. The HTML form is what lives inside
// .webstudio/data.json's JSON-stringified `"value":` props; the TSX form
// is the equivalent JSX-string-literal escaping (same encoding).
const HTML_PATTERN =
  '<script src=\\"https://static.elfsight.com/platform/platform.js\\" data-use-service-core defer></script>\\n';
const TSX_PATTERN = HTML_PATTERN; // identical encoding in both contexts

let patched = 0;

const stripPattern = (content) => {
  if (!content.includes(HTML_PATTERN)) return null;
  return content.split(HTML_PATTERN).join('');
};

// --- data.json (raw bytes — the pattern appears already-escaped) ---
if (fs.existsSync(dataJsonPath)) {
  const before = fs.readFileSync(dataJsonPath, 'utf8');
  const after = stripPattern(before);
  if (after === null) {
    console.log('  · data.json: Elfsight script already absent, skipping');
  } else {
    fs.writeFileSync(dataJsonPath, after);
    const removed = (before.length - after.length) / HTML_PATTERN.length;
    console.log(`  ✓ data.json: removed Elfsight <script> (${Math.round(removed)} occurrence(s))`);
    patched++;
  }
}

// --- every generated *.tsx file containing the pattern ---
for (const name of fs.readdirSync(generatedDir)) {
  if (!name.endsWith('.tsx')) continue;
  const filePath = path.join(generatedDir, name);
  const before = fs.readFileSync(filePath, 'utf8');
  if (!before.includes(HTML_PATTERN)) continue;
  const after = stripPattern(before);
  fs.writeFileSync(filePath, after);
  console.log(`  ✓ ${name}: removed Elfsight <script>`);
  patched++;
}

console.log(`\nElfsight defer: ${patched} file(s) patched`);
