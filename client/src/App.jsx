import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import {
  Navigation,
  Hero,
  MotionBackdrop,
  About,
  F1MachineTelemetry,
  Projects,
  Hackathons,
  Education,
  Achievements,
  Certifications,
  Hobbies,
  GitHubHighlights,
  Contact,
  RaceLineProgress,
  AnimatedCursor,
  AppleHelloIntro,
  AdminPortal
} from './components';
import { portfolioData as initialData } from './data/fallbackData';
import { ThemeProvider } from './context/ThemeContext';
import { f1Audio } from './utils/f1Audio';
import './styles/global.css';
import './styles/scroll-motion.css';

const sectionOrder = [
  'home',
  'about',
  'machine',
  'projects',
  'hackathons',
  'education',
  'achievements',
  'certifications',
  'hobbies',
  'github',
  'contact'
];

function AppContent({ data }) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined' && window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    const handleKeyDown = (e) => {
      // Secret key combination: Ctrl + Shift + A to open Admin Dashboard
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        setIsAdminOpen((prev) => !prev);
      }
    };

    if (window.location.hash === '#admin') {
      setIsAdminOpen(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

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
      <RaceLineProgress sections={sectionOrder} />
      <MotionBackdrop />
      <Navigation />
      
      <main>
        <Hero data={safeData} />
        <About data={safeData} />
        <F1MachineTelemetry />
        <Projects data={safeData} />
        <Hackathons data={safeData} />
        <Education data={safeData} />
        <Achievements data={safeData} />
        <Certifications data={safeData} />
        <Hobbies data={safeData} />
        <GitHubHighlights data={safeData} />
        <Contact data={safeData} onOpenAdmin={() => setIsAdminOpen(true)} />
      </main>

      {/* Admin Portal Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPortal onClose={closeAdmin} />
        )}
      </AnimatePresence>

      {/* Floating Back To Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="back-to-top-btn f1-back-to-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <FiArrowUp size={18} />
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
