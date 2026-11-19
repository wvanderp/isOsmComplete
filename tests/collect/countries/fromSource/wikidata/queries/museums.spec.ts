import { beforeEach, describe, expect, it, vi } from 'vitest';

const { wikidataComparisonMock } = vi.hoisted(() => ({
    wikidataComparisonMock: vi.fn<(name: string, query: string, ...arguments_: unknown[]) => unknown>()
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
        await import('../../../../../../collect/countries/fromSource/wikidata/queries/museums.js');
        const queries = wikidataComparisonMock.mock.calls.map(([, sparqlQuery]) => sparqlQuery as string);

        expect(queries).toHaveLength(4);
        expect(queries.every((query) => !/wdt:P279{\d/.test(query))).toBe(true);
        expect(queries[0]).toContain('?museum wdt:P31 ?museumClass.');
        expect(queries[0]).toContain('?museumClass wdt:P279* wd:Q33506.');
        expect(queries[0]).toContain('?museumShipClass wdt:P279* wd:Q575727.');
    });
});
