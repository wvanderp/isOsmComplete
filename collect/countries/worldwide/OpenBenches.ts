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
            lat: Number.parseFloat(lat),
            lon: Number.parseFloat(lon),
            title
        };
    });

    return await taginfoComparisons(
        'Memorial benches',
        'memorial',
        'bench',
        benches.length,
        'https://openbenches.org/',
        'OpenBenches collects memorial benches. Wouldn\'t it be nice to have them in OSM as well?',
        ['🪑'],
        new Date().toISOString().split('T')[0] // continuously updated, so we just use the current date as the last updated date
    )() as Comparison;
}
