import React from 'react';
import { CountryCodes } from '../collect/types';
import data from '../data/compare.json';
import Country from './Country';

export default function App() {
    const countries = Object.entries(data.comparisons)
        .map((country) => <Country key={country[0]} code={country[0] as CountryCodes} comparisons={country[1]} />);

    return (
        <>
            <p>this site tracks how complete osm really is</p>
            {countries}
        </>
    );
}
