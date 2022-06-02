import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';

export default async function worldwide(): Promise<Comparison[]> {
    return [
        await taginfoComparisons(
            'Car chargers',
            'amenity',
            'charging_station',
            94065,
            'https://www.rvo.nl/onderwerpen/duurzaam-ondernemen/energie-en-milieu-innovaties/elektrisch-rijden/stand-van-zaken/cijfers',
            'Electric car charging station will be more important than ever. The Netherlands has 94065 car chargers. Are they all in osm?',
            'https://taginfo.geofabrik.de/europe/netherlands/'
        ),
        await taginfoComparisons(
            'hospital',
            'amenity',
            'hospital',
            308,
            'https://www.zorgkaartnederland.nl/ziekenhuis',
            'The Netherlands has 308 hospitals. Are they all in osm?',
            'https://taginfo.geofabrik.de/europe/netherlands/'
        )
    ];
}
