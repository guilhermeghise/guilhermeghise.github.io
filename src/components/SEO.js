import { useEffect } from 'react';

// ─── Atualize as constantes abaixo com seus dados ───────────────
const SITE_TITLE       = 'Guilherme Ghise — iOS Developer';
const SITE_DESCRIPTION = 'iOS Developer at Apple Developer Academy · Crafting polished Swift apps for the App Store.';
const SITE_URL         = 'https://guilhermeghise.dev'; // ← troque pela sua URL
const SITE_IMAGE       = 'https://guilhermeghise.dev/og-image.png'; // ← crie um og-image.png em /public (1200×630px)
// ────────────────────────────────────────────────────────────────

const SEO = () => {
  useEffect(() => {
    document.title = SITE_TITLE;

    const set = (attrKey, attrVal, content) => {
      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Básico
    set('name', 'description', SITE_DESCRIPTION);

    // Open Graph (Facebook, LinkedIn, WhatsApp, iMessage…)
    set('property', 'og:type',        'website');
    set('property', 'og:url',         SITE_URL);
    set('property', 'og:title',       SITE_TITLE);
    set('property', 'og:description', SITE_DESCRIPTION);
    set('property', 'og:image',       SITE_IMAGE);

    // Twitter / X Card
    set('name', 'twitter:card',        'summary_large_image');
    set('name', 'twitter:url',         SITE_URL);
    set('name', 'twitter:title',       SITE_TITLE);
    set('name', 'twitter:description', SITE_DESCRIPTION);
    set('name', 'twitter:image',       SITE_IMAGE);
  }, []);

  return null;
};

export default SEO;