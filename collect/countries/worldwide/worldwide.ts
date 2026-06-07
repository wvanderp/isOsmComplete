import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import { overpassComparisonMultiple, overpassComparisonRaw } from '../../utils/overpassComparisons';
import taginfoComparisons, { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import openBenches from './OpenBenches';

export default appendCountry(
    'Worldwide',
    [
        () => taginfoComparisonKeyOnly(
            'Match Google on building',
            'building',
            1600000000 + 1800000000, // 1.6B from the google i/o 2022 keynote, plus 1.8B from google open buildings dataset
            'https://sites.research.google/gr/open-buildings/',
            'Google just casually dropped a dataset of 1.8 billion building footprints in the global south. This might be in addition to the 1.6 billion building footprints they already had in 2022. So can osm ever catch up to Google on mapping buildings?',
            ['🏠'],
            '2026-05-25'
        ),
        () => overpassComparisonMultiple(
            'Stolpersteine',
            [['memorial:type', 'stolperstein'], ['memorial', 'stolperstein']],
            'or',
            116000,
            'https://www.stolpersteine.eu/en/information/facts-and-figures',
            'Stolpersteine are monuments to the victims of World War Two. They should be in OSM.',
            [],
            '2026-05-25'
        ),
        () => overpassComparisonMultiple(
            'IKEA stores',
            [[brandWikidata, 'Q54078'], ['shop', 'furniture']],
            'and',
            480,
            'https://www.ikea.com/global/en/our-business/how-we-work/',
            'IKEA is a furniture store. They have {{expected}} stores in 63 countries. Are they all in OSM?',
            ['🛒'],
            '2025-01-05'
        ),
        () => taginfoComparisons(
            '7-Eleven stores',
            brandWikidata,
            'Q259340',
            85816,
            'https://www.7andi.com/en/ir/file/library/mr/pdf/2026_01_all_en.pdf', // https://www.7andi.com/en/ir.html and then management report
            'A 7-Eleven is always nearby because there are {{expected}} of them in 18 countries. Is your closest 7-Eleven in OSM?',
            ['🛒', '🍔'],
            '2026-05-25'
        ),
        () => taginfoComparisons(
            'Subway stores',
            brandWikidata,
            'Q244457',
            37000,
            'https://newsroom.subway.com/2024-10-01-Subway-Continues-to-Expand-Its-Global-Presence-with-Over-10,000-Future-Restaurant-Commitments',
            'Subway and McDonald\'s are the two largest fast-food chains in the world. Who has more stores?',
            ['🍔', '🛒'],
            '2025-01-05'
        ),
        () => taginfoComparisons(
            'Starbucks',
            brandWikidata,
            'Q37158',
            41129,
            'https://s203.q4cdn.com/326826266/files/doc_financials/2026/q2/FY26-Q2-Store-Counts-By-Market.xlsx', // https://investor.starbucks.com
            'Starbucks seems to be everywhere. But can you find them all in OSM?',
            ['🛒', '🍔'],
            '2025-01-05'
        ),
        () => taginfoComparisonMultipleTags(
            'McDonald\'s',
            brandWikidata,
            ['Q38076', 'Q12061542'],
            45356,
            'https://corporate.mcdonalds.com/content/dam/sites/corp/nfl/pdf/MCD%202025%20Annual%20Report.pdf', // https://corporate.mcdonalds.com/corpmcd/investors/financial-information.html
            'McDonald\'s is the largest fast-food chain in the world. Their corporate website says that the company has 38,000 stores in the world. Are they all in OSM?',
            ['🍔', '🛒'],
            '2026-05-25'
        ),
        () => taginfoComparisons(
            'KFC',
            brandWikidata,
            'Q524757',
            31143,
            'https://s2.q4cdn.com/890585342/files/doc_financials/2024/q3/Yum-Brands-Q3-24-Earnings-Release.pdf', // from https://investors.yum.com/news-events/financial-releases/
            'KFC expanded out of Kentucky in 1964. They now have {{expected}} stores in 135 countries. Are they all in OSM?',
            ['🍔', '🛒'],
            '2025-01-14'
        ),
        () => taginfoComparisons(
            'Taco Bell',
            brandWikidata,
            'Q752941',
            8594,
            'https://s2.q4cdn.com/890585342/files/doc_financials/2024/q3/Yum-Brands-Q3-24-Earnings-Release.pdf', // from https://investors.yum.com/news-events/financial-releases/
            'Taco Bell is a fast-food chain. They have {{expected}} stores in 30 countries. Are they all in OSM?',
            ['🍔', '🛒'],
            '2025-01-14'
        ),
        () => taginfoComparisons(
            'Pizza Hut',
            brandWikidata,
            'Q191615',
            19927,
            'https://s2.q4cdn.com/890585342/files/doc_financials/2024/q3/Yum-Brands-Q3-24-Earnings-Release.pdf', // from https://investors.yum.com/news-events/financial-releases/
            'Pizza Hut is a fast-food chain. They have {{expected}} stores in 100 countries. Are they all in OSM?',
            ['🍔', '🛒'],
            '2025-01-14'
        ),
        () => taginfoComparisons(
            'Burger King',
            brandWikidata,
            'Q177054',
            19384,
            'https://s26.q4cdn.com/317237604/files/doc_financials/2023/ar/RBI-Global-Store-Counts-Across-Brands-by-Market-February-13-2024.pdf', // https://www.rbi.com/English/investors/annual-reports/default.aspx
            'Burger King is a fast-food chain. They have {{expected}} stores in 100 countries. Are they all in OSM?',
            ['🍔', '🛒'],
            '2025-02-14'
        ),
        () => overpassComparisonMultiple(
            'Tesla superchargers',
            [['amenity', 'charging_station'], ['brand:wikidata', 'Q478214']],
            'and',
            6975,
            'https://digitalassets.tesla.com/tesla-contents/image/upload/IR/TSLA-Q4-2024-Update.pdf', // https://ir.tesla.com/#quarterly-disclosure (search for `Supercharger stations`)
            'When you want to charge your Tesla but the middle screen is dead and you don\'t have the app, you can find a supercharger in OSM. Or can you?',
            ['🔋', '🚗'],
            '2025-02-02'
        ),
        () => taginfoComparisons(
            'Data centers',
            'telecom',
            'data_center',
            10978,
            'https://brightlio.com/data-center-stats/', // https://www.statista.com/statistics/1228433/data-centers-worldwide-by-country/ has a similar number
            'Data centers are the backbone of the internet. There are {{expected}} of them in the world. Are they all in OSM?',
            ['🌐'],
            '2025-01-05'
        ),
        () => taginfoComparisons(
            'UNESCO World Heritage Sites',
            'heritage:operator',
            'whc',
            1223,
            'https://whc.unesco.org/en/list/',
            'UNESCO World Heritage Sites are places of special cultural or physical significance. They have marked {{expected}} of them. Can you find them all in OSM?',
            ['🌳', '🏛️'],
            '2025-01-05'
        ),
        () => overpassComparisonRaw(
            'US Overseas Military Bases',
            `
                [out:json][timeout:180];
                (
                    nwr["landuse"="military"]["operator"~"^(United States|US)"];
                    nwr["military"]["operator"~"^(United States|US)"];
                )->.all_bases;
        
                area["ISO3166-1"="US"]->.us;
        
                (
                    node.all_bases(area.us);
                    way.all_bases(area.us);
                    relation.all_bases(area.us);
                )->.bases_in_us;
        
                ( .all_bases; - .bases_in_us; );
        
                out count;
                `,
            750,
            'https://quincyinst.org/research/drawdown-improving-u-s-and-global-security-through-military-base-closures-abroad/#executive-summary',
            'The US provides freedom anywhere in the world. Let\'s make a map of all {{expected}} locations where freedom can be received.',
            ['🪖'],
            '2025-01-25'
        ),
        () => overpassComparisonRaw(
            'UN Member States',
            `
                [out:json][timeout:180];
                relation["boundary"="administrative"]["admin_level"="2"];
                out count;
                `,
            193,
            'https://www.un.org/en/about-us/member-states',
            'The UN says there are {{expected}} countries in the world. How many has OSM bothered to draw a border around?',
            ['🌍'],
            '2026-05-25'
        ),
        openBenches
    ]
);
