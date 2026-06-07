import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.RU;

export default appendCountry(
    'RU',
    [
        taginfoComparisons(
            'Pyaterochka',
            brandWikidata,
            'Q1768969',
            21308,
            'https://www.x5.ru/wp-content/uploads/reports/2023/en/financial-statements/',
            'Pyaterochka (Пятёрочка), literally translated to "Five", is a Russian convenience store. There should be {{expected}} of them in OSM.',
            ['🛒'],
            '2025-01-05',
            taginfoServer
        ),
        taginfoComparisonMultipleTags(
            'McDonald\'s leaves Russia',
            brandWikidata,
            ['Q38076', 'Q12061542'],
            0,
            'https://corporate.mcdonalds.com/corpmcd/our-stories/article/mcd-exit-russia.html',
            'Many companies have left Russia due to the very "Special" Military Operation in Ukraine. McDonald\'s is one of them. Are all the McDonald\'s in Russia removed from OSM?',
            ['🍔', '🛒'],
            '2025-01-05',
            taginfoServer
        )
    ]
);
