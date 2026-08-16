import { FiCheckCircle, FiExternalLink, FiAward, FiFileText } from 'react-icons/fi';

export const Certifications = ({ data }) => {
  const courses = data?.courses || [];
  const seminars = data?.certificates?.seminar || [];
  const technicalCerts = data?.certificates?.technical || [];

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiCheckCircle size={14} />
            <span>Verified Credentials</span>
          </div>
          <h2>Certifications & Specializations</h2>
          <p>
            Rigorous coursework and verified credentials across Data Science, Database Management, Software Engineering, and Web Architecture.
          </p>
        </div>

        <div className="certs-grid">
          {courses.map((course, idx) => (
            <article
              key={idx}
              className="cert-card"
            >
              <div>
                <div className="cert-badge-row">
                  <span className="cert-provider-tag">{course.provider}</span>
                  {course.recognition && (
                    <span className="cert-elite-badge">{course.recognition}</span>
                  )}
                </div>

                <h3 className="cert-name">{course.title}</h3>
                <div className="cert-date">{course.date}</div>

                {course.breakdown && (
                  <div className="cert-score-breakdown">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Assignments:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{course.breakdown.onlineAssignments}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Proctored Exam:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{course.breakdown.proctoredExam}</strong>
                    </div>
                    {course.score && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: 4, marginTop: 4 }}>
                        <span>Final Score:</span>
                        <strong style={{ color: 'var(--accent-emerald)' }}>{course.score}</strong>
                      </div>
                    )}
                  </div>
                )}

                {course.details && course.details.length > 0 && (
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                      COURSES IN SPECIALIZATION:
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {course.details.map((sub, sIdx) => (
                        <li key={sIdx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          ▹ {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {course.tags?.map((tag, tagIdx) => (
                    <span key={tagIdx} className="project-pill" style={{ fontSize: '0.72rem' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {course.verify ? (
                  <a
                    href={course.verify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-btn"
                  >
                    <span>Verify Credential</span>
                    <FiExternalLink size={14} />
                  </a>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Verified by NPTEL / CHARUSAT
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Technical Seminars & Workshops Row */}
        {seminars.length > 0 && (
          <div style={{ marginTop: 56 }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 20, textAlign: 'center' }}>
              Specialized Workshops & Industry Talks
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
              {seminars.map((sem, sIdx) => (
                <div
                  key={sIdx}
                  className="timeline-card"
                  style={{ padding: 20, background: 'rgba(15, 20, 32, 0.4)' }}
                >
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                    {sem.date}
                  </div>
                  <h4 style={{ fontSize: '1.02rem', marginBottom: 6 }}>{sem.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{sem.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
