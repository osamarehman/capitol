/**
 * Convert Strapi Blocks format to HTML for CKEditor fields
 * Run with: node scripts/convert-blocks-to-html.js
 */

const { Client } = require('pg');

// Database connection
const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'strapi',
  user: process.env.DB_USER || 'strapi',
  password: process.env.DB_PASSWORD || 'strapi',
});

// Fields to convert in the services table (local-page)
const FIELDS_TO_CONVERT = [
  'recent_project_description',
  'main_story_rich_text',
  'secondary_story_rich_text',
  'supporting_text_rich_text',
  'community_guidelines_rich_text',
  'location_improvements_rich_text',
  'consultant_title_description',
  'location_contact_details',
  'echo_rich_text',
  'residential_calc_header',
  'map_section',
  'services_modal_desc_1',
  'services_modal_desc_2',
  'services_modal_desc_3',
  'services_modal_desc_4',
  'services_modal_desc_5',
  'services_modal_desc_6',
  'custom_content',
  'faq_content',
  'faq_answer_1',
  'faq_answer_2',
  'faq_answer_3',
  'faq_answer_4',
  'faq_answer_5',
  'faq_answer_6',
  'faq_answer_7',
  'faq_answer_8',
  'faq_answer_9',
  'faq_answer_10',
  'faq_answer_11',
  'faq_answer_12',
  'faq_answer_13',
  'faq_answer_14',
  'faq_answer_15',
];

/**
 * Convert a text node to HTML
 */
function textToHtml(node) {
  let text = node.text || '';

  // Handle text formatting
  if (node.bold) text = `<strong>${text}</strong>`;
  if (node.italic) text = `<em>${text}</em>`;
  if (node.underline) text = `<u>${text}</u>`;
  if (node.strikethrough) text = `<s>${text}</s>`;
  if (node.code) text = `<code>${text}</code>`;

  return text;
}

/**
 * Convert children nodes to HTML
 */
function childrenToHtml(children) {
  if (!children || !Array.isArray(children)) return '';

  return children.map(child => {
    if (child.type === 'text') {
      return textToHtml(child);
    } else if (child.type === 'link') {
      const linkText = childrenToHtml(child.children);
      return `<a href="${child.url || '#'}">${linkText}</a>`;
    } else {
      return textToHtml(child);
    }
  }).join('');
}

/**
 * Convert a single block to HTML
 */
function blockToHtml(block) {
  if (!block || !block.type) return '';

  const content = childrenToHtml(block.children);

  switch (block.type) {
    case 'paragraph':
      return `<p>${content}</p>`;
    case 'heading':
      const level = block.level || 2;
      return `<h${level}>${content}</h${level}>`;
    case 'list':
      const listTag = block.format === 'ordered' ? 'ol' : 'ul';
      const items = (block.children || []).map(item => {
        if (item.type === 'list-item') {
          return `<li>${childrenToHtml(item.children)}</li>`;
        }
        return '';
      }).join('');
      return `<${listTag}>${items}</${listTag}>`;
    case 'quote':
      return `<blockquote>${content}</blockquote>`;
    case 'code':
      return `<pre><code>${content}</code></pre>`;
    case 'image':
      return `<img src="${block.image?.url || ''}" alt="${block.image?.alternativeText || ''}" />`;
    default:
      return content ? `<p>${content}</p>` : '';
  }
}

/**
 * Convert blocks array to HTML string
 */
function blocksToHtml(blocksJson) {
  if (!blocksJson) return null;

  try {
    // Parse if it's a string
    const blocks = typeof blocksJson === 'string' ? JSON.parse(blocksJson) : blocksJson;

    if (!Array.isArray(blocks)) {
      // If it's already HTML (string that doesn't start with [), return as-is
      if (typeof blocksJson === 'string' && !blocksJson.trim().startsWith('[')) {
        return blocksJson;
      }
      return null;
    }

    return blocks.map(blockToHtml).join('\n');
  } catch (e) {
    // If parsing fails, it might already be HTML
    console.log(`  Note: Could not parse as JSON, keeping original value`);
    return blocksJson;
  }
}

/**
 * Main conversion function
 */
async function convertBlocksToHtml() {
  try {
    await client.connect();
    console.log('Connected to database');

    // Get all records from services table
    const { rows } = await client.query('SELECT id, document_id FROM services');
    console.log(`Found ${rows.length} records in services table`);

    let updatedCount = 0;
    let fieldUpdateCount = 0;

    for (const row of rows) {
      // Fetch the full record
      const { rows: [record] } = await client.query(
        `SELECT * FROM services WHERE id = $1`,
        [row.id]
      );

      const updates = {};

      for (const field of FIELDS_TO_CONVERT) {
        const value = record[field];
        if (value && typeof value === 'string' && value.trim().startsWith('[')) {
          const html = blocksToHtml(value);
          if (html && html !== value) {
            updates[field] = html;
          }
        }
      }

      if (Object.keys(updates).length > 0) {
        // Build UPDATE query
        const setClauses = Object.keys(updates).map((key, i) => `${key} = $${i + 2}`);
        const values = [row.id, ...Object.values(updates)];

        await client.query(
          `UPDATE services SET ${setClauses.join(', ')} WHERE id = $1`,
          values
        );

        updatedCount++;
        fieldUpdateCount += Object.keys(updates).length;

        if (updatedCount % 50 === 0) {
          console.log(`  Processed ${updatedCount} records...`);
        }
      }
    }

    console.log(`\nConversion complete!`);
    console.log(`  Records updated: ${updatedCount}`);
    console.log(`  Fields converted: ${fieldUpdateCount}`);

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the conversion
convertBlocksToHtml().catch(console.error);
