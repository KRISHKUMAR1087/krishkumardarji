import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  "hello",
  "नमस्ते",
  "bonjour",
  "hola",
  "kem cho"
];

export const AppleHelloIntro = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Cycle greeting every 450ms
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 550);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="apple-hello-intro-overlay"
        >
          <div className="apple-hello-intro-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={greetings[index]}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="apple-hello-intro-text"
              >
                {greetings[index]}
                <span className="apple-hello-intro-dot">.</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
