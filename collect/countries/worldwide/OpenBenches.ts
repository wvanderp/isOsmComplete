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
            lat: Number(lat),
            lon: Number(lon),
            title
        };
    });

    // today's date in YYYY-MM-DD format, since the data is continuously updated, we just use the current date as the last updated date
    const todayDate = new Date();
    const today = todayDate.toISOString().split('T', 2)[0];

    return await taginfoComparisons(
        'Memorial benches',
        'memorial',
        'bench',
        benches.length,
        'https://openbenches.org/',
        'OpenBenches collects memorial benches. Wouldn\'t it be nice to have them in OSM as well?',
        ['🪑'],
        today
    )() as Comparison;
}
