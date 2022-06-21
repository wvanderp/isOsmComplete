import fs from 'fs';
import path from 'path';
import worldwide from './countries/worldwide/worldwide';
import netherlands from './countries/NL/netherlands';
import greatBritten from './countries/GB/greatBritain';
import Europe from './countries/europe/europe';
import { ComparisonData } from './types';

const directory = path.join(__dirname, '../data');

(async () => {
    const data: ComparisonData = {
        comparisons: {
            worldwide: await worldwide(),
            NL: await netherlands(),
            GB: await greatBritten(),
            EU: await Europe()
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

        const line = `${comparison.actual}\n`;
        const lastLine = fs.existsSync(file) ? fs.readFileSync(file).toString().split('\n').slice(-2, -1)[0] : '';

        const dataObject = new Date();
        const date = `${dataObject.getFullYear()}-${dataObject.getMonth() + 1}-${dataObject.getDate()}`;
        if (line.trim() !== lastLine.trim()) {
            fs.appendFileSync(file, `${date},${comparison.actual}\n`);
        }
    }
}
