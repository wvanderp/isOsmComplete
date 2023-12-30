import path from 'path';
import fs from 'fs';
import directoryWalk from './utils/directoryWalk';
import { FactbookCountry } from './types/FactBookCountry';
import { taginfoComparisonMultipleTags } from '../../../utils/taginfoComparisons';
import { Comparison } from '../../../types';

function parseAirport(file: FactbookCountry): number {
    // paved airports
    const pavedSection = file.Transportation['Airports - with paved runways'];
    const pavedAirportsTotalText = pavedSection?.total?.text ?? pavedSection?.text ?? '0';
    const pavedAirports = Number.parseInt(pavedAirportsTotalText.replace(/,/, ''), 10);

    // unpaved airports
    const unpavedAirportsText = file.Transportation['Airports - with unpaved runways']?.text ?? '0';
    const unpavedAirports = Number.parseInt(unpavedAirportsText.replace(/,/, ''), 10);

    return pavedAirports + unpavedAirports;
}

export default async function factbookAirports(factbookDirectory: string): Promise<Comparison> {
    let airportCount = 0;

    for await (const file of directoryWalk(factbookDirectory)) {
        if (path.basename(file).length !== 7) continue;
        if (path.basename(file) === 'xx.json') continue;

        // parse the data
        const factbookFile = JSON.parse(fs.readFileSync(file, 'utf8')) as FactbookCountry;

        airportCount += parseAirport(factbookFile);
    }

    return taginfoComparisonMultipleTags(
        'CIA World Factbook - Airports',
        'aeroway',
        ['aerodrome', 'airstrip'],
        airportCount,
        'https://www.cia.gov/the-world-factbook/',
        'the cia has, unsurprisingly, a interest in how many airports there are in a country. we can make use of this curiosity to check how far we are in mapping airports in OSM',
        ['✈️'],
        '2023-12-30'
    );
}
