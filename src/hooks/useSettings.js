import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}

export function useLang() {
  const [lang, setLang] = useState('en');
  const toggleLang = () => setLang(l => (l === 'en' ? 'pt' : 'en'));
  return { lang, toggleLang };
}
