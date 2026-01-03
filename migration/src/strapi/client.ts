import axios, { AxiosInstance, AxiosError } from 'axios';
import { CONFIG } from '../config/index.js';
import { withRetry, isRetryableError } from '../utils/retry.js';
import { logger } from '../utils/logger.js';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntry {
  id: number;
  documentId: string;
  [key: string]: unknown;
}

class StrapiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${CONFIG.strapi.baseUrl}/api`,
      headers: {
        Authorization: `Bearer ${CONFIG.strapi.apiToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Add response interceptor for error logging
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          const data = error.response.data as {
            error?: {
              message?: string;
              details?: { errors?: Array<{ path: string[]; message: string }> };
            }
          };
          const mainMsg = data?.error?.message || 'Unknown error';
          logger.error(`Strapi API error: ${error.response.status} - ${mainMsg}`);

          // Log detailed field errors if available
          const fieldErrors = data?.error?.details?.errors;
          if (fieldErrors && fieldErrors.length > 0) {
            for (const fieldError of fieldErrors.slice(0, 5)) {
              logger.error(`  - ${fieldError.path.join('.')}: ${fieldError.message}`);
            }
            if (fieldErrors.length > 5) {
              logger.error(`  ... and ${fieldErrors.length - 5} more errors`);
            }
          }
        }
        throw error;
      }
    );
  }

  /**
   * Create a new entry
   */
  async createEntry(
    contentType: string,
    data: Record<string, unknown>
  ): Promise<{ documentId: string; id: number }> {
    return withRetry(
      async () => {
        const response = await this.client.post<StrapiResponse<StrapiEntry>>(
          `/${contentType}`,
          { data }
        );
        return {
          documentId: response.data.data.documentId,
          id: response.data.data.id,
        };
      },
      {
        maxAttempts: 3,
        shouldRetry: isRetryableError,
      }
    );
  }

  /**
   * Update an existing entry
   */
  async updateEntry(
    contentType: string,
    documentId: string,
    data: Record<string, unknown>
  ): Promise<void> {
    return withRetry(
      async () => {
        await this.client.put(`/${contentType}/${documentId}`, { data });
      },
      {
        maxAttempts: 3,
        shouldRetry: isRetryableError,
      }
    );
  }

  /**
   * Get entries with optional filters
   */
  async getEntries(
    contentType: string,
    params?: Record<string, unknown>
  ): Promise<StrapiEntry[]> {
    const response = await this.client.get<StrapiResponse<StrapiEntry[]>>(
      `/${contentType}`,
      { params }
    );
    return response.data.data;
  }

  /**
   * Get a single entry by documentId
   */
  async getEntry(
    contentType: string,
    documentId: string
  ): Promise<StrapiEntry | null> {
    try {
      const response = await this.client.get<StrapiResponse<StrapiEntry>>(
        `/${contentType}/${documentId}`
      );
      return response.data.data;
    } catch (error) {
      if ((error as AxiosError).response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Publish an entry (Strapi 5)
   */
  async publishEntry(contentType: string, documentId: string): Promise<void> {
    await this.client.post(`/${contentType}/${documentId}/actions/publish`);
  }

  /**
   * Check if Strapi is healthy
   */
  async healthCheck(): Promise<boolean> {
    try {
      await axios.get(`${CONFIG.strapi.baseUrl}/_health`);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if API token is valid
   */
  async validateToken(): Promise<boolean> {
    try {
      // Try to access any endpoint
      await this.client.get('/');
      return true;
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        return false;
      }
      // Other errors might be due to no content types yet
      return true;
    }
  }
}

export const strapiClient = new StrapiClient();
