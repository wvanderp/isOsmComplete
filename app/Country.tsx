import React, { useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Progress } from 'reactstrap';

import { countryCodeEmoji } from 'country-code-emoji';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

import { Comparison, CountryCodes } from '../collect/types';
import draw_chronology_chart from './utils/drawGraph';
import downloadGraphData from './utils/downloadGraphData';

countries.registerLocale(english);

function countryCodeToEmoji(code: CountryCodes): string {
    if (code === 'Worldwide') return '🌎';
    if (code === 'London') return '🇬🇧🎡💂🏼‍♂️';
    return countryCodeEmoji(code);
}

function countryCodeToName(code: CountryCodes): string {
    if (code === 'Worldwide') return 'Worldwide';
    if (code === 'EU') return 'European Union';
    if (code === 'London') return 'London';
    return countries.getName(code, 'en') ?? code;
}

export default function Country(props: {
    code: CountryCodes
    comparisons: Comparison[];
}) {
    const comparisons = props.comparisons.map(
        (comparison) => <Comparison key={comparison.name} comparison={comparison} />
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

function Comparison(props: {
    comparison: Comparison;
}) {
    return (
        <Card color="light">

            <CardBody>
                <CardTitle tag="h3">
                    {props.comparison.name}
                </CardTitle>
                <CardText>
                    {props.comparison.description}
                </CardText>
                <ProgressBar
                    value={props.comparison.actual}
                    max={props.comparison.expected}
                />
                <CardText className="cardText">
                    Expected: {props.comparison.expected} <br />
                    Actual: {props.comparison.actual}<br />
                    Percentage: {Math.floor((props.comparison.actual / props.comparison.expected) * 100)}% <br />

                    <a href={props.comparison.expectedSource}>Source of Expected</a>
                </CardText>
                <Graph comparison={props.comparison} />
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
    }, [comparison, window.innerWidth]);

    return (
        <div>
            {graph}
        </div>
    );
}
