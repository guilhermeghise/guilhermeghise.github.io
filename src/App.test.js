import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { projects } from './data';
import ProjectPage from './ProjectPage';
import './App.css';

// Imports dos mocks
import foodSwapMock from './assets/foodswap1.png';
import coffeeOveflowMock from './assets/coffee-overflow1.jpg';

// Foto do About
import aboutPhoto from './assets/photo-about.jpeg';

const appleEase = [0.22, 1, 0.36, 1];

function Home() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (location.hash === '#projects' && projectsRef.current) {
      setTimeout(() => {
        projectsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleNext = useCallback(
    () => setIndex((prev) => (prev + 1) % projects.length),
    []
  );

  const handlePrev = useCallback(
    () => setIndex((prev) => (prev - 1 + projects.length) % projects.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

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
          <button onClick={() => scrollTo(heroRef)}>Home</button>
          <button onClick={() => scrollTo(aboutRef)}>About</button>
          <button onClick={() => scrollTo(projectsRef)}>Projects</button>
          <button onClick={() => scrollTo(contactRef)}>Contact</button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="hero">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: appleEase }}
        >
          Guilherme Ghise
        </motion.h1>

        <div className="scroll-hint">
          <ChevronDown size={28} strokeWidth={1.5} />
        </div>
      </section>

      {/* ABOUT */}
      <section ref={aboutRef}>
        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
          >
            <h2>About me</h2>
            <p>
              I'm a software engineer and app developer dedicated to crafting
              refined digital experiences within the Apple ecosystem. Currently
              focusing on Swift UI and modern architecture to build intuitive
              and high-performance applications.
            </p>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase }}
          >
            <motion.div
              className="about-photo-container"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img src={aboutPhoto} alt="About Guilherme" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={projectsRef} id="projects">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ fontSize: '2.5rem', marginBottom: '10px' }}
        >
          Meus Apps
        </motion.h2>

        <div className="carousel-wrapper">
          <button className="carousel-button btn-left" onClick={handlePrev}>
            <ChevronLeft size={28} strokeWidth={1.5} />
          </button>

          <div className="carousel-track">
            {projects.map((project, i) => {
              const offset = getOffset(i);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let displayImage = project.mockImage;
              if (project.slug === 'food-swap') displayImage = foodSwapMock;
              if (project.slug === 'coffee-overflow')
                displayImage = coffeeOveflowMock;

              const handleCardClick = () => {
                if (isCenter) navigate(`/projeto/${project.slug}`);
                else if (isLeft) handlePrev();
                else if (isRight) handleNext();
              };

              let xPosition,
                scaleValue,
                zIndexValue,
                brightnessValue,
                opacityValue;

              if (isCenter) {
                xPosition = '0%';
                scaleValue = 1;
                zIndexValue = 10;
                brightnessValue = 1;
                opacityValue = 1;
              } else if (isLeft) {
                xPosition = '-115%';
                scaleValue = 0.82;
                zIndexValue = 5;
                brightnessValue = 0.45;
                opacityValue = 1;
              } else if (isRight) {
                xPosition = '115%';
                scaleValue = 0.82;
                zIndexValue = 5;
                brightnessValue = 0.45;
                opacityValue = 1;
              } else {
                xPosition = offset > 0 ? '230%' : '-230%';
                scaleValue = 0.65;
                zIndexValue = 1;
                brightnessValue = 0;
                opacityValue = 0;
              }

              return (
                <motion.div
                  key={project.id}
                  className="iphone-frame"
                  onClick={handleCardClick}
                  style={{
                    cursor: 'pointer',
                    pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto',
                  }}
                  animate={{
                    x: xPosition,
                    scale: scaleValue,
                    zIndex: zIndexValue,
                    filter: `brightness(${brightnessValue})`,
                    opacity: opacityValue,
                  }}
                  transition={{ duration: 0.65, ease: appleEase }}
                >
                  {displayImage && (
                    <img
                      src={displayImage}
                      alt=""
                      className="iphone-background-image"
                    />
                  )}

                  <div
                    className={`iphone-content ${
                      displayImage ? 'with-overlay' : ''
                    }`}
                  >
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button className="carousel-button btn-right" onClick={handleNext}>
            <ChevronRight size={28} strokeWidth={1.5} />
          </button>
        </div>

        <div className="carousel-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section ref={contactRef}>
        <motion.h2
          className="contact-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: appleEase }}
        >
          Quer conversar comigo?
        </motion.h2>
      </section>
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