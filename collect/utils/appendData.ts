import { CountryCodes } from '../types';
import { ComparisonFunction } from '../types/ComparisonFunction';

export default function appendCountry(
    country: CountryCodes,
    comparisonFunction: ComparisonFunction | ComparisonFunction[]
): ComparisonFunction[] {
    const comparisonFunctions = Array.isArray(comparisonFunction) ? comparisonFunction : [comparisonFunction];

    return () => comparisonFunctions.map((cf) => ({
        ...(cf()),
        country
    }));
}

export function appendThanks(
    comparisonFunction: ComparisonFunction,
    thanks: string
): ComparisonFunction {
    return () => ({
        ...comparisonFunction(),
        thanks
    });
}
