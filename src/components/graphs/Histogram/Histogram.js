import { bin, extent, max, sum } from "d3-array"
import { brushX } from "d3-brush";
import { scaleLinear, scaleTime } from "d3-scale"
import { select } from "d3-selection";
import { timeWeeks } from "d3-time";
import { useEffect, useRef } from "react";
import { XAxis } from "../XAxis/XAxis";
import { YAxis } from "../YAxis/YAxis";

/*

    Component to display a histogram by binning the daily data

    It also adds the brushing component and its event listener.

*/

const yValue = d => d["increment"];

export const Histogram = ({data, xValue, innerWidth, innerHeight, setBrushExtent}) => {
    
    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    
    // Accumulate daily data with weekly bins
    // y = bin total
    // x1 and x2 are the limit dates of the bin 
    const binnedData = bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeWeeks(...xScale.domain()))(data)
        .map(array => {
            return {
                y: sum(array, yValue),
                x0: array.x0,
                x1: array.x1
            }
        })

    const yScale = scaleLinear()
        .domain([0, max(binnedData, d => d.y)])
        .range([innerHeight, 0])
        .nice();

    // Reference to the group element that will be the brush
    const brushRef = useRef();

    useEffect(() => {
        // Set brush total extent
        const brush = brushX()
            .extent([[0,0], [innerWidth, innerHeight]]);
        
        brush(select(brushRef.current));

        // Event listener for the brushihng action
        brush.on("end", (event) => {
            setBrushExtent(event.selection ? event.selection.map(xScale.invert) : null);
        })
    }, [innerHeight, innerWidth, setBrushExtent, xScale])

    return(
        <g>
            <XAxis xScale={xScale} innerHeight={innerHeight} windowWidth={innerWidth} />
            <YAxis yScale={yScale} innerWidth={innerWidth} />
            {
                binnedData.map(d => (
                    <rect
                        key={Math.random()}
                        className="mark"
                        x={xScale(d.x0)}
                        y={yScale(d.y)}
                        width={xScale(d.x1) - xScale(d.x0)}
                        height={innerHeight - yScale(d.y)}
                    >
                        <title>{d.y}</title>
                    </rect>
                ))
            }
            <g ref={brushRef} />
        </g>
    )
}