import { NavLink } from "react-router-dom";

/*
    internal menu to load different routes based on the options prop
*/

export const InternalMenu = ({options}) => {
    return(
        <ul className="nav nav-tabs justify-content-center">
            {
                options.map(opt => (
                    <li className="nav-item" key={opt.text}>
                        <NavLink exact activeClassName="active" className="nav-link text-secondary" to={opt.to}>{opt.text}</NavLink>
                    </li>
                ))
            }
        </ul>
    )
}