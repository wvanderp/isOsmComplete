import axios from 'axios';
import { Comparison } from '../../types';
import getHash from '../../utils/getHash';
import taginfoComparisons from '../../utils/taginfoComparisons';
import { brandWikidata } from '../../utils/osmTags';

const geldmaatApi = 'https://ii0d2f1pfc.execute-api.eu-west-1.amazonaws.com/prod/locations';
const taginfoServer = 'https://taginfo.geofabrik.de/europe/netherlands/';

export default async function geldmaat(): Promise<Comparison> {
    const { data } = await axios.get(geldmaatApi);

    const expected = data.data.length;

    return taginfoComparisons(
        'Geldmaat ATMs',
        brandWikidata,
        'Q74051230',
        expected,
        geldmaatApi,
        'Geldmaat is a provider of ATMs in the Netherlands. What is the number of Geldmaat ATMs in OSM?',
        ['💰'],
        '2023-09-07',
        taginfoServer
    );
}
