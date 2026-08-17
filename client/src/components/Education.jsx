import { FiBookOpen, FiCheckCircle, FiActivity } from 'react-icons/fi';
import { RevealSection } from './RevealSection';

export const Education = ({ data }) => {
  const semesters = [
    { lap: "LAP 01", sem: "Semester 1", cgpa: "7.79 / 10", progress: 77.9, status: "DISTINCTION" },
    { lap: "LAP 02", sem: "Semester 2", cgpa: "7.71 / 10", progress: 77.1, status: "DISTINCTION" },
    { lap: "LAP 03", sem: "Semester 3", cgpa: "7.55 / 10", progress: 75.5, status: "DISTINCTION" },
    { lap: "LAP 04", sem: "Semester 4", cgpa: "7.57 / 10", progress: 75.7, status: "CURRENT LAP" }
  ];

  const rookieRecords = [
    { exam: "S.S.C Result (10th Board)", score: "97.12 PR", year: "2022", badge: "TOP 3% STATEWIDE" },
    { exam: "H.S.C Science (12th Board)", score: "89.15 PR", year: "2024", badge: "DISTINCTION" },
    { exam: "GUJCET Engineering Entrance", score: "72.92 PR", year: "2024", badge: "QUALIFIED" }
  ];

  return (
    <section id="education" className="section f1-seasonhistory-section">
      <div className="container">
        <RevealSection variant="curtain">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">05</span>
              <span>SEASON HISTORY // CAREER LAPS</span>
            </div>
            <h2>Season History & Engineering Career</h2>
            <p>
              Rigorous engineering track record at CHARUSAT DEPSTAR and pre-engineering rookie distinction metrics.
            </p>
          </div>

          <div className="f1-season-grid">
            {/* Main Undergraduate Season: CHARUSAT DEPSTAR */}
            <div className="f1-career-main-card">
              <div className="f1-career-header">
                <div>
                  <span className="f1-season-tag">SEASON 2024 — 2028 // UNDERGRADUATE</span>
                  <h3 className="f1-career-institution">Devang Patel Institute of Advanced Technology and Research (DEPSTAR)</h3>
                  <p className="f1-career-univ">Charotar University of Science and Technology (CHARUSAT)</p>
                  <div className="f1-career-degree">B.Tech in Computer Engineering • Current Lap: Semester 04</div>
                </div>
                <div className="f1-pace-card">
                  <span className="f1-pace-label">OVERALL PACE (CGPA)</span>
                  <strong className="f1-pace-val">7.56 / 10</strong>
                  <span className="f1-pace-sub">Cumulative Distinction</span>
                </div>
              </div>

              {/* Semester Lap Telemetry Bars */}
              <div className="f1-lap-telemetry-box">
                <div className="f1-lap-telemetry-header">
                  <span>SEMESTER LAP PERFORMANCE DATA</span>
                  <span>CGPA / 10.0</span>
                </div>

                <div className="f1-lap-bars">
                  {semesters.map((s, idx) => (
                    <div key={idx} className="f1-lap-bar-row">
                      <div className="f1-lap-info">
                        <span className="f1-lap-name">{s.lap} ({s.sem})</span>
                        <span className="f1-lap-score">{s.cgpa}</span>
                      </div>
                      <div className="f1-lap-track">
                        <div 
                          className="f1-lap-fill" 
                          style={{ 
                            width: `${(parseFloat(s.cgpa) / 10) * 100}%`,
                            background: idx === 3 ? '#e10600' : '#00d26a'
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pre-Engineering Rookie Records */}
            <div className="f1-rookie-records-card">
              <div className="f1-rookie-header">
                <span className="f1-rookie-tag">PRE-ENGINEERING ROOKIE RECORD</span>
                <span className="f1-rookie-school">Sharda Mandir Anitaben Day School</span>
              </div>

              <div className="f1-rookie-items">
                {rookieRecords.map((r, idx) => (
                  <div key={idx} className="f1-rookie-item">
                    <div className="f1-rookie-left">
                      <h4 className="f1-rookie-exam">{r.exam}</h4>
                      <span className="f1-rookie-year">Season {r.year}</span>
                    </div>
                    <div className="f1-rookie-right">
                      <strong className="f1-rookie-score">{r.score}</strong>
                      <span className="f1-rookie-badge">{r.badge}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
