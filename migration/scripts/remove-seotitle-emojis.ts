import 'dotenv/config';

const STRAPI_URL = process.env.STRAPI_URL!;
const API_TOKEN = process.env.STRAPI_API_TOKEN!;

const headers = {
  Authorization: `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

// Matches all emoji characters (including variation selectors and ZWJ sequences)
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]+/gu;

function stripEmojis(text: string): string {
  return text.replace(emojiRegex, '').replace(/^\s+/, '');
}

async function fetchAllPages() {
  const allPages: any[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    const url = `${STRAPI_URL}/api/services?fields[0]=seoTitleTag&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const res = await fetch(url, { headers });
    const json = await res.json();
    allPages.push(...json.data);
    if (page >= json.meta.pagination.pageCount) break;
    page++;
  }

  return allPages;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');

  console.log('Fetching all local pages...');
  const pages = await fetchAllPages();
  console.log(`Total pages: ${pages.length}`);

  const affected = pages.filter(
    (p: any) => p.seoTitleTag && emojiRegex.test(p.seoTitleTag)
  );
  console.log(`Pages with emojis in seoTitleTag: ${affected.length}\n`);

  if (affected.length === 0) {
    console.log('No pages to update.');
    return;
  }

  let updated = 0;
  let failed = 0;

  for (const page of affected) {
    const oldTitle = page.seoTitleTag;
    const newTitle = stripEmojis(oldTitle);

    console.log(`[${page.documentId}]`);
    console.log(`  OLD: ${oldTitle}`);
    console.log(`  NEW: ${newTitle}`);

    if (dryRun) {
      console.log('  (dry run - skipped)\n');
      continue;
    }

    try {
      const res = await fetch(`${STRAPI_URL}/api/services/${page.documentId}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data: { seoTitleTag: newTitle } }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(`  FAILED: ${res.status} ${err}\n`);
        failed++;
      } else {
        console.log('  UPDATED\n');
        updated++;
      }
    } catch (err) {
      console.error(`  ERROR: ${err}\n`);
      failed++;
    }
  }

  console.log(`\nDone. Updated: ${updated}, Failed: ${failed}`);
}

main().catch(console.error);
