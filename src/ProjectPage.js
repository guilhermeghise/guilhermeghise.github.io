import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from './data';
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProjectPage.css';

const appleEase = [0.22, 1, 0.36, 1];

function AppStoreButton({ url }) {
  if (!url) return null;

  return (
    <a href={url} target="_blank" rel="noreferrer" className="appstore-button">
      <svg className="appstore-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
      <div className="appstore-text">
        <span className="appstore-label">Download on the</span>
        <span className="appstore-store">App Store</span>
      </div>
    </a>
  );
}

function MediaCarousel({ media, accent }) {
  return (
    <div className="media-cards-container">
      {media.map((item, i) => (
        <motion.div
          key={i}
          className="media-vertical-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: appleEase }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, zIndex: 10 }}
        >
          {item.type === 'video' ? (
            <video 
              src={item.src} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="card-media-content" 
            />
          ) : (
            <img 
              src={item.src} 
              alt="" 
              className="card-media-content" 
            />
          )}
          {item.type === 'video' && (
            <span className="media-video-badge" style={{ background: accent }}>▶</span>
          )}
          <div className="card-glass-overlay" />
        </motion.div>
      ))}
    </div>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  const section2Ref = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!project) {
    return (
      <div className="error-page">
        <p>Projeto não encontrado.</p>
        <Link to="/#projects" className="nav-back-button"><ChevronLeft size={20} /> Voltar</Link>
      </div>
    );
  }

  const accent = project.accent || '#0A84FF';
  const mocks = [...(project.media || [])].slice(0, Math.max(4, project.media?.length ?? 0));
  while (mocks.length < 4) {
    mocks.push({ type: 'image', src: `https://via.placeholder.com/250x540/1c1c1e/2c2c2e?text=` });
  }

  return (
    <div className="project-page-container">
      <nav className="project-nav">
        <Link to="/#projects" className="nav-back-button">
          <ChevronLeft size={22} strokeWidth={2.5} />
          <span>PROJECTS</span>
        </Link>
      </nav>

      {/* ════ SEÇÃO 1 — HERO ════ */}
      <section className="project-section section-hero">
        <div className="hero-bg" style={{ background: `radial-gradient(ellipse at 50% -10%, ${accent}60 0%, ${accent}20 45%, transparent 72%)` }} />
        <div className="hero-noise" />
        
        <motion.div className="hero-content" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: appleEase }}>
          {project.logo && (
            <div className="hero-icon-wrap">
              <img src={project.logo} alt={project.title} className="hero-icon" />
            </div>
          )}
          <h1 className="hero-app-title">{project.title}</h1>
          <p className="hero-app-desc">{project.shortDesc}</p>
          <AppStoreButton url={project.appStoreUrl} />
        </motion.div>
        
        <button className="scroll-hint" onClick={() => section2Ref.current?.scrollIntoView({ behavior: 'smooth' })}>
          <ChevronDown size={28} strokeWidth={1.5} />
        </button>
      </section>

      {/* ════ SEÇÃO 2 — CONTEÚDO ════ */}
      <section ref={section2Ref} className="project-section section-details">
        <div className="details-inner">
          <motion.div 
            className="carousel-section" 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.9, ease: appleEase }} 
            viewport={{ once: true }}
          >
            <MediaCarousel media={mocks} accent={accent} />
          </motion.div>

          <div className="info-grid">
            <motion.div 
              className="vision-block" 
              initial={{ opacity: 0, x: -20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.1, ease: appleEase }} 
              viewport={{ once: true }}
            >
              <span className="section-label">About the project</span>
              <p className="vision-text">{project.fullDesc}</p>
              <div className="tech-pills">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-pill" style={{ background: `${accent}18`, color: accent, borderColor: `${accent}40` }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="team-block" 
              initial={{ opacity: 0, x: 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: appleEase }} 
              viewport={{ once: true }}
            >
              <span className="section-label">Team</span>
              <div className="team-column-layout">
                {project.team.map((member, i) => (
                  <a key={i} href={member.linkedin} target="_blank" rel="noreferrer" className="team-card">
                    <div className="team-card-top">
                      <span className="member-name">{member.name}</span>
                      <span className="member-arrow">↗</span>
                    </div>
                    <span className="member-role-badge" data-role={member.role.toLowerCase()}>{member.role}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectPage;