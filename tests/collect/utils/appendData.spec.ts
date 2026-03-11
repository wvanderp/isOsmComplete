import { describe, it, expect } from 'vitest';

import appendCountry, { appendThanks } from '../../../collect/utils/appendData';
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

describe('appendCountry', () => {
    it('should add the country to each comparison', () => {
        const result = appendCountry('NL', [baseComparison]);
        expect(result[0].country).toBe('NL');
    });

    it('should not mutate the original comparison', () => {
        appendCountry('DE', [baseComparison]);
        expect(baseComparison.country).toBeUndefined();
    });

    it('should handle an empty array', () => {
        const result = appendCountry('FR', []);
        expect(result).toHaveLength(0);
    });

    it('should apply the country to all comparisons in the array', () => {
        const second: Comparison = { ...baseComparison, id: 'def456', name: 'Second' };
        const result = appendCountry('JP', [baseComparison, second]);
        expect(result).toHaveLength(2);
        expect(result.every((c) => c.country === 'JP')).toBe(true);
    });
});

describe('appendThanks', () => {
    it('should add the thanks field to a comparison', () => {
        const result = appendThanks(baseComparison, 'Thanks, contributor!');
        expect(result.thanks).toBe('Thanks, contributor!');
    });

    it('should not mutate the original comparison', () => {
        appendThanks(baseComparison, 'Thanks!');
        expect(baseComparison.thanks).toBeUndefined();
    });

    it('should preserve all existing fields', () => {
        const result = appendThanks(baseComparison, 'Thanks!');
        expect(result.id).toBe(baseComparison.id);
        expect(result.name).toBe(baseComparison.name);
        expect(result.expected).toBe(baseComparison.expected);
        expect(result.actual).toBe(baseComparison.actual);
    });
});
