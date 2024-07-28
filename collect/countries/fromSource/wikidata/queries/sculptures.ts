import { Comparison } from '../../../../types';
import appendCountry from '../../../../utils/appendData';
import wikidataComparison from '../utils/wikidataComparison';

const sparqlQuery = `
SELECT (count(?item) as ?count)
WHERE
{
    ?item wdt:P31/wdt:P279* wd:Q860861 .
    ?item wdt:P625 ?coord.
    FILTER NOT EXISTS { ?item wdt:P576 ?enddate } # Exclude demolished sculptures (P576 = end date)
    FILTER NOT EXISTS { ?item wdt:P31 wd:Q15072800 } # Exclude cemetery cros
}`;

export default async function sculptures(): Promise<Comparison[]> {
    return appendCountry(
        'Worldwide',
        [
            await wikidataComparison(
                'Sculptures',
                sparqlQuery,
                'artwork_type',
                'sculpture',
                'It is always nice to have some art in your city. Is your local sculpture in OSM?',
                ['🎨'],
                '2023-09-24'
            )
        ]
    );
}
