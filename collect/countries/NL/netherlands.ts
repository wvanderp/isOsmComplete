import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/netherlands/';

export default async function worldwide(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'Car chargers',
            'amenity',
            'charging_station',
            // normal + fast
            106891 + 3238,
            'https://www.rvo.nl/onderwerpen/duurzaam-ondernemen/energie-en-milieu-innovaties/elektrisch-rijden/stand-van-zaken/cijfers',
            'Electric car charging station will be more important than ever. The Netherlands has 94065 car chargers. Are they all in osm?',
            taginfoServer
        ),
        await taginfoComparisons(
            'Hospitals',
            'amenity',
            'hospital',
            308,
            'https://www.zorgkaartnederland.nl/ziekenhuis',
            'The Netherlands has 308 hospitals. Are they all in osm?',
            taginfoServer
        ),
        await taginfoComparisons(
            'Wind turbines',
            'generator:source',
            'wind',
            2415 + 462,
            'https://nl.wikipedia.org/wiki/Windturbines_in_Nederland',
            'Wind energy is the new hotness. But are they all present?',
            taginfoServer
        )
    ];
}
