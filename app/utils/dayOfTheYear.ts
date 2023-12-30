export function dayOfTheYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = (date.getTime() - start.getTime()) + (
        (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

export function dayOfTheWeek(date: Date): number {
    return date.getDay();
}

export function dayOfTheMonth(date: Date): number {
    return date.getDate();
}
