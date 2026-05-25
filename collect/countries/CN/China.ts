import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { overpassComparisonMultiple } from '../../utils/overpassComparisons';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const chinaArea = 3600270056;
const taginfoServer = taginfoServers.CN;

export default async function china(): Promise<Comparison[]> {
    return appendCountry(
        'CN',
        [
            await overpassComparisonMultiple(
                'Train stations in China',
                [['railway', 'station'], ['train', 'yes']],
                'and',
                5470,
                'https://en.wikipedia.org/wiki/Rail_transport_in_China#cite_note-CNCRCC-4',
                'China transports a lot of people by train. Can they find their stations in OSM?',
                ['🚂'],
                '2026-05-25',
                chinaArea
            ),
            await taginfoComparisons(
                'Coal power plants in China',
                'generator:source',
                'coal',
                3317, // operating only
                'https://globalenergymonitor.org/projects/global-coal-plant-tracker?popup=2628',
                "Coal is a big part of China's energy production. Reducing carbon emissions means reducing coal power plants. Can OSM help with that?",
                ['⚡'],
                '2026-05-25',
                taginfoServer
            )
        ]
    );
}
