import { FiAward, FiCheckCircle, FiTrendingUp, FiShield } from 'react-icons/fi';

export const Achievements = ({ data }) => {
  const achievements = data?.achievements || [
    {
      title: "Intercollege CODE QUEST 2025 Winner — 3rd Rank",
      description: "Secured 3rd Rank in CODEQUEST 2025, a prestigious intercollege speed coding and algorithm competition organized by the Department of CSE at DEPSTAR, CHARUSAT.",
      tags: ["Competitive Programming", "DSA", "Problem Solving"],
      date: "August 2025",
      highlight: "Winner • 3rd Rank",
      icon: FiAward
    },
    {
      title: "Top 20 in CHARUSAT GDG Tech Sprint Hackathon",
      description: "Ranked among top 20 participants across the university in the 7-day intensive GitHub Contribution Hackathon (GDG Tech Sprint), demonstrating continuous integration, version control, and rapid commits.",
      tags: ["GDG Hackathon", "GitHub Sprint", "Open Source"],
      date: "2026",
      highlight: "Top 20 Finalist",
      icon: FiTrendingUp
    },
    {
      title: "Secured 19th Rank in Ghost Hunt — Chapter 1 CTF",
      description: "Cybersecurity CTF event organized by CSPIT, CHARUSAT. Solved forensic and cryptographic stages, ranking 19th among 118 competitive teams.",
      tags: ["Cybersecurity", "CTF", "Digital Forensics"],
      date: "2 August 2025",
      highlight: "19th Rank / 118 Teams",
      icon: FiShield
    }
  ];

  return (
    <section id="achievements" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiAward size={14} />
            <span>Honors & Rankings</span>
          </div>
          <h2>Competitive Achievements</h2>
          <p>
            Recognitions in intercollege coding contests, university hackathons, and technical challenges.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {achievements.map((item, idx) => {
            const Icon = item.icon || FiAward;
            return (
              <article
                key={idx}
                className="timeline-card"
              >
                <div className="timeline-card-header">
                  <span className="timeline-score-pill" style={{ marginBottom: 0 }}>
                    <Icon />
                    <span>{item.highlight || item.date}</span>
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {item.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginTop: 14, marginBottom: 10, lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: 18 }}>
                  {item.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
                  {item.tags?.map((tag, tagIdx) => (
                    <span key={tagIdx} className="project-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
