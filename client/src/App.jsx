import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import {
  Navigation,
  Hero,
  MotionBackdrop,
  About,
  Projects,
  Hackathons,
  Education,
  Achievements,
  Certifications,
  Hobbies,
  GitHubHighlights,
  Contact,
  ScrollProgress,
  AnimatedCursor,
  AppleHelloIntro,
} from './components';
import { portfolioData as initialData } from './data/fallbackData';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function AppContent({ data }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const safeData = data || initialData;

  return (
    <>
      <AppleHelloIntro />
      <AnimatedCursor />
      <ScrollProgress />
      <MotionBackdrop />
      <Navigation />
      
      <main>
        <Hero data={safeData} />
        <About data={safeData} />
        <Projects data={safeData} />
        <Hackathons data={safeData} />
        <Education data={safeData} />
        <Achievements data={safeData} />
        <Certifications data={safeData} />
        <Hobbies data={safeData} />
        <GitHubHighlights data={safeData} />
        <Contact data={safeData} />
      </main>

      {/* Floating Back To Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="back-to-top-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const result = await response.json();
          setData((prev) => ({ ...prev, ...result }));
        }
      } catch (err) {
        // Fallback silently
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider>
      <AppContent data={data} />
    </ThemeProvider>
  );
}

export default App;
