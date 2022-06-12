import React from 'react';
import { CountryCodes } from '../collect/types';
import data from '../data/compare.json';
import Country from './Country';

const prioritizedCountries = new Set([
    'worldwide',
    'EU'
]);

export default function App() {
    const countries = Object.entries(data.comparisons)
        .sort((a, b) => {
            if (prioritizedCountries.has(a[0]) && !prioritizedCountries.has(b[0])) {
                return -1;
            }
            if (prioritizedCountries.has(b[0]) && !prioritizedCountries.has(a[0])) {
                return 1;
            }
            return (a[0] === b[0] ? 1 : -1);
        })
        .map((country) => <Country key={country[0]} code={country[0] as CountryCodes} comparisons={country[1]} />);

    return (
        <>
            <h1>is osm complete?</h1>
            <p>this site tracks how complete osm really is</p>
            {countries}
        </>
    );
}
