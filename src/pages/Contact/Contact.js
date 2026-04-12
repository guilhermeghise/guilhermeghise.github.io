import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { fadeLeft, fadeRight } from '../../constants/animations';
import ContactForm from '../../components/ContactForm';
import './Contact.css';

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/guilhermeghise',   icon: <FaGithub size={20} /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/guilhermeghise', icon: <FaLinkedin size={20} /> },
];

const Contact = ({ t, openCV }) => (
  <div className="contact-section">
    <div className="contact-grid">
      <motion.div className="contact-left" {...fadeLeft}>
        <h2>{t.title}</h2>
        {/* Passando as traduções do form aqui */}
        <ContactForm t={t.form} /> 
      </motion.div>
      
      <motion.div className="contact-right" {...fadeRight}>
        <span className="contact-links-label">Find me on</span>
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