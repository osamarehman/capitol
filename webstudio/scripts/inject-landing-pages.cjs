#!/usr/bin/env node
/**
 * inject-landing-pages.cjs
 *
 * Re-applies the two custom Lovable landing pages (/community and
 * /roofing/slate-roofing) after each `webstudio build`, which regenerates
 * app/routes/ and public/ from scratch. Same post-build pattern as the other
 * scripts/inject-*.cjs.
 *
 * Source of truth lives in landing-pages/ (committed). This script copies:
 *   landing-pages/community/route.tsx        -> app/routes/[community]._index.tsx
 *   landing-pages/slate-roofing/route.tsx    -> app/routes/[roofing].[slate-roofing]._index.tsx
 *   landing-pages/styles/community.css       -> app/landing/community.css
 *   landing-pages/styles/slate-roofing.css   -> app/landing/slate-roofing.css
 *   landing-pages/slate-roofing/SiteHeader.tsx -> app/landing/slate/SiteHeader.tsx
 *   landing-pages/slate-roofing/SiteFooter.tsx -> app/landing/slate/SiteFooter.tsx
 *   landing-pages/assets/community/*         -> public/landing/community/*
 *   landing-pages/assets/slate/*            -> public/landing/slate/*
 *
 * Helper components + CSS go under app/landing/ (NOT app/routes/) so the
 * React Router flatRoutes() scanner doesn't turn them into routes.
 *
 * NOTE: the *.css under landing-pages/styles/ is pre-compiled Tailwind output.
 * If you edit a page's .tsx, regenerate it with landing-pages/tailwind/build-css.sh
 * and commit the result — this script does NOT run Tailwind.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "landing-pages");

function log(msg) {
  console.log(`[inject-landing-pages] ${msg}`);
}

function copyFile(from, to) {
  if (!fs.existsSync(from)) {
    throw new Error(`missing source file: ${path.relative(ROOT, from)}`);
  }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  log(`  ${path.relative(ROOT, to)}`);
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) {
    throw new Error(`missing source dir: ${path.relative(ROOT, from)}`);
  }
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const f = path.join(from, entry.name);
    const t = path.join(to, entry.name);
    if (entry.isDirectory()) {
      n += copyDir(f, t);
    } else {
      fs.copyFileSync(f, t);
      n += 1;
    }
  }
  return n;
}

// Guard: the compiled CSS must exist and look real (not an empty/forgotten file).
for (const css of ["community.css", "slate-roofing.css"]) {
  const p = path.join(SRC, "styles", css);
  if (!fs.existsSync(p) || fs.statSync(p).size < 1000) {
    throw new Error(
      `landing-pages/styles/${css} is missing or too small — run landing-pages/tailwind/build-css.sh and commit the output`
    );
  }
}

log("Injecting custom landing pages...");

// 1. Route modules
copyFile(
  path.join(SRC, "community/route.tsx"),
  path.join(ROOT, "app/routes/[community]._index.tsx")
);
copyFile(
  path.join(SRC, "slate-roofing/route.tsx"),
  path.join(ROOT, "app/routes/[roofing].[slate-roofing]._index.tsx")
);

// 2. Helper components + compiled CSS (outside app/routes so they aren't routed)
copyFile(
  path.join(SRC, "styles/community.css"),
  path.join(ROOT, "app/landing/community.css")
);
copyFile(
  path.join(SRC, "styles/slate-roofing.css"),
  path.join(ROOT, "app/landing/slate-roofing.css")
);
copyFile(
  path.join(SRC, "slate-roofing/SiteHeader.tsx"),
  path.join(ROOT, "app/landing/slate/SiteHeader.tsx")
);
copyFile(
  path.join(SRC, "slate-roofing/SiteFooter.tsx"),
  path.join(ROOT, "app/landing/slate/SiteFooter.tsx")
);

// 3. Re-hosted assets -> public/landing/
const nCommunity = copyDir(
  path.join(SRC, "assets/community"),
  path.join(ROOT, "public/landing/community")
);
const nSlate = copyDir(
  path.join(SRC, "assets/slate"),
  path.join(ROOT, "public/landing/slate")
);
log(`  public/landing/community/ (${nCommunity} files)`);
log(`  public/landing/slate/ (${nSlate} files)`);

// 4. Register both pages in the generated sitemap (webstudio build regenerates
//    $resources.sitemap.xml.ts, so this re-adds them every deploy).
const sitemapPath = path.join(ROOT, "app/__generated__/$resources.sitemap.xml.ts");
if (fs.existsSync(sitemapPath)) {
  let sm = fs.readFileSync(sitemapPath, "utf8");
  const lastModified = new Date().toISOString().slice(0, 10);
  const entries = ["/community", "/roofing/slate-roofing"];
  const toAdd = entries.filter((p) => !sm.includes(`"path": "${p}"`));
  if (toAdd.length) {
    const block = toAdd
      .map((p) => `  {\n    "path": "${p}",\n    "lastModified": "${lastModified}"\n  }`)
      .join(",\n");
    // Insert right after the array opener: `export const sitemap = [`
    sm = sm.replace(/(export const sitemap = \[\s*)/, `$1\n${block},\n`);
    fs.writeFileSync(sitemapPath, sm);
    log(`  sitemap += ${toAdd.join(", ")}`);
  } else {
    log("  sitemap already contains both pages");
  }
} else {
  log("  WARN: sitemap file not found — skipped sitemap registration");
}

log("Done. Routes: /community  /roofing/slate-roofing");
