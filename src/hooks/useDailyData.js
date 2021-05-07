import { useState, useEffect } from 'react';
import { csv, timeParse } from 'd3';

/*

  Hook to fetch, format and reestructure data

*/

// from https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
const dataUrlCases = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const dataUrlDeaths = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const dataUrlRecovered = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

const stringColumns = ["Province/State", "Country/Region"];

const dateParser = timeParse('%m/%d/%y');

export const useDailyData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {

    Promise.all([
      csv(dataUrlDeaths, row),
      csv(dataUrlCases, row),
      csv(dataUrlRecovered, row),
    ])
    .then(data => data.map(transformData))
    .then(setData);
  }, []);
  return data;
};

// Cast every numeric row to a js number
function row(d){
  for(let column in d){
    if(!stringColumns.includes(column)){
      d[column] = +d[column];
    }
  }

  return d;
};

function transformData(rawData){
  // Remove non date related columns
  const dates = rawData.columns.slice(4);
  let data = rawData.map(countryData => {
    return {
      ProvinceState: countryData["Province/State"],
      CountryRegion: countryData["Country/Region"],
      Lat: +countryData["Lat"],
      Long: +countryData["Long"],
      data: dates.map((date, i, array )=> {
        // Calculate the daily increment (the original data only contains total amounts)
        const increment = i === 0 ? countryData[date] : countryData[date] - countryData[array[i - 1]];
        return {
          date: dateParser(date),
          increment,
          amount: +countryData[date],
        }
      }),
      // Calculate country total
      //total: dates.map(date => countryData[date]).reduce((acc, curr) => acc + curr)
    }
  });
  
  // Calculate and store global statistics by date
  data.total = dates.map((date, i) => {
    return {
      date: dateParser(date),
      increment: data.map(d => d.data[i].increment).reduce((acc, curr) => acc + curr),
      amount: rawData.map(d => d[date]).reduce((acc, curr) => acc + curr)
    };
  })

  return data;
}

