/* eslint-disable sonarjs/no-duplicate-string */
import axios from 'axios';
import { Comparison, PolitieApi } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoComparisons from '../../utils/taginfoComparisons';

const taginfoServer = 'https://taginfo.geofabrik.de/europe:netherlands/';

const courthousesExpected = [
    // Rechtbank-Zeeland-West-Brabant
    4,
    // Rechtbank-Rotterdam
    2,
    // Rechtbank-Overijssel
    3,
    // Rechtbank-Oost-Brabant
    2,
    // Rechtbank-Noord-Nederland
    3,
    // Rechtbank-Noord-Holland
    5,
    // Rechtbank-Midden-Nederland
    4,
    // Rechtbank-Limburg
    2,
    // Rechtbank-Gelderland
    4,
    // Rechtbank-Den Haag
    1,
    // Rechtbank-Amsterdam
    1
].reduce((a, b) => a + b, 0);

// utility get average of array
function averageToInt(array: number[]): number {
    return Math.round(array.reduce((a, b) => a + b, 0) / array.length);
}

export default async function dutchJudicialSystem(): Promise<Comparison[]> {
    // Politiebureaus
    const api = 'https://api.politie.nl/v4/politiebureaus/all';
    const {data} = await axios.get<PolitieApi>(api);
    const politiebureausExpected = data.politiebureaus.length;

    return appendCountry(
        'NL',
        [
            await taginfoComparisons(
                'palaces of justice in the Netherlands',
                'amenity',
                'courthouse',
                courthousesExpected,
                // click on all links and count the courthouses
                'https://www.rechtspraak.nl/Organisatie-en-contact/Organisatie/Rechtbanken',
                'In the Netherlands courts are sometime called palaces of justice. We expect {{expected}} of them.',
                ['⚖️'],
                '2023-10-26',
                taginfoServer
            ),
            await taginfoComparisons(
                'police stations in the Netherlands',
                'amenity',
                'police',
                politiebureausExpected,
                // click on all links and count the police stations
                'https://api.politie.nl/v4/politiebureaus/all',
                'The Netherlands has {{expected}} police stations. Are they all in OSM?',
                ['⚖️'],
                '2023-10-26',
                taginfoServer
            ),
            await taginfoComparisons(
                'fire stations in the Netherlands',
                'amenity',
                'fire_station',
                949,
                // click on all links and count the fire stations
                'https://kerncijfers.nipv.nl/mosaic/kerncijfers-veiligheidsregio-s/kerncijfers-kazernes',
                'The Netherlands has {{expected}} fire stations. Are they all in OSM?',
                ['🚒'],
                '2023-10-26',
                taginfoServer
            ),
            await taginfoComparisons(
                'prisons in the Netherlands',
                'amenity',
                'prison',
                // there are multiple sources we combine multiple sources to get a average
                // https://www.dji.nl/over-dji
                // https://www.dji.nl/locaties
                // https://nl.wikipedia.org/wiki/Dienst_Justiti%C3%ABle_Inrichtingen#Overzicht_inrichtingen_DJI
                // https://experience.geowebonline.nl/Geocortex/Viewer/?app=b5bf572c74e54b0c9574d435afd9d6ce
                averageToInt([50, 44, 47, 44]),
                // click on all links and count the prisons
                'https://www.dji.nl/locaties',
                'The Netherlands has {{expected}} prisons. Are they all in OSM?',
                ['⚖️'],
                '2023-10-26',
                taginfoServer
            )
        ]
    );
}
