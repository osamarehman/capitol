/**
 * Data Integrity Check Script for Production
 * Verifies: assets, alt texts, content integrity
 *
 * Run with: DB_HOST=<host> DB_PORT=5432 DB_NAME=strapi DB_USER=strapi DB_PASSWORD=<password> node scripts/verify-data-integrity.js
 *
 * This script is READ-ONLY and does not modify any data.
 */

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'strapi',
  user: process.env.DB_USER || 'strapi',
  password: process.env.DB_PASSWORD || 'strapi_dev_password_2024',
});

// Collections to check
const COLLECTIONS = [
  { table: 'services', name: 'Local Pages', imageFields: ['recent_project_keyword_image', 'project_image_1', 'project_image_2', 'project_image_3', 'project_consultant_1_image', 'project_consultant_2_image', 'open_graph_image_url'], altFields: ['alt_text_for_keyword_image', 'alt_text_for_project_image_1', 'alt_text_for_project_image_2', 'alt_text_for_project_image_3'], richtextFields: ['recent_project_description', 'main_story_rich_text', 'secondary_story_rich_text', 'location_contact_details'] },
];

// Results storage
const results = {
  totalRecords: 0,
  issues: [],
  summary: {
    missingAssets: 0,
    missingAltTexts: 0,
    blocksFormatRemaining: 0,
    emptyRequiredFields: 0,
  }
};

async function checkCollection(collection) {
  console.log(`\n📋 Checking ${collection.name} (${collection.table})...`);

  const { rows } = await client.query(`SELECT * FROM ${collection.table}`);
  console.log(`   Found ${rows.length} records`);
  results.totalRecords += rows.length;

  let collectionIssues = {
    missingAssets: [],
    missingAltTexts: [],
    blocksFormat: [],
    emptyRequired: [],
  };

  for (const row of rows) {
    // Check for blocks format remaining in richtext fields
    for (const field of collection.richtextFields || []) {
      const value = row[field];
      if (value && typeof value === 'string' && value.trim().startsWith('[{')) {
        try {
          JSON.parse(value);
          collectionIssues.blocksFormat.push({
            id: row.id,
            documentId: row.document_id,
            title: row.title || row.name,
            field,
          });
          results.summary.blocksFormatRemaining++;
        } catch (e) {
          // Not JSON, probably HTML - good
        }
      }
    }

    // Check alt text fields have values when corresponding image exists
    for (let i = 0; i < (collection.imageFields || []).length; i++) {
      const imageField = collection.imageFields[i];
      const altField = collection.altFields?.[i];

      if (altField && row[imageField] && !row[altField]) {
        collectionIssues.missingAltTexts.push({
          id: row.id,
          documentId: row.document_id,
          title: row.title || row.name,
          imageField,
          altField,
        });
        results.summary.missingAltTexts++;
      }
    }
  }

  // Report collection issues
  if (collectionIssues.blocksFormat.length > 0) {
    console.log(`   ⚠️  ${collectionIssues.blocksFormat.length} records still have blocks format data`);
    results.issues.push(...collectionIssues.blocksFormat.map(i => ({
      type: 'BLOCKS_FORMAT',
      collection: collection.name,
      ...i
    })));
  }

  if (collectionIssues.missingAltTexts.length > 0) {
    console.log(`   ⚠️  ${collectionIssues.missingAltTexts.length} records missing alt texts`);
    results.issues.push(...collectionIssues.missingAltTexts.map(i => ({
      type: 'MISSING_ALT_TEXT',
      collection: collection.name,
      ...i
    })));
  }

  if (collectionIssues.blocksFormat.length === 0 && collectionIssues.missingAltTexts.length === 0) {
    console.log(`   ✅ All checks passed`);
  }
}

async function checkAssets() {
  console.log(`\n🖼️  Checking Media Assets...`);

  // Count total files
  const { rows: files } = await client.query(`SELECT COUNT(*) as count FROM files`);
  console.log(`   Total files in media library: ${files[0].count}`);

  // Check for files without URLs
  const { rows: missingUrls } = await client.query(`SELECT id, name FROM files WHERE url IS NULL OR url = ''`);
  if (missingUrls.length > 0) {
    console.log(`   ⚠️  ${missingUrls.length} files missing URLs`);
    results.summary.missingAssets += missingUrls.length;
    results.issues.push(...missingUrls.map(f => ({
      type: 'MISSING_URL',
      fileId: f.id,
      fileName: f.name,
    })));
  }

  // Check for orphaned files (no relations)
  const { rows: orphanedCount } = await client.query(`
    SELECT COUNT(*) as count FROM files f
    WHERE NOT EXISTS (SELECT 1 FROM files_related_mph frm WHERE frm.file_id = f.id)
  `);
  console.log(`   Files not linked to any content: ${orphanedCount[0].count}`);

  // Check files with alt text
  const { rows: altTextStats } = await client.query(`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN alternative_text IS NOT NULL AND alternative_text != '' THEN 1 END) as with_alt
    FROM files
  `);
  const altTextPercent = ((altTextStats[0].with_alt / altTextStats[0].total) * 100).toFixed(1);
  console.log(`   Files with alt text: ${altTextStats[0].with_alt}/${altTextStats[0].total} (${altTextPercent}%)`);
}

async function checkContentIntegrity() {
  console.log(`\n📝 Checking Content Integrity...`);

  // Check for duplicate document_ids (should be 2 per document - draft and published)
  const { rows: duplicates } = await client.query(`
    SELECT document_id, COUNT(*) as count
    FROM services
    GROUP BY document_id
    HAVING COUNT(*) > 2
  `);

  if (duplicates.length > 0) {
    console.log(`   ⚠️  ${duplicates.length} documents have more than 2 versions (unexpected)`);
  } else {
    console.log(`   ✅ Document versioning looks correct`);
  }

  // Check published vs draft counts
  const { rows: publishStats } = await client.query(`
    SELECT
      COUNT(*) as total,
      COUNT(CASE WHEN published_at IS NOT NULL THEN 1 END) as published,
      COUNT(CASE WHEN published_at IS NULL THEN 1 END) as draft
    FROM services
  `);
  console.log(`   Local Pages: ${publishStats[0].total} total (${publishStats[0].published} published, ${publishStats[0].draft} drafts)`);
}

async function runChecks() {
  try {
    await client.connect();
    console.log('🔗 Connected to database');
    console.log('=' .repeat(60));
    console.log('DATA INTEGRITY CHECK');
    console.log('=' .repeat(60));

    // Check each collection
    for (const collection of COLLECTIONS) {
      await checkCollection(collection);
    }

    // Check assets
    await checkAssets();

    // Check content integrity
    await checkContentIntegrity();

    // Print summary
    console.log('\n' + '=' .repeat(60));
    console.log('SUMMARY');
    console.log('=' .repeat(60));
    console.log(`Total records checked: ${results.totalRecords}`);
    console.log(`Issues found: ${results.issues.length}`);
    console.log(`  - Blocks format remaining: ${results.summary.blocksFormatRemaining}`);
    console.log(`  - Missing alt texts: ${results.summary.missingAltTexts}`);
    console.log(`  - Missing assets: ${results.summary.missingAssets}`);

    if (results.issues.length > 0) {
      console.log('\n📋 DETAILED ISSUES:');
      console.log(JSON.stringify(results.issues.slice(0, 20), null, 2));
      if (results.issues.length > 20) {
        console.log(`... and ${results.issues.length - 20} more issues`);
      }
    }

    console.log('\n' + '=' .repeat(60));
    if (results.issues.length === 0) {
      console.log('✅ ALL CHECKS PASSED - Data integrity verified!');
    } else {
      console.log('⚠️  ISSUES FOUND - Review the details above');
    }
    console.log('=' .repeat(60));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed');
  }
}

runChecks();
