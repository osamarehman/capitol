/**
 * Database Migration: Convert richtext (HTML) to blocks (JSON) format
 *
 * This script directly updates the PostgreSQL database to convert
 * HTML content to Strapi's blocks JSON format before changing the schema.
 *
 * Run this BEFORE deploying the schema change from richtext to blocks.
 */

import { Pool } from 'pg';
import { CONFIG } from '../src/config/index.js';
import { logger } from '../src/utils/logger.js';

// Database connection
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'strapi',
  user: process.env.DB_USER || 'strapi',
  password: process.env.DB_PASSWORD || 'strapi',
});

// Strapi blocks types
interface TextNode {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface LinkNode {
  type: 'link';
  url: string;
  children: TextNode[];
}

type InlineNode = TextNode | LinkNode;

interface ParagraphBlock {
  type: 'paragraph';
  children: InlineNode[];
}

interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: InlineNode[];
}

interface ListItemBlock {
  type: 'list-item';
  children: InlineNode[];
}

interface ListBlock {
  type: 'list';
  format: 'ordered' | 'unordered';
  children: ListItemBlock[];
}

type Block = ParagraphBlock | HeadingBlock | ListBlock;

// Simple HTML parser to blocks converter
function htmlToBlocks(html: string | null | undefined): Block[] | null {
  if (!html || typeof html !== 'string' || html.trim() === '') {
    return null;
  }

  const blocks: Block[] = [];

  // Remove id attributes and clean up HTML
  let cleanHtml = html
    .replace(/\s*id="[^"]*"/g, '')
    .replace(/\s*id='[^']*'/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');

  // Parse HTML elements
  const elements = parseHtmlElements(cleanHtml);

  for (const element of elements) {
    const block = elementToBlock(element);
    if (block) {
      blocks.push(block);
    }
  }

  // If no blocks were created but there was content, create a paragraph
  if (blocks.length === 0 && cleanHtml.trim()) {
    const textContent = cleanHtml.replace(/<[^>]*>/g, '').trim();
    if (textContent) {
      blocks.push({
        type: 'paragraph',
        children: [{ type: 'text', text: textContent }]
      });
    }
  }

  return blocks.length > 0 ? blocks : null;
}

interface ParsedElement {
  tag: string;
  content: string;
  attributes: Record<string, string>;
}

function parseHtmlElements(html: string): ParsedElement[] {
  const elements: ParsedElement[] = [];
  const blockRegex = /<(h[1-6]|p|ul|ol|li|blockquote|pre|div)([^>]*)>([\s\S]*?)<\/\1>/gi;

  let match;
  let lastIndex = 0;

  while ((match = blockRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const betweenText = html.slice(lastIndex, match.index).trim();
      if (betweenText && !betweenText.match(/^[\s\n]*$/)) {
        elements.push({
          tag: 'text',
          content: betweenText.replace(/<[^>]*>/g, ''),
          attributes: {}
        });
      }
    }

    const tag = match[1].toLowerCase();
    const attrString = match[2];
    const content = match[3];

    const attributes: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }

    elements.push({ tag, content, attributes });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex).trim();
    if (remaining && !remaining.match(/^[\s\n]*$/)) {
      const textContent = remaining.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();
      if (textContent) {
        elements.push({
          tag: 'text',
          content: textContent,
          attributes: {}
        });
      }
    }
  }

  if (elements.length === 0 && html.trim()) {
    const textContent = html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, '').trim();
    if (textContent) {
      elements.push({
        tag: 'text',
        content: textContent,
        attributes: {}
      });
    }
  }

  return elements;
}

function elementToBlock(element: ParsedElement): Block | null {
  const { tag, content } = element;

  switch (tag) {
    case 'h1':
      return { type: 'heading', level: 1, children: parseInlineContent(content) };
    case 'h2':
      return { type: 'heading', level: 2, children: parseInlineContent(content) };
    case 'h3':
      return { type: 'heading', level: 3, children: parseInlineContent(content) };
    case 'h4':
      return { type: 'heading', level: 4, children: parseInlineContent(content) };
    case 'h5':
      return { type: 'heading', level: 5, children: parseInlineContent(content) };
    case 'h6':
      return { type: 'heading', level: 6, children: parseInlineContent(content) };
    case 'p':
    case 'div':
    case 'text':
      const inlineNodes = parseInlineContent(content);
      if (inlineNodes.length === 0) return null;
      return { type: 'paragraph', children: inlineNodes };
    case 'ul':
      return parseList(content, 'unordered');
    case 'ol':
      return parseList(content, 'ordered');
    default:
      return null;
  }
}

function parseInlineContent(html: string): InlineNode[] {
  const nodes: InlineNode[] = [];

  if (!html || !html.trim()) {
    return nodes;
  }

  const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      const beforeText = html.slice(lastIndex, match.index);
      const textNodes = parseTextFormatting(beforeText);
      nodes.push(...textNodes);
    }

    const url = match[1];
    const linkText = match[2].replace(/<[^>]*>/g, '').trim();
    if (linkText) {
      nodes.push({
        type: 'link',
        url: url,
        children: [{ type: 'text', text: linkText }]
      });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex);
    const textNodes = parseTextFormatting(remaining);
    nodes.push(...textNodes);
  }

  if (nodes.length === 0) {
    const textNodes = parseTextFormatting(html);
    nodes.push(...textNodes);
  }

  return nodes;
}

function parseTextFormatting(html: string): TextNode[] {
  const nodes: TextNode[] = [];

  let text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(strong|b)>/gi, '')
    .replace(/<\/?(em|i)>/gi, '')
    .replace(/<\/?(u)>/gi, '')
    .replace(/<\/?(s|strike|del)>/gi, '')
    .replace(/<\/?(code)>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();

  if (text) {
    const isBold = /<(strong|b)>/i.test(html);
    const isItalic = /<(em|i)>/i.test(html);
    const isUnderline = /<u>/i.test(html);
    const isStrikethrough = /<(s|strike|del)>/i.test(html);
    const isCode = /<code>/i.test(html);

    const node: TextNode = { type: 'text', text };
    if (isBold) node.bold = true;
    if (isItalic) node.italic = true;
    if (isUnderline) node.underline = true;
    if (isStrikethrough) node.strikethrough = true;
    if (isCode) node.code = true;

    nodes.push(node);
  }

  return nodes;
}

function parseList(html: string, format: 'ordered' | 'unordered'): ListBlock {
  const items: ListItemBlock[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = liRegex.exec(html)) !== null) {
    const itemContent = match[1];
    const inlineNodes = parseInlineContent(itemContent);
    if (inlineNodes.length > 0) {
      items.push({
        type: 'list-item',
        children: inlineNodes
      });
    }
  }

  if (items.length === 0) {
    const textContent = html.replace(/<[^>]*>/g, '').trim();
    if (textContent) {
      items.push({
        type: 'list-item',
        children: [{ type: 'text', text: textContent }]
      });
    }
  }

  return {
    type: 'list',
    format,
    children: items
  };
}

// Tables and their richtext columns to convert
const TABLES_AND_COLUMNS: Record<string, string[]> = {
  'services': [
    'main_story_rich_text', 'secondary_story_rich_text', 'supporting_text_rich_text',
    'community_guidelines_rich_text', 'location_improvements_rich_text', 'consultant_title_description',
    'recent_project_description', 'echo_rich_text', 'location_contact_details', 'residential_calc_header',
    'map_section', 'custom_content', 'faq_content',
    'services_modal_desc_1', 'services_modal_desc_2', 'services_modal_desc_3',
    'services_modal_desc_4', 'services_modal_desc_5', 'services_modal_desc_6',
    'faq_answer_1', 'faq_answer_2', 'faq_answer_3', 'faq_answer_4', 'faq_answer_5',
    'faq_answer_6', 'faq_answer_7', 'faq_answer_8', 'faq_answer_9', 'faq_answer_10',
    'faq_answer_11', 'faq_answer_12', 'faq_answer_13', 'faq_answer_14', 'faq_answer_15',
    // Old field names that might still exist
    'service_faq_desc_1', 'service_faq_desc_2', 'service_faq_desc_3',
    'service_faq_desc_4', 'service_faq_desc_5', 'service_faq_desc_6', 'service_faq_desc_7'
  ],
  'maryland': [
    'main_story_rich_text', 'secondary_story_rich_text', 'supporting_text_rich_text',
    'community_guidelines_rich_text', 'location_improvements_rich_text', 'consultant_title_description',
    'recent_project_description', 'echo_rich_text', 'location_contact_details', 'residential_calc_header',
    'map_section', 'custom_content', 'faq_content',
    'services_modal_desc_1', 'services_modal_desc_2', 'services_modal_desc_3',
    'services_modal_desc_4', 'services_modal_desc_5', 'services_modal_desc_6',
    'faq_answer_1', 'faq_answer_2', 'faq_answer_3', 'faq_answer_4', 'faq_answer_5',
    'faq_answer_6', 'faq_answer_7', 'faq_answer_8', 'faq_answer_9', 'faq_answer_10',
    'faq_answer_11', 'faq_answer_12', 'faq_answer_13', 'faq_answer_14', 'faq_answer_15',
    'service_faq_desc_1', 'service_faq_desc_2', 'service_faq_desc_3',
    'service_faq_desc_4', 'service_faq_desc_5', 'service_faq_desc_6', 'service_faq_desc_7'
  ],
  'virginia': [
    'main_story_rich_text', 'secondary_story_rich_text', 'supporting_text_rich_text',
    'community_guidelines_rich_text', 'location_improvements_rich_text', 'consultant_title_description',
    'recent_project_description', 'echo_rich_text', 'location_contact_details', 'residential_calc_header',
    'map_section', 'custom_content', 'faq_content',
    'services_modal_desc_1', 'services_modal_desc_2', 'services_modal_desc_3',
    'services_modal_desc_4', 'services_modal_desc_5', 'services_modal_desc_6',
    'faq_answer_1', 'faq_answer_2', 'faq_answer_3', 'faq_answer_4', 'faq_answer_5',
    'faq_answer_6', 'faq_answer_7', 'faq_answer_8', 'faq_answer_9', 'faq_answer_10',
    'faq_answer_11', 'faq_answer_12', 'faq_answer_13', 'faq_answer_14', 'faq_answer_15',
    'service_faq_desc_1', 'service_faq_desc_2', 'service_faq_desc_3',
    'service_faq_desc_4', 'service_faq_desc_5', 'service_faq_desc_6', 'service_faq_desc_7'
  ],
  'cities': [
    'main_story_rich_text', 'secondary_story_rich_text', 'supporting_text_rich_text',
    'community_guidelines_rich_text', 'location_improvements_rich_text', 'consultant_title_description',
    'recent_project_description', 'echo_rich_text', 'location_contact_details', 'residential_calc_header',
    'map_section', 'custom_content', 'faq_content',
    'services_modal_desc_1', 'services_modal_desc_2', 'services_modal_desc_3',
    'services_modal_desc_4', 'services_modal_desc_5', 'services_modal_desc_6',
    'faq_answer_1', 'faq_answer_2', 'faq_answer_3', 'faq_answer_4', 'faq_answer_5',
    'faq_answer_6', 'faq_answer_7', 'faq_answer_8', 'faq_answer_9', 'faq_answer_10',
    'faq_answer_11', 'faq_answer_12', 'faq_answer_13', 'faq_answer_14', 'faq_answer_15',
    'service_faq_desc_1', 'service_faq_desc_2', 'service_faq_desc_3',
    'service_faq_desc_4', 'service_faq_desc_5', 'service_faq_desc_6', 'service_faq_desc_7'
  ],
  'blogs': ['content_rich_text', 'post_body'],
  'blog_alt': ['content_rich_text', 'post_body'],
};

async function getExistingColumns(tableName: string): Promise<string[]> {
  const result = await pool.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = $1
  `, [tableName]);
  return result.rows.map(row => row.column_name);
}

async function convertTable(tableName: string, columns: string[]): Promise<number> {
  logger.info(`\nProcessing table: ${tableName}`);

  // Check if table exists
  const tableCheck = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_name = $1
    )
  `, [tableName]);

  if (!tableCheck.rows[0].exists) {
    logger.warn(`Table ${tableName} does not exist, skipping...`);
    return 0;
  }

  // Get existing columns
  const existingColumns = await getExistingColumns(tableName);
  const columnsToConvert = columns.filter(col => existingColumns.includes(col));

  if (columnsToConvert.length === 0) {
    logger.warn(`No matching columns found in ${tableName}`);
    return 0;
  }

  logger.info(`Converting columns: ${columnsToConvert.join(', ')}`);

  // Fetch all rows
  const rows = await pool.query(`SELECT id, ${columnsToConvert.join(', ')} FROM ${tableName}`);
  let converted = 0;

  for (const row of rows.rows) {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    for (const column of columnsToConvert) {
      const htmlValue = row[column];
      if (htmlValue && typeof htmlValue === 'string') {
        const blocks = htmlToBlocks(htmlValue);
        if (blocks) {
          updates.push(`${column} = $${paramIndex}`);
          values.push(JSON.stringify(blocks));
          paramIndex++;
        }
      }
    }

    if (updates.length > 0) {
      values.push(row.id);
      const query = `UPDATE ${tableName} SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
      await pool.query(query, values);
      converted++;
    }
  }

  logger.info(`Converted ${converted} rows in ${tableName}`);
  return converted;
}

async function main() {
  logger.info('Starting database migration: richtext to blocks...');
  logger.info('Database: ' + (process.env.DB_HOST || 'localhost'));

  let totalConverted = 0;

  try {
    for (const [table, columns] of Object.entries(TABLES_AND_COLUMNS)) {
      const converted = await convertTable(table, columns);
      totalConverted += converted;
    }

    logger.info(`\n=== Migration Summary ===`);
    logger.info(`Total rows converted: ${totalConverted}`);
    logger.info('\nIMPORTANT: Now you can deploy the schema change (richtext -> blocks)');
  } catch (error) {
    logger.error('Migration failed:', (error as Error).message);
    throw error;
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  logger.error('Migration failed:', error);
  process.exit(1);
});
