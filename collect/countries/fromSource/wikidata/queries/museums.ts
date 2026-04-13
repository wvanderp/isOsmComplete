import { Comparison } from '../../../../types';
import appendCountry from '../../../../utils/appendData';
import wikidataComparison from '../utils/wikidataComparison';

// Wikidata Query Service rejects bounded property paths like wdt:P279{0,5}. The
// supported and performant form is to bind the instance-of class first and then
// follow the subclass tree from the class variable.
function buildClassHierarchyPattern(entityVariable: string, classVariable: string, qid: string): string {
    return `${entityVariable} wdt:P31 ${classVariable}.\n    ${classVariable} wdt:P279* wd:${qid}.`;
}

const museumSparqlQuery = `
SELECT (COUNT(DISTINCT ?museum) AS ?count) WHERE {
    ${buildClassHierarchyPattern('?museum', '?museumClass', 'Q33506')}
    FILTER NOT EXISTS { ?museum wdt:P576 ?enddate } # Exclude closed museums
    FILTER NOT EXISTS {
        ${buildClassHierarchyPattern('?museum', '?museumShipClass', 'Q575727')}
    } # Exclude museum ships
    FILTER NOT EXISTS {
        ${buildClassHierarchyPattern('?museum', '?zooClass', 'Q43501')}
    } # Exclude zoos
    FILTER NOT EXISTS {
        ${buildClassHierarchyPattern('?museum', '?dolphinariumClass', 'Q491675')}
    } # Exclude dolphinariums
}
`;

const zooSparqlQuery = `
SELECT (COUNT(DISTINCT ?zoo) AS ?count) WHERE {
    ${buildClassHierarchyPattern('?zoo', '?zooClass', 'Q43501')} # Instance of zoo or subclass
    FILTER NOT EXISTS { ?zoo wdt:P576 ?enddate } # Exclude closed zoos
  }
`;

const aquariumSparqlQuery = `
SELECT (COUNT(DISTINCT ?aquarium) AS ?count) WHERE {
    ${buildClassHierarchyPattern('?aquarium', '?aquariumClass', 'Q2281788')} # Instance of public aquarium or subclass
    FILTER NOT EXISTS { ?aquarium wdt:P576 ?enddate } # Exclude closed aquariums
  }
`;

const museumShipsSparqlQuery = `
SELECT (COUNT(DISTINCT ?museumShip) AS ?count) WHERE {
    ${buildClassHierarchyPattern('?museumShip', '?museumShipClass', 'Q575727')} # Instance of museum ship or subclass
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
