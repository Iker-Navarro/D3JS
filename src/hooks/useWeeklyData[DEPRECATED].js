import { useState, useEffect } from 'react';
import { csv } from 'd3';

// from https://www.ecdc.europa.eu/en/publications-data/data-national-14-day-notification-rate-covid-19
const dataUrl = "https://gist.githubusercontent.com/Iker-Navarro/411cb2fe110fe25621935bcd6985c560/raw/d652e144bea360e03e1c5f1cb9200fc156816123/weeklyCovidData.csv"

export const useWeeklyData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const row = d => {
        d.cumulative_count = +d.cumulative_count;
        d.population = +d.population;
        d.weekly_count = +d.weekly_count;
        return d;
    };
    csv(dataUrl, row).then(setData);
  }, []);
  
  return data;
};