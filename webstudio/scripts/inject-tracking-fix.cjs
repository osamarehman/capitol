#!/usr/bin/env node
/**
 * Post-sync patch: Fix Webstudio CustomCode tracking.
 *
 * Webstudio's UI editor sometimes adds trailing whitespace on blank lines
 * (`\n  \n` instead of `\n\n`), so all matching here uses regex patterns
 * tolerant to whitespace variations rather than exact string matches.
 *
 * Fixes applied (idempotent — each guarded by content check):
 *   1. Remove unused G-NRVKK7VK0R GA4 property tag
 *   2. Add data-cfasync="false" to GA4 scripts (Cloudflare Rocket Loader safety)
 *   3. Replace duplicate-causing manual page_view + add generate_lead conversion
 *   4. Switch safeAddClickEvent to event delegation (handles late-rendered DOM)
 *   5. Add google_ads_call event to phone click handler (with debounce)
 *   6. Fix /quote-requested page title
 *
 * Patches both:
 *   - .webstudio/data.json (CustomCode source of truth)
 *   - app/__generated__/_index.tsx (built output, escaped \n)
 *   - app/__generated__/[quote-requested]._index.server.tsx (page title)
 */

const fs = require('fs');
const path = require('path');

const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');
const serverPath = path.join(__dirname, '..', 'app', '__generated__', '[quote-requested]._index.server.tsx');

let patched = 0;

// Apply replacement to both raw HTML (data.json) and escaped form (_index.tsx).
// `escape` is true when targeting the TSX file where `\n` becomes `\\n`.
function applyToCode(filePath, transformer, isJsonNested) {
  if (!fs.existsSync(filePath)) return false;
  if (isJsonNested) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const before = data?.build?.pages?.meta?.code || '';
    const after = transformer(before);
    if (after === before) return false;
    data.build.pages.meta.code = after;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } else {
    const before = fs.readFileSync(filePath, 'utf8');
    const after = transformer(before);
    if (after === before) return false;
    fs.writeFileSync(filePath, after);
    return true;
  }
}

// --- Fix 1: Remove G-NRVKK7VK0R tag (HTML form) ---
// Two passes: (1) remove any inline <script>...gtag('config', 'G-NRVKK7VK0R');...</script>
// (2) remove the loader <script src="...?id=G-NRVKK7VK0R"></script>
// Each pass works even if the other has already run.
const removeG_NRVKK_html = (code) => {
  code = code.replace(
    /<script[^>]*>\s*(?:window\.dataLayer[\s\S]*?)?gtag\('config', 'G-NRVKK7VK0R'\)[\s\S]*?<\/script>\s*/g,
    ''
  );
  code = code.replace(
    /<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-NRVKK7VK0R"[^>]*><\/script>\s*/g,
    ''
  );
  return code;
};

// --- Fix 1b: Remove G-NRVKK7VK0R tag (TSX form, with \n escapes) ---
const removeG_NRVKK_tsx = (content) => {
  // Inline config block
  content = content.replace(
    /<Script[^>]*>\{"[^"]*gtag\('config', 'G-NRVKK7VK0R'\)[^"]*"\}<\/Script>(\{"\s*\\n"\})?\s*/g,
    ''
  );
  // Loader script
  content = content.replace(
    /<Script[^>]*src=\{"https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-NRVKK7VK0R"\}[^>]*><\/Script>(\{"\s*\\n"\})?\s*/g,
    ''
  );
  return content;
};

// --- Fix 2: Add data-cfasync="false" to GA4 scripts ---
const addCfasyncHtml = (code) => {
  // Loader script
  code = code.replace(
    /<script src="(https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-EVSBMR91V3)">/g,
    '<script data-cfasync="false" src="$1">'
  );
  // Inline config script — match only the EVSBMR config block
  code = code.replace(
    /<script>(\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\)\{dataLayer\.push\(arguments\);\}\s*gtag\('js', new Date\(\)\);\s*gtag\('config', 'G-EVSBMR91V3'\);\s*)<\/script>/g,
    '<script data-cfasync="false">$1</script>'
  );
  return code;
};

const addCfasyncTsx = (content) => {
  content = content.replace(
    /<Script src=\{"(https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-EVSBMR91V3)"\}>/g,
    '<Script data-cfasync={"false"} src={"$1"}>'
  );
  // Inline config — only patch the EVSBMR one
  content = content.replace(
    /<Script>(\{"[^"]*gtag\('config', 'G-EVSBMR91V3'\);[^"]*"\})<\/Script>/g,
    '<Script data-cfasync={"false"}>$1</Script>'
  );
  return content;
};

// --- Fix 3: Replace duplicate page_view block + add generate_lead ---
const NEW_PAGEVIEW_HTML = `// ========= PAGE VIEW EVENTS =========
// NOTE: GA4 page_view is auto-fired by gtag('config', ...) — do NOT fire manually
// to avoid duplicate events. Only Facebook needs explicit page view tracking.

if (isFromFacebook) {
  fbq('track', 'ViewContent');
  console.log('✓ FB: ViewContent fired');
} else {
  fbq('track', 'PageView');
  console.log('✓ FB: PageView fired');
}

// ========= THANK-YOU / CONVERSION EVENT (deduplicated) =========

(function () {
  if (window.location.pathname !== '/quote-requested') return;
  if (sessionStorage.getItem('leadSubmitted') !== 'true') return;

  var formName = sessionStorage.getItem('leadFormName') || 'Unknown Form';
  var sourcePage = sessionStorage.getItem('leadSourcePage') || '/';

  sessionStorage.removeItem('leadSubmitted');
  sessionStorage.removeItem('leadFormName');
  sessionStorage.removeItem('leadTimestamp');
  sessionStorage.removeItem('leadSourcePage');

  gtag('event', 'generate_lead', {
    form_name: formName,
    source_page: sourcePage,
    traffic_source: isFromFacebook ? 'facebook_ad' : 'organic'
  });
  console.log('✓ GA4: generate_lead fired (form: ' + formName + ', source: ' + sourcePage + ')');

  fbq('track', 'Lead', {
    content_name: formName,
    content_category: 'quote_request'
  });
  console.log('✓ FB: Lead fired (form: ' + formName + ')');
})();`;

// Match the entire OLD page view block via regex (whitespace-tolerant).
// Matches from "// ========= PAGE VIEW EVENTS =========" up to (but not including)
// "// ========= CONTACT EVENTS"
const OLD_PAGEVIEW_RE = /\/\/ ========= PAGE VIEW EVENTS =========\s*if \(isFromFacebook\) \{[\s\S]*?gtag\('event', 'page_view'[\s\S]*?\}\s*(?=\/\/ ========= CONTACT EVENTS)/;

const fixPageviewHtml = (code) => {
  if (code.includes('THANK-YOU / CONVERSION EVENT')) return code;
  return code.replace(OLD_PAGEVIEW_RE, NEW_PAGEVIEW_HTML + '\n\n');
};

// Same regex against the TSX, where every `\n` is literal `\\n` and `'` is escaped
const OLD_PAGEVIEW_TSX_RE = /\/\/ ========= PAGE VIEW EVENTS =========\\n[\s\S]*?gtag\('event', 'page_view'[\s\S]*?\}\\n(?=\\n\/\/ ========= CONTACT EVENTS)/;

// In TSX string literals (wrapped in "..."), \n becomes \\n and " becomes \"
const toTsxString = (s) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"');

const NEW_PAGEVIEW_TSX = toTsxString(NEW_PAGEVIEW_HTML);

const fixPageviewTsx = (content) => {
  if (content.includes('THANK-YOU / CONVERSION EVENT')) return content;
  return content.replace(OLD_PAGEVIEW_TSX_RE, NEW_PAGEVIEW_TSX + '\\n\\n');
};

// --- Fix 4: Switch safeAddClickEvent to event delegation ---
const NEW_SAFE_CLICK_HTML = `function safeAddClickEvent(selector, handler) {
  // Use event delegation on document to catch elements added after script runs
  document.addEventListener('click', function (e) {
    const el = e.target.closest(selector);
    if (!el) return;
    handler(e, el);
  });
}`;

const OLD_SAFE_CLICK_RE = /function safeAddClickEvent\(selector, handler\) \{\s*const els = document\.querySelectorAll\(selector\);\s*if \(!els \|\| !els\.length\) return;\s*els\.forEach\(function \(el\) \{\s*el\.addEventListener\('click', function \(e\) \{\s*handler\(e, el\);\s*\}\);\s*\}\);\s*\}/;

const fixSafeClickHtml = (code) => {
  if (code.includes('e.target.closest(selector)')) return code;
  return code.replace(OLD_SAFE_CLICK_RE, NEW_SAFE_CLICK_HTML);
};

const NEW_SAFE_CLICK_TSX = toTsxString(NEW_SAFE_CLICK_HTML);

const OLD_SAFE_CLICK_TSX_RE = /function safeAddClickEvent\(selector, handler\) \{\\n  const els = document\.querySelectorAll\(selector\);\\n  if \(!els \|\| !els\.length\) return;\\n[\s\S]*?\}\);\\n  \}\);\\n\}/;

const fixSafeClickTsx = (content) => {
  if (content.includes('e.target.closest(selector)')) return content;
  return content.replace(OLD_SAFE_CLICK_TSX_RE, NEW_SAFE_CLICK_TSX);
};

// --- Fix 5: Phone click — add google_ads_call + debounce ---
const NEW_PHONE_HTML = `// Phone/Call button clicks (debounced: fires once per page load)
var _phoneCallFired = false;
safeAddClickEvent('a[href^="tel:"]', function (e, el) {
  const phoneHref = el.getAttribute('href');
  const phoneNumber = phoneHref.replace('tel:', '');

  if (_phoneCallFired) {
    console.log('⏭ Phone click already tracked this page, skipping');
    return;
  }
  _phoneCallFired = true;

  fbq('track', 'Contact', {
    contact_channel: 'phone'
  });
  console.log('✓ FB: Contact fired (phone)');

  gtag('event', 'contact', {
    method: 'phone',
    phone_number: phoneNumber
  });

  gtag('event', 'google_ads_call', {
    event_category: 'number',
    event_label: phoneHref
  });
  console.log('✓ GA4: phone click fired (' + phoneHref + ')');
});`;

const OLD_PHONE_RE = /\/\/ Phone\/Call button clicks\s*safeAddClickEvent\('a\[href\^="tel:"\]', function \(e, el\) \{[\s\S]*?console\.log\('✓ GA4: contact fired \(phone\)'\);\s*\}\);/;

const fixPhoneHtml = (code) => {
  if (code.includes('google_ads_call')) return code;
  return code.replace(OLD_PHONE_RE, NEW_PHONE_HTML);
};

const NEW_PHONE_TSX = toTsxString(NEW_PHONE_HTML);

const OLD_PHONE_TSX_RE = /\/\/ Phone\/Call button clicks\\nsafeAddClickEvent\('a\[href\^=\\"tel:\\"\]', function \(e, el\) \{\\n[\s\S]*?console\.log\('✓ GA4: contact fired \(phone\)'\);\\n\}\);/;

const fixPhoneTsx = (content) => {
  if (content.includes('google_ads_call')) return content;
  return content.replace(OLD_PHONE_TSX_RE, NEW_PHONE_TSX);
};

// --- Fix: Disable site GA4 tag (G-EVSBMR91V3) — GA4 is now installed via GTM ---
// Drop the gtag.js loader + the gtag('config','G-EVSBMR91V3') call so the page
// no longer boots its own GA4 stream (which double-counted page_view/events
// against the GTM-managed GA4). KEEP `window.dataLayer`, `function gtag(){…}`
// and `gtag('js', …)` so existing gtag('event', …) calls still dataLayer.push
// for GTM Custom Event triggers. Idempotent: the comment replacement means the
// config regex can't re-match on a second run.
const disableGA4Html = (code) => {
  code = code.replace(
    /<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-EVSBMR91V3"[^>]*><\/script>\s*/g,
    ''
  );
  code = code.replace(
    /gtag\('config', 'G-EVSBMR91V3'\);?/g,
    "/* GA4 (G-EVSBMR91V3) disabled — configured via GTM */"
  );
  return code;
};
const disableGA4Tsx = (content) => {
  content = content.replace(
    /<Script[^>]*src=\{"https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-EVSBMR91V3"\}[^>]*><\/Script>(\{"\s*\\n"\})?\s*/g,
    ''
  );
  content = content.replace(
    /gtag\('config', 'G-EVSBMR91V3'\);?/g,
    "/* GA4 (G-EVSBMR91V3) disabled — configured via GTM */"
  );
  return content;
};

// --- Apply all fixes ---

const fixes = [
  ['data.json: removed G-NRVKK7VK0R', () => applyToCode(dataJsonPath, removeG_NRVKK_html, true)],
  ['data.json: added data-cfasync', () => applyToCode(dataJsonPath, addCfasyncHtml, true)],
  ['data.json: fixed page_view + added generate_lead', () => applyToCode(dataJsonPath, fixPageviewHtml, true)],
  ['data.json: switched safeAddClickEvent to delegation', () => applyToCode(dataJsonPath, fixSafeClickHtml, true)],
  ['data.json: added google_ads_call to phone tracking', () => applyToCode(dataJsonPath, fixPhoneHtml, true)],
  ['data.json: disabled GA4 G-EVSBMR91V3 (now via GTM)', () => applyToCode(dataJsonPath, disableGA4Html, true)],
  ['_index.tsx: removed G-NRVKK7VK0R', () => applyToCode(indexPath, removeG_NRVKK_tsx, false)],
  ['_index.tsx: added data-cfasync', () => applyToCode(indexPath, addCfasyncTsx, false)],
  ['_index.tsx: fixed page_view + added generate_lead', () => applyToCode(indexPath, fixPageviewTsx, false)],
  ['_index.tsx: switched safeAddClickEvent to delegation', () => applyToCode(indexPath, fixSafeClickTsx, false)],
  ['_index.tsx: added google_ads_call to phone tracking', () => applyToCode(indexPath, fixPhoneTsx, false)],
  ['_index.tsx: disabled GA4 G-EVSBMR91V3 (now via GTM)', () => applyToCode(indexPath, disableGA4Tsx, false)],
];

for (const [label, fn] of fixes) {
  try {
    if (fn()) {
      console.log('  ✓ ' + label);
      patched++;
    }
  } catch (err) {
    console.log('  ✗ ' + label + ': ' + err.message);
  }
}

// --- Page title fix (simple string replace) ---
const OLD_TITLE = 'Quote Requested (excluded from search)';
const NEW_TITLE = 'Thank You - Quote Requested';

if (fs.existsSync(dataJsonPath)) {
  let raw = fs.readFileSync(dataJsonPath, 'utf8');
  if (raw.includes(OLD_TITLE)) {
    fs.writeFileSync(dataJsonPath, raw.replaceAll(OLD_TITLE, NEW_TITLE));
    console.log('  ✓ data.json: fixed page title');
    patched++;
  }
}

if (fs.existsSync(serverPath)) {
  let content = fs.readFileSync(serverPath, 'utf8');
  if (content.includes(OLD_TITLE)) {
    fs.writeFileSync(serverPath, content.replaceAll(OLD_TITLE, NEW_TITLE));
    console.log('  ✓ [quote-requested] server: fixed page title');
    patched++;
  }
}

// --- Replace tel: link on /quote-requested page with copy-to-clipboard span ---
const quoteReqPath = path.join(__dirname, '..', 'app', '__generated__', '[quote-requested]._index.tsx');

const OLD_TEL_LINK_RE = /<Link\s+href=\{"tel:3017696909"\}\s+target=\{"_blank"\}\s+className=\{`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden`\}>\s*\{"301\.769\.6909"\}\s*<\/Link>/;

const NEW_CLIPBOARD_SPAN = `<span
style={{color: "#1a73e8", cursor: "pointer"}}
onClick={() => {
  navigator.clipboard.writeText("301-769-6909");
  const el = document.getElementById("phone-copied");
  if (el) { el.style.opacity = "1"; setTimeout(() => { el.style.opacity = "0"; }, 1500); }
}}
className={\`w-element cprvrz2 c1uaxhv2 cacmu18 c1ezjj73 cahz6x0 cmchden\`}>
{"301.769.6909"}
</span>
<span id="phone-copied" style={{marginLeft: "8px", fontSize: "0.85em", color: "#4ade80", opacity: 0, transition: "opacity 0.3s"}}>{"Copied!"}</span>`;

if (fs.existsSync(quoteReqPath)) {
  let content = fs.readFileSync(quoteReqPath, 'utf8');
  if (!content.includes('phone-copied') && OLD_TEL_LINK_RE.test(content)) {
    content = content.replace(OLD_TEL_LINK_RE, NEW_CLIPBOARD_SPAN);
    fs.writeFileSync(quoteReqPath, content);
    console.log('  ✓ [quote-requested] page: replaced tel link with copy-to-clipboard');
    patched++;
  }
}

console.log(`\nTracking fix: ${patched} change(s) applied`);
