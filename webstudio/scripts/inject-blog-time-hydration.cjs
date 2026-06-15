#!/usr/bin/env node
/*
 * inject-blog-time-hydration.cjs
 *
 * ROOT CAUSE (proven 2026-06-15 via Playwright timezoneId repro):
 *   The Webstudio <Time> SDK component formats its display text with
 *   `new Intl.DateTimeFormat(locale, {dateStyle}).format(date)`, which uses the
 *   RUNTIME's local timezone. Blog dates are stored as midnight-UTC
 *   (e.g. "2024-02-29T00:00:00.000Z"). The server renders in UTC ("Feb 29, 2024")
 *   but a US-Eastern visitor's browser renders the previous calendar day
 *   ("Feb 28, 2024") -> React text mismatch (#425) -> hydration failure (#418)
 *   -> full client re-render of the whole root (#423 = the user-visible "crash").
 *
 *   This NEVER reproduced in headless tests because headless Chromium ran in UTC
 *   (same as the server). Setting timezoneId:'America/New_York' reproduces it
 *   deterministically: {"#425":2,"#418":3,"#423":1}.
 *
 * FIX:
 *   Add `suppressHydrationWarning` to the blog <Time> elements. React then keeps
 *   the server-rendered (UTC) date text and does NOT escalate the mismatch into a
 *   destructive root re-render. The displayed date is the intended published day.
 *
 * Runs post-`webstudio build` (build overwrites app/__generated__), wired into
 * deploy.sh alongside the other inject-*.cjs scripts.
 */
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const GEN_DIR = path.join(__dirname, '..', 'app', '__generated__');

// Match self-closing <Time ... /> JSX blocks (Time elements contain no nested '>').
const TIME_RE = /<Time\b([\s\S]*?)\/>/g;

let totalPatched = 0;
const files = fs.readdirSync(GEN_DIR).filter(
  (f) => f.startsWith('[blog]') && f.endsWith('.tsx') && !f.includes('.server.')
);

for (const file of files) {
  const full = path.join(GEN_DIR, file);
  let src = fs.readFileSync(full, 'utf8');
  let count = 0;

  const next = src.replace(TIME_RE, (match, attrs) => {
    if (/suppressHydrationWarning/.test(attrs)) return match; // already patched
    count++;
    // insert the prop just before the closing '/>'
    return `<Time${attrs}suppressHydrationWarning={true} />`;
  });

  if (count > 0) {
    totalPatched += count;
    console.log(`  ${file}: patched ${count} <Time> element(s)`);
    if (!DRY) fs.writeFileSync(full, next);
  }
}

if (totalPatched === 0) {
  console.log('inject-blog-time-hydration: no <Time> elements found to patch (already patched or none present).');
} else {
  console.log(`inject-blog-time-hydration: ${DRY ? '[DRY] would patch' : 'patched'} ${totalPatched} <Time> element(s) total.`);
}
