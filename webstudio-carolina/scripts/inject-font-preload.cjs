#!/usr/bin/env node
/**
 * inject-font-preload.cjs
 *
 * Post-build patch: add <link rel="preload" as="font"> hints for the
 * above-the-fold font weights so the browser starts fetching them
 * immediately instead of waiting until the CSS is parsed (~360 ms into the
 * critical path on the PageSpeed "Network dependency tree").
 *
 * The fonts are self-hosted woff2 (from /uploads) and the @font-face rules
 * live in the shared <CustomCode> block in _index.tsx, which root.tsx renders
 * into every page's <head>. We inject the preload links just before that
 * <Style> block, reading the real font URLs out of the @font-face rules so
 * the hrefs always match what's actually served.
 *
 * Only the two most-used weights are preloaded — normal (400, body) and
 * bold (700, headings). Preloading all four would compete with the LCP image
 * for bandwidth and hurt more than it helps.
 *
 * crossOrigin is required on font preloads (fonts are fetched in CORS mode)
 * to avoid a double fetch, even for same-origin URLs.
 *
 * Idempotent: skips files that already contain a font preload.
 */

const fs = require("fs");
const path = require("path");

const GEN_DIR = path.join(__dirname, "..", "app", "__generated__");

function log(msg) {
  console.log(`[font-preload] ${msg}`);
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

  // Only the file that holds the @font-face block (shared CustomCode).
  const ffIdx = code.indexOf("@font-face");
  if (ffIdx === -1) continue;

  // Already preloaded?
  if (code.includes('as="font"')) {
    log(`  SKIP ${file} (already has font preload)`);
    continue;
  }

  // Pull the real woff2 URLs for the weights we want to preload.
  const grab = (weight) => {
    const m = code.match(
      new RegExp(`url\\('([^']*futura_pt_${weight}[^']*\\.woff2)'\\)`, "i")
    );
    return m ? m[1] : null;
  };
  const urls = [grab("normal"), grab("bold")].filter(Boolean);

  if (urls.length === 0) {
    log(`  WARN ${file} has @font-face but no normal/bold woff2 URL — skipped`);
    continue;
  }

  const links = urls
    .map(
      (u) =>
        `<link rel="preload" as="font" type="font/woff2" crossOrigin="anonymous" href={${JSON.stringify(u)}} />`
    )
    .join("");

  // Insert immediately before the <Style> block that contains @font-face.
  const styleStart = code.lastIndexOf("<Style>", ffIdx);
  const insertAt = styleStart !== -1 ? styleStart : ffIdx;
  code = code.slice(0, insertAt) + links + code.slice(insertAt);

  fs.writeFileSync(filePath, code);
  log(`  OK ${file} (preloaded ${urls.length} weights)`);
  totalPatched++;
}

log(`Done: ${totalPatched} files patched`);
