import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { fadeLeft, fadeRight } from '../../constants/animations';
import './Contact.css';

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/guilhermeghise',   icon: <FaGithub size={20} /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/guilhermeghise', icon: <FaLinkedin size={20} /> },
];

const Contact = ({ t, openCV }) => (
  <div className="contact-section">
    <div className="contact-grid">

      <motion.h2 className="contact-title" {...fadeLeft}>
        {t.title}
      </motion.h2>

      <motion.div className="contact-right" {...fadeRight}>
        <span className="contact-links-label">{t.findMeOn}</span>
        <div className="contact-social-links">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className="social-button">
              {icon}
              <span>{label}</span>
            </a>
          ))}
          <button onClick={openCV} className="social-button resume">
            <FileText size={20} />
            <span>{t.cv}</span>
          </button>
        </div>
      </motion.div>

    </div>
  </div>
);

export default Contact;
