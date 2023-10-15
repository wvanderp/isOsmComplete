/* eslint-disable sonarjs/no-duplicate-string */
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import { brandWikidata } from '../../utils/osmTags';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import geldmaat from './geldmaat';

const taginfoServer = 'https://taginfo.geofabrik.de/europe:netherlands/';
const taginfoServerEuropa = 'https://taginfo.geofabrik.de/europe';

export default async function netherlands(): Promise<Comparison[]> {
    return appendCountry(
        'NL',
        [
            await taginfoComparisons(
                'Car chargers',
                'amenity',
                'charging_station',
                // normal + fast
                138717 + 4875,
                'https://www.rvo.nl/onderwerpen/duurzaam-ondernemen/energie-en-milieu-innovaties/elektrisch-rijden/stand-van-zaken/cijfers',
                'Electric car charging station will be more important than ever. The Netherlands has {{actual}} car chargers. Are they all in osm?',
                ['🔋', '🚗'],
                '2023-09-12',
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                'Hospitals',
                'amenity',
                ['hospital', 'clinic'],
                305 + 442, // hospitals + clinics
                'https://www.zorgkaartnederland.nl/ziekenhuis', // and https://www.zorgkaartnederland.nl/overige-kliniek
                'The Netherlands has {{actual}} hospitals and clinics. Are they all in osm?',
                ['🏥'],
                '2023-02-19',
                taginfoServer
            ),
            await taginfoComparisons(
                'Wind turbines',
                'generator:source',
                'wind',
                2415 + 462,
                'https://nl.wikipedia.org/wiki/Windturbines_in_Nederland',
                'Wind energy is the new hotness. But are they all present?',
                ['⚡'],
                '2023-02-19',
                taginfoServer
            ),
            await taginfoComparisons(
                'Traffic enforcement camera',
                'highway',
                'speed_camera',
                615,
                'https://www.rtlnieuws.nl/nieuws/nederland/artikel/5214097/flitspaal-cjib-boetes-overtredingen-snelheid-bon-auto-politie',
                'Getting a ticket is really annoying! Maybe osm can help you obey the law extremely locally.',
                ['🚗', '👀'],
                '2023-04-20',
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                "Albert Heijn's",
                brandWikidata,
                ['Q1653985', 'Q78163765'],
                1228,
                'https://media.aholddelhaize.com/media/vy4neu1n/ar-2022-ahold-delhaize-interactive-final.pdf?t=638143108570530000',
                'Albert Heijn is the biggest supermarket chain in the Netherlands. Are they all in osm?',
                ['🛒'],
                '2023-02-28',
                // use the europe server because Albert Heijn is also in Belgium
                taginfoServerEuropa
            ),
            await taginfoComparisons(
                'Gall & Gall',
                brandWikidata,
                'Q13639185',
                603,
                'https://media.aholddelhaize.com/media/vy4neu1n/ar-2022-ahold-delhaize-interactive-final.pdf?t=638143108570530000',
                'Gall & Gall is a liquor store chain in the Netherlands. Are they all in osm?',
                ['🛒'],
                '2023-02-28',
                taginfoServer
            ),
            await taginfoComparisons(
                'Etos',
                brandWikidata,
                'Q2609459',
                522,
                'https://media.aholddelhaize.com/media/vy4neu1n/ar-2022-ahold-delhaize-interactive-final.pdf?t=638143108570530000',
                'Etos is a drugstore chain in the Netherlands. Are they all in osm?',
                ['🛒'],
                '2023-02-28',
                taginfoServer
            ),
            await taginfoComparisons(
                'Civil defense siren',
                'emergency',
                'siren',
                4278,
                'https://www.brandweer.nl/onderwerpen/sirenes/',
                'At this critical point in time, facing extinction in The Netherlands they deserve to be mapped.',
                ['🛒'],
                '2023-02-28',
                taginfoServer
            ),

            // from other files
            await geldmaat()
        ]
    );
}
