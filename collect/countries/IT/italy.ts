import { countCsvRows, countPharmacies, pharmacySource } from './italyData';
import appendCountry, { appendThanks } from '../../utils/appendData';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.IT;

export default appendCountry(
    'IT',
    [
        appendThanks(
            async () => taginfoComparisons(
                'Gas stations in Italy 🇮🇹',
                'amenity',
                'fuel',
                // The fuel CSV starts with a refresh timestamp before its header.
                await countCsvRows('https://www.mimit.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv', 2),
                'https://www.mimit.gov.it/images/exportCSV/anagrafica_impianti_attivi.csv',
                'Italy has {{expected}} gas stations according to government data. Time to fuel up OSM with complete coverage! ⛽',
                ['🚗'],
                '2025-12-07',
                taginfoServer
            )(),
            'Thanks to [@ivanbranco](https://github.com/ivanbranco) for providing the data from the Italian Ministry of Business and Made in Italy!'
        ),
        appendThanks(
            async () => taginfoComparisons(
                'Pharmacies in Italy 🇮🇹',
                'amenity',
                'pharmacy',
                await countPharmacies(),
                pharmacySource,
                'Italy has {{expected}} pharmacies according to government health data. Is OSM dispensing enough coverage? 💊',
                ['🏥'],
                '2026-03-31',
                taginfoServer
            )(),
            'Thanks to the Italian Ministry of Health for providing the pharmacy data via [dati.salute.gov.it](https://www.dati.salute.gov.it/it/dataset/farmacie/)!'
        )
    ]
);
