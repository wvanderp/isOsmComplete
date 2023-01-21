import fs from 'fs';
import path from 'path';

import worldwide from './countries/worldwide/worldwide';
import netherlands from './countries/NL/netherlands';
import greatBritain from './countries/GB/greatBritain';
import Europe from './countries/europe/europe';
import london from './countries/GB/London';

import { ComparisonData } from './types';

const directory = path.join(__dirname, '../data');

(async () => {
    const data: ComparisonData = {
        comparisons: {
            worldwide: await worldwide(),
            EU: await Europe(),
            GB: await greatBritain(),
            london: await london(),
            NL: await netherlands()
        }
    };

    saveGraphData(data);

    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(`${directory}/compare.json`, JSON.stringify(data, null, 2));
})();

function saveGraphData(data: ComparisonData) {
    const comparisons = Object.values(data.comparisons).flat();
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
