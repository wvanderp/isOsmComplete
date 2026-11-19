import { describe, it, expect } from 'vitest';

import appendCountry, { appendThanks } from '../../../collect/utils/appendData';
import { ComparisonFunction } from '../../../collect/types/ComparisonFunction';
import { Comparison } from '../../../collect/types';

const baseComparison: Comparison = {
    id: 'abc123',
    name: 'Test Comparison',
    expected: 100,
    actual: 90,
    expectedSource: 'https://example.com',
    actualSource: 'taginfo',
    description: 'A test comparison',
    lastUpdated: '2025-01-01'
};

const baseComparisonFunction: ComparisonFunction = async () => baseComparison;

describe.each([
    ['country', (source: ComparisonFunction) => appendCountry('NL', source)[0], { country: 'NL' }],
    ['thanks', (source: ComparisonFunction) => appendThanks(source, 'Thanks!'), { thanks: 'Thanks!' }]
] as const)('append %s', (_name, wrap, addedFields) => {
    it('adds metadata while preserving the complete source object', async () => {
        const original = { ...baseComparison };
        const result = await wrap(async () => original)();

        expect(result).toEqual({ ...baseComparison, ...addedFields });
        expect(result).not.toBe(original);
        expect(original).toEqual(baseComparison);
    });

    it('decorates every result in a batch without mutating the source array or its objects', async () => {
        const originals = [{ ...baseComparison }, { ...baseComparison, id: 'second', actual: 42 }];
        const snapshot = structuredClone(originals);
        const result = await wrap(async () => originals)();

        expect(result).toEqual(snapshot.map((comparison) => ({ ...comparison, ...addedFields })));
        expect(result).not.toBe(originals);
        expect(originals).toEqual(snapshot);
        for (const [index, comparison] of (result as Comparison[]).entries()) {
            expect(comparison).not.toBe(originals[index]);
        }
    });

    it('preserves an empty batch', async () => {
        expect(await wrap(async () => [])()).toEqual([]);
    });

    it('propagates collection failures', async () => {
        const error = new Error('Collection failed');
        const wrapped = wrap(async () => { throw error; });
        await expect(wrapped()).rejects.toBe(error);
    });
});

describe('appendCountry', () => {
    it('decorates independent collectors and preserves their order', async () => {
        const second = { ...baseComparison, id: 'second', actual: 42 };
        const wrapped = appendCountry('JP', [baseComparisonFunction, async () => second]);

        expect(await Promise.all(wrapped.map((collect) => collect()))).toEqual([
            { ...baseComparison, country: 'JP' },
            { ...second, country: 'JP' }
        ]);
    });
});
