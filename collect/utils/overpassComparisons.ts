import overpassSimpleQuery from '../api/overpass';
import { Comparison } from '../types';
import getHash from './getHash';

/**
 * Performs a comparison between expected and actual counts of OpenStreetMap features
 * @param name - The name of the comparison
 * @param key - The OSM tag key to query
 * @param value - The OSM tag value to query
 * @param expected - The expected count of features
 * @param expectedSource - The source of the expected count
 * @param description - A description of what is being compared
 * @param tags - Array of tags for categorizing the comparison
 * @param lastUpdated - Date string of when the comparison was last updated
 * @param areaID - Optional area ID to restrict the query to
 * @returns Promise containing the comparison result
 */
export default async function overpassComparison(
    name: string,
    key: string,
    value: string,
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string,
    areaID?: number
): Promise<Comparison> {
    console.info(`Starting on ${name}`);

    const count = await overpassSimpleQuery([[key, value]], areaID);

    return {
        id: getHash(`${key}${value}`),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'overpass',
        tags,
        description,
        lastUpdated
    };
}

/**
 * Performs a comparison using multiple OSM tags combined with AND/OR operators
 * @param name - The name of the comparison
 * @param query - Array of [key, value] pairs representing OSM tags
 * @param operator - Whether to combine tags with 'and' or 'or'
 * @param expected - The expected count of features
 * @param expectedSource - The source of the expected count
 * @param description - A description of what is being compared
 * @param tags - Array of tags for categorizing the comparison
 * @param lastUpdated - Date string of when the comparison was last updated
 * @param areaID - Optional area ID to restrict the query to
 * @returns Promise containing the comparison result
 */
export async function overpassComparisonMultiple(
    name: string,
    query: [string, string][],
    operator: 'and' | 'or',
    expected: number,
    expectedSource: string,
    description: string,
    tags: string[],
    lastUpdated: string,
    areaID?: number
): Promise<Comparison> {
    console.info(`Starting on ${name}`);

    const count = await overpassSimpleQuery(query, areaID, operator);

    return {
        id: getHash(JSON.stringify(query)),
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'overpass',
        tags,
        description,
        lastUpdated
    };
}
