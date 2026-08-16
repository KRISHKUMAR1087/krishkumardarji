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
  FiMessageSquare
} from 'react-icons/fi';
import { FaThreads, FaSnapchat } from 'react-icons/fa6';

export const Contact = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const email = data?.social?.email || "hello@krishkumardarji.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
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
    },
    {
      name: "Threads",
      url: data?.social?.threads || "https://www.threads.net/@genzkrish",
      icon: FaThreads,
      handle: "@genzkrish"
    },
    {
      name: "Snapchat",
      url: data?.social?.snapchat || "https://www.snapchat.com/add/genzkrish",
      icon: FaSnapchat,
      handle: "@genzkrish"
    }
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact-container-card">
          <div className="contact-header-layout">
            <div>
              <div className="section-badge" style={{ marginBottom: 14 }}>
                <FiMessageSquare size={14} />
                <span>Let's Connect</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginBottom: 14 }}>
                Have an idea, project, or opportunity?
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Whether you're looking for a developer with UI/UX precision, interested in collaborating on hackathons, or exploring internships — my inbox is always open.
              </p>

              {/* Copy Email Box */}
              <div className="contact-email-copy-box">
                <FiMail style={{ color: 'var(--accent-cyan)', fontSize: '1.2rem', marginLeft: 4 }} />
                <span className="contact-email-text">{email}</span>
                <button
                  onClick={handleCopyEmail}
                  className="copy-btn"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <FiCheck />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a
                href={`mailto:${email}`}
                className="btn-premium btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '16px 28px' }}
              >
                <FiSend />
                <span>Send Direct Email</span>
              </a>

              <a
                href={data?.social?.linkedin || "https://www.linkedin.com/in/krishkumar-d-b4a7952b1"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium btn-secondary"
                style={{ width: '100%', justifyContent: 'center', padding: '16px 28px' }}
              >
                <FiLinkedin />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 36 }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 18, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Social & Developer Networks
            </div>

            <div className="socials-grid">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-card-btn"
                  >
                    <Icon style={{ fontSize: '1.25rem', color: 'var(--accent-cyan)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 650, color: 'var(--text-primary)' }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <p>
            Designed & Engineered with UI/UX Excellence by{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Darji Krishkumar H.</strong>
          </p>
          <p style={{ marginTop: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            CHARUSAT (DEPSTAR) • Computer Engineering • 2024–2028
          </p>
        </footer>

        {/* Copied Toast Notification */}
        <AnimatePresence>
          {copied && (
            <motion.div
              className="toast-notice"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <FiCheck style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem' }} />
              <span>Email copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
