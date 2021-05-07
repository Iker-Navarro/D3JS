import { useState, useEffect } from 'react';
import { json } from 'd3';

/*

  Hook to fetch, format and reestructure data

*/

// from https://opendata.euskadi.eus/catalogo/-/evolucion-del-coronavirus-covid-19-en-euskadi/
const dataUrl = "https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-byage.json";

export const useLocalData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = d => {
        return d;
    };
    json(dataUrl, row).then(setData);
  }, []);
  
  return data;
};