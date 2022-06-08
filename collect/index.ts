import fs from 'fs';
import path from 'path';
import worldwide from './countries/worldwide/worldwide';
import netherlands from './countries/NL/netherlands';
import greatBritten from './countries/GB/greatBritain';
import Europe from './countries/EU/EU';
import { ComparisonData } from './types';

(async () => {
    const data: ComparisonData = {
        comparisons: {
            worldwide: await worldwide(),
            NL: await netherlands(),
            GB: await greatBritten(),
            EU: await Europe()
        }
    };

    const directory = path.join(__dirname, '../data');

    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(`${directory}/compare.json`, JSON.stringify(data, null, 2));
})();
