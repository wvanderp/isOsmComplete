import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe:germany';

export default async function germany(): Promise<Comparison[]> {
    return appendCountry(
        'DE',
        [
            await taginfoComparisons(
                'REWE',
                brandWikidata,
                'Q16968817',
                47200,
                'https://www.rewe-group.com/content/uploads/2023/06/rewe-group-financial-report-2022.pdf?t=2023092210',
                'Are all the REWE stores in OSM?',
                ['🛒'],
                '2023-06-01',
                taginfoServer
            ),
            await taginfoComparisons(
                'PENNY',
                brandWikidata,
                'Q284688',
                2135,
                'https://www.rewe-group.com/content/uploads/2023/06/rewe-group-financial-report-2022.pdf?t=2023092210',
                'Are all the PENNY stores in OSM?',
                ['🛒'],
                '2023-06-01',
                taginfoServer
            )
        ]
    );
}
