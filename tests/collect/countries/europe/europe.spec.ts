import { describe, it, expect } from 'vitest';
import { parseFastnedLocations } from '../../../../collect/countries/europe/europe';

const sampleLocations = [
    { id: 1, name: 'Location A' },
    { id: 2, name: 'Location B' },
    { id: 3, name: 'Location C' }
];

describe('parseFastnedLocations', () => {
    it('should parse the data-locations attribute and return the count', () => {
        const encoded = encodeURIComponent(JSON.stringify(sampleLocations));
        const html = `<div data-locations="${encoded}"></div>`;
        expect(parseFastnedLocations(html)).toBe(3);
    });

    it('should throw when data-locations attribute is missing', () => {
        const html = '<div class="locations"></div>';
        expect(() => parseFastnedLocations(html)).toThrow(
            'Could not find data-locations attribute on the Fastned locations page'
        );
    });

    it('should handle a single location', () => {
        const encoded = encodeURIComponent(JSON.stringify([{ id: 1 }]));
        const html = `<div data-locations="${encoded}"></div>`;
        expect(parseFastnedLocations(html)).toBe(1);
    });

    it('should handle an empty locations array', () => {
        const encoded = encodeURIComponent(JSON.stringify([]));
        const html = `<div data-locations="${encoded}"></div>`;
        expect(parseFastnedLocations(html)).toBe(0);
    });

    it('should throw when data-locations contains invalid JSON', () => {
        const html = `<div data-locations="${encodeURIComponent('not valid json')}"></div>`;
        expect(() => parseFastnedLocations(html)).toThrow(
            'Failed to parse the data-locations JSON from the Fastned locations page'
        );
    });
});
