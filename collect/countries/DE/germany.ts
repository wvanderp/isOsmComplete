import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.DE;

export default async function germany(): Promise<Comparison[]> {
    return appendCountry(
        'DE',
        [
            await taginfoComparisons(
                'REWE',
                brandWikidata,
                'Q16968817',
                3674 + 16 , // 3674 + 16 convenience stores
                'https://www.rewe-group.com/content/uploads/2024/05/rewe-financal-report-31.12.2023.pdf?t=2024052702',
                'Are all the REWE stores in OSM?',
                ['🛒'],
                '2024-07-28',
                taginfoServer
            ),
            await taginfoComparisons(
                'PENNY',
                brandWikidata,
                'Q284688',
                2123,
                'https://www.rewe-group.com/content/uploads/2024/05/rewe-financal-report-31.12.2023.pdf?t=2024052702',
                'Are all the PENNY stores in OSM?',
                ['🛒'],
                '2024-07-28',
                taginfoServer
            )
        ]
    );
}
