import { countCsvRows, countPharmacies, countParaPharmacies, pharmacySource, paraPharmacySource } from './italyData';
import appendCountry, { appendThanks } from '../../utils/appendData';
import { overpassComparisonMultiple } from '../../utils/overpassComparisons';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';

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
        ),
        appendThanks(
            async () => overpassComparisonMultiple(
                'Over-the-counter pharmacies in Italy 🇮🇹',
                [['amenity', 'pharmacy'], ['dispensing', 'no']],
                'and',
                await countParaPharmacies(),
                paraPharmacySource,
                'Italy has {{expected}} active over-the-counter pharmacies. Give OSM a healthy dose of coverage! 💊',
                ['🏥'],
                '2026-11-01',
                3600365331
            )(),
            'Thanks to [@ivanbranco](https://github.com/ivanbranco) for the suggestion and the Italian Ministry of Health for the data!'
        ),
        appendThanks(
            taginfoComparisonKeyOnly(
                'Monumental trees and tree groups in Italy 🇮🇹',
                'ref:masaf',
                5008,
                'https://www.masaf.gov.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/11260',
                // Registry entries include groups; individual trees are not the comparison unit.
                // Taginfo counts tagged OSM objects, so duplicated references may inflate coverage.
                'Italy lists {{expected}} monumental trees and tree groups (July 2026 registry). OSM objects with ref:masaf show how coverage is growing! 🌳 Groups count as one registry entry; duplicate references in OSM can inflate coverage.',
                ['🌳'],
                '2026-07-24',
                taginfoServer
            ),
            'Thanks to [@ivanbranco](https://github.com/ivanbranco) for the suggestion and MASAF for the monumental tree registry!'
        )
    ]
);
