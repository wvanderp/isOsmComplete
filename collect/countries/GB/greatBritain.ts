import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata, operatorWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';
import london from './London';

const taginfoServer = taginfoServers.GB;

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
                'Are all the locations for Britain\'s favorite pastime in OSM?',
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
                'If you have the sudden urge to send a letter, you can find one of the {{expected}} Royal Mail post boxes in the UK. Some of them are in OSM too.',
                ['📮'],
                '2024-12-30',
                taginfoServer
            ),
            await taginfoComparisons(
                'Tesco',
                brandWikidata,
                'Q487494',
                3712,
                'https://www.tescoplc.com/media/u1wlq2qf/tesco-plc-annual-report-2023.pdf',
                'Are all the Tesco stores in OSM?',
                ['🛒'],
                '2023-09-24',
                taginfoServer
            ),
            await taginfoComparisons(
                'National Car Parks',
                operatorWikidata,
                'Q6971273',
                642,
                'https://www.ncp.co.uk/help-centre/about-us/',
                'NCP claims to sprinkle "beautiful" parking spots all over Britain. Fancy using OSM to uncover the one they deem closest to your majestic presence?',
                ['🚗'],
                '2023-11-23',
                taginfoServer
            ),

            ...(await london())
        ]
    );
}
