import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata, healthcare, pharmacy } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.US;

export default async function unitedStates(): Promise<Comparison[]> {
    return appendCountry(
        'US',
        [
            await taginfoComparisonKeyOnly(
                'FAA tags ✈️',
                'faa',
                26577,
                'https://www.faa.gov/air_traffic/flight_info/aeronav/aero_data/Loc_ID_Search/Encodes_Decodes/',
                'Do all the airports in the US have an FAA tag?',
                ['✈️'],
                '2024-02-22',
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
                19294, // combining Dollar General, DG Market, DGX and pOpshelf
                'https://investor.dollargeneral.com/websites/dollargeneral/English/0/investor-relations.html',
                'This General store, also known as DG Market, DGX, and pOpshelf, sells everything for $1. How much money would we have if we got a dollar for every Dollar General store on the map?',
                ['🛒'],
                '2023-10-23',
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                'Dollar Tree & Family Dollar',
                brandWikidata,
                ['Q5289230', 'Q5433101'],
                8272 + 8350, // dollar tree and family dollar
                'https://corporate.dollartree.com/_assets/_e019a55beaa640d513e0240de36a677a/dollartreeinfo/db/893/9106/annual_report/DT_2021_Form+10-K_FINAL_5.11.22.pdf',
                'Dollar Trees pop out of the ground like... trees. It\'s sister, Family Dollar, can be compared to rabbits. But are these Family Dollar & Dollar trees documented?',
                ['🛒'],
                '2024-02-18',
                taginfoServer
            ),
            await taginfoComparisons(
                'CVS',
                brandWikidata,
                'Q2078880',
                7500 + 1895, // locations + embedded pharmacies
                'https://d18rn0p25nwr6d.cloudfront.net/CIK-0000064803/28e54055-44dd-4a6d-a517-6ffc18161213.pdf', // from https://investors.cvshealth.com/investors/financial-information/sec-filings/default.aspx
                'Having a pharmacy in every corner of the US is a great thing. Does every corner of OSM have a CVS pharmacy?',
                ['🛒', '🏥'],
                '2024-02-18',
                taginfoServer
            ),
            await taginfoComparisons(
                'Walgreens',
                brandWikidata,
                'Q1591889',
                8600, // only in the US
                'https://s1.q4cdn.com/343380161/files/doc_financials/2022/ar/WBA-2022-Annual-Report.pdf', // from https://investor.walgreensbootsalliance.com/home/default.aspx
                'Walgreens is the second largest pharmacy store chain in the US. Are all the Walgreens stores in the US tagged?',
                ['🛒', '🏥'],
                '2024-02-18',
                taginfoServer
            ),
            await taginfoComparisons(
                'Pharmacies in the US of A',
                healthcare,
                pharmacy,
                40000,
                'https://s1.q4cdn.com/343380161/files/doc_financials/2023/ar/wba-2023-annual-report.pdf', // from https://investor.walgreensbootsalliance.com/home/default.aspx
                'There are a lot of places to pay too much for your medicine in the US. But can you find them in OSM?',
                ['🛒', '🏥'],
                '2024-02-18',
                taginfoServer
            )
        ]
    );
}
