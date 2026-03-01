import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, '../../jobs_processed.csv');
const OUTPUT_FILE = path.join(__dirname, '../../jobs_city_aggregated.csv');

interface Job {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  tradeName: string;
  latitude: string;
  longitude: string;
}

interface CityAggregation {
  city: string;
  state: string;
  tradeName: string;
  jobCount: number;
  latitude: number;
  longitude: number;
  // For calculating centroid
  latSum: number;
  lngSum: number;
  coordCount: number;
}

// City name normalization and aliases for fuzzy matching
const CITY_ALIASES: Record<string, string> = {
  'washington': 'Washington DC',
  'washington dc': 'Washington DC',
  'district of columbia': 'Washington DC',
  'dc': 'Washington DC',
  'n. potomac': 'North Potomac',
  'north potomac': 'North Potomac',
  'ft. washington': 'Fort Washington',
  'ft washington': 'Fort Washington',
  'mt. airy': 'Mount Airy',
  'mt airy': 'Mount Airy',
  'st. michaels': 'St. Michaels',
  'glen burnie': 'Glen Burnie',
  'glenburnie': 'Glen Burnie',
};

// State normalization
const STATE_NORMALIZE: Record<string, string> = {
  'maryland': 'MD',
  'md': 'MD',
  'virginia': 'VA',
  'va': 'VA',
  'district of columbia': 'DC',
  'dc': 'DC',
  '': 'DC', // Washington without state is DC
};

function normalizeCity(city: string): string {
  const lower = city.toLowerCase().trim();
  return CITY_ALIASES[lower] || city.trim();
}

function normalizeState(state: string, city: string): string {
  const lower = state.toLowerCase().trim();
  // If city is Washington and no state, assume DC
  if (city.toLowerCase().includes('washington') && !state) {
    return 'DC';
  }
  return STATE_NORMALIZE[lower] || state.trim();
}

function aggregateJobs() {
  console.log('Reading jobs_processed.csv...');
  const csvContent = fs.readFileSync(INPUT_FILE, 'utf8');
  const jobs: Job[] = parse(csvContent, { columns: true, skip_empty_lines: true });

  console.log(`Loaded ${jobs.length} jobs`);

  // Aggregate by normalized city + state + trade name
  const aggregations = new Map<string, CityAggregation>();

  for (const job of jobs) {
    const normalizedCity = normalizeCity(job.city);
    const normalizedState = normalizeState(job.state, job.city);
    const tradeName = job.tradeName || 'OTHER';

    const key = `${normalizedCity}|${normalizedState}|${tradeName}`;

    if (!aggregations.has(key)) {
      aggregations.set(key, {
        city: normalizedCity,
        state: normalizedState,
        tradeName,
        jobCount: 0,
        latitude: 0,
        longitude: 0,
        latSum: 0,
        lngSum: 0,
        coordCount: 0,
      });
    }

    const agg = aggregations.get(key)!;
    agg.jobCount++;

    // Add to coordinate sums for centroid calculation
    const lat = parseFloat(job.latitude);
    const lng = parseFloat(job.longitude);
    if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0) {
      agg.latSum += lat;
      agg.lngSum += lng;
      agg.coordCount++;
    }
  }

  // Calculate centroids and prepare output
  const results: any[] = [];

  for (const agg of aggregations.values()) {
    // Calculate centroid (average of all coordinates)
    if (agg.coordCount > 0) {
      agg.latitude = agg.latSum / agg.coordCount;
      agg.longitude = agg.lngSum / agg.coordCount;
    }

    results.push({
      city: agg.city,
      state: agg.state,
      tradeName: agg.tradeName,
      jobCount: agg.jobCount,
      latitude: agg.latitude.toFixed(6),
      longitude: agg.longitude.toFixed(6),
    });
  }

  // Sort by job count descending
  results.sort((a, b) => parseInt(b.jobCount) - parseInt(a.jobCount));

  // Also create a city-only aggregation (all trades combined) for total counts
  const cityTotals = new Map<string, { count: number; lat: number; lng: number; coordCount: number }>();

  for (const agg of aggregations.values()) {
    const cityKey = `${agg.city}|${agg.state}`;
    if (!cityTotals.has(cityKey)) {
      cityTotals.set(cityKey, { count: 0, lat: 0, lng: 0, coordCount: 0 });
    }
    const ct = cityTotals.get(cityKey)!;
    ct.count += agg.jobCount;
    if (agg.coordCount > 0) {
      ct.lat += agg.latSum;
      ct.lng += agg.lngSum;
      ct.coordCount += agg.coordCount;
    }
  }

  // Write main aggregation
  const output = stringify(results, {
    header: true,
    columns: ['city', 'state', 'tradeName', 'jobCount', 'latitude', 'longitude'],
  });
  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`\nWrote ${results.length} aggregated entries to: ${OUTPUT_FILE}`);

  // Write city totals (all services combined)
  const cityTotalsFile = path.join(__dirname, '../../jobs_city_totals.csv');
  const cityTotalsResults: any[] = [];

  for (const [key, data] of cityTotals.entries()) {
    const [city, state] = key.split('|');
    const avgLat = data.coordCount > 0 ? data.lat / data.coordCount : 0;
    const avgLng = data.coordCount > 0 ? data.lng / data.coordCount : 0;

    cityTotalsResults.push({
      city,
      state,
      totalJobs: data.count,
      latitude: avgLat.toFixed(6),
      longitude: avgLng.toFixed(6),
    });
  }

  cityTotalsResults.sort((a, b) => b.totalJobs - a.totalJobs);

  const cityTotalsOutput = stringify(cityTotalsResults, {
    header: true,
    columns: ['city', 'state', 'totalJobs', 'latitude', 'longitude'],
  });
  fs.writeFileSync(cityTotalsFile, cityTotalsOutput);
  console.log(`Wrote ${cityTotalsResults.length} city totals to: ${cityTotalsFile}`);

  // Summary
  console.log('\n--- Summary ---');
  console.log(`Total jobs processed: ${jobs.length}`);
  console.log(`Unique city/trade combinations: ${results.length}`);
  console.log(`Unique cities: ${cityTotals.size}`);

  console.log('\nTop 15 cities by total jobs:');
  cityTotalsResults.slice(0, 15).forEach((c, i) => {
    console.log(`  ${i + 1}. ${c.city}, ${c.state}: ${c.totalJobs} jobs (${c.latitude}, ${c.longitude})`);
  });

  // Check Washington DC specifically
  const dcEntry = cityTotalsResults.find(c => c.city === 'Washington DC');
  if (dcEntry) {
    console.log(`\nWashington DC coordinates: ${dcEntry.latitude}, ${dcEntry.longitude}`);
  }
}

aggregateJobs();
