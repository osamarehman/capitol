const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'strapi',
  user: process.env.DB_USER || 'strapi',
  password: process.env.DB_PASSWORD || 'strapi_dev_password_2024'
});

function htmlToBlocks(html) {
  if (!html || typeof html !== 'string' || html.trim() === '') return null;

  const blocks = [];
  let cleanHtml = html.replace(/\s*id="[^"]*"/g, '').replace(/&nbsp;/g, ' ');

  const blockRegex = /<(h[1-6]|p|ul|ol|div)([^>]*)>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = blockRegex.exec(cleanHtml)) !== null) {
    const tag = match[1].toLowerCase();
    let content = match[3].replace(/<[^>]*>/g, '').trim();

    if (!content) continue;

    if (tag.match(/^h[1-6]$/)) {
      blocks.push({ type: 'heading', level: parseInt(tag[1]), children: [{ type: 'text', text: content }] });
    } else if (tag === 'ul' || tag === 'ol') {
      const items = [];
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let liMatch;
      while ((liMatch = liRegex.exec(match[3])) !== null) {
        const itemText = liMatch[1].replace(/<[^>]*>/g, '').trim();
        if (itemText) items.push({ type: 'list-item', children: [{ type: 'text', text: itemText }] });
      }
      if (items.length > 0) blocks.push({ type: 'list', format: tag === 'ol' ? 'ordered' : 'unordered', children: items });
    } else {
      blocks.push({ type: 'paragraph', children: [{ type: 'text', text: content }] });
    }
  }

  if (blocks.length === 0 && cleanHtml.trim()) {
    const text = cleanHtml.replace(/<[^>]*>/g, '').trim();
    if (text) blocks.push({ type: 'paragraph', children: [{ type: 'text', text }] });
  }

  return blocks.length > 0 ? blocks : null;
}

async function migrateTable(table, columns) {
  try {
    const existing = await pool.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = $1",
      [table]
    );
    const existingCols = existing.rows.map(r => r.column_name);
    const colsToConvert = columns.filter(c => existingCols.includes(c));

    if (colsToConvert.length === 0) {
      console.log(`No matching columns in ${table}, skipping...`);
      return 0;
    }

    const rows = await pool.query(`SELECT id, ${colsToConvert.join(', ')} FROM ${table}`);
    let count = 0;

    for (const row of rows.rows) {
      const updates = [];
      const values = [];
      let idx = 1;

      for (const col of colsToConvert) {
        if (row[col] && typeof row[col] === 'string') {
          const blocks = htmlToBlocks(row[col]);
          if (blocks) {
            updates.push(`${col} = $${idx}`);
            values.push(JSON.stringify(blocks));
            idx++;
          }
        }
      }

      if (updates.length > 0) {
        values.push(row.id);
        await pool.query(`UPDATE ${table} SET ${updates.join(', ')} WHERE id = $${idx}`, values);
        count++;
      }
    }

    console.log(`Converted ${count} rows in ${table}`);
    return count;
  } catch (e) {
    console.log(`Error in ${table}: ${e.message}`);
    return 0;
  }
}

async function main() {
  console.log('Starting comprehensive blocks migration...\n');

  const tables = {
    blog: ['custom_content', 'faq_content', 'blog_summary', 'post_body'],
    city: ['main_story_rich_text', 'secondary_story_rich_text', 'supporting_text_rich_text', 'community_guidelines_rich_text', 'location_improvements_rich_text', 'consultant_title_description', 'recent_project_description', 'location_contact_details', 'echo_rich_text', 'services_modal_desc_1', 'services_modal_desc_2', 'services_modal_desc_3', 'services_modal_desc_4', 'services_modal_desc_5', 'services_modal_desc_6', 'services_modal_desc_7', 'residential_calc_header', 'map_section', 'custom_content', 'faq_content', 'faq_answer_1', 'faq_answer_2', 'faq_answer_3', 'faq_answer_4', 'faq_answer_5', 'faq_answer_6', 'faq_answer_7', 'faq_answer_8', 'faq_answer_9', 'faq_answer_10', 'faq_answer_11', 'faq_answer_12', 'faq_answer_13', 'faq_answer_14', 'faq_answer_15'],
    farmlands: ['custom_content', 'faq_content'],
    land: ['custom_content', 'faq_content'],
    lp: ['custom_content', 'faq_content'],
    james_hardie: ['custom_content', 'faq_content', 'slider_detail', 'feature_heading_text_1', 'feature_heading_text_2', 'feature_heading_text_3'],
    timbertech: ['custom_content', 'faq_content', 'slider_detail', 'feature_heading_text_1', 'feature_heading_text_2', 'feature_heading_text_3'],
    review_testimonials: ['custom_content', 'faq_content'],
    sales: ['custom_content', 'faq_content'],
    service_area_cities: ['custom_content', 'faq_content'],
    service_area_counties: ['custom_content', 'faq_content'],
    videos: ['custom_content', 'faq_content', 'video_copy']
  };

  let total = 0;
  for (const [table, cols] of Object.entries(tables)) {
    const count = await migrateTable(table, cols);
    total += count;
  }

  console.log(`\nTotal converted: ${total} rows`);
  await pool.end();
}

main().catch(e => { console.error(e); pool.end(); process.exit(1); });
