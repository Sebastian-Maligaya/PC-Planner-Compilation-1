import { NavLink } from "react-router-dom";
import { useState } from "react";
import './Header.css';
import logo from './assets/LOGO.png';
import { PiSignInBold } from "react-icons/pi";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="PC Planner Logo" className="logo" />
          <h1 className="app-title">PC Planner</h1>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
                  <NavLink to="/lagaymokung ano ang nararapat" className="nav-link" onClick={() => setMenuOpen(false)}>Home</NavLink>
                  <NavLink to="/lagay lang" className="nav-link" onClick={() => setMenuOpen(false)}>PC Builder</NavLink>
                  <NavLink to="/sheeeesh" className="nav-link" onClick={() => setMenuOpen(false)}>Pre-built PCs</NavLink>
                  <NavLink to="/sheeeesh" className="nav-link" onClick={() => setMenuOpen(false)}>Components</NavLink>
                  <NavLink to="/sheeeesh" className="nav-link" onClick={() => setMenuOpen(false)}>Learn</NavLink>
                  <button className="sign-in">Sign In <PiSignInBold /> </button>
        </nav>
      </header>
    </div>
  );
}

export default Header;
