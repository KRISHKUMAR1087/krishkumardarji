import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiDownload, FiEye, FiActivity } from 'react-icons/fi';

const sections = [
  { id: 'about', label: 'DRIVER' },
  { id: 'machine', label: 'THE MACHINE' },
  { id: 'projects', label: 'GARAGE' },
  { id: 'hackathons', label: 'RACE WEEKEND' },
  { id: 'education', label: 'SEASON HISTORY' },
  { id: 'achievements', label: 'PODIUM' },
  { id: 'certifications', label: 'LICENSES' },
  { id: 'hobbies', label: 'OFF TRACK' },
  { id: 'github', label: 'TELEMETRY' },
  { id: 'contact', label: 'PIT WALL' }
];

export const Navigation = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visitorCount, setVisitorCount] = useState(1);

  // Real Live Unique Visitor Telemetry (Increments only ONCE per browser session, read-only on reloads)
  useEffect(() => {
    let isMounted = true;
    const SESSION_KEY = 'kd_session_visited_flag';

    const fetchRealVisitorCount = async () => {
      const isAlreadyCountedThisSession = sessionStorage.getItem(SESSION_KEY);

      try {
        if (!isAlreadyCountedThisSession) {
          // Fresh browser visit -> Increment count by 1
          const res = await fetch('https://api.counterapi.dev/v1/krishkumar_f1_portfolio_unique/visits/up');
          if (res.ok) {
            const json = await res.json();
            if (json && typeof json.count === 'number' && isMounted) {
              setVisitorCount(json.count);
              sessionStorage.setItem(SESSION_KEY, 'true');
              localStorage.setItem('kd_portfolio_real_visits', json.count.toString());
              return;
            }
          }
        } else {
          // Reload / tab navigation within same session -> READ ONLY without incrementing
          const res = await fetch('https://api.counterapi.dev/v1/krishkumar_f1_portfolio_unique/visits');
          if (res.ok) {
            const json = await res.json();
            if (json && typeof json.count === 'number' && isMounted) {
              setVisitorCount(json.count);
              localStorage.setItem('kd_portfolio_real_visits', json.count.toString());
              return;
            }
          }
        }
      } catch (err) {
        // Offline / fallback handling
      }

      try {
        const stored = localStorage.getItem('kd_portfolio_real_visits');
        if (!stored) {
          localStorage.setItem('kd_portfolio_real_visits', '1');
          if (isMounted) setVisitorCount(1);
        } else {
          const count = parseInt(stored, 10);
          if (isMounted) setVisitorCount(isNaN(count) ? 1 : count);
        }
      } catch (e) {
        if (isMounted) setVisitorCount(1);
      }
    };

    fetchRealVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

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
    <>
      {/* Top Left: F1 Live Telemetry Sessions */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="top-corner-left-badge f1-telemetry-badge"
        title="Live Verified Telemetry Sessions"
      >
        <span className="live-visitor-pulse-dot" style={{ background: '#00d26a', boxShadow: '0 0 8px #00d26a' }} />
        <FiActivity size={13} style={{ color: '#00d26a' }} />
        <span className="visitor-count-text">
          TELEMETRY: <strong>{visitorCount.toLocaleString()}</strong> SESSIONS
        </span>
      </motion.div>

      {/* Top Right: Racing Passport / Resume Button */}
      <motion.a
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        href="/Krishkumar Darji.pdf"
        download="Krishkumar_Darji_Racing_Passport.pdf"
        className="top-corner-right-btn f1-passport-btn"
        title="Download Racing Passport / Resume PDF"
      >
        <FiDownload size={14} className="download-icon" />
        <span>RACING PASSPORT ↓</span>
      </motion.a>

      {/* Center: F1 Race Engineer Dock */}
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
          className="custom-navbar-dock f1-nav-dock"
          initial={false}
          animate={{
            width: isOpen ? (isMobile ? '94%' : '940px') : '135px',
            height: isOpen ? (isMobile ? 'auto' : '52px') : '38px',
            borderRadius: isOpen ? '12px' : '999px',
            padding: isOpen ? (isMobile ? '16px' : '0 18px') : '0 14px',
            y: isOpen ? 6 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 240,
            damping: 25
          }}
          whileHover={!isOpen ? { scale: 1.04 } : undefined}
          whileTap={!isOpen ? { scale: 0.96 } : undefined}
          style={{
            position: 'relative',
            pointerEvents: 'auto',
            background: 'rgba(15, 15, 15, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: isMobile && isOpen ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 16px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(225, 6, 0, 0.15)',
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
                <span style={{ color: '#e10600', fontWeight: 900 }}>🏁</span>
                <span style={{
                  fontSize: '0.78rem',
                  fontWeight: '800',
                  letterSpacing: '0.12em',
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: 'uppercase',
                  color: '#ffffff'
                }}>PIT DOCK</span>
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
                  gap: isMobile ? '12px' : '8px',
                  position: 'relative'
                }}
              >
                <ul 
                  style={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'center',
                    gap: isMobile ? '10px' : '10px',
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
                        className={`nav-link-btn f1-nav-link ${activeSection === section.id ? 'active' : ''}`}
                      >
                        {section.label}
                      </button>
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                    title="Close Pit Dock"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};
