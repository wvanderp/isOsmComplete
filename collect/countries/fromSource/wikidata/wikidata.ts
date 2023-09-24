import { Comparison } from '../../../types';
import museum from './queries/museums';
import sculptures from './queries/sculptures';

export default async function wikidata(): Promise<Comparison[]> {
    return [
        ...(await museum()),
        ...(await sculptures())
    ];
}
