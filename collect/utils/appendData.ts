import { Comparison, CountryCodes } from '../types';

export default function appendCountry(
    country: CountryCodes,
    comparison: Comparison[]
): Comparison[] {
    return comparison.map((c) => ({ ...c, country }));
}

export function appendThanks(
    comparison: Comparison,
    thanks: string
): Comparison {
    return {
        ...comparison,
        thanks
    };
}
