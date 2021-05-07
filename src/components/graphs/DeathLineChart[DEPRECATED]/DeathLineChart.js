import { max } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";
import { XAxis } from "../XAxis/XAxis";
import { YAxis } from "../YAxis/YAxis";

const height = window.innerHeight / 2;
const margin = { top: 40, right: 40, bottom: 40, left: 100 };

export const DeathLineChart = ({data, width}) => {
    width-=100;
    const filteredData = data.filter(d => d.country_code === "AFG" && d.indicator === "cases")

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d["year_week"];
    const yValue = d => d["weekly_count"]

    const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth]);

    const yScale = scaleLinear()
        .domain([0, max(filteredData, yValue)])
        .range([innerHeight, 0])
        .nice();

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis xScale={xScale} innerHeight={innerHeight} windowWidth={width} />
                <YAxis yScale={yScale} innerWidth={innerWidth} />
                {
                        filteredData.map((d) => (
                        <rect
                            className="mark"
                            x={xScale(xValue(d))}
                            y={yScale(yValue(d))}
                            width={xScale.bandwidth()}
                            height={innerHeight - yScale(yValue(d))}
                        >
                            <title>{d.cumulative_count}</title>
                        </rect>
                    ))
                }
            </g>
        </svg>
    )
}