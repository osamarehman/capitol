import { logger } from './logger.js';

export interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: Error) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  shouldRetry: () => true,
};

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const opts = { ...defaultOptions, ...options };
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // Check if we should retry
      if (!opts.shouldRetry(lastError)) {
        throw lastError;
      }

      if (attempt < opts.maxAttempts) {
        // Exponential backoff with jitter
        const delay = Math.min(
          opts.baseDelayMs * Math.pow(2, attempt - 1) + Math.random() * 1000,
          opts.maxDelayMs
        );

        logger.warn(
          `Attempt ${attempt}/${opts.maxAttempts} failed: ${lastError.message}. Retrying in ${Math.round(delay)}ms...`
        );

        await sleep(delay);
      }
    }
  }

  throw lastError;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Check if error is retryable (network errors, rate limits, etc.)
export function isRetryableError(error: Error): boolean {
  const message = error.message.toLowerCase();

  // Rate limit errors
  if (message.includes('rate limit') || message.includes('429')) {
    return true;
  }

  // Network errors
  if (
    message.includes('econnreset') ||
    message.includes('econnrefused') ||
    message.includes('etimedout') ||
    message.includes('socket hang up') ||
    message.includes('network')
  ) {
    return true;
  }

  // Server errors (5xx)
  if (message.includes('500') || message.includes('502') || message.includes('503') || message.includes('504')) {
    return true;
  }

  return false;
}
