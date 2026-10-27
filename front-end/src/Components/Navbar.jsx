
import React from 'react';
import './Navbar.css';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home', end: true },
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/skills', label: 'Skills' },
  ];

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        KK<span>.</span>
      </NavLink>

      <div className="links">
        {links.map(({ path, label, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {label}
          </NavLink>
        ))}
      </div>

      <a className="navbar-cta" href="mailto:kavithakumari351@gmail.com">
        Let's Connect <span>↗</span>
      </a>
    </nav>
  );
};

export default Navbar;
