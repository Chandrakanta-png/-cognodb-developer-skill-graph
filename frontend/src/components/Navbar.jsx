import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          SkillGraph
        </Link>

        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/developers">Developers</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button type="button" className="nav-logout" onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="nav-cta">Create account</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
