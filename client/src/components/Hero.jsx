import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown, FiDownload, FiActivity, FiVolume2, FiVolumeX, FiZap } from 'react-icons/fi';
import { f1Audio } from '../utils/f1Audio';

const rollerRoles = [
  "SOFTWARE ENGINEERING",
  "GEN-AI SYSTEMS",
  "FULL STACK ARCHITECTURES",
  "DATA STRUCTURES & ALGORITHMS",
  "UI/UX PRECISION",
  "SYSTEM DESIGN & FASTAPIs",
  "PERFORMANCE TELEMETRY"
];

export const Hero = ({ data }) => {
  const roles = [
    "COMPUTER ENGINEER",
    "FULL-STACK DEVELOPER",
    "GEN-AI SYSTEM BUILDER",
    "HACKATHON SPRINTER • TOP 20",
    "B.TECH (CE) • 2024–2028"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasRevved, setHasRevved] = useState(false);

  useEffect(() => {
    let timer;
    const activeRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 20);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => activeRole.slice(0, prev.length + 1));
      }, 45);
    }

    if (!isDeleting && displayText === activeRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const scrollTo = (id) => {
    f1Audio.playDRSOpen();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleRevEngine = () => {
    f1Audio.playEngineRev();
    setHasRevved(true);
    setTimeout(() => setHasRevved(false), 1400);
  };

  return (
    <section className="f1-hero-section" id="home">
      {/* Background Track Atmosphere */}
      <div className="f1-hero-track-bg" />

      {/* Animated Racing F1 Car Speed Flyby Asset in Hero */}
      <div className="f1-car-flyby-track" onClick={handleRevEngine} title="Click to Rev F1 Engine!">
        <motion.div
          className="f1-car-machine"
          initial={{ x: '-150%' }}
          animate={{ x: '150%' }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatDelay: 5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {/* Stylized SVG F1 Race Car Silhouette */}
          <div className="f1-car-silhouette-wrap">
            <svg viewBox="0 0 200 45" className="f1-car-svg" fill="currentColor">
              {/* Front Wing */}
              <path d="M190 28 L198 34 L180 34 L176 28 Z" fill="#e10600" />
              {/* Nosecone */}
              <path d="M140 22 Q180 26 190 28 L160 34 L130 34 Z" fill="#ffffff" />
              {/* Cockpit / Halo */}
              <path d="M105 14 Q125 14 135 22 L95 24 Q100 14 105 14 Z" fill="#111317" stroke="#e10600" strokeWidth="1.5" />
              {/* Driver Helmet #1 */}
              <circle cx="114" cy="18" r="4" fill="#ffea00" />
              {/* Engine Cover & Sidepods */}
              <path d="M60 16 L105 14 L130 34 L45 34 L40 24 Q50 16 60 16 Z" fill="#e10600" />
              {/* Rear Wing & DRS */}
              <path d="M10 8 L35 8 L32 20 L20 20 L18 34 L8 34 Z" fill="#ffffff" />
              <rect x="6" y="6" width="30" height="3" fill="#e10600" />
              {/* Front Wheel */}
              <circle cx="160" cy="34" r="9" fill="#111" stroke="#333" strokeWidth="2" />
              <circle cx="160" cy="34" r="4" fill="#e10600" />
              {/* Rear Wheel */}
              <circle cx="45" cy="34" r="11" fill="#111" stroke="#333" strokeWidth="2.5" />
              <circle cx="45" cy="34" r="5" fill="#e10600" />
            </svg>
            {/* Speed Exhaust Fire / Heat Distortion */}
            <span className="f1-car-exhaust-flame" />
          </div>
        </motion.div>
      </div>

      <div className="f1-hero-container">
        {/* Trackside Marquee Ticker with Sound Effect Toggle */}
        <div className="f1-trackside-ticker-wrap">
          <div className="f1-trackside-ticker">
            {[...rollerRoles, ...rollerRoles, ...rollerRoles].map((item, idx) => (
              <span key={idx} className="f1-ticker-item">
                <span className="f1-ticker-flag">✦</span>
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="f1-hero-grid">
          {/* Left Column: Driver Broadcast Typography */}
          <div className="f1-hero-driver-info">
            <div className="f1-driver-pill">
              <span className="f1-live-dot" />
              <span>DRIVER / ENGINEER PROFILE • CHARUSAT DEPSTAR • 2024—2028</span>
            </div>

            <h1 className="f1-hero-name">
              KRISHKUMAR<br />
              <span className="f1-hero-name-highlight">DARJI</span>
            </h1>

            {/* Typewriter Role Line */}
            <div className="f1-hero-telemetry-role">
              <span className="f1-telemetry-prefix">ROLE // </span>
              <span className="f1-role-text">{displayText}</span>
              <span className="f1-cursor-blink">_</span>
            </div>

            <p className="f1-hero-manifesto">
              Building high-performance digital systems where engineering performance, AI workflows, and precision user experiences meet.
            </p>

            {/* F1 Action Buttons */}
            <div className="f1-hero-actions">
              <button 
                onClick={() => scrollTo('projects')} 
                className="f1-btn-racing-primary"
              >
                <span>EXPLORE GARAGE</span>
                <FiArrowDown size={17} />
              </button>

              <a
                href="/Krishkumar Darji.pdf"
                download="Krishkumar_Darji_Racing_Passport.pdf"
                className="f1-btn-racing-secondary"
                title="Download Racing Passport"
              >
                <FiDownload size={17} />
                <span>RACING PASSPORT</span>
              </a>
            </div>
          </div>

          {/* Right Column: F1 Engineering Telemetry Dashboard */}
          <div className="f1-telemetry-console-card">
            <div className="f1-telemetry-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="f1-telemetry-status-light" />
                <span className="f1-telemetry-title">ENGINEERING TELEMETRY</span>
              </div>
              <span className="f1-telemetry-unit">CAR #1 // LIVE</span>
            </div>

            <div className="f1-telemetry-rows">
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">PROJECT BUILDS</span>
                <span className="f1-telemetry-value">08+</span>
              </div>
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">ENGINEERING LICENSES</span>
                <span className="f1-telemetry-value">08+</span>
              </div>
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">HACKATHON STARTS</span>
                <span className="f1-telemetry-value" style={{ color: '#ffea00' }}>18+</span>
              </div>
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">PUBLIC REPOSITORIES</span>
                <span className="f1-telemetry-value">22+</span>
              </div>
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">ANNUAL TELEMETRY COMMITS</span>
                <span className="f1-telemetry-value" style={{ color: '#00e676' }}>500+</span>
              </div>
              <div className="f1-telemetry-row" style={{ borderBottom: 'none', paddingTop: 10 }}>
                <span className="f1-telemetry-label">DRS / SYSTEM STATUS</span>
                <span className="f1-telemetry-active-badge">● ACTIVE</span>
              </div>
            </div>

            <div className="f1-telemetry-footer-bar">
              <span>TEAM: KRISHKUMAR RACING</span>
              <span>CAR: #1 MERN SPEC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
