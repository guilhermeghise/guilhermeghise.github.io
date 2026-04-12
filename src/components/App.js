import React, { useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from '../pages/Navbar/Navbar';
import Hero from '../pages/Hero/Hero';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import ProjectModal from '../pages/Projects/ProjectModal';
import CVModal from '../pages/Resume/CVModal';
import CustomCursor from './CustomCursor';
import SplashScreen from './SplashScreen';

import { useTheme, useLang } from '../hooks/useSettings';
import { translations } from '../constants/translations';
import { projects } from '../data';
import fotoAbout from '../assets/foto-about.jpeg';
import './App.css';

function Home() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const t = translations[lang];

  const sectionRefs = {
    hero:     useRef(null),
    about:    useRef(null),
    projects: useRef(null),
    contact:  useRef(null),
  };

  const scrollTo = (id) =>
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      <div className="portfolio-container">
        <Navbar
          t={t.nav}
          lang={lang}
          theme={theme}
          toggleLang={toggleLang}
          toggleTheme={toggleTheme}
          scrollTo={scrollTo}
        />

        <section ref={sectionRefs.hero}>
          <Hero tagline={t.hero.tagline} />
        </section>

        <section ref={sectionRefs.about}>
          <About lang={lang} title={t.about.title} fotoAbout={fotoAbout} />
        </section>

        <section ref={sectionRefs.projects}>
          <Projects
            title={t.projects.title}
            projects={projects}
            activeIndex={activeProjectIndex}
            setActiveIndex={setActiveProjectIndex}
            onOpenProject={(i) => setSelectedProjectIndex(i)}
          />
        </section>

        <section ref={sectionRefs.contact}>
          <Contact t={t.contact} openCV={() => setIsCVModalOpen(true)} />
        </section>

        <AnimatePresence>
          {selectedProjectIndex !== null && (
            <ProjectModal
              projects={projects}
              initialIndex={selectedProjectIndex}
              onClose={() => setSelectedProjectIndex(null)}
              theme={theme}
            />
          )}
          {isCVModalOpen && (
            <CVModal onClose={() => setIsCVModalOpen(false)} lang={lang} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}