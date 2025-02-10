/* eslint-disable sonarjs/no-duplicate-string */
import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';
import taginfoComparisons, { taginfoComparisonMultipleTags } from '../../utils/taginfoComparisons';
import dutchJudicialSystem from './dutchJudicialSystem';
import geldmaat from './geldmaat';

const taginfoServer = taginfoServers.NL;
const taginfoServerEuropa = taginfoServers.EU;

export default async function netherlands(): Promise<Comparison[]> {
    return appendCountry(
        'NL',
        [
            await taginfoComparisons(
                'Car chargers',
                'amenity',
                'charging_station',
                // normal + fast
                163332 + 5157,
                'https://duurzamemobiliteit.databank.nl/mosaic/en-us/elektrisch-vervoer/laadinfra-in-nederland',
                'Electric car charging stations will be more important than ever. The Netherlands has {{expected}} car chargers. Are they all in OSM?',
                ['🔋', '🚗'],
                '2024-08-04',
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                'Hospitals',
                'amenity',
                ['hospital', 'clinic'],
                299 + 483, // hospitals + clinics
                'https://www.zorgkaartnederland.nl/ziekenhuis', // and https://www.zorgkaartnederland.nl/overige-kliniek
                'The Netherlands has {{expected}} hospitals and clinics. Are they all in OSM?',
                ['🏥'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Wind turbines',
                'generator:source',
                'wind',
                2557 + 472, // land 2023 + sea 2022
                'https://nl.wikipedia.org/wiki/Windturbines_in_Nederland', // https://opendata.cbs.nl/statline/#/CBS/nl/dataset/70960NED/table
                'Wind energy is the new hotness. But how hot is the current wind turbine coverage in OSM?',
                ['⚡'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Traffic enforcement camera',
                'highway',
                'speed_camera',
                1019,
                'https://www.cjib.nl/sites/default/files/2025-01/Instroom%20wahv%20per%20flitspaal%20per%20provincie_2024.pdf',
                'Getting a ticket is really annoying! Maybe OSM can help you obey the law extremely locally.',
                ['🚗', '👀'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisonMultipleTags(
                "Albert Heijn's",
                brandWikidata,
                ['Q1653985', 'Q78163765'],
                1268,
                'https://media.aholddelhaize.com/media/clkbibno/ad_ar23_interactive.pdf?t=638459189069470000',
                'Albert Heijn is the biggest supermarket chain in the Netherlands. Are they all in OSM?',
                ['🛒'],
                '2025-01-05',
                // use the Europe server because Albert Heijn is also in Belgium
                taginfoServerEuropa
            ),
            await taginfoComparisons(
                'Gall & Gall',
                brandWikidata,
                'Q13639185',
                628,
                'https://media.aholddelhaize.com/media/clkbibno/ad_ar23_interactive.pdf?t=638459189069470000',
                'Gall & Gall is a liquor store chain in the Netherlands. Are they all in OSM?',
                ['🛒'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Etos',
                brandWikidata,
                'Q2609459',
                523,
                'https://media.aholddelhaize.com/media/clkbibno/ad_ar23_interactive.pdf?t=638459189069470000',
                'Etos is a drugstore chain in the Netherlands. Are they all in OSM?',
                ['🛒'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Civil defense siren',
                'emergency',
                'siren',
                4278,
                'https://www.brandweer.nl/onderwerpen/sirenes/', // an other source could be: https://luchtalarmen.nl/info
                'At this critical point in time, civil defense sirens are facing extinction in The Netherlands, they deserve to be mapped.',
                ['🚨'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Mailboxes in the Netherlands',
                'operator:wikidata',
                'Q5921598',
                11000,
                'https://nos.nl/artikel/2530705-oranje-brievenbussen-verdwijnen-op-steeds-meer-plekken',
                'Mailboxes are disappearing in the Netherlands. Are they all in OSM?',
                ['📮'],
                '2024-08-04',
                taginfoServer
            ),
            await taginfoComparisons(
                'Surveillance cameras in the Netherlands',
                'surveillance:type',
                'camera',
                337609,
                'https://eenvandaag.avrotros.nl/item/steeds-meer-cameras-in-de-openbare-ruimte-dit-zijn-de-gevolgen-voor-jouw-privacy/',
                'Is the Netherlands turning into a surveillance state? Let\'s make sure that we know if it does!',
                ['👀'],
                '2024-08-19',
                taginfoServer
            ),

            // from other files
            await geldmaat(),
            ...(await dutchJudicialSystem())
        ]
    );
}
