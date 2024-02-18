import { CountryCodes } from '../types';

const taginfoServers = {
    Worldwide: 'https://taginfo.geofabrik.de/',
    DE: 'https://taginfo.geofabrik.de/europe:germany',
    EU: 'https://taginfo.geofabrik.de/europe/',
    FR: 'https://taginfo.geofabrik.de/europe:france',
    London: 'https://taginfo.geofabrik.de/europe:united-kingdom:england:greater-london',
    GB: 'https://taginfo.geofabrik.de/europe:united-kingdom',
    NL: 'https://taginfo.geofabrik.de/europe:netherlands/',
    RU: 'https://taginfo.geofabrik.de/russia',
    US: 'https://taginfo.geofabrik.de/north-america:us/',
    VN: 'https://taginfo.geofabrik.de/asia:vietnam'
} as { [key in CountryCodes | 'London']: string};

export default taginfoServers;
