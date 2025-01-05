import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.London;

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
                'London might be the most watched city in the world. But who watches the watchers?',
                ['👀'],
                '2025-01-05',
                taginfoServer
            )
        ]
    );
}
