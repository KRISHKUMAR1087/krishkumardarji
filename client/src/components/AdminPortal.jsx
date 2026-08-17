import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiAward, 
  FiMail, 
  FiTrash2, 
  FiPlus, 
  FiArrowLeft, 
  FiCheck, 
  FiExternalLink, 
  FiInbox, 
  FiEye,
  FiLock,
  FiUnlock,
  FiSend
} from 'react-icons/fi';

export const AdminPortal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('hackathons'); // 'hackathons' | 'queries' | 'stats'
  const [customHackathons, setCustomHackathons] = useState([]);
  const [queries, setQueries] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form fields for adding new Hackathon
  const [hackForm, setHackForm] = useState({
    name: '',
    organizer: '',
    date: '',
    status: 'Completed',
    category: 'Full-Stack Web',
    project: '',
    description: '',
    role: 'Full-Stack Developer',
    github: '',
    githubLabel: 'Repository'
  });

  // Load existing custom hackathons and visitor queries from localStorage
  useEffect(() => {
    try {
      const storedHacks = localStorage.getItem('kd_custom_hackathons');
      if (storedHacks) setCustomHackathons(JSON.parse(storedHacks));

      const storedQueries = localStorage.getItem('kd_visitor_queries');
      if (storedQueries) setQueries(JSON.parse(storedQueries));
    } catch (e) {
      // Fallback
    }
  }, []);

  const handleAddHackathon = (e) => {
    e.preventDefault();
    if (!hackForm.name || !hackForm.project) return;

    const newHack = {
      id: Date.now(),
      ...hackForm,
      github: hackForm.github || null
    };

    const updated = [newHack, ...customHackathons];
    setCustomHackathons(updated);
    localStorage.setItem('kd_custom_hackathons', JSON.stringify(updated));

    setSavedSuccess(true);
    setHackForm({
      name: '',
      organizer: '',
      date: '',
      status: 'Completed',
      category: 'Full-Stack Web',
      project: '',
      description: '',
      role: 'Full-Stack Developer',
      github: '',
      githubLabel: 'Repository'
    });

    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handleDeleteHackathon = (id) => {
    const updated = customHackathons.filter(h => h.id !== id);
    setCustomHackathons(updated);
    localStorage.setItem('kd_custom_hackathons', JSON.stringify(updated));
  };

  const handleDeleteQuery = (id) => {
    const updated = queries.filter(q => q.id !== id);
    setQueries(updated);
    localStorage.setItem('kd_visitor_queries', JSON.stringify(updated));
  };

  const clearAllQueries = () => {
    if (window.confirm("Are you sure you want to clear all inquiries?")) {
      setQueries([]);
      localStorage.removeItem('kd_visitor_queries');
    }
  };

  return (
    <div className="admin-portal-modal-overlay">
      <div className="admin-portal-modal-card">
        {/* Top Header */}
        <div className="admin-portal-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={onClose} className="admin-back-btn" title="Return to Live Portfolio">
              <FiArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </button>
            <div className="admin-badge-pill">
              <span className="admin-pulse-dot" />
              <span>KRISHKUMAR'S ADMIN DASHBOARD</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setActiveTab('hackathons')}
              className={`admin-nav-tab ${activeTab === 'hackathons' ? 'active' : ''}`}
            >
              <FiAward size={14} />
              <span>Hackathons ({customHackathons.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`admin-nav-tab ${activeTab === 'queries' ? 'active' : ''}`}
            >
              <FiInbox size={14} />
              <span>Inquiries ({queries.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Manage Hackathons */}
        {activeTab === 'hackathons' && (
          <div className="admin-tab-content">
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ fontSize: '1.4rem', marginBottom: 4 }}>Add New Hackathon Participation</h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                Add new hackathon participations or podium ranks. Saved entries instantly appear on your live portfolio.
              </p>
            </div>

            {savedSuccess && (
              <div className="admin-success-alert">
                <FiCheck size={18} />
                <span>Hackathon added successfully! It is now live on your portfolio.</span>
              </div>
            )}

            <form onSubmit={handleAddHackathon} className="admin-hack-form">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                <div>
                  <label className="admin-label">Hackathon Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SIH 2026 / Odoo Hackathon"
                    value={hackForm.name}
                    onChange={(e) => setHackForm({ ...hackForm, name: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Organizer *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CHARUSAT / Odoo / IIT Gandhinagar"
                    value={hackForm.organizer}
                    onChange={(e) => setHackForm({ ...hackForm, organizer: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Date *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aug 2026"
                    value={hackForm.date}
                    onChange={(e) => setHackForm({ ...hackForm, date: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 12 }}>
                <div>
                  <label className="admin-label">Status *</label>
                  <select
                    value={hackForm.status}
                    onChange={(e) => setHackForm({ ...hackForm, status: e.target.value })}
                    className="admin-input"
                  >
                    <option value="Winner">Winner (1st/2nd/3rd Rank)</option>
                    <option value="Selected">Selected / Finalist</option>
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
                <div>
                  <label className="admin-label">Domain / Category</label>
                  <input
                    type="text"
                    placeholder="e.g. AI/ML, Full-Stack, Mobility"
                    value={hackForm.category}
                    onChange={(e) => setHackForm({ ...hackForm, category: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">Your Role in Team</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Full-Stack & UI/UX"
                    value={hackForm.role}
                    onChange={(e) => setHackForm({ ...hackForm, role: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 14, marginTop: 12 }}>
                <div>
                  <label className="admin-label">Project Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VanniDoc — Smart Healthcare System"
                    value={hackForm.project}
                    onChange={(e) => setHackForm({ ...hackForm, project: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div>
                  <label className="admin-label">GitHub or Presentation Deck URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={hackForm.github}
                    onChange={(e) => setHackForm({ ...hackForm, github: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label className="admin-label">Short Description / Problem Solved</label>
                <textarea
                  rows="2"
                  placeholder="Built an automated healthcare documentation dashboard with real-time analytics..."
                  value={hackForm.description}
                  onChange={(e) => setHackForm({ ...hackForm, description: e.target.value })}
                  className="admin-input admin-textarea"
                />
              </div>

              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-premium btn-primary">
                  <FiPlus size={16} />
                  <span>Publish Hackathon to Live Site</span>
                </button>
              </div>
            </form>

            {/* List of Custom Added Hackathons */}
            {customHackathons.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 14 }}>
                  Your Custom Added Hackathons ({customHackathons.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {customHackathons.map((item) => (
                    <div key={item.id} className="admin-custom-item-row">
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <strong>{item.name}</strong>
                          <span className={`hack-status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {item.date} • {item.organizer}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--accent-cyan)', marginTop: 4 }}>
                          Project: {item.project} • Role: {item.role}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteHackathon(item.id)}
                        className="admin-delete-btn"
                        title="Remove Hackathon"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Received Visitor Queries */}
        {activeTab === 'queries' && (
          <div className="admin-tab-content">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', marginBottom: 4 }}>Visitor Inquiries & Query Inbox</h2>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                  All inquiries and messages submitted through your portfolio contact form.
                </p>
              </div>

              {queries.length > 0 && (
                <button onClick={clearAllQueries} className="admin-clear-all-btn">
                  Clear All
                </button>
              )}
            </div>

            {queries.length === 0 ? (
              <div className="admin-empty-state">
                <FiMail size={40} style={{ color: 'var(--text-muted)', marginBottom: 12 }} />
                <h3>No queries received yet</h3>
                <p>When visitors submit inquiries through your contact form, they will appear right here!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {queries.map((q) => (
                  <div key={q.id} className="admin-query-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <strong style={{ fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                          {q.name}
                        </strong>
                        <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                          &lt;{q.email}&gt;
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {q.date}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-emerald)', marginBottom: 6 }}>
                      Subject: {q.subject}
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 6, margin: '8px 0 12px' }}>
                      {q.message}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <a
                        href={`mailto:${q.email}?subject=Re: ${encodeURIComponent(q.subject)}`}
                        className="btn-premium btn-primary"
                        style={{ padding: '6px 16px', fontSize: '0.8rem' }}
                      >
                        <FiSend size={13} />
                        <span>Reply to {q.name}</span>
                      </a>

                      <button
                        onClick={() => handleDeleteQuery(q.id)}
                        className="admin-delete-btn"
                        title="Delete Inquiry"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
