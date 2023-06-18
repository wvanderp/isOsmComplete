import { describe, it } from 'mocha';
import { expect } from 'chai';

import {genericEnergyParser} from '../../../collect/countries/fromSource/factbook/parsers/parseEnergy';

const testCases = [
    { input: '1.2 million kW', output: 1200000000 },
    { input: '1.2 million kW (2017 est.)', output: 1200000000 },
    { input: '1.2 MW', output: 1200000 },
    { input: '1.2 MW (2017 est.)', output: 1200000 },
    { input: '100 W', output: 100 },
    { input: '100 kW', output: 100000},
    { input: '100 MW', output: 100000000},
    { input: '100 GW', output: 100000000000},
    { input: '333.45 MW', output: 333450000},
    { input: '272,000 kW (2020 est.)', output: 272000000},
    { input: '272,000 kW', output: 272000000},
    { input: '272,000 mw', output: 272000000000},
    { input: '100w', output: 100},
    { input: '10.0kw', output: 10000},
    { input: '1,000.0mw', output: 1000000000},

    { input: '1,000.2 million kW (2017 est.)', output: 1000200000000},
];

describe('genericEnergyParser', () => {
    it('should parse all the energie right', () => {
        for (const testCase of testCases) {
            expect(genericEnergyParser(testCase.input)).to.equal(testCase.output);
        }
    });
});
