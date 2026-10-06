import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Projects.css';

const Projects = ({ t, projects, onOpenProject }) => {
  if (!projects?.length) return null;

  return (
    <div className="projects-section">
      <div className="projects-inner">
        <header className="projects-heading">
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
        </header>
        <div className="projects-banners">
          {projects.map((project, i) => (
            <article key={project.id} className="project-banner"
              style={{ '--project-accent': project.accent }}>
              <div className="project-banner-art" aria-hidden="true">
                <img src={project.logo} alt="" loading="lazy" decoding="async" width="120" height="120" />
              </div>
              <div className="project-banner-content">
                <div className="project-banner-identity">
                  <img className="project-banner-logo" src={project.logo} alt="" loading="lazy" width="56" height="56" />
                  <div>
                    <span className="project-banner-category">{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                </div>
                <p className="project-banner-tagline">{project.desc}</p>
                <p className="project-banner-summary">{project.summary}</p>
                <ul className="project-banner-technologies" aria-label={t.technologies}>
                  {project.technologies.map(tech => <li key={tech}>{tech}</li>)}
                </ul>
                <button className="project-banner-action" onClick={() => onOpenProject(i)}
                  aria-label={`${t.openProject}: ${project.title}`}>
                  {t.openProject}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
