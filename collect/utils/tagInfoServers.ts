import { CountryCodes } from '../types';

const taginfoServers = {
    DE: 'https://taginfo.geofabrik.de/europe:germany',
    EU: 'https://taginfo.geofabrik.de/europe/',
    FR: 'https://taginfo.geofabrik.de/europe:france',
    GB: 'https://taginfo.geofabrik.de/europe:united-kingdom',
    JP: 'https://taginfo.geofabrik.de/asia:japan',
    London: 'https://taginfo.geofabrik.de/europe:united-kingdom:england:greater-london',
    NL: 'https://taginfo.geofabrik.de/europe:netherlands/',
    RU: 'https://taginfo.geofabrik.de/russia',
    US: 'https://taginfo.geofabrik.de/north-america:us/',
    VN: 'https://taginfo.geofabrik.de/asia:vietnam',
    Worldwide: 'https://taginfo.geofabrik.de/'
} as { [key in CountryCodes | 'London']: string };

export default taginfoServers;
