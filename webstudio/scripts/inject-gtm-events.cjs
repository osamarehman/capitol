#!/usr/bin/env node
/**
 * Post-sync patch: rewrite the DUAL TRACKING <script> to v4.
 *
 * Persistence: wired into deploy.sh (Step 4d2a). Every deploy runs
 * `webstudio sync`, which overwrites .webstudio/data.json and the
 * generated _index.tsx from the Webstudio cloud (reverting to the
 * pristine authored CustomCode); this script then re-applies v4 on top,
 * so the changes survive every sync/deploy.
 *
 * What v4 does vs. the synced Webstudio CustomCode:
 *
 *   1. LEAD TRACKING WAS DEAD. The old block did:
 *          const forms = document.querySelectorAll('form');
 *          if (!forms.length) return;            // <-- always bailed
 *      That IIFE runs inline in <head>, ~91 KB before any <form> exists in
 *      the DOM, so the snapshot was empty and no submit listener ever
 *      attached. The Webstudio webhook form also never navigates to
 *      /quote-requested (it shows an inline data-state="success"), so the
 *      thank-you-page conversion block never reached either. Net result:
 *      the lead event never fired for any CTA / footer form.
 *
 *      v4 replaces it with document-level event delegation + a per-form
 *      MutationObserver on data-state, so the lead fires on CONFIRMED
 *      success, on every page, including forms rendered after hydration
 *      and across client-side navigation. The legacy sessionStorage +
 *      /quote-requested path is kept as a fallback for any redirecting form.
 *
 *   2. LEAD EVENT RENAMED to `cta_lead` (GA4 + GTM dataLayer). FB stays
 *      `fbq('track','Lead')` (a Facebook standard event).
 *
 *   3. CONTACT EVENTS REMOVED. CallRail owns phone-call tracking and the
 *      manual tel:/mailto:/sms: handlers double-counted. The entire
 *      CONTACT EVENTS section (incl. the phone `google_ads_call` Google
 *      Ads conversion) is dropped.
 *
 *   4. GTM dataLayer BRIDGE. The remaining custom events (cta_lead,
 *      button_click, internal_link_click) are pushed to window.dataLayer
 *      as { event: '<name>', ... } so the GTM container (GTM-N5QXSSGM)
 *      can fire tags via Custom Event triggers — alongside the existing
 *      direct gtag()/fbq() calls. gtag() pushes an arguments object to
 *      the same array; GTM only reads {event:...} objects, so they coexist.
 *
 * Idempotent: guarded by the "DUAL TRACKING SCRIPT v4" marker. The match
 * regex anchors on the generic "// ========= DUAL TRACKING SCRIPT" header
 * so it cleanly replaces an earlier v1/v3 block too.
 *
 * Patches:
 *   - .webstudio/data.json            (CustomCode source of truth, raw HTML)
 *   - app/__generated__/_index.tsx    (built output, escaped TSX string)
 */

const fs = require('fs');
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');

const V4_MARKER = 'DUAL TRACKING SCRIPT v4';

// ---------------------------------------------------------------------------
// The canonical v4 tracking script (raw JS, no <script> wrapper).
// Behaviour preserved: Facebook-user detection, GA4 page_view dedup (config
// auto-fires it), FB ViewContent/PageView, button_click, FB-only browsing.
// Changed: lead event -> cta_lead; all contact events removed; wsDL() bridge.
// ---------------------------------------------------------------------------
const NEW_JS = `
// ========= DUAL TRACKING SCRIPT v4 (Facebook Pixel + GA4 + GTM dataLayer) =========
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
// (GTM-N5QXSSGM) can fire tags via "Custom Event" triggers. gtag() pushes
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

  gtag('event', 'cta_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  fbq('track', 'Lead', {
    content_name: formName,
    content_category: 'quote_request'
  });
  wsDL('cta_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  console.log('✓ GA4: cta_lead fired (form: ' + formName + ', source: ' + sourcePage + ')');
})();

// ========= CONTACT EVENTS =========
// Intentionally removed in v4 — CallRail owns phone-call tracking
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

  gtag('event', 'cta_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  fbq('track', 'Lead', {
    content_name: formName,
    content_category: 'quote_request'
  });
  wsDL('cta_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: trafficSource
  });
  console.log('✓ Lead fired (cta_lead, form: ' + formName + ', source: ' + sourcePage + ')');
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
// patches transformed its interior (v1/v3/v4). Anchored on the header
// marker and the script's own closer; the body never contains a nested
// </script> or "}.
const HTML_RE =
  /<script[^>]*>\s*\/\/ ========= DUAL TRACKING SCRIPT[\s\S]*?<\/script>/;
const TSX_RE =
  /<Script[^>]*>\{"\\n\/\/ ========= DUAL TRACKING SCRIPT[\s\S]*?"\}<\/Script>/;

const NEW_HTML = `<script data-cfasync="false">${NEW_JS}</script>`;
const NEW_TSX = `<Script data-cfasync={"false"}>{"${toTsxString(NEW_JS)}"}</Script>`;

let patched = 0;

// --- data.json (raw HTML inside JSON string) ---
if (fs.existsSync(dataJsonPath)) {
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  const before = data?.build?.pages?.meta?.code || '';
  if (before.includes(V4_MARKER)) {
    console.log('  · data.json: already v4, skipping');
  } else if (HTML_RE.test(before)) {
    data.build.pages.meta.code = before.replace(HTML_RE, NEW_HTML);
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
    console.log('  ✓ data.json: DUAL TRACKING script upgraded to v4');
    patched++;
  } else {
    console.log('  ✗ data.json: DUAL TRACKING script not found — output shape changed?');
  }
}

// --- _index.tsx (escaped TSX string) ---
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes(V4_MARKER)) {
    console.log('  · _index.tsx: already v4, skipping');
  } else if (TSX_RE.test(content)) {
    fs.writeFileSync(indexPath, content.replace(TSX_RE, NEW_TSX));
    console.log('  ✓ _index.tsx: DUAL TRACKING script upgraded to v4');
    patched++;
  } else {
    console.log('  ✗ _index.tsx: DUAL TRACKING <Script> not found — output shape changed?');
  }
}

console.log(`\nGTM events inject: ${patched} change(s) applied`);
