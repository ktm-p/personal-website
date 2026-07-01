import { NavLink } from 'react-router-dom'
import './Navbar.css' // Navbar Styling

const links = [
    { to: "/", label: "Home"},
    { to: "/about", label: "About"},
    { to: "/about", label: "Projects"},
    { to: "/about", label: "Blog"},
]

export default function Navbar() {
    return (
        <nav>
            <div className="navbar__inner">
                <ul className="navbar__links">
                    {links.map(l => (
                        <li key={l.to}>
                            <NavLink to={l.to} className="navbar__link">
                                {l.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}