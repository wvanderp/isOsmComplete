import { Comparison } from '../../types';
import { brandWikidata } from '../../utils/osmTags';
import taginfoComparisons, { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

export default async function worldwide(): Promise<Comparison[]> {
    return [
        await taginfoComparisonMultipleTags(
            'McDonald\'s',
            brandWikidata,
            ['Q38076', 'Q12061542'],
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
        ),
        await taginfoComparisons(
            'IKEA stores',
            brandWikidata,
            'Q54078',
            460,
            'https://about.ikea.com/en/about-us',
            'IKEA is a furniture store. They have 466 stores in 63 countries. Are they all in osm?'
        ),
        await taginfoComparisons(
            '7-Eleven stores',
            brandWikidata,
            'Q259340',
            78029,
            'https://en.wikipedia.org/wiki/7-Eleven',
            'A 7-Eleven is always nearby. because there are 78,029 of them in 18 countries. is your closest 7-Eleven in osm?'
        ),
        await taginfoComparisons(
            'Subway stores',
            brandWikidata,
            'Q244457',
            36821,
            'https://en.wikipedia.org/wiki/Subway_(restaurant)',
            'Subway and McDonald\'s are the two largest fast food chains in the world. who has more stores?'
        ),
        await taginfoComparisons(
            'Starbucks',
            brandWikidata,
            'Q37158',
            35711,
            'https://s22.q4cdn.com/869488222/files/doc_financials/2022/q4/Q4-FY22-Earnings-Release-Final-11.3.2022.pdf',
            'Starbucks seems to be everywhere. But can you find them all in osm?'
        )
    ];
}
