import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

/**
 * RaceLineProgress
 * Replaces a plain top progress bar with an F1-style race line:
 * - A glowing "track" line fills as the user scrolls
 * - Checkpoint dots light up as each section is passed (lap markers)
 * - A live "speed" readout (px/s) reacts to scroll velocity, like a telemetry HUD
 *
 * Usage: <RaceLineProgress sections={['hero','about','telemetry','projects', ...]} />
 * Pass the same ids you use on each <section id="..."> so checkpoints align.
 */
export const RaceLineProgress = ({ sections = [] }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  const [speed, setSpeed] = useState(0);
  const lastY = useRef(0);
  const lastT = useRef(performance.now());
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(now - lastT.current, 16);
      const dy = Math.abs(y - lastY.current);
      const px_s = (dy / dt) * 1000;
      setSpeed(Math.round(px_s));
      lastY.current = y;
      lastT.current = now;

      // Determine active checkpoint by nearest section top
      let idx = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          idx = i;
        }
      });
      setActiveIndex(idx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Decay speed readout when idle
  useEffect(() => {
    const id = setInterval(() => {
      setSpeed((s) => (s > 0 ? Math.max(0, s - 40) : 0));
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="race-line-wrap" aria-hidden="true">
      <div className="race-line-track">
        <motion.div className="race-line-fill" style={{ scaleX }} />
        {sections.map((id, i) => (
          <button
            key={id}
            className={`race-line-checkpoint ${i <= activeIndex ? 'is-passed' : ''}`}
            style={{ left: `${(i / Math.max(sections.length - 1, 1)) * 100}%` }}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={id}
          />
        ))}
      </div>
      <div className="race-line-hud">
        <span className="race-line-speed">{speed.toString().padStart(3, '0')}</span>
        <span className="race-line-unit">px/s</span>
      </div>
    </div>
  );
};

export default RaceLineProgress;
