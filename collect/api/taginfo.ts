import axios from 'axios';
import { TagInfo } from '../types';

export default async function taginfo(key: string, value: string, server = 'https://taginfo.openstreetmap.org'): Promise<number> {
    const queryUrl = `${server}/api/4/tag/stats?key=${key}&value=${value}`;

    const response = await axios.get<TagInfo>(queryUrl);
    const count = response.data.data.find((x) => x.type === 'all')?.count;

    if (count === undefined) {
        throw new Error(`Could not find count for ${key}=${value}`);
    }

    return count;
}
