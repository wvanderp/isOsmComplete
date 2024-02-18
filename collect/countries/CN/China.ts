import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { overpassComparisonMultiple } from '../../utils/overpassComparisons';

const chinaArea = 3600270056;

export default async function china(): Promise<Comparison[]> {
    return appendCountry(
        'CN',
        [
            await overpassComparisonMultiple(
                'Train stations',
                [['railway', 'station'], ['train', 'yes']],
                'and',
                5470,
                'https://en.wikipedia.org/wiki/Rail_transport_in_China#cite_note-CNCRCC-4',
                'China transports a lot of people by train. Can the find their stations in OSM?',
                ['🚂'],
                '2023-11-28',
                chinaArea
            )
        ]
    );
}
