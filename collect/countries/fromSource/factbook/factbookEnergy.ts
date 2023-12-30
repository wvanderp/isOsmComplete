import { OverpassOsmElement, overpassJson } from 'overpass-ts';
import { iso1A2Code } from '@rapideditor/country-coder';
import path from 'path';
import fs from 'fs';
import parseEnergy, { genericEnergyParser } from './parsers/parseEnergy';
import { Comparison } from '../../../types';
import directoryWalk from './utils/directoryWalk';
import getHash from '../../../utils/getHash';
import countryCodes from './utils/countryCodes.json';

async function getEnergyProduction(): Promise<Record<string, number>> {
    const query = `
[out: json][timeout: 2500];

(
    node["generator:output:electricity"~"[0-9\\.]+ (W)|(kW)|(MW)|(GW)"];
    way["generator:output:electricity"~"[0-9\\.]+ (W)|(kW)|(MW)|(GW)"];
    relation["generator:output:electricity"~"[0-9\\.]+ (W)|(kW)|(MW)|(GW)"];
);
  
out meta;
`;

    const data = await overpassJson(query);

    const elements = data.elements
        .reduce<OverpassOsmElement[]>((accumulator, current) => {
            if (current.type === 'node' || current.type === 'way' || current.type === 'relation') {
                accumulator.push(current);
            }
            return accumulator;
        }, []);

    const pairs = elements.map((element) => {
        // @ts-expect-error -- already checked when we filtered out elements without tags
        const energy = element.tags['generator:output:electricity'] ?? element.tags['generator:output'] ?? null;
        // @ts-expect-error -- already checked when we filtered out elements without tags
        const country = (element.type === 'node' ? iso1A2Code([element.lon, element.lat]) : iso1A2Code(element.center)) ?? null;
        return {
            country: country?.toLowerCase() ?? null,
            energy
        };
    }).filter((element) => element.country && element.energy) as { country: string; energy: string }[];

    return pairs
        .reduce<Record<string, number>>(
            (accumulator, current) => {
                const energy = genericEnergyParser(current.energy);
                accumulator[current.country] = (accumulator[current.country] ?? 0) + energy;
                return accumulator;
            },
            {}
        );
}

export default async function factbookEnergy(factbookDirectory: string): Promise<Comparison[]> {
    const factbookEnergyList = {} as Record<string, ReturnType<typeof parseEnergy>>;

    // make a list of all country files
    for await (const file of directoryWalk(factbookDirectory)) {
        if (path.basename(file).length !== 7) continue;
        if (path.basename(file) === 'xx.json') continue;

        // country code
        const countryCode = path.basename(file).slice(0, 2);

        // parse the data

        const data = JSON.parse(fs.readFileSync(file, 'utf8'));

        const energyParsed = parseEnergy(data);

        factbookEnergyList[countryCode] = energyParsed;
    }

    fs.writeFileSync(`${factbookDirectory}/factbookEnergyList.json`, JSON.stringify(factbookEnergyList, null, 2));

    // get the energy data from OSM
    const osmEnergyList = await getEnergyProduction();

    fs.writeFileSync(`${factbookDirectory}/osmEnergyList.json`, JSON.stringify(osmEnergyList, null, 2));

    // merge the data
    return Object.entries(osmEnergyList)
        .map(([countryCode, osmEnergy]) => {
        // @ts-expect-error -- type asserted
            const gec_code = countryCodes[countryCode] as string | undefined;

            if (!gec_code) {
                console.warn(`could not find ${countryCode} in the countryCodes.json file`);
                return null;
            }

            const energyFactbook = factbookEnergyList[gec_code.toLowerCase()];

            if (!energyFactbook) {
                console.warn(`Could not find ${countryCode} in the CIA World Factbook`);
                return null;
            }

            return {
                countryCode,
                osmEnergy,
                factbookEnergy: energyFactbook.installed_generating_capacity
            };
        })
        .filter((element) => element !== null)
        .map((element) => {
        // @ts-expect-error -- already checked for null
            const { countryCode, osmEnergy, energyFactbook } = element;

            const comparison: Comparison = {
                id: getHash(`factbook energy${countryCode}`),
                name: `Electricity production in ${countryCode}`,
                expected: energyFactbook,
                actual: osmEnergy,
                expectedSource: 'CIA World Factbook',
                actualSource: 'OpenStreetMap via overpass',
                description: 'Every country produces Electricity, so all the electricity generators in OpenStreetMap should add up to the total production in the CIA World Factbook.',
                country: countryCode,
                tags: ['⚡'],
                lastUpdated: '2023-06-18'
            };

            return comparison;
        });
}
