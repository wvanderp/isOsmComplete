import { Comparison } from '../../types';
import appendCountry from '../../utils/appendData';
import overpassComparison from '../../utils/overpassComparisons';

export default async function sanFrancisco(): Promise<Comparison[]> {
    return appendCountry(
        'US',
        [
            await overpassComparison(
                'Automatic number-plate recognition in San Francisco',
                'surveillance:type',
                'ALPR',
                400,
                'https://sfist.com/2025/01/03/sfpd-refuses-to-say-where-theyve-placed-those-400-automated-license-plate-readers-all-over-town/',
                'The SFPD has placed 400 ALPRs all over town, but they refuse to say where they are. Maybe we can help them find them?',
                ['👀', '⚖️', '🚗'],
                '2025-01-05',
                3600111968 // San Francisco
            )
        ]
    );
}
