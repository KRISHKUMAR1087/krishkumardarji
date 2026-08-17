import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  { text: "INITIALIZING TELEMETRY & ECU SYSTEMS...", progress: 20 },
  { text: "CHECKING POWERTRAIN / RUNTIME LOGIC [OK]", progress: 45 },
  { text: "SYNCING DATABASE CLUSTER & FASTAPIs [OK]", progress: 70 },
  { text: "CALIBRATING AI MODELS & NEURAL SYSTEMS [OK]", progress: 90 },
  { text: "SYSTEM STATUS: GREEN FLAG 🏁", progress: 100 }
];

export const AppleHelloIntro = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev + 1 >= bootSequence.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 380);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="f1-boot-overlay"
        >
          <div className="f1-boot-container">
            {/* Top F1 Broadcast Header */}
            <div className="f1-boot-badge">
              <span className="f1-boot-pulse" />
              <span>KRISHKUMAR RACING // SYSTEM BOOT</span>
            </div>

            {/* Terminal Log Stream */}
            <div className="f1-boot-terminal">
              {bootSequence.slice(0, step + 1).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`f1-boot-log ${idx === step ? 'active' : ''}`}
                >
                  <span className="f1-log-prefix">&gt;&gt;</span>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="f1-boot-progress-track">
              <motion.div
                className="f1-boot-progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: `${bootSequence[step].progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            <div className="f1-boot-footer-stats">
              <span>ECU: ACTIVE</span>
              <span>TELEMETRY: LIVE</span>
              <span>KRISHKUMAR DARJI • CE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
