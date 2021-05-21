import { useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChoroplethMap } from "../../../graphs/ChoroplethMap/ChoroplethMap";
import { DataTypeSelector } from "../../../layout/DataTypeSelector/DataTypeSelector";
import { Loading } from "../../../layout/Loading/Loading";
import { NoOptionSelected } from "../../../layout/NoOptionSelected/NoOptionSelected";

/*
    World choropleth map container, with datepicker to filter the shown data
*/

const margin = { top: 20, right: 20, bottom: 40, left: 70 };

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const WorldChoroplethMap = ({data, worldAtlas, width}) => {
    width-=100;
    
    // data type selection
    const [selectedDataType, setSelectedDataType] = useState(null);

    // usememo for intesive function execution
    const accumData = useMemo(() => {
        return calculateAccumulatedData(data)
    }, [data]);

    // date selection, by default, yesterday
    const [selectedDate, setSelectedDate] = useState(yesterday)

    if(!worldAtlas || !data){
        return(<Loading />);
    }

    // Data destructuring
    const [deaths, cases, recovered] = accumData;

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

    // default map proportion = 960 * 500
    const height = width * 500 / 960 / 1.5;
    // the 1.5 is to scale down the map size.

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    return(
        <>  
            <DataTypeSelector types={types} setType={setSelectedDataType} selected={selectedDataType} />
            {
                !selectedDataType ? <NoOptionSelected/> :
                <svg height={height} width={width}>
                    <g transform={`translate(${margin.left}, ${margin.top})`}>
                        <ChoroplethMap data={selectedDataType} date={selectedDate} worldAtlas={worldAtlas} innerHeight={innerHeight} innerWidth={innerWidth} />
                    </g>
                </svg>
                
            }
            <div className="w-100 text-center">
                <ReactDatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
            </div>
        </>
    )
}

// Function to get accumulated data from countries such china or the us, where there are multiple lines foreach country
function calculateAccumulatedData(allData){
    if(allData){
        return allData.map(data =>{
            let accumulatedData = data.filter(countryData => !countryData.ProvinceState);
            const composedData = data.filter(countryData => countryData.ProvinceState);
            const uniqueCountries = new Set(composedData.map(region => region.CountryRegion));
            uniqueCountries.forEach(country => {
                const sameCountry = composedData.filter(region => region.CountryRegion === country);
                let countryTotals = [...sameCountry[0].data];
                for(let i = 1; i < sameCountry.length; i++){
                    sameCountry[i].data.forEach((el, j)=>{
                        countryTotals[j].increment += el.increment;
                        countryTotals[j].amount += el.amount;
                    })
                }
        
                accumulatedData.push({
                    CountryRegion: country,
                    code: sameCountry[0].code,
                    data: countryTotals
                })
            })

            return accumulatedData;
        })
    }
}