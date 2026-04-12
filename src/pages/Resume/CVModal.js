import React from 'react';
import { motion } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';
import { APPLE_EASE } from '../../constants/animations';
import './CVModal.css';

const CVModal = ({ onClose, lang }) => {
  const title =
    lang === 'en'
      ? 'Resume — Guilherme Ghise'
      : 'Currículo — Guilherme Ghise';

  return (
    <motion.div
      className="cv-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cv-modal-content"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.35, ease: APPLE_EASE }}
      >
        <div className="cv-modal-header">
          <div className="cv-modal-title">
            <FileText size={18} />
            <span>{title}</span>
          </div>

          <div className="cv-modal-actions">
            <a
              href="/resume.pdf"
              download
              className="cv-action-btn download-btn"
              aria-label="Download CV"
            >
              <Download size={18} />
            </a>
            <button
              onClick={onClose}
              className="cv-action-btn close-btn"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="cv-viewer-container">
          <iframe
            src="/resume.pdf#toolbar=0"
            title="CV"
            className="cv-iframe"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CVModal;
