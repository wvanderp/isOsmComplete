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
        expect(randomDelayMock).toHaveBeenCalledTimes(4);
        expect(delayMock).toHaveBeenCalledTimes(3);
        expect(delayMock).toHaveBeenNthCalledWith(1, 15000);
        expect(delayMock).toHaveBeenNthCalledWith(2, 30000);
        expect(delayMock).toHaveBeenNthCalledWith(3, 60000);
    });

    it('rethrows the rate limit error after the retry budget is exhausted', async () => {
        overpassJsonMock.mockRejectedValue(new OverpassRateLimitError());

        await expect(overpassRawQuery(query)).rejects.toBeInstanceOf(OverpassRateLimitError);

        expect(overpassJsonMock).toHaveBeenCalledTimes(4);
        expect(delayMock).toHaveBeenCalledTimes(3);
    });

    it('does not retry non-rate-limit errors', async () => {
        overpassJsonMock.mockRejectedValueOnce(new Error('boom'));

        await expect(overpassRawQuery(query)).rejects.toThrow('boom');

        expect(overpassJsonMock).toHaveBeenCalledTimes(1);
        expect(delayMock).not.toHaveBeenCalled();
    });
});
