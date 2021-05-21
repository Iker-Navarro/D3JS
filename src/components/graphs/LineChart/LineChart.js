import { bisector, extent, max } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { pointer, select } from "d3-selection";
import { curveNatural, line } from "d3-shape";
import { useRef } from "react";
import { XAxis } from "../XAxis/XAxis";
import { YAxis } from "../YAxis/YAxis";

/*

    Simple line-chart being x always a time axis.

    also adds logic for the overlay with a marker.

*/

const height = window.innerHeight / 2;
const margin = { top: 40, right: 40, bottom: 40, left: 100 };

export const LineChart = ({data, width, yValue}) => {
    // Reference to the marker that follows the mouse
    const markerRef = useRef();

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d["date"];

    const xScale = scaleTime()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        .nice();

    const lineGenerator = line()
        .curve(curveNatural)
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)));

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <XAxis xScale={xScale} innerHeight={innerHeight} windowWidth={width} />
                <YAxis yScale={yScale} innerWidth={innerWidth} />
                <path d={lineGenerator(data)} fill="none" strokeWidth="2.5" className="marks"/>
                <g ref={markerRef} className="marker" opacity="0">
                    <text textAnchor="middle"></text>
                    <circle r="3"></circle>
                </g>
                <rect className="overlay" width={innerWidth} height={innerHeight} opacity="0" onMouseMove={mouseMove} onMouseOut={mouseOut} onMouseOver={mouseOver}></rect>
            </g>
        </svg>
    )

    // Mouse Event listener
    function mouseMove(evt) {
        // Calculate the position intersecting the line of the mouse hovered position
        const bisect = bisector(xValue).left;
        const xPos = pointer(evt)[0];
        const x0 = bisect(data, xScale.invert(xPos))
        const d0 = data[x0];

        if(d0){
            // Move marker point
            select(markerRef.current).attr(
                'transform',
                `translate(${xScale(xValue(d0))},${yScale(yValue(d0))})`,
            )
            // Select, modify and relocate label
            .select("text")
            .attr( 
                'transform',
                `translate(0,-10)`,)
            .text(yValue(d0));
        }
    }

    // Animate marker out
    function mouseOut(evt){
        select(markerRef.current)
            .transition()
            .duration(300)
            .attr("opacity", "0");
    }

    // Animate marker in
    function mouseOver(evt){
        select(markerRef.current)
            .transition()
            .duration(300)
            .attr("opacity", "1");
    }
}   

