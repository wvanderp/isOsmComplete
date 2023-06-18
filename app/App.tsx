import React from 'react';
import { Comparison, CountryCodes } from '../collect/types';
import Country, { ProgressBar } from './Country';

import data from '../data/compare.json';
import tags from '../data/tags.json';

// @ts-expect-error -- static files are not supported by typescript
import logo from '../static/logo.svg';

// eslint-disable-next-line unicorn/prevent-abbreviations
import pkg from '../package.json';

const prioritizedCountries = [
    'worldwide',
    'EU'
];

function sortCountries(a: [string, unknown], b: [string, unknown]) {
    const aIndex = prioritizedCountries.indexOf(a[0]);
    const bIndex = prioritizedCountries.indexOf(b[0]);
    if (aIndex === -1 && bIndex === -1) {
        return a[0].localeCompare(b[0]);
    }
    if (aIndex === -1) {
        return 1;
    }
    if (bIndex === -1) {
        return -1;
    }
    return aIndex - bIndex;
}

function FilterButton(
    props: {
        text: string,
        state: string[],
        setState: (state: string[]) => void,
        // eslint-disable-next-line react/require-default-props -- alt is optional and if its undefined it will be ignored
        alt?: string
    }
) {
    return (
        <button
            className="filterBtn"
            type="button"
            onClick={() => {
                if (props.state.includes(props.text)) {
                    props.setState(props.state.filter((c) => c !== props.text));
                } else {
                    props.setState([...props.state, props.text]);
                }
            }}
            style={{
                backgroundColor: props.state.includes(props.text) ? 'lightblue' : 'white'
            }}
            title={props.alt}
        >
            {props.text}
        </button>
    );
}

export default function App() {
    // set up the state for the filter buttons
    const [countryFilter, setCountryFilter] = React.useState<string[]>([]);
    const countryButtons = data
        .map((comparison) => comparison.country)
        .filter((country, index, self) => self.indexOf(country) === index)
        .map((country) => (
            <FilterButton
                key={country}
                text={country}
                state={countryFilter}
                setState={setCountryFilter}
            />
        ));

    // setup state for the tag filter buttons
    const [tagFilter, setTagFilter] = React.useState<string[]>([]);
    const tagButtons = Object.values(data)
        .flat()
        .flatMap((comparison: Comparison) => comparison.tags)
        .filter((tag, index, self) => self.indexOf(tag) === index)
        .map((tag) => {
            if (tag === undefined) {
                return null;
            }
            return (
                <FilterButton
                    key={tag}
                    text={tag}
                    state={tagFilter}
                    setState={setTagFilter}
                    // @ts-expect-error
                    alt={tags[tag]}
                />
            );
        })
        .filter((tag) => tag !== null);

    // Sort countries by prioritizedCountries and then alphabetically
    // and filter by countries and tags
    const countries = data
        .filter((comparison) => {
            const country = countryFilter.length === 0 || countryFilter.includes(comparison.country);
            const tag = tagFilter.length === 0 || comparison.tags.some((t) => tagFilter.includes(t));
            return country && tag;
        })
        // cluster comparisons by country
        .reduce<[string, Comparison[]][]>(
            (accumulator, comparison) => {
                const country = accumulator.find((c) => c[0] === comparison.country);
                if (country === undefined) {
                    accumulator.push([comparison.country, [comparison]]);
                } else {
                    country[1].push(comparison);
                }
                return accumulator;
            },
            []
        )
        .sort(sortCountries)
        .flatMap((country) => <Country key={country[0]} code={country[0] as CountryCodes} comparisons={country[1]} />);

    // calculate the total average of all countries
    const totalAverage = data
        .map((comparison) => (comparison.actual / comparison.expected) * 100)
        .reduce((a, b) => a + b, 0) / data.length;

    return (
        <>
            <div className="header">
                <img src={logo} alt="OSM Complete Logo" className="logo" />
                <h1>Is OSM Complete?</h1>
            </div>
            <p>
                This site tracks how complete OSM really is. <br />
                It compares the number of features in OSM to the number of features in the official data sources.<br />
                <br />

                You can suggest more sources over on our <a href={pkg.repository.url}>GitHub</a>. <br />
            </p>

            <div>
                <b>Global average</b><br />
                <span>OSM has {totalAverage.toFixed(2)}% of the features of the official data sources</span><br />
                <ProgressBar value={totalAverage} max={100} />
            </div>
            <br />

            <div>
                <b>Filters</b><br />
                <span>Country:</span>{countryButtons}<br />
                <span>Tag:</span>{tagButtons}<br />
            </div>
            {countries}
        </>
    );
}
