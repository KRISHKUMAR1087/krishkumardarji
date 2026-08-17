import { useState, useEffect } from 'react';
import { FiArrowDown, FiDownload, FiActivity, FiCpu, FiZap, FiCode, FiLayers } from 'react-icons/fi';

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
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -75;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="f1-hero-section" id="home">
      {/* Background Track Atmosphere */}
      <div className="f1-hero-track-bg" />

      <div className="f1-hero-container">
        {/* Trackside Marquee Ticker */}
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
                <span>DOWNLOAD PASSPORT</span>
              </a>

              <button 
                onClick={() => scrollTo('contact')} 
                className="f1-btn-racing-ghost"
              >
                <span>PIT WALL TRANSMISSION →</span>
              </button>
            </div>
          </div>

          {/* Right Column: F1 Engineering Telemetry Dashboard */}
          <div className="f1-telemetry-console-card">
            <div className="f1-telemetry-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="f1-telemetry-status-light" />
                <span className="f1-telemetry-title">ENGINEERING TELEMETRY</span>
              </div>
              <span className="f1-telemetry-unit">LIVE SENSORS</span>
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
                <span className="f1-telemetry-value" style={{ color: '#ffd000' }}>18+</span>
              </div>
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">PUBLIC REPOSITORIES</span>
                <span className="f1-telemetry-value">22+</span>
              </div>
              <div className="f1-telemetry-row">
                <span className="f1-telemetry-label">ANNUAL TELEMETRY COMMITS</span>
                <span className="f1-telemetry-value" style={{ color: '#00d26a' }}>500+</span>
              </div>
              <div className="f1-telemetry-row" style={{ borderBottom: 'none', paddingTop: 10 }}>
                <span className="f1-telemetry-label">DRS / SYSTEM STATUS</span>
                <span className="f1-telemetry-active-badge">● ACTIVE</span>
              </div>
            </div>

            <div className="f1-telemetry-footer-bar">
              <span>TEAM: KRISHKUMAR RACING</span>
              <span>CAR: MERN // GEN-AI SPEC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
