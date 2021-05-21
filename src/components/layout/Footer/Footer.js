/*
    Static footer component
*/

export const Footer = () => {
    return (
        <footer className="page-footer font-small blue pt-4">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">COVID-19 DATAVIZ</h5>
                        <hr></hr>
                        <p>
                            This application has been developed as the final project of the Web Application Development Degree at CIFP Ciudad Jardin on the 2020/2021 academic year.
                        </p>
                    </div>
                    <hr className="clearfix w-100 d-md-none pb-3" />
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">SOURCES</h5>
                        <hr></hr>

                        <ul className="list-unstyled">
                            <li><a className="customColor" href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins University data</a></li>
                            <li><a className="customColor" href="https://opendata.euskadi.eus/catalogo/-/evolucion-del-coronavirus-covid-19-en-euskadi/">Open Data Euskadi data</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <hr></hr>

                        <ul className="list-unstyled">
                            <li><a className="customColor" href="https://ciudadjardin.hezkuntza.net/es/2">CIFP Ciudad Jardin</a></li>
                            <li><a className="customColor" href="https://github.com/Iker-Navarro/D3JS">View the source code</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">
                © Iker Navarro 2021 
            </div>
        </footer>
    );
}