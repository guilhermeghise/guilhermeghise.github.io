import React from 'react';
import { motion } from 'framer-motion';
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

const About = ({ lang, title, fotoAbout }) => (
  <div className="about-section">
    <div className="about-grid">
      <motion.div className="about-text" {...fadeLeft}>
        <h2>{title}</h2>
        <div className="about-text-block">{CONTENT[lang]}</div>
      </motion.div>

      <motion.div className="about-visual" {...fadeRight}>
        <div className="profile-wrapper">
          <img src={fotoAbout} alt="Guilherme Ghise" className="profile-image" />
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
