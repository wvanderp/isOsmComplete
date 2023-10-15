import axios from 'axios';
import { parse } from 'csv-parse/sync';
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';

const sourceUrl = 'https://data.europa.eu/data/datasets/6k2ldtwgaa2lvoudvtbbq?locale=en';
const dataUrl = 'https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/dt_oth_n47_r2?format=SDMX-CSV';
export default async function retailStoresInEurope(): Promise<Comparison[]> {
    console.log('starting on Retail stores in Europe');

    const csv = await axios.get(dataUrl);
    const data = parse(csv.data, {
        columns: true,
        skip_empty_lines: true,
        cast: true
    }) as {
        DATAFLOW: string;
        'LAST UPDATE': string;
        freq: string;
        unit: string;
        nace_r2: string;
        indic_sb: string;
        geo: string;
        TIME_PERIOD: number;
        OBS_VALUE: number | string;
        OBS_FLAG: string;
    }[];

    const retailStoresCount = data
        .filter((a) => a.TIME_PERIOD === 2017)
        .filter((a) => a.nace_r2 === 'G47')
        // filter out all non-numeric values
        .filter((a) => typeof a.OBS_VALUE === 'number' && !Number.isNaN(a.OBS_VALUE))
        // @ts-expect-error - we checked for numbers above
        .reduce((accumulator, current) => accumulator + Number.parseInt(current.OBS_VALUE, 10), 0);

    // car shops are not included in the retail stores
    const carShopsCount = await taginfoComparisonMultipleTags(
        'Car shops in Europe',
        'shop',
        ['car', 'car_repair', 'car_parts'],
        0,
        sourceUrl,
        'How many car shops are in Europe?',
        ['🚗'],
        '2023-09-24'
    );

    const all = await taginfoComparisonKeyOnly(
        'Retail stores in Europe',
        'shop',
        retailStoresCount,
        sourceUrl,
        'How much shopping can be done in Europe?',
        ['🛒'],
        '2023-09-24'
    );

    const comparison = {
        ...all,
        actual: all.actual - carShopsCount.actual
    } as Comparison;

    return appendCountry(
        'EU',
        [
            comparison
        ]
    );
}
