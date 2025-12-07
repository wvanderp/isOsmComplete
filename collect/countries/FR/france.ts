import { Comparison } from '../../types';
import appendCountry, { appendThanks } from '../../utils/appendData';
import { bakery, shop } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';
import overpassComparison from '../../utils/overpassComparisons';

const taginfoServer = taginfoServers.FR;

export default async function france(): Promise<Comparison[]> {
    return appendCountry(
        'FR',
        [
            appendThanks(
                await taginfoComparisons(
                    'Bakeries in France 🍞🥐🥖',
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
            await taginfoComparisons(
                'Jeux de boules (Boulodromes) in France 🇫🇷',
                'sport',
                'boules',
                28664,
                'https://equipements.sports.gouv.fr/api/explore/v2.1/catalog/datasets/data-es/records?limit=0&refine=equip_type_famille%3A%22Boulodrome%22',
                'The French government says there are 28,664 places to play boules. OSM is still rolling towards that number. Vive la pétanque! 🎳🥖🇫🇷',
                ['🎳', '🇫🇷', '🥖'],
                '2025-05-28',
                taginfoServer
            )
        ]
    );
}
