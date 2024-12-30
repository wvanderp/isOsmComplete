import React, { useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Progress } from 'reactstrap';

import showdown from 'showdown';

import { countryCodeEmoji } from 'country-code-emoji';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

import { Comparison, CountryCodes } from '../collect/types';
import draw_chronology_chart from './utils/drawGraph';
import downloadGraphData from './utils/downloadGraphData';

countries.registerLocale(english);
const markdownConverter = new showdown.Converter();

function countryCodeToEmoji(code: CountryCodes): string {
    if (code === 'Worldwide') return '🌎';
    return countryCodeEmoji(code);
}

function countryCodeToName(code: CountryCodes): string {
    if (code === 'Worldwide') return 'Worldwide';
    if (code === 'EU') return 'European Union';
    return countries.getName(code, 'en') ?? code;
}

export default function Country(props: {
    code: CountryCodes
    comparisons: Comparison[];
}) {
    const comparisons = props.comparisons.map(
        (comparison) => <ComparisonCard key={comparison.name} comparison={comparison} />
    );

    return (
        <>
            <hr />
            <h1>
                {countryCodeToEmoji(props.code)}
                {' '}
                {countryCodeToName(props.code)}
            </h1>
            {comparisons}
        </>
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
        <Card color="light">

            <CardBody>
                <CardTitle tag="h3">
                    {props.comparison.name}
                </CardTitle>
                <CardText>
                    {cardDescription}
                </CardText>
                <ProgressBar
                    value={props.comparison.actual}
                    max={props.comparison.expected}
                />
                <CardText className="cardText">
                    Expected: {props.comparison.expected} <br />
                    Actual: {props.comparison.actual}<br />
                    Percentage: {Math.floor((props.comparison.actual / props.comparison.expected) * 100)}% <br />

                    { /* eslint-disable-next-line react/jsx-no-target-blank -- I love seeing the referrer myself so I will give it to others */}
                    <a href={props.comparison.expectedSource} target="_blank" rel="noopener">Source of Expected</a>
                </CardText>
                <Graph comparison={props.comparison} />
                {/* eslint-disable-next-line react/no-danger -- this is markdown */ }
                <div id="thanks" dangerouslySetInnerHTML={{__html: props.comparison.thanks ? markdownConverter.makeHtml(props.comparison.thanks) : ''}} />
            </CardBody>
        </Card>
    );
}

export function ProgressBar(props: { value: number, max: number }) {
    if (props.value > props.max) {
        return (
            <Progress multi>
                <Progress
                    bar
                    color="success"
                    max={props.max}
                    value={props.max}
                />
                <Progress
                    bar
                    color="warning"
                    max={props.value + props.max}
                    value={props.value - props.max}
                >
                    {props.value - props.max}
                </Progress>
            </Progress>
        );
    }

    return (
        <Progress
            color="success"
            value={props.value}
            max={props.max}
        />
    );
}

function Graph({ comparison }: { comparison: Comparison }) {
    const [graph, setGraph] = React.useState<React.ReactNode>(null);
    useEffect(() => {
        downloadGraphData(comparison.id).then(
            (data) => {
                setGraph(draw_chronology_chart(data, comparison.expected));
            }
        );
    // window.innerWidth should be added properly through a window resize listener
    // or removed from the dependency array if not needed
    }, [comparison, window.innerWidth]);

    return (
        <div>
            {graph}
        </div>
    );
}
