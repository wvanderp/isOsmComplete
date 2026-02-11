import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { overpassJson, OverpassGatewayTimeoutError, OverpassRateLimitError } from 'overpass-ts';
import * as overpassModule from '../../../collect/api/overpass';
import { delay } from '../../../collect/utils/delay';

// Mock the overpass-ts module
vi.mock('overpass-ts', async () => {
    const actual = await vi.importActual('overpass-ts');
    return {
        ...actual,
        overpassJson: vi.fn()
    };
});

// Mock the delay module
vi.mock('../../../collect/utils/delay', () => ({
    delay: vi.fn(() => Promise.resolve()),
    randomDelay: vi.fn(() => Promise.resolve())
}));

const OVERPASS_API_GENERATOR = 'Overpass API';
const OVERPASS_TIMESTAMP = '2023-05-27T09:38:06Z';
const OVERPASS_COPYRIGHT = 'The data included in this document is from www.openstreetmap.org.';

describe('overpass retry logic', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should succeed on first attempt', async () => {
        const mockData = {
            version: 0.6,
            generator: OVERPASS_API_GENERATOR,
            osm3s: {
                timestamp_osm_base: OVERPASS_TIMESTAMP,
                copyright: OVERPASS_COPYRIGHT
            },
            elements: [{
                type: 'count' as const,
                id: 0,
                tags: {
                    nodes: '0',
                    ways: '0',
                    relations: '0',
                    total: '42'
                }
            }]
        };

        vi.mocked(overpassJson).mockResolvedValueOnce(mockData);

        const result = await overpassModule.overpassSimpleQuery([['amenity', 'restaurant']]);

        expect(result).toBe(42);
        expect(overpassJson).toHaveBeenCalledTimes(1);
        expect(delay).not.toHaveBeenCalled();
    });

    it('should retry on OverpassGatewayTimeoutError and succeed', async () => {
        const mockData = {
            version: 0.6,
            generator: OVERPASS_API_GENERATOR,
            osm3s: {
                timestamp_osm_base: OVERPASS_TIMESTAMP,
                copyright: OVERPASS_COPYRIGHT
            },
            elements: [{
                type: 'count' as const,
                id: 0,
                tags: {
                    nodes: '0',
                    ways: '0',
                    relations: '0',
                    total: '100'
                }
            }]
        };

        vi.mocked(overpassJson)
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError())
            .mockResolvedValueOnce(mockData);

        const result = await overpassModule.overpassSimpleQuery([['amenity', 'cafe']]);

        expect(result).toBe(100);
        expect(overpassJson).toHaveBeenCalledTimes(2);
        expect(delay).toHaveBeenCalledWith(1000); // 2^0 * 1000
    });

    it('should retry on OverpassRateLimitError and succeed', async () => {
        const mockData = {
            version: 0.6,
            generator: OVERPASS_API_GENERATOR,
            osm3s: {
                timestamp_osm_base: OVERPASS_TIMESTAMP,
                copyright: OVERPASS_COPYRIGHT
            },
            elements: [{
                type: 'count' as const,
                id: 0,
                tags: {
                    nodes: '0',
                    ways: '0',
                    relations: '0',
                    total: '200'
                }
            }]
        };

        vi.mocked(overpassJson)
            .mockRejectedValueOnce(new OverpassRateLimitError())
            .mockResolvedValueOnce(mockData);

        const result = await overpassModule.overpassSimpleQuery([['amenity', 'bar']]);

        expect(result).toBe(200);
        expect(overpassJson).toHaveBeenCalledTimes(2);
        expect(delay).toHaveBeenCalledWith(1000);
    });

    it('should use exponential backoff for multiple retries', async () => {
        const mockData = {
            version: 0.6,
            generator: OVERPASS_API_GENERATOR,
            osm3s: {
                timestamp_osm_base: OVERPASS_TIMESTAMP,
                copyright: OVERPASS_COPYRIGHT
            },
            elements: [{
                type: 'count' as const,
                id: 0,
                tags: {
                    nodes: '0',
                    ways: '0',
                    relations: '0',
                    total: '300'
                }
            }]
        };

        vi.mocked(overpassJson)
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError())
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError())
            .mockResolvedValueOnce(mockData);

        const result = await overpassModule.overpassSimpleQuery([['amenity', 'pub']]);

        expect(result).toBe(300);
        expect(overpassJson).toHaveBeenCalledTimes(3);
        expect(delay).toHaveBeenNthCalledWith(1, 1000); // 2^0 * 1000
        expect(delay).toHaveBeenNthCalledWith(2, 2000); // 2^1 * 1000
    });

    it('should fail after exhausting all retries', async () => {
        vi.mocked(overpassJson)
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError())
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError())
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError());

        await expect(
            overpassModule.overpassSimpleQuery([['amenity', 'hospital']])
        ).rejects.toThrow(OverpassGatewayTimeoutError);

        expect(overpassJson).toHaveBeenCalledTimes(3);
        expect(delay).toHaveBeenCalledTimes(2); // Only 2 delays for 3 attempts
    });

    it('should not retry on non-retriable errors', async () => {
        const nonRetriableError = new Error('Bad Request');

        vi.mocked(overpassJson).mockRejectedValueOnce(nonRetriableError);

        await expect(
            overpassModule.overpassSimpleQuery([['amenity', 'school']])
        ).rejects.toThrow('Bad Request');

        expect(overpassJson).toHaveBeenCalledTimes(1);
        expect(delay).not.toHaveBeenCalled();
    });

    it('should work with overpassRawQuery as well', async () => {
        const mockData = {
            version: 0.6,
            generator: OVERPASS_API_GENERATOR,
            osm3s: {
                timestamp_osm_base: OVERPASS_TIMESTAMP,
                copyright: OVERPASS_COPYRIGHT
            },
            elements: [{
                type: 'count' as const,
                id: 0,
                tags: {
                    nodes: '0',
                    ways: '0',
                    relations: '0',
                    total: '500'
                }
            }]
        };

        vi.mocked(overpassJson)
            .mockRejectedValueOnce(new OverpassGatewayTimeoutError())
            .mockResolvedValueOnce(mockData);

        const query = '[out:json][timeout:25];nwr["amenity"="library"];out count;';
        const result = await overpassModule.overpassRawQuery(query);

        expect(result).toBe(500);
        expect(overpassJson).toHaveBeenCalledTimes(2);
        expect(delay).toHaveBeenCalledWith(1000);
    });
});
