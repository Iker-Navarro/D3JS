import { extent, max } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { curveNatural, line } from "d3-shape";
import { XAxis } from "../XAxis/XAxis";
import { YAxis } from "../YAxis/YAxis";

/*

    Unfinished multi line chart

    too bloated, needs many changes

*/

export const MultiLineChart = ({data, yValue, width, height}) => {
    const xValue = d => d.date;

    const maximumY =  max(data, country => max(country.data, d => yValue(d)));
    const dates = data[0].data;

    const xScale = scaleTime()
        .domain(extent(dates, xValue))
        .range([0, width])
        .nice();

    const yScale = scaleLinear()
        .domain([0, maximumY])
        .range([height, 0])
        .nice();

    const lineGenerator = line()
        .curve(curveNatural)
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)));

    return (
        <>
            <XAxis xScale={xScale} innerHeight={height} windowWidth={width} />
            <YAxis yScale={yScale} innerWidth={width} />
            {
                data.map(country => <path key={Math.random()} d={lineGenerator(country.data)} fill="none" strokeWidth="5" className="marks"><title>{country.CountryRegion}</title></path> )
            }
        </>
    ) 
}
