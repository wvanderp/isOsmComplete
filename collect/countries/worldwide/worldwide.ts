import { Comparison } from '../../types';
import taginfoComparisons, { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';

export default async function worldwide(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'McDonald\'s',
            'brand:wikidata',
            'Q38076',
            38000,
            'https://corporate.mcdonalds.com/corpmcd/franchising-overview.html',
            'McDonald\'s is the largest fast food chain in the world. There corporate website says that the company has 38,000 stores in the world. Are they all in osm?'
        ),
        await taginfoComparisonKeyOnly(
            'Match Google on building',
            'building',
            1600000000,
            'https://youtu.be/nP-nMZpLM1A?t=409',
            'Google, in there 2022 keynote, claim that they have 1,600,000,000 buildings. Are we even close with osm?'
        ),
        await taginfoComparisons(
            'Stolpersteine',
            'memorial:type',
            'stolperstein',
            90000,
            'https://www.goethe.de/ins/nl/nl/kul/kue/22217305/22263584.html',
            'Stolpersteine are monuments to the victims of world war two. They should be in osm.'
        )
    ];
}
