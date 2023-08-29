import { Comparison } from '../../../types';
import museum from './queries/museums';

export default async function wikidata(): Promise<Comparison[]> {
    return [
        ...(await museum())
    ];
}
