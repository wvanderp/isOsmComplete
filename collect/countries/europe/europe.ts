import axios from 'axios';
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';
import retailStoresInEurope from './data.europe';

const taginfoServer = taginfoServers.EU;

async function numberOfFastnedChargers(): Promise<number> {
    const locations = await axios.get('https://route.fastned.nl/_api/locations');
    return locations.data.length;
}

export default async function europe(): Promise<Comparison[]> {
    return appendCountry(
        'EU',
        [
            await taginfoComparisons(
                'Fastned charger in the EU',
                'operator:wikidata',
                'Q19935749',
                await numberOfFastnedChargers(),
                'https://fastnedcharging.com/nl/locaties',
                'Fastned is a provider of charging stations in Europe. What is the charge of Fastned in OSM?',
                ['🔋', '🚗'],
                '2024-02-18',
                taginfoServer
            ),

            ...(await retailStoresInEurope())
        ]
    );
}
