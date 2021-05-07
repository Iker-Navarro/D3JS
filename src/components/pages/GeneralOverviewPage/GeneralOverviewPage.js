import { format } from "d3-format";
import { Route, useRouteMatch } from "react-router";
import { InfoCard } from "./InfoCard/InfoCard";
import { OverviewTopicSelection } from "./OverviewTopicSelection/OverviewTopicSelection";

/*

    Entry point to page in charge of showing visualizations about generic data about the entire planet

*/

// Accessor functions to different data
const yValueTotal = d => d["amount"];
const yValueIncrement = d => d["increment"];

// transforms 1000000 to 1,000,000
const thousandsFormatter = format(",");

export const GeneralOverviewPage = ({data, width}) => {

    // Hook to get information about the current route
    const { path, url } = useRouteMatch();

    // TODO - Add loading
    if(!data)
        return (<div>loading</div>)

    // destructuring data
    const [deaths, cases, recovered] = data;
    
    return (
        <>
            <h1 className="text-center mt-3">GENERAL OVERVIEW</h1>
            <hr></hr>

            <div className="row">
                <InfoCard data={recovered.total} title="RECOVERED" imgSrc="/img/redcross.png" to={`${url}/recovered`} formatter={thousandsFormatter} />
                <InfoCard data={cases.total} title="CASES" imgSrc="/img/covid-icon.png" to={`${url}/cases`} formatter={thousandsFormatter} />
                <InfoCard data={deaths.total} title="DEATHS" imgSrc="/img/x.png" to={`${url}/deaths`} formatter={thousandsFormatter} />
            </div>

            <hr></hr>
            <Route path={`${path}`} exact>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <p className="lead m-0 text-center">Select the data to be displayed from the options shown above.</p>
                    </div>
                </div>
            </Route>
            <Route path={`${path}/recovered`}>
                <OverviewTopicSelection title="RECOVERED" data={recovered} yValueIncrement={yValueIncrement} yValueTotal={yValueTotal} width={width} />
            </Route>
            <Route path={`${path}/cases`}>
                <OverviewTopicSelection title="CASES" data={cases} yValueIncrement={yValueIncrement} yValueTotal={yValueTotal} width={width} />
            </Route>
            <Route path={`${path}/deaths`}>
                <OverviewTopicSelection title="DEATHS" data={deaths} yValueIncrement={yValueIncrement} yValueTotal={yValueTotal} width={width} />
            </Route>
        </>

    )
}