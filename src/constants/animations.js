// Easing padrão Apple — usado em todo o projeto
export const APPLE_EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: APPLE_EASE },
};

export const fadeLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: APPLE_EASE },
};

export const fadeRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 1.2, ease: APPLE_EASE },
};
