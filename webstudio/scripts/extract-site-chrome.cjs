#!/usr/bin/env node
/*
 * extract-site-chrome.cjs
 * -----------------------
 * Extracts the LIVE improveitmd.com site header + footer (the navigation chrome)
 * out of a freshly-generated Webstudio page and emits a standalone, reusable
 * React module: landing-pages/shared/SiteChrome.tsx (committed source of truth).
 *
 * Why: the two custom landing pages (/community, /roofing/slate-roofing) must
 * render the EXACT same nav + footer as the rest of the site. The chrome lives
 * inlined (as Webstudio atomic-class markup + SDK components) inside every
 * generated page. Re-extracting it on each deploy means the landing pages always
 * track the live site chrome, even after the nav/footer is edited in Webstudio.
 *
 * Pipeline position: run by scripts/inject-landing-pages.cjs AFTER `webstudio
 * build` regenerates app/__generated__, BEFORE the route files are copied.
 *
 * Fail-safe: if extraction fails validation, keep the existing committed snapshot
 * (warn, do not break the deploy). Only throw if there is no snapshot to fall
 * back to (because then the routes could not compile at all).
 *
 * Structure of a generated page (e.g. app/__generated__/[roofing]._index.tsx):
 *   <Body>
 *     <Box className="w-box ...">          // page wrapper
 *       <Slot><Fragment_1> ...HEADER... </Fragment_1></Slot>   <-- first Slot
 *       <Box tag={"main"}> ...page... </Box>
 *       <Slot><Fragment_1>
 *         <Box tag={"footer"} ...> ...FOOTER... </Box>          <-- footer chrome
 *         <Slot> ...page animation scripts... </Slot>            (excluded)
 *       </Fragment_1></Slot>
 *     </Box>
 *   </Body>
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const GENERATED_DIR = path.join(ROOT, "app", "__generated__");
const OUT_FILE = path.join(ROOT, "landing-pages", "shared", "SiteChrome.tsx");

// Reference pages to try, in order. Any standard interior page carries the full
// chrome; the home page (_index) does too. First existing one wins.
const CANDIDATE_PAGES = [
  "[roofing]._index.tsx",
  "[siding]._index.tsx",
  "[about]._index.tsx",
  "[gutters]._index.tsx",
  "_index.tsx",
];

// Known Webstudio SDK components and the package each is imported from. Only
// identifiers in these sets are turned into imports — anything else detected is
// ignored (defends against false positives from inline SVG/JS in code={"..."}).
const KNOWN = {
  "@webstudio-is/sdk-components-react/components": [
    "Box",
    "Slot",
    "HtmlEmbed",
    "Image",
    "Button",
    "Text",
    "Fragment_1",
  ],
  "@webstudio-is/sdk-components-react-router": ["Link", "Link_1"],
  "@webstudio-is/sdk-components-react-radix": [
    "NavigationMenu",
    "NavigationMenuList",
    "NavigationMenuItem",
    "NavigationMenuTrigger",
    "NavigationMenuContent",
    "NavigationMenuViewport",
    "Accordion",
    "AccordionItem",
    "AccordionHeader",
    "AccordionTrigger",
    "AccordionContent",
  ],
};

function findReferencePage() {
  for (const name of CANDIDATE_PAGES) {
    const p = path.join(GENERATED_DIR, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/** Slice the first <Slot> ... </Slot> child of the page Box = the header chrome. */
function extractHeader(text) {
  const bodyIdx = text.indexOf("<Body");
  if (bodyIdx === -1) throw new Error("no <Body> in reference page");
  const headerStart = text.indexOf("<Slot>", bodyIdx);
  if (headerStart === -1) throw new Error("no header <Slot> found");
  const mainPropIdx = text.indexOf('tag={"main"}', headerStart);
  if (mainPropIdx === -1) throw new Error('no <Box tag="main"> found after header');
  const mainBoxIdx = text.lastIndexOf("<Box", mainPropIdx);
  if (mainBoxIdx === -1 || mainBoxIdx < headerStart)
    throw new Error("could not locate main Box opener");
  return text.slice(headerStart, mainBoxIdx).trimEnd();
}

/** Slice the <Box tag={"footer"}> ... </Box> = the footer chrome (excludes the
 *  trailing animation-scripts Slot that shares the footer's wrapper Slot). */
function extractFooter(text) {
  const footerPropIdx = text.indexOf('tag={"footer"}');
  if (footerPropIdx === -1) throw new Error('no <Box tag="footer"> found');
  const footerBoxIdx = text.lastIndexOf("<Box", footerPropIdx);
  if (footerBoxIdx === -1) throw new Error("could not locate footer Box opener");
  // The animation library script (enterView) marks the start of the sibling Slot
  // that immediately follows the footer Box. Footer ends just before that Slot.
  const aniIdx = text.indexOf("(function(factory)", footerPropIdx);
  let footerEnd;
  if (aniIdx !== -1) {
    const aniSlotIdx = text.lastIndexOf("<Slot>", aniIdx);
    footerEnd = aniSlotIdx > footerBoxIdx ? aniSlotIdx : aniIdx;
  } else {
    // No animation scripts: footer Box is the last thing before the page Box closes.
    footerEnd = text.length;
  }
  return text.slice(footerBoxIdx, footerEnd).trimEnd();
}

/** Build the minimal set of SDK import lines for the identifiers actually used. */
function buildImports(jsx) {
  const used = new Set();
  const re = /<([A-Z][A-Za-z0-9_]*)[\s/>]/g;
  let m;
  while ((m = re.exec(jsx)) !== null) used.add(m[1]);

  const lines = [];
  for (const [pkg, names] of Object.entries(KNOWN)) {
    const present = names.filter((n) => used.has(n));
    if (present.length === 0) continue;
    const specs = present.map((n) => {
      if (n === "Fragment_1") return "Fragment as Fragment_1";
      if (n === "Link_1") return "Link as Link_1";
      return `${n} as ${n}`;
    });
    lines.push(`import { ${specs.join(", ")} } from "${pkg}";`);
  }
  return lines.join("\n");
}

function validate(headerJsx, footerJsx) {
  const errors = [];
  if (!headerJsx.startsWith("<Slot>")) errors.push("header does not start with <Slot>");
  if (!headerJsx.endsWith("</Slot>")) errors.push("header does not end with </Slot>");
  if (!headerJsx.includes("nav is--standard")) errors.push("header missing 'nav is--standard'");
  if (!headerJsx.includes("nav is--sticky")) errors.push("header missing 'nav is--sticky'");
  if (!headerJsx.includes("is-nav-open")) errors.push("header missing 'is-nav-open' (mobile drawer)");
  if (!headerJsx.includes("__navCleanup")) errors.push("header missing nav client script");
  if (!footerJsx.startsWith("<Box")) errors.push("footer does not start with <Box");
  if (!footerJsx.endsWith("</Box>")) errors.push("footer does not end with </Box>");
  if (!footerJsx.includes('tag={"footer"}')) errors.push("footer missing tag=footer");
  if (!/©\s*20/.test(footerJsx)) errors.push("footer missing copyright line");
  // crude balance check on the footer's Box nesting (string-naive but a useful tripwire)
  const boxOpen = (footerJsx.match(/<Box(?=[\s>])/g) || []).length;
  const boxSelfClose = (footerJsx.match(/<Box\b[^>]*\/>/g) || []).length;
  const boxClose = (footerJsx.match(/<\/Box>/g) || []).length;
  if (boxOpen - boxSelfClose !== boxClose)
    errors.push(`footer Box tags unbalanced (open ${boxOpen}, selfClose ${boxSelfClose}, close ${boxClose})`);
  return errors;
}

function indent(block, pad) {
  return block
    .split("\n")
    .map((l) => (l.length ? pad + l : l))
    .join("\n");
}

function render(refName, headerJsx, footerJsx) {
  const imports = buildImports(headerJsx + "\n" + footerJsx);
  return `/* eslint-disable */
// @ts-nocheck
// AUTO-GENERATED by scripts/extract-site-chrome.cjs — DO NOT EDIT BY HAND.
// Source: app/__generated__/${refName}
//   SiteHeader = the page's first <Slot> (announcement bar + logo + is--standard
//   nav + mobile drawer + is--sticky nav + the clientOnly nav <script>).
//   SiteFooter = the page's <Box tag="footer"> chrome.
// Regenerated on every deploy so the landing pages always match the live site.
// Styled by app/__generated__/index.css (imported by each landing route).
import { useMemo } from "react";
import { ReactSdkContext } from "@webstudio-is/react-sdk/runtime";
${imports}
import * as constants from "../../constants.mjs";
import { breakpoints } from "../../__generated__/_index";

// Mirror of the per-page Webstudio runtime context so the SDK components
// (Image/Link/HtmlEmbed/NavigationMenu/Accordion) render exactly as on the site.
const ChromeProvider = ({ children }) => {
  const sdkContext = useMemo(
    () => ({ ...constants, resources: {}, breakpoints, onError: console.error }),
    []
  );
  return <ReactSdkContext.Provider value={sdkContext}>{children}</ReactSdkContext.Provider>;
};

export const SiteHeader = () => (
  <ChromeProvider>
${indent(headerJsx, "    ")}
  </ChromeProvider>
);

export const SiteFooter = () => (
  <ChromeProvider>
${indent(footerJsx, "    ")}
  </ChromeProvider>
);
`;
}

function main() {
  const ref = findReferencePage();
  if (!ref) {
    return bailOrThrow(
      `No generated reference page found in ${GENERATED_DIR} (tried: ${CANDIDATE_PAGES.join(", ")})`
    );
  }
  const refName = path.basename(ref);

  let header, footer, errors;
  try {
    const text = fs.readFileSync(ref, "utf8");
    header = extractHeader(text);
    footer = extractFooter(text);
    errors = validate(header, footer);
  } catch (e) {
    return bailOrThrow(`extraction error from ${refName}: ${e.message}`);
  }
  if (errors.length) {
    return bailOrThrow(`validation failed for ${refName}:\n  - ${errors.join("\n  - ")}`);
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, render(refName, header, footer), "utf8");
  console.log(
    `[extract-site-chrome] OK — wrote ${path.relative(ROOT, OUT_FILE)} ` +
      `(header ${header.length}B, footer ${footer.length}B) from ${refName}`
  );
}

/** On failure: keep the last committed snapshot if present; otherwise hard-fail. */
function bailOrThrow(msg) {
  if (fs.existsSync(OUT_FILE)) {
    console.warn(
      `[extract-site-chrome] WARNING: ${msg}\n` +
        `[extract-site-chrome] Keeping existing snapshot ${path.relative(ROOT, OUT_FILE)} (last known good).`
    );
    return;
  }
  throw new Error(
    `[extract-site-chrome] FATAL: ${msg}\n` +
      `No existing snapshot at ${OUT_FILE} to fall back to — cannot build landing pages.`
  );
}

main();

module.exports = { extractHeader, extractFooter, buildImports, validate };
