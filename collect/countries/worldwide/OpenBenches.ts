import axios from 'axios';
import taginfoComparisons from '../../utils/taginfoComparisons';
import { Comparison } from '../../types';

const openBenchesDataUrl = 'https://openbenches.org/api/benches.tsv';

export default async function openBenches(): Promise<Comparison> {
    const { data } = await axios.get<string>(openBenchesDataUrl);
    const benches = data.split('\n').slice(1).map((line) => {
        const [id, lat, lon, title] = line.split('\t');
        return {
            id,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            title,
        };
    });

    return taginfoComparisons(
        'Memorial benches',
        'memorial',
        'bench',
        benches.length,
        'https://openbenches.org/',
        'OpenBenches that collects memorial benches. Wouldn\'t it be nice to have them in OSM as well?',
        ['🪑'],
        '2024-08-04'
    );
}
