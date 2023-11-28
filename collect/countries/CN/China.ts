import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/asia:china';

export default async function china(): Promise<Comparison[]> {
    return appendCountry(
        'CN',
        [
            await taginfoComparisons(
                'Train stations',
                'railway',
                'station',
                5470,
                'https://en.wikipedia.org/wiki/Rail_transport_in_China#cite_note-CNCRCC-4',
                'China transports a lot of people by train. Can the find their stations in OSM?',
                ['🚂'],
                '2023-11-28',
                taginfoServer
            ),
            await taginfoComparisons(
                'Airports',
                'aeroway',
                'aerodrome',
                255 + 102,
                'https://en.wikipedia.org/wiki/List_of_airports_in_China',
                'China has a lot of airports. Are they all in OSM?',
                ['✈️'],
                '2023-11-28',
                taginfoServer
            )
        ]
    );
}
