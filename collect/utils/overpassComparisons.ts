import overpassSimpleQuery from '../api/overpass';
import { Comparison } from '../types';
import getHash from './getHash';

export default async function overpassComparison(
    name: string,
    key: string,
    value: string,
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string
): Promise<Comparison> {
    console.log(`starting on ${name}`);

    const count = await overpassSimpleQuery([[key, value]]);

    return {
        id: getHash(`${key}${value}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        tags,
        description,
        lastUpdated
    };
}

export async function overpassComparisonMultiple(
    name: string,
    query: [string, string][],
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string
): Promise<Comparison> {
    console.log(`starting on ${name}`);

    const count = await overpassSimpleQuery(query);

    return {
        id: getHash(JSON.stringify(query)),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        tags,
        description,
        lastUpdated
    };
}
