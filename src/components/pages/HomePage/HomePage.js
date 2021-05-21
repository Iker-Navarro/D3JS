import { Link } from "react-router-dom"

/*

    Static home page

*/
export const HomePage = () => {

    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Home page</h1>
                <p className="lead">
                    This application intends to show and display several data visualizations about the Covid-19 epidemic situation & evolution.
                </p>
                <p className="lead">
                    Here you will be able to find visualizations for data related to the entire planet, 
                    information classified by country and a set of visualizations of more specific data about the Basque Country specifically.
                </p>
                <hr></hr>
                <div className="d-flex justify-content-between">
                    <Link className="btn customButton" to="/overview"> Get started </Link>
                    <Link className="btn btn-secondary" to="/about"> See the sources </Link>
                </div>
            </div>
        </div>
    )
}