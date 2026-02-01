/**
 * Delay helper for retry backoff
 */
export function delay(ms: number): Promise<void> {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}

export function randomDelay(min: number, max: number) {
    const ms = Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));
    return delay(ms);
}
