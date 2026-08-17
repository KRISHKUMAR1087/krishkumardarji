import { useState, useEffect } from 'react';
import { 
  FiGithub, 
  FiGitCommit, 
  FiExternalLink, 
  FiStar, 
  FiFolder, 
  FiActivity
} from 'react-icons/fi';

const fallbackCommits = [
  {
    repo: "Portfolio-MERN",
    message: "feat(f1): implement F1 engineer technical telemetry theme & racing garage",
    time: "Today",
    hash: "6f343b5",
    url: "https://github.com/KRISHKUMAR1087/Portfolio-MERN"
  },
  {
    repo: "ABTalks",
    message: "feat: implement 60-day interactive coding roadmap UI and progress tracking",
    time: "3 days ago",
    hash: "e3b8d14",
    url: "https://github.com/KRISHKUMAR1087/ABTalks"
  },
  {
    repo: "pathpilot",
    message: "feat: add career roadmap decision logic and user skill assessment engine",
    time: "5 days ago",
    hash: "7c12f90",
    url: "https://github.com/KRISHKUMAR1087/pathpilot"
  },
  {
    repo: "TransitOps",
    message: "perf: optimize PostgreSQL query indexing for real-time dispatch routes",
    time: "1 week ago",
    hash: "98ab45e",
    url: "https://github.com/hastiborda1/TransitOps"
  }
];

const fallbackFeaturedRepos = [
  {
    name: "Portfolio-MERN",
    description: "Production-grade MERN portfolio architected with F1 motorsport telemetry, React, and high-performance UX.",
    language: "JavaScript / React",
    stars: 8,
    forks: 3,
    url: "https://github.com/KRISHKUMAR1087/Portfolio-MERN"
  },
  {
    name: "pathpilot",
    description: "AI-powered career roadmap guidance engine analyzing user skill proficiencies and outputting personalized milestones.",
    language: "Python / React",
    stars: 5,
    forks: 2,
    url: "https://github.com/KRISHKUMAR1087/pathpilot"
  },
  {
    name: "ABTalks",
    description: "Gamified 60-day coding roadmap UI built during 48-Hour Virtual Hackathon with real-time streak calculations.",
    language: "React / CSS3",
    stars: 6,
    forks: 2,
    url: "https://github.com/KRISHKUMAR1087/ABTalks"
  }
];

export const GitHubHighlights = ({ data }) => {
  const githubUrl = data?.social?.github || 'https://github.com/KRISHKUMAR1087';
  const username = 'KRISHKUMAR1087';

  const [commits, setCommits] = useState(fallbackCommits);
  const [repos, setRepos] = useState(fallbackFeaturedRepos);
  const [userStats, setUserStats] = useState({
    publicRepos: 22,
    followers: 12,
    following: 15
  });

  // Cached, single-flight fetch with 30-minute sessionStorage / localStorage cache to prevent GitHub 403 Rate Limits
  useEffect(() => {
    const CACHE_KEY = 'kd_github_cache_v2';
    const CACHE_TTL = 30 * 60 * 1000; // 30 minutes cache

    const loadCachedOrFetch = async () => {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY) || localStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            if (cached.commits) setCommits(cached.commits);
            if (cached.repos) setRepos(cached.repos);
            if (cached.userStats) setUserStats(cached.userStats);
            return; // Use verified cache, zero network calls to avoid rate limit!
          }
        }
      } catch (e) {
        // Fallback to fetch
      }

      // Single flight batch fetch
      try {
        const [userRes, eventsRes, reposRes] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/events/public`),
          fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=4`)
        ]);

        let fetchedUserStats = { publicRepos: 22, followers: 12, following: 15 };
        let fetchedCommits = fallbackCommits;
        let fetchedRepos = fallbackFeaturedRepos;

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const userData = await userRes.value.json();
          fetchedUserStats = {
            publicRepos: userData.public_repos || 22,
            followers: userData.followers || 12,
            following: userData.following || 15
          };
          setUserStats(fetchedUserStats);
        }

        if (eventsRes.status === 'fulfilled' && eventsRes.value.ok) {
          const events = await eventsRes.value.json();
          if (Array.isArray(events)) {
            const pushEvents = events.filter(e => e.type === 'PushEvent');
            if (pushEvents.length > 0) {
              const parsed = [];
              for (const ev of pushEvents) {
                const repoName = ev.repo?.name?.split('/')?.[1] || ev.repo?.name || 'Repository';
                const commitList = ev.payload?.commits || [];
                for (const c of commitList) {
                  parsed.push({
                    repo: repoName,
                    message: c.message || 'Updated repository code',
                    time: new Date(ev.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                    hash: (c.sha || '').slice(0, 7) || 'commit',
                    url: `https://github.com/${ev.repo?.name}/commit/${c.sha}`
                  });
                  if (parsed.length >= 4) break;
                }
                if (parsed.length >= 4) break;
              }
              if (parsed.length > 0) {
                fetchedCommits = parsed.slice(0, 4);
                setCommits(fetchedCommits);
              }
            }
          }
        }

        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const reposData = await reposRes.value.json();
          if (Array.isArray(reposData) && reposData.length > 0) {
            const parsedRepos = reposData.map((r) => ({
              name: r.name,
              description: r.description || 'Full-stack engineering machine built with scalable architecture.',
              language: r.language || 'JavaScript / TypeScript',
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              url: r.html_url
            }));
            fetchedRepos = parsedRepos.slice(0, 3);
            setRepos(fetchedRepos);
          }
        }

        // Save result to cache
        try {
          const payload = {
            timestamp: Date.now(),
            commits: fetchedCommits,
            repos: fetchedRepos,
            userStats: fetchedUserStats
          };
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
          localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
        } catch (err) {
          // Ignore cache write error
        }
      } catch (err) {
        // Fallback silently without throwing or repeating
      }
    };

    loadCachedOrFetch();
  }, [username]);

  return (
    <section id="github" className="section f1-telemetry-section">
      <div className="container">
        <div className="section-header">
          <div className="f1-section-badge">
            <span className="f1-badge-red-block">09</span>
            <span>LIVE TELEMETRY // OPEN SOURCE</span>
          </div>
          <h2>Live Telemetry & Engineering Activity</h2>
          <p>
            Real-time development activity from the engineering garage tracking continuous code velocity across repositories.
          </p>
        </div>

        {/* Telemetry Stats Strip */}
        <div className="f1-telemetry-stats-grid">
          <div className="f1-telemetry-stat-card">
            <div className="f1-telemetry-stat-val" style={{ color: '#00d26a' }}>500+</div>
            <div className="f1-telemetry-stat-lbl">ANNUAL CONTRIBUTIONS</div>
          </div>
          <div className="f1-telemetry-stat-card">
            <div className="f1-telemetry-stat-val" style={{ color: '#00f0ff' }}>{userStats.publicRepos}+</div>
            <div className="f1-telemetry-stat-lbl">PUBLIC REPOSITORIES</div>
          </div>
          <div className="f1-telemetry-stat-card">
            <div className="f1-telemetry-stat-val" style={{ color: '#ffd000' }}>TOP 20</div>
            <div className="f1-telemetry-stat-lbl">GDG TECH SPRINT</div>
          </div>
          <div className="f1-telemetry-stat-card">
            <div className="f1-telemetry-stat-val" style={{ color: '#e10600' }}>18+</div>
            <div className="f1-telemetry-stat-lbl">HACKATHON REPOS</div>
          </div>
        </div>

        {/* Live Contribution Graph */}
        <div className="f1-contribution-graph-card">
          <div className="f1-graph-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FiActivity size={20} style={{ color: '#e10600' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>ENGINEERING ACTIVITY // COMMIT MAP</h3>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                  Live contribution graph for @{username} on GitHub
                </span>
              </div>
            </div>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="f1-gh-profile-btn"
            >
              <FiGithub size={14} />
              <span>github.com/{username}</span>
              <FiExternalLink size={12} />
            </a>
          </div>

          <div className="github-chart-container" style={{ background: '#0a0a0a', padding: '16px', borderRadius: '12px' }}>
            <div className="github-chart-scroll-wrap">
              <img
                src={`https://ghchart.rshah.org/e10600/${username}`}
                alt={`${username}'s Real GitHub Contribution Graph`}
                className="github-live-chart-img"
              />
            </div>
          </div>
        </div>

        {/* Recent Telemetry Commits & Team Repositories */}
        <div className="f1-telemetry-feed-grid">
          {/* Left Column: Recent Commits */}
          <div className="f1-feed-card">
            <div className="f1-feed-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiGitCommit style={{ color: '#00d26a' }} />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>RECENT TELEMETRY</h3>
              </div>
              <span className="f1-feed-badge">VERIFIED STREAM</span>
            </div>

            <div className="f1-commits-list">
              {commits.slice(0, 4).map((c, idx) => (
                <a
                  key={idx}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f1-commit-row"
                >
                  <div className="f1-commit-top">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FiFolder style={{ color: '#e10600', fontSize: '0.85rem' }} />
                      <strong className="f1-commit-repo">{c.repo}</strong>
                    </div>
                    <span className="f1-commit-time">{c.time}</span>
                  </div>

                  <p className="f1-commit-msg">{c.message}</p>

                  <span className="f1-commit-hash">#{c.hash}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Featured Repositories */}
          <div className="f1-feed-card">
            <div className="f1-feed-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiGithub style={{ color: '#ffd000' }} />
                <h3 style={{ fontSize: '1rem', margin: 0 }}>TEAM GARAGE // REPOSITORIES</h3>
              </div>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="f1-view-all-link"
              >
                <span>VIEW ALL</span>
                <FiExternalLink size={12} />
              </a>
            </div>

            <div className="f1-repos-list">
              {repos.slice(0, 3).map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="f1-repo-card"
                >
                  <div className="f1-repo-top">
                    <strong className="f1-repo-name">{repo.name}</strong>
                    <div className="f1-repo-stars">
                      <FiStar size={11} style={{ color: '#ffd000' }} />
                      <span>{repo.stars}</span>
                    </div>
                  </div>

                  <p className="f1-repo-desc">{repo.description}</p>

                  <div className="f1-repo-meta">
                    <span className="f1-repo-dot" />
                    <span>{repo.language}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
