import { describe, expect, it } from 'vitest';

import { Comparison } from '../../../collect/types';
import mergeComparisons from '../../../collect/utils/mergeComparisons';

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
        const existing = comparison('failed-hash', 8, '2026-07-01');

        expect(mergeComparisons([existing], [])).toEqual([existing]);
    });

    it('replaces an existing comparison by hash with its fresh result', () => {
        const existing = comparison('same-hash', 8, '2026-07-01');
        const fresh = comparison('same-hash', 9, '2026-07-12');

        expect(mergeComparisons([existing], [fresh])).toEqual([fresh]);
    });

    it('appends a newly introduced comparison', () => {
        const existing = comparison('old-hash', 8, '2026-07-01');
        const fresh = comparison('new-hash', 9, '2026-07-12');

        expect(mergeComparisons([existing], [fresh])).toEqual([existing, fresh]);
    });
});
