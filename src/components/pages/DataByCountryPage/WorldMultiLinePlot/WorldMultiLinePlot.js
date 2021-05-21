import { useState } from "react";
import { MultiLineChart } from "../../../graphs/MultiLineChart/MultiLineChart";
import { DataTypeSelector } from "../../../layout/DataTypeSelector/DataTypeSelector";
import { Loading } from "../../../layout/Loading/Loading";
import { NoOptionSelected } from "../../../layout/NoOptionSelected/NoOptionSelected";

/*
    Unfinished world multilinechart component
*/

const height = window.innerHeight / 2;
const margin = { top: 20, right: 20, bottom: 40, left: 70 };

export const WorldMultiLinePlot = ({data, width}) => {
    width -= 100;
    
    // data type selection
    const [selectedDataType, setSelectedDataType] = useState(null);

    if(!data){
        return(<Loading />);
    }
        
    // Data destructuring
    const [deaths, cases, recovered] = data;
    
    // menu type config
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

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const yValue = d => d.amount;
    
    return (
        <>
            <DataTypeSelector types={types} setType={setSelectedDataType} selected={selectedDataType} />
            {
                !selectedDataType ? <NoOptionSelected/> :
                <svg width={width} height={height}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        {}
                        <MultiLineChart data={selectedDataType} yValue={yValue} width={innerWidth} height={innerHeight} />
                    </g>
                </svg>
            }           
           
        </>
        
    )
}