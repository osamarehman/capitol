import { WebflowClient } from 'webflow-api';
import { CONFIG } from '../config/index.js';
import { webflowRateLimiter } from '../utils/rate-limiter.js';
import { withRetry, isRetryableError } from '../utils/retry.js';

// Initialize the Webflow client
export const webflow = new WebflowClient({
  accessToken: CONFIG.webflow.accessToken,
});

/**
 * Execute a Webflow API call with rate limiting and retry logic
 */
export async function fetchWithRateLimit<T>(
  fn: () => Promise<T>
): Promise<T> {
  // Wait for rate limiter
  await webflowRateLimiter.acquire();

  // Execute with retry
  return withRetry(fn, {
    maxAttempts: CONFIG.webflow.rateLimit.retryAttempts,
    baseDelayMs: CONFIG.webflow.rateLimit.retryDelayMs,
    shouldRetry: isRetryableError,
  });
}
