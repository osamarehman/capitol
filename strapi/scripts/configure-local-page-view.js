/**
 * Configure Local Pages content-manager view to match schema.json field order
 * Run with: DB_HOST=localhost DB_PORT=5432 DB_NAME=strapi DB_USER=strapi DB_PASSWORD=strapi_dev_password_2024 node scripts/configure-local-page-view.js
 */

const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'strapi',
  user: process.env.DB_USER || 'strapi',
  password: process.env.DB_PASSWORD || 'strapi_dev_password_2024',
});

// Edit layout - fields arranged in rows matching schema.json order
// Each row is an array of {name, size} where size is out of 12 columns
const editLayout = [
  // Basic Info
  [{ name: 'title', size: 6 }, { name: 'slug', size: 6 }],

  // SEO
  [{ name: 'seoTitleTag', size: 6 }, { name: 'seoMetaDescription', size: 6 }],

  // Header Section
  [{ name: 'h1Hangline', size: 6 }, { name: 'headerDescription', size: 6 }],
  [{ name: 'buttonTextHeaderCta', size: 4 }, { name: 'headerVideo', size: 4 }, { name: 'headerVideoCode', size: 4 }],

  // Recent Project Section
  [{ name: 'recentProjectHeadline', size: 6 }, { name: 'recentProjectHangline', size: 6 }],
  [{ name: 'recentProjectDescription', size: 12 }],

  // Story Sections
  [{ name: 'mainStoryRichText', size: 12 }],
  [{ name: 'secondaryStoryRichText', size: 12 }],
  [{ name: 'supportingTextRichText', size: 12 }],
  [{ name: 'communityGuidelinesRichText', size: 12 }],
  [{ name: 'locationImprovementsRichText', size: 12 }],
  [{ name: 'consultantTitleDescription', size: 12 }],

  // Project Images
  [{ name: 'recentProjectKeywordImage', size: 6 }, { name: 'altTextForKeywordImage', size: 6 }],
  [{ name: 'projectImage1', size: 6 }, { name: 'altTextForProjectImage1', size: 6 }],
  [{ name: 'projectImage2', size: 6 }, { name: 'altTextForProjectImage2', size: 6 }],
  [{ name: 'projectImage3', size: 6 }, { name: 'altTextForProjectImage3', size: 6 }],

  // Services
  [{ name: 'servicesBodyText', size: 12 }],

  // Consultant Section
  [{ name: 'projectConsultant1Image', size: 6 }, { name: 'projectConsultant2Image', size: 6 }],
  [{ name: 'projectConsultantName', size: 4 }, { name: 'projectConsultantTitle', size: 4 }, { name: 'buttonTextConsultantCta', size: 4 }],

  // Map Section
  [{ name: 'mapHeaderText', size: 6 }, { name: 'mapDescriptionText', size: 6 }],
  [{ name: 'locationContactDetails', size: 12 }],
  [{ name: 'mapLocation', size: 6 }],
  [{ name: 'mapSection', size: 12 }],

  // Review Section
  [{ name: 'testimonialVideo', size: 6 }, { name: 'localReviewHeader', size: 6 }],
  [{ name: 'reviewText', size: 12 }],
  [{ name: 'nameOfReviewer', size: 6 }, { name: 'googleReviewLink', size: 6 }],

  // Echo Section
  [{ name: 'echoRichText', size: 12 }],

  // Open Graph
  [{ name: 'openGraphImageUrl', size: 4 }, { name: 'openGraphTitle', size: 4 }, { name: 'openGraphDescription', size: 4 }],

  // Weather Widget
  [{ name: 'weatherWidget', size: 3 }, { name: 'weatherWidgetLocationText', size: 3 }, { name: 'weatherWidgetRightHeader', size: 3 }, { name: 'weatherWidgetRightParagraphText', size: 3 }],

  // Residential Calc
  [{ name: 'residentialCalc', size: 4 }, { name: 'residentialCalcHeader', size: 8 }],

  // Gallery
  [{ name: 'galleryMultiImages', size: 12 }],

  // Services Modal
  [{ name: 'servicesModalHeading', size: 12 }],
  [{ name: 'servicesModal1', size: 6 }, { name: 'servicesModalDesc1', size: 6 }],
  [{ name: 'servicesModal2', size: 6 }, { name: 'servicesModalDesc2', size: 6 }],
  [{ name: 'servicesModal3', size: 6 }, { name: 'servicesModalDesc3', size: 6 }],
  [{ name: 'servicesModal4', size: 6 }, { name: 'servicesModalDesc4', size: 6 }],
  [{ name: 'servicesModal5', size: 6 }, { name: 'servicesModalDesc5', size: 6 }],
  [{ name: 'servicesModal6', size: 6 }, { name: 'servicesModalDesc6', size: 6 }],

  // Schema & Custom
  [{ name: 'schemaMarkup', size: 6 }, { name: 'customHtml', size: 6 }],
  [{ name: 'customContent', size: 12 }],

  // FAQ Section
  [{ name: 'faqContent', size: 12 }],
  [{ name: 'faqQuestion1', size: 4 }, { name: 'faqAnswer1', size: 8 }],
  [{ name: 'faqQuestion2', size: 4 }, { name: 'faqAnswer2', size: 8 }],
  [{ name: 'faqQuestion3', size: 4 }, { name: 'faqAnswer3', size: 8 }],
  [{ name: 'faqQuestion4', size: 4 }, { name: 'faqAnswer4', size: 8 }],
  [{ name: 'faqQuestion5', size: 4 }, { name: 'faqAnswer5', size: 8 }],
  [{ name: 'faqQuestion6', size: 4 }, { name: 'faqAnswer6', size: 8 }],
  [{ name: 'faqQuestion7', size: 4 }, { name: 'faqAnswer7', size: 8 }],
  [{ name: 'faqQuestion8', size: 4 }, { name: 'faqAnswer8', size: 8 }],
  [{ name: 'faqQuestion9', size: 4 }, { name: 'faqAnswer9', size: 8 }],
  [{ name: 'faqQuestion10', size: 4 }, { name: 'faqAnswer10', size: 8 }],
  [{ name: 'faqQuestion11', size: 4 }, { name: 'faqAnswer11', size: 8 }],
  [{ name: 'faqQuestion12', size: 4 }, { name: 'faqAnswer12', size: 8 }],
  [{ name: 'faqQuestion13', size: 4 }, { name: 'faqAnswer13', size: 8 }],
  [{ name: 'faqQuestion14', size: 4 }, { name: 'faqAnswer14', size: 8 }],
  [{ name: 'faqQuestion15', size: 4 }, { name: 'faqAnswer15', size: 8 }],
];

// List view - columns to show in the table
const listLayout = ['id', 'title', 'slug', 'seoTitleTag'];

async function configureView() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Get current config
    const { rows } = await client.query(`
      SELECT value FROM strapi_core_store_settings
      WHERE key = 'plugin_content_manager_configuration_content_types::api::local-page.local-page'
    `);

    if (rows.length === 0) {
      console.error('Configuration not found!');
      return;
    }

    const config = JSON.parse(rows[0].value);

    // Update layouts
    config.layouts = config.layouts || {};
    config.layouts.edit = editLayout;
    config.layouts.list = listLayout;

    // Update the database
    await client.query(`
      UPDATE strapi_core_store_settings
      SET value = $1
      WHERE key = 'plugin_content_manager_configuration_content_types::api::local-page.local-page'
    `, [JSON.stringify(config)]);

    console.log('Configuration updated successfully!');
    console.log(`Edit layout: ${editLayout.length} rows`);
    console.log(`List layout: ${listLayout.length} columns`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

configureView();
