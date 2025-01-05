import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import { overpassComparisonMultiple } from '../../utils/overpassComparisons';
import taginfoComparisons, { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import openBenches from './OpenBenches';

export default async function worldwide(): Promise<Comparison[]> {
    return appendCountry(
        'Worldwide',
        [
            await taginfoComparisonKeyOnly(
                'Match Google on building',
                'building',
                1600000000,
                'https://youtu.be/nP-nMZpLM1A?t=409',
                'Google, in its 2022 keynote, claims that they have 1,600,000,000 buildings. Are we even close with OSM?',
                ['🏠'],
                '2024-12-30'
            ),
            await overpassComparisonMultiple(
                'Stolpersteine',
                [['memorial:type', 'stolperstein'], ['memorial', 'stolperstein']],
                'or',
                100000,
                'https://www.timesofisrael.com/holocaust-memorial-project-marks-milestone-with-100000-stumbling-blocks/',
                'Stolpersteine are monuments to the victims of World War Two. They should be in OSM.',
                [],
                '2024-07-28'
            ),
            await overpassComparisonMultiple(
                'IKEA stores',
                [[brandWikidata, 'Q54078'], ['shop', 'furniture']],
                'and',
                471,
                'https://www.ikea.com/global/en/our-business/how-we-work/',
                'IKEA is a furniture store. They have {{expected}} stores in 63 countries. Are they all in OSM?',
                ['🛒'],
                '2024-01-22'
            ),
            await taginfoComparisons(
                '7-Eleven stores',
                brandWikidata,
                'Q259340',
                83579,
                'https://www.7andi.com/en/ir/file/library/mr/pdf/2023_01_all_a.pdf', // https://www.7andi.com/en/ir.html
                'A 7-Eleven is always nearby because there are {{expected}} of them in 18 countries. Is your closest 7-Eleven in OSM?',
                ['🛒', '🍔'],
                '2024-08-04'
            ),
            await taginfoComparisons(
                'Subway stores',
                brandWikidata,
                'Q244457',
                37000,
                'https://www.subway.com/en-us/contactus/subwayfaqs/about-subway',
                'Subway and McDonald\'s are the two largest fast-food chains in the world. Who has more stores?',
                ['🍔', '🛒'],
                '2023-09-24'
            ),
            await taginfoComparisons(
                'Starbucks',
                brandWikidata,
                'Q37158',
                18065 + 20886, // 18065 north America, 20886 international
                'https://s203.q4cdn.com/326826266/files/doc_financials/2024/q2/2Q24-Earnings-Release-Final-4-30-24.pdf', // https://investor.starbucks.com
                'Starbucks seems to be everywhere. But can you find them all in OSM?',
                ['🛒', '🍔'],
                '2024-07-28'
            ),
            await taginfoComparisonMultipleTags(
                'McDonald\'s',
                brandWikidata,
                ['Q38076', 'Q12061542'],
                41822,
                'https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/pdf/2023%20Annual%20Report_vf.pdf', // https://corporate.mcdonalds.com/corpmcd/investors/financial-information.html
                'McDonald\'s is the largest fast-food chain in the world. Their corporate website says that the company has 38,000 stores in the world. Are they all in OSM?',
                ['🍔', '🛒'],
                '2024-08-04'
            ),
            await taginfoComparisons(
                'KFC',
                brandWikidata,
                'Q524757',
                29900,
                'https://s2.q4cdn.com/890585342/files/doc_financials/2023/q4/Q4-2023-Earnings-Release.pdf', // from https://investors.yum.com/news-events/financial-releases/
                'KFC expanded out of Kentucky in 1964. They now have {{expected}} stores in 135 countries. Are they all in OSM?',
                ['🍔', '🛒'],
                '2024-02-18'
            ),
            await taginfoComparisons(
                'Taco Bell',
                brandWikidata,
                'Q752941',
                8564,
                'https://s2.q4cdn.com/890585342/files/doc_financials/2023/q4/Q4-2023-Earnings-Release.pdf', // from https://investors.yum.com/news-events/financial-releases/
                'Taco Bell is a fast-food chain. They have {{expected}} stores in 30 countries. Are they all in OSM?',
                ['🍔', '🛒'],
                '2024-02-18'
            ),
            await taginfoComparisons(
                'Pizza Hut',
                brandWikidata,
                'Q191615',
                19866,
                'https://s2.q4cdn.com/890585342/files/doc_financials/2023/q4/Q4-2023-Earnings-Release.pdf', // from https://investors.yum.com/news-events/financial-releases/
                'Pizza Hut is a fast-food chain. They have {{expected}} stores in 100 countries. Are they all in OSM?',
                ['🍔', '🛒'],
                '2024-02-18'
            ),
            await taginfoComparisons(
                'Burger King',
                brandWikidata,
                'Q177054',
                18700,
                'https://www.rbi.com/English/brands/default.aspx',
                'Burger King is a fast-food chain. They have {{expected}} stores in 100 countries. Are they all in OSM?',
                ['🍔', '🛒'],
                '2024-02-18'
            ),
            await overpassComparisonMultiple(
                'Tesla superchargers',
                [['amenity', 'charging_station'], ['brand:wikidata', 'Q478214']],
                'and',
                5952,
                'https://digitalassets.tesla.com/tesla-contents/image/upload/IR/TSLA-Q4-2023-Update.pdf', // page 8
                'When you want to charge your Tesla but the middle screen is dead and you don\'t have the app, you can find a supercharger in OSM. Or can you?',
                ['🔋', '🚗'],
                '2024-02-24'
            ),
            await taginfoComparisons(
                'Data centers',
                'telecom',
                'data_center',
                10978,
                'https://brightlio.com/data-center-stats/', // https://www.statista.com/statistics/1228433/data-centers-worldwide-by-country/ has a similar number
                'Data centers are the backbone of the internet. There are {{expected}} of them in the world. Are they all in OSM?',
                ['🌐'],
                '2024-07-28'
            ),
            await taginfoComparisons(
                'UNESCO World Heritage Sites',
                'heritage:operator',
                'whc',
                1199,
                'https://whc.unesco.org/en/list/',
                'UNESCO World Heritage Sites are places of special cultural or physical significance. They have marked {{expected}} of them. Can you find them all in OSM?',
                ['🌳', '🏛️'],
                '2023-11-28'
            ),
            await openBenches()
        ]
    );
}
