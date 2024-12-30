import path from 'path';
import fs from 'fs';
import directoryWalk from './utils/directoryWalk';
import { FactbookCountry } from './types/FactBookCountry';
import { taginfoComparisonMultipleTags } from '../../../utils/taginfoComparisons';
import { Comparison } from '../../../types';

function parseAirport(file: FactbookCountry): number {
    const airportsText = file.Transportation.Airports?.text;
    const splitText = airportsText?.split(' ')[0];

    return splitText ? Number.parseInt(splitText.replaceAll(',', ''), 10) : 0;
}

export default async function factbookAirports(factbookDirectory: string): Promise<Comparison> {
    let airportCount = 0;

    for await (const file of directoryWalk(factbookDirectory)) {
        if (path.basename(file).length !== 7) continue;
        if (path.basename(file) === 'xx.json') continue;

        // Parse the data
        const factbookFile = JSON.parse(fs.readFileSync(file, 'utf8')) as FactbookCountry;

        airportCount += parseAirport(factbookFile);
    }

    return taginfoComparisonMultipleTags(
        'CIA World Factbook - Airports',
        'aeroway',
        ['aerodrome', 'airstrip'],
        airportCount,
        'https://www.cia.gov/the-world-factbook/',
        'The CIA has, unsurprisingly, an interest in how many airports there are in a country. We can make use of this curiosity to check how far we are in mapping airports in OSM.',
        ['✈️'],
        '2023-12-30'
    );
}
