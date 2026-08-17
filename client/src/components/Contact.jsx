import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiInstagram,
  FiTwitter,
  FiCopy,
  FiCheck,
  FiSend,
  FiRadio,
  FiTerminal
} from 'react-icons/fi';
import { FaThreads, FaSnapchat } from 'react-icons/fa6';
import { RevealSection } from './RevealSection';

export const Contact = ({ data, onOpenAdmin }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    purpose: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const email = data?.social?.email || "hello.krishkumardarji@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    const queryObj = {
      id: Date.now(),
      name: formState.name,
      email: formState.email,
      subject: formState.purpose || "Pit Wall Transmission",
      message: formState.message,
      date: new Date().toLocaleString(),
      read: false
    };

    // 1. Save query to Admin Dashboard local storage
    try {
      const existing = localStorage.getItem('kd_visitor_queries');
      const queries = existing ? JSON.parse(existing) : [];
      queries.unshift(queryObj);
      localStorage.setItem('kd_visitor_queries', JSON.stringify(queries));
    } catch (err) {}

    // 2. Direct Email Delivery to your Inbox via FormSubmit API
    try {
      await fetch('https://formsubmit.co/ajax/hello.krishkumardarji@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🏎️ PIT WALL TRANSMISSION: ${formState.purpose || 'New Message from Portfolio'}`,
          _captcha: 'false',
          _template: 'table',
          'Driver / Caller Name': formState.name,
          'Caller Email': formState.email,
          'Purpose / Opportunity': formState.purpose || 'General Transmission',
          'Transmission Message': formState.message,
          'Telemetry Timestamp': new Date().toLocaleString()
        })
      });
    } catch (err) {
      // Fallback
    }

    // 3. Local backend sync if running
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryObj)
      });
    } catch (err) {}

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormState({ name: '', email: '', purpose: '', message: '' });
    setTimeout(() => setSubmitSuccess(false), 6000);
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: data?.social?.linkedin || "https://www.linkedin.com/in/krishkumar-d-b4a7952b1",
      icon: FiLinkedin,
      handle: "krishkumar-d"
    },
    {
      name: "GitHub",
      url: data?.social?.github || "https://github.com/KRISHKUMAR1087",
      icon: FiGithub,
      handle: "@KRISHKUMAR1087"
    },
    {
      name: "Instagram",
      url: data?.social?.instagram || "https://www.instagram.com/genzkrish",
      icon: FiInstagram,
      handle: "@genzkrish"
    },
    {
      name: "X (Twitter)",
      url: data?.social?.twitter || "https://x.com/genzkrish",
      icon: FiTwitter,
      handle: "@genzkrish"
    }
  ];

  return (
    <section id="contact" className="section f1-pitwall-section">
      <div className="container">
        <RevealSection variant="curtain">
          <div className="f1-pitwall-card">
            <div className="f1-pitwall-grid">
              {/* Left Column: Radio Channel & Driver Direct Comms */}
              <div className="f1-pitwall-left">
                <div className="f1-section-badge" style={{ marginBottom: 12 }}>
                  <span className="f1-badge-red-block">10</span>
                  <span>PIT WALL // COMMUNICATION CHANNEL</span>
                </div>

                <h2 className="f1-pitwall-title">
                  Open Radio Transmission
                </h2>
                <p className="f1-pitwall-desc">
                  Have an engineering project, internship opportunity, or hackathon collaboration? The pit wall radio is always open for transmissions.
                </p>

                {/* Direct Frequency / Email Copy Box */}
                <div className="f1-comms-frequency-box">
                  <span className="f1-frequency-tag">PRIMARY FREQUENCY //</span>
                  <div className="f1-frequency-row">
                    <FiMail style={{ color: '#e10600', fontSize: '1.1rem' }} />
                    <span className="f1-frequency-email">{email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="f1-copy-freq-btn"
                      title="Copy Frequency Email"
                    >
                      {copied ? <FiCheck /> : <FiCopy />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Team Communication Links */}
                <div className="f1-social-links-title">TEAM CHANNELS //</div>
                <div className="f1-social-links-grid">
                  {socialLinks.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="f1-social-channel-btn"
                      >
                        <Icon style={{ fontSize: '1.1rem', color: '#e10600' }} />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#f4f1ea' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: "'JetBrains Mono', monospace" }}>
                            {item.handle}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Transmission Console Form */}
              <div className="f1-pitwall-form-console">
                <div className="f1-form-console-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FiRadio style={{ color: '#00d26a' }} />
                    <h3 style={{ fontSize: '1.05rem', margin: 0, letterSpacing: '0.04em' }}>
                      TRANSMISSION CONSOLE
                    </h3>
                  </div>
                  <span className="f1-form-console-status">LIVE CHANNEL ●</span>
                </div>

                {submitSuccess ? (
                  <div className="f1-transmission-success-box">
                    <FiCheck size={32} style={{ color: '#00d26a', marginBottom: 8 }} />
                    <h4>TRANSMISSION RECEIVED // 100%</h4>
                    <p>Your message has been broadcast to Krishkumar's pit wall. Expect a prompt telemetry reply.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="f1-transmission-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label className="f1-form-label">DRIVER / CALLER NAME *</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="f1-form-input"
                        />
                      </div>
                      <div>
                        <label className="f1-form-label">EMAIL ADDRESS *</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="f1-form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="f1-form-label">PURPOSE / OPPORTUNITY</label>
                      <input
                        type="text"
                        placeholder="e.g. Full-Stack Internship / Hackathon Team"
                        value={formState.purpose}
                        onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                        className="f1-form-input"
                      />
                    </div>

                    <div>
                      <label className="f1-form-label">TRANSMISSION MESSAGE *</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Hi Krishkumar, let's discuss..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="f1-form-input f1-form-textarea"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="f1-btn-send-transmission"
                    >
                      <FiSend size={15} />
                      <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION →'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* F1 Race Broadcast Footer */}
        <footer className="f1-broadcast-footer">
          <div className="f1-footer-top-strip">
            <div className="f1-footer-brand">
              <strong>KRISHKUMAR // ENGINEERING</strong>
              <span>B.TECH COMPUTER ENGINEERING • CHARUSAT DEPSTAR • 2024 — 2028</span>
            </div>
            <div className="f1-footer-status">
              <span className="f1-live-dot" style={{ background: '#00d26a', boxShadow: '0 0 6px #00d26a' }} />
              <span>STATUS: AVAILABLE FOR OPPORTUNITIES</span>
            </div>
          </div>

          <div className="f1-footer-bottom-strip">
            <span>ENGINEERED IN GUJARAT, INDIA 🇮🇳</span>
            <span>© 2026 KRISHKUMAR DARJI • RACING EDITION</span>
          </div>
        </footer>

        <AnimatePresence>
          {copied && (
            <motion.div
              className="toast-notice"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <FiCheck style={{ color: '#00d26a', fontSize: '1.2rem' }} />
              <span>Frequency copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
