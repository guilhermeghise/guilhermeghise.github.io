import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, QrCode, Smartphone } from 'lucide-react';
import { APPLE_EASE } from '../../constants/animations';
import './ProjectModal.css';
import { QRCodeSVG } from 'qrcode.react';

const AppQRCode = ({ url, theme }) => (
  <div className="app-qr-wrapper">
    <div className="qr-container" style={{ padding: '12px', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', borderRadius: '16px' }}>
      <QRCodeSVG 
        value={url} 
        size={100} 
        bgColor="transparent"
        fgColor={theme === 'dark' ? '#FFFFFF' : '#000000'} 
        level="M" 
        marginSize={0} 
      />
    </div>
  </div>
);

const TeamCard = ({ member }) => (
  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="team-card">
    <div className="team-card-top">
      <span className="member-name">{member.name}</span>
      <span className="member-arrow">↗</span>
    </div>
    <span className="member-role-badge" data-role={member.role.toLowerCase()}>{member.role}</span>
  </a>
);

const MediaCard = ({ item, isCenter, onClick }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const toggleMute = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (videoRef.current) { const m = !isMuted; videoRef.current.muted = m; setIsMuted(m); }
  };
  return (
    <div className={`media-vertical-card ${isCenter ? 'is-center' : ''}`} onClick={onClick}>
      {item.type === 'video' ? (
        <div className="video-player-wrapper">
          <video ref={videoRef} src={item.src} className="card-media-content" autoPlay loop muted={isMuted} playsInline />
          <button className="media-mute-overlay-btn" onClick={toggleMute}>
            {isMuted
              ? <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.12-1.86 5.8-4.5 6.97v2.05c3.77-1.22 6.5-4.81 6.5-9.02s-2.73-7.8-6.5-9.02v2.05c2.64 1.17 4.5 3.85 4.5 6.97zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.41.32-.85.58-1.33.76v2.05c1.03-.22 1.98-.67 2.8-1.3l2.27 2.27 1.27-1.27L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
              : <svg viewBox="0 0 24 24" width="14" height="14" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            }
          </button>
        </div>
      ) : (
        <img src={item.src} alt="App screenshot" className="card-media-content" />
      )}
      {item.type !== 'video' && <div className="card-glass-overlay" />}
    </div>
  );
};

const InfiniteCarousel = ({ items, accent }) => {
  const total  = items.length;
  const COPIES = 5;
  const MID    = 2;
  const penta  = Array.from({ length: COPIES }, () => items).flat();

  const offsetRef   = useRef(0);
  const busyRef     = useRef(false);
  const trackRef    = useRef(null);
  const viewportRef = useRef(null);
  const [displayIdx, setDisplayIdx] = useState(0);

  const dragRef  = useRef({ dragging: false, startX: 0, startTx: 0 });
  const touchRef = useRef({ startX: 0, startTx: 0 });

  const txForAbsolute = useCallback((absIdx) => {
    const track = trackRef.current;
    const vp    = viewportRef.current;
    if (!track || !vp) return 0;
    const slot = track.children[absIdx];
    if (!slot) return 0;
    return vp.offsetWidth / 2 - (slot.offsetLeft + slot.offsetWidth / 2);
  }, []);

  const applyTx = useCallback((tx, animated) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated
      ? 'transform 0.44s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
    track.style.transform = `translateX(${tx}px)`;
  }, []);

  const absIdx = () => MID * total + offsetRef.current;

  useEffect(() => {
    offsetRef.current = 0;
    busyRef.current   = false;
    setDisplayIdx(0);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => applyTx(txForAbsolute(MID * total), false))
    );
  }, [items, applyTx, txForAbsolute]);

  const go = useCallback((dir) => {
    if (busyRef.current) return;
    busyRef.current = true;
    offsetRef.current += dir;
    setDisplayIdx(((offsetRef.current % total) + total) % total);
    applyTx(txForAbsolute(absIdx()), true);
  }, [total, applyTx, txForAbsolute]);

  const goTo = useCallback((logIdx) => {
    if (busyRef.current) return;
    const cur = ((offsetRef.current % total) + total) % total;
    if (logIdx === cur) return;
    busyRef.current = true;
    let diff = logIdx - cur;
    if (diff > total / 2)  diff -= total;
    if (diff < -total / 2) diff += total;
    offsetRef.current += diff;
    setDisplayIdx(logIdx);
    applyTx(txForAbsolute(absIdx()), true);
  }, [total, applyTx, txForAbsolute]);

  const onTransitionEnd = () => {
    busyRef.current = false;
    if (offsetRef.current >= total || offsetRef.current <= -total) {
      const wrapped = ((offsetRef.current % total) + total) % total;
      offsetRef.current = wrapped;
      const tx = txForAbsolute(MID * total + wrapped);
      applyTx(tx, false);
    }
  };

  const getCurrentTx = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
  };

  const onMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragRef.current = { dragging: true, startX: e.clientX, startTx: getCurrentTx() };
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.dragging) return;
    const delta = e.clientX - dragRef.current.startX;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${dragRef.current.startTx + delta}px)`;
  };
  const onMouseUp = (e) => {
    if (!dragRef.current.dragging) return;
    const delta = e.clientX - dragRef.current.startX;
    dragRef.current.dragging = false;
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
    else applyTx(txForAbsolute(absIdx()), true);
  };

  return (
    <div className="carousel-root">
      {/* <button className="carousel-arrow carousel-arrow-left" style={{ '--accent': accent }} onClick={() => go(-1)}>
        <ChevronLeft size={18} />
      </button> */}

      <div
        className="carousel-viewport"
        ref={viewportRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => dragRef.current.dragging && onMouseUp({ clientX: dragRef.current.startX })}
        onTouchStart={(e) => {
          touchRef.current = { startX: e.touches[0].clientX, startTx: getCurrentTx() };
          if (trackRef.current) trackRef.current.style.transition = 'none';
        }}
        onTouchMove={(e) => {
          const delta = e.touches[0].clientX - touchRef.current.startX;
          if (trackRef.current) trackRef.current.style.transform = `translateX(${touchRef.current.startTx + delta}px)`;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchRef.current.startX;
          if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
          else applyTx(txForAbsolute(absIdx()), true);
        }}
        style={{ cursor: 'grab', userSelect: 'none' }}
      >
        <div ref={trackRef} className="carousel-track" onTransitionEnd={onTransitionEnd}>
          {penta.map((item, i) => {
            const logIdx   = i % total;
            const isActive = (i >= MID * total && i < (MID + 1) * total) && logIdx === displayIdx;
            return (
              <div
                key={i}
                className={`carousel-card-slot${isActive ? ' is-center' : ''}`}
                onClick={() => { if (!dragRef.current.dragging && !isActive) goTo(logIdx); }}
              >
                <MediaCard item={item} isCenter={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      {/* <button className="carousel-arrow carousel-arrow-right" style={{ '--accent': accent }} onClick={() => go(1)}>
        <ChevronRight size={18} />
      </button> */}

      <div className="carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === displayIdx ? ' active' : ''}`}
            style={i === displayIdx ? { background: accent } : {}}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectModal = ({ projects, initialIndex, onClose, theme, tModal }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showQR, setShowQR] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    setShowQR(false); // Reseta ao trocar de projeto
  }, [currentIndex]);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = orig; };
  }, []);

  if (!projects?.length) return null;

  const project   = projects[currentIndex];
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < projects.length - 1;
  const goTo      = (i) => setCurrentIndex(i);

  const accentOpacity = theme === 'light' ? '40' : '18';
  const accentStyle   = { background: `linear-gradient(135deg, ${project.accent}${accentOpacity} 0%, transparent 60%)` };

  return (
    <motion.div className="project-modal-overlay" data-theme={theme}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}>

      {/* Setas flutuantes nas laterais */}
      <AnimatePresence>
        {canGoPrev && (
          <motion.button
            className="modal-side-arrow modal-side-arrow-left"
            onClick={(e) => { e.stopPropagation(); goTo(currentIndex - 1); }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            aria-label="Previous project"
          >
            <ChevronLeft size={22} />
          </motion.button>
        )}
        {canGoNext && (
          <motion.button
            className="modal-side-arrow modal-side-arrow-right"
            onClick={(e) => { e.stopPropagation(); goTo(currentIndex + 1); }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25 }}
            aria-label="Next project"
          >
            <ChevronRight size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div className="project-modal-container" onClick={(e) => e.stopPropagation()}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: APPLE_EASE }}>

        <nav className="project-modal-nav">
          <div className="nav-center">
            <span className="nav-project-title">{project.title}</span>
          </div>
          <div className="nav-right">
            <button className="nav-btn-icon close-btn" onClick={onClose}><X size={16} /></button>
          </div>
        </nav>

        <div className="project-modal-scroll-area" ref={scrollAreaRef}>
  {/* SEÇÃO 1: HERO (Impacto Inicial) */}
  <motion.div 
    className="project-section section-hero"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: APPLE_EASE }}
  >
    <div className="hero-bg" style={accentStyle} />
    <div className="hero-noise" />

    <div className="hero-center-content">
      <div className="hero-icon-wrap">
        <img src={project.logo} alt={project.title} className="hero-icon" />
      </div>
      <h1 className="hero-app-title">{project.title}</h1>
      
      {/* DESCRIÇÃO CURTA AQUI */}
      <p className="hero-app-short-desc">{project.desc}</p>
      
      <div className="hero-tech-pills">
        {project.technologies.map((tech) => (
          <span key={tech} className="tech-pill"
            style={{ color: project.accent, borderColor: `${project.accent}44`, background: `${project.accent}11` }}>
            {tech}
          </span>
        ))}
      </div>

      {/* DOWNLOADS */}
      <div className="hero-download-container">
        <div className="download-view-slot">
          <AnimatePresence mode="wait">
            {!showQR ? (
              <motion.a key="badge" href={project.appStoreUrl} target="_blank" rel="noreferrer" className="appstore-badge-link"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83" 
                     alt="Download" className="appstore-official-badge" style={{ height: '48px' }} />
              </motion.a>
            ) : (
              <motion.div key="qr" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                <AppQRCode url={project.appStoreUrl} theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button 
  onClick={() => setShowQR(!showQR)} 
  className="toggle-download-btn"
>
  {showQR ? <Smartphone size={14} /> : <QrCode size={14} />}
  {showQR ? tModal.showAppStore : tModal.showQR}
</button>
      </div>
    </div>

    {/* HINT DE SCROLL */}
    <div className="modal-scroll-hint">
      <span className="scroll-hint-label">{tModal.details}</span>
      <svg className="scroll-hint-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
  </motion.div>

  {/* SEÇÃO 2: DETALHES (Scroll Longo) */}
  <div className="project-section section-details">
    <div className="details-inner">
      
      {/* DESCRIÇÃO LONGA AQUI */}
      <div className="description-block">
        <span className="section-label">{tModal.about}</span>
        <p className="full-description-text">{project.fullDesc}</p>
      </div>

      {/* SCREENSHOTS */}
      {project.media?.length > 0 && (
        <div className="carousel-section">
          <span className="section-label">{tModal.screenshots}</span>
          <InfiniteCarousel items={project.media} accent={project.accent} />
        </div>
      )}

      {/* TEAM */}
      {project.team?.length > 0 && (
        <div className="team-block">
          <span className="section-label">{tModal.team}</span>
          <div className="team-column-layout">
            {project.team.map((member, i) => <TeamCard key={i} member={member} />)}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;