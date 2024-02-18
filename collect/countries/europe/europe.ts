import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';
import retailStoresInEurope from './data.europe';

const taginfoServer = taginfoServers.EU;

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
                'Fastned is a provider of charging stations in Europe. What is the charge of Fastned in OSM?',
                ['🔋', '🚗'],
                '2023-09-24',
                taginfoServer
            ),

            ...(await retailStoresInEurope())
        ]
    );
}
