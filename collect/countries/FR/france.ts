import axios from 'axios';
import { Comparison } from '../../types';
import appendCountry, { appendThanks } from '../../utils/appendData';
import { bakery, shop } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleKeyValuePairs } from '../../utils/taginfoComparisons';
import { overpassComparisonRaw } from '../../utils/overpassComparisons';

const taginfoServer = taginfoServers.FR;

async function getChargingStationsCount(): Promise<number> {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/2729b192-40ab-4454-904d-735084dca3a3/data/?page_size=1';
    const result = await axios.get<{ 'meta': { 'total': number } }>(url);
    return result.data.meta.total;
}

export default async function france(): Promise<Comparison[]> {
    // Fetch boulodromes count from French Government API
    const boulodromesUrl = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=0&refine=equip_type_famille%3A%22Boulodrome%22';
    const boulodromesResponse = await axios.get<{ 'total_count': number, 'results': [] }>(boulodromesUrl);
    const boulodromesCount = boulodromesResponse.data.total_count;

    // Fetch rail stations count from French Government API
    const railStationsUrl = 'https://tabular-api.data.gouv.fr/api/resources/cbacca02-6925-4a46-aab6-7194debbb9b7/data/?page_size=1';
    const railStationsResponse = await axios.get<{ 'meta': { 'total': number } }>(railStationsUrl);
    const railStationsCount = railStationsResponse.data.meta.total;

    return appendCountry(
        'FR',
        [
            appendThanks(
                await taginfoComparisons(
                    'Bakeries in France 🇫🇷',
                    shop,
                    bakery,
                    57300,
                    'https://github.com/wvanderp/isOsmComplete/issues/1',
                    'Tu aimes les baguettes? 🥖🥖🥖 Then you better make sure that OSM knows where the nearest bakery is.',
                    ['🛒'],
                    '2025-01-05',
                    taginfoServer
                ),
                'Merci beaucoup à [@Binnette](https://github.com/Binnette) for the suggestion and for providing the data!'
            ),
            appendThanks(
                await taginfoComparisons(
                    'Jeux de boules (Boulodromes) in France 🇫🇷',
                    'sport',
                    'boules',
                    boulodromesCount,
                    'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=0&refine=equip_type_famille%3A%22Boulodrome%22',
                    'The French government says there are 28,664 places to play boules. OSM is still rolling towards that number. Vive la pétanque!',
                    ['🎱'],
                    '2025-05-28',
                    taginfoServer
                ),
                'Thanks again to [@Binnette](https://github.com/Binnette) for reading through French government datasets and suggesting this one!'
            ),
            appendThanks(
                await taginfoComparisonMultipleKeyValuePairs(
                    'Rail stations in France 🇫🇷',
                    [['railway', 'station']],
                    railStationsCount,
                    'https://www.data.gouv.fr/datasets/gares-de-voyageurs-1/',
                    'All aboard! 🚂 The French government tracks {{expected}} rail stations across France. Let\'s make sure they\'re all mapped in OSM!',
                    ['🚂'],
                    '2025-12-07',
                    taginfoServer
                ),
                'And another thanks to [@Binnette](https://github.com/Binnette) for this suggestion as well!'
            ),
            appendThanks(
                await overpassComparisonRaw(
                    'Electric vehicle charging stations in France 🇫🇷',
                    `[out:json][timeout:120];
area[name="France"]->.fr;
nwr["amenity"="charging_station"](area.fr);
out count;`,
                    await getChargingStationsCount(),
                    'https://www.data.gouv.fr/datasets/base-nationale-des-irve-infrastructures-de-recharge-pour-vehicules-electriques/',
                    'The French government maintains a database of EV charging infrastructure. OSM is charging towards full coverage! ⚡',
                    ['🔋', '🚗'],
                    '2025-12-07'
                ),
                'Thanks to [@Binnette](https://github.com/Binnette) for finding this dataset! 🚗⚡'
            )
        ]
    );
}
