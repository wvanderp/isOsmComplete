import React, { useEffect } from 'react';
import styled from 'styled-components';
import showdown from 'showdown';
import { countryCodeEmoji } from 'country-code-emoji';
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { Comparison, CountryCodes } from '../collect/types';
import draw_chronology_chart from './utils/drawGraph';
import downloadGraphData from './utils/downloadGraphData';
import ProgressBar from './ProgressBar';

countries.registerLocale(english);
const markdownConverter = new showdown.Converter();

const Card = styled.div`
  background-color: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const CardBody = styled.div`
  padding: 1.25rem;
`;

const CardTitle = styled.h3`
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
`;

function countryCodeToEmoji(code: CountryCodes): string {
    if (code === 'Worldwide') return '🌎';
    return countryCodeEmoji(code);
}

function countryCodeToName(code: CountryCodes): string {
    if (code === 'Worldwide') return 'Worldwide';
    if (code === 'EU') return 'European Union';
    return countries.getName(code, 'en') ?? code;
}

export default function Country(props: { code: CountryCodes; comparisons: Comparison[] }) {
    const comparisons = props.comparisons.map((comparison) => (
        <ComparisonCard key={comparison.name} comparison={comparison} />
    ));

    return (
        <>
            <hr />
            <h1>
                {countryCodeToEmoji(props.code)} {countryCodeToName(props.code)}
            </h1>
            {comparisons}
        </>
    );
}

export function ComparisonCard(props: { comparison: Comparison }) {
    // replace the templates in the description with the actual values
    const cardDescription = props.comparison.description
        .replace('{{actual}}', props.comparison.actual.toString())
        .replace('{{expected}}', props.comparison.expected.toString());

    return (
        <Card>
            <CardBody>
                <CardTitle>{props.comparison.name}</CardTitle>
                <CardText>{cardDescription}</CardText>
                <ProgressBar value={props.comparison.actual} max={props.comparison.expected} />
                <CardText className="cardText">
                    Expected: {props.comparison.expected} <br />
                    Actual: {props.comparison.actual}
                    <br />
                    Percentage: {Math.floor((props.comparison.actual / props.comparison.expected) * 100)}%
                    <br />
                    {/* eslint-disable-next-line react/jsx-no-target-blank -- I love seeing the referrer myself so I will give it to others */}
                    <a href={props.comparison.expectedSource} target="_blank" rel="noopener">
                        Source of Expected
                    </a>
                </CardText>
                <Graph comparison={props.comparison} />
                {/* eslint-disable-next-line react/no-danger -- this is markdown */}
                <div
                    id="thanks"
                    dangerouslySetInnerHTML={{ __html: props.comparison.thanks ? markdownConverter.makeHtml(props.comparison.thanks) : '' }}
                />
            </CardBody>
        </Card>
    );
}

function Graph({ comparison }: { comparison: Comparison }) {
    const [graph, setGraph] = React.useState<React.ReactNode>(null);

    useEffect(() => {
        function handleResize() {
            downloadGraphData(comparison.id).then((data) => {
                setGraph(draw_chronology_chart(data, comparison.expected));
            });
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [comparison]);

    return <div>{graph}</div>;
}
