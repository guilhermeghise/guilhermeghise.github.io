import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeUp, APPLE_EASE } from '../../constants/animations';
import './Hero.css';

const Hero = ({ tagline }) => (
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
        {tagline}
      </motion.p>
    </div>

    {/* Tags movidas para quase o rodapé */}
    <motion.div 
      className="hero-footer-tags"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }} 
    >
      <span>iOS Developer</span>
      <span>Software Engineer</span>
    </motion.div>

    <div className="scroll-hint" aria-hidden="true">
      <ChevronDown size={24} strokeWidth={1.2} />
    </div>
  </div>
);

export default Hero;