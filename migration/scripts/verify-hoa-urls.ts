#!/usr/bin/env tsx
/**
 * Verify HOA URLs by fetching and analyzing content
 *
 * This script:
 * 1. Loads HOA data from the CSV file
 * 2. Fetches each URL (excluding Facebook)
 * 3. Analyzes content to verify relevance
 * 4. Creates a verification report
 */

import dotenv from 'dotenv';
import axios from 'axios';
import { readFileSync, existsSync, writeFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const HOA_CSV_PATH = join(__dirname, '../../hoa_resources.csv');
const REPORT_PATH = join(__dirname, '../../hoa_url_verification_report.md');

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
  status: 'valid' | 'invalid' | 'error' | 'redirect' | 'suspicious';
  httpStatus?: number;
  title?: string;
  description?: string;
  relevanceScore: number;
  issues: string[];
  finalUrl?: string;
}

class HOAUrlVerifier {
  private results: VerificationResult[] = [];

  /**
   * Check if URL is a Facebook link
   */
  private isFacebookUrl(url: string): boolean {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.includes('facebook.com') ||
           lowerUrl.includes('fb.com') ||
           lowerUrl.includes('fb.me');
  }

  /**
   * Extract title from HTML
   */
  private extractTitle(html: string): string {
    const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return match ? match[1].trim().substring(0, 100) : '';
  }

  /**
   * Extract meta description from HTML
   */
  private extractDescription(html: string): string {
    const match = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                  html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    return match ? match[1].trim().substring(0, 200) : '';
  }

  /**
   * Calculate relevance score based on content
   */
  private calculateRelevance(html: string, hoaName: string, city: string): { score: number; issues: string[] } {
    const issues: string[] = [];
    let score = 0;
    const lowerHtml = html.toLowerCase();
    const lowerName = hoaName.toLowerCase();
    const lowerCity = city.toLowerCase();

    // Check for HOA-related keywords
    const hoaKeywords = ['hoa', 'homeowner', 'homeowners', 'association', 'community', 'civic', 'neighborhood', 'residents', 'property owners'];
    const foundKeywords = hoaKeywords.filter(k => lowerHtml.includes(k));
    if (foundKeywords.length >= 2) {
      score += 30;
    } else if (foundKeywords.length === 1) {
      score += 15;
    } else {
      issues.push('No HOA-related keywords found');
    }

    // Check if HOA name appears in content
    const nameWords = lowerName.split(/\s+/).filter(w => w.length > 3);
    const nameMatches = nameWords.filter(w => lowerHtml.includes(w)).length;
    if (nameMatches >= Math.ceil(nameWords.length * 0.5)) {
      score += 25;
    } else {
      issues.push('HOA name not found in content');
    }

    // Check if city name appears
    if (lowerHtml.includes(lowerCity)) {
      score += 20;
    } else {
      issues.push('City name not found in content');
    }

    // Check for typical HOA content
    const contentKeywords = ['meeting', 'board', 'dues', 'bylaws', 'covenant', 'member', 'event', 'newsletter', 'contact'];
    const contentMatches = contentKeywords.filter(k => lowerHtml.includes(k)).length;
    if (contentMatches >= 3) {
      score += 25;
    } else if (contentMatches >= 1) {
      score += 10;
    }

    // Red flags
    if (lowerHtml.includes('for sale') && lowerHtml.includes('real estate')) {
      score -= 20;
      issues.push('Appears to be a real estate site');
    }
    if (lowerHtml.includes('page not found') || lowerHtml.includes('404')) {
      score -= 30;
      issues.push('Page not found content detected');
    }
    if (lowerHtml.includes('domain for sale') || lowerHtml.includes('buy this domain')) {
      score -= 50;
      issues.push('Domain appears to be for sale');
    }
    if (lowerHtml.includes('parked domain') || lowerHtml.includes('godaddy')) {
      score -= 40;
      issues.push('Parked domain detected');
    }

    return { score: Math.max(0, Math.min(100, score)), issues };
  }

  /**
   * Fetch and verify a single URL
   */
  async verifyUrl(hoa: HOAResource): Promise<VerificationResult> {
    const result: VerificationResult = {
      city: hoa.city,
      hoa_name: hoa.hoa_name,
      url: hoa.hoa_url,
      status: 'error',
      relevanceScore: 0,
      issues: [],
    };

    try {
      const response = await axios.get(hoa.hoa_url, {
        timeout: 15000,
        maxRedirects: 5,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        validateStatus: () => true,
      });

      result.httpStatus = response.status;
      result.finalUrl = response.request?.res?.responseUrl || hoa.hoa_url;

      if (response.status >= 200 && response.status < 300) {
        const html = typeof response.data === 'string' ? response.data : '';

        result.title = this.extractTitle(html);
        result.description = this.extractDescription(html);

        const { score, issues } = this.calculateRelevance(html, hoa.hoa_name, hoa.city);
        result.relevanceScore = score;
        result.issues = issues;

        if (score >= 50) {
          result.status = 'valid';
        } else if (score >= 25) {
          result.status = 'suspicious';
        } else {
          result.status = 'invalid';
        }

        // Check for redirect to different domain
        if (result.finalUrl && new URL(result.finalUrl).hostname !== new URL(hoa.hoa_url).hostname) {
          result.status = 'redirect';
          result.issues.push(`Redirected to: ${result.finalUrl}`);
        }
      } else if (response.status >= 400) {
        result.status = 'error';
        result.issues.push(`HTTP ${response.status} error`);
      }
    } catch (error: any) {
      result.status = 'error';
      result.issues.push(error.code || error.message || 'Unknown error');
    }

    return result;
  }

  /**
   * Load and verify all URLs
   */
  async run(options: { limit?: number } = {}): Promise<void> {
    const { limit } = options;

    console.log('📂 Loading HOA resources from CSV...');

    if (!existsSync(HOA_CSV_PATH)) {
      throw new Error(`HOA CSV file not found: ${HOA_CSV_PATH}`);
    }

    const content = readFileSync(HOA_CSV_PATH, 'utf-8');
    const records: HOAResource[] = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });

    // Filter to only URLs (not Facebook, not community-based)
    let toVerify = records.filter(r =>
      r.hoa_url &&
      !this.isFacebookUrl(r.hoa_url) &&
      r.is_community_based !== 'true' &&
      r.is_community_based !== 'TRUE'
    );

    // Remove duplicates
    const seen = new Set<string>();
    toVerify = toVerify.filter(r => {
      if (seen.has(r.hoa_url)) return false;
      seen.add(r.hoa_url);
      return true;
    });

    if (limit) {
      toVerify = toVerify.slice(0, limit);
    }

    console.log(`✅ Found ${toVerify.length} unique URLs to verify\n`);

    // Verify each URL
    for (let i = 0; i < toVerify.length; i++) {
      const hoa = toVerify[i];
      process.stdout.write(`[${i + 1}/${toVerify.length}] ${hoa.hoa_name.substring(0, 40).padEnd(40)} `);

      const result = await this.verifyUrl(hoa);
      this.results.push(result);

      const statusIcon = {
        valid: '✅',
        invalid: '❌',
        error: '⚠️',
        redirect: '🔄',
        suspicious: '🔍',
      }[result.status];

      console.log(`${statusIcon} ${result.status} (score: ${result.relevanceScore})`);

      // Small delay to avoid overwhelming servers
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate report
    this.generateReport();
  }

  /**
   * Generate verification report
   */
  private generateReport(): void {
    const valid = this.results.filter(r => r.status === 'valid');
    const invalid = this.results.filter(r => r.status === 'invalid');
    const errors = this.results.filter(r => r.status === 'error');
    const suspicious = this.results.filter(r => r.status === 'suspicious');
    const redirects = this.results.filter(r => r.status === 'redirect');

    const report = `# HOA URL Verification Report

Generated: ${new Date().toISOString()}

## Summary

| Status | Count |
|--------|-------|
| ✅ Valid | ${valid.length} |
| 🔍 Suspicious (needs review) | ${suspicious.length} |
| 🔄 Redirected | ${redirects.length} |
| ❌ Invalid | ${invalid.length} |
| ⚠️ Error | ${errors.length} |
| **Total** | **${this.results.length}** |

## Valid URLs (${valid.length})

These URLs appear to be legitimate HOA/community websites:

| City | HOA Name | Score | Title |
|------|----------|-------|-------|
${valid.map(r => `| ${r.city} | ${r.hoa_name} | ${r.relevanceScore} | ${r.title?.substring(0, 50) || 'N/A'} |`).join('\n')}

## Suspicious URLs - Need Review (${suspicious.length})

These URLs may or may not be relevant:

| City | HOA Name | Score | Issues |
|------|----------|-------|--------|
${suspicious.map(r => `| ${r.city} | ${r.hoa_name} | ${r.relevanceScore} | ${r.issues.join('; ')} |`).join('\n')}

## Redirected URLs (${redirects.length})

These URLs redirect to a different domain:

| City | HOA Name | Original URL | Redirected To |
|------|----------|--------------|---------------|
${redirects.map(r => `| ${r.city} | ${r.hoa_name} | ${r.url} | ${r.finalUrl} |`).join('\n')}

## Invalid URLs (${invalid.length})

These URLs don't appear to be HOA websites:

| City | HOA Name | Score | Issues |
|------|----------|-------|--------|
${invalid.map(r => `| ${r.city} | ${r.hoa_name} | ${r.relevanceScore} | ${r.issues.join('; ')} |`).join('\n')}

## Error URLs (${errors.length})

These URLs could not be fetched:

| City | HOA Name | URL | Error |
|------|----------|-----|-------|
${errors.map(r => `| ${r.city} | ${r.hoa_name} | ${r.url} | ${r.issues.join('; ')} |`).join('\n')}

## Detailed Results

${this.results.map(r => `
### ${r.hoa_name} (${r.city})
- **URL:** ${r.url}
- **Status:** ${r.status}
- **Score:** ${r.relevanceScore}/100
- **Title:** ${r.title || 'N/A'}
- **Description:** ${r.description || 'N/A'}
${r.issues.length > 0 ? `- **Issues:** ${r.issues.join(', ')}` : ''}
`).join('\n')}
`;

    writeFileSync(REPORT_PATH, report);

    console.log('\n' + '='.repeat(60));
    console.log('📊 VERIFICATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Valid: ${valid.length}`);
    console.log(`🔍 Suspicious: ${suspicious.length}`);
    console.log(`🔄 Redirected: ${redirects.length}`);
    console.log(`❌ Invalid: ${invalid.length}`);
    console.log(`⚠️ Errors: ${errors.length}`);
    console.log('='.repeat(60));
    console.log(`\n📄 Report saved to: ${REPORT_PATH}`);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? parseInt(limitArg.split('=')[1]) : undefined;

const verifier = new HOAUrlVerifier();
verifier.run({ limit }).catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
