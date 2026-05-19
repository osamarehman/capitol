#!/usr/bin/env node
/**
 * Post-sync patch: unify ALL form-submission tracking to a single
 * `generate_lead` event (DUAL TRACKING script -> v5) and clean up the
 * page-specific LP tracking so /quote, the CTA/footer form and /lp/*
 * forms all emit exactly one GA4 + one GTM dataLayer + one FB event.
 *
 * Persistence: wired into deploy.sh (Step 4d2a). Every deploy runs
 * `webstudio sync`, which overwrites .webstudio/data.json and the
 * generated *.tsx from the Webstudio cloud (reverting to the pristine
 * authored CustomCode); this script then re-applies v5 on top, so the
 * changes survive every sync/deploy.
 *
 * Three independent, idempotent transforms:
 *
 *   1. GLOBAL DUAL TRACKING SCRIPT -> v5 (shared CustomCode, every page).
 *      - Dead lead handler fixed (delegation + per-form MutationObserver
 *        on data-state="success"; the old querySelectorAll('form')
 *        snapshot ran in <head> before any form existed and never
 *        attached).
 *      - Lead event is `generate_lead` (GA4 + GTM dataLayer). FB stays
 *        fbq('track','Lead').
 *      - Contact events removed (CallRail owns phone-call tracking).
 *      - GTM dataLayer bridge: generate_lead, button_click,
 *        internal_link_click pushed as {event:...}.
 *      Covers the CTA/footer form and the /quote page form (these submit
 *      via Webstudio's React Router fetcher -> data-state="success").
 *
 *   2. LP SUBMISSION ENGINE event rename. The /lp/$slug page has an
 *      HtmlEmbed that intercepts [data-api-endpoint] submits,
 *      preventDefault()s Webstudio's fetcher and POSTs to a custom API
 *      (so data-state="success" is never set and the global handler
 *      can't fire there). It already pushes a `generate_lead` dataLayer
 *      event; we only rename its GA4 `google_ads_lead` -> `generate_lead`
 *      so the GA4 event name matches everywhere (the Google Ads
 *      conversion is repointed to the generate_lead dataLayer event in
 *      the GTM container). Submission logic is left untouched.
 *
 *   3. REDUNDANT `generate_cta_lead` EMBED neutralized. A pure-tracking
 *      HtmlEmbed (gtag('event','generate_cta_lead') + fbq Lead on submit)
 *      is duplicated across several pages; it double-fires the lead under
 *      a different name. Its inline <script> body is replaced with an
 *      inert comment (the HtmlEmbed element is kept so the SSR/CSR React
 *      trees stay identical).
 *
 * Patches `.webstudio/data.json` (raw, already-escaped — identical
 * encoding to the TSX string literals) and every `app/__generated__/*.tsx`.
 */

const fs = require('fs');
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const generatedDir = path.join(__dirname, '..', 'app', '__generated__');
const indexPath = path.join(generatedDir, '_index.tsx');

const V6_MARKER = 'DUAL TRACKING SCRIPT v6';

// ---------------------------------------------------------------------------
// 1. The canonical v5 global tracking script (raw JS, no <script> wrapper).
// Behaviour preserved from v4: FB-user detection, GA4 page_view dedup, FB
// ViewContent/PageView, button_click, FB-only browsing, fixed delegated
// lead handler. Changed: cta_lead -> generate_lead.
// ---------------------------------------------------------------------------
const NEW_JS = `
// ========= DUAL TRACKING SCRIPT v6 (Facebook Pixel + GA4 + GTM dataLayer) =========
// Place this on ALL pages of your website

// ========= HELPERS =========

function safeAddClickEvent(selector, handler) {
  // Use event delegation on document to catch elements added after script runs
  document.addEventListener('click', function (e) {
    const el = e.target.closest(selector);
    if (!el) return;
    handler(e, el);
  });
}

function checkAndMarkFacebookUser() {
  const urlParams = new URLSearchParams(window.location.search);
  const hasFbclid = urlParams.has('fbclid');

  // If fbclid is present, mark this user as from Facebook
  if (hasFbclid) {
    sessionStorage.setItem('fromFacebookAd', 'true');
    sessionStorage.setItem('fbAdTimestamp', Date.now());
  }

  // Return whether this is a Facebook user
  return sessionStorage.getItem('fromFacebookAd') === 'true';
}

// ========= GTM dataLayer BRIDGE =========
// Mirror every custom event into the GTM dataLayer so the GTM container
// can fire tags via "Custom Event" triggers. (Do NOT write the literal
// container ID here — inject-gtm.cjs runs after this and would treat a
// plain-text mention as "already injected" and skip the real loader.)
// gtag() pushes
// an arguments object to the same array; GTM only reads {event:...} objects
// so the two coexist without conflict.
window.dataLayer = window.dataLayer || [];
function wsDL(eventName, params) {
  try {
    var payload = { event: eventName };
    if (params) { for (var k in params) { if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k]; } }
    window.dataLayer.push(payload);
    console.log('✓ GTM dataLayer: ' + eventName + ' pushed');
  } catch (e) {}
}

// ========= INITIALIZE =========

const isFromFacebook = checkAndMarkFacebookUser();

// ========= PAGE VIEW EVENTS =========
// NOTE: GA4 page_view is auto-fired by gtag('config', ...) — do NOT fire manually
// to avoid duplicate events. Only Facebook needs explicit page view tracking.

if (isFromFacebook) {
  fbq('track', 'ViewContent');
  console.log('✓ FB: ViewContent fired');
} else {
  fbq('track', 'PageView');
  console.log('✓ FB: PageView fired');
}

// ========= THANK-YOU / CONVERSION EVENT (legacy redirect fallback) =========
// Only fires if a form actually navigated to /quote-requested with the
// sessionStorage flag set. Inline webhook forms fire via wsFireLead() below
// instead (which clears these keys), so this never double-counts.

(function () {
  if (window.location.pathname !== '/quote-requested') return;
  if (sessionStorage.getItem('leadSubmitted') !== 'true') return;

  var formName = sessionStorage.getItem('leadFormName') || 'Unknown Form';
  var sourcePage = sessionStorage.getItem('leadSourcePage') || '/';

  sessionStorage.removeItem('leadSubmitted');
  sessionStorage.removeItem('leadFormName');
  sessionStorage.removeItem('leadTimestamp');
  sessionStorage.removeItem('leadSourcePage');

  var trafficSource = isFromFacebook ? 'facebook_ad' : 'organic';

  gtag('event', 'generate_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  fbq('track', 'Lead', {
    content_name: formName,
    content_category: 'quote_request'
  });
  wsDL('generate_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  console.log('✓ GA4: generate_lead fired (form: ' + formName + ', source: ' + sourcePage + ')');
})();

// ========= CONTACT EVENTS =========
// Intentionally removed in v4+ — CallRail owns phone-call tracking
// (and feeds Google Ads), so the manual tel:/mailto:/sms: handlers and
// the phone google_ads_call event were double-counting.

// ========= BUTTON CLICK EVENT (ALL USERS) =========

// Regular button clicks (not links, not submit buttons)
safeAddClickEvent('button:not([type="submit"]), .w-button:not([type="submit"])', function (e, el) {
  // Exclude if it's inside a form (handled by form submit)
  if (el.closest('form')) return;

  const buttonText = el.textContent.trim() || el.value || 'Unknown';

  // Facebook
  fbq('trackCustom', 'ButtonClick', {
    button_text: buttonText
  });
  console.log('✓ FB: ButtonClick fired (' + buttonText + ')');

  // GA4
  gtag('event', 'button_click', {
    button_text: buttonText,
    button_location: window.location.pathname
  });
  wsDL('button_click', {
    button_text: buttonText,
    button_location: window.location.pathname
  });
  console.log('✓ GA4: button_click fired (' + buttonText + ')');
});

// ========= LEAD EVENT (delegated submit -> confirmed success) =========
// Webstudio webhook forms submit via a React Router fetcher and flip
// data-state to "success" inline (no navigation). The old
// querySelectorAll('form') snapshot ran in <head> before any form existed
// and never attached. Delegation + a per-form MutationObserver on
// data-state makes the lead fire on CONFIRMED success, on every page,
// including forms rendered after hydration / client-side navigation.
// (LP /lp/* forms submit via a custom [data-api-endpoint] handler that
// preventDefaults Webstudio's fetcher, so data-state never flips there —
// those fire generate_lead from their own success path instead.)

function wsLeadName(form) {
  return form.getAttribute('name') ||
         form.getAttribute('id') ||
         form.getAttribute('data-name') ||
         document.title ||
         'Unknown Form';
}

function wsFireLead(form) {
  if (form.__wsLeadFired) return;
  form.__wsLeadFired = true;

  var formName = wsLeadName(form);
  var sourcePage = window.location.pathname;
  var trafficSource = isFromFacebook ? 'facebook_ad' : 'organic';

  // Clear the legacy redirect-path keys so the /quote-requested fallback
  // can't also count this same submission.
  sessionStorage.removeItem('leadSubmitted');
  sessionStorage.removeItem('leadFormName');
  sessionStorage.removeItem('leadTimestamp');
  sessionStorage.removeItem('leadSourcePage');

  gtag('event', 'generate_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  fbq('track', 'Lead', {
    content_name: formName,
    content_category: 'quote_request'
  });
  wsDL('generate_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  console.log('✓ Lead fired (generate_lead, form: ' + formName + ', source: ' + sourcePage + ')');
}

document.addEventListener('submit', function (e) {
  var form = e.target;
  if (!form || form.nodeName !== 'FORM') return;
  if (!form.classList || !form.classList.contains('w-webhook-form')) return;

  // Legacy fallback: store for the /quote-requested redirect path. Harmless
  // for inline forms — wsFireLead() clears these once success is confirmed.
  sessionStorage.setItem('leadSubmitted', 'true');
  sessionStorage.setItem('leadFormName', wsLeadName(form));
  sessionStorage.setItem('leadTimestamp', Date.now());
  sessionStorage.setItem('leadSourcePage', window.location.pathname);

  // Already succeeded (edge: re-submit of an already-success form)?
  if (form.getAttribute('data-state') === 'success') { wsFireLead(form); return; }

  // Attach the success observer once per form element.
  if (form.__wsLeadObserved) return;
  form.__wsLeadObserved = true;
  var obs = new MutationObserver(function () {
    var st = form.getAttribute('data-state');
    if (st === 'success') {
      wsFireLead(form);
    } else if (st === 'initial' || st === 'error') {
      // genuine new attempt after an error can fire again
      form.__wsLeadFired = false;
    }
  });
  obs.observe(form, { attributes: true, attributeFilter: ['data-state'] });
}, true);

// ========= BROWSING EVENT (FB USERS ONLY) =========

// Track internal link clicks for Facebook users
if (isFromFacebook) {
  safeAddClickEvent('a[href^="/"], a[href^="' + window.location.origin + '"]', function (e, el) {
    const href = el.getAttribute('href');

    // Exclude anchors, tel, mailto, sms links
    if (!href ||
        href.startsWith('/#') ||
        href.startsWith('#') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:') ||
        href.startsWith('sms:')) {
      return;
    }

    // Facebook
    fbq('trackCustom', 'Browsing', {
      destination_url: href
    });
    console.log('✓ FB: Browsing fired (clicked to: ' + href + ')');

    // GA4
    gtag('event', 'internal_link_click', {
      link_url: href,
      link_domain: window.location.hostname,
      traffic_source: 'facebook_ad'
    });
    wsDL('internal_link_click', {
      link_url: href,
      link_domain: window.location.hostname,
      traffic_source: 'facebook_ad'
    });
    console.log('✓ GA4: internal_link_click fired (clicked to: ' + href + ')');
  });
}
`;

// TSX string-literal escaping (matches inject-tracking-fix.cjs).
const toTsxString = (s) =>
  s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"');

// Match the whole DUAL TRACKING inline script regardless of which prior
// patch transformed its interior (v1/v4/v5). Anchored on the header
// marker and the script's own closer; the body never contains a nested
// </script> or "}.
const HTML_RE =
  /<script[^>]*>\s*\/\/ ========= DUAL TRACKING SCRIPT[\s\S]*?<\/script>/;
const TSX_RE =
  /<Script[^>]*>\{"\\n\/\/ ========= DUAL TRACKING SCRIPT[\s\S]*?"\}<\/Script>/;

const NEW_HTML = `<script data-cfasync="false">${NEW_JS}</script>`;
const NEW_TSX = `<Script data-cfasync={"false"}>{"${toTsxString(NEW_JS)}"}</Script>`;

// --- transform 2: LP submission engine GA4 event rename ---
// `google_ads_lead` only appears in the LP [data-api-endpoint] handler
// (gtag event name + its console.log). Bare-token replace is safe and
// byte-identical in data.json and the TSX (no quotes/newlines in token).
const renameGoogleAdsLead = (s) =>
  s.includes('google_ads_lead') ? s.split('google_ads_lead').join('generate_lead') : null;

// --- transform 3: neutralize the redundant generate_cta_lead embed ---
// Pure-tracking HtmlEmbed: <script> ... gtag('event','generate_cta_lead')
// ... fbq Lead ... </script>. The body has no '<' until </script>, and
// generate_cta_lead is unique to this embed, so this can't span into
// another script. Replacement carries no generate_cta_lead, so re-runs
// are no-ops (idempotent). Safe in both JSON-string and TSX-string
// contexts (no ", \\, or newline introduced).
// Guard on the unique token (not a stateful /g regex .test()); the
// replacement must NOT contain `generate_cta_lead` or re-runs would
// re-match it (breaking idempotency).
const CTA_LEAD_REPLACEMENT =
  '<script>/* removed redundant duplicate lead embed; unified to a single generate_lead event */</script>';
const neutralizeCtaLead = (s) =>
  s.includes('generate_cta_lead')
    ? s.replace(/<script>[^<]*?generate_cta_lead[^<]*?<\/script>/g, CTA_LEAD_REPLACEMENT)
    : null;

let patched = 0;

// === 1. Global DUAL TRACKING script -> v5 ===

// data.json (raw HTML inside JSON string)
if (fs.existsSync(dataJsonPath)) {
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  const before = data?.build?.pages?.meta?.code || '';
  if (before.includes(V6_MARKER)) {
    console.log('  · data.json: DUAL TRACKING already v6, skipping');
  } else if (HTML_RE.test(before)) {
    data.build.pages.meta.code = before.replace(HTML_RE, NEW_HTML);
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
    console.log('  ✓ data.json: DUAL TRACKING script upgraded to v6');
    patched++;
  } else {
    console.log('  ✗ data.json: DUAL TRACKING script not found — output shape changed?');
  }
}

// _index.tsx (escaped TSX string)
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes(V6_MARKER)) {
    console.log('  · _index.tsx: DUAL TRACKING already v6, skipping');
  } else if (TSX_RE.test(content)) {
    fs.writeFileSync(indexPath, content.replace(TSX_RE, NEW_TSX));
    console.log('  ✓ _index.tsx: DUAL TRACKING script upgraded to v6');
    patched++;
  } else {
    console.log('  ✗ _index.tsx: DUAL TRACKING <Script> not found — output shape changed?');
  }
}

// === 2 + 3. LP rename + redundant-embed neutralization ===
// Applied to data.json (raw bytes) and every generated *.tsx.

const applyLpFixes = (label, filePath, readWhole) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const a = renameGoogleAdsLead(content);
  if (a !== null) { content = a; changed = true; console.log(`  ✓ ${label}: google_ads_lead → generate_lead`); }

  const b = neutralizeCtaLead(content);
  if (b !== null) { content = b; changed = true; console.log(`  ✓ ${label}: neutralized redundant generate_cta_lead embed`); }

  if (changed) { fs.writeFileSync(filePath, content); patched++; }
};

applyLpFixes('data.json', dataJsonPath);
for (const name of fs.readdirSync(generatedDir)) {
  if (!name.endsWith('.tsx')) continue;
  applyLpFixes(name, path.join(generatedDir, name));
}

console.log(`\nGTM events inject (v6): ${patched} change(s) applied`);
