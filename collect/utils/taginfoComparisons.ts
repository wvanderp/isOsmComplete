import taginfoKeyValue, { taginfoKey } from '../api/taginfo';
import { Comparison } from '../types';
import getHash from './getHash';

export const osmTagInfoServer = 'https://taginfo.openstreetmap.org';
/**
 * creates a comparison object for a single tag
 *
 * @param name name of the comparison
 * @param key the key to search for in Taginfo
 * @param value the tag to search for in Taginfo
 * @param expected the expected count
 * @param expectedSource the source of the expected count
 * @param description a funny description of the comparison
 * @param tags Emoji tags to help categorize the comparison
 * @param lastUpdated the last time the comparison was updated
 * @param server the taginfo server to use for the comparison
 * @returns a comparison object
 */
export default async function taginfoComparisons(
    name: string,
    key: string,
    value: string,
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string,
    server = osmTagInfoServer
): Promise<Comparison> {
    console.log(`starting on ${name}`);

    const count = await taginfoKeyValue(key, value, server);

    return {
        id: getHash(`${key}${value}${server}`),
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

/**
 * creates a comparison object for a key
 * any value of the key will be counted
 *
 * @param name name of the comparison
 * @param key the key to search for in Taginfo
 * @param expected the expected count
 * @param expectedSource the source of the expected count
 * @param description a funny description of the comparison
 * @param tags Emoji tags to help categorize the comparison
 * @param lastUpdated the last time the comparison was updated
 * @param server the taginfo server to use for the comparison
 * @returns a comparison object
 */
export async function taginfoComparisonKeyOnly(
    name: string,
    key: string,
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string,
    server = osmTagInfoServer
): Promise<Comparison> {
    console.log(`starting on ${name}`);
    const count = await taginfoKey(key, server);

    return {
        id: getHash(`${key}${server}`),
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

/**
 * creates a comparison object for a combination of multiple tags
 *
 * @param name name of the comparison
 * @param key the key to search for in Taginfo
 * @param values the multiple tags to search for in Taginfo
 * @param expected the expected count
 * @param expectedSource the source of the expected count
 * @param description a funny description of the comparison
 * @param tags Emoji tags to help categorize the comparison
 * @param lastUpdated the last time the comparison was updated
 * @param server the taginfo server to use for the comparison
 * @returns a comparison object
 */
export async function taginfoComparisonMultipleTags(
    name: string,
    key: string,
    values: string[],
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string,
    server = osmTagInfoServer
): Promise<Comparison> {
    console.log(`starting on ${name}`);

    const taginfos = await Promise.all(
        values.map((tag) => taginfoKeyValue(key, tag, server))
    );

    const count = taginfos.reduce((a, b) => a + b, 0);

    return {
        id: getHash(`${key}${values.join('')}${server}`),
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
