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

const baseComparisonFunction = (() => baseComparison) as unknown as ComparisonFunction;

describe('appendCountry', () => {
    it('should add the country to each comparison', () => {
        const wrapped = appendCountry('NL', baseComparisonFunction) as unknown as () => Comparison[];
        const comparisons = wrapped();
        expect(comparisons[0].country).toBe('NL');
    });

    it('should not mutate the original comparison', () => {
        appendCountry('DE', baseComparisonFunction);
        expect(baseComparison.country).toBeUndefined();
    });

    it('should handle an empty array', () => {
        const wrapped = appendCountry('FR', []) as unknown as () => Comparison[];
        const comparisons = wrapped();
        expect(comparisons).toHaveLength(0);
    });

    it('should apply the country to all comparisons in the array', () => {
        const second: Comparison = { ...baseComparison, id: 'def456', name: 'Second' };
        const secondFunction = (() => second) as unknown as ComparisonFunction;
        const wrapped = appendCountry('JP', [baseComparisonFunction, secondFunction]) as unknown as () => Comparison[];
        const comparisons = wrapped();
        expect(comparisons).toHaveLength(2);
        expect(comparisons.every((c) => c.country === 'JP')).toBe(true);
    });
});

describe('appendThanks', () => {
    it('should add the thanks field to a comparison', () => {
        const wrapped = appendThanks(baseComparisonFunction, 'Thanks, contributor!');
        const comparison = wrapped() as unknown as Comparison;
        expect(comparison.thanks).toBe('Thanks, contributor!');
    });

    it('should not mutate the original comparison', () => {
        appendThanks(baseComparisonFunction, 'Thanks!');
        expect(baseComparison.thanks).toBeUndefined();
    });

    it('should preserve all existing fields', () => {
        const wrapped = appendThanks(baseComparisonFunction, 'Thanks!');
        const comparison = wrapped() as unknown as Comparison;
        expect(comparison.id).toBe(baseComparison.id);
        expect(comparison.name).toBe(baseComparison.name);
        expect(comparison.expected).toBe(baseComparison.expected);
        expect(comparison.actual).toBe(baseComparison.actual);
    });
});
