import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload, FiArrowUpRight } from 'react-icons/fi';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' }
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1150);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleSectionSpy = () => {
      const scrollY = window.scrollY + 160;
      let current = 'about';

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (scrollY >= el.offsetTop) current = section.id;
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleSectionSpy, { passive: true });
    handleSectionSpy();
    return () => window.removeEventListener('scroll', handleSectionSpy);
  }, []);

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      const navElement = document.querySelector('.custom-navbar-dock');
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
    <div style={{
      position: 'fixed',
      top: '16px',
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 1200
    }}>
      <motion.nav
        layout
        className="custom-navbar-dock"
        initial={false}
        animate={{
          width: isOpen ? (isMobile ? '92%' : '880px') : '110px',
          height: isOpen ? (isMobile ? 'auto' : '56px') : '38px',
          borderRadius: isOpen ? '16px' : '999px',
          padding: isOpen ? (isMobile ? '16px' : '0 20px') : '0 14px',
          y: isOpen ? 6 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 24
        }}
        whileHover={!isOpen ? { scale: 1.05 } : undefined}
        whileTap={!isOpen ? { scale: 0.95 } : undefined}
        style={{
          position: 'relative',
          pointerEvents: 'auto',
          background: 'rgba(10, 12, 18, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          display: 'flex',
          flexDirection: isMobile && isOpen ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.1)',
          cursor: isOpen ? 'default' : 'pointer'
        }}
        onClick={() => {
          if (!isOpen) setIsOpen(true);
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
                color: '#ffffff',
                gap: '8px'
              }}
            >
              <FiMenu size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span style={{
                fontSize: '0.82rem',
                fontWeight: '700',
                letterSpacing: '0.1em',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                color: '#ffffff'
              }}>MENU</span>
            </motion.div>
          ) : (
            <motion.div
              key="open-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: isMobile ? '14px' : '10px',
                position: 'relative'
              }}
            >
              <ul 
                style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  gap: isMobile ? '12px' : '14px',
                  listStyle: 'none',
                  margin: '0',
                  padding: '0',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'center',
                  flexWrap: 'nowrap'
                }}
              >
                {sections.map((section) => (
                  <li key={section.id} style={{ width: isMobile ? '100%' : 'auto', textAlign: 'center' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScroll(section.id);
                        setActiveSection(section.id);
                        setIsOpen(false);
                      }}
                      className={`nav-link-btn ${activeSection === section.id ? 'active' : ''}`}
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: activeSection === section.id ? 700 : 550,
                        color: activeSection === section.id ? 'var(--accent-cyan)' : '#94a3b8'
                      }}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Resume Download in expanded menu */}
                <a
                  href="/Krishkumar Darji.pdf"
                  download="Krishkumar_Darji_Resume.pdf"
                  className="nav-resume-btn"
                  title="Download Resume PDF"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiDownload size={14} />
                  <span>Resume</span>
                </a>

                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6px'
                  }}
                  title="Close Menu"
                >
                  <FiX size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};
