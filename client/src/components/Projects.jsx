import { FiExternalLink, FiGithub, FiZap, FiActivity } from 'react-icons/fi';
import { RevealSection } from './RevealSection';

export const Projects = ({ data }) => {
  const projectsList = data?.projects || [
    {
      id: "genie-ai",
      carNumber: "CAR #01",
      title: "Genie Website",
      subtitle: "AI Web Platform & Multi-Agent Assistant",
      category: "GEN-AI APPLICATION",
      powertrain: "REACT • FASTAPI • LLMs • TAILWINDCSS",
      status: "OPERATIONAL ●",
      description: "An intelligent Gen-AI assistant and workflow automation web platform designed to streamline digital tasks, generative workflows, and real-time smart user interactions with an ultra-responsive modern UI.",
      tags: ["React", "FastAPI", "Gen-AI", "LLMs", "TailwindCSS", "Node.js"],
      github: "https://github.com/KRISHKUMAR1087"
    },
    {
      id: "appointment-mgmt",
      carNumber: "CAR #02",
      title: "Appointment Management System",
      subtitle: "Enterprise Internship Project",
      category: "FULL-STACK WEB APP",
      powertrain: "REACT • NODE.JS • EXPRESS • POSTGRESQL",
      status: "DEPLOYED ●",
      description: "Comprehensive scheduling and booking platform engineered during internship. Features real-time slot reservation, automated reminders, doctor/client dashboard, role-based access control, and secure database management.",
      tags: ["React", "Node.js", "Express", "PostgreSQL", "REST APIs", "JWT Auth"],
      github: "https://github.com/KRISHKUMAR1087"
    },
    {
      id: "vannidoc",
      carNumber: "CAR #03",
      title: "VanniDoc Project",
      subtitle: "Smart Healthcare Documentation Engine",
      category: "HEALTHCARE SYSTEM",
      powertrain: "REACT • TYPESCRIPT • NODE.JS • MONGODB",
      status: "OPERATIONAL ●",
      description: "A centralized digital clinical documentation and patient records platform that streamlines medical reporting, appointment workflows, and secure medical file management with clean data validation.",
      tags: ["React", "TypeScript", "Node.js", "MongoDB", "Healthcare Tech", "UI/UX"],
      github: "https://github.com/KRISHKUMAR1087"
    }
  ];

  return (
    <section id="projects" className="section f1-garage-section">
      <div className="container">
        <RevealSection variant="speed-wipe">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">03</span>
              <span>THE GARAGE // RACE BUILDS</span>
            </div>
            <h2>Engineered Projects & Race Builds</h2>
            <p>
              Machines built. Problems solved. High-performance systems deployed to production.
            </p>
          </div>
        </RevealSection>

        <RevealSection variant="stagger-cards" className="f1-garage-grid">
          {projectsList.map((project, idx) => {
            const githubUrl = project.github || data?.social?.github || "https://github.com/KRISHKUMAR1087";
            const carNum = project.carNumber || `CAR #0${idx + 1}`;

            return (
              <article
                key={project.id || idx}
                className="f1-garage-card"
              >
                <div>
                  <div className="f1-garage-card-top">
                    <span className="f1-car-num-tag">{carNum}</span>
                    <span className="f1-car-status-tag">{project.status || "OPERATIONAL ●"}</span>
                  </div>

                  <span className="f1-car-category">{project.category || "ENGINEERED SYSTEM"}</span>
                  <h3 className="f1-car-title">{project.title}</h3>
                  <div className="f1-car-subtitle">{project.subtitle}</div>

                  <div className="f1-car-powertrain-box">
                    <span className="f1-powertrain-label">POWERTRAIN // STACK:</span>
                    <div className="f1-powertrain-text">
                      {project.powertrain || project.tags?.slice(0, 4).join(' • ')}
                    </div>
                  </div>

                  <p className="f1-car-desc">{project.description}</p>

                  <div className="f1-car-chips">
                    {project.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="f1-car-chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="f1-car-actions">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="f1-car-btn-primary"
                    >
                      <span>LIVE SYSTEM</span>
                      <FiExternalLink size={14} />
                    </a>
                  )}

                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f1-car-btn-secondary"
                  >
                    <FiGithub size={14} />
                    <span>VIEW BUILD REPO</span>
                  </a>
                </div>
              </article>
            );
          })}
        </RevealSection>
      </div>
    </section>
  );
};
