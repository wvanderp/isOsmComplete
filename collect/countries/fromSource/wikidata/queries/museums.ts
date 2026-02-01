import { Comparison } from '../../../../types';
import appendCountry from '../../../../utils/appendData';
import wikidataComparison from '../utils/wikidataComparison';

// Optimized query: Use SERVICE wikibase:label hint and limit property path depth
// The original query with wdt:P279* is very expensive as it traverses the entire class hierarchy
const museumSparqlQuery = `
SELECT (COUNT(DISTINCT ?museum) AS ?count) WHERE {
    # Direct instance of museum or subclass up to 5 levels deep
    ?museum wdt:P31/wdt:P279{0,5} wd:Q33506.
    FILTER NOT EXISTS { ?museum wdt:P576 ?enddate } # Exclude closed museums
    FILTER NOT EXISTS { ?museum wdt:P31/wdt:P279{0,3} wd:Q575727 } # Exclude museum ships
    FILTER NOT EXISTS { ?museum wdt:P31/wdt:P279{0,3} wd:Q43501 } # Exclude zoos
    FILTER NOT EXISTS { ?museum wdt:P31/wdt:P279{0,3} wd:Q491675 } # Exclude dolphinariums
  }
`;

const zooSparqlQuery = `
SELECT (COUNT(DISTINCT ?zoo) AS ?count) WHERE {
    ?zoo wdt:P31/wdt:P279{0,5} wd:Q43501. # Instance of zoo or subclass
    FILTER NOT EXISTS { ?zoo wdt:P576 ?enddate } # Exclude closed zoos
  }
`;

const aquariumSparqlQuery = `
SELECT (COUNT(DISTINCT ?aquarium) AS ?count) WHERE {
    ?aquarium wdt:P31/wdt:P279{0,5} wd:Q2281788. # Instance of public aquarium or subclass
    FILTER NOT EXISTS { ?aquarium wdt:P576 ?enddate } # Exclude closed aquariums
  }
`;

const museumShipsSparqlQuery = `
SELECT (COUNT(DISTINCT ?museumShip) AS ?count) WHERE {
    ?museumShip wdt:P31/wdt:P279{0,5} wd:Q575727. # Instance of museum ship or subclass
    FILTER NOT EXISTS { ?museumShip wdt:P576 ?enddate } # Exclude closed museum ships
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
                '2025-01-05'
            ),
            await wikidataComparison(
                'Zoos',
                zooSparqlQuery,
                'tourism',
                'zoo',
                'The number of zoos in the world',
                ['🦁'],
                '2025-01-05'
            ),
            await wikidataComparison(
                'Aquariums',
                aquariumSparqlQuery,
                'tourism',
                'aquarium',
                'The number of aquariums in the world',
                ['🦁'],
                '2025-01-05'
            ),
            await wikidataComparison(
                'Museum ships',
                museumShipsSparqlQuery,
                'historic',
                'ship',
                'The number of museum ships in the world',
                ['🚢', '🏛️'],
                '2025-01-05'
            )
        ]
    );
}
