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

const osmTagInfoServer = 'https://taginfo.openstreetmap.org';

export default async function taginfoComparisons(
    name: string,
    key: string,
    value: string,
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    server = osmTagInfoServer
): Promise<Comparison> {
    // eslint-disable-next-line no-console
    console.log(`starting on ${name}`);

    const count = await taginfoKeyValue(key, value, cleanServer(server));

    return {
        id: getHash(`${key}${value}${server}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        tags,
        description
    };
}

export async function taginfoComparisonKeyOnly(
    name: string,
    key: string,
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    server = osmTagInfoServer
): Promise<Comparison> {
    const count = await taginfoKey(key, cleanServer(server));

    return {
        id: getHash(`${key}${server}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        tags,
        description
    };
}

export async function taginfoComparisonMultipleTags(
    name: string,
    key: string,
    osmTags: string[],
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    server = osmTagInfoServer
): Promise<Comparison> {
    const taginfos = await Promise.all(
        osmTags.map((tag) => taginfoKeyValue(key, tag, cleanServer(server)))
    );

    const count = taginfos.reduce((a, b) => a + b, 0);

    return {
        id: getHash(`${key}${osmTags.join('')}${server}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        tags,
        description
    };
}
