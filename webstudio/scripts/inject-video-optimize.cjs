#!/usr/bin/env node
/**
 * inject-video-optimize.cjs
 *
 * Post-build patch: repoint the hero <source src> from the original 7.36 MB
 * Webflow webm to the re-encoded 3.25 MB version (VP9 CRF42, 720p, same 27s).
 * ~56% smaller download for real users; the hero video is decorative/deferred,
 * so quality at this bitrate is fine.
 *
 * The optimized file was uploaded to Strapi (so it's CMS-registered) at
 * /uploads/hero_opt2_ba5e1ce9d1.webm. We swap by BASENAME so the existing
 * absolute-URL prefix (improveitmd.com / improveitcarolina.com) is preserved,
 * and because the new filename differs, the `immutable` cache rule is safe
 * (no stale bytes under a reused URL).
 *
 * Idempotent: skips files where the old basename is already absent.
 */

const fs = require("fs");
const path = require("path");

const GEN_DIR = path.join(__dirname, "..", "app", "__generated__");
const OLD = "Webflow_Capitol_Improvements_36944c2fc2_trimmed2_4df3b2dd00.webm";
const NEW = "hero_opt2_ba5e1ce9d1.webm";

function log(msg) {
  console.log(`[video-optimize] ${msg}`);
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
  const code = fs.readFileSync(filePath, "utf8");
  if (!code.includes(OLD)) continue;

  const patched = code.split(OLD).join(NEW);
  fs.writeFileSync(filePath, patched);
  const n = code.split(OLD).length - 1;
  log(`  OK ${file} (${n} ref → ${NEW})`);
  totalPatched++;
}

log(`Done: ${totalPatched} files patched`);
