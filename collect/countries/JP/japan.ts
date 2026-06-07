import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.JP;

export default appendCountry(
    'JP',
    [
        taginfoComparisons(
            '7-Eleven in Japan',
            brandWikidata,
            'Q259340',
            21651,
            'https://www.sej.co.jp/company/en/n_stores.html',
            '7-Eleven is everywhere in Japan. There should be {{expected}} corners in Japan with a 7-Eleven.',
            ['🛒'],
            '2025-02-02',
            taginfoServer
        ),
        taginfoComparisonMultipleTags(
            'FamilyMart',
            brandWikidata,
            ['Q11247682', 'Q1191685'],
            16245,
            'https://www.family.co.jp/english/company/store.html',
            'The FamilyMart family is huge in Japan. But have we found all of our relatives in OSM?',
            ['🛒'],
            '2025-02-02',
            taginfoServer
        ),
        taginfoComparisons(
            'Lawson',
            brandWikidata,
            'Q1557223',
            14608,
            'https://www.lawson.jp/en/store/japan/',
            'Lawson is a convenience store in Japan. There are {{expected}} of them in Japan. Are they all in OSM?',
            ['🛒'],
            '2025-02-02',
            taginfoServer
        ),
        taginfoComparisons(
            'Shinto shrines',
            'religion',
            'shinto',
            80394,
            'https://en.wikipedia.org/wiki/Shinto_shrine',
            'Shinto shrines are everywhere in Japan. There should be {{expected}} of them in Japan.',
            ['⛩️'],
            '2025-02-02',
            taginfoServer
        )
    ]
);
