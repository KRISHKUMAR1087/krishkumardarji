import { FiAward, FiTrendingUp, FiShield, FiFlag } from 'react-icons/fi';
import { RevealSection } from './RevealSection';

export const Achievements = ({ data }) => {
  const podiumFinishes = [
    {
      position: "P03 🥉",
      title: "Intercollege CODE QUEST 2025 Winner",
      event: "Intercollege Speed Algorithm Challenge",
      organizer: "Dept of CSE, DEPSTAR, CHARUSAT",
      date: "August 2025",
      type: "PODIUM FINISH",
      color: "#ffd000",
      description: "Secured 3rd Rank podium finish solving multi-tier algorithmic problems and optimized data structures under strict time pressure."
    },
    {
      position: "TOP 20 🏎️",
      title: "CHARUSAT GDG Tech Sprint",
      event: "7-Day GitHub Contribution Sprint",
      organizer: "Google Developer Groups CHARUSAT",
      date: "2026",
      type: "FINALIST",
      color: "#00d26a",
      description: "Ranked in top 20 across the entire university during the high-velocity 7-day contribution hackathon demonstrating Git telemetry."
    },
    {
      position: "P19 🛡️",
      title: "Ghost Hunt — Chapter 1 CTF",
      event: "Cybersecurity & Forensic CTF",
      organizer: "CSPIT, CHARUSAT",
      date: "August 2025",
      type: "TOP 20 FINISH",
      color: "#00d26a",
      description: "Ranked 19th among 118 competing engineering teams in multi-stage cryptography and digital forensics challenges."
    },
    {
      position: "P50 🎖️",
      title: "Smart India Hackathon (SIH) 2025",
      event: "National Level Selection Sprint",
      organizer: "Ministry of Education / Gov of India",
      date: "2025",
      type: "SELECTION ROUND",
      color: "#e10600",
      description: "Secured 50th rank in institutional selection round for the central alumni networking platform architecture."
    }
  ];

  return (
    <section id="achievements" className="section f1-podium-section">
      <div className="container">
        <RevealSection variant="gauge-count">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">06</span>
              <span>PODIUM FINISHES // RACE HONORS</span>
            </div>
            <h2>Podium Finishes & Race Honors</h2>
            <p>
              Competitive positions achieved across intercollege algorithm contests, developer sprints, and cybersecurity challenges.
            </p>
          </div>
        </RevealSection>

        <RevealSection variant="stagger-cards" className="f1-podium-grid">
          {podiumFinishes.map((item, idx) => (
            <article
              key={idx}
              className="f1-podium-card"
            >
              <div className="f1-podium-top">
                <span className="f1-podium-position" style={{ color: item.color }}>
                  {item.position}
                </span>
                <span className="f1-podium-type-tag">{item.type}</span>
              </div>

              <h3 className="f1-podium-title">{item.title}</h3>
              <div className="f1-podium-event">{item.event} • {item.organizer}</div>

              <p className="f1-podium-desc">{item.description}</p>

              <div className="f1-podium-footer">
                <span className="f1-podium-date">SEASON // {item.date}</span>
              </div>
            </article>
          ))}
        </RevealSection>
      </div>
    </section>
  );
};
