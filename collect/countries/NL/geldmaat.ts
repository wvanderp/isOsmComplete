import axios from 'axios';
import { Comparison } from '../../types';
import taginfoComparisons from '../../utils/taginfoComparisons';
import { brandWikidata } from '../../utils/osmTags';
import taginfoServers from '../../utils/tagInfoServers';

const geldmaatApi = 'https://api.prod.locator-backend.geldmaat.nl/locations';
const taginfoServer = taginfoServers.NL;

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
        new Date().toISOString().split('T')[0], // Continuously updated, so we just use the current date as the last updated date
        taginfoServer
    );
}
