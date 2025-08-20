import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/components" className="nav-item">Components</NavLink>
      <NavLink to="/compatibility" className="nav-item">Compatibility</NavLink>
      <NavLink to="/bottlenecks" className="nav-item">Bottlenecks</NavLink>
      <NavLink to="/budget-tips" className="nav-item">Budget Tips</NavLink>
      
    </nav>
  );
};

export default Navbar;