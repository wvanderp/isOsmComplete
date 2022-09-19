import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/great-britain/england/greater-london';

export default async function london(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'Survalance cameras in London',
            'surveillance:type',
            'camera',
            691000,
            'https://www.cctv.co.uk/how-many-cctv-cameras-are-there-in-london/',
            'London might be the most wached city in the world. but who watches the watcher?',
            taginfoServer
        )
    ];
}
