import { Alpha2Code } from 'i18n-iso-countries';

export interface Comparison {
    name: string;
    expected: number;
    actual: number;
    expectedSource: string;
    actualSource: string;
    description: string;
}

export type CountryCodes = Alpha2Code | 'worldwide' | 'EU'

export interface ComparisonData {
    comparisons: Partial<Record<CountryCodes, Comparison[]>>;
}

///  taginfo

interface TagInfoData {
 'type':'all' |'nodes' | 'ways' | 'relations',
  'count': number,
   'count_fraction': number
}

export interface TagInfo {
    'url':`https://taginfo.openstreetmap.org/api/4/tag/stats?key=${string}&value=${string}`,
    'data_until': string,
    'total': number,
    'data':TagInfoData[]
}
