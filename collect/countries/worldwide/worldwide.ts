import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import { brandWikidata } from '../../utils/osmTags';
import { overpassComparisonMultiple } from '../../utils/overpassComparisons';
import taginfoComparisons, { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import airports from './airports';

export default async function worldwide(): Promise<Comparison[]> {
    return appendCountry(
        'worldwide',
        [
            await taginfoComparisonKeyOnly(
                'Match Google on building',
                'building',
                1600000000,
                'https://youtu.be/nP-nMZpLM1A?t=409',
                'Google, in there 2022 keynote, claim that they have 1,600,000,000 buildings. Are we even close with osm?',
                []
            ),
            await taginfoComparisons(
                'Stolpersteine',
                'memorial:type',
                'stolperstein',
                90000,
                'https://www.goethe.de/ins/nl/nl/kul/kue/22217305/22263584.html',
                'Stolpersteine are monuments to the victims of world war two. They should be in osm.',
                []
            ),

            await overpassComparisonMultiple(
                'IKEA stores',
                [[brandWikidata, 'Q54078'], ['shop', 'furniture']],
                460,
                'https://about.ikea.com/en/about-us',
                'IKEA is a furniture store. They have 466 stores in 63 countries. Are they all in osm?',
                ['🛒']
            ),
            await taginfoComparisons(
                '7-Eleven stores',
                brandWikidata,
                'Q259340',
                78029,
                'https://en.wikipedia.org/wiki/7-Eleven',
                'A 7-Eleven is always nearby. because there are 78,029 of them in 18 countries. is your closest 7-Eleven in osm?',
                ['🛒', '🍔']
            ),
            await taginfoComparisons(
                'Subway stores',
                brandWikidata,
                'Q244457',
                36821,
                'https://en.wikipedia.org/wiki/Subway_(restaurant)',
                'Subway and McDonald\'s are the two largest fast food chains in the world. who has more stores?',
                ['🍔', '🛒']
            ),
            await taginfoComparisons(
                'Starbucks',
                brandWikidata,
                'Q37158',
                35711,
                'https://s22.q4cdn.com/869488222/files/doc_financials/2022/q4/Q4-FY22-Earnings-Release-Final-11.3.2022.pdf',
                'Starbucks seems to be everywhere. But can you find them all in osm?',
                ['🛒', '🍔']
            ),
            await taginfoComparisonMultipleTags(
                'McDonald\'s',
                brandWikidata,
                ['Q38076', 'Q12061542'],
                38000,
                'https://corporate.mcdonalds.com/corpmcd/franchising-overview.html',
                'McDonald\'s is the largest fast food chain in the world. There corporate website says that the company has 38,000 stores in the world. Are they all in osm?',
                ['🍔', '🛒']
            ),
            await taginfoComparisons(
                'KFC',
                brandWikidata,
                'Q524757',
                27000,
                'https://www.yum.com/wps/portal/yumbrands/Yumbrands/company/our-brands/kfc',
                'KFC expanded out of Kentucky in 1964. They now have 27,000 stores in 135 countries. Are they all in osm?',
                ['🍔', '🛒']
            ),
            await taginfoComparisons(
                'Burger King',
                brandWikidata,
                'Q177054',
                18700,
                'https://www.rbi.com/English/brands/default.aspx',
                'Burger King is a fast food chain. They have 18,000 stores in 100 countries. Are they all in osm?',
                ['🍔', '🛒']
            ),
            await taginfoComparisons(
                'Tesla superchargers',
                'brand:wikipedia',
                'en:Tesla Supercharger',
                45169,
                'https://tesla-cdn.thron.com/static/ZXSBN8_TSLA_Q1_2023_Update_ABMJPG.pdf', // page 6
                'When you want to charge your tesla but the middle screen is dead and you don\'t have the app. You can find a supercharger in osm. Or can you?',
                ['🔋', '🚗']
            ),

            ...(await airports())
        ]
    );
}
