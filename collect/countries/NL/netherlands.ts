import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/netherlands/';

export default async function worldwide(): Promise<Comparison[]> {
    return appendCountry(
        'NL',
        [
            await taginfoComparisons(
                'Car chargers',
                'amenity',
                'charging_station',
                // normal + fast
                106891 + 3238,
                'https://www.rvo.nl/onderwerpen/duurzaam-ondernemen/energie-en-milieu-innovaties/elektrisch-rijden/stand-van-zaken/cijfers',
                'Electric car charging station will be more important than ever. The Netherlands has 110129 car chargers. Are they all in osm?',
                ['🔋', '🚗'],
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                'Hospitals',
                'amenity',
                ['hospital', 'clinic'],
                308 + 425, // hospitals + clinics
                'https://www.zorgkaartnederland.nl/ziekenhuis', // and https://www.zorgkaartnederland.nl/overige-kliniek
                'The Netherlands has 580 hospitals and clinics. Are they all in osm?',
                ['🏥'],
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
                taginfoServer
            ),
            await taginfoComparisons(
                'Traffic enforcement camera',
                'highway',
                'speed_camera',
                615,
                'https://www.rtlnieuws.nl/nieuws/nederland/artikel/5214097/flitspaal-cjib-boetes-overtredingen-snelheid-bon-auto-politie',
                'Getting a ticket is really annoying! Maybe osm can help you obey the law extremely locally.',
                ['🚗']
            )
        ]
    );
}
