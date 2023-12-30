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
 * this function download, parses and outputs data from the CIA World Factbook
 */
export default async function factbook(): Promise<Comparison[]> {
    console.log('Downloading CIA World Factbook data...');
    // nuke the old directory and zip file
    if (fs.existsSync(factbookDirectory)) {
        fs.rmdirSync(factbookDirectory, { recursive: true });
    }
    if (fs.existsSync(factbookZipFile)) {
        fs.unlinkSync(factbookZipFile);
    }

    const factbookZip = await axios.get(factbookUrl, { responseType: 'arraybuffer' });
    // write the zip file to disk
    fs.writeFileSync(factbookZipFile, factbookZip.data);

    // unzip the file
    await unzip(factbookZipFile, factbookDirectory);

    // energy
    // const energyComparison = await factbookEnergy(factbookDirectory);

    // airports

    const factbookAirportsComparison = await factbookAirports(factbookDirectory);

    return appendCountry(
        'Worldwide',
        [
            // energyComparison,
            factbookAirportsComparison
        ]
    );
}
