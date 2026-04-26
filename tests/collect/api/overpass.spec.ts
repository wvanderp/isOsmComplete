import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OverpassRateLimitError } from 'overpass-ts';
import { overpassRawQuery } from '../../../collect/api/overpass';

const { overpassJsonMock, delayMock, randomDelayMock } = vi.hoisted(() => ({
    overpassJsonMock: vi.fn(),
    delayMock: vi.fn(async () => { }),
    randomDelayMock: vi.fn(async () => { })
}));

vi.mock('overpass-ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('overpass-ts')>();

    return {
        ...actual,
        overpassJson: overpassJsonMock
    };
});

vi.mock('../../../collect/utils/delay', () => ({
    delay: delayMock,
    randomDelay: randomDelayMock
}));

const query = '[out:json];node(1);out count;';
const overpassEndpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter'
];
const attemptsPerEndpoint = 4;

function getAttemptedEndpoints(): string[] {
    return overpassJsonMock.mock.calls.map(([, options]) => options.endpoint as string);
}

describe('overpassRawQuery', () => {
    beforeEach(() => {
        overpassJsonMock.mockReset();
        delayMock.mockClear();
        randomDelayMock.mockClear();
    });

    it('retries rate limited requests with progressive backoff', async () => {
        overpassJsonMock
            .mockRejectedValueOnce(new OverpassRateLimitError())
            .mockRejectedValueOnce(new OverpassRateLimitError())
            .mockRejectedValueOnce(new OverpassRateLimitError())
            .mockResolvedValueOnce({ elements: [{ tags: { total: '12' } }] });

        await expect(overpassRawQuery(query)).resolves.toBe(12);

        expect(overpassJsonMock).toHaveBeenCalledTimes(4);
        expect(getAttemptedEndpoints()).toEqual(
            Array.from({ length: attemptsPerEndpoint }, () => overpassEndpoints[0])
        );
        expect(randomDelayMock).toHaveBeenCalledTimes(4);
        expect(delayMock).toHaveBeenCalledTimes(3);
        expect(delayMock).toHaveBeenNthCalledWith(1, 15000);
        expect(delayMock).toHaveBeenNthCalledWith(2, 30000);
        expect(delayMock).toHaveBeenNthCalledWith(3, 60000);
    });

    it('falls back to the next endpoint after retryable server failures', async () => {
        overpassJsonMock
            .mockRejectedValueOnce(new Error('503 Service Unavailable'))
            .mockRejectedValueOnce(new Error('503 Service Unavailable'))
            .mockRejectedValueOnce(new Error('503 Service Unavailable'))
            .mockRejectedValueOnce(new Error('503 Service Unavailable'))
            .mockResolvedValueOnce({ elements: [{ tags: { total: '12' } }] });

        await expect(overpassRawQuery(query)).resolves.toBe(12);

        expect(overpassJsonMock).toHaveBeenCalledTimes(5);
        expect(getAttemptedEndpoints()).toEqual([
            overpassEndpoints[0],
            overpassEndpoints[0],
            overpassEndpoints[0],
            overpassEndpoints[0],
            overpassEndpoints[1]
        ]);
        expect(randomDelayMock).toHaveBeenCalledTimes(5);
        expect(delayMock).toHaveBeenCalledTimes(3);
    });

    it('rethrows the rate limit error after every endpoint is exhausted', async () => {
        overpassJsonMock.mockRejectedValue(new OverpassRateLimitError());

        await expect(overpassRawQuery(query)).rejects.toBeInstanceOf(OverpassRateLimitError);

        expect(overpassJsonMock).toHaveBeenCalledTimes(overpassEndpoints.length * attemptsPerEndpoint);
        expect(getAttemptedEndpoints()).toEqual([
            ...Array.from({ length: attemptsPerEndpoint }, () => overpassEndpoints[0]),
            ...Array.from({ length: attemptsPerEndpoint }, () => overpassEndpoints[1]),
            ...Array.from({ length: attemptsPerEndpoint }, () => overpassEndpoints[2])
        ]);
        expect(randomDelayMock).toHaveBeenCalledTimes(overpassEndpoints.length * attemptsPerEndpoint);
        expect(delayMock).toHaveBeenCalledTimes(overpassEndpoints.length * (attemptsPerEndpoint - 1));
    });

    it('does not retry non-rate-limit errors', async () => {
        overpassJsonMock.mockRejectedValueOnce(new Error('boom'));

        await expect(overpassRawQuery(query)).rejects.toThrow('boom');

        expect(overpassJsonMock).toHaveBeenCalledTimes(1);
        expect(getAttemptedEndpoints()).toEqual([overpassEndpoints[0]]);
        expect(delayMock).not.toHaveBeenCalled();
    });
});
