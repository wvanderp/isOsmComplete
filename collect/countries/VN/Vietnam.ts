import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.VN;

export default appendCountry(
    'VN',
    [
        taginfoComparisonMultipleTags(
            'McDonald\'s in Vietnam',
            brandWikidata,
            ['Q38076', 'Q12061542'],
            59,
            'https://mcdonalds.vn/cua-hang.html', // Counted by hand
            'McDonald\'s was never able to enter the Vietnamese market. They only managed to open {{expected}} stores. To console them, we should have them all in OSM.',
            ['🍔', '🛒'],
            '2026-05-25',
            taginfoServer
        ),
        taginfoComparisons(
            'Burger King in Vietnam',
            brandWikidata,
            'Q177054',
            4,
            'https://burgerking.vn/storepickup',
            'Burger King is also not very successful in Vietnam. They only have {{expected}} stores. Are they all in OSM?',
            ['🍔', '🛒'],
            '2026-05-25',
            taginfoServer
        )
    ]
);
