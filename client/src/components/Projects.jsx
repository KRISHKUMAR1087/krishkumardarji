import { FiExternalLink, FiGithub, FiLayers, FiCode, FiCpu, FiCheckCircle } from 'react-icons/fi';

export const Projects = ({ data }) => {
  const projectsList = data?.projects || [];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiLayers size={14} />
            <span>Featured Case Studies</span>
          </div>
          <h2>Engineered Projects & MVPs</h2>
          <p>
            A curated showcase of full-stack web platforms, AI systems, digital hardware designs, and hackathon prototypes.
          </p>
        </div>

        <div className="projects-grid">
          {projectsList.map((project, idx) => {
            const hasLink = Boolean(project.link);
            const githubUrl = project.github || data?.social?.github || "https://github.com/KRISHKUMAR1087";

            return (
              <article
                key={project.id || idx}
                className="project-case-card"
              >
                <div>
                  <div className="project-badge-row">
                    <span className="project-category-tag">
                      {project.category || "Full Stack Application"}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  {project.subtitle && (
                    <div className="project-subtitle">{project.subtitle}</div>
                  )}

                  <p className="project-desc">{project.description}</p>

                  {/* UX & Architectural Highlights */}
                  {project.uxHighlights && project.uxHighlights.length > 0 && (
                    <div className="project-highlights-box">
                      <div className="project-highlights-title">
                        <FiCheckCircle style={{ color: 'var(--accent-cyan)' }} />
                        <span>Key UX & Architecture Highlights</span>
                      </div>
                      <ul className="project-highlights-list">
                        {project.uxHighlights.map((highlight, hIdx) => (
                          <li key={hIdx}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="project-tech-pills">
                    {project.tags?.map((tag, tagIdx) => (
                      <span key={tagIdx} className="project-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="project-actions">
                  {hasLink && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link-btn"
                    >
                      <span>Live Site</span>
                      <FiExternalLink size={16} />
                    </a>
                  )}

                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <FiGithub size={16} />
                    <span>View Repository</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
