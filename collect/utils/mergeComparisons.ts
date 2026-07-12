import { Comparison } from '../types';

/**
 * Keeps previously collected comparisons and replaces them with fresh results
 * when a collection succeeds. Map preserves the order of existing entries and
 * appends comparisons that have not been collected before.
 */
export default function mergeComparisons(
    existingComparisons: Comparison[],
    collectedComparisons: Comparison[]
): Comparison[] {
    const comparisonsById = new Map(existingComparisons.map((comparison) => [comparison.id, comparison]));

    for (const comparison of collectedComparisons) {
        comparisonsById.set(comparison.id, comparison);
    }

    return comparisonsById.values().toArray();
}
