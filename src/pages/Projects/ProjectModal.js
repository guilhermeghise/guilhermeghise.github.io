import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { APPLE_EASE } from '../../constants/animations';
import './ProjectModal.css';

const TeamCard = ({ member }) => (
  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card">
    <span className="member-name">{member.name}</span>
    <span className="member-role-badge" data-role={member.role.toLowerCase()}>{member.role}</span>
    <span className="member-arrow" aria-hidden="true">↗</span>
  </a>
);

const ProjectGallery = ({ media, title, accent, label, tModal, onPreview }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];
  const imageLabel = `${title} screenshot ${activeIndex + 1}`;

  const move = (direction) => {
    setActiveIndex((index) => (index + direction + media.length) % media.length);
  };

  return (
    <div className="project-gallery" style={{ '--project-accent': accent }}>
      <div className="project-gallery-heading">
        <span className="section-label">{label}</span>
      </div>

      <div className="project-carousel-stage">
        <button
          className="project-media-button"
          onClick={() => onPreview(activeMedia)}
          aria-label={`${tModal.openImage || 'Open image'}: ${imageLabel}`}
        >
          <motion.img
            key={activeMedia.src}
            src={activeMedia.src}
            alt={imageLabel}
            className="project-carousel-image"
            loading="eager"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <span className="project-media-zoom" aria-hidden="true">⌕</span>
        </button>
      </div>

      <div className="project-carousel-controls">
        <button
          className="project-carousel-arrow"
          onClick={() => move(-1)}
          aria-label={tModal.previousScreenshot || 'Previous screenshot'}
        >
          <ChevronLeft size={16} />
        </button>
        <div className="project-carousel-dots">
          {media.map((item, index) => (
            <button
              key={item.src}
              className={`project-carousel-dot${index === activeIndex ? ' active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`${tModal.openImage || 'Open image'} ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
        <button
          className="project-carousel-arrow"
          onClick={() => move(1)}
          aria-label={tModal.nextScreenshot || 'Next screenshot'}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const ProjectModal = ({ projects, initialIndex, onClose, theme, tModal }) => {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [previewMedia, setPreviewMedia] = useState(null);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    scrollAreaRef.current?.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    setPreviewMedia(null);
  }, [currentIndex, reduceMotion]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);

  useEffect(() => {
    if (!previewMedia) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setPreviewMedia(null);
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [previewMedia]);

  if (!projects?.length) return null;

  const project = projects[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;
  const projectNumber = String(currentIndex + 1).padStart(2, '0');
  const totalProjects = String(projects.length).padStart(2, '0');

  return (
    <motion.div
      className="project-modal-overlay"
      data-theme={theme}
      style={{ '--project-accent': project.accent, '--project-accent-soft': `${project.accent}22` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal-container"
        onClick={(event) => event.stopPropagation()}
        initial={{ y: 28, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 28, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: APPLE_EASE }}
      >
        <nav className="project-modal-nav">
          <div className="modal-context">
            <span className="modal-context-label">{tModal.project || 'PROJECT'}</span>
            <span aria-hidden="true">/</span>
            <span>{projectNumber}</span>
          </div>

          <div className="modal-nav-actions">
            <button
              className="nav-btn-icon"
              onClick={() => setCurrentIndex(currentIndex - 1)}
              disabled={!canGoPrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="modal-counter">{projectNumber} / {totalProjects}</span>
            <button
              className="nav-btn-icon"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={!canGoNext}
              aria-label="Next project"
            >
              <ChevronRight size={18} />
            </button>
            <span className="nav-divider" aria-hidden="true" />
            <button className="nav-btn-icon close-btn" onClick={onClose} aria-label="Close project">
              <X size={18} />
            </button>
          </div>
        </nav>

        <div className="project-modal-scroll-area" ref={scrollAreaRef}>
          <motion.div
            key={project.id}
            className="project-modal-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: APPLE_EASE }}
          >
              <section className="project-detail-hero" aria-labelledby="project-detail-title">
                <div className="project-detail-copy">
                  <div className="project-detail-kicker">
                    <span>{project.category}</span>
                  </div>

                  <div className="project-detail-brand">
                    <img src={project.logo} alt="" className="project-detail-logo" width="72" height="72" />
                    <span>{tModal.details}</span>
                  </div>

                  <h1 id="project-detail-title">{project.title}</h1>
                  <p className="project-detail-lede">
                    {project.desc} {project.summary || project.fullDesc}
                  </p>

                  <ul className="project-detail-technologies" aria-label="Technologies">
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>

                  <a className="project-primary-action" href={project.appStoreUrl} target="_blank" rel="noreferrer">
                    {tModal.showAppStore}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </div>

                {project.media?.length > 0 && (
                  <ProjectGallery
                    key={project.id}
                    media={project.media}
                    title={project.title}
                    accent={project.accent}
                    label={tModal.screenshots}
                    tModal={tModal}
                    onPreview={setPreviewMedia}
                  />
                )}

              </section>

              <section className="project-detail-lower">
                {project.team?.length > 0 && (
                  <div className="project-team-block">
                    <span className="section-label">{tModal.team}</span>
                    <div className="team-column-layout">
                      {project.team.map((member) => <TeamCard key={member.linkedin} member={member} />)}
                    </div>
                  </div>
                )}
              </section>
          </motion.div>
        </div>

        {previewMedia && (
          <motion.div
            className="project-image-preview-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewMedia(null)}
          >
            <button
              className="project-image-preview-close"
              onClick={() => setPreviewMedia(null)}
              aria-label={tModal.closeImage || 'Close image'}
            >
              <X size={20} />
            </button>
            <img
              src={previewMedia.src}
              alt={`${project.title} preview`}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
