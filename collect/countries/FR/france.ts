import { Comparison } from '../../types';
import appendCountry, { appendThanks } from '../../utils/appendData';
import { bakery, shop, wikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = taginfoServers.FR;

export default async function france(): Promise<Comparison[]> {
    return appendCountry(
        'FR',
        [
            appendThanks(
                await taginfoComparisons(
                    'Bakeries in France 🍞🥐🥖',
                    shop,
                    bakery,
                    56553,
                    'https://github.com/wvanderp/isOsmComplete/issues/1',
                    'Tu aimes les baguettes? 🥖🥖🥖 Then you better make sure that OSM knows where the closest baker is.',
                    ['🛒'],
                    '2023-10-15',
                    taginfoServer
                ),
                'Merci beaucoup à [@Binnette](https://github.com/Binnette) for the suggestion and for providing the data!'
            ),
            await taginfoComparisons(
                'Eiffel Tower',
                wikidata,
                'Q243',
                1,
                'https://www.google.com/search?q=how+many+eiffel+towers+are+there%3F',
                'The one and only Eiffel Tower. Did we remember to add it to OSM?',
                ['🏛️'],
                '2023-10-15'
            )
        ]
    );
}
