import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.openstreetmap.org.uk/';

export default async function greatBrittan(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'Pubs in the UK',
            'amenity',
            'pub',
            47200,
            'https://commonslibrary.parliament.uk/research-briefings/cbp-8591/',
            'Are all the locations for Britten\'s favorite pass time in osm?',
            taginfoServer
        )
    ];
}
