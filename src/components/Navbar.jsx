import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import "./Navbar.css";

function Navbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const isAdmin = userEmail === "g.sivasatyasaibhagavan@gmail.com";

  return (
    <nav className="navbar" role="navigation" aria-label="Primary Navigation">
      {/* ================= LOGO ================= */}
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          VERIFEX
        </Link>
      </div>

      {/* ================= LINKS ================= */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          VERIFEX CORE
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          VERIFEX INSIGHTS
        </NavLink>

        <NavLink to="/plans" onClick={closeMenu}>
          VERIFEX TIERS
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu}>
          VERIFEX CONNECT
        </NavLink>

        {/* Auth-only link */}
        {isAuthenticated && (
          <NavLink to="/predict" onClick={closeMenu}>
            VERIFEX SCAN
          </NavLink>
        )}

        {/* Admin-only link */}
        {isAuthenticated && isAdmin && (
          <NavLink to="/admin" onClick={closeMenu}>
            ADMIN PANEL
          </NavLink>
        )}

        {/* Auth Action */}
        {!isAuthenticated ? (
          <NavLink to="/login" className="navbar-btn" onClick={closeMenu}>
            Sign In
          </NavLink>
        ) : (
          <div className="navbar-profile">
            <button
              className="profile-icon"
              onClick={() => setProfileOpen((p) => !p)}
              aria-label="User profile"
            >
              👤
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                <p className="profile-email">{userEmail}</p>
                <button
                  className="profile-logout"
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= MOBILE TOGGLE ================= */}
      <button
        className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

export default Navbar;
