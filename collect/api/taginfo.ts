import axios from 'axios';
import { TagInfo } from '../types';
import randomDelay from '../utils/delay';

function cleanServer(server: string): string {
    if (server.at(-1) === '/') {
        // eslint-disable-next-line no-param-reassign
        server = server.slice(0, -1);
    }

    return server;
}

export default async function taginfoKeyValue(key: string, value: string, server = 'https://taginfo.openstreetmap.org'): Promise<number> {
    const queryUrl = `${cleanServer(server)}/api/4/tag/stats?key=${key}&value=${value}`;
    return callApi(queryUrl);
}

export async function taginfoKey(key: string, server = 'https://taginfo.openstreetmap.org'): Promise<number> {
    const queryUrl = `${cleanServer(server)}/api/4/key/stats?key=${key}`;
    return callApi(queryUrl);
}

async function callApi(url: string): Promise<number> {
    randomDelay(1000, 10000);

    const response = await axios.get<TagInfo>(url);
    const count = response.data.data.find((x) => x.type === 'all')?.count;

    if (count === undefined) {
        throw new Error(`Could not find count for ${url}`);
    }

    return count;
}
