/**
 * inject-hero-video.cjs
 *
 * Post-build script that modifies ALL pages with a hero video section to
 * implement image-first loading with delayed video swap:
 *   1. Image loads immediately (eager, high priority)
 *   2. Video preloads in background (NOT autoPlay)
 *   3. After 4 seconds AND video is ready, video fades in and plays
 *   4. When video ends, fades back to image
 *
 * Scans all app/__generated__/*.tsx files for hero-video-wrapper elements.
 */

const fs = require("fs");
const path = require("path");

const MARKER = "// [inject-hero-video]";
const GEN_DIR = path.join(__dirname, "..", "app", "__generated__");

const FORCE = process.argv.includes("--force");

function log(msg) {
  console.log(`[hero-video] ${msg}`);
}

const NEW_HERO_SCRIPT = [
  '<script type="module">',
  MARKER,
  '(function(){',
  '  var wrapper = document.querySelector(".hero-video-wrapper");',
  '  var video = wrapper ? wrapper.querySelector(".hero-video") : null;',
  '  if (!wrapper || !video) return;',
  '',
  '  // Initially hide video wrapper so image shows first',
  '  wrapper.style.opacity = "0";',
  '  wrapper.style.transition = "opacity 0.6s ease-in-out";',
  '',
  '  var MIN_DELAY = 4000; // Show image for at least 4 seconds',
  '  var startTime = Date.now();',
  '  var videoReady = false;',
  '  var timerDone = false;',
  '',
  '  function tryPlay() {',
  '    if (!videoReady || !timerDone) return;',
  '    wrapper.style.opacity = "1";',
  '    video.play().catch(function(){});',
  '  }',
  '',
  '  // Wait for video to buffer enough to play',
  '  video.addEventListener("canplay", function onCanPlay() {',
  '    video.removeEventListener("canplay", onCanPlay);',
  '    videoReady = true;',
  '    tryPlay();',
  '  });',
  '',
  '  // If video is already buffered (cached)',
  '  if (video.readyState >= 3) {',
  '    videoReady = true;',
  '  }',
  '',
  '  // Minimum image display timer',
  '  var elapsed = Date.now() - startTime;',
  '  var remaining = Math.max(0, MIN_DELAY - elapsed);',
  '  setTimeout(function() {',
  '    timerDone = true;',
  '    tryPlay();',
  '  }, remaining);',
  '',
  '  // When video ends, fade back to image',
  '  video.addEventListener("ended", function() {',
  '    wrapper.style.opacity = "0";',
  '  });',
  '})();',
  '</script>'
].join('\\n');

const jsxScript = `code={"${NEW_HERO_SCRIPT.replace(/"/g, '\\"')}"}`;

// ─── Main: scan all generated .tsx files ─────────────────────────────────────

if (!fs.existsSync(GEN_DIR)) {
  log("WARN: __generated__ directory not found, skipping");
  process.exit(0);
}

const files = fs.readdirSync(GEN_DIR).filter(f => f.endsWith('.tsx') && !f.endsWith('.server.tsx'));
let totalPatched = 0;

for (const file of files) {
  const filePath = path.join(GEN_DIR, file);
  let code = fs.readFileSync(filePath, "utf8");

  // Skip files without hero video
  if (!code.includes('"hero-video-wrapper"')) continue;

  // Skip if already injected (unless --force)
  if (code.includes(MARKER) && !FORCE) {
    log(`  SKIP ${file} (already injected)`);
    continue;
  }

  // Remove old marker if re-injecting
  if (FORCE && code.includes(MARKER)) {
    code = code.replace(new RegExp(MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
  }

  let changes = 0;

  // Patch 1: Remove autoPlay={true} from the hero video element
  if (code.includes('autoPlay={true}')) {
    const wrapperIdx = code.indexOf('"hero-video-wrapper"');
    if (wrapperIdx !== -1) {
      const autoPlayIdx = code.indexOf('autoPlay={true}', wrapperIdx);
      if (autoPlayIdx !== -1 && autoPlayIdx - wrapperIdx < 200) {
        code = code.substring(0, autoPlayIdx) + 'autoPlay={false}' + code.substring(autoPlayIdx + 'autoPlay={true}'.length);
        changes++;
      }
    }
  }

  // Patch 2: Replace the existing video-ended script with our swap logic
  const lines = code.split('\n');
  let scriptLineIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('code={"') && line.includes('hero-video-wrapper') && line.includes('ended')) {
      scriptLineIdx = i;
      break;
    }
  }

  if (scriptLineIdx !== -1) {
    lines[scriptLineIdx] = jsxScript;
    code = lines.join('\n');
    changes++;
  }

  // Patch 3: Route the hero poster through the image resizer (WebP + resize).
  // Raw posters are large JPGs (~180 KiB); serving them as resized WebP via
  // /_image cuts the LCP-blocking download to ~25 KiB. Idempotent: skips URLs
  // that already point at /_image (so --force re-runs don't double-wrap).
  code = code.replace(
    /poster=\{"(https?:\/\/[^"]+?)\/uploads\/([^"]+?\.(?:jpe?g|png))"\}/gi,
    (match, origin, file) => {
      if (match.includes("/_image/")) return match;
      changes++;
      return `poster={"${origin}/_image/w_640,q_60,f_webp/${origin}/uploads/${file}"}`;
    }
  );

  // Normalize quality on already-wrapped posters so a quality change still
  // applies on re-runs (when the source is already a /_image poster).
  const normalized = code.replace(/_image\/w_640,q_\d+,f_webp/g, "_image/w_640,q_60,f_webp");
  if (normalized !== code) {
    code = normalized;
    changes++;
  }

  if (changes > 0) {
    fs.writeFileSync(filePath, code);
    log(`  OK ${file} (${changes} patches)`);
    totalPatched++;
  }
}

log(`Done: ${totalPatched} files patched`);
