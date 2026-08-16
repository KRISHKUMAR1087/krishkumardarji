import { FiBookOpen, FiAward, FiCheckCircle } from 'react-icons/fi';

export const Education = ({ data }) => {
  const college = data?.college || {
    collegeName: "Devang Patel Institute of Advanced Technology and Research (DEPSTAR)",
    university: "Charotar University of Science and Technology (CHARUSAT)",
    program: "B.Tech in Computer Engineering (2024–2028)",
    cgpa: "7.56 / 10 (Cumulative Till 4th Semester)",
    semesters: [
      { number: 1, cgpa: "7.79 / 10" },
      { number: 2, cgpa: "7.71 / 10" },
      { number: 3, cgpa: "7.55 / 10" },
      { number: 4, cgpa: "7.57 / 10" }
    ]
  };

  const school = data?.school || {
    schoolName: "Sharda Mandir Anitaben Devangbhai Patel Ipco Wala Day School, Nadiad",
    hsPercentage: "89.15%",
    results: [
      { title: "S.S.C Result (10th Board)", percentage: "97.12 PR", year: "2022" },
      { title: "H.S.C Result (12th Board Science)", percentage: "89.15 PR", year: "2024" },
      { title: "GUJCET Entrance Exam", percentage: "72.92 PR", year: "2024" }
    ]
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiBookOpen size={14} />
            <span>Academic Journey</span>
          </div>
          <h2>Education & Academic Credentials</h2>
          <p>
            Rigorous engineering foundation at CHARUSAT and consistent distinction in state-level examinations.
          </p>
        </div>

        <div className="edu-achieve-grid">
          {/* Card 1: B.Tech Computer Engineering at CHARUSAT */}
          <div className="timeline-card">
            <div className="timeline-card-header">
              <span className="timeline-tag">2024 – 2028 (Undergraduate)</span>
              <span className="project-category-tag">B.Tech CE</span>
            </div>

            <h3 className="timeline-institution">{college.collegeName}</h3>
            <p className="timeline-degree">{college.university}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: 16 }}>
              {college.program}
            </p>

            <div className="timeline-score-pill">
              <FiCheckCircle />
              <span>Cumulative CGPA: {college.cgpa}</span>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                SEMESTER BREAKDOWN
              </div>
              <div className="semester-grid">
                {college.semesters?.map((sem, idx) => (
                  <div key={idx} className="sem-box">
                    <div className="sem-title">Sem {sem.number}</div>
                    <div className="sem-val">{sem.cgpa}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Higher Secondary & SSC Board Distinctions */}
          <div className="timeline-card">
            <div className="timeline-card-header">
              <span className="timeline-tag">Schooling & Pre-University</span>
              <span className="project-category-tag" style={{ color: 'var(--accent-violet)', background: 'rgba(168, 85, 247, 0.08)', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
                Distinction
              </span>
            </div>

            <h3 className="timeline-institution">{school.schoolName}</h3>
            <p className="timeline-degree">Science Stream • GSEB & GUJCET</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: 16 }}>
              Consistent top-percentile academic standing across secondary and senior secondary board examinations.
            </p>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
                BOARD RESULTS & PERCENTILES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {school.results?.map((res, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{res.title}</span>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 700 }}>{res.percentage} • {res.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
