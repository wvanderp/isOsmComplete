/* eslint-disable sonarjs/no-duplicate-string */
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata, healthcare, pharmacy } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import sanFrancisco from './sanFrancisco';

const taginfoServer = taginfoServers.US;

export default async function unitedStates(): Promise<Comparison[]> {
    return appendCountry(
        'US',
        [
            await taginfoComparisonKeyOnly(
                'FAA tags ✈️',
                'faa',
                26697,
                'https://www.faa.gov/air_traffic/flight_info/aeronav/aero_data/Loc_ID_Search/Encodes_Decodes/',
                'Do all the airports in the US have an FAA tag?',
                ['✈️'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Walmart',
                brandWikidata,
                'Q483551',
                4606, // only in the US
                'https://corporate.walmart.com/about/location-facts',
                'Walmart is the largest company in the world by revenue. Are all the Walmart stores in the US tagged?',
                ['🛒'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Sam\'s club',
                brandWikidata,
                'Q1972120',
                600, // only in the US
                'https://corporate.walmart.com/about/location-facts',
                'Sam\'s Club is a membership-only retail warehouse club. Are all of Sam\'s Clubhouses in the US tagged?',
                ['🛒'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Dollar General',
                brandWikidata,
                'Q145168', // DG Market, DGX not in Wikidata
                20345, // combining Dollar General, DG Market, DGX and pOpshelf
                'https://investor.dollargeneral.com/websites/dollargeneral/English/0/investor-relations.html',
                'This general store, also known as DG Market, DGX, and pOpshelf, sells everything for $1. How much money would we have if we got a dollar for every Dollar General store on the map?',
                ['🛒'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                'Dollar Tree & Family Dollar',
                brandWikidata,
                ['Q5289230', 'Q5433101'],
                8415 + 8359, // dollar tree and family dollar
                // https://corporate.dollartree.com/investors/financial-information/annual-reports-proxies
                'https://corporate.dollartree.com/_assets/_4a3a5283aa3f850b49f9ea2652af1540/dollartreeinfo/db/893/10332/annual_report/2023+Annual+Report+PDF+Version+for+IR+Website+v3.0.pdf',
                'Dollar Trees pop out of the ground like... trees. Its sister, Family Dollar, can be compared to rabbits. But are these Family Dollar & Dollar Trees documented?',
                ['🛒'],
                '2025-01-14'
                // using the worldwide taginfo server because they are located in us and canada
            ),
            await taginfoComparisons(
                'CVS',
                brandWikidata,
                'Q2078880',
                9395, // locations + embedded pharmacies
                // from https://investors.cvshealth.com/investors/financial-information/sec-filings/default.aspx (search for `Total stores`)
                'https://d18rn0p25nwr6d.cloudfront.net/CIK-0000064803/28e54055-44dd-4a6d-a517-6ffc18161213.pdf',
                'Having a pharmacy in every corner of the US is a great thing. Does every corner of OSM have a CVS pharmacy?',
                ['🛒', '🏥'],
                '2025-01-14',
                taginfoServer
            ),
            await taginfoComparisons(
                'Walgreens',
                brandWikidata,
                'Q1591889',
                8560, // only in the US
                'https://investor.walgreensbootsalliance.com/static-files/6ff421c2-4c3c-4da6-bc84-158a9be81e61', // from https://investor.walgreensbootsalliance.com/home/default.aspx (search for `Retail stores and healthcare locations`)
                'Walgreens is the second largest pharmacy store chain in the US. Are all the Walgreens stores in the US tagged?',
                ['🛒', '🏥'],
                '2025-02-02',
                taginfoServer
            ),
            await taginfoComparisons(
                'Pharmacies in the US of A',
                healthcare,
                pharmacy,
                40000,
                'https://investor.walgreensbootsalliance.com/static-files/6ff421c2-4c3c-4da6-bc84-158a9be81e61', // from https://investor.walgreensbootsalliance.com/home/default.aspx
                'There are a lot of places to pay too much for your medicine in the US. But can you find them in OSM?',
                ['🛒', '🏥'],
                '2025-02-02',
                taginfoServer
            ),
            await taginfoComparisons(
                'ShotSpotter',
                'surveillance:type',
                'gunshot_detector',
                25580,
                'https://www.wired.com/story/shotspotter-secret-sensor-locations-leak/',
                'ShotSpotter is a surveillance system that listens for gunshots. The company behind them (SoundThinking) don\'t want you to know where they are. So lets add them to OSM!',
                ['👀', '⚖️'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Flock Safety ALPR',
                'surveillance:type',
                'ALPR',
                90000,
                'https://data.aclum.org/2025/10/07/flock-gives-law-enforcement-all-over-the-country-access-to-your-location/',
                'Flock Safety operates a network of ~90,000 ALPR cameras across the US, giving law enforcement access to location tracking. These surveillance cameras should be documented in OSM!',
                ['👀', '⚖️', '🚗'],
                '2025-12-07',
                taginfoServer
            ),

            ...(await sanFrancisco())
        ]
    );
}
