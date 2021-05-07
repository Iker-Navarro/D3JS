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
            <div className="row">
                <div className="col-12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cursus turpis massa tincidunt dui ut ornare lectus sit. Semper quis lectus nulla at volutpat. Laoreet non curabitur gravida arcu ac tortor dignissim.                 
                </div>
            </div>
            <h3>Daily increment:</h3>
            <div className="row">
                <LineChart data={data.total} yValue={yValueIncrement} width={width}/>
            </div>
        </>
    )
}