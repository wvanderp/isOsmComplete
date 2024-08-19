import { Comparison } from '../../../../types';
import appendCountry from '../../../../utils/appendData';
import wikidataComparison from '../utils/wikidataComparison';

const museumSparqlQuery = `
SELECT (count(?museum) as ?count) WHERE {
    ?museum (wdt:P31/(wdt:P279*)) wd:Q33506. # Instance of museum
    FILTER NOT EXISTS { ?museum wdt:P576 ?enddate } # Exclude closed museums (P576 = end date)
    FILTER NOT EXISTS { ?museum wdt:P31 wd:Q575727 } # Exclude museum ships
    FILTER NOT EXISTS { ?museum wdt:P31 wd:Q43501 } # Exclude zoos
    FILTER NOT EXISTS { ?museum wdt:P31 wd:Q491675 } # Exclude dolphinarium
  }
`;

const zooSparqlQuery = `
SELECT (count(?zoo) as ?count) WHERE {
    ?zoo (wdt:P31/(wdt:P279*)) wd:Q43501. # Instance of zoo
    FILTER NOT EXISTS { ?zoo wdt:P576 ?enddate } # Exclude closed zoos (P576 = end date)
  }
`;

const aquariumSparqlQuery = `
SELECT (count(?aquarium) as ?count) WHERE {
    ?aquarium (wdt:P31/(wdt:P279*)) wd:Q2281788. # Instance of public aquarium
    FILTER NOT EXISTS { ?aquarium wdt:P576 ?enddate } # Exclude closed aquariums (P576 = end date)
  }
`;

const museumShipsSparqlQuery = `
SELECT (count(?museumShip) as ?count) WHERE {
    ?museumShip (wdt:P31/(wdt:P279*)) wd:Q575727. # Instance of museum ship
    FILTER NOT EXISTS { ?museumShip wdt:P576 ?enddate } # Exclude closed museum ships (P576 = end date)
  }
`;

export default async function museum(): Promise<Comparison[]> {
    return appendCountry(
        'Worldwide',
        [
            await wikidataComparison(
                'Museums',
                museumSparqlQuery,
                'tourism',
                'museum',
                'The number of museums in the world',
                ['🏛️', '🎨'],
                '2024-07-28'
            ),
            await wikidataComparison(
                'Zoos',
                zooSparqlQuery,
                'tourism',
                'zoo',
                'The number of zoos in the world',
                ['🦁'],
                '2024-07-28'
            ),
            await wikidataComparison(
                'Aquariums',
                aquariumSparqlQuery,
                'tourism',
                'aquarium',
                'The number of aquariums in the world',
                ['🦁'],
                '2024-07-28'
            ),
            await wikidataComparison(
                'Museum ships',
                museumShipsSparqlQuery,
                'historic',
                'ship',
                'The number of museum ships in the world',
                ['🚢', '🏛️'],
                '2024-07-28'
            )
        ]
    );
}
