import { Comparison } from '../../types';
import appendCountry, { appendThanks } from '../../utils/appendData';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.IT;

export default async function italy(): Promise<Comparison[]> {
    return appendCountry(
        'IT',
        [
            appendThanks(
                await taginfoComparisons(
                    'Gas stations in Italy 🇮🇹',
                    'amenity',
                    'fuel',
                    23711,
                    'https://www.mimit.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv',
                    'Italy has {{expected}} gas stations according to government data. Time to fuel up OSM with complete coverage! ⛽',
                    ['🚗'],
                    '2025-12-07',
                    taginfoServer
                ),
                'Thanks to the community member for providing the data from the Italian Ministry of Business and Made in Italy!'
            )
        ]
    );
}
