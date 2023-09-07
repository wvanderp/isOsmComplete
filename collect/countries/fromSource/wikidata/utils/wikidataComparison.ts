import axios from 'axios';
import { Comparison } from '../../../../types';
import getHash from '../../../../utils/getHash';
import taginfoKeyValue from '../../../../api/taginfo';
import { osmTagInfoServer } from '../../../../utils/taginfoComparisons';

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
