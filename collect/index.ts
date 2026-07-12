import fs from 'fs';
import path from 'path';

import worldwide from './countries/worldwide/worldwide';
import europe from './countries/europe/europe';

import canada from './countries/CA/canada';
import china from './countries/CN/China';
import france from './countries/FR/france';
import germany from './countries/DE/germany';
import greatBritain from './countries/GB/greatBritain';
import italy from './countries/IT/italy';
import japan from './countries/JP/japan';
import netherlands from './countries/NL/netherlands';
import russia from './countries/RU/russia';
import unitedStates from './countries/US/unitedStates';
import vietnam from './countries/VN/Vietnam';

import airports from './countries/fromSource/ourAirportData/ourAirport';
import wikidata from './countries/fromSource/wikidata/wikidata';
import allThePlaces from './countries/fromSource/alltheplaces/alltheplaces';

import { Comparison } from './types';
import { ComparisonFunction } from './types/ComparisonFunction';
import mergeComparisons from './utils/mergeComparisons';

const directory = path.join(__dirname, '../data');
const tagsFile = path.join(__dirname, 'tags.json');

(async () => {
    const comparisonFunctions: ComparisonFunction[] = [
        ...worldwide,
        ...europe,

        ...canada,
        ...china,
        ...france,
        ...germany,
        ...greatBritain,
        ...italy,
        ...japan,
        ...netherlands,
        ...russia,
        ...unitedStates,
        ...vietnam,

        // fromSource
        ...allThePlaces,
        ...airports,
        ...wikidata
    ];

    const existingData = loadExistingComparisons();
    const collectedData: Comparison[] = [];

    for (const comparisonFunction of comparisonFunctions) {
        try {
            const result = await callWithRetry(comparisonFunction);
            collectedData.push(...normalizeComparisons(result));
        } catch {
            // callWithRetry already logs the failed collection.
        }
    }

    // A failed collection must not remove its previous result (or orphan its
    // graph CSV). Fresh results replace old ones using their stable hash.
    const data = mergeComparisons(existingData, collectedData);

    saveGraphData(data);

    lintTags(data);

    // save the data
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(`${directory}/compare.json`, JSON.stringify(data, null, 2));

    // copy the tags file
    fs.copyFileSync(tagsFile, `${directory}/tags.json`);
})();

function loadExistingComparisons(): Comparison[] {
    const compareFile = path.join(directory, 'compare.json');

    if (!fs.existsSync(compareFile)) {
        return [];
    }

    return JSON.parse(fs.readFileSync(compareFile, 'utf8')) as Comparison[];
}

async function callWithRetry(comparisonFunction: ComparisonFunction, retries = 2) {
    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await comparisonFunction();
        } catch (error) {
            if (attempt === retries) {
                console.error('Comparison failed after retries', error);
                throw error;
            }
            console.warn(`Comparison failed. Retrying (${attempt + 1}/${retries})`, error);
        }
    }

    throw new Error('Comparison failed');
}

function normalizeComparisons(comparisonResult: Comparison | Comparison[]): Comparison[] {
    return Array.isArray(comparisonResult) ? comparisonResult : [comparisonResult];
}

function saveGraphData(comparisons: Comparison[]) {
    const dataDirectory = path.join(directory, 'graphs');
    fs.mkdirSync(dataDirectory, { recursive: true });

    for (const comparison of comparisons) {
        const file = path.join(dataDirectory, `${comparison.id}.csv`);

        const lastLine = fs.existsSync(file) ? fs.readFileSync(file).toString().split('\n').at(-1) ?? ',' : ',';

        const dataObject = new Date();
        const date = `${dataObject.getFullYear()}-${dataObject.getMonth() + 1}-${dataObject.getDate()}`;

        const [lastDate, lastActual, lastExpected] = lastLine.trim().split(',');

        const actualChanged = lastActual !== comparison.actual.toString();
        const expectedChanged = lastExpected !== comparison.expected.toString();

        if (actualChanged || expectedChanged) {
            const line = `${date},${comparison.actual},${comparison.expected}`;

            if (lastDate === date) {
                const lines = fs.readFileSync(file, 'utf8').trimEnd().split('\n');
                lines[lines.length - 1] = line;
                fs.writeFileSync(file, lines.join('\n'));
            } else {
                // check if the file is empty to prevent adding an empty line
                if (lastLine !== ',') {
                    fs.appendFileSync(file, '\n');
                }
                fs.appendFileSync(file, line);
            }
        }
    }
}

// loads the tag explanation file and checks if all tags are explained
function lintTags(data: Comparison[]) {
    const tags = data.flatMap((d) => d.tags ?? []);

    const tagExplanations = JSON.parse(fs.readFileSync(tagsFile).toString()) as Record<string, string>;

    for (const tag of tags) {
        const tagExplanation = tagExplanations[tag];

        if (!tagExplanation) {
            console.warn(`Tag ${tag} is not explained`);
        }

        // the first character of the tag should be uppercase
        if (tag[0] !== tag[0].toUpperCase()) {
            console.warn(`Tag ${tag} does not start with an uppercase character`);
        }
    }
}
