import React, { useState } from 'react';
import { Globe, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ t, lang, theme, toggleLang, toggleTheme, scrollTo }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (key) => {
    scrollTo(key);
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Desktop links */}
        <div className="nav-links">
          {Object.entries(t).map(([key, label]) => (
            <button key={key} onClick={() => scrollTo(key)}>
              {label}
            </button>
          ))}
        </div>

        <div className="nav-controls">
          <button onClick={toggleLang} className="nav-icon-btn" aria-label="Toggle language">
            <Globe size={18} />
            <span>{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className="nav-icon-btn" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav-mobile-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`nav-mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <button
          style={{ position: 'absolute', top: 16, right: 16, opacity: 0.6, padding: 8 }}
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        {Object.entries(t).map(([key, label]) => (
          <button key={key} onClick={() => handleNavClick(key)}>
            {label}
          </button>
        ))}

        <div className="nav-mobile-divider" />

        <div className="nav-mobile-controls">
          <button onClick={toggleLang} className="nav-icon-btn" aria-label="Toggle language">
            <Globe size={18} />
            <span>{lang.toUpperCase()}</span>
          </button>
          <button onClick={toggleTheme} className="nav-icon-btn" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
