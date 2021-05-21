import { extent, max } from "d3-array";
import { scaleLinear, scaleOrdinal, scaleTime } from "d3-scale";
import { curveNatural, line } from "d3-shape";
import { ColorLegend } from "../ColorLegend/ColorLegend";
import { XAxis } from "../XAxis/XAxis";
import { YAxis } from "../YAxis/YAxis";

/*

    2nd version of a multi line chart
    Works better and adds a color legend

*/

const height = window.innerHeight / 2;
const margin = { top: 20, right: 210, bottom: 40, left: 70 };
const yValue= d => d.y; 

export const MultiLineChart2 = ({data, lines, xValue, colorScheme, title, width}) => {
    width -= 100;
    
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const maximumY =  max(lines, colName => max(data, d => d[colName]));

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain([0, maximumY])
        .range([innerHeight, 0])
        .nice();

    const lineGenerator = line()
        .curve(curveNatural)
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)));

    const colorScale = scaleOrdinal()
        .domain(lines)
        .range(colorScheme)

    const ticks = lines.map(line => {
        return {
            color: colorScale(line),
            text: line
        }
    });

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis innerHeight={innerHeight} xScale={xScale}/>
                <YAxis innerWidth={innerWidth} yScale={yScale} />
                {
                    lines.map((line) => {
                        const lineData = data.map(d => {
                            return {
                                date:d.date,
                                y:d[line]
                            }
                        })
                        return(
                            <path d={lineGenerator(lineData)} fill="none" strokeWidth="1" stroke={colorScale(line)} ></path>
                        )
                    })
                }
            </g>
            <g transform={`translate(0, ${margin.top})`}>
                <ColorLegend innerWidth={width} ticks={ticks} title={title} legendWidth="200" />
            </g>
        </svg>
    ) 
}
