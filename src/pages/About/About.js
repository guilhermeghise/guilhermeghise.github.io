import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeLeft, fadeRight } from '../../constants/animations';
import './About.css';

const Highlight = ({ children }) => (
  <span className="highlight">{children}</span>
);

const CONTENT = {
  en: (
    <>
      <p>
        I'm an <Highlight>iOS developer</Highlight> and Software Engineering
        student at <Highlight>PUCRS</Highlight>, currently part of the{' '}
        <Highlight>Apple Developer Academy</Highlight>.
      </p>
      <p>
        I focus on building thoughtful, high-quality apps using Swift and modern
        Apple technologies.
      </p>
      <p className="about-cta">Scroll down to see my projects.</p>
    </>
  ),
  pt: (
    <>
      <p>
        Sou <Highlight>desenvolvedor iOS</Highlight> e estudante de Engenharia
        de Software na <Highlight>PUCRS</Highlight>, na{' '}
        <Highlight>Apple Developer Academy</Highlight>.
      </p>
      <p>
        Crio aplicativos com Swift e tecnologias Apple, focando em experiências
        intuitivas.
      </p>
      <p className="about-cta">Role para baixo para ver meus projetos.</p>
    </>
  ),
};

// Auto-flip interval in milliseconds
const FLIP_INTERVAL = 4000;

const About = ({ lang, t, fotoAbout, memoji }) => {
  const [flipped, setFlipped] = useState(false);

  // Auto-flip every FLIP_INTERVAL ms
  useEffect(() => {
    const timer = setInterval(() => {
      setFlipped(prev => !prev);
    }, FLIP_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="about-section">
      <div className="about-grid">
        <motion.div className="about-text" {...fadeLeft}>
          <h2>{t.title}</h2>
          <div className="about-text-block">{CONTENT[lang]}</div>
        </motion.div>

        <motion.div className="about-visual" {...fadeRight}>
          {/* Flip card */}
          <div
            className={`flip-card${flipped ? ' flipped' : ''}`}
            onClick={() => setFlipped(prev => !prev)}
            title="Click to flip"
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setFlipped(prev => !prev)}
            aria-label="Toggle between photo and Memoji"
          >
            <div className="flip-card-inner">
              {/* Front: real photo */}
              <div className="flip-card-front">
                <div className="profile-wrapper">
                  <img src={fotoAbout} alt="Guilherme Ghise" className="profile-image" />
                </div>
              </div>

              {/* Back: Memoji */}
              <div className="flip-card-back">
                <div className="profile-wrapper memoji-wrapper">
                  {memoji
                    ? <img src={memoji} alt="Memoji" className="profile-image memoji-image" />
                    : <span className="memoji-placeholder">🧑‍💻</span>
                  }
                </div>
              </div>
            </div>

            {/* Subtle hint */}
            <span className="flip-hint">
  {flipped ? t.flipBack : t.flipFront}
</span>
          </div>
        </motion.div>
      </div>

      <div className="scroll-hint about-scroll-hint" aria-hidden="true">
        <ChevronDown size={24} strokeWidth={1.2} />
      </div>
    </div>
  );
};

export default About;
