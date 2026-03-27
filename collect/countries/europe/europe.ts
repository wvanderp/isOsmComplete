import axios from 'axios';
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';
import retailStoresInEurope from './data.europe';

const taginfoServer = taginfoServers.EU;

function decodeHtmlEntities(string_: string): string {
    return string_
        .replaceAll('&quot;', '"')
        .replaceAll('&amp;', '&')
        .replaceAll('&lt;', '<')
        .replaceAll('&gt;', '>')
        .replaceAll('&#39;', "'");
}

export function parseFastnedLocations(html: string): number {
    const match = html.match(/data-locations="([^"]+)"/);
    if (!match?.[1]) {
        throw new Error('Could not find data-locations attribute on the Fastned locations page');
    }

    let locations: unknown[];
    try {
        locations = JSON.parse(decodeHtmlEntities(match[1])) as unknown[];
    } catch {
        throw new Error('Failed to parse the data-locations JSON from the Fastned locations page');
    }

    return locations.length;
}

async function numberOfFastnedChargers(): Promise<number> {
    const response = await axios.get<string>('https://www.fastnedcharging.com/en/locations');
    return parseFastnedLocations(response.data);
}

export default async function europe(): Promise<Comparison[]> {
    return appendCountry(
        'EU',
        [
            await taginfoComparisons(
                'Fastned chargers in the EU',
                'operator:wikidata',
                'Q19935749',
                await numberOfFastnedChargers(),
                'https://www.fastnedcharging.com/en/locations',
                'Fastned is a provider of charging stations in Europe. What is the charge of Fastneds network in OSM?',
                ['🔋', '🚗'],
                '2025-01-05',
                taginfoServer
            ),

            ...(await retailStoresInEurope())
        ]
    );
}
