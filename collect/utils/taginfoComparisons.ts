import taginfo from '../api/taginfo';
import { Comparison } from '../types';

export default async function taginfoComparisons(
    name: string,
    key: string,
    value:string,
    expected: number,
    expectedSource: string,
    description: string,
    server = 'https://taginfo.openstreetmap.org'
): Promise<Comparison> {
    const count = await taginfo(key, value, server);

    return {
        name,
        expected,
        actual: count,
        expectedSource,
        actualSource: 'taginfo',
        description
    };
}
