#!/usr/bin/env node
/**
 * inject-html-lang.cjs
 *
 * Fixes the <html lang=""> bug in app/root.tsx. The Webstudio CLI template ships:
 *     const lastMatchWithLanguage = matches.findLast((match) => {
 *       const language = match?.data?.pageMeta?.language;
 *       return language != null;                                  // <-- "" passes this
 *     });
 *     const lang = lastMatchWithLanguage?.data?.pageMeta?.language ?? "en"; // <-- "" ?? "en" === ""
 * Pages ship pageMeta.language === "" (empty string), which passes `!= null` and
 * defeats `?? "en"`, so every page renders <html lang="">. An empty lang makes
 * mobile browsers auto-translate the page, rewriting text nodes and breaking React
 * hydration (#425 text mismatch -> #418 -> #423 full client re-render = freeze).
 *
 * `webstudio build` can overwrite app/root.tsx from the CLI template, so this runs
 * as a post-build patch (like the other scripts/inject-*.cjs). Idempotent.
 *
 * Usage: node scripts/inject-html-lang.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT_TSX = path.resolve(__dirname, '..', 'app', 'root.tsx');

const REPLACEMENTS = [
  {
    // Treat empty string as "no language" in the findLast filter.
    from: 'return language != null;',
    to: 'return language != null && language !== "";',
  },
  {
    // Use `||` so an empty string also falls back to "en".
    from: '?.data?.pageMeta?.language ?? "en";',
    to: '?.data?.pageMeta?.language || "en";',
  },
];

function main() {
  if (!fs.existsSync(ROOT_TSX)) {
    console.error('[inject-html-lang] ERROR: app/root.tsx not found.');
    process.exit(1);
  }
  let src = fs.readFileSync(ROOT_TSX, 'utf8');
  let applied = 0;
  let alreadyOk = 0;
  for (const { from, to } of REPLACEMENTS) {
    if (src.includes(to)) {
      alreadyOk++;
      continue; // already patched
    }
    if (src.includes(from)) {
      src = src.replace(from, to);
      applied++;
    }
  }
  if (applied > 0) {
    fs.writeFileSync(ROOT_TSX, src);
    console.log(`[inject-html-lang] patched app/root.tsx (${applied} replacement(s)) -> <html lang="en"> fallback.`);
  } else if (alreadyOk === REPLACEMENTS.length) {
    console.log('[inject-html-lang] app/root.tsx already patched (no-op).');
  } else {
    console.warn('[inject-html-lang] WARNING: expected lang pattern not found in app/root.tsx. ' +
      'The Webstudio template may have changed — verify the <html lang> logic manually.');
  }
}

main();
