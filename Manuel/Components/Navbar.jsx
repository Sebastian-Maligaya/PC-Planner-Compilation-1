import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/all" className="nav-item">All</NavLink>
      <NavLink to="/gaming" className="nav-item">Gaming</NavLink>
      <NavLink to="/productivity" className="nav-item">Productivity</NavLink>
      <NavLink to="/generaluse" className="nav-item">General Use</NavLink>
      
    </nav>
  );
};

export default Navbar;
