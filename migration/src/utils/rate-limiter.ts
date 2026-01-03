import { sleep } from './retry.js';

export class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number; // tokens per ms
  private lastRefill: number;

  constructor(requestsPerMinute: number) {
    this.maxTokens = requestsPerMinute;
    this.tokens = requestsPerMinute;
    this.refillRate = requestsPerMinute / 60000;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(
      this.maxTokens,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;
  }

  async acquire(): Promise<void> {
    this.refill();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }

    // Calculate wait time
    const waitTime = Math.ceil((1 - this.tokens) / this.refillRate);
    await sleep(waitTime);

    this.refill();
    this.tokens -= 1;
  }

  // Get current available tokens (for debugging)
  getAvailableTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }
}

// Default rate limiter for Webflow (60 requests per minute)
export const webflowRateLimiter = new RateLimiter(60);
