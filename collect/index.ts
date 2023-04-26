import fs from 'fs';
import path from 'path';

import worldwide from './countries/worldwide/worldwide';
import netherlands from './countries/NL/netherlands';
import greatBritain from './countries/GB/greatBritain';
import Europe from './countries/europe/europe';
import london from './countries/GB/London';
import unitedStates from './countries/US/unitedStates';
import canada from './countries/CA/canada';

import { Comparison } from './types';

const directory = path.join(__dirname, '../data');
const tagsFile = path.join(__dirname, 'tags.json');

(async () => {
    const data: Comparison[] = [
        ...(await worldwide()),
        ...(await Europe()),
        ...(await greatBritain()),
        ...(await london()),
        ...(await netherlands()),
        ...(await unitedStates()),
        ...(await canada())
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

        const lastLine = fs.existsSync(file) ? fs.readFileSync(file).toString().split('\n').slice(-1)[0] : ',';

        const dataObject = new Date();
        const date = `${dataObject.getFullYear()}-${dataObject.getMonth() + 1}-${dataObject.getDate()}`;

        const line = `\n${date},${comparison.actual}`;
        const [lastDate, lastActual] = lastLine.trim().split(',');

        if ((lastActual !== comparison.actual.toString() && (lastDate !== date))) {
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
            // eslint-disable-next-line no-console
            console.warn(`Tag ${tag} is not explained`);
        }
    }
}
