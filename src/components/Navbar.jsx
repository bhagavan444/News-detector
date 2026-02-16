import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";

function Navbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const isAdmin = userEmail === "g.sivasatyasaibhagavan@gmail.com";

  // ==================== STYLES ====================

  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "72px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: scrolled ? "0 1px 3px rgba(0, 0, 0, 0.04)" : "none",
    transition: "box-shadow 0.3s ease",
    zIndex: 1000,
  };

  const containerStyle = {
    maxWidth: "1440px",
    margin: "0 auto",
    padding: "0 40px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const logoStyle = {
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    color: "#111827",
    fontFamily: "'Dancing Script', cursive",
    textDecoration: "none",
    transition: "opacity 0.2s ease",
  };

  const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  };

  const navLinkStyle = (isActive) => ({
    position: "relative",
    fontSize: "16px",
    fontWeight: isActive ? "600" : "500",
    color: isActive ? "#111827" : "#6b7280",
    textDecoration: "none",
    transition: "color 0.2s ease",
    paddingBottom: "2px",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  });

  const underlineStyle = (isActive) => ({
    position: "absolute",
    bottom: "-1px",
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: "#2563eb",
    transform: isActive ? "scaleX(1)" : "scaleX(0)",
    transition: "transform 0.3s ease",
    transformOrigin: "left",
  });

  const ctaButtonStyle = {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  };

  const signInStyle = {
    fontSize: "15px",
    fontWeight: "500",
    color: "#6b7280",
    textDecoration: "none",
    transition: "color 0.2s ease",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  };

  const profileButtonStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#f3f4f6",
    border: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "calc(100% + 12px)",
    right: 0,
    minWidth: "240px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "16px",
    zIndex: 1001,
    opacity: profileOpen ? 1 : 0,
    transform: profileOpen ? "translateY(0)" : "translateY(-8px)",
    transition: "all 0.2s ease",
    pointerEvents: profileOpen ? "auto" : "none",
  };

  const logoutButtonStyle = {
    width: "100%",
    padding: "10px 16px",
    backgroundColor: "#f3f4f6",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  };

  const adminLinkStyle = {
    padding: "8px 16px",
    backgroundColor: "#f3f4f6",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    textDecoration: "none",
    transition: "background-color 0.2s ease",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  };

  const hamburgerStyle = {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
  };

  const hamburgerLineStyle = (index) => ({
    width: "24px",
    height: "2px",
    backgroundColor: "#111827",
    transition: "all 0.3s ease",
    transform:
      menuOpen && index === 0
        ? "rotate(45deg) translate(6px, 6px)"
        : menuOpen && index === 2
        ? "rotate(-45deg) translate(6px, -6px)"
        : "none",
    opacity: menuOpen && index === 1 ? 0 : 1,
  });

  const mobileMenuStyle = {
    position: "fixed",
    top: 0,
    right: menuOpen ? 0 : "-100%",
    width: "300px",
    height: "100vh",
    backgroundColor: "#ffffff",
    boxShadow: "-4px 0 16px rgba(0, 0, 0, 0.1)",
    transition: "right 0.3s ease",
    zIndex: 1001,
    padding: "90px 24px 24px",
    overflowY: "auto",
  };

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(4px)",
    zIndex: 999,
    opacity: menuOpen ? 1 : 0,
    pointerEvents: menuOpen ? "auto" : "none",
    transition: "opacity 0.3s ease",
  };

  const mobileLinkStyle = (isActive) => ({
    fontSize: "17px",
    fontWeight: "500",
    color: "#111827",
    textDecoration: "none",
    padding: "14px 16px",
    borderRadius: "8px",
    backgroundColor: isActive ? "rgba(37, 99, 235, 0.06)" : "transparent",
    borderLeft: isActive ? "3px solid #2563eb" : "none",
    transition: "background-color 0.2s ease",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  });

  const mobileCtaStyle = {
    marginTop: "24px",
    padding: "14px 24px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.3px",
  };

  // ==================== COMPONENT ====================

  const NavItem = ({ to, children }) => {
    const isActive = window.location.pathname === to;
    return (
      <div style={{ position: "relative" }}>
        <NavLink
          to={to}
          onClick={closeMenu}
          style={navLinkStyle(isActive)}
          onMouseEnter={(e) => {
            if (!isActive) e.target.style.color = "#111827";
            e.target.nextSibling.style.transform = "scaleX(1)";
          }}
          onMouseLeave={(e) => {
            if (!isActive) e.target.style.color = "#6b7280";
            if (!isActive) e.target.nextSibling.style.transform = "scaleX(0)";
          }}
        >
          {children}
        </NavLink>
        <div style={underlineStyle(isActive)} />
      </div>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={closeMenu} />

      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <Link
            to="/"
            style={logoStyle}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Verifex
          </Link>

          {/* Desktop Links */}
          <div style={navLinksStyle} className="nav-desktop">
            <NavItem to="/">Core</NavItem>
            <NavItem to="/about">Insights</NavItem>
            <NavItem to="/plans">Intelligence</NavItem>
            <NavItem to="/contact">Tiers</NavItem>
            {isAuthenticated && <NavItem to="/predict">Scan</NavItem>}
            {isAuthenticated && isAdmin && (
              <NavLink
                to="/admin"
                style={adminLinkStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* Right Section */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  style={signInStyle}
                  onMouseEnter={(e) => (e.target.style.color = "#111827")}
                  onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
                  className="nav-signin"
                >
                  Sign In
                </NavLink>
                <button
                  style={ctaButtonStyle}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#1d4ed8";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#2563eb";
                    e.target.style.transform = "translateY(0)";
                  }}
                  className="nav-cta"
                >
                  Start Analysis
                </button>
              </>
            ) : (
              <div style={{ position: "relative" }}>
                <button
                  style={profileButtonStyle}
                  onClick={() => setProfileOpen(!profileOpen)}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                  aria-label="User Profile"
                >
                  👤
                </button>
                <div style={dropdownStyle}>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginBottom: "12px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #e5e7eb",
                      wordBreak: "break-all",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {userEmail}
                  </p>
                  <button
                    style={logoutButtonStyle}
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            style={hamburgerStyle}
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger"
            aria-label="Toggle Menu"
          >
            <span style={hamburgerLineStyle(0)} />
            <span style={hamburgerLineStyle(1)} />
            <span style={hamburgerLineStyle(2)} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[
            { to: "/", label: "Core" },
            { to: "/about", label: "Insights" },
            { to: "/plans", label: "Intelligence" },
            { to: "/contact", label: "Tiers" },
            ...(isAuthenticated ? [{ to: "/predict", label: "Scan" }] : []),
            ...(isAuthenticated && isAdmin ? [{ to: "/admin", label: "Admin Panel" }] : []),
          ].map((link) => {
            const isActive = window.location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                style={mobileLinkStyle(isActive)}
              >
                {link.label}
              </NavLink>
            );
          })}
          {!isAuthenticated && (
            <button style={mobileCtaStyle}>
              Start Analysis
            </button>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&display=swap');

        @media (max-width: 1024px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
        }

        @media (max-width: 768px) {
          .nav-signin,
          .nav-cta {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;