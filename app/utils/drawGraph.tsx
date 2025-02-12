/* eslint-disable unicorn/prefer-ternary */
import React from 'react';
import * as d3 from 'd3';
import { GraphData } from './downloadGraphData';

// eslint-disable-next-line import/first -- for the d3 bug

function tomorrow() {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().slice(0, 10);
}

// calculates the width of the chart
function determine_chart_width(leftMargin: number, rightMargin: number): number {
    const leftRightMargin = leftMargin + rightMargin;
    if (window.innerWidth < 1200) {
        // smaller then 1200px
        return window.innerWidth - leftRightMargin - (window.innerWidth * 0.1);
    }
    // bigger then 1200px
    return 1200 - leftRightMargin - 50;
}

function debounce(function_: () => void, wait: number) {
    let timeout: ReturnType<typeof setTimeout>;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function_, wait);
    };
}

export default function draw_chronology_chart(
    uncleanData: GraphData[],
    goal = 0
): React.ReactNode {
    const margin = { top: 10, right: 15, bottom: 60, left: 80 };

    const container = document.createElement('div');

    function renderChart() {
        container.innerHTML = ''; // Clear previous chart

        const w = determine_chart_width(margin.left, margin.right);
        const h = 400;

        uncleanData.push({ date: tomorrow(), value: d3.max(uncleanData, (d) => d.value) ?? 0 });

        const data = uncleanData.map((d) => ({
            ...d,
            date: new Date(d.date)
        }))
            .sort((a, b) => a.date.getTime() - b.date.getTime());

        const t0 = data[0].date;
        const t1 = data.at(-1)?.date ?? new Date();

        const max = Math.max(d3.max(data, (d) => d.value) ?? 0, goal) * 1.1; // Added 10% headroom

        const scale_x = d3.scaleTime()
            .domain([t0, t1])
            .range([0, w]);

        const scale_y = d3.scaleLinear()
            .domain([0, max])
            .range([h, 0]);

        const line = d3.line<{ date: Date; value: number }>()
            .curve(d3.curveBasis)
            .x((d) => scale_x(d.date))
            .y((d) => scale_y(d.value));

        const chart = d3.select(container).append('svg')
            .attr('width', w + margin.left + margin.right)
            .attr('height', h + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Add grid

        const axis_x = d3.axisBottom(scale_x)
            .tickFormat(() => '')
            .ticks(6)
            .tickSize(-h);

        chart.append('g')
            .attr('class', 'grid')
            .attr('transform', `translate(0, ${h})`)
            .call(axis_x)
            .style('color', '#e0e0e0')
            .select('.domain')
            .remove();

        const axis_y = d3.axisLeft(scale_y)
            .tickFormat(() => '')
            .ticks(6)
            .tickSize(-w);

        chart.append('g')
            .attr('class', 'grid')
            .call(axis_y)
            .style('color', '#e0e0e0')
            .select('.domain')
            .remove();

        // Add axes
        chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${h})`)
            // @ts-expect-error
            .call(d3.axisBottom(scale_x).tickFormat(d3.timeFormat('%b %Y')))
            .style('color', '#666');

        chart.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(scale_y))
            .style('color', '#666');

        // Add line
        chart.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#2563eb')
            .attr('stroke-width', 2.5)
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')
            .attr('d', line);

        if (goal !== 0) {
            chart.append('line')
                .style('stroke', '#22c55e')
                .style('stroke-width', 2)
                .style('stroke-dasharray', '5,5')
                .attr('x1', 0)
                .attr('y1', scale_y(goal))
                .attr('x2', w)
                .attr('y2', scale_y(goal));
        }
    }

    renderChart();
    const debouncedRenderChart = debounce(renderChart, 200);
    window.addEventListener('resize', debouncedRenderChart);

    // eslint-disable-next-line react/no-danger
    return <div dangerouslySetInnerHTML={{ __html: container.outerHTML }} />;
}
