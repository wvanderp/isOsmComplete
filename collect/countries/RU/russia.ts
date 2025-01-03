import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.RU;

export default async function russia(): Promise<Comparison[]> {
    return appendCountry(
        'RU',
        [
            await taginfoComparisons(
                'Pyaterochka',
                brandWikidata,
                'Q1768969',
                19164,
                'https://www.x5.ru/wp-content/uploads/2023/06/x5-ar-2022-eng.pdf',
                'Pyaterochka (Пятёрочка), literally translated to "Five", is a Russian convenience store. There should be {{expected}} of them in OSM.',
                ['🛒'],
                '2023-11-23',
                taginfoServer
            )
        ]
    );
}
