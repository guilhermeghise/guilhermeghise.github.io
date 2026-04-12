import React from 'react';
import { Globe, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ t, lang, theme, toggleLang, toggleTheme, scrollTo }) => (
  <nav className="navbar">
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
);

export default Navbar;
