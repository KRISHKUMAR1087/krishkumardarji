import { useState, useEffect } from 'react';
import { FiArrowDown, FiArrowUpRight, FiDownload } from 'react-icons/fi';

const rollerRoles = [
  "UI/UX DESIGN",
  "SOFTWARE ENGINEERING",
  "GEN-AI WEB APPS",
  "FULL STACK SYSTEMS",
  "DATA STRUCTURES",
  "OPEN SOURCE",
  "VIBE CODER"
];

export const Hero = ({ data }) => {
  const roles = [
    "VIBE CODER",
    "HACKATHON TOP 20",
    "FULL STACK DEVELOPER",
    "GEN-AI WEB DEVELOPER",
    "B.TECH (CE)"
  ];
  
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles on the right
  useEffect(() => {
    let timer;
    const activeRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 25);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => activeRole.slice(0, prev.length + 1));
      }, 50);
    }

    if (!isDeleting && displayText === activeRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const quickStats = [
    { value: '8+', label: 'Projects' },
    { value: '7+', label: 'Certifications' },
    { value: '18+', label: 'Hackathons Participation' }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-landing-original" id="home">
      <div className="hero-content-original">
        <div className="hero-grid-original">
          {/* Left Column (Shifted Higher Up - Only Scrolling Role Roller Ribbon) */}
          <div className="hero-spacer-col-original">
            <div className="role-roller-floating-box">
              <div className="role-roller-track-wrap">
                <div className="role-roller-track">
                  {[...rollerRoles, ...rollerRoles, ...rollerRoles].map((item, idx) => (
                    <span key={idx} className="role-roller-item">
                      <span className="roller-arrow">✦</span>
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text, Roles, Bio, Metrics, CTAs */}
          <div className="hero-text-col-original">
            {/* Title + He/Him Badge */}
            <div className="hero-name-row-original">
              <h1 className="hero-name-heading-original">
                {data?.personal?.name || "Darji Krishkumar H."}
              </h1>
              <span className="hero-pronoun-tag-original">He/Him</span>
            </div>

            {/* Vibrant Cyan Role Typewriter */}
            <div className="hero-role-line-original">
              <span>{displayText}</span>
              <span className="typewriter-cursor-original">|</span>
            </div>

            {/* Rich Bio Summary */}
            <p className="hero-bio-text-original">
              {data?.professionalSummary || data?.personal?.bio || 
                "Currently pursuing a Bachelor of Technology in Computer Engineering at CHARUSAT with hands-on experience in full-stack development, AI powered applications, data science, and digital hardware design. Built scalable projects using React, FastAPI, Node.js, and PostgreSQL, including an AI-powered mock interview platform and a high-performance file processing API. Strong foundation in Data Structures, DBMS, Web Development, and Python, with proven problem-solving skills demonstrated through hackathons, certifications, and coding competitions."}
            </p>

            {/* 3 Metric Cards */}
            <div className="hero-stats-row-original">
              {quickStats.map((stat, idx) => (
                <div key={idx} className="hero-stat-card-original">
                  <div className="hero-stat-number-original">{stat.value}</div>
                  <div className="hero-stat-label-original">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Action CTA Buttons */}
            <div className="hero-cta-buttons-original">
              <button 
                onClick={() => scrollTo('projects')} 
                className="btn-hero-primary"
              >
                <span>Explore Projects</span>
                <FiArrowDown size={18} />
              </button>

              <a
                href="/Krishkumar Darji.pdf"
                download="Krishkumar_Darji_Resume.pdf"
                className="btn-hero-secondary"
                title="Download Resume PDF"
              >
                <FiDownload size={18} />
                <span>Download Resume</span>
              </a>

              <button 
                onClick={() => scrollTo('contact')} 
                className="btn-hero-secondary"
              >
                <span>Get In Touch</span>
                <FiArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
