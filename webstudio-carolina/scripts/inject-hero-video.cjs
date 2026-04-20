/**
 * inject-hero-video.cjs (Carolina)
 *
 * Image-first loading with delayed video swap on the homepage hero:
 *   1. Image loads immediately (eager, high priority)
 *   2. Video preloads in background (NOT autoPlay)
 *   3. After 3-4 seconds AND video is ready, video fades in and plays
 *   4. When video ends, fades back to image
 */

const fs = require("fs");
const path = require("path");

const MARKER = "// [inject-hero-video]";
const GEN_DIR = path.join(__dirname, "..", "app", "__generated__");
const INDEX_FILE = path.join(GEN_DIR, "_index.tsx");

const FORCE = process.argv.includes("--force");

function log(msg) {
  console.log(`[hero-video] ${msg}`);
}

if (!fs.existsSync(INDEX_FILE)) {
  log("WARN: _index.tsx not found, skipping");
  process.exit(0);
}

let code = fs.readFileSync(INDEX_FILE, "utf8");

if (code.includes(MARKER) && !FORCE) {
  log("Already injected, skipping (use --force to re-inject)");
  process.exit(0);
}

if (FORCE && code.includes(MARKER)) {
  code = code.replace(new RegExp(MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '');
}

let changes = 0;

// Patch 1: Remove autoPlay from hero video
if (code.includes('autoPlay={true}')) {
  const wrapperIdx = code.indexOf('"hero-video-wrapper"');
  if (wrapperIdx !== -1) {
    const autoPlayIdx = code.indexOf('autoPlay={true}', wrapperIdx);
    if (autoPlayIdx !== -1 && autoPlayIdx - wrapperIdx < 200) {
      code = code.substring(0, autoPlayIdx) + 'autoPlay={false}' + code.substring(autoPlayIdx + 'autoPlay={true}'.length);
      changes++;
      log("Removed autoPlay from hero video");
    }
  }
}

// Patch 2: Replace the existing video-ended script
const NEW_HERO_SCRIPT = [
  '<script type="module">',
  MARKER,
  '(function(){',
  '  var wrapper = document.querySelector(".hero-video-wrapper");',
  '  var video = wrapper ? wrapper.querySelector(".hero-video") : null;',
  '  if (!wrapper || !video) return;',
  '',
  '  wrapper.style.opacity = "0";',
  '  wrapper.style.transition = "opacity 0.6s ease-in-out";',
  '',
  '  var MIN_DELAY = 3500;',
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
  '  video.addEventListener("canplay", function onCanPlay() {',
  '    video.removeEventListener("canplay", onCanPlay);',
  '    videoReady = true;',
  '    tryPlay();',
  '  });',
  '',
  '  if (video.readyState >= 3) {',
  '    videoReady = true;',
  '  }',
  '',
  '  var elapsed = Date.now() - startTime;',
  '  var remaining = Math.max(0, MIN_DELAY - elapsed);',
  '  setTimeout(function() {',
  '    timerDone = true;',
  '    tryPlay();',
  '  }, remaining);',
  '',
  '  video.addEventListener("ended", function() {',
  '    wrapper.style.opacity = "0";',
  '  });',
  '})();',
  '</script>'
].join('\\n');

const jsxScript = `code={"${NEW_HERO_SCRIPT.replace(/"/g, '\\"')}"}`;

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
  log("Replaced hero video script with image-first swap logic");
} else {
  log("WARN: Could not find existing hero-video script line to replace");
}

if (changes > 0) {
  fs.writeFileSync(INDEX_FILE, code);
  log(`Done: ${changes} patches applied to _index.tsx`);
} else {
  log("No changes needed");
}
