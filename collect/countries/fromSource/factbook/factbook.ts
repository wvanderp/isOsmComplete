// import axios from 'axios';
import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { Comparison } from '../../../types';
import unzip from './utils/unzip';
import directoryWalk from './utils/directoryWalk';
import parseEnergy from './parsers/parseEnergy';
import getEnergyProduction from './energy';
import getHash from '../../../utils/getHash';

import countryCodes from './utils/countryCodes.json';

const factbookUrl = 'https://github.com/factbook/factbook.json/archive/refs/heads/master.zip';
const factbookDirectory = path.join(__dirname, 'factbook');

/**
 * this function download, parses and outputs data from the CIA World Factbook
 */
export default async function factbook(): Promise<Comparison[]> {
    console.log('Downloading CIA World Factbook data...');
    const factbookZip = await axios.get(factbookUrl, { responseType: 'arraybuffer' });

    // unzip the file
    await unzip(factbookZip.data, factbookDirectory);

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

    // get the energy data from osm
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

            const factbookEnergy = factbookEnergyList[gec_code.toLowerCase()];

            if (!factbookEnergy) {
                console.warn(`Could not find ${countryCode} in the CIA World Factbook`);
                return null;
            }

            return {
                countryCode,
                osmEnergy,
                factbookEnergy: factbookEnergy.installed_generating_capacity
            };
        })
        .filter((element) => element !== null)
        .map((element) => {
            // @ts-expect-error -- already checked for null
            const { countryCode, osmEnergy, factbookEnergy } = element;

            const comparison: Comparison = {
                id: getHash(`factbook energy${countryCode}`),
                name: `Electricity production in ${countryCode}`,
                expected: factbookEnergy,
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
