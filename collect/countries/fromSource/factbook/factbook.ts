import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { Comparison } from '../../../types';
import unzip from './utils/unzip';

import factbookAirports from './factbookAirport';
import appendCountry from '../../../utils/appendData';

const factbookUrl = 'https://github.com/factbook/factbook.json/archive/refs/heads/master.zip';
const factbookDirectory = path.join(__dirname, 'factbook');
const factbookZipFile = path.join(__dirname, 'factbook.zip');
/**
 * This function downloads, parses, and outputs data from the CIA World Factbook.
 */
export default async function factbook(): Promise<Comparison[]> {
    console.info('Downloading CIA World Factbook data...');
    // Nuke the old directory and zip file
    if (fs.existsSync(factbookDirectory)) {
        fs.rmSync(factbookDirectory, { recursive: true });
    }
    if (fs.existsSync(factbookZipFile)) {
        fs.unlinkSync(factbookZipFile);
    }

    const factbookZip = await axios.get(factbookUrl, { responseType: 'arraybuffer' });
    // Write the zip file to disk
    fs.writeFileSync(factbookZipFile, factbookZip.data);

    // Unzip the file
    await unzip(factbookZipFile, factbookDirectory);

    // Energy
    // const energyComparison = await factbookEnergy(factbookDirectory);

    // Airports
    const factbookAirportsComparison = await factbookAirports(factbookDirectory);

    return appendCountry(
        'Worldwide',
        [
            // energyComparison,
            factbookAirportsComparison
        ]
    );
}
