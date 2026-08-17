import { useState, useEffect } from 'react';
import { FiAward, FiExternalLink, FiFlag, FiActivity, FiUsers } from 'react-icons/fi';
import { RevealSection } from './RevealSection';

const defaultHackathons = [
  {
    id: 1,
    name: "Smart India Hackathon (SIH) 2025",
    organizer: "Ministry of Education / Gov of India",
    date: "2025",
    status: "Selected",
    rank: "P50",
    teamSize: 6,
    category: "National Level Sprint",
    project: "Centralized Alumni Data Hub",
    description: "Secured 50th rank in institutional selection round for the official SIH problem statement on alumni networking.",
    github: "https://drive.google.com/file/d/1hPHNqygTGll34L-grELx-Df_UI7a7ftv/view?usp=sharing",
    githubLabel: "Solution Deck",
    role: "Deck Architecture & Product Design"
  },
  {
    id: 2,
    name: "Intercollege CODE QUEST 2025",
    organizer: "Department of CSE, DEPSTAR",
    date: "Aug 2025",
    status: "Winner",
    rank: "P03 🥉",
    teamSize: 1,
    category: "Speed Algorithm & Logic",
    project: "Multi-Tier Algorithm Challenge",
    description: "Podium finish in prestigious intercollegiate coding contest solving complex algorithmic problems under speed constraints.",
    github: null,
    role: "Algorithm Solver & Logic Design"
  },
  {
    id: 3,
    name: "AB Talks — 48-Hour Hackathon",
    organizer: "AB Talks",
    date: "Aug 2026",
    status: "Completed",
    rank: "FINISHER",
    teamSize: 3,
    category: "48-Hour Sprint",
    project: "60-Day Coding Challenge UI",
    description: "High-energy gamified coding roadmap UI with dynamic streak tracking, badges, and dark telemetry aesthetic.",
    github: "https://github.com/KRISHKUMAR1087/ABTalks",
    githubLabel: "ABTalks UI",
    role: "UI/UX Designer & Lead Frontend"
  },
  {
    id: 4,
    name: "Odoo Hackathon 2026",
    organizer: "Odoo",
    date: "Jul 2026",
    status: "Completed",
    rank: "FINISHER",
    teamSize: 4,
    category: "Enterprise Logistics",
    project: "TransitOps — Transport System",
    description: "End-to-end logistics & fleet dispatching dashboard with real-time route monitoring and billing automation.",
    github: "https://github.com/hastiborda1/TransitOps",
    githubLabel: "TransitOps Repo",
    role: "Database & Backend Integration"
  },
  {
    id: 5,
    name: "WebWizard Hackathon 2026",
    organizer: "DEPSTAR, CHARUSAT",
    date: "2026",
    status: "Completed",
    rank: "FINISHER",
    teamSize: 4,
    category: "Full-Stack Web Sprint",
    project: "Smart Library Management System",
    description: "Automated cataloging, member checkout tracking, and instant fine calculation engine.",
    github: "https://github.com/KRISHKUMAR1087/Liberary-Management",
    githubLabel: "Library Repo",
    role: "Full-Stack & Database Design"
  },
  {
    id: 6,
    name: "Tech Tonic Hackathon 2025",
    organizer: "CMPICA, CHARUSAT",
    date: "Aug 2025",
    status: "Completed",
    rank: "FINISHER",
    teamSize: 5,
    category: "Campus Mobility",
    project: "RideShare — Student Car Pooling",
    description: "Campus ride-sharing platform optimizing daily commutes and peer matching.",
    github: "https://github.com/KRISHKUMAR1087/Ride-Share-2",
    githubLabel: "RideShare Repo",
    role: "Frontend Connection & Backend"
  }
];

export const Hackathons = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hackathonsList, setHackathonsList] = useState(defaultHackathons);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kd_custom_hackathons');
      if (stored) {
        const customItems = JSON.parse(stored);
        if (Array.isArray(customItems) && customItems.length > 0) {
          setHackathonsList([...customItems, ...defaultHackathons]);
        }
      }
    } catch (e) {
      // Fallback
    }
  }, []);

  const filters = ["All", "Winner", "Selected", "Completed"];

  const filteredHackathons = activeFilter === "All"
    ? hackathonsList
    : hackathonsList.filter(h => h.status.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="hackathons" className="section f1-raceweekend-section">
      <div className="container">
        <RevealSection variant="speed-wipe">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">04</span>
              <span>RACE WEEKEND // HACKATHON SPRINTS</span>
            </div>
            <h2>Race Weekend & Hackathon Sprints</h2>
            <p>
              18+ high-pressure hackathon sprints, rapid prototypes, and agile engineering finishes under race constraints.
            </p>
          </div>

          {/* Season Standings Strip */}
          <div className="f1-season-standings-box">
            <div className="f1-standings-header">
              <span>SEASON RACE RESULTS // 2024 — 2026</span>
              <span style={{ color: '#00d26a' }}>VERIFIED POSITIONS</span>
            </div>
            <div className="f1-standings-pills">
              <span className="f1-standing-pill podium">CODE QUEST 2025: <strong>P03 🥉</strong></span>
              <span className="f1-standing-pill top20">GDG TECH SPRINT: <strong>TOP 20</strong></span>
              <span className="f1-standing-pill top20">GHOST HUNT CTF: <strong>P19</strong></span>
              <span className="f1-standing-pill">SIH 2025: <strong>P50</strong></span>
              <span className="f1-standing-pill">SPRINTS STARTED: <strong>18+</strong></span>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="f1-race-filter-bar">
            {filters.map((f, i) => (
              <button
                key={i}
                onClick={() => setActiveFilter(f)}
                className={`f1-filter-btn ${activeFilter === f ? 'active' : ''}`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>
        </RevealSection>

        {/* Race Results Grid */}
        <RevealSection variant="stagger-cards" className="f1-race-cards-grid">
          {filteredHackathons.map((hack, idx) => (
            <article
              key={hack.id || idx}
              className="f1-race-card"
            >
              <div className="f1-race-card-top">
                <span className={`f1-race-rank-badge ${hack.status.toLowerCase()}`}>
                  {hack.rank || hack.status}
                </span>
                <span className="f1-race-date">{hack.date}</span>
              </div>

              <h3 className="f1-race-title">{hack.name}</h3>
              <div className="f1-race-org">{hack.organizer}</div>

              <div className="f1-race-project-box">
                <span className="f1-race-proj-lbl">PROJECT:</span>
                <strong className="f1-race-proj-val">{hack.project}</strong>
              </div>

              <p className="f1-race-desc">{hack.description}</p>

              <div className="f1-race-footer">
                <span className="f1-race-role">ROLE: {hack.role}</span>
                {hack.github && (
                  <a
                    href={hack.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f1-race-link"
                  >
                    <span>{hack.githubLabel || "VIEW BUILD"}</span>
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </RevealSection>
      </div>
    </section>
  );
};
