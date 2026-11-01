import { describe, expect, it } from 'vitest';

import { Comparison } from '../../../collect/types';
import mergeComparisons from '../../../collect/utils/mergeComparisons';

const oldDate = '2026-07-01';
const freshDate = '2026-07-12';

const comparison = (id: string, actual: number, lastUpdated: string): Comparison => ({
    id,
    name: `Comparison ${id}`,
    expected: 10,
    actual,
    expectedSource: 'https://example.com',
    actualSource: 'overpass',
    description: 'A test comparison',
    lastUpdated
});

describe('mergeComparisons', () => {
    it('keeps an existing comparison when no fresh result was collected', () => {
        const existing = comparison('failed-hash', 8, oldDate);

        expect(mergeComparisons([existing], [])).toEqual([existing]);
    });

    it('replaces an existing comparison by hash with its fresh result', () => {
        const existing = comparison('same-hash', 8, oldDate);
        const fresh = comparison('same-hash', 9, freshDate);

        expect(mergeComparisons([existing], [fresh])).toEqual([fresh]);
    });

    it('appends a newly introduced comparison', () => {
        const existing = comparison('old-hash', 8, oldDate);
        const fresh = comparison('new-hash', 9, freshDate);

        expect(mergeComparisons([existing], [fresh])).toEqual([existing, fresh]);
    });
    it('preserves existing order, keeps failed collections and appends new IDs in collection order', () => {
        const retained = comparison('retained', 3, oldDate);
        const old = comparison('updated', 4, oldDate);
        const fresh = comparison('updated', 9, freshDate);
        const added = comparison('added', 5, freshDate);
        const existing = [old, retained];
        const collected = [added, fresh];
        const snapshot = structuredClone({ existing, collected });

        expect(mergeComparisons(existing, collected)).toEqual([fresh, retained, added]);
        expect({ existing, collected }).toEqual(snapshot);
    });

    it('uses the latest result when the same ID is collected twice', () => {
        const first = comparison('same', 1, oldDate);
        const last = comparison('same', 2, freshDate);
        expect(mergeComparisons([], [first, last])).toEqual([last]);
    });

});
