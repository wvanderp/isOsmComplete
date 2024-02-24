import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';
// the document is called CANADA FLIGHT SUPPLEMENT and if you search for 'FLT PLN' you can subtract the other uses
const airportIdentifiers = [
    // YUKON NORTHWEST TERRITORIES NUNAVUT
    // https://www.navcanada.ca/en/ecfs_01_en.pdf
    114,
    // BRITISH COLUMBIA
    // https://www.navcanada.ca/en/ecfs_02_en.pdf
    206,
    // ALBERTA SASKATCHEWAN MANITOBA
    // https://www.navcanada.ca/en/ecfs_03_en.pdf
    611,
    // ONTARIO
    // https://www.navcanada.ca/en/ecfs_04_en.pdf
    434,
    // QUEBEC
    // https://www.navcanada.ca/en/ecfs_05_en.pdf
    219,
    // ATLANTIC
    // https://www.navcanada.ca/en/ecfs_07_en.pdf
    134
];

export default async function canada(): Promise<Comparison[]> {
    return appendCountry(
        'CA',
        [
            await taginfoComparisonKeyOnly(
                'Transport Canada identifier',
                'tclid',
                airportIdentifiers.reduce((a, b) => a + b, 0),
                'https://www.navcanada.ca/en/ecfs_07_en.pdf',
                'Canada is a bit special and designed their own codes for airports. Luckily, there are only a few to add.',
                ['✈️'],
                '2024-02-24'
            )
        ]
    );
}
