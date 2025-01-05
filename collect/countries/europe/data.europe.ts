import axios from 'axios';
import { parse } from 'csv-parse/sync';
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { taginfoComparisonKeyOnly, taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import taginfoServers from '../../utils/tagInfoServers';

const sourceUrl = 'https://data.europa.eu/data/datasets/6k2ldtwgaa2lvoudvtbbq?locale=en';
const dataUrl = 'https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/dt_oth_n47_r2?format=SDMX-CSV';

const taginfoServer = taginfoServers.EU;

export default async function retailStoresInEurope(): Promise<Comparison[]> {
    console.info('Starting on retail stores in Europe');

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

    const categories = data
        .filter((a) => a.TIME_PERIOD === 2017)
        .filter((a) => typeof a.OBS_VALUE === 'number' && !Number.isNaN(a.OBS_VALUE))
        .reduce<Record<string, number>>((accumulator, current) => {
            accumulator[current.nace_r2] = accumulator[current.nace_r2] || 0;
            accumulator[current.nace_r2] += Number(current.OBS_VALUE);
            return accumulator;
        }, {});

    // Remove G47.9 and G47.8, which are stalls, markets, and non-store shops
    const retailStoresCount = categories.G47 - (categories.G478 + categories.G479);

    // Car shops are not included in the retail stores count
    const carShopsCount = await taginfoComparisonMultipleTags(
        'Car shops in Europe',
        'shop',
        ['car', 'car_repair', 'car_parts'],
        0,
        sourceUrl,
        'How many car shops are in Europe?',
        ['🚗'],
        '2025-01-05',
        taginfoServer
    );

    const all = await taginfoComparisonKeyOnly(
        'Retail stores in Europe',
        'shop',
        retailStoresCount,
        sourceUrl,
        'How much shopping can be done in Europe?',
        ['🛒'],
        '2025-01-05',
        taginfoServer
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
