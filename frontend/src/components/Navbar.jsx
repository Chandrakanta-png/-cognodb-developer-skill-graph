import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          SkillGraph
        </Link>

        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/developers">Developers</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;