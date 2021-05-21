import { WorldBubbleMap } from "../../../graphs/WorldBubbleMap/WorldBubbleMap";
import { Histogram } from "../../../graphs/Histogram/Histogram";
import { sum } from "d3-array";
import { Loading } from "../../../layout/Loading/Loading";
import { useState } from "react";
import { DataTypeSelector } from "../../../layout/DataTypeSelector/DataTypeSelector";
import { NoOptionSelected } from "../../../layout/NoOptionSelected/NoOptionSelected";

const margin = { top: 20, right: 20, bottom: 40, left: 70 };
const histogramSizePercent = 0.2;

export const WorldStatusMap = ({data, worldMap, width}) => {
    
    width-=100;
    
    // hook responsible for detecting brushing on WorldStatusMap
    // Needs to be out here as the useState hook cant be called conditionally
    const [brushExtent, setBrushExtent] = useState(null);
    const [selectedDataType, setSelectedDataType] = useState(null);

    if(!worldMap || !data)
        return(<Loading />);

    const [deaths, cases, recovered] = data;
    const types = [
        {
            type: deaths,
            text: "Deceased data"
        },   
        {
            type: cases,
            text: "Cases data"
        },
        {
            type: recovered,
            text: "Recovered data"
        }
    ]

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
    selectedDataType.map(country => {
        let c = Object.create(country);
        c.amount = sum(country.data.filter(d => xValue(d) > brushExtent[0] && xValue(d) < brushExtent[1]).map(d => d.increment));
        return c;
    })
    : selectedDataType;
    return (
        <>
            <DataTypeSelector types={types} setType={setSelectedDataType} selected={selectedDataType} />
            {
                !selectedDataType ? <NoOptionSelected/> :
                <svg height={height} width={width}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <WorldBubbleMap data={filteredData} worldAtlas={worldMap} innerWidth={innerWidth} innerHeight={mapHeight}></WorldBubbleMap>
                    <g transform={`translate(0, ${mapHeight + padding})`}>
                        <Histogram data={selectedDataType.total} xValue={xValue} innerWidth={innerWidth} innerHeight={histogramHeight - padding} setBrushExtent={setBrushExtent} />
                    </g>
                </g>
            </svg>
            }
            
        </>
    )
}