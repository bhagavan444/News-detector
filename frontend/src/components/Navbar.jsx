import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import AppleSearchModal from "./Navbar/AppleSearchModal";
import "./Navbar.css";

const navLinks = [
  { to: "/predict", label: "Analyze" },
  { to: "/examples", label: "Examples" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/technology", label: "Technology" },
  { to: "/research", label: "Research" },
  { to: "/validation", label: "Validation" },
  { to: "/compare", label: "Compare" },
  { to: "/limitations", label: "Limitations" },
  { to: "/about", label: "Vision" },
  { to: "/contact", label: "Contact" }
];

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/thenameisbhagavan/" },
  { name: "GitHub", url: "https://github.com/thenameisbhagavan" },
  { name: "X", url: "https://x.com/nameisbhagavan" },
  { name: "Instagram", url: "https://www.instagram.com/thenameisbhagavan_/" },
  { name: "YouTube", url: "https://www.youtube.com/@TheNameIsBhagavan" },
  { name: "Facebook", url: "https://www.facebook.com/thenameisbhagavan" },
  { name: "Email", url: "mailto:thenameisbhagavan@gmail.com" },
];

export default function Navbar({ handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user.email);
        setUserPhoto(user.photoURL);
      } else {
        setIsAuthenticated(false);
        setUserEmail("");
        setUserPhoto(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Global Keyboard shortcuts for Spotlight Search (Cmd/Ctrl + K or '/')
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (
        e.key === "/" &&
        !searchOpen &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const mobileSheetVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          {/* Official Apple-style Logo Area */}
          <Link to="/" className="navbar-brand" onClick={closeMenu}>
            <img src="/logo.jpg" alt="VERITAS" className="brand-logo" />
          </Link>

          {/* Official Apple.com Desktop Navigation */}
          <div className="nav-desktop">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                {link.label}
                {link.label === "Analyze" && (
                  <span className="desktop-link-badge">Preview</span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Actions Area (Official Apple Search Icon + Profile + Mobile Hamburger) */}
          <div className="nav-actions">
            {/* Minimalist Apple.com Search Icon Button (Unified for both Desktop & Mobile) */}
            <button
              className="nav-icon-btn"
              onClick={() => {
                closeMenu();
                setSearchOpen(true);
              }}
              aria-label="Search VERITAS (⌘K)"
              title="Search (⌘K)"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {isAuthenticated ? (
              <div className="profile-wrapper">
                <button
                  className="profile-btn"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="User Profile"
                >
                  {userPhoto ? (
                    <img src={userPhoto} alt="Profile" className="profile-img" />
                  ) : (
                    <div className="profile-img-fallback">
                      {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      className="profile-dropdown"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="dropdown-email">{userEmail}</p>
                      <button
                        className="dropdown-logout"
                        style={{
                          color: "#000",
                          marginBottom: "8px",
                          borderBottom: "1px solid #eee",
                        }}
                        onClick={() => {
                          navigate("/workspace");
                          closeMenu();
                        }}
                      >
                        Intelligence Library
                      </button>
                      <button
                        className="dropdown-logout"
                        onClick={() => {
                          if (handleLogout) handleLogout();
                          closeMenu();
                        }}
                      >
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}

            {/* Apple Hamburger Toggle (Hidden on Desktop, Visible on Mobile/Tablet <= 1080px) */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
              <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* 2026 Apple Vision Pro / iOS 18 Liquid Glass Mobile Sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-sheet"
            variants={mobileSheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-sheet-content">
              {/* Integrated Search Bar inside Mobile Menu */}
              <motion.div
                className="mobile-search-bar"
                variants={itemVariants}
                onClick={() => {
                  closeMenu();
                  setSearchOpen(true);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search VERITAS &amp; AI Capabilities</span>
                <span className="mobile-search-kbd">⌘K</span>
              </motion.div>

              {/* Categorized Staggered Navigation */}
              <div className="mobile-nav-grid">
                <motion.div className="mobile-nav-section" variants={itemVariants}>
                  <div className="mobile-section-title">Core Architecture</div>
                  <NavLink
                    to="/predict"
                    onClick={closeMenu}
                    className="mobile-link primary-highlight"
                  >
                    Analyze &amp; Predict
                    <span className="mobile-link-badge preview">Preview</span>
                  </NavLink>
                  <NavLink to="/examples" onClick={closeMenu} className="mobile-link">
                    Examples &amp; Case Studies
                  </NavLink>
                  <NavLink
                    to="/how-it-works"
                    onClick={closeMenu}
                    className="mobile-link"
                  >
                    How It Works
                  </NavLink>
                  <NavLink
                    to="/technology"
                    onClick={closeMenu}
                    className="mobile-link"
                  >
                    Technology &amp; Engine
                  </NavLink>
                </motion.div>

                <motion.div className="mobile-nav-section" variants={itemVariants}>
                  <div className="mobile-section-title">Research &amp; Accuracy</div>
                  <NavLink to="/research" onClick={closeMenu} className="mobile-link">
                    Research &amp; Methodology
                  </NavLink>
                  <NavLink
                    to="/validation"
                    onClick={closeMenu}
                    className="mobile-link"
                  >
                    Validation &amp; Accuracy
                  </NavLink>
                  <NavLink to="/compare" onClick={closeMenu} className="mobile-link">
                    Compare Models
                  </NavLink>
                  <NavLink
                    to="/limitations"
                    onClick={closeMenu}
                    className="mobile-link"
                  >
                    Limitations &amp; Boundaries
                  </NavLink>
                </motion.div>

                <motion.div className="mobile-nav-section" variants={itemVariants}>
                  <div className="mobile-section-title">Vision &amp; Access</div>
                  <NavLink to="/about" onClick={closeMenu} className="mobile-link">
                    Vision &amp; Philosophy
                  </NavLink>
                  <NavLink to="/plans" onClick={closeMenu} className="mobile-link">
                    Plans &amp; Tier Access
                  </NavLink>
                  <NavLink to="/contact" onClick={closeMenu} className="mobile-link">
                    Contact &amp; Team
                  </NavLink>
                </motion.div>
              </div>

              {/* Creator & Social Links Bar */}
              <motion.div className="mobile-social-bar" variants={itemVariants}>
                <div className="mobile-social-title">Creator &amp; Social Networks</div>
                <div className="mobile-social-grid">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="mobile-social-link"
                    >
                      {item.name} ↗
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Bottom Quick Action Bar */}
              <motion.div className="mobile-footer-bar" variants={itemVariants}>
                {isAuthenticated ? (
                  <div className="mobile-user-row">
                    <span className="mobile-user-email">{userEmail}</span>
                    <button
                      className="mobile-logout-btn"
                      onClick={() => {
                        if (handleLogout) handleLogout();
                        closeMenu();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/predict"
                    className="mobile-cta-btn"
                    onClick={closeMenu}
                  >
                    Launch VERITAS Pipeline
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Spotlight Quick Search Overlay Modal */}
      <AppleSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
