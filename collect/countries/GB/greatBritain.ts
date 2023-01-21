import { Comparison } from '../../types';
import { brandWikidata } from '../../utils/osmTags';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.openstreetmap.org.uk/';

export default async function greatBritain(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'Pubs in the UK',
            'amenity',
            'pub',
            47200,
            'https://commonslibrary.parliament.uk/research-briefings/cbp-8591/',
            'Are all the locations for Britten\'s favorite pass time in osm?',
            taginfoServer
        ),
        await taginfoComparisons(
            'Royal Mail post boxes',
            brandWikidata,
            'Q638098',
            115000,
            'https://personal.help.royalmail.com/app/answers/detail/a_id/135/~/royal-mails-postbox-network---your-questions-answered',
            'Are all the Royal Mail post boxes in osm?',
            taginfoServer
        )
    ];
}
