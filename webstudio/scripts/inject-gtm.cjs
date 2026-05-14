#!/usr/bin/env node
/**
 * Post-sync patch: Inject Google Tag Manager (GTM-N5QXSSGM) into CustomCode.
 *
 * CustomCode is shared across every page via app/root.tsx, so the script tag
 * loads on every route. A runtime path check skips loading on /deploy.
 *
 * Idempotent — guarded by presence of the GTM ID in the target file.
 *
 * Patches:
 *   - .webstudio/data.json (CustomCode source of truth, raw HTML)
 *   - app/__generated__/_index.tsx (built output, escaped form)
 */

const fs = require('fs');
const path = require('path');

const GTM_ID = 'GTM-N5QXSSGM';

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');

// HTML form (stored in data.json's build.pages.meta.code).
// Wrapped in a path check so /deploy never loads GTM.
const GTM_SNIPPET_HTML =
  `<!-- Google Tag Manager -->\n` +
  `<script>if(!/^\\/deploy(\\/|$)/.test(location.pathname)){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n` +
  `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n` +
  `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n` +
  `'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n` +
  `})(window,document,'script','dataLayer','${GTM_ID}');}</script>\n` +
  `<!-- End Google Tag Manager -->\n`;

let patched = 0;

// --- data.json (raw HTML inside JSON string) ---
if (fs.existsSync(dataJsonPath)) {
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  const before = data?.build?.pages?.meta?.code || '';
  if (!before.includes(GTM_ID)) {
    // Prepend so GTM loads as early as possible in <head>.
    data.build.pages.meta.code = GTM_SNIPPET_HTML + before;
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
    console.log('  ✓ data.json: injected GTM ' + GTM_ID);
    patched++;
  } else {
    console.log('  · data.json: GTM already present, skipping');
  }
}

// --- _index.tsx (escaped TSX) ---
// In the generated CustomCode, inline scripts render as:
//   <Script>{"...JS source with \\n line breaks..."}</Script>
// We emit the same shape and inject it right after `return (<>` so it appears
// first inside the fragment, matching the data.json ordering.
const toTsxString = (s) =>
  s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"');

const GTM_INNER_JS =
  `if(!/^\\/deploy(\\/|$)/.test(location.pathname)){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n` +
  `new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n` +
  `j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n` +
  `'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n` +
  `})(window,document,'script','dataLayer','${GTM_ID}');}`;

const GTM_TSX_SNIPPET =
  `<Script data-cfasync={"false"}>{"` + toTsxString(GTM_INNER_JS) + `"}</Script>`;

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  if (!content.includes(GTM_ID)) {
    // Inject right after the `return (<>` of CustomCode so the script is the
    // first child of the fragment, ensuring GTM initializes as early as the
    // other head-level scripts.
    const marker = 'export const CustomCode = () => {\n              return (<>';
    if (content.includes(marker)) {
      content = content.replace(marker, marker + GTM_TSX_SNIPPET);
      fs.writeFileSync(indexPath, content);
      console.log('  ✓ _index.tsx: injected GTM ' + GTM_ID);
      patched++;
    } else {
      console.log(
        '  ✗ _index.tsx: CustomCode marker not found — webstudio output shape changed?'
      );
    }
  } else {
    console.log('  · _index.tsx: GTM already present, skipping');
  }
}

console.log(`\nGTM inject: ${patched} change(s) applied`);
