/* eslint-disable sonarjs/no-duplicate-string */
import axios from 'axios';
import { Comparison, PolitieApi } from '../../types';
import appendCountry from '../../utils/appendData';
import taginfoComparisons from '../../utils/taginfoComparisons';
import taginfoServers from '../../utils/tagInfoServers';

const taginfoServer = taginfoServers.NL;

const courthousesExpected = [
    // rechtbanken
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
    1,
    // Gerechtshoven / palaces of justice
    // Gerechtshof Amsterdam
    1,
    // Gerechtshof Arnhem-Leeuwarden
    3,
    // Gerechtshof Den Haag
    1,
    // Gerechtshof 's-Hertogenbosch
    1,
    // other
    // Hoge Raad der Nederlanden
    1,
    // College van Beroep voor het bedrijfsleven
    1,
    // Centrale Raad van Beroep
    1,
    // Raad van State
    1,
    // international
    // Permanent Court of Arbitration
    1,
    // International Court of Justice
    1,
    // International Criminal Court
    1
].reduce((a, b) => a + b, 0);

// Utility to get the average of an array
function averageToInt(array: number[]): number {
    return Math.round(array.reduce((a, b) => a + b, 0) / array.length);
}

// Get the number of police stations in the Netherlands
async function getPoliceStations(): Promise<number> {
    // Politiebureaus
    // https://www.politie.nl/binaries/content/assets/politie/onderwerpen/algemeen/politieapi.pdf
    const api = 'https://api.politie.nl/v4/politiebureaus/all';
    let policeApiData: PolitieApi = {
        iterator: {
            last: false,
            offset: 0
        },
        politiebureaus: []
    };
    let policeStations = 0;

    while (!policeApiData.iterator.last) {
        const response = await axios.get<PolitieApi>(api, {
            params: {
                offset: policeApiData.iterator.offset
            }
        });

        policeApiData = response.data;
        const policeLength = policeApiData.politiebureaus.length;
        policeStations += policeLength;
        policeApiData.iterator.offset += policeLength;
    }

    return policeStations;
}

export default async function dutchJudicialSystem(): Promise<Comparison[]> {
    const policeStationsExpected = await getPoliceStations();

    return appendCountry(
        'NL',
        [
            await taginfoComparisons(
                'Palaces of justice in the Netherlands',
                'amenity',
                'courthouse',
                courthousesExpected,
                // Click on all links and count the courthouses
                'https://www.rechtspraak.nl/Organisatie-en-contact/Organisatie/Rechtbanken',
                'In the Netherlands, courts are sometimes called palaces of justice. We expect {{expected}} of them.',
                ['⚖️'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Police stations in the Netherlands',
                'amenity',
                'police',
                policeStationsExpected,
                // Click on all links and count the police stations
                'https://api.politie.nl/v4/politiebureaus/all',
                'The Netherlands has {{expected}} police stations. Are they all in OSM?',
                ['⚖️'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Fire stations in the Netherlands',
                'amenity',
                'fire_station',
                961,
                // Click on all links and count the fire stations
                'https://kerncijfers.nipv.nl/mosaic/kerncijfers-veiligheidsregio-s/kerncijfers-kazernes',
                'The Netherlands has {{expected}} fire stations. Are they all in OSM?',
                ['🚒'],
                '2025-01-05',
                taginfoServer
            ),
            await taginfoComparisons(
                'Prisons in the Netherlands',
                'amenity',
                'prison',
                // There are multiple sources. We combine multiple sources to get an average.
                // https://www.dji.nl/over-dji
                // https://www.dji.nl/locaties
                // https://nl.wikipedia.org/wiki/Dienst_Justiti%C3%ABle_Inrichtingen#Overzicht_inrichtingen_DJI
                // https://experience.geowebonline.nl/Geocortex/Viewer/?app=b5bf572c74e54b0c9574d435afd9d6ce
                averageToInt([50, 55, 41, 40]),
                // Click on all links and count the prisons
                'https://www.dji.nl/locaties',
                'The Netherlands has {{expected}} prisons. Are they all in OSM?',
                ['⚖️'],
                '2025-01-05',
                taginfoServer
            )
        ]
    );
}
