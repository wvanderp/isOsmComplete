import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/north-america/us/';

export default async function unitedStates(): Promise<Comparison[]> {
    return appendCountry(
        'US',
        [
            await taginfoComparisonKeyOnly(
                'faa tags ✈️',
                'faa',
                26648,
                'https://www.faa.gov/air_traffic/flight_info/aeronav/aero_data/Loc_ID_Search/Encodes_Decodes/',
                'Do all the airports in the US have a faa tag?',
                ['✈️'],
                taginfoServer
            )
        ]
    );
}
