import React, { useEffect } from 'react';
import { Card, CardBody, CardText, CardTitle, Progress } from 'reactstrap';

import { countryCodeEmoji } from 'country-code-emoji';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

import { Comparison, CountryCodes, isTaginfoComparison, TaginfoComparison } from '../collect/types';
import axios from 'axios';
import draw_chronology_chart from './utils/drawGraph';
import TaginfoChronology from '../type/taginfoChronology';

countries.registerLocale(english);

function countryCodeToEmoji(code: CountryCodes): string {
    if (code === 'worldwide') return '🌎';
    return countryCodeEmoji(code);
}

function countryCodeToName(code: CountryCodes): string {
    if (code === 'worldwide') return 'Worldwide';
    if (code === 'EU') return 'European Union';
    return countries.getName(code, 'en');
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
    const graph = isTaginfoComparison(props.comparison) ? <Graph comparison={props.comparison} /> : null;
    console.log(graph, isTaginfoComparison(props.comparison), props.comparison);
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
                <CardText>
                    Expected: {props.comparison.expected} <br />
                    Actual: {props.comparison.actual}<br />
                    Percentage: {Math.floor((props.comparison.actual / props.comparison.expected) * 100)}% <br />

                    <a href={props.comparison.expectedSource}>Source of Expected</a>
                </CardText>
                {graph}
            </CardBody>
        </Card>
    );
}

function ProgressBar(props: { value: number, max: number }) {
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

function Graph({ comparison }: { comparison: TaginfoComparison }) {
    const [graph, setGraph] = React.useState<React.ReactNode>(null);
    useEffect(() => {
        const url = `${comparison.extra.taginfoServer
            }/api/4/tag/chronology?key=${comparison.extra.key}&value=${comparison.extra.value}`;

        axios.get<TaginfoChronology>(url).then(
            (response) => {
                const { data } = response;
                if (data.total === 0) {
                    setGraph(<p>No data</p>);
                    return;
                }
                setGraph(draw_chronology_chart(data.data, 'all', comparison.expected));
            }
        );
    }, [comparison]);

    return (
        <div>
            {graph}
        </div>
    );
}
