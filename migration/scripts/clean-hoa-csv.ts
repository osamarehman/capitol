#!/usr/bin/env tsx
/**
 * Clean HOA CSV by removing invalid/error URLs
 * Then identify cities that need re-research
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOA_CSV_PATH = join(__dirname, '../../hoa_resources.csv');
const CLEANED_CSV_PATH = join(__dirname, '../../hoa_resources_cleaned.csv');
const CITIES_TO_RESEARCH_PATH = join(__dirname, '../../cities_to_research.txt');

interface HOAResource {
  city: string;
  state: string;
  hoa_name: string;
  hoa_url: string;
  is_community_based: string;
}

// URLs that failed verification (invalid or error)
const INVALID_URLS = new Set([
  // Invalid (wrong content)
  'https://greenhavenhoa.org/',
  'https://www.anpf.org',
  'https://www.cpeca.org',
  'https://www.hickoryridge.org',
  'https://www.croftonvillage.com',
  'https://www.westsidena.org',
  'https://www.lakelandscommunity.com',
  'https://www.greatseneca.org',
  'https://kingsviewvillage.com',
  'https://greenbriar.org',
  'https://www.falconhurst.org',
  'https://www.rivatrace.org',
  'https://www.perrywoodcommunity.org',
  'https://arorahills.com',
  'https://www.bramptonhills.org',
  'https://fountainhillshoa.com',
]);

// URLs with errors (domain doesn't exist)
const ERROR_URLS = new Set([
  'https://www.stoneybeach.org',
  'https://www.lakeshoremd.org',
  'https://www.parolecommunityassociation.com',
  'https://www.wardourhoa.com',
  'https://www.bayridgecivic.org',
  'https://www.federalhillonline.org',
  'https://www.fpco.info',
  'https://www.hampdencommunitycouncil.org',
  'https://www.lpcivic.org',
  'https://www.butchershill.net',
  'https://www.ppna-online.org',
  'https://www.crosskeyscommunity.com',
  'https://edgemoorca.org',
  'https://mohicanhills.org',
  'https://woodacres.org',
  'https://www.sumnerca.org',
  'https://www.brookdaleca.org',
  'https://www.bradleyhillsgrove.org',
  'https://www.belairatbowie.com',
  'https://www.pointerridge.org',
  'https://www.fairwoodcommunity.com',
  'https://www.cheverlycommunity.org',
  'https://www.chevychasesection5.org',
  'https://www.chevychaseview.org',
  'https://www.martinsadditions.org',
  'https://www.ccwna.org',
  'https://www.clarksburgvillagehoa.com',
  'https://www.woodyardestates.org',
  'https://www.clintongrovehoa.com',
  'https://www.calverthills.org',
  'https://lakeland.org',
  'https://www.hollywoodcommunityassociation.org',
  'https://www.berwynheights.gov',
  'https://www.wildelake.org',
  'https://www.owenbrown.org',
  'https://www.longreach.org',
  'https://www.stevensforest.org',
  'https://www.kingscontrivance.org',
  'https://www.oaklandmills.org',
  'https://www.riverhill.org',
  'https://www.croftoncivic.org',
  'https://www.waldencommunity.org',
  'https://www.generalsridge.org',
  'https://www.canterfieldhoa.com',
  'https://www.arundelforest.org',
  'https://www.patuxentmanor.org',
  'https://davidsonvillecivic.org',
  'https://www.burleighmanor.org',
  'https://www.dunloggin.org',
  'https://www.normandyhills.org',
  'https://www.worthingtonvalleyhoa.org',
  'https://www.turfvalley.org',
  'https://centennial.org',
  'https://www.fortwashingtonforest.org',
  'https://www.monocacyvillage.org',
  'https://www.tuscanycommunity.org',
  'https://www.crestwoodcommunity.org',
  'https://kentlands.org',
  'https://www.crownfarmhoa.com',
  'https://www.diamondfarms.org',
  'https://www.riocommunity.org',
  'https://www.washingtonianwoods.org',
  'https://www.croftonhoa.com',
  'https://www.waughchapeltown.com',
  'https://www.gunnerslake.org',
  'https://www.middlebrookknolls.org',
  'https://www.orchardridgehoa.org',
  'https://www.neelsvilleglen.org',
  'https://www.cheverlyhoa.org',
  'https://www.laurellakes.org',
  'https://www.millersvillefarms.org',
  'https://www.mitchellvillehoa.org',
  'https://www.lakearbor.org',
  'https://www.montgomeryvillage.com',
  'https://www.stedwick.org',
  'https://www.whetstonemd.org',
  'https://www.mountairytownesquare.com',
  'https://www.twinridge.org',
  'https://www.prospecthillhoa.com',
  'https://www.pineyorchard.com',
  'https://www.tworiverscommunity.org',
  'https://www.norbeckmeadows.org',
  'https://www.avenelhoa.com',
  'https://www.potomacglen.org',
  'https://www.potomachunt.org',
  'https://www.potomacoutside.org',
  'https://www.riverfallshoa.com',
  'https://www.rivaridge.org',
  'https://www.fallsgrovecommunity.com',
  'https://www.kingfarmca.org',
  'https://www.woodleygardens.org',
  'https://www.horizonhillcivic.org',
  'https://www.hungerfordcivic.org',
  'https://www.chartwellcommunity.org',
  'https://www.benfieldcrossing.org',
  'https://www.woodsideparkcivic.org',
  'https://www.northhillssligo.org',
  'https://www.indianspringcitizens.org',
  'https://www.oakviewcommunity.org',
  'https://www.sevenoaksevanswood.org',
  'https://www.woodmoorpinecrest.org',
  'https://www.cliftonparkvillage.org',
  'https://www.montgomeryknolls.org',
  'https://www.woodsideforest.org',
  'https://www.lyttonsvillecivic.org',
  'https://www.takomamobilization.org',
  'https://www.woodmorecountryclub.com',
  'https://www.smallwoodvillage.org',
  'https://www.glenmontforest.org',
  'https://www.beltsvillecitizens.org',
  'https://pgplanning.org',
  'https://www.damascuscommunity.org',
  'https://www.dealeareacivic.org',
  'https://pgportal.org/hoa',
  'https://www.calvertcountymd.gov/planning',
  'https://www.chesapeakeranch.org',
  'https://www.galesvillecommunity.org',
  'https://www.galesvilleheritagesociety.org',
  'https://www.aacounty.org/community',
  'https://www.glenwoodmanor.org',
  'https://www.bushypark.org',
  'https://www.linthicumshipley.org',
  'https://www.aacounty.org/hoa',
  'https://www.severnaparkca.org',
  'https://www.kentislandfederation.org',
  'https://www.stevensvillearts.org',
  'https://www.collingtonstationhoa.com',
  'https://longleafhoa.com',
  'https://woodmorehoa.com',
  'https://www.annapolisroads.org',
  'https://www.fellspointra.org',
  'https://www.lpcivic.org',
  'https://www.carderocksprings.org',
  'https://www.glenechoheights.org',
  'https://www.westmorelandhills.org',
  'https://www.belairtown2hoa.com',
  'https://www.saddlebrookwest.org',
  'https://www.section5chevychase.org',
  'https://www.clarksburgvillage.org',
  'https://www.gatewaycommonshoa.com',
  'https://www.cpwoods.org',
  'https://lakelandcivic.org',
  'https://calverthillscivic.org',
  'https://www.berwyndistrict.org',
  'https://www.oldtowncivic.org',
  'https://www.longreach.org',
  'https://www.riverhill.org',
  'https://www.wildelake.org',
  'https://www.croftongardenclub.org',
  'https://www.dunlogginhoa.org',
  'https://www.fonthill.org',
  'https://www.turfvalleyoverlook.com',
  'https://www.whittiercommunity.org',
  'https://www.wormansmill.org',
  'https://www.springridgecommunity.org',
  'https://www.saybrookecommunity.org',
  'https://www.churchillvillagesouth.org',
  'https://kingsviewvillage.org',
  'https://www.greenbeltstation.org',
  'https://www.utcresidences.org',
  'https://www.montpeliercommunity.org',
  'https://www.shipleyshoa.org',
  'https://www.eastgatehomes.org',
  'https://www.marylandplacehomes.org',
  'https://www.southvillagehomes.org',
  'https://www.stedwickhomes.org',
  'https://marylandplace.org',
  'https://pattonridge.org',
  'https://southvillage.org',
  'https://stedwickhomes.org',
  'https://whetstonemd.org',
  'https://www.olneysquarehoa.org',
  'https://www.oatlandfarm.org',
  'https://www.owingsmillsnewtowncommunity.org',
  'https://www.avenelcommunity.org',
  'https://www.annapolislanding.org',
  'https://kingfarm.org',
  'https://fallsgrovehoa.org',
  'https://www.rockshirehoa.org',
  'https://www.berrywood.org',
  'https://www.chartwellsevern.org',
  'https://www.fairoaksmagothy.org',
  'https://www.woodmoorpinecrestcivic.org',
  'https://www.berryvalleyhoa.org',
]);

// Facebook URLs to remove
const isFacebookUrl = (url: string): boolean => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes('facebook.com') ||
         lowerUrl.includes('fb.com') ||
         lowerUrl.includes('fb.me');
};

async function main() {
  console.log('📂 Loading HOA CSV...');

  if (!existsSync(HOA_CSV_PATH)) {
    throw new Error(`CSV not found: ${HOA_CSV_PATH}`);
  }

  const content = readFileSync(HOA_CSV_PATH, 'utf-8');
  const records: HOAResource[] = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`   Loaded ${records.length} records`);

  // Track cities that need re-research
  const citiesNeedingResearch = new Set<string>();

  // Clean records
  const cleanedRecords: HOAResource[] = [];
  let removedCount = 0;
  let facebookCount = 0;
  let invalidCount = 0;
  let errorCount = 0;

  for (const record of records) {
    const url = record.hoa_url;

    // Remove Facebook URLs
    if (isFacebookUrl(url)) {
      console.log(`   ❌ Removing Facebook: ${record.hoa_name} (${record.city})`);
      facebookCount++;
      citiesNeedingResearch.add(`${record.city}|${record.state}`);
      removedCount++;
      continue;
    }

    // Remove invalid URLs
    if (url && INVALID_URLS.has(url)) {
      console.log(`   ❌ Removing invalid: ${record.hoa_name} (${record.city})`);
      invalidCount++;
      citiesNeedingResearch.add(`${record.city}|${record.state}`);
      removedCount++;
      continue;
    }

    // Remove error URLs (domain doesn't exist)
    if (url && ERROR_URLS.has(url)) {
      console.log(`   ❌ Removing error URL: ${record.hoa_name} (${record.city})`);
      errorCount++;
      citiesNeedingResearch.add(`${record.city}|${record.state}`);
      removedCount++;
      continue;
    }

    // Keep community-based entries (no URL is fine)
    // Keep entries with working URLs
    cleanedRecords.push(record);
  }

  // Remove duplicates
  const seen = new Set<string>();
  const dedupedRecords = cleanedRecords.filter(r => {
    const key = `${r.city}|${r.hoa_name}|${r.hoa_url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const duplicatesRemoved = cleanedRecords.length - dedupedRecords.length;

  // Write cleaned CSV
  const csvContent = stringify(dedupedRecords, {
    header: true,
    columns: ['city', 'state', 'hoa_name', 'hoa_url', 'is_community_based'],
  });
  writeFileSync(CLEANED_CSV_PATH, csvContent);

  // Write cities to research
  const citiesToResearch = Array.from(citiesNeedingResearch)
    .map(c => c.split('|')[0])
    .sort();
  writeFileSync(CITIES_TO_RESEARCH_PATH, citiesToResearch.join('\n'));

  console.log('\n' + '='.repeat(60));
  console.log('📊 CLEANUP SUMMARY');
  console.log('='.repeat(60));
  console.log(`Original records: ${records.length}`);
  console.log(`Facebook URLs removed: ${facebookCount}`);
  console.log(`Invalid URLs removed: ${invalidCount}`);
  console.log(`Error URLs removed: ${errorCount}`);
  console.log(`Duplicates removed: ${duplicatesRemoved}`);
  console.log(`Total removed: ${removedCount + duplicatesRemoved}`);
  console.log(`Cleaned records: ${dedupedRecords.length}`);
  console.log(`Cities needing research: ${citiesNeedingResearch.size}`);
  console.log('='.repeat(60));
  console.log(`\n📄 Cleaned CSV saved to: ${CLEANED_CSV_PATH}`);
  console.log(`📄 Cities to research saved to: ${CITIES_TO_RESEARCH_PATH}`);
}

main().catch(console.error);
