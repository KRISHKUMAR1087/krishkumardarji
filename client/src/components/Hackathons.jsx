import { useState } from 'react';
import { FiAward, FiGithub, FiExternalLink, FiUsers, FiCalendar, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';

const fallbackHackathons = [
  {
    id: 1,
    name: "Smart India Hackathon (SIH) 2025",
    organizer: "Ministry of Education / Gov of India",
    date: "2025",
    status: "Selected",
    teamSize: 6,
    category: "National",
    project: "Centralized Alumni Data Management & Engagement Hub",
    description: "Secured 50th rank in institutional selection round for the official SIH problem statement on alumni networking.",
    github: "https://drive.google.com/file/d/1hPHNqygTGll34L-grELx-Df_UI7a7ftv/view?usp=sharing",
    githubLabel: "View Solution Deck",
    isPPT: true,
    role: "Deck Architecture & Product Design"
  },
  {
    id: 2,
    name: "Intercollege CODE QUEST 2025",
    organizer: "Department of CSE, DEPSTAR, CHARUSAT",
    date: "August 2025",
    status: "Winner",
    teamSize: 1,
    category: "Competitive Coding",
    project: "Speed Algorithm & Data Structure Challenge",
    description: "Secured 3rd Rank in prestigious intercollegiate coding contest solving multi-tier algorithmic problems.",
    github: null,
    role: "Algorithm Solver & Logic Design"
  },
  {
    id: 3,
    name: "AB Talks — 48-Hour Virtual Hackathon",
    organizer: "AB Talks",
    date: "7–9 August 2026",
    status: "Completed",
    teamSize: 3,
    category: "UI/UX & Frontend",
    project: "60-Day Coding Challenge Experience UI",
    description: "High-energy, gamified coding roadmap UI with dynamic progress streak trackers, badges, and dark aesthetic.",
    github: "https://github.com/KRISHKUMAR1087/ABTalks",
    githubLabel: "ABTalks UI",
    role: "UI/UX Designer & Lead Frontend"
  },
  {
    id: 4,
    name: "Odoo Hackathon 2026",
    organizer: "Odoo",
    date: "12 July 2026",
    status: "Completed",
    teamSize: 4,
    category: "Web & Logistics",
    project: "TransitOps — Transport Management System",
    description: "End-to-end logistics & fleet dispatching dashboard with real-time route monitoring and invoice automation.",
    github: "https://github.com/hastiborda1/TransitOps",
    githubLabel: "TransitOps Repo",
    role: "Database Architecture & Backend Integration"
  },
  {
    id: 5,
    name: "WebWizard Hackathon 2026",
    organizer: "DEPSTAR, CHARUSAT",
    date: "2026",
    status: "Completed",
    teamSize: 4,
    category: "Full-Stack Web",
    project: "Smart Library Management System",
    description: "Automated cataloging, member checkout tracking, and instant fine calculation with responsive UI.",
    github: "https://github.com/KRISHKUMAR1087/Liberary-Management",
    githubLabel: "Library Repo",
    role: "Full-Stack & Database Design"
  },
  {
    id: 6,
    name: "Tech Tonic Hackathon 2025",
    organizer: "CMPICA, CHARUSAT",
    date: "30 August 2025",
    status: "Completed",
    teamSize: 5,
    category: "Community Mobility",
    project: "RideShare — Student-to-Student Car Pooling Platform",
    description: "Campus ride-sharing platform optimizing daily commutes, peer matching, and verified student verification.",
    github: "https://github.com/KRISHKUMAR1087/Ride-Share-2",
    githubLabel: "RideShare Repo",
    role: "Frontend Connection & Backend Integration"
  },
  {
    id: 7,
    name: "FinSpark'26 Hackathon",
    organizer: "FinSpark / Banking Cybersecurity",
    date: "June–July 2026",
    status: "Completed",
    teamSize: 4,
    category: "Fintech & Security",
    project: "Privileged Access Misuse & Insider Threat Detection",
    description: "AI-driven anomaly detection prototype identifying abnormal privilege escalations in banking ledger systems.",
    github: "https://github.com/KRISHKUMAR1087/Finspark_Hackathon_Prototype",
    githubLabel: "FinSpark Prototype",
    role: "Data Pipeline & Threat Log Processing"
  },
  {
    id: 8,
    name: "TCS Technology Day",
    organizer: "Tata Consultancy Services",
    date: "13 August 2026",
    status: "Completed",
    teamSize: 4,
    category: "EdTech & AI",
    project: "PathPilot — AI Career Path Advisor Web Application",
    description: "Intelligent career roadmap builder assessing user skill proficiencies and outputting personalized milestones.",
    github: "https://github.com/KRISHKUMAR1087/pathpilot",
    githubLabel: "PathPilot Repo",
    role: "Full-Stack Web & Logic Engine"
  },
  {
    id: 9,
    name: "Ghost Hunt — Chapter 1 CTF",
    organizer: "Cyber Cavach / CSPIT, CHARUSAT",
    date: "23 September 2025",
    status: "Selected",
    teamSize: 4,
    category: "Cybersecurity",
    project: "Multi-Tier Capture The Flag Security Challenge",
    description: "Solved forensic challenges, steganography, and cryptography puzzle stages securing top 19th institutional rank among 118 teams.",
    github: null,
    role: "Digital Forensics & Stage Solving"
  },
  {
    id: 10,
    name: "Odoo × Amalthea, IIT Gandhinagar Hackathon",
    organizer: "Odoo × Amalthea, IIT Gandhinagar",
    date: "8 November 2025",
    status: "Completed",
    teamSize: 4,
    category: "E-Commerce & Community",
    project: "StyleShare — Sustainable Fashion Community Platform",
    description: "Peer-to-peer pre-owned clothing exchange platform promoting sustainable wardrobe consumption and community curation.",
    github: "https://github.com/Ashiti03/style-share-community",
    githubLabel: "StyleShare Repo",
    role: "Database Management & APIs"
  },
  {
    id: 11,
    name: "Adobe Hackathon 2026",
    organizer: "Adobe",
    date: "August 2026",
    status: "Ongoing",
    teamSize: 3,
    category: "Creative Tech",
    project: "Advanced Algorithmic & Creative Design Challenge",
    description: "Multi-stage algorithmic problem solving and design thinking sprint currently in active progress.",
    github: null,
    role: "UI Design & Core Logic"
  },
  {
    id: 12,
    name: "HACK ORBIT by GDG CHARUSAT",
    organizer: "GDG CHARUSAT",
    date: "Upcoming 2026",
    status: "Upcoming",
    teamSize: 4,
    category: "Healthcare & AI",
    project: "Multilingual AI Health Intake System for Rural Clinics",
    description: "Voice-driven multilingual clinical triage intake that translates patient symptoms into structured EHR summaries.",
    github: null,
    role: "UI/UX Flow & AI Integration"
  },
  {
    id: 13,
    name: "Odoo Hackathon 2025",
    organizer: "Odoo",
    date: "12 July 2025",
    status: "Completed",
    teamSize: 4,
    category: "Circular Economy",
    project: "ReWear — Community Wardrobe Swap System",
    description: "Micro-service enabled clothing circulation platform connecting local universities for textile waste reduction.",
    github: "https://github.com/jensi17/rewear-project",
    githubLabel: "ReWear Project",
    role: "Database Architecture"
  }
];

// Distinct stats blocks with Selected and Winner separated into distinct blocks, and Role Focus block removed
const statsBlocks = [
  { label: 'Total Events', val: '18', color: 'var(--accent-cyan)' },
  { label: 'Selected', val: '2', color: 'var(--accent-cyan)' },
  { label: 'Wins & Podiums', val: '1', color: 'var(--accent-amber)' },
  { label: 'Completed', val: '12+', color: 'var(--accent-emerald)' },
  { label: 'Continue (Ongoing)', val: '1', color: 'var(--accent-amber)' },
  { label: 'Upcoming', val: '2', color: 'var(--accent-violet)' }
];

export const Hackathons = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterTabs = [
    'All',
    'Completed',
    'Continue (Ongoing)',
    'Upcoming',
    'Selected',
    'Winner / National'
  ];

  const filteredEvents = fallbackHackathons.filter((event) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Completed') return event.status === 'Completed' || event.status === 'Participated';
    if (selectedFilter === 'Continue (Ongoing)') return event.status === 'Ongoing' || event.status === 'Continue';
    if (selectedFilter === 'Upcoming') return event.status === 'Upcoming';
    if (selectedFilter === 'Selected') return event.status === 'Selected';
    if (selectedFilter === 'Winner / National') return event.status === 'Winner' || event.category === 'National';
    return true;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Winner': return 'status-selected';
      case 'Selected': return 'status-selected';
      case 'Completed': return 'status-completed';
      case 'Upcoming': return 'status-upcoming';
      case 'Ongoing': return 'status-ongoing';
      default: return 'status-participated';
    }
  };

  return (
    <section id="hackathons" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiAward size={14} />
            <span>Competitive Sprints</span>
          </div>
          <h2>Hackathon & Competition Record</h2>
          <p>
            18+ hackathons and speed-coding sprints — driving rapid UX ideation, MVP frontend development, and resilient database architectures under strict deadlines.
          </p>
        </div>

        {/* Separated Stats Blocks (Selected & Won separated, Role Focus removed) */}
        <div className="hackathons-stats-bar" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
          {statsBlocks.map((stat, idx) => (
            <div key={idx} className="hack-stat-card">
              <div className="hack-stat-val" style={{ color: stat.color }}>{stat.val}</div>
              <div className="hack-stat-name">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Dynamic Participation Filter Tabs */}
        <div className="skills-filter-nav" style={{ justifyContent: 'center', marginBottom: 32 }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`skill-tab-btn ${selectedFilter === tab ? 'active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Hackathon Cards Grid */}
        <div className="hackathon-list-grid">
          {filteredEvents.map((hack) => (
            <article
              key={hack.id}
              className="hack-card"
            >
              <div>
                <div className="hack-top-meta">
                  <span className={`hack-status-badge ${getStatusClass(hack.status)}`}>
                    {hack.status}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {hack.date}
                  </span>
                </div>

                <h3 className="hack-title">{hack.name}</h3>
                <div className="hack-organizer">{hack.organizer || "DEPSTAR / CHARUSAT"}</div>

                {hack.project && (
                  <div className="hack-project-name">
                    {hack.project}
                  </div>
                )}

                <p className="hack-desc">{hack.description}</p>
              </div>

              <div>
                <div style={{ marginBottom: 12 }}>
                  <span className="hack-role-chip">
                    Role: {hack.role}
                  </span>
                </div>

                <div className="hack-meta-footer">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiUsers size={14} />
                    <span>Team of {hack.teamSize}</span>
                  </div>

                  {hack.github && (
                    <a
                      href={hack.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent-cyan)', fontWeight: 650 }}
                    >
                      {hack.isPPT ? <FiFileText size={14} /> : <FiGithub size={14} />}
                      <span>{hack.githubLabel || "View Link"}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
