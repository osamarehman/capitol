import { strapiClient } from './src/strapi/client.js';

const slugs = [
  'crownsville-maryland-roofing-company-near-you',
  'arnold-maryland-deck-builders-near-you', 
  'crownsville-maryland-front-door-replacement-near-you',
  'crownsville-maryland-siding-contractors-near-you',
  'crownsville-maryland-deck-builders-near-you',
  'crownsville-maryland-window-replacement-near-you',
  'crownsville-maryland-gutter-guards-gutters-near-you',
];

console.log('Starting check...');

for (const slug of slugs) {
  try {
    console.log(`Querying ${slug}...`);
    const entries = await strapiClient.getEntries('services', {
      'filters[slug][$eq]': slug,
      'fields[0]': 'locationContactDetails',
      'fields[1]': 'slug',
      status: 'published',
    });
    
    console.log(`--- ${slug} ---`);
    
    if (entries.length === 0) {
      console.log('  (not found)');
      continue;
    }
    
    const html = (entries[0] as any).locationContactDetails || '';
    if (!html) {
      console.log('  (no locationContactDetails)');
      continue;
    }
    
    const lines = html.split('\n').filter((l: string) => /crownsville/i.test(l));
    
    if (lines.length === 0) {
      console.log('  (no Crownsville references)');
    } else {
      for (const line of lines) {
        console.log('  ' + line.trim().substring(0, 200));
      }
    }
  } catch (error) {
    console.log(`  ERROR: ${(error as any).message}`);
  }
}

console.log('Done.');
