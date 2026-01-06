/**
 * Convert HTML richtext content to Strapi blocks format
 *
 * This script fetches all records with richtext fields and converts
 * the HTML content to Strapi's blocks format.
 */

import axios from 'axios';
import { CONFIG } from '../src/config/index.js';
import { logger } from '../src/utils/logger.js';

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

interface QuoteBlock {
  type: 'quote';
  children: InlineNode[];
}

interface CodeBlock {
  type: 'code';
  children: TextNode[];
}

type Block = ParagraphBlock | HeadingBlock | ListBlock | QuoteBlock | CodeBlock;

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

  // Match block-level elements
  const blockRegex = /<(h[1-6]|p|ul|ol|li|blockquote|pre|div)([^>]*)>([\s\S]*?)<\/\1>/gi;

  let match;
  let lastIndex = 0;

  while ((match = blockRegex.exec(html)) !== null) {
    // Check for text between elements
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

    // Parse attributes
    const attributes: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrString)) !== null) {
      attributes[attrMatch[1]] = attrMatch[2];
    }

    elements.push({ tag, content, attributes });
    lastIndex = match.index + match[0].length;
  }

  // Handle remaining text
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

  // If no block elements found, treat entire content as paragraph
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
    case 'blockquote':
      return { type: 'quote', children: parseInlineContent(content) };
    case 'pre':
      return { type: 'code', children: [{ type: 'text', text: content.replace(/<[^>]*>/g, '') }] };
    default:
      return null;
  }
}

function parseInlineContent(html: string): InlineNode[] {
  const nodes: InlineNode[] = [];

  if (!html || !html.trim()) {
    return nodes;
  }

  // Process links
  const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    // Text before link
    if (match.index > lastIndex) {
      const beforeText = html.slice(lastIndex, match.index);
      const textNodes = parseTextFormatting(beforeText);
      nodes.push(...textNodes);
    }

    // Link node
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

  // Remaining text after last link
  if (lastIndex < html.length) {
    const remaining = html.slice(lastIndex);
    const textNodes = parseTextFormatting(remaining);
    nodes.push(...textNodes);
  }

  // If no links were found, parse the entire content for formatting
  if (nodes.length === 0) {
    const textNodes = parseTextFormatting(html);
    nodes.push(...textNodes);
  }

  return nodes;
}

function parseTextFormatting(html: string): TextNode[] {
  const nodes: TextNode[] = [];

  // Remove HTML tags but preserve text
  let text = html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(strong|b)>/gi, '') // Bold tags
    .replace(/<\/?(em|i)>/gi, '')     // Italic tags
    .replace(/<\/?(u)>/gi, '')        // Underline tags
    .replace(/<\/?(s|strike|del)>/gi, '') // Strikethrough tags
    .replace(/<\/?(code)>/gi, '')     // Code tags
    .replace(/<[^>]*>/g, '')          // All other tags
    .trim();

  if (text) {
    // Check for formatting in original HTML
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

  // Match list items
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

  // If no items found, create one from content
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

// Content types and their richtext (now blocks) fields
const CONTENT_TYPES_FIELDS: Record<string, string[]> = {
  'services': [
    'mainStoryRichText', 'secondaryStoryRichText', 'supportingTextRichText',
    'communityGuidelinesRichText', 'locationImprovementsRichText', 'consultantTitleDescription',
    'recentProjectDescription', 'echoRichText', 'locationContactDetails', 'residentialCalcHeader',
    'mapSection', 'customContent', 'faqContent',
    'servicesModalDesc1', 'servicesModalDesc2', 'servicesModalDesc3',
    'servicesModalDesc4', 'servicesModalDesc5', 'servicesModalDesc6',
    'faqAnswer1', 'faqAnswer2', 'faqAnswer3', 'faqAnswer4', 'faqAnswer5',
    'faqAnswer6', 'faqAnswer7', 'faqAnswer8', 'faqAnswer9', 'faqAnswer10',
    'faqAnswer11', 'faqAnswer12', 'faqAnswer13', 'faqAnswer14', 'faqAnswer15'
  ],
  'maryland': [
    'mainStoryRichText', 'secondaryStoryRichText', 'supportingTextRichText',
    'communityGuidelinesRichText', 'locationImprovementsRichText', 'consultantTitleDescription',
    'recentProjectDescription', 'echoRichText', 'locationContactDetails', 'residentialCalcHeader',
    'mapSection', 'customContent', 'faqContent',
    'servicesModalDesc1', 'servicesModalDesc2', 'servicesModalDesc3',
    'servicesModalDesc4', 'servicesModalDesc5', 'servicesModalDesc6',
    'faqAnswer1', 'faqAnswer2', 'faqAnswer3', 'faqAnswer4', 'faqAnswer5',
    'faqAnswer6', 'faqAnswer7', 'faqAnswer8', 'faqAnswer9', 'faqAnswer10',
    'faqAnswer11', 'faqAnswer12', 'faqAnswer13', 'faqAnswer14', 'faqAnswer15'
  ],
  'virginia': [
    'mainStoryRichText', 'secondaryStoryRichText', 'supportingTextRichText',
    'communityGuidelinesRichText', 'locationImprovementsRichText', 'consultantTitleDescription',
    'recentProjectDescription', 'echoRichText', 'locationContactDetails', 'residentialCalcHeader',
    'mapSection', 'customContent', 'faqContent',
    'servicesModalDesc1', 'servicesModalDesc2', 'servicesModalDesc3',
    'servicesModalDesc4', 'servicesModalDesc5', 'servicesModalDesc6',
    'faqAnswer1', 'faqAnswer2', 'faqAnswer3', 'faqAnswer4', 'faqAnswer5',
    'faqAnswer6', 'faqAnswer7', 'faqAnswer8', 'faqAnswer9', 'faqAnswer10',
    'faqAnswer11', 'faqAnswer12', 'faqAnswer13', 'faqAnswer14', 'faqAnswer15'
  ],
  'cities': [
    'mainStoryRichText', 'secondaryStoryRichText', 'supportingTextRichText',
    'communityGuidelinesRichText', 'locationImprovementsRichText', 'consultantTitleDescription',
    'recentProjectDescription', 'echoRichText', 'locationContactDetails', 'residentialCalcHeader',
    'mapSection', 'customContent', 'faqContent',
    'servicesModalDesc1', 'servicesModalDesc2', 'servicesModalDesc3',
    'servicesModalDesc4', 'servicesModalDesc5', 'servicesModalDesc6',
    'faqAnswer1', 'faqAnswer2', 'faqAnswer3', 'faqAnswer4', 'faqAnswer5',
    'faqAnswer6', 'faqAnswer7', 'faqAnswer8', 'faqAnswer9', 'faqAnswer10',
    'faqAnswer11', 'faqAnswer12', 'faqAnswer13', 'faqAnswer14', 'faqAnswer15'
  ],
  'blogs': ['contentRichText'],
  'blog-alt-drafts': ['contentRichText'],
};

// Map of old field names (in production) to new field names
const FIELD_NAME_MAP: Record<string, string> = {
  'serviceFaqDesc1': 'servicesModalDesc1',
  'serviceFaqDesc2': 'servicesModalDesc2',
  'serviceFaqDesc3': 'servicesModalDesc3',
  'serviceFaqDesc4': 'servicesModalDesc4',
  'serviceFaqDesc5': 'servicesModalDesc5',
  'serviceFaqDesc6': 'servicesModalDesc6',
  'serviceFaqDesc7': 'servicesModalDesc7',
};

async function fetchAllRecords(contentType: string): Promise<any[]> {
  const records: any[] = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    try {
      const response = await axios.get(
        `${CONFIG.strapi.baseUrl}/api/${contentType}`,
        {
          params: {
            'pagination[page]': page,
            'pagination[pageSize]': pageSize,
          },
          headers: {
            Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          },
        }
      );

      const data = response.data.data;
      if (!data || data.length === 0) break;

      records.push(...data);

      const pagination = response.data.meta?.pagination;
      if (!pagination || page >= pagination.pageCount) break;

      page++;
    } catch (error) {
      logger.error(`Failed to fetch ${contentType} page ${page}:`, (error as Error).message);
      break;
    }
  }

  return records;
}

async function updateRecord(
  contentType: string,
  documentId: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    await axios.put(
      `${CONFIG.strapi.baseUrl}/api/${contentType}/${documentId}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error: any) {
    logger.error(`Failed to update ${contentType}/${documentId}:`, error.response?.data || error.message);
    return false;
  }
}

async function convertContentType(contentType: string, fields: string[]): Promise<number> {
  logger.info(`\nProcessing ${contentType}...`);

  const records = await fetchAllRecords(contentType);
  logger.info(`Found ${records.length} records in ${contentType}`);

  let converted = 0;

  for (const record of records) {
    const updates: Record<string, any> = {};
    let hasUpdates = false;

    for (const field of fields) {
      // Check both the new field name and old field name
      let value = record[field];

      // Also check mapped old field names
      for (const [oldName, newName] of Object.entries(FIELD_NAME_MAP)) {
        if (newName === field && record[oldName] && !value) {
          value = record[oldName];
        }
      }

      if (value && typeof value === 'string') {
        // Convert HTML to blocks
        const blocks = htmlToBlocks(value);
        if (blocks) {
          updates[field] = blocks;
          hasUpdates = true;
        }
      }
    }

    if (hasUpdates) {
      const success = await updateRecord(contentType, record.documentId, updates);
      if (success) {
        converted++;
        logger.debug(`Converted record ${record.documentId}`);
      }
    }
  }

  return converted;
}

async function main() {
  logger.info('Starting HTML to Blocks conversion...');
  logger.info(`Strapi URL: ${CONFIG.strapi.baseUrl}`);

  let totalConverted = 0;

  for (const [contentType, fields] of Object.entries(CONTENT_TYPES_FIELDS)) {
    const converted = await convertContentType(contentType, fields);
    totalConverted += converted;
    logger.info(`Converted ${converted} records in ${contentType}`);
  }

  logger.info(`\n=== Summary ===`);
  logger.info(`Total records converted: ${totalConverted}`);
}

main().catch((error) => {
  logger.error('Conversion failed:', error.message);
  process.exit(1);
});
