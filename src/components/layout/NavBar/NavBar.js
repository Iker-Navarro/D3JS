import { NavLink } from "react-router-dom"

/*
    Bootstrap responsive navbar
    
    NavLink components to link to the routes specified in App.js without reloading the page
    
    activeClassName to add a css class to the selected route
*/

export const NavBar = () => {

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src="/img/covid-icon.png" className="mr-3" width="32" alt="logo"/>
            COVID DATAVIZ
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink exact activeClassName="active" className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact activeClassName="active" className="nav-link" to="/overview">General overview</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact activeClassName="active" className="nav-link" to="/country">Information by country</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink exact activeClassName="active" className="nav-link" to="/local">Situation in the basque country</NavLink>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink exact activeClassName="active" className="nav-link" to="/about">About</NavLink>
                </li>
            </ul>
        </div>
    </nav>
    );
}