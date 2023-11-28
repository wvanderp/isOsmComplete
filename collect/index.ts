import fs from 'fs';
import path from 'path';

import worldwide from './countries/worldwide/worldwide';
import europe from './countries/europe/europe';

import canada from './countries/CA/canada';
import china from './countries/CN/China';
import france from './countries/FR/france';
import germany from './countries/DE/germany';
import greatBritain from './countries/GB/greatBritain';
import netherlands from './countries/NL/netherlands';
import russia from './countries/RU/russia';
import unitedStates from './countries/US/unitedStates';
import vietnam from './countries/VN/Vietnam';

// import factbook from './countries/fromSource/factbook/factbook';
import airports from './countries/fromSource/ourAirportData/ourAirport';
import wikidata from './countries/fromSource/wikidata/wikidata';

import { Comparison } from './types';

const directory = path.join(__dirname, '../data');
const tagsFile = path.join(__dirname, 'tags.json');

(async () => {
    const data: Comparison[] = [
        ...(await worldwide()),
        ...(await europe()),

        ...(await canada()),
        ...(await china()),
        ...(await france()),
        ...(await germany()),
        ...(await greatBritain()),
        ...(await netherlands()),
        ...(await russia()),
        ...(await unitedStates()),
        ...(await vietnam()),

        // fromSource
        // ...(await factbook())
        ...(await airports()),
        ...(await wikidata())
    ];

    saveGraphData(data);

    lintTags(data);

    // save the data
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(`${directory}/compare.json`, JSON.stringify(data, null, 2));

    // copy the tags file
    fs.copyFileSync(tagsFile, `${directory}/tags.json`);
})();

function saveGraphData(comparisons: Comparison[]) {
    const dataDirectory = path.join(directory, 'graphs');
    fs.mkdirSync(dataDirectory, { recursive: true });

    for (const comparison of comparisons) {
        const file = path.join(dataDirectory, `${comparison.id}.csv`);

        const lastLine = fs.existsSync(file) ? fs.readFileSync(file).toString().split('\n').at(-1) ?? ',' : ',';

        const dataObject = new Date();
        const date = `${dataObject.getFullYear()}-${dataObject.getMonth() + 1}-${dataObject.getDate()}`;

        const [lastDate, lastActual] = lastLine.trim().split(',');

        if ((lastActual !== comparison.actual.toString() && (lastDate !== date))) {
            const line = `${date},${comparison.actual}`;

            // check if the file is empty to prevent adding an empty line
            if (lastLine !== ',') {
                fs.appendFileSync(file, '\n');
            }
            fs.appendFileSync(file, line);
        }
    }
}

// loads the tag explanation file and checks if all tags are explained
function lintTags(data: Comparison[]) {
    const tags = data.flatMap((d) => d.tags ?? []);

    const tagExplanations = JSON.parse(fs.readFileSync(tagsFile).toString()) as Record<string, string>;

    for (const tag of tags) {
        if (!tagExplanations[tag]) {
            console.warn(`Tag ${tag} is not explained`);
        }

        // the first character of the tag should be uppercase
        if (tag[0] !== tag[0].toUpperCase()) {
            console.warn(`Tag ${tag} does not start with an uppercase character`);
        }
    }
}
