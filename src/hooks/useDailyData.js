import { useState, useEffect } from 'react';
import { csv, json, timeParse } from 'd3';

/*

  Hook to fetch, format and reestructure data

*/

// from https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series
const dataUrlCases = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
const dataUrlDeaths = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";
const dataUrlRecovered = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

// COUNTRY CODES NEEDED FOR CHOROPLETH MAP ARENT AVAILABLE ON THE DATASET
// ADDING THE CORRECT CODE OF SOME COUNTRIES NEEDS TO BE DONE MANUALLY

const nameReparations = new Map();
nameReparations.set("840", "US"); // united states
nameReparations.set("068", "Bolivia"); // Bolibia (republic)...
nameReparations.set("096", "Brunei"); // Brunei Darussalam
nameReparations.set("104", "Burma"); // Myanmar
nameReparations.set("180", "Congo (Brazzaville)"); // Congo, Democratic Republic of the
nameReparations.set("178", "Congo (Kinshasa)"); // Congo
nameReparations.set("384", "Cote d'Ivoire");
//diamond princes ship data ????
nameReparations.set("364", "Iran"); // Iran (Islamic Republic of)
nameReparations.set("410", "Korea, south"); // Korea, Republic of
//nameReparations.set("xxx", "Kosovo"); // Kosovo doesnt have a code!
nameReparations.set("418", "Laos"); // Lao People's Democratic Republic
// MS Zaandam ship
nameReparations.set("583", "Micronesia"); // Micronesia (Federated States of)
nameReparations.set("498", "Moldova"); // Moldova, Republic of
nameReparations.set("643", "Russia"); // Russian Federation
nameReparations.set("760", "Syria"); // Syrian Arab Republic
nameReparations.set("158", "Taiwan*"); // Taiwan, Province of China
nameReparations.set("834", "Tanzania"); // Tanzania, United Republic of
nameReparations.set("826", "United Kingdom"); // United Kingdom of Great Britain and Northern Ireland
nameReparations.set("862", "Venezuela"); // Venezuela (Bolivarian Republic of)
nameReparations.set("704", "Vietnam"); // Viet Nam
nameReparations.set("275", "West Bank and Gaza"); // Palestine, State of

//countryCodes url
const countryCodesUrl = "https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/slim-3/slim-3.json";

const dateParser = timeParse('%m/%d/%y');

export const useDailyData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    json(countryCodesUrl)
    .then((countryData) =>{
      nameReparations.forEach((name, code)=>{
        countryData.find(cd => cd["country-code"] === code).name = name;
      })
      
      return Promise.all([
        csv(dataUrlDeaths, (country) => setCountryCode(country, countryData)),
        csv(dataUrlCases, (country) => setCountryCode(country, countryData)),
        csv(dataUrlRecovered, (country) => {
          if(country["Country/Region"] !== "US"){
            return setCountryCode(country, countryData)
          }
        }),
      ])
    })
    .then(data => data.map(transformData))
    .then(setData);
  }, []);
  return data;
};

function setCountryCode(country, countryData){
  const selectedCountryData = countryData.find(cd => cd.name.toUpperCase() === country["Country/Region"].toUpperCase());
  country.code = selectedCountryData ? selectedCountryData["country-code"] : null;
  return country;
}

function transformData(rawData){
  // Remove non date related columns
  const dates = rawData.columns.slice(4);
  let data = rawData.map(countryData => {
    return {
      ProvinceState: countryData["Province/State"],
      CountryRegion: countryData["Country/Region"],
      Lat: +countryData["Lat"],
      Long: +countryData["Long"],
      code: countryData.code,
      data: dates.map((date, i, array )=> {
        // Calculate the daily increment (the original data only contains total amounts)
        const increment = i === 0 ? countryData[date] : (+countryData[date]) - (+countryData[array[i - 1]]);
        return {
          date: dateParser(date),
          increment: +increment,
          amount: +countryData[date],
        }
      })
    }
  });
  
  // Calculate and store global statistics by date
  data.total = dates.map((date, i) => {
    return {
      date: dateParser(date),
      increment: data.map(d => d.data[i].increment).reduce((acc, curr) => acc + (+curr)),
      amount: rawData.map(d => d[date]).reduce((acc, curr) => (+acc) + (+curr))
    };
  })

  return data;
}

