/*

    Static About page

*/
export const AboutPage = () => {

    return (
        <>
            <div className="container">
                <h1 className="mt-3">ABOUT THIS APPLICATION</h1>
                <hr></hr>
                <div className="row align-items-center my-3">
                    <div className="col-12 col-md-9">
                        <h2>PURPOSE</h2>
                        <p>
                            This application has been developed as the Web Application Development degree final project.
                        </p>
                        <p>
                            Its main purpose has been to learn and employ web technologies to create and display several data visualizations.
                        </p>
                        <p>
                            Due to the current situation the dataset choice has been made easy caused by the extensive amount of datasets and sources 
                            related to the covid-19 pandemic in comparation to other topics that might also have been of interest for this purpose

                        </p>
                    </div>
                    <div className="col-12 col-md-3">
                        <img className="img-responsive w-100" src="/img/compass.png" alt="compass"></img>
                    </div>
                </div>
                <hr></hr>
                <div className="row align-items-center mb-5">
                    <div className="col-2">
                        <img className="img-responsive w-100" src="/img/data.png" alt="data"></img>
                    </div>
                    <div className="col-10">
                        <h2>SOURCES OF THE USED DATA</h2>
                        <p>
                            As mentoined above this application has used two distinct datasets to display all the different graphs shown within the website.
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-6 mb-5">
                        <img className="w-100" src="/img/jhu.jpg" alt="jhu" />
                        <p>
                           The first used dataset is the one offered by <a className="customColor" href="https://systems.jhu.edu/" target="_blank" rel="noreferrer">The Center for Systems Science and Engineering (CSSE) at Johns Hopkins Universitiy.</a> 
                           This dataset contains numeric information about the deceased, cases and recovered organised by country.
                        </p>
                        <div className=" text-center">
                            <a className="btn customButton" href="https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series" target="_blank" rel="noreferrer">View raw data</a>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 mb-5">
                        <img className="w-100" src="/img/opendata.jpg" alt="opendata euskadi" />
                        <p>
                           The second data source is <a className="customColor" href="https://opendata.euskadi.eus/inicio/" target="_blank" rel="noreferrer">Open Data Euskadi, </a> 
                           this dataset is composed by mutiple independent datasets; containing data organised by gender, age and province among other clasifications. The data stored in this source only contains information about the basque country.
                        </p>
                        <div className=" text-center">
                            <a className="btn customButton" href="https://opendata.euskadi.eus/catalogo/-/evolucion-del-coronavirus-covid-19-en-euskadi/" target="_blank" rel="noreferrer">View raw data</a>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <h3>USED TECHNOLOGIES</h3>
                    <p>· This application uses React as the base JavaScript framework</p>
                    <p>· For all the graphs the DOM manipulation library D3 has been used</p>
                    <p>· The styling uses Bootstrap 4</p>
            </div>
        </>
    )
}