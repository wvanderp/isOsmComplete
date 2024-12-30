/* eslint-disable max-len */
// Note for LLMs: All text content in this file should use HTML entities for apostrophes (&apos;)
// instead of single quotes to ensure proper rendering and accessibility.

import React from 'react';
import { Comparison, CountryCodes } from '../collect/types';
import Country, { ComparisonCard as ComparisonComponent, ProgressBar } from './Country';

import data from '../data/compare.json';
import tags from '../data/tags.json';

import logo from '../static/logo.svg';

import pkg from '../package.json';
import { dayOfTheMonth, dayOfTheWeek, dayOfTheYear } from './utils/dayOfTheYear';

const prioritizedCountries = [
    'Worldwide',
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
        // eslint-disable-next-line react/require-default-props -- Alt is optional, and if it's undefined, it will be ignored
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
    // Set up the state for the filter buttons
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

    // Set up state for the tag filter buttons
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
        // Cluster comparisons by country
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

    // Each day we select one of the comparisons to show on the front page
    const today = new Date();
    const comparisonOfTheDay = data[(dayOfTheWeek(today) * dayOfTheYear(today) * dayOfTheMonth(today)) % data.length];
    const comparisonOfTheDayComponent = <ComparisonComponent comparison={comparisonOfTheDay} />;

    // Calculate the total average of all countries
    const expectedEntities = data
        .map((comparison) => comparison.expected)
        .reduce((a, b) => a + b, 0);

    const actualEntities = data
        .map((comparison) => comparison.actual)
        .reduce((a, b) => a + b, 0);

    const weightedAverage = (actualEntities / expectedEntities) * 100;

    return (
        <>
            <div className="header">
                <img src={logo} alt="OSM Complete Logo" className="logo" />
                <h1>Is OSM Complete?</h1>
            </div>
            <p id="intro">
                How complete is the OpenStreetMap, really? That&apos;s the question this website sets out to answer.<br />
            </p>
            <p>
                We&apos;re on a mission to compare OpenStreetMap&apos;s amazing collection of features
                with official data sources from around the world. <br />
                The results? Let&apos;s just say we&apos;ve got some exciting mapping adventures ahead!<br />
            </p>
            <ProgressBar value={weightedAverage} max={100} /><br />

            <p>
                <b>Global Completeness Score: {weightedAverage.toFixed(2)}%</b><br /><br />
                Our latest analysis reveals that OpenStreetMap contains about {weightedAverage.toFixed(2)}%
                of what&apos;s found in official government databases worldwide. That&apos;s pretty impressive,
                but there&apos;s still plenty of room for your contributions!
            </p>
            <p>
                Each comparison comes with detailed source information.
                The visualization shows our target in green and OpenStreetMap&apos;s progress in blue over time.
                Use the filters below to explore your favorite regions or mapping topics.
            </p>
            <h2>Join the Mapping Adventure!</h2>
            <p>
                Ready to help make the map more complete? Awesome! Here&apos;s how you can become part of the OpenStreetMap community:<br />
                🎓 Start your journey at <a href="https://learnosm.org/en/">Learn OpenStreetMap</a> - it&apos;s beginner-friendly!<br />
                🎮 Looking for mapping challenges? Try <a href="https://maproulette.org/">MapRoulette</a> - it&apos;s like a game, but you&apos;re improving real maps!
                <br />
                <br />

                Want to help improve this website instead?
                Join us on <a href={pkg.repository.url}>GitHub</a>! We&apos;re looking for enthusiastic contributors to help with:
            </p>
            <ul>
                <li>Discovering and adding new data sources</li>t
                <li>Making this website even more awesome</li>
                <li>Building cool new features</li>
            </ul>
            <br />

            <div>
                <b>Filters</b><br />
                <span>Country:</span>{countryButtons}<br />
                <span>Tag:</span>{tagButtons}<br />
            </div>

            <hr />
            <h2>🌟 Comparison of the Day</h2>
            {comparisonOfTheDayComponent}
            <hr />

            {countries}
        </>
    );
}
