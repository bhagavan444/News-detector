import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AppleSearchModal.module.css";

const SEARCH_ITEMS = [
  // Pages & Core Navigation
  {
    title: "Analyze & Predict",
    description: "Launch live intelligence pipeline & factual claim verification",
    path: "/predict",
    category: "Pages & Core Architecture",
  },
  {
    title: "Examples & Case Studies",
    description: "Real-world news analysis, political fact-checking & bias reports",
    path: "/examples",
    category: "Pages & Core Architecture",
  },
  {
    title: "How It Works",
    description: "Step-by-step visual tour of the 6-layer VERITAS reasoning pipeline",
    path: "/how-it-works",
    category: "Pages & Core Architecture",
  },
  {
    title: "Technology & Architecture",
    description: "Deep dive into SpaCy, NLTK, FastAPI & custom NLP extraction",
    path: "/technology",
    category: "Pages & Core Architecture",
  },
  {
    title: "Research & Methodology",
    description: "Academic foundation, benchmark datasets & scientific evaluation",
    path: "/research",
    category: "Pages & Core Architecture",
  },
  {
    title: "Validation & Accuracy",
    description: "Empirical accuracy metrics across political and financial news",
    path: "/validation",
    category: "Pages & Core Architecture",
  },
  {
    title: "Compare Models",
    description: "Side-by-side comparison: VERITAS vs. generic LLM black boxes",
    path: "/compare",
    category: "Pages & Core Architecture",
  },
  {
    title: "Limitations & Boundaries",
    description: "Transparent boundaries, satire detection & fallback behavior",
    path: "/limitations",
    category: "Pages & Core Architecture",
  },
  {
    title: "Vision & Philosophy",
    description: "Why VERITAS exists: solving understanding, not just access",
    path: "/about",
    category: "Pages & Core Architecture",
  },
  {
    title: "Contact & Team",
    description: "Collaborate with Bhagavan & the VERITAS engineering team",
    path: "/contact",
    category: "Pages & Core Architecture",
  },
  {
    title: "Plans & Access",
    description: "Open academic tier & enterprise research workspace access",
    path: "/plans",
    category: "Pages & Core Architecture",
  },
  // Key AI Capabilities
  {
    title: "Claim Extraction Pipeline",
    description: "Automated entity & factual claim parsing",
    path: "/how-it-works#claim-extraction",
    category: "AI Capabilities",
  },
  {
    title: "Credibility Scoring",
    description: "Source trustworthiness & evidence validation",
    path: "/how-it-works#credibility-scoring",
    category: "AI Capabilities",
  },
  {
    title: "Bias & Framing Detection",
    description: "Lexical framing & ideological bias analysis",
    path: "/how-it-works#bias-detection",
    category: "AI Capabilities",
  },
  {
    title: "Explainable AI Reasoning Engine",
    description: "Transparent evidence-backed deduction graph",
    path: "/technology#reasoning-engine",
    category: "AI Capabilities",
  },
  {
    title: "Intelligence Library",
    description: "Save, export, and review previous verification reports",
    path: "/workspace",
    category: "AI Capabilities",
  },
  // Creator & Social Networks
  {
    title: "LinkedIn — Bhagavan",
    description: "Official LinkedIn profile & professional network (thenameisbhagavan)",
    path: "https://www.linkedin.com/in/thenameisbhagavan/",
    category: "Creator & Social Networks",
    isExternal: true,
  },
  {
    title: "GitHub — Bhagavan",
    description: "Open-source repositories & engineering portfolio (thenameisbhagavan)",
    path: "https://github.com/thenameisbhagavan",
    category: "Creator & Social Networks",
    isExternal: true,
  },
  {
    title: "X (Twitter) — Bhagavan",
    description: "AI research updates, thoughts & announcements (nameisbhagavan)",
    path: "https://x.com/nameisbhagavan",
    category: "Creator & Social Networks",
    isExternal: true,
  },
  {
    title: "Instagram — Bhagavan",
    description: "Official Instagram profile (thenameisbhagavan_)",
    path: "https://www.instagram.com/thenameisbhagavan_/",
    category: "Creator & Social Networks",
    isExternal: true,
  },
  {
    title: "YouTube — Bhagavan",
    description: "Engineering demonstrations & tutorials (@TheNameIsBhagavan)",
    path: "https://www.youtube.com/@TheNameIsBhagavan",
    category: "Creator & Social Networks",
    isExternal: true,
  },
  {
    title: "Facebook — Bhagavan",
    description: "Official Facebook profile (thenameisbhagavan)",
    path: "https://www.facebook.com/thenameisbhagavan",
    category: "Creator & Social Networks",
    isExternal: true,
  },
  {
    title: "Email — Bhagavan",
    description: "Direct email inquiry (thenameisbhagavan@gmail.com)",
    path: "mailto:thenameisbhagavan@gmail.com",
    category: "Creator & Social Networks",
    isExternal: true,
  },
];

export default function AppleSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredItems = query.trim()
    ? SEARCH_ITEMS.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_ITEMS;

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  useEffect(() => {
    if (selectedIndex >= filteredItems.length && filteredItems.length > 0) {
      setSelectedIndex(0);
    }
  }, [filteredItems.length, selectedIndex]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? (filteredItems.length || 1) - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const handleSelect = (item) => {
    onClose();
    if (item.isExternal) {
      window.open(item.path, item.path.startsWith("mailto:") ? "_self" : "_blank", "noopener,noreferrer");
    } else if (item.path.includes("#")) {
      const [pathname, hash] = item.path.split("#");
      navigate(pathname);
      setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    } else {
      navigate(item.path);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: -16 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: -10,
      transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContainer}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className={styles.searchHeader}>
              <svg
                className={styles.searchIcon}
                width="20"
                height="20"
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

              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder="Search VERITAS (e.g. Claim extraction, LinkedIn, GitHub...)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                aria-label="Search VERITAS"
              />

              {query && (
                <button
                  className={styles.clearButton}
                  onClick={() => setQuery("")}
                  aria-label="Clear Search"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}

              <span className={styles.shortcutBadge}>ESC</span>
            </div>

            {/* Search Results Area */}
            <div className={styles.resultsArea}>
              {filteredItems.length === 0 ? (
                <div className={styles.emptyState}>
                  No results matching &ldquo;{query}&rdquo;. Try searching for &ldquo;Claim&rdquo;, &ldquo;Research&rdquo;, or &ldquo;LinkedIn&rdquo;.
                </div>
              ) : (
                Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category} className={styles.categoryGroup}>
                    <div className={styles.categoryTitle}>{category}</div>
                    {items.map((item) => {
                      const absoluteIndex = filteredItems.indexOf(item);
                      const isSelected = absoluteIndex === selectedIndex;
                      return (
                        <div
                          key={item.path + item.title}
                          className={`${styles.resultItem} ${
                            isSelected ? styles.active : ""
                          }`}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(absoluteIndex)}
                        >
                          <div className={styles.resultContent}>
                            <div className={styles.resultTitle}>{item.title}</div>
                            <div className={styles.resultDescription}>
                              {item.description}
                            </div>
                          </div>

                          <svg
                            className={styles.resultActionIcon}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className={styles.footerBar}>
              <div className={styles.footerKeyHint}>
                <span>Navigate</span>
                <span className={styles.keyKbd}>↑</span>
                <span className={styles.keyKbd}>↓</span>
              </div>
              <div className={styles.footerKeyHint}>
                <span>Open</span>
                <span className={styles.keyKbd}>↵</span>
              </div>
              <div className={styles.footerKeyHint}>
                <span>Close</span>
                <span className={styles.keyKbd}>ESC</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
