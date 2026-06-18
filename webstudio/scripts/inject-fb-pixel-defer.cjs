#!/usr/bin/env node
/**
 * inject-fb-pixel-defer.cjs
 *
 * Post-build patch: defer the Facebook Pixel's network download
 * (connect.facebook.net/en_US/fbevents.js) out of the critical path.
 *
 * The standard FB Pixel base snippet defines a synchronous `fbq` stub (with
 * a queue) AND immediately injects the fbevents.js <script>. That script is
 * ~12 KiB of legacy/transpiled JS that competes with LCP for bandwidth and
 * main-thread time on first load — PageSpeed flags it as render-blocking /
 * legacy JS.
 *
 * This patch keeps the `fbq` stub + `fbq('init', …)` firing immediately, so
 * the `fbq('track', …)` calls in the v6 tracking script still queue safely.
 * It only DEFERS the fbevents.js <script> injection until either:
 *   - 3 seconds after window 'load', or
 *   - the first user interaction (scroll / pointerdown / keydown / touchstart)
 * whichever happens first. When fbevents.js finally loads, it drains the
 * queue, so PageView / Lead / etc. all still fire — just a few seconds later
 * and off the critical path. (Form-submit Leads happen on interaction, which
 * itself triggers the load, so conversions are unaffected.)
 *
 * Idempotent: the rewritten loader contains the marker `n.__l`; files already
 * carrying it are skipped.
 *
 * Scans every app/__generated__/*.tsx for the FB base snippet's loader span.
 */

const fs = require("fs");
const path = require("path");

const GEN_DIR = path.join(__dirname, "..", "app", "__generated__");

// The exact loader span Webstudio emits inside the FB base snippet, as it
// appears in the generated TSX (JSX string literal: newlines are the literal
// two characters backslash-n, hence `\\n` here).
const OLD_LOADER =
  "t=b.createElement(e);t.async=!0;\\nt.src=v;s=b.getElementsByTagName(e)[0];\\ns.parentNode.insertBefore(t,s)";

// Replacement: same injection, but wrapped in a deferred trigger. `f`/`b` are
// window/document from the enclosing IIFE. `n.__l` guards against double-load.
const NEW_LOADER =
  "var L=function(){if(n.__l)return;n.__l=!0;t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)};" +
  "if(b.readyState==='complete'){f.setTimeout(L,3000)}else{f.addEventListener('load',function(){f.setTimeout(L,3000)},{once:!0})}" +
  "['scroll','pointerdown','keydown','touchstart'].forEach(function(x){f.addEventListener(x,L,{once:!0,passive:!0})})";

function log(msg) {
  console.log(`[fb-pixel-defer] ${msg}`);
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

  // Only touch files that load the FB Pixel base snippet.
  if (!code.includes("connect.facebook.net/en_US/fbevents.js")) continue;

  // Already deferred?
  if (code.includes("n.__l")) {
    log(`  SKIP ${file} (already deferred)`);
    continue;
  }

  if (!code.includes(OLD_LOADER)) {
    log(`  WARN ${file} has fbevents.js but loader span did not match — skipped`);
    continue;
  }

  code = code.split(OLD_LOADER).join(NEW_LOADER);
  fs.writeFileSync(filePath, code);
  log(`  OK ${file} (FB Pixel deferred)`);
  totalPatched++;
}

log(`Done: ${totalPatched} files patched`);
