import axios, { AxiosError } from 'axios';
import { Comparison } from '../../../../types';
import getHash from '../../../../utils/getHash';
import taginfoKeyValue from '../../../../api/taginfo';
import { osmTagInfoServer } from '../../../../utils/taginfoComparisons';
import { delay } from '../../../../utils/delay';

const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 5000;
const REQUEST_TIMEOUT_MS = 120000; // 2 minutes timeout for SPARQL queries

/**
 * Execute a SPARQL query against Wikidata with retry logic and exponential backoff.
 *
 * @param {string} sparqlQuery - The SPARQL query to execute.
 * @param {string} name - The name of the comparison (for logging).
 * @returns {Promise<number>} The count result from the query.
 */
async function executeWikidataSparql(sparqlQuery: string, name: string): Promise<number> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Add jitter to avoid thundering herd
            const jitter = Math.random() * 2000;
            const backoffDelay = attempt === 1 ? 1000 : INITIAL_DELAY_MS * 2 ** (attempt - 2) + jitter;

            console.info(
                `[${name}] Attempt ${attempt}/${MAX_RETRIES}, waiting ${Math.round(backoffDelay)}ms before request...`
            );
            await delay(backoffDelay);

            const { data } = await axios.get<{ results: { bindings: { count: { value: string } }[] } }>(
                'https://query.wikidata.org/sparql',
                {
                    params: {
                        query: sparqlQuery,
                        format: 'json'
                    },
                    timeout: REQUEST_TIMEOUT_MS,
                    headers: {
                        'User-Agent': 'isOsmComplete/1.0 (https://github.com/example/isOsmComplete)',
                        Accept: 'application/sparql-results+json'
                    }
                }
            );

            const count = Number.parseInt(data.results.bindings[0].count.value, 10);
            console.info(`[${name}] Success! Count: ${count}`);
            return count;
        } catch (error) {
            lastError = error as Error;
            const axiosError = error as AxiosError;

            const statusCode = axiosError.response?.status;
            const isRetryable = !statusCode || statusCode === 429 || statusCode === 500 || statusCode === 502 || statusCode === 503 || statusCode === 504 || axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT';

            if (isRetryable && attempt < MAX_RETRIES) {
                console.warn(`[${name}] Attempt ${attempt} failed (${statusCode || axiosError.code || 'unknown'}), retrying...`);
            } else if (!isRetryable) {
                console.error(`[${name}] Non-retryable error (${statusCode}), giving up.`);
                break;
            }
        }
    }

    throw new Error(`[${name}] All ${MAX_RETRIES} attempts failed. Last error: ${lastError?.message}`);
}

/**
 * Fetches comparison data from Wikidata and Taginfo and returns a Comparison object.
 *
 * @param {string} name - The name of the comparison.
 * @param {string} sparqlQuery - The SPARQL query to fetch data from Wikidata.
 * @param {string} key - The key to fetch data from Taginfo.
 * @param {string} value - The value to fetch data from Taginfo.
 * @param {string} description - A description of the comparison.
 * @param {string[]} tags - An array of tags associated with the comparison.
 * @param {string} lastUpdated - The date when the comparison was last updated.
 * @param {string} [server=osmTagInfoServer] - The Taginfo server to use.
 * @returns {Promise<Comparison>} A promise that resolves to a Comparison object.
 */
export default async function wikidataComparison(
    name: string,
    sparqlQuery: string,
    key: string,
    value: string,
    description: string,
    tags: string[],
    lastUpdated: string,
    server = osmTagInfoServer
): Promise<Comparison> {
    console.info(`Starting on ${name}`);

    const expected = await executeWikidataSparql(sparqlQuery, name);
    const actual = await taginfoKeyValue(key, value, server);

    return {
        id: getHash(sparqlQuery),
        name,
        expected,
        actual,
        expectedSource: 'Wikidata query service',
        actualSource: 'taginfo',
        description,
        tags,
        lastUpdated
    };
}
