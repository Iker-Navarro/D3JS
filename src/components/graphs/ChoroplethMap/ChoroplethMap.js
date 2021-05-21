import { max } from "d3-array";
import { geoGraticule, geoNaturalEarth1, geoPath } from "d3-geo";
import { scaleSequential } from "d3-scale";
import { interpolateYlOrBr } from "d3-scale-chromatic";

/*

    choropleth map.
    is missing a color legend.

*/

const noDataColor = "black";

export const ChoroplethMap = ({ data, worldAtlas: { countries }, date, innerWidth, innerHeight}) => {
    // Map configurations
    const projection = geoNaturalEarth1().fitSize([innerWidth, innerHeight], countries);
    const path = geoPath(projection);
    const graticule = geoGraticule();

    // colorValue is dependant on date
    const colorValue = d => {
        const found = d.data.find(countrydata => datesAreOnSameDay(date, countrydata.date));
        return found ? found.increment : null;
    };
    const colorScale = scaleSequential(interpolateYlOrBr)
        .domain([0, max(data, colorValue)]);
    
    return (
        <>
            <g className="choroplethMap">
                <path className="sphere" d={path({ type: 'Sphere' })} />
                <path className="graticules" d={path(graticule())} />
                {   
                    countries.features.map(feature => {
                        const value = data.find(country => country.code === feature.id);
                        return <path key={feature.id} fill={ value ? colorScale(colorValue(value)) : noDataColor} d={path(feature)}>
                            <title>{value ? colorValue(value) : "No data found!"}</title>
                        </path>
                    })
                }
            </g>
        </>
    )
}

const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();