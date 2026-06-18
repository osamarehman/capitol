#!/usr/bin/env node
/**
 * Fetches gallery data from Strapi CMS and saves as JSON for build-time injection.
 *
 * Usage: node scripts/fetch-gallery-data.cjs [--strapi-url URL]
 *
 * Output: scripts/gallery-data.json
 *
 * Exits 0 even on failure (logs warning, does not break the build).
 * When gallery-data.json is missing, inject-gallery-slider.cjs falls back
 * to script-only injection and the client JS fetches at runtime.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT = path.join(__dirname, 'gallery-data.json');

// Parse --strapi-url from argv
let strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
const urlIdx = process.argv.indexOf('--strapi-url');
if (urlIdx !== -1 && process.argv[urlIdx + 1]) {
  strapiUrl = process.argv[urlIdx + 1];
}

const API = strapiUrl + '/api/galleries?populate=*&pagination%5BpageSize%5D=100&status=published';

// Public-facing base for images (Caddy proxies /uploads/* to Strapi)
const PUBLIC_BASE = 'https://improveitmd.com';

function resolveUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) {
    // Rewrite cms.improveitmd.com -> improveitmd.com for public URLs
    return url.replace('https://cms.improveitmd.com', PUBLIC_BASE)
              .replace('http://cms.improveitmd.com', PUBLIC_BASE);
  }
  return PUBLIC_BASE + url;
}

function getThumbUrl(media) {
  if (!media || !media.url) return null;
  if (media.formats) {
    if (media.formats.medium && media.formats.medium.url) return resolveUrl(media.formats.medium.url);
    if (media.formats.small && media.formats.small.url) return resolveUrl(media.formats.small.url);
  }
  return resolveUrl(media.url);
}

async function main() {
  console.log('[fetch-gallery-data] Fetching from ' + strapiUrl + '...');

  let res;
  try {
    res = await fetch(API);
  } catch (e) {
    console.warn('[fetch-gallery-data] WARN: Cannot reach Strapi — ' + e.message);
    console.warn('  Gallery will use client-side fetch fallback.');
    return;
  }

  if (!res.ok) {
    console.warn('[fetch-gallery-data] WARN: API returned ' + res.status);
    console.warn('  Gallery will use client-side fetch fallback.');
    return;
  }

  const json = await res.json();
  if (!json.data || !json.data.length) {
    console.warn('[fetch-gallery-data] WARN: No gallery data returned');
    return;
  }

  const imgFields = ['main', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6', 'image7'];
  const altFields = ['altMain', 'altImg1', 'altImg2', 'altImg3', 'altImg4', 'altImg5', 'altImg6', 'altImg7'];

  const galleries = [];
  json.data.forEach(function (item) {
    const mainMedia = item.main;
    if (!mainMedia || !mainMedia.url) return;
    const images = [];
    imgFields.forEach(function (f, i) {
      const m = item[f];
      if (m && m.url) images.push({ full: resolveUrl(m.url), alt: item[altFields[i]] || item.title || '' });
    });
    galleries.push({
      title: item.title || '',
      slug: item.slug || '',
      thumb: getThumbUrl(mainMedia),
      thumbAlt: item.altMain || item.title || '',
      images: images,
    });
  });

  if (!galleries.length) {
    console.warn('[fetch-gallery-data] WARN: No valid galleries after processing');
    return;
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(galleries, null, 2), 'utf8');
  console.log('[fetch-gallery-data] Saved ' + galleries.length + ' galleries to gallery-data.json');
}

main().catch(function (e) {
  console.warn('[fetch-gallery-data] WARN: ' + e.message);
  console.warn('  Gallery will use client-side fetch fallback.');
});
