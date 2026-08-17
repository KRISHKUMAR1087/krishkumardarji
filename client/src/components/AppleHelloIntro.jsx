import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppleHelloIntro = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Attempt auto-play with audio; if blocked by browser policy, play muted
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }

    // Dismiss exactly at 5 seconds or upon video finish
    const timer = setTimeout(() => {
      handleComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsDone(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {/* Full Screen Pixar Cars Movie Intro Video */}
          <video
            ref={videoRef}
            src="/cars-intro.mp4"
            autoPlay
            playsInline
            onEnded={handleComplete}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Minimalist Skip Button for convenience */}
          <button
            onClick={handleComplete}
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              padding: '6px 14px',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '4px',
              color: '#ffffff',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            SKIP INTRO ⏩
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
