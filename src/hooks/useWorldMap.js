import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

/*

  Hook to get and format the topojson data used to represent a world Map into usable geojson

*/

const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useWorldMap = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(topology => {
      const { countries, land } = topology.objects;
      setData({
        countries: feature(topology, countries),
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};
