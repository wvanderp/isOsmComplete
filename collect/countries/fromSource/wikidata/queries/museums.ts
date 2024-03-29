import { Comparison } from '../../../../types';
import appendCountry from '../../../../utils/appendData';
import wikidataComparison from '../utils/wikidataComparison';

const sparqlQuery = `
SELECT (count(?item) as ?count)
WHERE
{
    ?item wdt:P31/wdt:P279* wd:Q33506 .
}`;

export default async function museum(): Promise<Comparison[]> {
    return appendCountry(
        'Worldwide',
        [
            await wikidataComparison(
                'Museums',
                sparqlQuery,
                'tourism',
                'museum',
                'The number of museums in the world',
                ['🏛️', '🎨'],
                '2023-06-18'
            )
        ]
    );
}
