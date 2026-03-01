#!/usr/bin/env tsx
/**
 * AI-Powered HOA URL Verification
 *
 * This script:
 * 1. Fetches each URL
 * 2. Converts HTML to text content
 * 3. Uses AI to verify if it's a legitimate HOA website
 */

import dotenv from 'dotenv';
import axios from 'axios';
import OpenAI from 'openai';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const HOA_CSV_PATH = join(__dirname, '../../hoa_resources.csv');
const VERIFIED_CSV_PATH = join(__dirname, '../../hoa_resources_verified.csv');
const REPORT_PATH = join(__dirname, '../../hoa_ai_verification_report.md');

interface HOAResource {
  city: string;
  state: string;
  hoa_name: string;
  hoa_url: string;
  is_community_based: string;
}

interface VerificationResult {
  city: string;
  hoa_name: string;
  url: string;
  status: 'valid' | 'invalid' | 'error' | 'no_url';
  httpStatus?: number;
  aiVerdict?: string;
  aiConfidence?: string;
  aiReason?: string;
  error?: string;
}

class AIHOAVerifier {
  private openai: OpenAI;
  private results: VerificationResult[] = [];

  constructor() {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required');
    }
    this.openai = new OpenAI({ apiKey: openaiKey });
  }

  private isFacebookUrl(url: string): boolean {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.com') || lowerUrl.includes('fb.me');
  }

  /**
   * Convert HTML to plain text
   */
  private htmlToText(html: string): string {
    return html
      // Remove scripts and styles
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Decode HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim()
      // Limit length
      .substring(0, 4000);
  }

  /**
   * Fetch URL content
   */
  private async fetchUrl(url: string): Promise<{ success: boolean; content?: string; error?: string; status?: number }> {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        maxRedirects: 5,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        validateStatus: () => true,
      });

      if (response.status >= 200 && response.status < 400) {
        const html = typeof response.data === 'string' ? response.data : '';
        const text = this.htmlToText(html);
        return { success: true, content: text, status: response.status };
      } else {
        return { success: false, error: `HTTP ${response.status}`, status: response.status };
      }
    } catch (error: any) {
      return { success: false, error: error.code || error.message || 'Unknown error' };
    }
  }

  /**
   * Use AI to verify if content is an HOA website
   */
  private async verifyWithAI(hoaName: string, city: string, content: string): Promise<{ verdict: string; confidence: string; reason: string }> {
    const prompt = `Analyze this website content and determine if it belongs to a legitimate Homeowner Association (HOA), Community Association, or Civic Association website.

HOA Name we're looking for: "${hoaName}"
City: ${city}

Website Content:
${content}

Respond in this exact JSON format (no markdown):
{
  "verdict": "VALID" or "INVALID",
  "confidence": "HIGH", "MEDIUM", or "LOW",
  "reason": "Brief explanation (max 50 words)"
}

Criteria for VALID:
- Content mentions HOA, homeowner, community association, civic association, or neighborhood
- Content relates to residential community management (meetings, dues, bylaws, events, board)
- Content matches or relates to the HOA name we're looking for
- Could be a management company page for this specific HOA

Criteria for INVALID:
- Real estate listing or sales site
- Generic parked domain or "for sale" page
- Completely unrelated business
- 404 or error page content
- No mention of community/neighborhood/HOA topics`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo',
        max_tokens: 200,
        messages: [
          { role: 'system', content: 'You are a verification assistant. Respond only with valid JSON.' },
          { role: 'user', content: prompt },
        ],
      });

      const text = response.choices[0]?.message?.content?.trim() || '';
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return {
          verdict: result.verdict || 'INVALID',
          confidence: result.confidence || 'LOW',
          reason: result.reason || 'Could not parse response',
        };
      }
    } catch (error: any) {
      console.error(`   AI Error: ${error.message}`);
    }

    return { verdict: 'INVALID', confidence: 'LOW', reason: 'AI verification failed' };
  }

  /**
   * Verify a single HOA entry
   */
  async verifyHOA(hoa: HOAResource): Promise<VerificationResult> {
    const result: VerificationResult = {
      city: hoa.city,
      hoa_name: hoa.hoa_name,
      url: hoa.hoa_url,
      status: 'error',
    };

    // Skip entries without URLs (community-based)
    if (!hoa.hoa_url || hoa.is_community_based === 'true' || hoa.is_community_based === 'TRUE') {
      result.status = 'no_url';
      return result;
    }

    // Skip Facebook URLs
    if (this.isFacebookUrl(hoa.hoa_url)) {
      result.status = 'invalid';
      result.aiVerdict = 'INVALID';
      result.aiReason = 'Facebook URL - not an official website';
      return result;
    }

    // Fetch the URL
    const fetchResult = await this.fetchUrl(hoa.hoa_url);
    result.httpStatus = fetchResult.status;

    if (!fetchResult.success || !fetchResult.content) {
      result.status = 'error';
      result.error = fetchResult.error;
      return result;
    }

    // Quick filter: if content is too short, likely an error page
    if (fetchResult.content.length < 100) {
      result.status = 'invalid';
      result.aiVerdict = 'INVALID';
      result.aiReason = 'Content too short - likely error page';
      return result;
    }

    // Use AI to verify
    const aiResult = await this.verifyWithAI(hoa.hoa_name, hoa.city, fetchResult.content);
    result.aiVerdict = aiResult.verdict;
    result.aiConfidence = aiResult.confidence;
    result.aiReason = aiResult.reason;
    result.status = aiResult.verdict === 'VALID' ? 'valid' : 'invalid';

    return result;
  }

  /**
   * Run verification
   */
  async run(options: { limit?: number } = {}): Promise<void> {
    const { limit } = options;

    console.log('📂 Loading HOA resources from CSV...');

    if (!existsSync(HOA_CSV_PATH)) {
      throw new Error(`CSV not found: ${HOA_CSV_PATH}`);
    }

    const content = readFileSync(HOA_CSV_PATH, 'utf-8');
    const records: HOAResource[] = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Filter to entries with URLs (not community-based, not Facebook)
    let toVerify = records.filter(r =>
      r.hoa_url &&
      !this.isFacebookUrl(r.hoa_url) &&
      r.is_community_based !== 'true' &&
      r.is_community_based !== 'TRUE'
    );

    // Remove duplicate URLs
    const seen = new Set<string>();
    toVerify = toVerify.filter(r => {
      if (seen.has(r.hoa_url)) return false;
      seen.add(r.hoa_url);
      return true;
    });

    if (limit) {
      toVerify = toVerify.slice(0, limit);
    }

    console.log(`✅ Found ${toVerify.length} unique URLs to verify with AI\n`);

    // Verify each URL
    for (let i = 0; i < toVerify.length; i++) {
      const hoa = toVerify[i];
      process.stdout.write(`[${i + 1}/${toVerify.length}] ${hoa.hoa_name.substring(0, 40).padEnd(40)} `);

      const result = await this.verifyHOA(hoa);
      this.results.push(result);

      const statusIcon = {
        valid: '✅',
        invalid: '❌',
        error: '⚠️',
        no_url: '⏭️',
      }[result.status];

      const confidence = result.aiConfidence ? ` [${result.aiConfidence}]` : '';
      console.log(`${statusIcon} ${result.status}${confidence}`);

      // Rate limit for AI calls
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate report and save verified CSV
    this.generateReport(records);
  }

  /**
   * Generate report and verified CSV
   */
  private generateReport(allRecords: HOAResource[]): void {
    const valid = this.results.filter(r => r.status === 'valid');
    const invalid = this.results.filter(r => r.status === 'invalid');
    const errors = this.results.filter(r => r.status === 'error');

    // Create a set of invalid/error URLs to filter out
    const badUrls = new Set<string>();
    for (const r of [...invalid, ...errors]) {
      if (r.url) badUrls.add(r.url);
    }

    // Filter records to keep only valid ones
    const verifiedRecords = allRecords.filter(r => {
      // Keep community-based entries
      if (!r.hoa_url || r.is_community_based === 'true' || r.is_community_based === 'TRUE') {
        return true;
      }
      // Remove bad URLs
      return !badUrls.has(r.hoa_url);
    });

    // Save verified CSV
    const csvContent = stringify(verifiedRecords, {
      header: true,
      columns: ['city', 'state', 'hoa_name', 'hoa_url', 'is_community_based'],
    });
    writeFileSync(VERIFIED_CSV_PATH, csvContent);

    // Generate markdown report
    const report = `# AI-Powered HOA URL Verification Report

Generated: ${new Date().toISOString()}

## Summary

| Status | Count |
|--------|-------|
| ✅ Valid (AI Verified) | ${valid.length} |
| ❌ Invalid (AI Rejected) | ${invalid.length} |
| ⚠️ Error (Could not fetch) | ${errors.length} |
| **Total Verified** | **${this.results.length}** |

## Records After Cleanup

- Original records: ${allRecords.length}
- Verified records: ${verifiedRecords.length}
- Removed: ${allRecords.length - verifiedRecords.length}

## Valid URLs (${valid.length})

| City | HOA Name | Confidence | Reason |
|------|----------|------------|--------|
${valid.map(r => `| ${r.city} | ${r.hoa_name} | ${r.aiConfidence} | ${r.aiReason} |`).join('\n')}

## Invalid URLs - Removed (${invalid.length})

| City | HOA Name | Confidence | Reason |
|------|----------|------------|--------|
${invalid.map(r => `| ${r.city} | ${r.hoa_name} | ${r.aiConfidence || 'N/A'} | ${r.aiReason || r.error || 'N/A'} |`).join('\n')}

## Error URLs - Removed (${errors.length})

| City | HOA Name | URL | Error |
|------|----------|-----|-------|
${errors.map(r => `| ${r.city} | ${r.hoa_name} | ${r.url} | ${r.error} |`).join('\n')}
`;

    writeFileSync(REPORT_PATH, report);

    console.log('\n' + '='.repeat(60));
    console.log('📊 AI VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Valid (AI Verified): ${valid.length}`);
    console.log(`❌ Invalid (AI Rejected): ${invalid.length}`);
    console.log(`⚠️ Errors: ${errors.length}`);
    console.log('---');
    console.log(`Original records: ${allRecords.length}`);
    console.log(`Verified records: ${verifiedRecords.length}`);
    console.log(`Removed: ${allRecords.length - verifiedRecords.length}`);
    console.log('='.repeat(60));
    console.log(`\n📄 Report: ${REPORT_PATH}`);
    console.log(`📄 Verified CSV: ${VERIFIED_CSV_PATH}`);
  }
}

// Parse args
const args = process.argv.slice(2);
const limitArg = args.find(arg => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

const verifier = new AIHOAVerifier();
verifier.run({ limit }).catch(console.error);
