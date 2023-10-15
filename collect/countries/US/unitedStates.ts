import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoComparisons, { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/north-america:us/';

export default async function unitedStates(): Promise<Comparison[]> {
    return appendCountry(
        'US',
        [
            await taginfoComparisonKeyOnly(
                'FAA tags ✈️',
                'faa',
                26648,
                'https://www.faa.gov/air_traffic/flight_info/aeronav/aero_data/Loc_ID_Search/Encodes_Decodes/',
                'Do all the airports in the US have a FAA tag?',
                ['✈️'],
                '2023-05-25',
                taginfoServer
            ),
            await taginfoComparisons(
                'Walmart',
                brandWikidata,
                'Q483551',
                4616, // only in the US
                'https://corporate.walmart.com/about/location-facts',
                'Walmart is the largest company in the world by revenue. Are all the Walmart stores in the US tagged?',
                ['🛒'],
                '2023-10-15',
                taginfoServer
            ),
            await taginfoComparisons(
                'sam\'s club',
                brandWikidata,
                'Q1972120',
                599, // only in the US
                'https://corporate.walmart.com/about/location-facts',
                'Sam\'s Club is a membership-only retail warehouse club. Are all of Sam\'s clubhouses in the US tagged?',
                ['🛒'],
                '2023-10-15',
                taginfoServer
            ),
            await taginfoComparisons(
                'Dollar General',
                brandWikidata,
                'Q145168', // DG Market, DGX not in Wikidata
                18190, // combining Dollar General, DG Market, DGX and pOpshelf
                'https://investor.dollargeneral.com/websites/dollargeneral/English/0/investor-relations.html',
                'This General store, also know as DG Market, DGX and pOpshelf, sells everything for $1. How much money would we have if we got a dollar for every Dollar General store on the map?',
                ['🛒'],
                '2023-03-17',
                taginfoServer
            ),
            await taginfoComparisons(
                'Dollar Tree',
                brandWikidata,
                'Q5289230',
                7824 + 8016, // dollar tree and family dollar
                'https://corporate.dollartree.com/_assets/_e019a55beaa640d513e0240de36a677a/dollartreeinfo/db/893/9106/annual_report/DT_2021_Form+10-K_FINAL_5.11.22.pdf',
                'Dollar Trees pop out of the ground like... trees. But are these Dollar trees documented?',
                ['🛒'],
                '2023-03-17',
                taginfoServer
            ),
            await taginfoComparisons(
                'CVS',
                brandWikidata,
                'Q2078880',
                9900, // More then 9900 why not a exact number? What are they are hiding?
                'https://s2.q4cdn.com/447711729/files/doc_financials/2021/ar/CVS2021_Annual-Report.pdf',
                'Having a pharmacy in every corner of the US is a great thing. Does every corner of OSM have a CVS pharmacy?',
                ['🛒', '🏥'],
                '2023-03-17',
                taginfoServer
            ),
            await taginfoComparisons(
                'Walgreens',
                brandWikidata,
                'Q1591889',
                4717, // only in the US
                'https://s1.q4cdn.com/343380161/files/doc_financials/2022/ar/WBA-2022-Annual-Report.pdf',
                'Walgreens is the second largest pharmacy store chain in the US. Are all the Walgreens stores in the US tagged?',
                ['🛒', '🏥'],
                '2023-05-25',
                taginfoServer
            )
        ]
    );
}
