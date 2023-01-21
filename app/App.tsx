import React from 'react';
import { CountryCodes } from '../collect/types';
import data from '../data/compare.json';
import Country from './Country';

const prioritizedCountries = [
    'worldwide',
    'EU'
];

export default function App() {
    // Sort countries by prioritizedCountries and then alphabetically
    const countries = Object.entries(data.comparisons)
        .sort(([a], [b]) => {
            const aIndex = prioritizedCountries.indexOf(a);
            const bIndex = prioritizedCountries.indexOf(b);
            if (aIndex === -1 && bIndex === -1) {
                return a.localeCompare(b);
            }
            if (aIndex === -1) {
                return 1;
            }
            if (bIndex === -1) {
                return -1;
            }
            return aIndex - bIndex;
        })
    .map((country) => <Country key={country[0]} code={country[0] as CountryCodes} comparisons={country[1]} />);
    console.log(countries);
    return (
        <>
            <h1>Is osm complete?</h1>
            <p>This site tracks how complete osm really is.</p>
            {countries}
        </>
    );
}
