import axios from 'axios';
import appendCountry, { appendThanks } from '../../utils/appendData';
import { bakery, shop } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleKeyValuePairs } from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.FR;

async function getBoulodromesCount(): Promise<number> {
    const boulodromesUrl = 'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=0&refine=equip_type_famille%3A%22Boulodrome%22';
    const boulodromesResponse = await axios.get<{ 'total_count': number, 'results': [] }>(boulodromesUrl);
    return boulodromesResponse.data.total_count;
}

async function getRailStationsCount(): Promise<number> {
    const railStationsUrl = 'https://tabular-api.data.gouv.fr/api/resources/cbacca02-6925-4a46-aab6-7194debbb9b7/data/?page_size=1';
    const railStationsResponse = await axios.get<{ 'meta': { 'total': number } }>(railStationsUrl);
    return railStationsResponse.data.meta.total;
}

async function getChargingStationsCount(): Promise<number> {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/eb76d20a-8501-400e-b336-d85724de5435/data/';
    const result = await axios.get<{ 'meta': { 'total': number } }>(url);
    return result.data.meta.total;
}

export default appendCountry(
    'FR',
    [
        appendThanks(
            () => taginfoComparisons(
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
            async () => taginfoComparisons(
                'Jeux de boules (Boulodromes) in France 🇫🇷',
                'sport',
                'boules',
                await getBoulodromesCount(),
                'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=0&refine=equip_type_famille%3A%22Boulodrome%22',
                'The French government says there are 28,664 places to play boules. OSM is still rolling towards that number. Vive la pétanque!',
                ['🎱'],
                '2025-05-28',
                taginfoServer
            ),
            'Thanks again to [@Binnette](https://github.com/Binnette) for reading through French government datasets and suggesting this one!'
        ),
        appendThanks(
            async () => taginfoComparisonMultipleKeyValuePairs(
                'Rail stations in France 🇫🇷',
                [['railway', 'station']],
                await getRailStationsCount(),
                'https://www.data.gouv.fr/datasets/gares-de-voyageurs-1/',
                'All aboard! 🚂 The French government tracks {{expected}} rail stations across France. Let\'s make sure they\'re all mapped in OSM!',
                ['🚂'],
                '2025-12-07',
                taginfoServer
            ),
            'And another thanks to [@Binnette](https://github.com/Binnette) for this suggestion as well!'
        ),
        appendThanks(
            async () => taginfoComparisons(
                'Electric vehicle charging stations in France 🇫🇷',
                'amenity',
                'charging_station',
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
