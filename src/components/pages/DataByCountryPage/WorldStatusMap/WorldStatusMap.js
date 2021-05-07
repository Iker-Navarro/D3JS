import { WorldBubbleMap } from "../../../graphs/WorldBubbleMap/WorldBubbleMap";
import { Histogram } from "../../../graphs/Histogram/Histogram";
import { sum } from "d3-array";

const margin = { top: 20, right: 20, bottom: 40, left: 70 };
const histogramSizePercent = 0.2;

export const WorldStatusMap = ({data, worldMap, width, brushExtent, setBrushExtent}) => {
    
    width-=100;
    
    // default map proportion = 960 * 500
    const height = width * 500 / 960 / 1.5;
    // the 1.5 is to scale down the map size.
    
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const mapHeight = innerHeight - histogramSizePercent * innerHeight;
    const padding = 10;
    const histogramHeight = histogramSizePercent * innerHeight;

    const xValue = d => d["date"];

    const filteredData = brushExtent ? 
        data.map(country => {
            let c = Object.create(country);
            c.amount = sum(country.data.filter(d => xValue(d) > brushExtent[0] && xValue(d) < brushExtent[1]).map(d => d.increment));
            return c;
        })
        : data;
   
    console.log(filteredData);

    return (
        <>
            <svg height={height} width={width}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <WorldBubbleMap data={filteredData} worldAtlas={worldMap} innerWidth={innerWidth} innerHeight={mapHeight}></WorldBubbleMap>
                    <g transform={`translate(0, ${mapHeight + padding})`}>
                        <Histogram data={data.total} xValue={xValue} innerWidth={innerWidth} innerHeight={histogramHeight - padding} setBrushExtent={setBrushExtent} />
                    </g>
                </g>
            </svg>
        </>
    )
}