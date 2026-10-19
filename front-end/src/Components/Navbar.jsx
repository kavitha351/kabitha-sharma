import React from 'react';
import './Navbar.css';
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // define colors for each route
  const colors = {
    '/': " red",
    '/about': "yellow",
    '/experience': "green",
    '/skills': "white",
  };

  // get the current color based on current path (default will be white)
  const currentColor = colors[location.pathname] || "white";

  return (
      <div className='links' style={{ '--active-link-color': currentColor}}>
          <li>
            <NavLink to="/" end>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about">About</NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/experience">Experience</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/skills">Skills</NavLink>
          </li>
      </div>
  );
};

export default Navbar;
