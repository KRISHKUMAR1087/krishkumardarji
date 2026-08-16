import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const greetings = [
  "hello",
  "नमस्ते",
  "નમસ્કાર",
  "खम्मा घणी"
];

export const AppleHelloIntro = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Cycle greeting every 500ms
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev + 1 >= greetings.length) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 650);
          return prev;
        }
        return prev + 1;
      });
    }, 480);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="apple-hello-intro-overlay"
        >
          <div className="apple-hello-intro-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={greetings[index]}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
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
