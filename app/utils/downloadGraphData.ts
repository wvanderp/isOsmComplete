import axios from 'axios';
import urlJoin from 'url-join';

export type GraphData = { date: string, value: number, expected?: number }

export default async function downloadGraphData(hash: string): Promise<GraphData[]> {
    const { data } = await axios.get<string>(urlJoin(globalThis.location.href, 'graphs/', `${hash}.csv`));

    return data
        .split('\n')
        .filter((string_) => string_.trim() !== '')
        .map((string_) => {
            const parts = string_.split(',');

            return {
                date: parts[0],
                value: Number.parseInt(parts[1], 10),
                expected: parts[2] ? Number.parseInt(parts[2], 10) : undefined
            };
        });
}
