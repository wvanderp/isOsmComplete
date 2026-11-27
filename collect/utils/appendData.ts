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

/**
 * Wraps a comparison function and adds a thank-you message to each resulting comparison.
 *
 * Thank the person who suggested the comparison or provided its data, rather than
 * automatically crediting the data publisher.
 *
 * Message rules:
 * - Use the contributor's native language for the thanks and English for the explanation.
 * - Write a single sentence that links to the contributor and clearly states their contribution.
 * - Give every message distinct wording.
 * - When a contributor has contributed multiple times, acknowledge their repeated
 *   contributions through the sentence's grammar, such as "Merci encore" or "Grazie ancora".
 * - Find and verify the original suggestion, then link to its issue, pull request,
 *   or specific comment in a code comment immediately above the thank-you sentence.
 *
 * @param comparisonFunction Function producing the comparison(s) to thank someone for.
 * @param thanks Thank-you sentence following the rules above.
 * @returns A function that adds the message to each comparison it produces.
 */
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
