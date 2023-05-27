import { overpassJson } from 'overpass-ts';
import { OverpassCount } from '../types';
import randomDelay from '../utils/delay';

export default async function overpassSimpleQuery(queries: [string, string][]): Promise<number> {
    const queryPart = queries.map(([key, value]) => `["${key}"="${value}"]`).join('');
    const query = `[out:json][timeout:25];(nwr${queryPart};);out count;`;

    const queryUrl = 'https://overpass-api.de/api/interpreter';
    return callApi(queryUrl, query);
}

async function callApi(url: string, query: string): Promise<number> {
    randomDelay(1000, 10000);

    const data = await overpassJson(query) as OverpassCount;
    const count = data.elements[0].tags.total;

    return Number.parseInt(count, 10);
}
