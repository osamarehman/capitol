#!/usr/bin/env node
/**
 * Post-sync patch: convert Carolina tracking to a SINGLE Google Tag Manager
 * container (GTM-N5QXSSGM) with exactly ONE custom event.
 *
 * What it does (idempotent), to both the shared global CustomCode in
 * `.webstudio/data.json` (raw HTML in build.pages.meta.code) and the built
 * `app/__generated__/_index.tsx` (escaped TSX — the artifact actually shipped):
 *
 *   1. REMOVE both GA4 base tags (gtag.js + gtag('config') for G-839XJ1CRJZ,
 *      authored twice in the Webstudio project).
 *   2. REMOVE the Facebook Pixel base init <script> and its <noscript> img.
 *   3. REPLACE the entire "DUAL TRACKING SCRIPT (Facebook Pixel + GA4)" block
 *      (whether pristine from sync or already wrapped by the old
 *      inject-deploy-no-tracking guard) with a clean GTM-only script:
 *        - loads the GTM container (skipped on /deploy)
 *        - a SINGLE capture-phase `submit` listener that pushes
 *          `generate_lead_ca` to the dataLayer on ANY form submission
 *          (CTA/footer webhook forms, /quote, /lp/*, and the location-page
 *          data-api-endpoint / FORM_API forms — all caught uniformly).
 *
 * The lead listener is PASSIVE: it only reads the form and pushes to
 * dataLayer. It never calls preventDefault and never touches the form's
 * POST to our endpoint, so submission data is undisturbed. Capture phase
 * ensures it runs even though React Router / global.js preventDefault later.
 *
 * Supersedes inject-tracking-fix.cjs + inject-deploy-no-tracking.cjs.
 */

const fs = require('fs');
const path = require('path');

// Carolina's OWN GTM container. Do NOT use MD's (GTM-N5QXSSGM) — loading the
// MD container here makes MD's GA4 (G-EVSBMR91V3) + AdWords + conversions fire
// on improveitcarolina.com and triggers an anomaly warning on the MD container.
const GTM_ID = 'GTM-K45KM3WZ';
const GA4_ID = 'G-839XJ1CRJZ';
const FB_PIXEL_ID = '24499599766321833';
const MARKER = 'CAROLINA GTM TRACKING v1';

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');

// ---------------------------------------------------------------------------
// The clean replacement tracking script (raw JS, no <script> wrapper).
// ---------------------------------------------------------------------------
const NEW_JS = `
// ========= ${MARKER} =========
// Single GTM container (${GTM_ID}). The ONLY custom event is
// generate_lead_ca, pushed to the dataLayer on ANY form submission. No GA4,
// no Facebook Pixel. Passive: never preventDefaults, never touches the
// form's POST to our endpoint.
(function () {
  if (/^\\/deploy(\\/|$)/.test(location.pathname)) { console.log('[deploy] tracking disabled'); return; }

  // --- GTM container loader ---
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');

  // --- single lead event on any form submission ---
  // Capture phase so it runs even when React Router / global.js preventDefault
  // the submit afterwards. The native submit event fires only after the
  // browser's built-in validation passes, so this means a real submission.
  window.dataLayer = window.dataLayer || [];
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.nodeName !== 'FORM') return;
    var formName = form.getAttribute('name') || form.getAttribute('id') ||
                   form.getAttribute('data-name') || form.getAttribute('data-form-name') ||
                   document.title || 'Unknown Form';
    window.dataLayer.push({
      event: 'generate_lead_ca',
      form_name: formName,
      source_page: window.location.pathname
    });
    console.log('✓ GTM dataLayer: generate_lead_ca pushed (form: ' + formName + ')');
  }, true);
})();
`;

// TSX string-literal escaping (matches the other inject-*.cjs scripts).
const toTsxString = (s) =>
  s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"');

const NEW_HTML = `<script data-cfasync="false">${NEW_JS}</script>`;
const NEW_TSX = `<Script data-cfasync={"false"}>{"${toTsxString(NEW_JS)}"}</Script>`;

// ===========================================================================
// data.json transforms — operate on the DECODED meta.code (real newlines).
// ===========================================================================
const ga4SrcHtmlRe =
  new RegExp(`<script[^>]*src="https://www\\.googletagmanager\\.com/gtag/js\\?id=${GA4_ID}"[^>]*></script>`, 'g');
const ga4InlineHtmlRe =
  new RegExp(`<script[^>]*>\\s*window\\.dataLayer = window\\.dataLayer \\|\\| \\[\\];\\s*function gtag\\(\\)\\{dataLayer\\.push\\(arguments\\);\\}\\s*gtag\\('js', new Date\\(\\)\\);\\s*gtag\\('config', '${GA4_ID}'\\);\\s*</script>`, 'g');
const fbBaseHtmlRe =
  new RegExp(`<script>\\s*!function\\(f,b,e,v,n,t,s\\)[\\s\\S]*?fbq\\('init', '${FB_PIXEL_ID}'\\);[\\s\\S]*?</script>`);
const fbNoscriptHtmlRe =
  new RegExp(`<noscript><img height="1" width="1"[\\s\\S]*?facebook\\.com/tr\\?id=${FB_PIXEL_ID}[\\s\\S]*?</noscript>`);
const dualHtmlRe =
  /<script[^>]*>\s*(?:\/\/ TRACKING_DISABLED_DEPLOY[\s\S]*?)?\/\/ ========= DUAL TRACKING SCRIPT \(Facebook Pixel \+ GA4\)[\s\S]*?<\/script>/;

// ===========================================================================
// _index.tsx transforms — operate on the raw escaped-TSX bytes.
// ===========================================================================
const ga4SrcTsxRe =
  new RegExp(`<Script(?: data-cfasync=\\{"false"\\})? src=\\{"https://www\\.googletagmanager\\.com/gtag/js\\?id=${GA4_ID}"\\}></Script>`, 'g');
const ga4InlineTsxRe =
  new RegExp(`<Script(?: data-cfasync=\\{"false"\\})?>\\{"\\\\n  window\\.dataLayer = window\\.dataLayer \\|\\| \\[\\];\\\\n  function gtag\\(\\)\\{dataLayer\\.push\\(arguments\\);\\}\\\\n  gtag\\('js', new Date\\(\\)\\);\\\\n\\\\n  gtag\\('config', '${GA4_ID}'\\);\\\\n"\\}</Script>`, 'g');
const fbBaseTsxRe =
  new RegExp(`<Script[^>]*>\\{"\\\\n!function\\(f,b,e,v,n,t,s\\)[\\s\\S]*?fbq\\('init', '${FB_PIXEL_ID}'\\);[\\s\\S]*?"\\}</Script>`);
const fbNoscriptTsxRe =
  new RegExp(`<noscript><img[^>]*facebook\\.com/tr\\?id=${FB_PIXEL_ID}[\\s\\S]*?</noscript>`);
const dualTsxRe =
  /<Script[^>]*>\{"\\n(?:\/\/ TRACKING_DISABLED_DEPLOY[\s\S]*?)?\/\/ ========= DUAL TRACKING SCRIPT \(Facebook Pixel \+ GA4\)[\s\S]*?"\}<\/Script>/;

let patched = 0;

// --- data.json ---
if (fs.existsSync(dataJsonPath)) {
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  let code = data?.build?.pages?.meta?.code || '';
  const before = code;

  code = code.replace(ga4SrcHtmlRe, '');
  code = code.replace(ga4InlineHtmlRe, '');
  code = code.replace(fbBaseHtmlRe, '');
  code = code.replace(fbNoscriptHtmlRe, '');

  if (code.includes(MARKER)) {
    console.log('  · data.json: GTM tracking already present');
  } else if (dualHtmlRe.test(code)) {
    code = code.replace(dualHtmlRe, NEW_HTML);
    console.log('  ✓ data.json: DUAL TRACKING → GTM-only (generate_lead_ca)');
  } else {
    console.log('  ⚠ data.json: DUAL TRACKING block not found (output shape changed?)');
  }

  if (code !== before) {
    data.build.pages.meta.code = code;
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
    console.log('  ✓ data.json: GA4 + Facebook Pixel removed');
    patched++;
  }
}

// --- _index.tsx ---
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  const before = content;

  content = content.replace(ga4SrcTsxRe, '');
  content = content.replace(ga4InlineTsxRe, '');
  content = content.replace(fbBaseTsxRe, '');
  content = content.replace(fbNoscriptTsxRe, '');

  if (content.includes(MARKER)) {
    console.log('  · _index.tsx: GTM tracking already present');
  } else if (dualTsxRe.test(content)) {
    content = content.replace(dualTsxRe, NEW_TSX);
    console.log('  ✓ _index.tsx: DUAL TRACKING → GTM-only (generate_lead_ca)');
  } else {
    console.log('  ✗ _index.tsx: DUAL TRACKING <Script> not found (output shape changed?)');
  }

  if (content !== before) {
    fs.writeFileSync(indexPath, content);
    console.log('  ✓ _index.tsx: GA4 + Facebook Pixel removed');
    patched++;
  }
}

console.log(`\nGTM inject (Carolina): ${patched} file(s) patched`);
