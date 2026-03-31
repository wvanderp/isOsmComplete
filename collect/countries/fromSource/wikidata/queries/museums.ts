import { Comparison } from '../../../../types';
import appendCountry from '../../../../utils/appendData';
import wikidataComparison from '../utils/wikidataComparison';

// Wikidata/Blazegraph only supports *, +, and ? as path repetition operators.
// {n,m} syntax is not supported and causes 400 errors.
// For the museum query we precompute valid museum types in a subquery (excluding
// zoo/museum-ship/dolphinarium subtypes) and then count instances — this is more
// efficient than running FILTER NOT EXISTS with a full * traversal for every item.
const museumSparqlQuery = `
SELECT (COUNT(DISTINCT ?museum) AS ?count) WHERE {
    {
        SELECT DISTINCT ?type WHERE {
            ?type wdt:P279* wd:Q33506. # Subclass of museum
            FILTER NOT EXISTS { ?type wdt:P279* wd:Q575727 } # Exclude museum ship subtypes
            FILTER NOT EXISTS { ?type wdt:P279* wd:Q43501 } # Exclude zoo subtypes
            FILTER NOT EXISTS { ?type wdt:P279* wd:Q491675 } # Exclude dolphinarium subtypes
        }
    }
    ?museum wdt:P31 ?type.
    FILTER NOT EXISTS { ?museum wdt:P576 ?enddate } # Exclude closed museums
  }
`;

const zooSparqlQuery = `
SELECT (COUNT(DISTINCT ?zoo) AS ?count) WHERE {
    ?zoo wdt:P31/wdt:P279* wd:Q43501. # Instance of zoo or subclass
    FILTER NOT EXISTS { ?zoo wdt:P576 ?enddate } # Exclude closed zoos
  }
`;

const aquariumSparqlQuery = `
SELECT (COUNT(DISTINCT ?aquarium) AS ?count) WHERE {
    ?aquarium wdt:P31/wdt:P279* wd:Q2281788. # Instance of public aquarium or subclass
    FILTER NOT EXISTS { ?aquarium wdt:P576 ?enddate } # Exclude closed aquariums
  }
`;

const museumShipsSparqlQuery = `
SELECT (COUNT(DISTINCT ?museumShip) AS ?count) WHERE {
    ?museumShip wdt:P31/wdt:P279* wd:Q575727. # Instance of museum ship or subclass
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
