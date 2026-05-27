import React, { useEffect, useState } from 'react';
import { Converter } from 'showdown';

import { countryCodeEmoji } from 'country-code-emoji';
import { getName, registerLocale } from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

import { Comparison, CountryCodes } from '../collect/types';
import draw_chronology_chart from './utils/drawGraph';
import downloadGraphData from './utils/downloadGraphData';

registerLocale(english);
const markdownConverter = new Converter();

function countryCodeToEmoji(code: CountryCodes): string {
    if (code === 'Worldwide') return '🌎';
    return countryCodeEmoji(code);
}

function countryCodeToName(code: CountryCodes): string {
    if (code === 'Worldwide') return 'Worldwide';
    if (code === 'EU') return 'European Union';
    return getName(code, 'en') ?? code;
}

export default function Country(props: {
    code: CountryCodes
    comparisons: Comparison[];
}) {
    const comparisons = props.comparisons.map(
        (comparison) => <ComparisonCard key={comparison.name} comparison={comparison} />
    );

    return (
        <section className="countrySection">
            <header className="countryHeader">
                <h2 className="countryTitle">
                    {countryCodeToEmoji(props.code)}
                    {' '}
                    {countryCodeToName(props.code)}
                </h2>
            </header>
            {comparisons}
        </section>
    );
}

export function ComparisonCard(props: {
    comparison: Comparison;
}) {
    // replace the templates in the description with the actual values
    const cardDescription = props.comparison.description
        .replace('{{actual}}', props.comparison.actual.toString())
        .replace('{{expected}}', props.comparison.expected.toString());

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">
                    {props.comparison.name}
                </h3>
                <p>
                    {cardDescription}
                </p>
                <ProgressBar
                    value={props.comparison.actual}
                    max={props.comparison.expected}
                />
                <p className="cardText">
                    Expected: {props.comparison.expected} <br />
                    Actual: {props.comparison.actual}<br />
                    Percentage: {Math.floor((props.comparison.actual / props.comparison.expected) * 100)}% <br />
                    {/* I love seeing the referers in my analytics, so I will give it to others too */}
                    <a href={props.comparison.expectedSource} target="_blank" rel="noopener">Source of Expected</a>
                </p>
                <Graph comparison={props.comparison} />
                {/* eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml -- trusted markdown content from repository */}
                <div id="thanks" dangerouslySetInnerHTML={{ __html: props.comparison.thanks ? markdownConverter.makeHtml(props.comparison.thanks) : '' }} />
            </div>
        </div>
    );
}

export function ProgressBar(props: { value: number, max: number }) {
    const max = props.max > 0 ? props.max : 1;

    if (props.value > props.max) {
        const total = props.value + max;
        const baseWidth = `${(max / total) * 100}%`;
        const overflowWidth = `${((props.value - max) / total) * 100}%`;

        return (
            <div className="mt-2 flex h-5 w-full overflow-hidden rounded bg-neutral-200 text-xs font-semibold text-white" role="progressbar" aria-valuemin={0} aria-valuenow={props.value} aria-valuemax={props.value + max}>
                <div className="bg-green-600" style={{ width: baseWidth }} />
                <div className="flex items-center justify-center bg-yellow-500" style={{ width: overflowWidth }}>
                    {props.value - props.max}
                </div>
            </div>
        );
    }

    const width = `${Math.min((props.value / max) * 100, 100)}%`;

    return (
        <div className="mt-2 h-4 w-full overflow-hidden rounded bg-neutral-200" role="progressbar" aria-valuemin={0} aria-valuenow={props.value} aria-valuemax={props.max}>
            <div className="h-full bg-green-600" style={{ width }} />
        </div>
    );
}

function Graph({ comparison }: { comparison: Comparison }) {
    const [graph, setGraph] = useState<React.ReactNode>(null);

    useEffect(() => {
        function handleResize() {
            downloadGraphData(comparison.id).then(
                (data) => {
                    setGraph(draw_chronology_chart(data, comparison.expected));
                }
            );
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [comparison]);

    return (
        <div className="graphWrapper">
            {graph}
        </div>
    );
}
