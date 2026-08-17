import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppleHelloIntro = ({ onComplete }) => {
  const [isDone, setIsDone] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Lock page scroll completely while intro is playing
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
        });
      }
    }

    // Fallback timer if video duration cannot be determined
    const timer = setTimeout(() => {
      handleComplete();
    }, 7000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleComplete = () => {
    // Re-enable smooth scrolling once intro ends
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setIsDone(true);
    if (onComplete) onComplete();
  };

  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
    }
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            touchAction: 'none'
          }}
          onClick={handleUnmute}
        >
          {/* Authentic Intro Video (Full Screen, No Grid/Overlay) */}
          <video
            ref={videoRef}
            src="/intro.mp4"
            autoPlay
            playsInline
            muted={false}
            preload="auto"
            onEnded={handleComplete}
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              display: 'block',
              backgroundColor: '#000000'
            }}
          />

          {/* Minimalist Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleComplete();
            }}
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
