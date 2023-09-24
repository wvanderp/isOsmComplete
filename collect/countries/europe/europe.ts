import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import taginfoComparisons from '../../utils/taginfoComparisons';
import retailStoresInEurope from './data.europe';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/';

export default async function europe(): Promise<Comparison[]> {
    return appendCountry(
        'EU',
        [
            await taginfoComparisons(
                'Fastned charger in the EU',
                'operator:wikidata',
                'Q19935749',
                272,
                'https://fastnedcharging.com/hq/nl/fastned-bereikt-mijlpaal-van-positief-onderliggend-ebitda-resultaat/',
                'Fastned is a provider of charging stations in Europe. What is the charge of Fastned in osm?',
                ['🔋', '🚗'],
                '2023-09-24',
                taginfoServer
            ),

            ...(await retailStoresInEurope())
        ]
    );
}
