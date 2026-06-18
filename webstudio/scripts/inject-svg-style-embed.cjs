#!/usr/bin/env node
/**
 * inject-svg-style-embed.cjs
 *
 * Fixes a React hydration crash (#418 -> #423 full re-render) on pages with SVG icons.
 *
 * Webstudio imports some SVGRepo icons with their `<style>` tag placed in an
 * <HtmlEmbed> *inside* the <svg><g> ...:
 *     <g id="SVGRepo_iconCarrier">
 *       <HtmlEmbed code={"<style type=\"text/css\"> .st0{fill:...} </style>"} className={`w-html-embed`} />
 *       <g><path className="st0" .../></g>
 *     </g>
 * The SDK HtmlEmbed wraps its content in a <div>, and a <div> is INVALID inside
 * <svg>. The browser's parser relocates it, so the hydrated DOM doesn't match the
 * server HTML -> React throws #418 and re-renders the whole route (#423) = the
 * user-visible freeze/"crash", heavily on /services/[slug].
 *
 * Fix: replace each style-only HtmlEmbed with a NATIVE <style> element (valid in
 * SVG, no <div>, hydrates cleanly). The CSS is preserved verbatim, so icon colors
 * are unchanged.
 *
 * Idempotent. Runs post-build like the other scripts/inject-*.cjs.
 */
const fs = require('fs');
const path = require('path');

const GENERATED_DIR = path.resolve(__dirname, '..', 'app', '__generated__');

// Matches a self-closing <HtmlEmbed code={"<style ...>...</style>"} ... /> regardless
// of the order/number of trailing props (className, clientOnly, etc.). Group 1 = the
// full <style> tag string as written in source (incl. \" escapes).
const RE = /<HtmlEmbed\s+code=\{"(<style[\s\S]*?<\/style>)"\}[\s\S]*?\/>/g;

function main() {
  if (!fs.existsSync(GENERATED_DIR)) {
    console.error('[inject-svg-style-embed] ERROR: app/__generated__ not found.');
    process.exit(1);
  }
  const files = fs.readdirSync(GENERATED_DIR).filter((f) => f.endsWith('.tsx'));
  let patchedFiles = 0;
  let total = 0;
  for (const f of files) {
    const fp = path.join(GENERATED_DIR, f);
    const src = fs.readFileSync(fp, 'utf8');
    let count = 0;
    const next = src.replace(RE, (_m, styleTag) => {
      // styleTag is e.g.  <style type=\"text/css\"> .st0{...} </style>
      // Strip the outer <style ...> / </style> to get the raw CSS.
      const inner = styleTag.replace(/^<style[^>]*>/, '').replace(/<\/style>$/, '');
      // Only convert plain CSS (no quotes/braces-as-strings that would break a JS
      // string literal). These SVGRepo icon styles are simple `.stN{fill:...}` rules.
      if (inner.includes('"') || inner.includes('\\') || inner.includes('</')) {
        return _m; // leave anything non-trivial untouched
      }
      count++;
      // Native <style> with the CSS as a TEXT CHILD (valid inside <svg>, hydrates
      // cleanly, no <div> wrapper, no dangerouslySetInnerHTML).
      return `<style type={"text/css"}>{${JSON.stringify(inner)}}</style>`;
    });
    if (count > 0 && next !== src) {
      fs.writeFileSync(fp, next);
      patchedFiles++;
      total += count;
    }
  }
  console.log(`[inject-svg-style-embed] converted ${total} SVG <style> embed(s) to native <style> across ${patchedFiles} file(s) (scanned ${files.length}).`);
}

main();
