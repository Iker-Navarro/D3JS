import { max } from "d3-array";
import { scaleBand, scaleLinear } from "d3-scale";
import { ColorLegend } from "../ColorLegend/ColorLegend";
import { XAxis } from "../XAxis/XAxis";
import { YAxis } from "../YAxis/YAxis";

/*

Simple barchart with integrated color legend

*/

const legendWidth=125;

const internalPadding = 8;
const margin = { top: 20, right: 20, bottom: 50, left: 60 };

const height = window.innerHeight / 2;

export const BarChart = ({data, xValue, yValue, lValue, rValue, width, rCol, lCol, lColLabel, rColLabel, title}) => {
    width -= 100;

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
  
    const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        .nice();
  
    const xScale = scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
        .padding(0.1);

    // Information for the legend
    const ticks = [
        {
            color: "#137b80",
            text: "Total"
        },
        {
            color: lCol,
            text: lColLabel
        },
        {
            color: rCol,
            text: rColLabel 
        }
    ]
    
    return(
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis innerHeight={innerHeight} xScale={xScale}/>
                <YAxis innerWidth={innerWidth} yScale={yScale} />
                {
                    data.map(d => (
                    <>
                        <rect
                            className="mark"
                            x={xScale(xValue(d))}
                            y={yScale(yValue(d))}
                            width={xScale.bandwidth()}
                            height={innerHeight - yScale(yValue(d))}
                        >
                            <title>{d.y}</title>
                        </rect>
                         <rect
                            x={xScale(xValue(d)) + internalPadding}
                            y={yScale(lValue(d))}
                            width={xScale.bandwidth() / 2 - 1.5 * internalPadding}
                            height={innerHeight - yScale(lValue(d))}
                            fill={lCol}
                        >   
                            <title>{d.y}</title>
                        </rect>
                        <rect
                            x={xScale(xValue(d)) + xScale.bandwidth() / 2 + internalPadding / 2}
                            y={yScale(rValue(d))}
                            width={xScale.bandwidth() / 2 - internalPadding * 1.5}
                            height={innerHeight - yScale(rValue(d))}
                            fill={rCol}
                        >
                            <title>{d.y}</title>
                        </rect>
                    </>
                    ))
                }
                <ColorLegend innerWidth={innerWidth} legendWidth={legendWidth} title={title} ticks={ticks} />
            </g>
        </svg>
    );
}