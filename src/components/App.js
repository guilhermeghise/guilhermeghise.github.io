import React, { lazy, Suspense, useState, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence, MotionConfig, useReducedMotion } from 'framer-motion';

import Navbar from '../pages/Navbar/Navbar';
import Hero from '../pages/Hero/Hero';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';

import { useTheme, useLang } from '../hooks/useSettings';
import { translations } from '../constants/translations';
import { projects } from '../data';
import fotoAbout from '../assets/foto-about.webp';
import './App.css';

const ProjectModal = lazy(() => import('../pages/Projects/ProjectModal'));
const CVModal = lazy(() => import('../pages/Resume/CVModal'));

function Home() {
  const reduceMotion = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLang();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const t = translations[lang];

  // Mescla desc/fullDesc traduzidos nos projetos
  const translatedProjects = projects.map((p) => ({
    ...p,
    desc:     t.projects.items[p.slug]?.desc     ?? p.desc,
    fullDesc: t.projects.items[p.slug]?.fullDesc ?? p.fullDesc,
    summary:  t.projects.items[p.slug]?.summary,
    category: t.projects.items[p.slug]?.category,
  }));

  const sectionRefs = {
    hero:     useRef(null),
    about:    useRef(null),
    projects: useRef(null),
    contact:  useRef(null),
  };

  const scrollTo = (id) =>
    sectionRefs[id]?.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });

  return (
    <>

      <main className="portfolio-container">
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
        <About lang={lang} t={t.about} fotoAbout={fotoAbout} />
        </section>

        <section ref={sectionRefs.projects}>
          <Projects
            t={t.projects}
            projects={translatedProjects}
            onOpenProject={(i) => setSelectedProjectIndex(i)}
          />
        </section>

        <section ref={sectionRefs.contact}>
          <Contact t={t.contact} openCV={() => setIsCVModalOpen(true)} />
        </section>

        <AnimatePresence>
          {selectedProjectIndex !== null && (
            <Suspense key="project-modal" fallback={null}>
              <ProjectModal
                projects={translatedProjects}
                initialIndex={selectedProjectIndex}
                onClose={() => setSelectedProjectIndex(null)}
                theme={theme}
                tModal={t.projects.modal}
              />
            </Suspense>
          )}
          {isCVModalOpen && (
            <Suspense key="cv-modal" fallback={null}>
              <CVModal onClose={() => setIsCVModalOpen(false)} lang={lang} />
            </Suspense>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Home />
      </Router>
    </MotionConfig>
  );
}
