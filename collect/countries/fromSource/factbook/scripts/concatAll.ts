// a script that concatenates all the country json files into one big json file

import path from 'path';
import fs from 'fs';
import directoryWalk from '../utils/directoryWalk';

const factbookDirectory = path.join(__dirname, '../factbook');
const outputPath = path.join(__dirname, './factbook.json');

const output: unknown[] = [];

function replaceEmptyStrings(key: string, value: unknown) {
    if (typeof value === 'string') return '';
    return value;
}

(async () => {
    for await (const file of directoryWalk(factbookDirectory)) {
        if (path.basename(file).length !== 7) continue;
        if (path.basename(file) === 'xx.json') continue;

        const data = JSON.parse(fs.readFileSync(file, 'utf8'));

        output.push(data);
    }

    fs.writeFileSync(outputPath, JSON.stringify(output, replaceEmptyStrings));
})();
