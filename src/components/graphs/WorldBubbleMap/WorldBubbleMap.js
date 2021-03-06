import { max } from 'd3-array';
import { format } from 'd3-format';
import { geoGraticule, geoNaturalEarth1, geoPath } from 'd3-geo';
import { scaleSqrt } from 'd3-scale';
import { useMemo } from 'react';

/*

  Component to display a heat-map

*/

const thousandsFormatter = format(",");

const sizeValue = d => d.amount;
const maxRadius = 20;

export const WorldBubbleMap = ({ data, worldAtlas: { land, interiors }, innerWidth, innerHeight}) => {
  // map configurations
  const projection = geoNaturalEarth1().fitSize([innerWidth, innerHeight], land);
  const graticule = geoGraticule();
  const path = geoPath(projection);

  // if the maximum happens to be 0 nothing will be rendered
  const maximum = max(data, sizeValue);

  const sizeScale = scaleSqrt()
    .domain([0, maximum])
    .range([0, maxRadius]);

  return (
    <g className="worldMap">
      {
        useMemo(
          () => (
            <>
              <path className="sphere" d={path({ type: 'Sphere' })} />
              <path className="graticules" d={path(graticule())} />
              {
                land.features.map(feature => (
                  <path key={feature.id} className="land" d={path(feature)} />
                ))
              }
              <path className="interiors" d={path(interiors)} />
            </>
          ), [path, graticule, land, interiors]
        )
      }
      
      {
        maximum !== 0 ? data.map(d => {
          const [x, y] = projection([d.Long, d.Lat]);
          return (
            <circle key={Math.random()} className="circle" cx={x} cy={y} r={sizeScale(sizeValue(d))}>
              <title>{d.CountryRegion}:{thousandsFormatter(sizeValue(d))}</title>
            </circle>
          );
        }) : null
      }
    </g>
  )
}
  
