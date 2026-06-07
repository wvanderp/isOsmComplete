import axios from 'axios';
import { parse } from 'csv-parse/sync';

import appendCountry from '../../../utils/appendData';
import { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../../utils/taginfoComparisons';

const airportCsvUrl = 'https://davidmegginson.github.io/ourairports-data/airports.csv';

type AirportData = {
    id: number;
    ident: string;
    type: 'balloonport' | 'closed' | 'heliport' | 'large_airport' | 'medium_airport' | 'seaplane_base' | 'small_airport';
    name: string;
    latitude_deg: number;
    longitude_deg: number;
    elevation_ft: number;
    continent: string;
    iso_country: string;
    iso_region: string;
    municipality: string;
    scheduled_service: string;
    gps_code: string;
    iata_code: string;
    local_code: string;
    home_link: string;
    wikipedia_link: string;
    keywords: string;
};

async function getAirportsData(): Promise<AirportData[]> {
    console.info('Starting on airports');
    const airportCsv = await axios.get<string>(airportCsvUrl);

    return parse(airportCsv.data, {
        columns: true,
        skip_empty_lines: true
    }) as AirportData[];
}

async function getIataCount(): Promise<number> {
    const airportsData = await getAirportsData();
    return airportsData.filter((a) => a.iata_code && a.iata_code !== '').length;
}

async function getIcaoCount(): Promise<number> {
    const airportsData = await getAirportsData();
    return airportsData.filter((a) => a.ident.match(/[A-Z]{4}/)).length;
}

async function getAirportsCount(): Promise<number> {
    const airportsData = await getAirportsData();
    return airportsData.filter((a) => a.type !== 'closed').length;
}

export default appendCountry(
    'Worldwide',
    [
        async () => taginfoComparisonKeyOnly(
            'Airports with IATA codes ✈️',
            'iata',
            await getIataCount(),
            airportCsvUrl,
            'The number of airports with IATA codes in OSM',
            ['✈️'],
            '2025-01-05'
        ),
        async () => taginfoComparisonKeyOnly(
            'Airports with ICAO codes ✈️',
            'icao',
            await getIcaoCount(),
            airportCsvUrl,
            'The number of airports with ICAO codes in OSM',
            ['✈️'],
            '2025-01-05'
        ),
        async () => taginfoComparisonMultipleTags(
            'Match OurAirports on airports',
            'aeroway',
            ['aerodrome', 'airstrip', 'heliport'],
            await getAirportsCount(),
            airportCsvUrl,
            'OurAirports is a crowdsourced database of airports. Let\'s see if OSM can add something to it.',
            ['✈️'],
            '2025-01-05'
        )
    ]
);
