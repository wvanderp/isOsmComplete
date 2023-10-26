import { Alpha2Code } from 'i18n-iso-countries';

export interface Comparison {
    id: string; // hash of the comparison
    name: string; // name of the comparison
    expected: number; // expected value
    actual: number; // actual value (from OSM)
    expectedSource: string; // where the expected value came from
    actualSource: string; // where the actual value came from (OSM, taginfo, etc)
    description: string; // description of the comparison
    lastUpdated: string; // when the comparison was last updated
    country?: string; // country code
    extra?: unknown; // extra data see below
    tags?: string[]; // tags to add to the comparison (in emoji)
    thanks?: string; // a message to thank the contributor
}

export type TaginfoComparison = Comparison & {
    extra: {
        type: 'taginfo';
        key: string;
        value: string;
        taginfoServer: string;
    };
}

// @ts-expect-error - this is a type assertion test
export const isTaginfoComparison = (a: unknown): a is TaginfoComparison => a.extra.type === 'taginfo';

export type CountryCodes = Alpha2Code | 'Worldwide' | 'EU';

///  taginfo

interface TagInfoData {
    'type': 'all' | 'nodes' | 'ways' | 'relations',
    'count': number,
    'count_fraction': number
}

export interface TagInfo {
    'url': `https://taginfo.openstreetmap.org/api/4/tag/stats?key=${string}&value=${string}`,
    'data_until': string,
    'total': number,
    'data': TagInfoData[]
}

// overpass count
export interface OverpassCount {
    'version': 0.6,
    'generator': 'Overpass API 0.7.60 f4c14d41',
    'osm3s': {
        'timestamp_osm_base': '2023-05-27T09:38:06Z',
        'copyright': 'The data included in this document is from www.openstreetmap.org. The data is made available under ODbL.'
    },
    'elements': [
        {
            'type': 'count',
            'id': 0,
            'tags': {
                'nodes': string,
                'ways': string,
                'relations': string,
                'total': string
            }
        }
    ]
}

// politie api

export interface PolitieApi {
    iterator: {
        last: boolean;
        offset: number;
      };
    politiebureaus: PolitiebureausEntity[];
  }
  interface PolitiebureausEntity {
    displayName?: null;
    links?: null;
    uid: string;
    url: string;
    publicatiedatum: string;
    availabletranslations?: null;
    naam: string;
    bezoekadres: BezoekadresOrPostadres;
    postadres: BezoekadresOrPostadres;
    openingstijden: string;
    telefoonnummer: string;
    faxnummer: string;
    twitterurl: string;
    facebookurl: string;
    extrainformatie: string;
    afbeelding: {
        url: string;
        alttext?: string | null;
      };
    locaties?: {
        latitude: number;
        longitude: number;
      }[];
  }
interface BezoekadresOrPostadres {
    postadres: string;
    postcode: string;
    plaats: string;
  }
