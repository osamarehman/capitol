import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
const INPUT_FILE = path.join(__dirname, '../../jobs_done_so_far.csv');
const OUTPUT_FILE = path.join(__dirname, '../../jobs_processed.csv');
const AGGREGATED_FILE = path.join(__dirname, '../../jobs_aggregated_by_city.csv');

interface RawJob {
  'Customer Address': string;
  'Customer Address Line 2': string;
  'Customer State': string;
  'Customer Zip Code': string;
  'Customer Billing Address': string;
  'Customer Billing Address Line 2': string;
  'Customer Billing City': string;
  'Customer Billing State': string;
  'Customer Billing Zip Code': string;
  'Sales Rep / Customer Rep': string;
  'Job Type': string;
  'Trade Name': string;
  'Work Type': string;
  'Job Category': string;
}

interface ProcessedJob {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  tradeName: string;
  latitude: number | null;
  longitude: number | null;
}

interface CityAggregation {
  city: string;
  state: string;
  tradeName: string;
  jobCount: number;
  latitude: number | null;
  longitude: number | null;
}

// Rate limiter for Mapbox API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Cache for geocoding results to avoid duplicate API calls
const geocodeCache = new Map<string, { lat: number; lng: number } | null>();

async function geocodeAddress(address: string, city: string, state: string, zipCode: string): Promise<{ lat: number; lng: number } | null> {
  const fullAddress = `${address}, ${city}, ${state} ${zipCode}`;

  // Check cache first
  if (geocodeCache.has(fullAddress)) {
    return geocodeCache.get(fullAddress)!;
  }

  try {
    const encodedAddress = encodeURIComponent(fullAddress);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Geocoding failed for: ${fullAddress}`);
      geocodeCache.set(fullAddress, null);
      return null;
    }

    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      const result = { lat, lng };
      geocodeCache.set(fullAddress, result);
      return result;
    }

    geocodeCache.set(fullAddress, null);
    return null;
  } catch (error) {
    console.error(`Error geocoding ${fullAddress}:`, error);
    geocodeCache.set(fullAddress, null);
    return null;
  }
}

async function processCSV() {
  console.log('Reading CSV file...');
  const csvContent = fs.readFileSync(INPUT_FILE, 'utf-8');

  const rawJobs: RawJob[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`Found ${rawJobs.length} jobs to process`);

  // Filter out jobs with empty Sales Rep if needed and process
  const processedJobs: ProcessedJob[] = [];
  const uniqueAddresses = new Set<string>();

  for (const job of rawJobs) {
    // Skip if Sales Rep is empty (as per requirement)
    if (!job['Sales Rep / Customer Rep']?.trim()) {
      continue;
    }

    const address = job['Customer Address'] || job['Customer Billing Address'];
    const city = job['Customer Billing City'] || '';
    const state = job['Customer State'] || job['Customer Billing State'] || '';
    const zipCode = job['Customer Zip Code'] || job['Customer Billing Zip Code'] || '';
    const tradeName = job['Trade Name'] || '';

    // Create unique key to avoid duplicates
    const uniqueKey = `${address}|${city}|${tradeName}`;
    if (uniqueAddresses.has(uniqueKey)) {
      continue;
    }
    uniqueAddresses.add(uniqueKey);

    processedJobs.push({
      address,
      city,
      state,
      zipCode,
      tradeName,
      latitude: null,
      longitude: null,
    });
  }

  console.log(`Processing ${processedJobs.length} unique jobs after filtering`);

  // Geocode addresses with rate limiting
  console.log('Starting geocoding...');
  let geocodedCount = 0;

  for (let i = 0; i < processedJobs.length; i++) {
    const job = processedJobs[i];
    const coords = await geocodeAddress(job.address, job.city, job.state, job.zipCode);

    if (coords) {
      job.latitude = coords.lat;
      job.longitude = coords.lng;
      geocodedCount++;
    }

    // Rate limiting: Mapbox free tier allows 600 requests/minute
    if ((i + 1) % 50 === 0) {
      console.log(`Geocoded ${i + 1}/${processedJobs.length} jobs...`);
      await delay(100); // Small delay to avoid rate limits
    }
  }

  console.log(`Successfully geocoded ${geocodedCount}/${processedJobs.length} addresses`);

  // Write processed jobs CSV
  const processedOutput = stringify(processedJobs, {
    header: true,
    columns: ['address', 'city', 'state', 'zipCode', 'tradeName', 'latitude', 'longitude'],
  });
  fs.writeFileSync(OUTPUT_FILE, processedOutput);
  console.log(`Wrote processed jobs to: ${OUTPUT_FILE}`);

  // Aggregate by city and trade name
  const aggregationMap = new Map<string, CityAggregation>();

  for (const job of processedJobs) {
    const key = `${job.city}|${job.state}|${job.tradeName}`;

    if (aggregationMap.has(key)) {
      const existing = aggregationMap.get(key)!;
      existing.jobCount++;
      // Keep first valid coordinates
      if (!existing.latitude && job.latitude) {
        existing.latitude = job.latitude;
        existing.longitude = job.longitude;
      }
    } else {
      aggregationMap.set(key, {
        city: job.city,
        state: job.state,
        tradeName: job.tradeName,
        jobCount: 1,
        latitude: job.latitude,
        longitude: job.longitude,
      });
    }
  }

  const aggregatedJobs = Array.from(aggregationMap.values())
    .sort((a, b) => b.jobCount - a.jobCount);

  // Write aggregated CSV
  const aggregatedOutput = stringify(aggregatedJobs, {
    header: true,
    columns: ['city', 'state', 'tradeName', 'jobCount', 'latitude', 'longitude'],
  });
  fs.writeFileSync(AGGREGATED_FILE, aggregatedOutput);
  console.log(`Wrote aggregated jobs to: ${AGGREGATED_FILE}`);

  // Print summary
  console.log('\n--- Summary ---');
  console.log(`Total raw jobs: ${rawJobs.length}`);
  console.log(`Jobs after filtering (with Sales Rep): ${processedJobs.length}`);
  console.log(`Unique city/trade combinations: ${aggregatedJobs.length}`);
  console.log(`Successfully geocoded: ${geocodedCount}`);

  console.log('\nTop 10 cities by job count:');
  const cityTotals = new Map<string, number>();
  for (const job of aggregatedJobs) {
    const cityKey = `${job.city}, ${job.state}`;
    cityTotals.set(cityKey, (cityTotals.get(cityKey) || 0) + job.jobCount);
  }

  const topCities = Array.from(cityTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  for (const [city, count] of topCities) {
    console.log(`  ${city}: ${count} jobs`);
  }
}

processCSV().catch(console.error);
