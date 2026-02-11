import { overpassJson, OverpassGatewayTimeoutError, OverpassRateLimitError } from 'overpass-ts';
import { OverpassCount } from '../types';
import { randomDelay, delay } from '../utils/delay';

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

/**
 * Executes a function with exponential backoff retry logic.
 * Retries up to 3 times (initial attempt + 2 retries) with exponential backoff.
 * @param function_ - The async function to execute
 * @param maxRetries - Maximum number of retries (default: 2, meaning 3 total attempts)
 * @returns The result of the function
 */
async function withRetry<T>(function_: () => Promise<T>, maxRetries: number = 2): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt += 1) {
        try {
            return await function_();
        } catch (error) {
            lastError = error as Error;

            // Only retry on timeout or rate limit errors
            const isRetriableError = error instanceof OverpassGatewayTimeoutError
                || error instanceof OverpassRateLimitError;

            if (!isRetriableError || attempt === maxRetries) {
                throw error;
            }

            // Exponential backoff: 2^attempt * 1000ms (1s, 2s, 4s, etc.)
            const backoffMs = (2 ** attempt) * 1000;
            await delay(backoffMs);
        }
    }

    // This should never be reached, but TypeScript needs it
    throw lastError;
}

async function callApi(query: string): Promise<number> {
    await randomDelay(3000, 15000);

    const data = await withRetry(async () => overpassJson(query, { userAgent: USER_AGENT }) as OverpassCount);

    const count = data.elements[0].tags.total;

    return Number.parseInt(count, 10);
}
