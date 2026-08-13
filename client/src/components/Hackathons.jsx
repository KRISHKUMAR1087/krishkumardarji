import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub, FiUsers, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const hackathonData = [
  {
    id: 1,
    name: 'Odoo Hackathon 2026',
    organizer: 'Odoo',
    date: '12 July 2026',
    status: 'Participated',
    team: 4,
    project: 'Transport Management System',
    github: 'https://github.com/hastiborda1/TransitOps',
    githubLabel: 'TransitOps',
  },
  {
    id: 2,
    name: 'WebWizard Hackathon 2026',
    organizer: 'DEPSTAR, CHARUSAT',
    date: '2026',
    status: 'Participated',
    team: 4,
    project: 'Library Management System',
    github: 'https://github.com/KRISHKUMAR1087/Liberary-Management',
    githubLabel: 'Library Management',
  },
  {
    id: 3,
    name: 'Tech Tonic Hackathon',
    organizer: 'CHARUSAT',
    date: '30 August 2025',
    status: 'Participated',
    team: 5,
    project: 'Student-to-Student Car Pooling Website',
    github: 'https://github.com/KRISHKUMAR1087/Ride-Share-2',
    githubLabel: 'Ride Share',
  },
  {
    id: 4,
    name: 'AB Talks – 48 Hour Virtual Hackathon',
    organizer: 'AB Talks',
    date: '7–9 August 2026',
    status: 'Participated',
    team: 3,
    project: 'UI for a 60-Day Coding Challenge Website',
    github: 'https://github.com/KRISHKUMAR1087/ABTalks',
    githubLabel: 'AB Talks',
  },
  {
    id: 5,
    name: "FinSpark'26 Hackathon",
    organizer: 'FinSpark / Banking Cybersecurity',
    date: 'June–July 2026',
    status: 'Participated',
    team: 4,
    project: 'Privileged Access Misuse & Insider Threat Detection',
    github: 'https://github.com/KRISHKUMAR1087/Finspark_Hackathon_Prototype',
    githubLabel: 'FinSpark Prototype',
  },
  {
    id: 6,
    name: 'HACK ORBIT by GDG CHARUSAT',
    organizer: 'GDG CHARUSAT',
    date: '15 August 2026',
    status: 'Upcoming',
    team: 4,
    project: 'Multilingual AI Health Intake System for Rural Clinics',
    github: null,
    githubLabel: null,
  },
  {
    id: 7,
    name: 'Smart India Hackathon (SIH) 2025',
    organizer: 'SIH / Government of India',
    date: '2025',
    status: 'Selected',
    team: 6,
    project: 'Digital Platform for Centralized Alumni Data Management and Engagement',
    github: 'https://drive.google.com/file/d/1hPHNqygTGll34L-grELx-Df_UI7a7ftv/view?usp=sharing',
    githubLabel: 'PPT Submission',
    isPPT: true,
  },
  {
    id: 8,
    name: 'Odoo × Amalthea, IIT Gandhinagar Hackathon',
    organizer: 'Odoo × Amalthea, IIT Gandhinagar',
    date: '8 November 2025',
    status: 'Participated',
    team: 4,
    project: 'Clothing Brand Website / Fashion Community Platform',
    github: 'https://github.com/Ashiti03/style-share-community',
    githubLabel: 'Style Share Community',
  },
  {
    id: 9,
    name: 'Adobe Hackathon 2026',
    organizer: 'Adobe',
    date: '9 August 2026',
    status: 'Ongoing',
    team: 3,
    project: 'MCQ + Coding Round Completed',
    github: null,
    githubLabel: null,
  },
  {
    id: 10,
    name: 'Ocean Lab × CHARUSAT Hackathon',
    organizer: 'Ocean Lab × CHARUSAT',
    date: '3–5 April 2026',
    status: 'Participated',
    team: 4,
    project: null,
    github: null,
    githubLabel: null,
  },
  {
    id: 11,
    name: 'Capture the Flag (CTF) Challenge',
    organizer: 'CSPIT, CHARUSAT',
    date: '12 February 2026',
    status: 'Completed',
    team: 4,
    project: 'CTF Challenge',
    github: null,
    githubLabel: null,
  },
  {
    id: 12,
    name: 'Odoo Hackathon 2025',
    organizer: 'Odoo',
    date: '12 July 2025',
    status: 'Participated',
    team: 4,
    project: 'ReWear – Community Clothing Exchange',
    github: 'https://github.com/jensi17/rewear-project',
    githubLabel: 'ReWear',
  },
  {
    id: 13,
    name: 'BioMed Bharat Hackathon',
    organizer: 'BioMed Bharat',
    date: '24 July 2026',
    status: 'Ongoing',
    team: 3,
    project: 'Intelligent Hospital-Based Laboratory Trend Analysis and Monitoring Platform',
    github: null,
    githubLabel: null,
  },
  {
    id: 14,
    name: 'KenexAI Hackathon',
    organizer: 'KenexAI',
    date: 'April 2026',
    status: 'Participated',
    team: 3,
    project: 'Aptitude Round',
    github: null,
    githubLabel: null,
  },
  {
    id: 15,
    name: 'TCS Technology Day',
    organizer: 'TCS',
    date: '13 August 2026',
    status: 'Participated',
    team: 4,
    project: 'Career Path Advisor Web Application',
    github: 'https://github.com/KRISHKUMAR1087/pathpilot',
    githubLabel: 'PathPilot',
  },
  {
    id: 16,
    name: 'SIH 2026',
    organizer: 'Smart India Hackathon',
    date: '2026',
    status: 'Upcoming',
    team: 6,
    project: null,
    github: null,
    githubLabel: null,
  },
  {
    id: 17,
    name: 'Ghost Hunt — Chapter 1',
    organizer: null,
    date: '23 September 2025',
    status: 'Completed',
    team: 5,
    project: null,
    github: null,
    githubLabel: null,
  },
  {
    id: 18,
    name: 'Stint-Thon Hackathon',
    organizer: null,
    date: '21 February 2026',
    status: 'Completed',
    team: 3,
    project: '7-Day GitHub Contribution Challenge',
    github: null,
    githubLabel: null,
  },
];

const stats = [
  { label: 'Total Events', value: '18' },
  { label: 'Participated', value: '12+' },
  { label: 'Completed', value: '3' },
  { label: 'Upcoming', value: '2' },
  { label: 'Ongoing', value: '2' },
  { label: 'GitHub Repos', value: '9' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Participated': return '#a1a1aa';
    case 'Completed': return '#00ff88';
    case 'Selected': return '#00ffff';
    case 'Ongoing': return '#facc15';
    case 'Upcoming': return '#bf55ec';
    default: return '#a1a1aa';
  }
};

export const Hackathons = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="hackathons" className="section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Hackathon Participations
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            18 hackathons & competitions — building, competing, learning
          </motion.p>
        </div>

        {/* Quick Stats */}
        <motion.div
          className="hack-stats-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="hack-stat-item">
              <span className="hack-stat-value">{stat.value}</span>
              <span className="hack-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Hackathon Cards */}
        <div className="hack-list">
          {hackathonData.map((hack, idx) => (
            <motion.div
              key={hack.id}
              className="hack-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.04 }}
            >
              <div
                className="hack-card-header"
                onClick={() => setExpanded(expanded === hack.id ? null : hack.id)}
              >
                <div className="hack-card-left">
                  <span className="hack-number">#{String(hack.id).padStart(2, '0')}</span>
                  <div className="hack-card-info">
                    <h3 className="hack-name">{hack.name}</h3>
                    <div className="hack-meta">
                      {hack.organizer && <span className="hack-organizer">{hack.organizer}</span>}
                      <span className="hack-date">
                        <FiCalendar size={12} />
                        {hack.date}
                      </span>
                      <span className="hack-team">
                        <FiUsers size={12} />
                        {hack.team} members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hack-card-right">
                  <span
                    className="hack-status"
                    style={{
                      color: getStatusColor(hack.status),
                      borderColor: getStatusColor(hack.status),
                    }}
                  >
                    {hack.status}
                  </span>
                  {(hack.project || hack.github) && (
                    <span className="hack-expand-icon">
                      {expanded === hack.id ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </span>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {expanded === hack.id && (hack.project || hack.github) && (
                  <motion.div
                    className="hack-card-details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="hack-details-inner">
                      {hack.project && (
                        <p className="hack-project">
                          <strong>Project:</strong> {hack.project}
                        </p>
                      )}
                      {hack.github && (
                        <a
                          href={hack.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hack-link"
                        >
                          {hack.isPPT ? <FiExternalLink size={14} /> : <FiGithub size={14} />}
                          {hack.githubLabel}
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
