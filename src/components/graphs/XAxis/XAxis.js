import { useRef, useEffect } from 'react';
import { select, axisBottom } from 'd3';

/*

  Component to create and display a d3 bottom axis based on a scale

*/

export const XAxis = ({ xScale, innerHeight }) => {
  const ref = useRef();

  useEffect(() => {
    const xAxisG = select(ref.current);

    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(18);
    
    xAxisG.call(xAxis);
  }, [xScale, innerHeight]);
  return <g transform={`translate(0,${innerHeight})`} ref={ref} />;
};
