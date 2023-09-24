import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import { brandWikidata } from '../../utils/osmTags';
import taginfoComparisons from '../../utils/taginfoComparisons';
import london from './London';

const taginfoServer = 'https://taginfo.openstreetmap.org.uk/';

export default async function greatBritain(): Promise<Comparison[]> {
    return appendCountry(
        'GB',
        [
            await taginfoComparisons(
                'Pubs in the UK',
                'amenity',
                'pub',
                47200,
                'https://commonslibrary.parliament.uk/research-briefings/cbp-8591/',
                'Are all the locations for Britten\'s favorite pass time in osm?',
                ['🍺', '🛒'],
                '2023-09-24',
                taginfoServer
            ),
            await taginfoComparisons(
                'Royal Mail post boxes',
                brandWikidata,
                'Q638098',
                115000,
                'https://personal.help.royalmail.com/app/answers/detail/a_id/135/~/royal-mails-postbox-network---your-questions-answered',
                'Are all the Royal Mail post boxes in osm?',
                ['📮'],
                '2023-09-22',
                taginfoServer
            ),
            await taginfoComparisons(
                'Tesco',
                brandWikidata,
                'Q487494',
                3712,
                'https://www.tescoplc.com/media/u1wlq2qf/tesco-plc-annual-report-2023.pdf',
                'Are all the Tesco stores in osm?',
                ['🛒'],
                '2023-09-24',
                taginfoServer
            ),

            ...(await london())
        ]
    );
}
