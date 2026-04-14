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
import SplashScreen from './SplashScreen';

import { useTheme, useLang } from '../hooks/useSettings';
import { translations } from '../constants/translations';
import { projects } from '../data';
import fotoAbout from '../assets/foto-about.jpeg';
import memoji from '../assets/memoji.svg';
import './App.css';

function Home() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  const t = translations[lang];

  // Mescla desc/fullDesc traduzidos nos projetos
  const translatedProjects = projects.map((p) => ({
    ...p,
    desc:     t.projects.items[p.slug]?.desc     ?? p.desc,
    fullDesc: t.projects.items[p.slug]?.fullDesc ?? p.fullDesc,
  }));

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
          <Hero t={t.hero} />
        </section>

        <section ref={sectionRefs.about}>
        <About lang={lang} t={t.about} fotoAbout={fotoAbout} memoji={memoji} />
        </section>

        <section ref={sectionRefs.projects}>
          <Projects
            title={t.projects.title}
            projects={translatedProjects}
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
              projects={translatedProjects}
              initialIndex={selectedProjectIndex}
              onClose={() => setSelectedProjectIndex(null)}
              theme={theme}
              tModal={t.projects.modal}
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