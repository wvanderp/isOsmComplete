import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/';

export default async function EU(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'Fastned charger in the EU',
            'operator:wikidata',
            'Q19935749',
            200,
            'https://fastnedcharging.com/hq/nl/fastned-ziet-verkopen-met-159-stijgen-in-eerste-kwartaal-2022/',
            'Fastned is a provider of charging stations in Europe. What is the charge of Fastned in osm?',
            taginfoServer
        )
    ];
}
