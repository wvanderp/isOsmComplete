import { overpassJson } from 'overpass-ts';
import { OverpassCount } from '../types';
import randomDelay from '../utils/delay';

/**
 * Executes a simple Overpass query and returns the count of matching elements.
 * @param {[string, string][]} queries - An array of key-value pairs representing the query parameters.
 * @param {number} [area] - The ID of an area to limit the query to.
 * @returns A promise that resolves to the count of matching elements.
 */
export default async function overpassSimpleQuery(queries: [string, string][], area?: number): Promise<number> {
    const queryPart = queries.map(([key, value]) => `["${key}"="${value}"]`).join('');
    const query = `
    [out:json][timeout:25];
    ${area ? `area(id:${area})->.searchArea;` : ''}
    nwr${queryPart}${area ? '(area.searchArea)' : ''};
    out count;`;

    return callApi(query);
}

async function callApi(query: string): Promise<number> {
    randomDelay(1000, 10000);

    const data = await overpassJson(query) as OverpassCount;
    const count = data.elements[0].tags.total;

    return Number.parseInt(count, 10);
}
