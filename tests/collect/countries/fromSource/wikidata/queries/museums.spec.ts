import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Comparison } from '../../../../../../collect/types';

const { wikidataComparisonMock } = vi.hoisted(() => ({
    wikidataComparisonMock: vi.fn(async (...comparisonArguments: [string, string, ...unknown[]]) => ({
        id: comparisonArguments[0],
        name: comparisonArguments[0],
        expected: 0,
        actual: 0,
        expectedSource: 'Wikidata query service',
        actualSource: 'taginfo',
        description: `${comparisonArguments[0]} description`,
        tags: [],
        lastUpdated: '2025-01-05'
    }))
}));

vi.mock('../../../../../../collect/countries/fromSource/wikidata/utils/wikidataComparison', () => ({
    default: wikidataComparisonMock
}));

describe('museum', () => {
    beforeEach(() => {
        wikidataComparisonMock.mockClear();
        vi.resetModules();
    });

    it('builds Wikidata queries without unsupported bounded property path syntax', async () => {
        const museumModule = await import('../../../../../../collect/countries/fromSource/wikidata/queries/museums.js');
        const museum = museumModule.default as unknown as () => Promise<Comparison[]>;
        const comparisons = await museum();
        const queries = wikidataComparisonMock.mock.calls.map(([, sparqlQuery]) => sparqlQuery as string);

        expect(comparisons).toHaveLength(4);
        expect(comparisons.every((comparison) => comparison.country === 'Worldwide')).toBe(true);
        expect(queries).toHaveLength(4);
        expect(queries.every((query) => !/wdt:P279{\d/.test(query))).toBe(true);
        expect(queries[0]).toContain('?museum wdt:P31 ?museumClass.');
        expect(queries[0]).toContain('?museumClass wdt:P279* wd:Q33506.');
        expect(queries[0]).toContain('?museumShipClass wdt:P279* wd:Q575727.');
    });
});
