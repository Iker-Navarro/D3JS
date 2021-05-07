import { useRef, useEffect } from 'react';
import { select, axisLeft } from 'd3';

/*

  Component to create and display a d3 left axis based on a scale

*/

export const YAxis = ({ yScale, innerWidth }) => {
  const ref = useRef();

  useEffect(() => {
    const yAxisG = select(ref.current);

    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(18);
      
    yAxisG.call(yAxis);
  }, [innerWidth, yScale]);
  return <g ref={ref} />;
};
