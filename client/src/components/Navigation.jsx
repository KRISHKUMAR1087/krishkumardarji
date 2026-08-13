import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);
  const { isDark } = useTheme();

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'hackathons', label: 'Hackathons' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1150;
      setIsMobile(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleSectionSpy = () => {
      const scrollY = window.scrollY + 140;
      let current = 'about';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (scrollY >= el.offsetTop) current = section.id;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleSectionSpy);
    handleSectionSpy();
    return () => window.removeEventListener('scroll', handleSectionSpy);
  }, []);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      const navElement = document.querySelector('.custom-navbar');
      if (navElement && !navElement.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '12px',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1200
      }}>
        <motion.nav
          layout
          className="custom-navbar"
          initial={false}
          animate={{
            width: isOpen ? (isMobile ? '92%' : '860px') : '120px',
            height: isOpen ? (isMobile ? 'auto' : '64px') : '38px',
            borderRadius: '14px',
            padding: isOpen ? '0 24px' : '0 16px',
            y: isOpen ? 8 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 24,
            mass: 0.9
          }}
          whileHover={!isOpen ? { scale: 1.05, y: 2, boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(108, 99, 255, 0.2)' } : undefined}
          whileTap={!isOpen ? { scale: 0.95 } : undefined}
          style={{
            position: 'relative',
            pointerEvents: 'auto',
            background: 'rgba(10, 10, 12, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1.5px solid #ffffff',
            display: 'flex',
            flexDirection: isMobile && isOpen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            cursor: isOpen ? 'default' : 'pointer'
          }}
          onClick={() => {
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
        >
          <AnimatePresence mode="popLayout">
            {!isOpen ? (
              <motion.div
                key="closed-menu"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  color: 'var(--text)',
                  gap: '8px'
                }}
              >
                <FiMenu size={18} style={{ color: 'var(--accent-2)' }} />
                <span style={{
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  letterSpacing: '0.12em',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  color: 'var(--text)',
                  opacity: 0.9
                }}>Menu</span>
              </motion.div>
            ) : (
              <motion.div
                key="open-menu"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: isMobile ? '16px 0' : '0',
                  gap: isMobile ? '16px' : '0',
                  position: 'relative'
                }}
              >
                <ul 
                  className={isMobile ? "mobile-nav-links" : "nav-links"}
                  style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    gap: isMobile ? '14px' : '22px',
                    listStyle: 'none',
                    margin: '0',
                    padding: '0',
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {sections.map((section) => (
                    <li key={section.id} style={{ width: isMobile ? '100%' : 'auto', textAlign: 'center' }}>
                      <a
                        href={`#${section.id}`}
                        className={activeSection === section.id ? 'active' : ''}
                        onClick={(e) => {
                          e.preventDefault();
                          handleScroll(section.id);
                          setActiveSection(section.id);
                          setIsOpen(false);
                        }}
                        style={{
                          display: 'block',
                          padding: isMobile ? '8px 0' : '0',
                          fontSize: '1rem'
                        }}
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  className="menu-close-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px',
                    position: isMobile ? 'static' : 'absolute',
                    right: isMobile ? 'auto' : '0px',
                    marginLeft: isMobile ? '0' : '15px'
                  }}
                >
                  <FiX size={22} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};
