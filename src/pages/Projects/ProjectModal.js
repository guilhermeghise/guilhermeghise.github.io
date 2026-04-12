import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { APPLE_EASE } from '../../constants/animations';
import './ProjectModal.css';
import { QRCodeSVG } from 'qrcode.react';

// ── Sub-componentes ─────────────────────────────────────────────

const AppQRCode = ({ url, theme }) => (
  <div className="app-qr-wrapper">
    <div className="qr-container">
      <QRCodeSVG
        value={url}
        size={80}
        bgColor={"transparent"}
        fgColor={theme === 'dark' ? "#FFFFFF" : "#000000"}
        level={"M"}
        marginSize={0}
      />
    </div>
    <span className="qr-caption">Scan to download</span>
  </div>
);

const AppStoreButton = ({ url }) => (
  <a href={url} target="_blank" rel="noreferrer" className="appstore-button">
    <svg className="appstore-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
    <span className="appstore-text">
      <span className="appstore-label">Download on the</span>
      <span className="appstore-store">App Store</span>
    </span>
  </a>
);

const MediaCard = ({ item }) => (
  <div className="media-vertical-card">
    {item.type === 'video' ? (
      <video src={item.src} className="card-media-content" autoPlay loop muted playsInline />
    ) : (
      <img src={item.src} alt="App screenshot" className="card-media-content" />
    )}
    <div className="card-glass-overlay" />
    {item.type === 'video' && (
      <div className="media-video-badge">
        <Play size={10} className="play-icon" />
      </div>
    )}
  </div>
);

const TeamCard = ({ member }) => (
  <a
    href={member.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    className="team-card"
  >
    <div className="team-card-top">
      <span className="member-name">{member.name}</span>
      <span className="member-arrow">↗</span>
    </div>
    <span className="member-role-badge" data-role={member.role.toLowerCase()}>
      {member.role}
    </span>
  </a>
);

// ── Modal principal ─────────────────────────────────────────────

const ProjectModal = ({ projects, initialIndex, onClose, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollAreaRef = useRef(null);

  // 1. Reset scroll ao mudar de projeto
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  // 2. Trava o scroll da página de fundo (body) enquanto o modal tá aberto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);

  if (!projects?.length) return null;

  const project   = projects[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;

  const goTo = (index) => setCurrentIndex(index);

  const accentOpacity = theme === 'light' ? '55' : '22';
  const accentStyle   = {
    background: `linear-gradient(135deg, ${project.accent}${accentOpacity} 0%, transparent 60%)`,
  };

  return (
    <motion.div
      className="project-modal-overlay"
      data-theme={theme}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: APPLE_EASE }}
      >
        <nav className="project-modal-nav">
          <div className="nav-left">
            <button className="nav-back-button" onClick={onClose}>
              <ChevronLeft size={18} />
              <span>Back</span>
            </button>
          </div>

          <div className="nav-center">
            <button className="nav-arrow" onClick={() => canGoPrev && goTo(currentIndex - 1)} disabled={!canGoPrev}>
              <ChevronLeft size={16} />
            </button>
            <span className="nav-project-title">{project.title}</span>
            <button className="nav-arrow" onClick={() => canGoNext && goTo(currentIndex + 1)} disabled={!canGoNext}>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="nav-right">
            <button className="nav-btn-icon close-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </nav>

        {/* ÁREA DE SCROLL LIVRE */}
        <div className="project-modal-scroll-area" ref={scrollAreaRef}>
          
          {/* Seção Hero: Aparece com fadeUp assim que o modal abre */}
          <motion.div 
            className="project-section section-hero"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: APPLE_EASE }}
          >
            <div className="hero-bg" style={accentStyle} />
            <div className="hero-noise" />

            <div className="hero-content">
              <div className="hero-icon-wrap">
                <img src={project.logo} alt={project.title} className="hero-icon" />
              </div>
              <h1 className="hero-app-title">{project.title}</h1>
              <p className="hero-app-desc">{project.fullDesc}</p>

              <div className="hero-tech-pills">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-pill" style={{ color: project.accent, borderColor: `${project.accent}44`, background: `${project.accent}11` }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="hero-get-app">
                <AppStoreButton url={project.appStoreUrl} />
                <AppQRCode url={project.appStoreUrl} theme={theme} />
              </div>
            </div>
          </motion.div>

          {/* Seção Details: Aparece conforme você scrolla para baixo */}
          <motion.div 
            className="project-section section-details"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: APPLE_EASE }}
          >
            <div className="details-inner">
              {project.media?.length > 0 && (
                <div className="carousel-section">
                  <span className="section-label">Screenshots</span>
                  <div className="media-cards-container">
                    {project.media.map((item, i) => (
                      <MediaCard key={i} item={item} />
                    ))}
                  </div>
                </div>
              )}

              {project.team?.length > 0 && (
                <div className="info-grid">
                  <div className="team-block">
                    <span className="section-label">Team</span>
                    <div className="team-column-layout">
                      {project.team.map((member, i) => (
                        <TeamCard key={i} member={member} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;