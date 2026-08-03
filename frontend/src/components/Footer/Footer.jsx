import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thenameisbhagavan/' },
  { name: 'GitHub', url: 'https://github.com/thenameisbhagavan' },
  { name: 'X (Twitter)', url: 'https://x.com/nameisbhagavan' },
  { name: 'Instagram', url: 'https://www.instagram.com/thenameisbhagavan_/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@TheNameIsBhagavan' },
  { name: 'Facebook', url: 'https://www.facebook.com/thenameisbhagavan' },
  { name: 'Email', url: 'mailto:thenameisbhagavan@gmail.com' },
];

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <motion.div 
        className={styles.footerContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        
        {/* SECTION 1: Massive Closing Statement */}
        <section className={styles.closingSection}>
          <h1 className={styles.brandMark}>VERITAS</h1>
          <h2 className={styles.manifesto}>
            Understand Information.<br />
            Understand Reasoning.
          </h2>
          <p className={styles.manifestoSubtext}>
            An Explainable Intelligence Platform designed to expose claims, evidence, credibility signals, bias patterns, and decision traces.
          </p>
        </section>

        {/* SECTION 2: Product Navigation */}
        <nav className={styles.navigationSection}>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/technology">Technology</Link>
          <Link to="/research">Research</Link>
          <Link to="/validation">Validation</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/limitations">Limitations</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* SECTION 3: Social & Author Links */}
        <nav className={styles.socialSection} aria-label="Author Social Networks">
          {socialLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target={item.url.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
              {item.name} ↗
            </a>
          ))}
        </nav>

        {/* SECTION 4: Methodology Statement */}
        <section className={styles.methodologySection}>
          <p>Credibility ≠ Truth</p>
          <p>Bias ≠ Falsehood</p>
          <p>VERITAS does not determine what is true.</p>
          <p>VERITAS exposes evidence, reasoning, and structural signals so users can make informed judgments.</p>
        </section>

        {/* SECTION 5: Platform Metadata & Copyright */}
        <div className={styles.bottomSection}>
          <div className={styles.metadata}>
            <strong>VERITAS</strong>
            <span>Version 1.0</span>
            <span>Built with React, FastAPI, MongoDB and Explainable Intelligence Architecture.</span>
          </div>
          <div className={styles.copyright}>
            <span>© 2026 VERITAS • Created by Bhagavan</span>
            <span>Intelligence, made transparent.</span>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
