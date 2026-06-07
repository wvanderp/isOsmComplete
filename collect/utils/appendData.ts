import { Comparison, CountryCodes } from '../types';
import { ComparisonFunction, ComparisonResult } from '../types/ComparisonFunction';

function mapComparisonResult(
    comparisonResult: ComparisonResult,
    mapper: (comparison: Comparison) => Comparison
): ComparisonResult {
    return Array.isArray(comparisonResult)
        ? comparisonResult.map((comparison) => mapper(comparison))
        : mapper(comparisonResult);
}

export default function appendCountry(
    country: CountryCodes,
    comparisonFunction: ComparisonFunction | ComparisonFunction[]
): ComparisonFunction[] {
    const comparisonFunctions = Array.isArray(comparisonFunction) ? comparisonFunction : [comparisonFunction];

    return comparisonFunctions.map((comparisonFunction) => async () => mapComparisonResult(
        await comparisonFunction(),
        (comparison) => ({
            ...comparison,
            country
        })
    ));
}

export function appendThanks(
    comparisonFunction: ComparisonFunction,
    thanks: string
): ComparisonFunction {
    return async () => mapComparisonResult(
        await comparisonFunction(),
        (comparison) => ({
            ...comparison,
            thanks
        })
    );
}
