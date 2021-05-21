import { Route, useRouteMatch } from "react-router";
import { BarChart } from "../../graphs/BarChart/BarChart";
import { MultiLineChart2 } from "../../graphs/MultiLineChart/MultiLineChart2";
import { InternalMenu } from "../../layout/InternalMenu/InternalMenu";
import { Loading } from "../../layout/Loading/Loading";
import { NoOptionSelected } from "../../layout/NoOptionSelected/NoOptionSelected";

/*

TODO

*/

const lColor = "red";
const rColor = "blue";

export const LocalDataPage = ({data, width}) => {

    const { path, url } = useRouteMatch();

    if(!data){
        return(<Loading />);
    }

    const routeOptions = ["/cases", "/deceased", "/evolution", "/provinces"];
    const navOptions =  [
        { to: url + routeOptions[0], text: "Cases by age" },
        { to: url + routeOptions[1], text: "Deceased by age" },
        { to: url + routeOptions[2], text: "Evolution by age" },
        { to: url + routeOptions[3], text: "Province comparation" },
    ]

    return (
        <>
            <h1 className="text-center mt-3">LOCAL DATA FROM THE BASQUE COUNTRY</h1>
            <hr></hr>
            <InternalMenu options={navOptions} />
            <Route path={`${path}`} exact>
                <NoOptionSelected />
            </Route>
            <Route path={path +routeOptions[0]}>
                <BarChart 
                    data={data.byAgeRange} 
                    xValue={ d => d.ageRange } 
                    yValue={ d => d.positiveCount } 
                    lValue={d => d.positiveWomenCount} 
                    lCol={lColor}
                    rValue={d => d.positiveMenCount} 
                    rCol={rColor}
                    width={width}
                    rColLabel="Men"
                    lColLabel="Women"
                    title="Total cases"
                />
            </Route>
            <Route path={path +routeOptions[1]}>
                <BarChart 
                    data={data.byAgeRange} 
                    xValue={ d => d.ageRange } 
                    yValue={ d => d.deceasedCount } 
                    lValue={d => d.deceasedWomenCount} 
                    lCol={lColor}
                    rValue={d => d.deceasedMenCount} 
                    rCol={rColor}
                    width={width}
                    rColLabel="men"
                    lColLabel="Women"
                    title="Total deaths"
                />
            </Route>
            <Route path={path +routeOptions[2]}>
                <MultiLineChart2 
                    data={data.byDateAge} 
                    width={width}
                    xValue={d => d.date}
                    lines={[
                        "age_0_9_Count",
                        "age_10_19_Count",
                        "age_20_29_Count",
                        "age_30_39_Count",
                        "age_40_49_Count",
                        "age_50_59_Count",
                        "age_60_69_Count",
                        "age_70_79_Count",
                        "age_80_89_Count",
                        "age_90_X_Count",
                        "unknownCount"
                    ]}
                    colorScheme={["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#cb181d", "#a50f15", "#67000d", "#3b0108", "#137b80"]}
                    title="Cases by age"
                />
            </Route>
            <Route path={path +routeOptions[3]}>
                <MultiLineChart2 
                    data={data.byMun} 
                    width={width}
                    xValue={d => d.date}
                    lines={[
                        "aggregatedIncidenceAR",
                        "aggregatedIncidenceBIZ",
                        "aggregatedIncidenceGI",
                    ]}
                    colorScheme={["#fcbba1", "#ef3b2c", "#67000d"]}
                    title="Agregated incidence"
                />
            </Route>
        </>
    );
}