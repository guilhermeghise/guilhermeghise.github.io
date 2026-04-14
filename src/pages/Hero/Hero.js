import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { fadeUp, APPLE_EASE } from '../../constants/animations';
import './Hero.css';



// Adicionei 't' como prop, que seria translations[currentLang].hero
const Hero = ({ t }) => (
  <div className="hero">
    <div className="hero-content">
      <motion.h1 {...fadeUp}>
        Guilherme Ghise
      </motion.h1>

      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: APPLE_EASE }}
      >
        {t.tagline}
      </motion.p>
    </div>

    <div className="hero-bottom">
      <motion.div
        className="hero-footer-tags"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        {/* Agora os spans usam as chaves do objeto de tradução */}
        <span>{t.role1}</span>
        <span>{t.role2}</span>
      </motion.div>

      <motion.div
        className="scroll-hint"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      >
        <ChevronDown size={24} strokeWidth={1.2} />
      </motion.div>
    </div>
  </div>
);

export default Hero;