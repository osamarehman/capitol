#!/usr/bin/env node
/**
 * inject-lazy-mymap.cjs
 *
 * Post-build patch: lazy-load the Google "My Maps" iframe embed
 * (google.com/maps/d/... ) so it doesn't run its ~560ms of main-thread work
 * during initial page load. A live browser probe found this iframe was the
 * single largest non-bundle long-task source on the homepage. It sits well
 * below the fold (the "homes served" trust section), so deferring it has no
 * LCP/CLS cost (the .responsive-map wrapper already reserves height).
 *
 * The site already has a lazy-map mechanism in global.js — initLazyMaps()
 * observes `.location_map iframe[data-src]` and sets src when it nears the
 * viewport. The My Maps embed just wasn't wired into it: it uses the
 * `responsive-map` wrapper class and a plain `src=` (loads immediately).
 *
 * This rewrites that one embed so initLazyMaps() handles it — no global.js
 * change needed:
 *   class="responsive-map"  ->  class="responsive-map location_map"
 *   <iframe src="...maps/d/  ->  <iframe data-src="...maps/d/
 *
 * Scoped to the maps/d/ (My Maps) embed only — regular Google Maps embeds use
 * /maps/embed?pb= and their own lazy mechanism, so they're untouched.
 * Idempotent: skips files already rewritten.
 */

const fs = require("fs");
const path = require("path");

const GEN_DIR = path.join(__dirname, "..", "app", "__generated__");

// Strings as they appear (escaped) inside the generated TSX HtmlEmbed code:
//   class=\"responsive-map\"   and   <iframe ... src=\"https://www.google.com/maps/d/
const WRAP_OLD = 'class=\\"responsive-map\\"';
const WRAP_NEW = 'class=\\"responsive-map location_map\\"';
const SRC_OLD = 'src=\\"https://www.google.com/maps/d/';
const SRC_NEW = 'data-src=\\"https://www.google.com/maps/d/';
const MAPS_MARKER = "maps/d/";

function log(msg) {
  console.log(`[lazy-mymap] ${msg}`);
}

if (!fs.existsSync(GEN_DIR)) {
  log("WARN: __generated__ directory not found, skipping");
  process.exit(0);
}

const files = fs
  .readdirSync(GEN_DIR)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".server.tsx"));

let totalPatched = 0;

for (const file of files) {
  const filePath = path.join(GEN_DIR, file);
  let code = fs.readFileSync(filePath, "utf8");

  const mapsIdx = code.indexOf(MAPS_MARKER);
  if (mapsIdx === -1) continue; // no My Maps embed here

  if (code.includes(SRC_NEW)) {
    log(`  SKIP ${file} (already lazy)`);
    continue;
  }

  // The responsive-map wrapper that precedes the My Maps iframe.
  const wrapIdx = code.lastIndexOf(WRAP_OLD, mapsIdx);
  if (wrapIdx === -1 || !code.includes(SRC_OLD)) {
    log(`  WARN ${file} has maps/d but not the expected responsive-map+src markup — skipped (left eager to avoid breaking it)`);
    continue;
  }

  // Add location_map to that specific wrapper, then defer the src.
  code = code.slice(0, wrapIdx) + WRAP_NEW + code.slice(wrapIdx + WRAP_OLD.length);
  code = code.split(SRC_OLD).join(SRC_NEW);

  fs.writeFileSync(filePath, code);
  log(`  OK ${file} (My Maps iframe deferred via initLazyMaps)`);
  totalPatched++;
}

log(`Done: ${totalPatched} files patched`);
