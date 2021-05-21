import { LineChart } from "../../../graphs/LineChart/LineChart"

/*

    Shows the plots relative to a selection (deaths, recovered, cases)

    Evolution - total data accumulative

    Increment - daily cases

*/

export const OverviewTopicSelection = ({title, data, yValueIncrement, yValueTotal, width}) => {
    return(
        <>
            <h2 className="text-center mt-5">{title}</h2>
            <hr></hr>
            <h3>Evolution:</h3>
            <div className="row">
                <LineChart data={data.total} yValue={yValueTotal} width={width}/>
            </div>
            <hr></hr>
            <h3>Daily increment:</h3>
            <div className="row">
                <LineChart data={data.total} yValue={yValueIncrement} width={width}/>
            </div>
        </>
    )
}