import { CONFIG } from '../config/index.js';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const colors = {
  debug: '\x1b[36m', // cyan
  info: '\x1b[32m',  // green
  warn: '\x1b[33m',  // yellow
  error: '\x1b[31m', // red
  reset: '\x1b[0m',
};

function formatMessage(level: LogLevel, ...args: unknown[]): string {
  const timestamp = new Date().toISOString();
  const prefix = `${colors[level]}[${level.toUpperCase()}]${colors.reset}`;
  return `${prefix} ${timestamp} ${args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
  ).join(' ')}`;
}

export const logger = {
  debug: (...args: unknown[]): void => {
    if (CONFIG.debug) {
      console.log(formatMessage('debug', ...args));
    }
  },

  info: (...args: unknown[]): void => {
    console.log(formatMessage('info', ...args));
  },

  warn: (...args: unknown[]): void => {
    console.warn(formatMessage('warn', ...args));
  },

  error: (...args: unknown[]): void => {
    console.error(formatMessage('error', ...args));
  },

  // Progress logging for long operations
  progress: (current: number, total: number, message: string): void => {
    const percent = Math.round((current / total) * 100);
    const bar = '='.repeat(Math.floor(percent / 2)) + '-'.repeat(50 - Math.floor(percent / 2));
    process.stdout.write(`\r[${bar}] ${percent}% ${message}`);
    if (current === total) {
      console.log(); // New line when complete
    }
  },
};
