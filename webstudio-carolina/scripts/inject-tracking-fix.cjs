#!/usr/bin/env node
/**
 * Post-sync patch: Fix duplicate GA4 events in Webstudio CustomCode (Carolina).
 *
 * Same fixes as MD version:
 *   1. Remove redundant manual gtag('event', 'page_view')
 *   2. Add generate_lead conversion event on /quote-requested
 *   3. Deduplicate events on refresh
 *   4. Remove unused G-NRVKK7VK0R GA4 property tag
 *   5. Fix quote-requested page title
 *   6. Switch safeAddClickEvent to event delegation
 *   7. Add data-cfasync to GA4 scripts
 */

const fs = require('fs');
const path = require('path');

const MARKER = 'THANK-YOU / CONVERSION EVENT (deduplicated)';

const OLD_PAGEVIEW = `// ========= PAGE VIEW EVENTS =========

if (isFromFacebook) {
  // Facebook ad traffic
  fbq('track', 'ViewContent');
  console.log('\u2713 FB: ViewContent fired');

  // GA4 for Facebook traffic
  gtag('event', 'view_content', {
    traffic_source: 'facebook_ad',
    content_type: 'page'
  });
  console.log('\u2713 GA4: view_content fired (Facebook traffic)');
} else {
  // Normal traffic
  fbq('track', 'PageView');
  console.log('\u2713 FB: PageView fired');

  // GA4 for normal traffic (page_view is automatic, but we can add custom parameters)
  gtag('event', 'page_view', {
    traffic_source: 'organic'
  });
  console.log('\u2713 GA4: page_view fired (Normal traffic)');
}`;

const NEW_PAGEVIEW = `// ========= PAGE VIEW EVENTS =========
// NOTE: GA4 page_view is auto-fired by gtag('config', ...) \u2014 do NOT fire manually
// to avoid duplicate events. Only Facebook needs explicit page view tracking.

if (isFromFacebook) {
  fbq('track', 'ViewContent');
  console.log('\u2713 FB: ViewContent fired');
} else {
  fbq('track', 'PageView');
  console.log('\u2713 FB: PageView fired');
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
  console.log('\u2713 GA4: generate_lead fired (form: ' + formName + ', source: ' + sourcePage + ')');

  fbq('track', 'Lead', {
    content_name: formName,
    content_category: 'quote_request'
  });
  console.log('\u2713 FB: Lead fired (form: ' + formName + ')');
})();`;

const OLD_GA4_TAG_HTML = `<script src="https://www.googletagmanager.com/gtag/js?id=G-NRVKK7VK0R"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NRVKK7VK0R');
</script> \n`;

const OLD_GA4_TAG_TSX = '<Script src={"https://www.googletagmanager.com/gtag/js?id=G-NRVKK7VK0R"}></Script><Script>{"\\n  window.dataLayer = window.dataLayer || [];\\n  function gtag(){dataLayer.push(arguments);}\\n  gtag(\'js\', new Date());\\n\\n  gtag(\'config\', \'G-NRVKK7VK0R\');\\n"}</Script>{" \\n"}';

let patched = 0;

// --- Patch data.json ---
const dataJsonPath = path.join(__dirname, '..', '.webstudio', 'data.json');
if (fs.existsSync(dataJsonPath)) {
  const data = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  let code = data?.build?.pages?.meta?.code || '';
  let dataJsonChanged = false;

  if (code.includes('G-NRVKK7VK0R')) {
    code = code.replace(OLD_GA4_TAG_HTML, '');
    console.log('  \u2713 data.json: removed G-NRVKK7VK0R');
    dataJsonChanged = true;
  }

  if (code.includes(MARKER)) {
    console.log('  data.json: tracking fix already applied');
  } else if (code.includes(OLD_PAGEVIEW)) {
    code = code.replace(OLD_PAGEVIEW, NEW_PAGEVIEW);
    console.log('  \u2713 data.json: patched tracking');
    dataJsonChanged = true;
  } else {
    console.log('  \u26a0 data.json: old pageview block not found (may have changed upstream)');
  }

  if (dataJsonChanged) {
    data.build.pages.meta.code = code;
    fs.writeFileSync(dataJsonPath, JSON.stringify(data, null, 2));
    patched++;
  }
}

// --- Patch generated _index.tsx ---
const indexPath = path.join(__dirname, '..', 'app', '__generated__', '_index.tsx');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');

  if (content.includes('G-NRVKK7VK0R')) {
    content = content.replace(OLD_GA4_TAG_TSX, '');
    fs.writeFileSync(indexPath, content);
    console.log('  \u2713 _index.tsx: removed G-NRVKK7VK0R');
    patched++;
  }

  if (content.includes('THANK-YOU / CONVERSION EVENT')) {
    console.log('  _index.tsx: tracking fix already applied');
  } else {
    const oldEscaped = OLD_PAGEVIEW.replace(/\n/g, '\\n');
    const newEscaped = NEW_PAGEVIEW.replace(/\n/g, '\\n');

    if (content.includes(oldEscaped)) {
      content = content.replace(oldEscaped, newEscaped);
      fs.writeFileSync(indexPath, content);
      console.log('  \u2713 _index.tsx: patched');
      patched++;
    } else {
      console.log('  \u26a0 _index.tsx: old pageview block not found');
    }
  }
}

// --- Add data-cfasync to GA4 scripts ---
if (fs.existsSync(dataJsonPath)) {
  let raw = fs.readFileSync(dataJsonPath, 'utf8');
  const gaTagNoCfasync = '<script src="https://www.googletagmanager.com/gtag/js?id=G-839XJ1CRJZ">';
  if (raw.includes(gaTagNoCfasync)) {
    raw = raw.replace(gaTagNoCfasync, '<script data-cfasync="false" src="https://www.googletagmanager.com/gtag/js?id=G-839XJ1CRJZ">');
    raw = raw.replace('</script> \\n<script>\\n  window.dataLayer', '</script> \\n<script data-cfasync="false">\\n  window.dataLayer');
    fs.writeFileSync(dataJsonPath, raw);
    console.log('  \u2713 data.json: added data-cfasync to GA4 scripts');
    patched++;
  }
}

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes('src={"https://www.googletagmanager.com/gtag/js?id=G-839XJ1CRJZ"}') &&
      !content.includes('data-cfasync={"false"} src={"https://www.googletagmanager.com/gtag/js?id=G-839XJ1CRJZ"}')) {
    content = content.replace(
      '<Script src={"https://www.googletagmanager.com/gtag/js?id=G-839XJ1CRJZ"}></Script><Script>{"\\n  window.dataLayer',
      '<Script data-cfasync={"false"} src={"https://www.googletagmanager.com/gtag/js?id=G-839XJ1CRJZ"}></Script><Script data-cfasync={"false"}>{"\\n  window.dataLayer'
    );
    fs.writeFileSync(indexPath, content);
    console.log('  \u2713 _index.tsx: added data-cfasync to GA4 scripts');
    patched++;
  }
}

// --- Fix safeAddClickEvent to use event delegation ---
const OLD_SAFE_CLICK = `function safeAddClickEvent(selector, handler) {
  const els = document.querySelectorAll(selector);
  if (!els || !els.length) return;

  els.forEach(function (el) {
    el.addEventListener('click', function (e) {
      handler(e, el);
    });
  });
}`;

const NEW_SAFE_CLICK = `function safeAddClickEvent(selector, handler) {
  document.addEventListener('click', function (e) {
    const el = e.target.closest(selector);
    if (!el) return;
    handler(e, el);
  });
}`;

if (fs.existsSync(dataJsonPath)) {
  const djData = JSON.parse(fs.readFileSync(dataJsonPath, 'utf8'));
  const djCode = djData?.build?.pages?.meta?.code || '';
  if (djCode.includes('querySelectorAll(selector)') && djCode.includes('safeAddClickEvent')) {
    djData.build.pages.meta.code = djCode.replace(OLD_SAFE_CLICK, NEW_SAFE_CLICK);
    fs.writeFileSync(dataJsonPath, JSON.stringify(djData, null, 2));
    console.log('  \u2713 data.json: switched safeAddClickEvent to event delegation');
    patched++;
  }
}

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  const oldEsc = OLD_SAFE_CLICK.replace(/\n/g, '\\n');
  const newEsc = NEW_SAFE_CLICK.replace(/\n/g, '\\n');
  if (content.includes(oldEsc)) {
    content = content.replace(oldEsc, newEsc);
    fs.writeFileSync(indexPath, content);
    console.log('  \u2713 _index.tsx: switched safeAddClickEvent to event delegation');
    patched++;
  }
}

// --- Fix quote-requested page title ---
const OLD_TITLE = 'Quote Requested (excluded from search)';
const NEW_TITLE = 'Thank You - Quote Requested';

if (fs.existsSync(dataJsonPath)) {
  let raw = fs.readFileSync(dataJsonPath, 'utf8');
  if (raw.includes(OLD_TITLE)) {
    raw = raw.replaceAll(OLD_TITLE, NEW_TITLE);
    fs.writeFileSync(dataJsonPath, raw);
    console.log('  \u2713 data.json: fixed page title');
    patched++;
  }
}

const serverPath = path.join(__dirname, '..', 'app', '__generated__', '[quote-requested]._index.server.tsx');
if (fs.existsSync(serverPath)) {
  let content = fs.readFileSync(serverPath, 'utf8');
  if (content.includes(OLD_TITLE)) {
    content = content.replaceAll(OLD_TITLE, NEW_TITLE);
    fs.writeFileSync(serverPath, content);
    console.log('  \u2713 [quote-requested] server: fixed page title');
    patched++;
  }
}

console.log(`\nTracking fix: ${patched} file(s) patched`);
