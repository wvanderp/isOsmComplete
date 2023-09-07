import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/great-britain/england/greater-london';

export default async function london(): Promise<Comparison[]> {
    return appendCountry(
        'London',
        [
            await taginfoComparisons(
                'Surveillance cameras in London',
                'surveillance:type',
                'camera',
                691000,
                'https://www.cctv.co.uk/how-many-cctv-cameras-are-there-in-london/',
                'London might be the most watched city in the world. But who watches the watcher?',
                ['👀'],
                '2023-02-19',
                taginfoServer
            )
        ]
    );
}
