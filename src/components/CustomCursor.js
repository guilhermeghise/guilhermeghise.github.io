import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Configuração inicial: centraliza a bolinha no mouse
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onMove = (e) => {
      // Movimento suave
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', onMove);

    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <div ref={cursorRef} className="cuberto-cursor" />;
};

export default CustomCursor;