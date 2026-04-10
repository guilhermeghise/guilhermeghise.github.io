import React, { useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  X,
  Download
} from 'lucide-react';
import { projects } from './data';
import ProjectPage from './ProjectPage';
import ContactForm from './ContactForm';
import './App.css';

import foodSwapMock from './assets/foodswap1.svg';
import coffeeOveflowMock from './assets/coffee-overflow1.jpg';
import glyptisMock from './assets/glyptis1.svg';
import zoomiesMock from './assets/zoomies1.svg';
import fotoAbout from './assets/foto-about.jpeg';

const appleEase = [0.22, 1, 0.36, 1];

function Home() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  const handleNext = useCallback(() => setIndex((prev) => (prev + 1) % projects.length), []);
  const handlePrev = useCallback(() => setIndex((prev) => (prev - 1 + projects.length) % projects.length), []);

  const getOffset = (i) => {
    const n = projects.length;
    let diff = i - index;
    if (diff > Math.floor(n / 2)) diff -= n;
    if (diff < -Math.floor(n / 2)) diff += n;
    return diff;
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => scrollTo(heroRef)}>HOME</button>
          <button onClick={() => scrollTo(aboutRef)}>ABOUT</button>
          <button onClick={() => scrollTo(projectsRef)}>PROJECTS</button>
          <button onClick={() => scrollTo(contactRef)}>CONTACT</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.2, ease: appleEase }}
          style={{ marginBottom: '8px' }}
        >
          Guilherme Ghise
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: appleEase }}
          className="hero-tagline"
        >
          Thinking beyond code to solve real problems
        </motion.p>
        <div className="scroll-hint">
          <ChevronDown size={28} strokeWidth={1.5} />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef}>
        <div className="about-grid">
          <motion.div 
            className="about-text" 
            initial={{ opacity: 0, x: -60 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1.2, ease: appleEase }}
          >
            <h2>About Me</h2>
            <p>
              I'm a software engineer and app developer dedicated to crafting 
              refined digital experiences within the Apple ecosystem. 
              Currently focusing on SwiftUI and modern architecture.
            </p>
          </motion.div>
          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
          >
            <div className="profile-wrapper">
              <img src={fotoAbout} alt="Guilherme Ghise" className="profile-image" />
              <div className="profile-glass-glare"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{ fontSize: '2.5rem', marginBottom: '40px', fontWeight: 700 }}>
          My Projects
        </motion.h2>
        <div className="carousel-wrapper">
          <button className="carousel-button btn-left" onClick={handlePrev}><ChevronLeft size={28}/></button>
          <div className="carousel-track">
            {projects.map((project, i) => {
              const offset = getOffset(i);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let displayImage = project.mockImage;
              if (project.slug === 'food-swap') displayImage = foodSwapMock;
              if (project.slug === 'coffee-overflow') displayImage = coffeeOveflowMock;
              if (project.slug === 'glyptis') displayImage = glyptisMock;
              if (project.slug === 'zoomies') displayImage = zoomiesMock;

              const handleCardClick = () => {
                if (isCenter) navigate(`/projeto/${project.slug}`);
                else if (isLeft) handlePrev();
                else if (isRight) handleNext();
              };

              // Calcula x em pixels: cards adjacentes a ±370px, cards mais distantes ficam ocultos
              const getXPosition = () => {
                if (offset === 0) return 0;
                if (offset === -1) return -370;
                if (offset === 1) return 370;
                return offset > 0 ? 700 : -700;
              };

              return (
                <motion.div
                  key={project.id}
                  className="project-card"
                  onClick={handleCardClick}
                  animate={{
                    x: getXPosition(),
                    scale: isCenter ? 1 : 0.85,
                    zIndex: isCenter ? 10 : 5,
                    filter: isCenter ? 'brightness(1)' : 'brightness(0.4)',
                    opacity: Math.abs(offset) <= 1 ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, ease: appleEase }}
                >
                  {displayImage && <img src={displayImage} alt="" className="card-bg-image" />}
                  <div className="card-overlay-content"><p>{project.desc}</p></div>
                </motion.div>
              );
            })}
          </div>
          <button className="carousel-button btn-right" onClick={handleNext}><ChevronRight size={28}/></button>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact-section">
        <motion.div className="contact-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className="contact-title">Want to talk about an idea or project?</h2>
          <div className="contact-social-links">
            <a href="https://github.com/guilhermeghise" target="_blank" rel="noreferrer" className="social-button">
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/guilhermeghise" target="_blank" rel="noreferrer" className="social-button">
              <span>LinkedIn</span>
            </a>
            <button onClick={() => setIsModalOpen(true)} className="social-button resume">
              <FileText size={20} strokeWidth={1.5} />
              <span>View CV</span>
            </button>
          </div>
        </motion.div>
        <ContactForm />
      </section>

      {/* Modal do Currículo */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="cv-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="cv-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cv-modal-header">
                <div className="cv-modal-title">
                  <FileText size={18} />
                  <span>Resume - Guilherme Ghise</span>
                </div>
                <div className="cv-modal-actions">
                  <a 
                    href="/resume.pdf" 
                    download="Resume - Guilherme Ghise.pdf"
                    className="cv-action-btn download-btn"
                  >
                    <Download size={18} />
                    <span>Download</span>
                  </a>
                  <button onClick={() => setIsModalOpen(false)} className="cv-action-btn close-btn">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="cv-viewer-container">
                <iframe 
                  src="/resume.pdf#toolbar=0" 
                  title="Curriculum Vitae"
                  className="cv-iframe"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projeto/:slug" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;