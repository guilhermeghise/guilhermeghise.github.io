import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = ({ containerRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [containerRef]);

  return (
    <div className="scroll-progress-track">
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};

export default ScrollProgress;