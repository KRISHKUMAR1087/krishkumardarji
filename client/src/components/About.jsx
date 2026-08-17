import { FiCompass, FiCheckCircle, FiAward, FiCpu, FiCode, FiLayers } from 'react-icons/fi';
import { RevealSection } from './RevealSection';

export const About = ({ data }) => {
  const specializations = [
    { num: "01", title: "Full-Stack Development", tech: "React • FastAPI • Node.js • PostgreSQL" },
    { num: "02", title: "Gen-AI Applications", tech: "Multi-Agent Workflows • LLMs • Automation" },
    { num: "03", title: "UI/UX Engineering", tech: "Design Systems • Figma • Frictionless Flows" },
    { num: "04", title: "Data Science & Telemetry", tech: "Python • Pandas • NumPy • Spark" },
    { num: "05", title: "Scalable Software Systems", tech: "REST APIs • JWT Security • Microservices" }
  ];

  return (
    <section id="about" className="section f1-about-section">
      <div className="container">
        <RevealSection variant="speed-wipe">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">01</span>
              <span>DRIVER & ENGINEER PROFILE</span>
            </div>
            <h2>Engineer Profile & Philosophy</h2>
            <p>
              Operating at the intersection of computer engineering, full-stack velocity, and high-performance user experience.
            </p>
          </div>

          <div className="f1-driver-profile-grid">
            {/* Left: Driver Identity Card */}
            <div className="f1-driver-card">
              <div className="f1-driver-card-header">
                <span className="f1-driver-team-tag">KRISHKUMAR RACING</span>
                <span className="f1-driver-car-num">#1</span>
              </div>

              <div className="f1-driver-id-box">
                <h3 className="f1-driver-fullname">KRISHKUMAR DARJI</h3>
                <div className="f1-driver-meta-line">
                  <span>INDIA 🇮🇳</span>
                  <span>•</span>
                  <span>CHARUSAT DEPSTAR</span>
                </div>
              </div>

              <div className="f1-driver-stats-strip">
                <div className="f1-driver-stat-col">
                  <span className="f1-stat-caption">DEPARTMENT</span>
                  <strong className="f1-stat-data">Computer Eng.</strong>
                </div>
                <div className="f1-driver-stat-col">
                  <span className="f1-stat-caption">SEASON</span>
                  <strong className="f1-stat-data">2024 — 2028</strong>
                </div>
                <div className="f1-driver-stat-col">
                  <span className="f1-stat-caption">STATUS</span>
                  <strong className="f1-stat-data" style={{ color: '#00d26a' }}>● ACTIVE</strong>
                </div>
              </div>

              {/* Philosophy Box */}
              <div className="f1-philosophy-card-inner">
                <div className="f1-philosophy-headline">
                  DESIGN WITH EMPATHY.<br />
                  BUILD WITH PRECISION.
                </div>
                <p className="f1-philosophy-quote">
                  "Every pixel, typography scale, micro-animation, and database response curve directly impacts the user's perception and trust."
                </p>
              </div>
            </div>

            {/* Right: Technical Notes & Specializations */}
            <div className="f1-engineer-log-card">
              <div className="f1-log-header">
                <span className="f1-log-tag">ENGINEER'S NOTE</span>
                <span className="f1-log-timestamp">TELEMETRY SYNCED</span>
              </div>

              <h3 className="f1-engineer-heading">Engineering Mindset & Approach</h3>
              <p className="f1-engineer-intro">
                {data?.about?.shortBio || data?.personal?.bio || 
                  "Computer Engineering undergraduate at DEPSTAR (CHARUSAT). Dedicated to architecting resilient full-stack systems, Gen-AI powered automation workflows, and high-performance digital interfaces with uncompromising craftsmanship."}
              </p>

              <div className="f1-spec-list-wrap">
                <div className="f1-spec-list-title">CORE SPECIALIZATIONS //</div>
                <div className="f1-spec-items">
                  {specializations.map((spec, idx) => (
                    <div key={idx} className="f1-spec-row">
                      <span className="f1-spec-num">{spec.num}</span>
                      <div className="f1-spec-info">
                        <div className="f1-spec-name">{spec.title}</div>
                        <div className="f1-spec-tech">{spec.tech}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
