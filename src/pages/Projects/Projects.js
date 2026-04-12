import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeLeft, fadeRight, APPLE_EASE } from '../../constants/animations';
import './Projects.css';

const IPhoneMock = ({ project }) => (
  <div className="iphone-mock">
    <div className="iphone-frame">
      <div className="iphone-notch" aria-hidden="true" />
      <div className="iphone-screen">
        <AnimatePresence mode="wait">
          <motion.img
            key={project.id}
            src={project.mockImage}
            alt={project.title}
            className="iphone-app"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
          />
        </AnimatePresence>
      </div>
    </div>
  </div>
);

// Props renomeadas para maior clareza: index → activeIndex, setIndex → setActiveIndex, openProject → onOpenProject
const Projects = ({ title, projects, activeIndex, setActiveIndex, onOpenProject }) => {
  if (!projects?.length) return null;

  return (
    <div className="projects-section">
      <div className="projects-grid">
        <motion.div className="projects-text" {...fadeLeft}>
          <h2>{title}</h2>
          <div className="projects-list">
            {projects.map((project, i) => (
              <div
                key={project.id}
                className={`project-item ${activeIndex === i ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => onOpenProject(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onOpenProject(i)}
              >
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="projects-visual" {...fadeRight}>
          <IPhoneMock project={projects[activeIndex]} />
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
