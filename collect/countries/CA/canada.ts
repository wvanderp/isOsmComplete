import { Comparison } from '../../types';
import appendCountry from '../../utils/appendCountry';
import { taginfoComparisonKeyOnly } from '../../utils/taginfoComparisons';

export default async function canada(): Promise<Comparison[]> {
    return appendCountry(
        'CA',
        [
            await taginfoComparisonKeyOnly(
                'Transport Canada identifier',
                'tclid',
                87,
                // the document is called CANADA FLIGHT SUPPLEMENT and if you search for 'RWY DATA' you can subract the other uses
                'https://www.navcanada.ca/en/ecfs_07_en.pdf',
                'Canada is a bit special and designed their own codes for airports. luckily there are only only a few to add',
                ['✈️']
            )
        ]
    );
}
