import { FiCheckCircle, FiExternalLink, FiAward } from 'react-icons/fi';
import { RevealSection } from './RevealSection';

export const Certifications = ({ data }) => {
  const licenses = [
    {
      provider: "NPTEL",
      title: "Python for Data Science",
      status: "ELITE LICENSE",
      score: "72%",
      date: "Jul — Aug 2025",
      tags: ["Python", "Data Science"],
      verify: null
    },
    {
      provider: "NPTEL",
      title: "Database Management Systems",
      status: "ELITE LICENSE",
      score: "63%",
      date: "2026",
      tags: ["DBMS", "SQL"],
      verify: null
    },
    {
      provider: "Coursera",
      title: "Software Engineering Specialization",
      status: "VERIFIED SPECIALIZATION",
      date: "Feb 2026",
      tags: ["Software Eng", "UML", "Architecture"],
      verify: "https://coursera.org/verify/specialization/O5EA9M5F5V5Y"
    },
    {
      provider: "Coursera",
      title: "Building Web Applications in PHP",
      status: "VERIFIED CREDENTIAL",
      date: "Sep 2025",
      tags: ["PHP", "Web Architecture"],
      verify: "https://coursera.org/verify/KL5EZQ5401VC"
    },
    {
      provider: "Coursera",
      title: "Data Structures & Algorithm Analysis",
      status: "VERIFIED CREDENTIAL",
      date: "Aug 2025",
      tags: ["DSA", "Algorithms"],
      verify: "https://coursera.org/verify/GIP8F1M8F3W6"
    },
    {
      provider: "Coursera",
      title: "IBM Data Science Professional",
      status: "TECHNICAL LICENSE",
      date: "2026",
      tags: ["Data Science", "IBM"],
      verify: null
    },
    {
      provider: "Coursera",
      title: "Software Design & Architecture",
      status: "SYSTEMS LICENSE",
      date: "2026",
      tags: ["System Design", "Architecture"],
      verify: null
    },
    {
      provider: "DEPSTAR",
      title: "Scalable Web Applications in MERN",
      status: "ENGINEERING TALK",
      date: "Aug 2025",
      tags: ["MERN", "Full-Stack"],
      verify: null
    }
  ];

  return (
    <section id="certifications" className="section f1-licenses-section">
      <div className="container">
        <RevealSection variant="speed-wipe">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">07</span>
              <span>ENGINEERING LICENSES // CREDENTIALS</span>
            </div>
            <h2>Engineering Licenses & Specializations</h2>
            <p>
              Official technical licenses and verified credentials in Data Science, Software Architecture, and Database Systems.
            </p>
          </div>
        </RevealSection>

        <RevealSection variant="stagger-cards" className="f1-licenses-grid">
          {licenses.map((lic, idx) => (
            <article
              key={idx}
              className="f1-license-card"
            >
              <div className="f1-license-top">
                <span className="f1-license-provider">{lic.provider}</span>
                <span className="f1-license-badge">{lic.status}</span>
              </div>

              <h3 className="f1-license-title">{lic.title}</h3>
              <div className="f1-license-date">{lic.date}</div>

              {lic.score && (
                <div className="f1-license-score-strip">
                  <span>TELEMETRY SCORE:</span>
                  <strong style={{ color: '#00d26a' }}>{lic.score}</strong>
                </div>
              )}

              <div className="f1-license-tags">
                {lic.tags?.map((t, tIdx) => (
                  <span key={tIdx} className="f1-license-tag-pill">
                    {t}
                  </span>
                ))}
              </div>

              <div className="f1-license-footer">
                {lic.verify ? (
                  <a
                    href={lic.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f1-license-link"
                  >
                    <span>VERIFY CREDENTIAL</span>
                    <FiExternalLink size={12} />
                  </a>
                ) : (
                  <span className="f1-license-verified-text">● VERIFIED RECORD</span>
                )}
              </div>
            </article>
          ))}
        </RevealSection>
      </div>
    </section>
  );
};
