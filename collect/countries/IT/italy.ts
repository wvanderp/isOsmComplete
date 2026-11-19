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
            // Suggestion: https://github.com/wvanderp/isOsmComplete/issues/6; dataset details: https://github.com/wvanderp/isOsmComplete/issues/6#issuecomment-2709070921
            'Grazie a [@ivanbranco](https://github.com/ivanbranco) for suggesting the Italian gas station comparison and locating the ministry dataset of active fuel stations!'
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
            // Suggestion: https://github.com/wvanderp/isOsmComplete/issues/7; validity filtering: https://github.com/wvanderp/isOsmComplete/issues/7#issuecomment-2709068256
            'Grazie ancora a [@ivanbranco](https://github.com/ivanbranco) for another Italian comparison: proposing pharmacies and explaining how to exclude closed locations from the Ministry of Health data!'
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
            // Suggestion: https://github.com/wvanderp/isOsmComplete/issues/8; filtering and OSM query: https://github.com/wvanderp/isOsmComplete/issues/8#issuecomment-2709064005
            'Un altro grazie a [@ivanbranco](https://github.com/ivanbranco) for extending the Italian comparisons to over-the-counter pharmacies and supplying both the validity filter and OSM query!'
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
            // Suggestion: https://github.com/wvanderp/isOsmComplete/issues/9
            'Grazie ancora una volta a [@ivanbranco](https://github.com/ivanbranco) for continuing to contribute ideas by proposing monumental trees and tree groups in Italy and recommending the ref:masaf tag for matching the registry!'
        )
    ]
);
