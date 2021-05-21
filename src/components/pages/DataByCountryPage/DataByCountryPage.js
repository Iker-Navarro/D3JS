import { Redirect, Route, useRouteMatch } from "react-router";
import { InternalMenu } from "../../layout/InternalMenu/InternalMenu";
import { NoOptionSelected } from "../../layout/NoOptionSelected/NoOptionSelected";
import { WorldChoroplethMap } from "./WorldChoroplethMap/WorldChoroplethMap";
import { WorldMultiLinePlot } from "./WorldMultiLinePlot/WorldMultiLinePlot";
import { WorldStatusMap } from "./WorldStatusMap/WorldStatusMap";

/*
    Data by country root component with different routes foreach of the components
*/

export const DataByCountryPage = ({worldMap, data, width}) => {
    const { path, url } = useRouteMatch();

    // Internal menu configuration
    const routeOptions = ["/bubbleMap", "/choropleth", "/evolution"];
    const navOptions =  [
        { to: url + routeOptions[0], text: "Bubble map" },
        { to: url + routeOptions[1], text: "Choropleth map" },
        { to: url + routeOptions[2], text: "Pandemic evolution by country" },
    ]
    return (
        <>
            <h1 className="text-center mt-3">DATA BY COUNTRY</h1>
            <hr></hr>
            <InternalMenu options={navOptions} />
            <Route path={`${path}`} exact>
                <NoOptionSelected />
            </Route>
            <Route path={path +routeOptions[0]}>
                <WorldStatusMap data={data} worldMap={worldMap} width={width} />
            </Route>
            <Route path={path +routeOptions[1]}>
                <WorldChoroplethMap data={data} worldAtlas={worldMap} width={width} />
            </Route>
            <Route path={path +routeOptions[2]}>
              <WorldMultiLinePlot data={data} width={width} />
            </Route>
            <Redirect to={path} />
        </>
    );
}