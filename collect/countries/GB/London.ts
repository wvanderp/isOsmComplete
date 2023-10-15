import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe:great-britain:england:greater-london';

export default async function london(): Promise<Comparison[]> {
    return appendCountry(
        'GB',
        [
            await taginfoComparisons(
                'Surveillance cameras in London',
                'surveillance:type',
                'camera',
                942562,
                'https://clarionuk.com/resources/how-many-cctv-cameras-are-in-london/',
                'London might be the most watched city in the world. But who watches the watcher?',
                ['👀'],
                '2023-10-15',
                taginfoServer
            )
        ]
    );
}
