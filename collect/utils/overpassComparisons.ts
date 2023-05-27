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
    tags: string[]
): Promise<Comparison> {
    // eslint-disable-next-line no-console
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
        description
    };
}

export async function overpassComparisonMultiple(
    name: string,
    query: [string, string][],
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[]
): Promise<Comparison> {
    // eslint-disable-next-line no-console
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
        description
    };
}
