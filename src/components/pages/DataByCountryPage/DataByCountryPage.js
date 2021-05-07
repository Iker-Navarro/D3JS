import { useState } from "react";
import { WorldStatusMap } from "./WorldStatusMap/WorldStatusMap";

export const DataByCountryPage = ({worldMap, data, width}) => {
    // hook responsible for detecting brushing on WorldStatusMap
    // Needs to be out here as the useState hook cant be called conditionally
    const [brushExtent, setBrushExtent] = useState(null);

    // TODO - Create and add loading component
    if(!worldMap || !data)
        return(<div>Loading...</div>);
    
    // data destructuring
    const [deaths, cases, recovered] = data;
    
    return (
        <>
            <h1 className="text-center mt-3">DATA BY COUNTRY</h1>
            <hr></hr>
            <WorldStatusMap brushExtent={brushExtent} setBrushExtent={setBrushExtent} data={deaths} worldMap={worldMap} width={width} />
        </>
    );
}