import { OverpassGatewayTimeoutError, OverpassRateLimitError, overpassJson } from 'overpass-ts';
import { OverpassCount } from '../types';
import { delay, randomDelay } from '../utils/delay';

const REQUEST_DELAY_MIN_MS = 3000;
const REQUEST_DELAY_MAX_MS = 15000;
const RATE_LIMIT_BACKOFF_MS = 15000;
const MAX_RATE_LIMIT_BACKOFF_MS = 60000;
const MAX_RATE_LIMIT_RETRIES_PER_ENDPOINT = 3;
const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter'
];
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

function andQuery(queries: [string, string][], area?: number): string {
    const queryPart = queries.map(([key, value]) => `["${key}"="${value}"]`).join('');
    return `nwr${queryPart}${area ? '(area.searchArea)' : ''};`;
}

function orQuery(queries: [string, string][], area?: number): string {
    return queries.map(([key, value]) => `nwr["${key}"="${value}"]${area ? '(area.searchArea)' : ''};`).join('\n');
}

/**
 * Executes a simple Overpass query and returns the count of matching elements.
 * @param {[string, string][]} queries - An array of key-value pairs representing the query parameters.
 * @param {number} [area] - The ID of an area to limit the query to.
 * @param {'and' | 'or'} [operator] - Whether to use an AND or OR operator for the query.
 * @returns A promise that resolves to the count of matching elements.
 */
export async function overpassSimpleQuery(queries: [string, string][], area?: number, operator: 'and' | 'or' = 'and'): Promise<number> {
    const queryPart = operator === 'and' ? andQuery(queries, area) : orQuery(queries, area);
    const query = `
    [out:json][timeout:25];
    ${area ? `area(id:${area})->.searchArea;` : ''}
    (
    ${queryPart}
    );
    out count;`;

    return callApi(query);
}

/**
 * Executes a raw Overpass query and returns the count of matching elements.
 * @param {string} query - The raw Overpass query string
 * @returns A promise that resolves to the count of matching elements.
 */
export async function overpassRawQuery(query: string): Promise<number> {
    // Ensure the query has the necessary output format
    if (!query.includes('[out:json]')) {
        throw new Error('Query must include [out:json]');
    }
    if (!query.includes('out count')) {
        throw new Error('Query must include out count');
    }

    return callApi(query);
}

const USER_AGENT = 'is-osm-complete/0.1.0 (https://github.com/wvanderp/isOsmComplete)';

function getRateLimitBackoffMs(attempt: number): number {
    return Math.min(RATE_LIMIT_BACKOFF_MS * (2 ** (attempt - 1)), MAX_RATE_LIMIT_BACKOFF_MS);
}

function getRetryableStatusCode(error: unknown): number | undefined {
    if (error instanceof OverpassRateLimitError) {
        return 429;
    }

    if (error instanceof OverpassGatewayTimeoutError) {
        return 504;
    }

    if (!(error instanceof Error)) {
        return undefined;
    }

    const statusMatch = /^\s*(\d{3})\b/u.exec(error.message);
    return statusMatch ? Number.parseInt(statusMatch[1], 10) : undefined;
}

function isRetryableOverpassError(error: unknown): boolean {
    const statusCode = getRetryableStatusCode(error);
    return statusCode !== undefined && RETRYABLE_STATUS_CODES.has(statusCode);
}

async function callApi(query: string): Promise<number> {
    const attemptsPerEndpoint = MAX_RATE_LIMIT_RETRIES_PER_ENDPOINT + 1;
    let lastRetryableError: unknown;

    for (const endpoint of OVERPASS_ENDPOINTS) {
        for (let attempt = 1; attempt <= attemptsPerEndpoint; attempt += 1) {
            await randomDelay(REQUEST_DELAY_MIN_MS, REQUEST_DELAY_MAX_MS);

            try {
                const data = await overpassJson(query, {
                    endpoint,
                    userAgent: USER_AGENT
                }) as OverpassCount;
                const count = data.elements[0].tags.total;

                return Number.parseInt(count, 10);
            } catch (error) {
                if (!isRetryableOverpassError(error)) {
                    throw error;
                }

                lastRetryableError = error;
                const statusCode = getRetryableStatusCode(error);

                if (attempt === attemptsPerEndpoint) {
                    console.warn(
                        `[overpass] ${endpoint} failed with retryable error ${statusCode} `
                        + `on attempt ${attempt}/${attemptsPerEndpoint}. Trying next endpoint.`
                    );
                    break;
                }

                const backoffMs = getRateLimitBackoffMs(attempt);

                console.warn(
                    `[overpass] ${endpoint} failed with retryable error ${statusCode} `
                    + `on attempt ${attempt}/${attemptsPerEndpoint}. Retrying in ${backoffMs}ms.`
                );
                await delay(backoffMs);
            }
        }
    }

    if (lastRetryableError) {
        throw lastRetryableError;
    }

    throw new Error('Overpass retry loop exited unexpectedly');
}
