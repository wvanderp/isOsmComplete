import axios from 'axios';
import { Comparison } from '../../../types';
import getHash from '../../../utils/getHash';
import { AllThePlacesStats } from './AllThePlacesType';
import { AllThePlacesRunHistory } from './AllThePlacesHistoryType';

const allThePlacesRunHistoryUrl = 'https://alltheplaces-data.openaddresses.io/runs/history.json';

export default async function allThePlaces(): Promise<Comparison> {
    const { data: runs } = await axios.get<AllThePlacesRunHistory[]>(allThePlacesRunHistoryUrl);

    const latestRun = runs.at(-1);

    if (!latestRun) {
        throw new Error('No runs found');
    }

    if (!latestRun.insights_url) {
        throw new Error('No insights URL found');
    }

    const allThePlacesData = await axios.get<AllThePlacesStats>(latestRun.insights_url);

    const data = allThePlacesData.data.data.reduce((accumulator, current) => {
        if (current.atp_count) {
            accumulator.atp_count += current.atp_count;
        }
        if (current.osm_count) {
            accumulator.osm_count += current.osm_count;
        }
        return accumulator;
    }, {
        atp_count: 0,
        osm_count: 0
    });

    return {
        id: getHash(allThePlacesRunHistoryUrl),
        name: 'All The Places',
        expected: data.atp_count,
        actual: data.osm_count,
        expectedSource: 'https://www.alltheplaces.xyz/',
        actualSource: 'https://www.alltheplaces.xyz/',
        tags: [],
        description: `
            All The Places is a project to collect and maintain a database of all the places in the world
            by scraping the websites of businesses, government agencies, or other open data sources.
            We can use this to find out what the better way to map is: scraping websites or using local knowledge.
        `,
        lastUpdated: '2025-01-05',
        country: 'Worldwide'
    };
}
