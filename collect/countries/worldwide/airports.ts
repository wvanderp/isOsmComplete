/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { parse } from 'csv-parse/sync';

import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';

const airportCsvUrl = 'https://davidmegginson.github.io/ourairports-data/airports.csv';

export default async function airports(): Promise<Comparison[]> {
    console.log('starting on airports');
    const airportCsv = await axios.get<string>(airportCsvUrl);

    const airportsData = parse(airportCsv.data, {
        columns: true,
        skip_empty_lines: true
    }) as {
        id: number;
        ident: string;
        type: string;
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
    }[];

    const iataCount = airportsData.filter((a) => a.iata_code && a.iata_code !== '').length;
    const icaoCount = airportsData.filter((a) => a.ident.match(/[A-Z]{4}/)).length;

    return appendCountry(
        'worldwide',
        [
            await taginfoComparisonKeyOnly(
                'Airports with IATA codes ✈️',
                'iata',
                iataCount,
                airportCsvUrl,
                'The number of airports with IATA codes in OSM',
                ['✈️']
            ),
            await taginfoComparisonKeyOnly(
                'Airports with ICAO codes ✈️',
                'icao',
                icaoCount,
                airportCsvUrl,
                'The number of airports with ICAO codes in OSM',
                ['✈️']
            )
        ]
    );
}
