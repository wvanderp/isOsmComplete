import { Comparison } from '../../types';
import appendCountry, { appendThanks } from '../../utils/appendData';
import { bakery, shop } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

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
            )
        ]
    );
}
