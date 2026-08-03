import React, { useState, useEffect } from 'react';
import SEOHead from '../components/seo/SEOHead';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Predict.module.css';

export default function Predict() {
  const [showProdModal, setShowProdModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <main className={styles.predictPage}>
      <SEOHead
        title="VERITAS Intelligence Engine | AI Workspace"
        description="Private VERITAS AI truth extraction workspace preview."
        canonicalPath="/predict"
        noindex={true}
      />
      
      <motion.div 
        className={styles.heroSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className={styles.heroTitle}>AI Intelligence Workspace</h1>
        <p className={styles.heroSubtitle}>
          The production reasoning engine is currently available only inside the complete engineering environment.
        </p>
      </motion.div>

      <motion.div 
        className={styles.cardsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.featureCard} variants={cardVariants}>
          <div className={styles.cardIcon}>
            {/* Document Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Claim Extraction</h3>
          <p className={styles.cardDesc}>
            Detect factual statements using multi-stage NLP processing.
          </p>
        </motion.div>

        <motion.div className={styles.featureCard} variants={cardVariants}>
          <div className={styles.cardIcon}>
            {/* Database Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Evidence Retrieval</h3>
          <p className={styles.cardDesc}>
            Cross-reference trusted sources before generating conclusions.
          </p>
        </motion.div>

        <motion.div className={styles.featureCard} variants={cardVariants}>
          <div className={styles.cardIcon}>
            {/* Radar Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <line x1="12" y1="12" x2="20" y2="4"></line>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Bias Detection</h3>
          <p className={styles.cardDesc}>
            Measure political, emotional and narrative bias.
          </p>
        </motion.div>

        <motion.div className={styles.featureCard} variants={cardVariants}>
          <div className={styles.cardIcon}>
            {/* Sparkles Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"></path>
              <path d="M5 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"></path>
            </svg>
          </div>
          <h3 className={styles.cardTitle}>Explainable Verdict</h3>
          <p className={styles.cardDesc}>
            Generate transparent reasoning instead of black-box predictions.
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.productionBtnWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <button 
          className={styles.productionBtn}
          onClick={() => setShowProdModal(true)}
        >
          Production Preview
        </button>
      </motion.div>

      <AnimatePresence>
        {showProdModal && (
          <div className={styles.prodModalOverlay}>
            <motion.div
              className={styles.prodModalContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                duration: 0.4
              }}
              role="dialog"
              aria-modal="true"
            >
              <h2 className={styles.prodModalTitle}>VERITAS Analysis Engine</h2>
              <div className={styles.prodModalBody}>
                <p>The public website currently demonstrates the product architecture.</p>
                <p>
                  Live document processing,<br />
                  claim verification,<br />
                  reasoning modules,<br />
                  and AI-powered evidence analysis<br />
                  remain available only inside the production environment.
                </p>
                <p>Thank you for exploring VERITAS.</p>
              </div>
              <button 
                className={styles.prodModalBtn}
                onClick={() => setShowProdModal(false)}
                autoFocus
              >
                Return
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
