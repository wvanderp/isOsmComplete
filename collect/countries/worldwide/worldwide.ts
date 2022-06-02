import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';

export default async function worldwide(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'McDonald\'s',
            'brand:wikidata',
            'Q38076',
            38000,
            'https://corporate.mcdonalds.com/corpmcd/franchising-overview.html',
            'McDonald\'s is the largest fast food chain in the world. There corporate website says that the company has 38,000 stores in the world. Are they all in osm?'
        )
    ];
}
