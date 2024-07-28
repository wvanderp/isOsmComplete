import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.VN;

export default async function vietnam(): Promise<Comparison[]> {
    return appendCountry(
        'VN',
        [
            await taginfoComparisonMultipleTags(
                'McDonald\'s in Vietnam',
                brandWikidata,
                ['Q38076', 'Q12061542'],
                35,
                'https://mcdonalds.vn/cua-hang.html', // counted by 
                'McDonald\'s was never able to enter the Vietnamese market. They only managed to open {{expected}} stores. To console them, we should have them all in OSM.',
                ['🍔', '🛒'],
                '2024-07-28',
                taginfoServer
            ),
            await taginfoComparisons(
                'Burger King in Vietnam',
                brandWikidata,
                'Q177054',
                11,
                'https://burgerking.vn/storepickup',
                'Burger King is also not very successful in Vietnam. They only have {{expected}} stores. Are they all in OSM?',
                ['🍔', '🛒'],
                '2024-07-28',
                taginfoServer
            )
        ]
    );
}
