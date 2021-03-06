import taginfoKeyValue, { taginfoKey } from '../api/taginfo';
import { Comparison } from '../types';
import getHash from './getHash';

function cleanServer(server: string): string {
    if (server[server.length - 1] === '/') {
        // eslint-disable-next-line no-param-reassign
        server = server.slice(0, -1);
    }

    return server;
}

export default async function taginfoComparisons(
    name: string,
    key: string,
    value: string,
    expected: number,
    expectedSource: string,
    description: string,
    server = 'https://taginfo.openstreetmap.org'
): Promise<Comparison> {
    const count = await taginfoKeyValue(key, value, cleanServer(server));

    return {
        id: getHash(`${key}${value}${server}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        description
    };
}

export async function taginfoComparisonKeyOnly(
    name: string,
    key: string,
    expected: number,
    expectedSource: string,
    description: string,
    server = 'https://taginfo.openstreetmap.org'
): Promise<Comparison> {
    const count = await taginfoKey(key, cleanServer(server));

    return {
        id: getHash(`${key}${server}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        description
    };
}
