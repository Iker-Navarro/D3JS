import { timeFormat } from "d3-time-format";
import { Link } from "react-router-dom";
import "./infoCard.css";

/*
    
    Card to display text information relative to deaths, cases or recovered

    calculates some statistics from the most recent available data

    Adds a link to load a sub-route with the selected graphs

*/

const dateFormatter = timeFormat("%B %d - %Y");
const compactDateFormatter = timeFormat("%d/%m")

export const InfoCard = ({data, title, imgSrc, to, formatter}) => {
    const today = data[data.length - 1];
    const sevenDaysAgo = data[data.length - 8];
    const forteenDaysAgo = data[data.length - 15];

    const increment = today.amount - sevenDaysAgo.amount;
    const prevIncrement = sevenDaysAgo.amount - forteenDaysAgo.amount;
    const diff = Math.round(((increment * 100 / prevIncrement) - 100) * 1000) / 1000;

    return(
        <div className="col-12 col-md-4">
            <div className="card mb-3">
                <h5 className="card-header text-center">
                    {title}
                </h5>
                <img src={imgSrc} className="card-img-top" alt={`${title} icon`} />
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{formatter(today.amount)} {title.toLowerCase()} as of {dateFormatter(today.date)}</li>
                        <li className="list-group-item">An increment of {formatter(increment)} in a 7 day period. <span className="text-muted">({compactDateFormatter(sevenDaysAgo.date)} - {compactDateFormatter(today.date)})</span></li>
                        <li className="list-group-item">
                            {Math.abs(diff)}% {diff > 0 ? "more" : "less" } than the previous 7 day period.  
                            <span className="text-muted"> ({compactDateFormatter(forteenDaysAgo.date)} - {compactDateFormatter(sevenDaysAgo.date)})</span>
                        </li>
                    </ul>
                </div>
                <div className="card-footer">
                    <Link className="btn btn-info w-100" to={to}> View chart </Link>
                </div>
            </div>
        </div>
    );
}