import { randomInt } from 'node:crypto';

/**
 * Delay helper for retry backoff
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}

export function randomDelay(min: number, max: number) {
    const ms = randomInt(Math.ceil(min), Math.floor(max) + 1);
    return delay(ms);
}
