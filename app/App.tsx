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
        // eslint-disable-next-line react/require-default-props -- alt is optional, and if it's undefined, it will be ignored
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

    // Setup state for the tag filter buttons
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

    // each day we select one of the comparisons to show on the front page
    const today = new Date();
    const comparisonOfTheDay = data[(dayOfTheWeek(today) * dayOfTheYear(today) * dayOfTheMonth(today)) % data.length];
    const comparisonOfTheDayComponent = <ComparisonComponent comparison={comparisonOfTheDay} />;

    // calculate the total average of all countries
    const totalAverage = data
        .map((comparison) => (comparison.actual / comparison.expected) * 100)
        .reduce((a, b) => a + b, 0) / data.length;

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
                How complete is OSM, really?
                That&apos;s the question this website sets out to answer.
                We compare the number of features in OpenStreetMap to the number of features in official data sources,
                and the results are... well, let&apos;s say we&apos;re not quite there yet.<br />
            </p>
            <ProgressBar value={totalAverage} max={100} /><br />

            <p>
                <b>Global Average Completeness: {totalAverage.toFixed(2)}%</b><br /><br />
                Our analysis indicates that OpenStreetMap comprises approximately {totalAverage.toFixed(2)}%
                of the features found in official data sources worldwide.
            </p>
            <p>
                The number above is a bit misleading
                because it is an average of the percentages of each comparison.<br />

                So, sum all expected entities ({expectedEntities.toLocaleString()})
                and calculate the percentage of actual entities ({actualEntities.toLocaleString()}).<br />
                Then, we get a fairer percentage of <b>{weightedAverage.toFixed(2)}%</b>.
            </p>
            <p>
                Below, you find specific sources.
                In the graph, we have the goal in green and OpenStreetMap in blue over time.
                You can filter the data to only see your favorite country or topic.
            </p>
            <h2>How can you help...</h2>
            <p>
                ...improve the data? Well, you can help us by adding data to OpenStreetMap. <br />
                An excellent place to start is the <a href="https://learnosm.org/en/">Learn OpenStreetMap</a>. <br />
                If you need inspiration, you can check out <a href="https://maproulette.org/">Maproulette</a>, where you can find many tasks to improve OpenStreetMap.
                <br />
                <br />

                If you want to help improve this website,
                you can find the source code on <a href={pkg.repository.url}>GitHub</a>.
                We can always use help with the following:
                <ul>
                    <li>Adding new sources</li>
                    <li>Improving the website</li>
                    <li>Adding new features</li>
                </ul>
            </p>
            <br />

            <div>
                <b>Filters</b><br />
                <span>Country:</span>{countryButtons}<br />
                <span>Tag:</span>{tagButtons}<br />
            </div>

            <hr />
            <h1>📅 Comparison of the day</h1>
            {comparisonOfTheDayComponent}
            <hr />

            {countries}
        </>
    );
}
