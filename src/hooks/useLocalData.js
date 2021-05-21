import { useState, useEffect } from 'react';
import { json } from 'd3';

/*

  Hook to fetch, format and reestructure data

*/

// from https://opendata.euskadi.eus/catalogo/-/evolucion-del-coronavirus-covid-19-en-euskadi/
const dataByAgeUrl = "https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-byage.json";
const dataByDateAge = "https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-pcr-positives.json";
const dataByMun = "https://opendata.euskadi.eus/contenidos/ds_informes_estudios/covid_19_2020/opendata/generated/covid19-pcr.json";

export const useLocalData = () => {
  const [data, setData] = useState(null);
  useEffect( () => {
    Promise.all([
      json(dataByAgeUrl),
      json(dataByDateAge),
      json(dataByMun),
    ]).then(([age, date, mun]) => {
      setData({
        byAgeRange: age.byAgeRange,
        totals: age.totals,
        byDateAge: date.byDate.map(d => {
          d.date = new Date(d.date);
          return d;
        }),
        byMun: mun.byDate.map(d => {
          d.date = new Date(d.date);
          return d;
        })
      })
    })
  }, []);
  
  return data;
};