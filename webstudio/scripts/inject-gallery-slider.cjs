#!/usr/bin/env node
/**
 * Injects gallery slider static HTML + script into BOTH Webstudio server and
 * client bundles. Both must match to prevent React hydration mismatch.
 *
 * When gallery-data.json exists (created by fetch-gallery-data.cjs), injects
 * pre-rendered HTML with real <img> tags, alt text, and inline CSS for SEO.
 *
 * Fallback: if gallery-data.json is missing, injects only the <script> tag
 * and the client JS fetches data at runtime (original behavior).
 *
 * Idempotent: skips if already injected (checks for sentinel).
 */

const fs = require('fs');
const path = require('path');
const glob = require('path');

const PROJECT_DIR = path.resolve(__dirname, '..');
const SERVER_BUNDLE = path.join(PROJECT_DIR, 'build', 'server', 'index.js');
const CLIENT_DIR = path.join(PROJECT_DIR, 'build', 'client', 'assets');
const SLIDER_SRC = path.join(PROJECT_DIR, 'public', 'gallery-slider.js');
const GALLERY_DATA = path.join(__dirname, 'gallery-data.json');

const SENTINEL = '[gallery-slider-injected]';

// ── Preflight checks ──────────────────────────────────────────────────────
if (!fs.existsSync(SERVER_BUNDLE)) {
  console.log('[inject-gallery-slider] No server bundle found — skipping (run after build)');
  process.exit(0);
}

if (!fs.existsSync(SLIDER_SRC)) {
  console.error('[inject-gallery-slider] ERROR: gallery-slider.js not found at', SLIDER_SRC);
  process.exit(1);
}

let bundle = fs.readFileSync(SERVER_BUNDLE, 'utf8');

if (bundle.includes(SENTINEL)) {
  console.log('[inject-gallery-slider] Already injected — skipping');
  process.exit(0);
}

if (!bundle.includes('gallery-slider')) {
  console.log('[inject-gallery-slider] No gallery-slider placeholder found in build — skipping');
  process.exit(0);
}

// ── Load gallery data (optional) ──────────────────────────────────────────
let galleries = null;
if (fs.existsSync(GALLERY_DATA)) {
  try {
    galleries = JSON.parse(fs.readFileSync(GALLERY_DATA, 'utf8'));
    if (!Array.isArray(galleries) || !galleries.length) galleries = null;
  } catch (e) {
    console.warn('[inject-gallery-slider] WARN: Could not parse gallery-data.json:', e.message);
  }
}

// ── Build static HTML ─────────────────────────────────────────────────────
function escAttr(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildStaticGalleryHtml(galleries, heading, subheading) {
  const lines = [];

  // Inline critical CSS for the gallery (prevents FOUC for SSR content)
  lines.push('<style id="ci-gallery-slider-css">');
  lines.push('.ci-gallery{--_gap:14px;--_radius:10px;--_ratio:3/4;--_bg:#e8ebed;--_cols:1.15;--_navy:#00192e;font-family:"Futura PT","DM Sans",sans-serif;width:100%;max-width:100%;box-sizing:border-box;overflow:hidden;overflow-anchor:none;contain:layout style}');
  lines.push('.ci-gallery *,.ci-gallery *::before,.ci-gallery *::after{box-sizing:border-box}');
  lines.push('.ci-gallery__header{margin-bottom:28px}');
  lines.push('.ci-gallery__heading{font-size:clamp(1.5rem,3.5vw,2.25rem);font-weight:700;line-height:1.15;margin:0 0 6px;color:var(--_navy);letter-spacing:-0.01em}');
  lines.push('.ci-gallery__sub{font-size:clamp(0.9rem,2vw,1.05rem);color:#5a6a78;margin:0;line-height:1.55;font-weight:400}');
  lines.push('.ci-gallery__wrap{position:relative;overflow:hidden}');
  lines.push('.ci-gallery__track{display:flex;gap:var(--_gap);overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;scroll-behavior:smooth;padding-bottom:4px}');
  lines.push('.ci-gallery__track::-webkit-scrollbar{display:none}');
  lines.push('.ci-gallery__slide{flex:0 0 calc((100% - var(--_cols)*var(--_gap))/var(--_cols));min-width:0;scroll-snap-align:start;border-radius:var(--_radius);overflow:hidden;position:relative;background:var(--_bg);aspect-ratio:var(--_ratio);cursor:pointer;text-decoration:none;display:block;transform:translateZ(0)}');
  lines.push('.ci-gallery__slide img{width:100%;height:100%;object-fit:cover;display:block}');
  lines.push('.ci-gallery__caption{position:absolute;bottom:0;left:0;right:0;padding:28px 14px 10px;background:linear-gradient(transparent,rgba(0,25,46,0.7));display:flex;align-items:flex-end;justify-content:space-between;gap:8px;pointer-events:none}');
  lines.push('.ci-gallery__title{color:#fff;font-size:0.82rem;font-weight:600;line-height:1.3;margin:0;text-shadow:0 1px 3px rgba(0,0,0,0.3)}');
  lines.push('.ci-gallery__count{display:inline-flex;align-items:center;gap:4px;background:rgba(255,255,255,0.18);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.2);color:#fff;font-size:0.7rem;font-weight:600;padding:3px 8px;border-radius:20px;white-space:nowrap;flex-shrink:0}');
  lines.push('.ci-gallery__lightbox-extras{display:none}');
  lines.push('.ci-gallery__overlay{position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,25,46,0.85) 100%);opacity:0;transition:opacity 0.35s ease;display:flex;flex-direction:column;justify-content:flex-end;padding:20px;pointer-events:none}');
  lines.push('.ci-gallery__slide:hover .ci-gallery__overlay{opacity:1}');
  lines.push('.ci-gallery__view{display:inline-flex;align-items:center;gap:6px;color:#fff;font-size:0.8rem;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;opacity:0;transform:translateY(8px);transition:opacity 0.3s ease 0.05s,transform 0.3s ease 0.05s}');
  lines.push('.ci-gallery__slide:hover .ci-gallery__view{opacity:1;transform:translateY(0)}');
  lines.push('.ci-gallery__view svg{width:16px;height:16px;flex-shrink:0}');
  lines.push('.ci-gallery__slide:hover .ci-gallery__caption{opacity:0}');
  lines.push('.ci-gallery__arrow{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;background:#fff;border:none;box-shadow:0 2px 12px rgba(0,25,46,0.12),0 0 0 1px rgba(0,25,46,0.06);cursor:pointer;z-index:2;display:flex;align-items:center;justify-content:center;transition:transform 0.2s ease,box-shadow 0.2s ease,opacity 0.25s ease;opacity:0;pointer-events:none}');
  lines.push('.ci-gallery__wrap:hover .ci-gallery__arrow{opacity:1;pointer-events:auto}');
  lines.push('.ci-gallery__arrow:hover{transform:translateY(-50%) scale(1.08);box-shadow:0 4px 20px rgba(0,25,46,0.18),0 0 0 1px rgba(0,25,46,0.08)}');
  lines.push('.ci-gallery__arrow:active{transform:translateY(-50%) scale(0.96)}');
  lines.push('.ci-gallery__arrow--prev{left:10px}');
  lines.push('.ci-gallery__arrow--next{right:10px}');
  lines.push('.ci-gallery__arrow svg{width:18px;height:18px;color:#00192e}');
  lines.push('.ci-gallery__arrow[disabled]{opacity:0!important;pointer-events:none}');
  lines.push('.ci-gallery__count svg{width:12px;height:12px;opacity:0.9}');
  lines.push('@media(min-width:640px){.ci-gallery{--_cols:2.25;--_gap:16px}}');
  lines.push('@media(min-width:1024px){.ci-gallery{--_cols:4;--_gap:20px}.ci-gallery__arrow{opacity:0.85;pointer-events:auto}}');
  lines.push('</style>');

  // Gallery container with SSR marker
  lines.push('<div data-inject="gallery-slider" data-heading="' + escAttr(heading) + '" data-subheading="' + escAttr(subheading) + '" class="ci-gallery ci-gallery--ssr">');

  if (heading || subheading) {
    lines.push('<div class="ci-gallery__header">');
    if (heading) lines.push('<h2 class="ci-gallery__heading">' + escAttr(heading) + '</h2>');
    if (subheading) lines.push('<p class="ci-gallery__sub">' + escAttr(subheading) + '</p>');
    lines.push('</div>');
  }

  lines.push('<div class="ci-gallery__wrap">');
  lines.push('<div class="ci-gallery__track">');

  const extrasLines = [];

  galleries.forEach(function (gallery, idx) {
    var groupId = 'ci-gal-' + idx;
    var firstImg = gallery.images[0];
    if (!firstImg) return;
    var loading = idx < 4 ? 'eager' : 'lazy';

    lines.push('<a class="ci-gallery__slide ci-glightbox" href="' + escAttr(firstImg.full) + '" data-gallery="' + groupId + '" data-glightbox="title: ' + escAttr(firstImg.alt) + '; alt: ' + escAttr(firstImg.alt) + '">');
    lines.push('<img src="' + escAttr(gallery.thumb) + '" alt="' + escAttr(gallery.thumbAlt) + '" loading="' + loading + '" decoding="async" width="640" height="480">');
    lines.push('<div class="ci-gallery__caption">');
    lines.push('<span class="ci-gallery__title">' + escAttr(gallery.title) + '</span>');
    if (gallery.images.length > 1) {
      lines.push('<span class="ci-gallery__count">' + gallery.images.length + '</span>');
    }
    lines.push('</div>');
    lines.push('</a>');

    for (var i = 1; i < gallery.images.length; i++) {
      extrasLines.push('<a class="ci-glightbox" href="' + escAttr(gallery.images[i].full) + '" data-gallery="' + groupId + '" data-glightbox="title: ' + escAttr(gallery.images[i].alt) + '; alt: ' + escAttr(gallery.images[i].alt) + '"></a>');
    }
  });

  lines.push('</div>'); // track
  lines.push('</div>'); // wrap

  if (extrasLines.length) {
    lines.push('<div class="ci-gallery__lightbox-extras">');
    lines.push(extrasLines.join(''));
    lines.push('</div>');
  }

  lines.push('<noscript><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;padding:20px 0">');
  galleries.forEach(function (gallery) {
    if (gallery.thumb) {
      lines.push('<img src="' + escAttr(gallery.thumb) + '" alt="' + escAttr(gallery.thumbAlt) + '" style="width:100%;border-radius:8px" loading="lazy">');
    }
  });
  lines.push('</div></noscript>');

  lines.push('</div>'); // ci-gallery

  return lines.join('');
}

// ── Extract heading/subheading from the placeholder ───────────────────────
function extractAttr(code, attr) {
  var re = new RegExp('data-' + attr + '=[\\\\]*"(.*?)[\\\\]*"', 'i');
  var m = code.match(re);
  return m ? m[1].replace(/\\"/g, '"').replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

// ── Escape HTML for different JS string contexts ──────────────────────────
function escapeForSingleQuote(html) {
  return html.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\//g, '\\/');
}

function escapeForBacktick(html) {
  return html.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$').replace(/\//g, '\\/');
}

// ── Find client chunks containing gallery-slider ──────────────────────────
function findClientChunks() {
  const chunks = [];
  if (!fs.existsSync(CLIENT_DIR)) return chunks;
  const files = fs.readdirSync(CLIENT_DIR);
  for (const f of files) {
    if (!f.endsWith('.js')) continue;
    const fp = path.join(CLIENT_DIR, f);
    const content = fs.readFileSync(fp, 'utf8');
    if (content.includes('gallery-slider')) {
      chunks.push({ path: fp, name: f, content: content });
    }
  }
  return chunks;
}

// ── Injection ─────────────────────────────────────────────────────────────
let rawHtml = null;
let heading = '';
let subheading = '';

if (galleries) {
  // Extract heading/subheading from the server bundle placeholder
  const placeholderMatch = bundle.match(/code:\s*'((?:[^'\\]|\\.)*)gallery-slider((?:[^'\\]|\\.)*')/);
  if (placeholderMatch) {
    const fullCode = placeholderMatch[1] + 'gallery-slider' + placeholderMatch[2].slice(0, -1);
    heading = extractAttr(fullCode, 'heading');
    subheading = extractAttr(fullCode, 'subheading');
  }
  rawHtml = buildStaticGalleryHtml(galleries, heading, subheading);
}

// ── 1. Patch server bundle (single-quoted code:'...' strings) ─────────────
let serverInjected = 0;

bundle = bundle.replace(
  /(code:\s*')((?:[^'\\]|\\.)*)gallery-slider((?:[^'\\]|\\.)*')/g,
  function (fullMatch, prefix, before, after) {
    serverInjected++;
    const originalCode = before + 'gallery-slider' + after.slice(0, -1);

    // Remove prior injected content
    let newCode = originalCode
      .replace(/<script[^>]*gallery-slider\.js[^>]*>(?:<\\?\/script>)?/gi, '')
      .replace(/<!-- \[gallery-slider-injected\] -->[\s\S]*$/, '');

    const sentinel = '<!-- ' + SENTINEL + ' -->';
    const scriptTag = '<script data-cfasync="false" src="\\/gallery-slider.js"><\\/script>';

    if (rawHtml) {
      return prefix + escapeForSingleQuote(rawHtml) + sentinel + scriptTag + "'";
    } else {
      return prefix + newCode + sentinel + scriptTag + "'";
    }
  }
);

fs.writeFileSync(SERVER_BUNDLE, bundle, 'utf8');

// ── 2. Patch client chunks (backtick code:`...` strings) ──────────────────
let clientInjected = 0;
const clientChunks = findClientChunks();

for (const chunk of clientChunks) {
  let content = chunk.content;
  let modified = false;

  // Client chunks use backtick template literals: code:`<div data-inject="gallery-slider"...>`
  content = content.replace(
    /(code:\s*`)((?:[^`\\]|\\.)*)gallery-slider((?:[^`\\]|\\.)*`)/g,
    function (fullMatch, prefix, before, after) {
      clientInjected++;
      modified = true;

      const sentinel = '<!-- ' + SENTINEL + ' -->';
      const scriptTag = '<script data-cfasync="false" src="\\/gallery-slider.js"><\\/script>';

      if (rawHtml) {
        return prefix + escapeForBacktick(rawHtml) + sentinel + scriptTag + '`';
      } else {
        const originalCode = before + 'gallery-slider' + after.slice(0, -1);
        return prefix + originalCode + sentinel + scriptTag + '`';
      }
    }
  );

  if (modified) {
    fs.writeFileSync(chunk.path, content, 'utf8');
    console.log('[inject-gallery-slider] Patched client chunk: ' + chunk.name);
  }
}

// ── Report ────────────────────────────────────────────────────────────────
const mode = rawHtml ? 'static HTML + script' : 'script-only';
console.log('[inject-gallery-slider] Done: ' + serverInjected + ' server + ' + clientInjected + ' client injection(s)');
console.log('  Mode: ' + mode);
if (galleries) {
  console.log('  Galleries: ' + galleries.length + ' with static <img> tags');
}
if (!clientInjected) {
  console.log('  WARN: No client chunks patched — hydration mismatch may occur');
}
