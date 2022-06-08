import fs from 'fs';
import path from 'path';
import worldwide from './countries/worldwide/worldwide';
import netherlands from './countries/NL/netherlands';
import greatBrittan from './countries/GB/greatBritain';
import Europe from './countries/EU/EU';
import { ComparisonData } from './types';

(async () => {
    const data: ComparisonData = {
        comparisons: {
            worldwide: await worldwide(),
            NL: await netherlands(),
            GB: await greatBrittan(),
            EU: await Europe()
        }
    };

    const dir = path.join(__dirname, '../data');

    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/compare.json`, JSON.stringify(data, null, 2));
})();
