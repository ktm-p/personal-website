import { useLocation } from 'react-router-dom'
import { usePageTransition } from '../context/TransitionContext'
import './Navbar.css'

const links = [
    {to: '/', label: 'Home'},
    {to: '/about', label: 'About'},
    {to: '/projects', label: 'Projects'},
    {to: '/blog', label: 'Blog'},
]

export default function Navbar() {
    const {triggerNavigation} = usePageTransition()
    const location = useLocation()

    return (
        <nav>
            <div className="navbar__inner">
                <ul className="navbar__links">
                    {links.map(l => (
                        <li key={l.label}>
                            <a
                                href={l.to}
                                className={`navbar__link${location.pathname === l.to ? ' active' : ''}`}
                                onClick={e => {e.preventDefault(); triggerNavigation(l.to)}}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
