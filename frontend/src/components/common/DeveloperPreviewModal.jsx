import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DeveloperPreviewModal.css';

export default function DeveloperPreviewModal() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasSeenPreview = localStorage.getItem('veritas-preview');
    if (!hasSeenPreview) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const handleClose = () => {
    localStorage.setItem('veritas-preview', 'true');
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <div className="dp-modal-overlay">
          <motion.div
            className="dp-modal-container"
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
            aria-labelledby="dp-modal-title"
          >
            <div className="dp-modal-content">
              <h2 id="dp-modal-title" className="dp-modal-title">
                VERITAS<br/>Developer Preview
              </h2>
              <div className="dp-modal-body">
                <p>VERITAS is presented as a public engineering preview.</p>
                <p>
                  This experience showcases the architecture,<br />
                  research methodology,<br />
                  explainability pipeline,<br />
                  and product vision behind the platform.
                </p>
                <p>
                  Interactive AI analysis capabilities continue<br />
                  to evolve within the production environment.
                </p>
                <p>
                  Everything you see represents the real product<br />
                  direction and engineering philosophy.
                </p>
              </div>
              <p className="dp-modal-caption">Version 1.0 • Developer Preview</p>
              <button
                className="dp-modal-btn"
                onClick={handleClose}
                autoFocus
              >
                Continue
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
