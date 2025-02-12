import axios from 'axios';
import { Comparison } from '../../../../types';
import getHash from '../../../../utils/getHash';
import taginfoKeyValue from '../../../../api/taginfo';
import { osmTagInfoServer } from '../../../../utils/taginfoComparisons';

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

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    const { data } = await axios.post<{ results: { bindings: { count: { value: string } }[] } }>(
        `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`
    );

    const expected = Number.parseInt(data.results.bindings[0].count.value, 10);
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
