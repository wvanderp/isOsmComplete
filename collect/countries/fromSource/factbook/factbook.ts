// import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { Comparison } from '../../../types';
// import unzip from './utils/unzip';
import directoryWalk from './utils/directoryWalk';
import parseEnergy from './parseEnergy';

// const factbookUrl = 'https://github.com/factbook/factbook.json/archive/refs/heads/master.zip';
const factbookDirectory = path.join(__dirname, 'factbook');
/**
 * this function download, parses and outputs data from the CIA World Factbook
 */
export default async function factbook(): Promise<Comparison[]> {
    console.log('Downloading CIA World Factbook data...');
    // const factbookZip = await axios.get(factbookUrl, { responseType: 'arraybuffer' });

    // unzip the file
    // await unzip(factbookZip.data, factbookDir);

    // temp
    fs.unlinkSync('installedRaw.txt');

    // make a list of all country files
    for await (const file of directoryWalk(factbookDirectory)) {
        if (path.basename(file).length !== 7) continue;
        if (path.basename(file) === 'xx.json') continue;

        // parse the data

        const data = JSON.parse(fs.readFileSync(file, 'utf8'));

        parseEnergy(data);
    }

    // output the data

    return [];
}
