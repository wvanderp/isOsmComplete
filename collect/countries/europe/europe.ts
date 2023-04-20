import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe/';

export default async function EU(): Promise<Comparison[]> {
    return appendCountry(
        'EU',
        [
            await taginfoComparisons(
                'Fastned charger in the EU',
                'operator:wikidata',
                'Q19935749',
                244,
                'https://fastnedcharging.com/hq/nl/fastned-ziet-omzet-bijna-verdrievoudigen-en-ontvangt-onderscheidingen-in-drie-landen-tijdens-4e-kwartaal-2022/',
                'Fastned is a provider of charging stations in Europe. What is the charge of Fastned in osm?',
                ['🔋', '🚗'],
                taginfoServer
            )
        ]
    );
}
