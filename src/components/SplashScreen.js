import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APPLE_EASE } from '../constants/animations';
import './SplashScreen.css';

const LETTERS = ['Welcome! =)'];

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('enter'); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 800);
    const t2 = setTimeout(() => setPhase('exit'), 1800);
    const t3 = setTimeout(() => onDone(), 2500);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: APPLE_EASE }}
        >
          <div className="splash-monogram">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: APPLE_EASE }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="splash-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'hold' ? 1 : 0 }}
            transition={{ duration: 0.9, ease: APPLE_EASE }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;
