import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';

export const Hero = ({ data }) => {
  const roles = [
    "B.Tech (CE)",
    "Vibe Coder",
    "Software Developer",
    "Gen-AI Full Stack WEB Developer",
    "UI/UX Designer",
    "Open Source Contributor",
    "Hackathon Top 20",
    "Building Real-World Projects"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const activeRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 20);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => activeRole.slice(0, prev.length + 1));
      }, 40);
    }

    if (!isDeleting && displayText === activeRole) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  const quickStats = [
    { label: 'Projects', value: data.projects?.length || 0 },
    { label: 'Certifications', value: data.courses?.length || 0 },
    { label: 'Hackathons Participation', value: '18' },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <motion.div 
          className="hero-grid"
          variants={containerVariants} 
          initial="hidden" 
          animate="visible"
        >
          {/* Left Column Spacer (houses the background image character) */}
          <div className="hero-spacer-col" />

          {/* Right Column: Text & Stats */}
          <div className="hero-text-col">
            <motion.h1 
              variants={itemVariants} 
              className="hero-title"
              style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'nowrap', whiteSpace: 'nowrap', marginBottom: '10px' }}
            >
              {data.personal?.name}
              <span style={{ fontSize: '0.85rem', background: 'rgba(255, 255, 255, 0.08)', padding: '5px 12px', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', fontWeight: '500', color: 'var(--accent-2)', fontFamily: 'var(--font-mono)' }}>He/Him</span>
            </motion.h1>

            <div className="hero-role-wrapper">
              <p
                className="subtitle"
                style={{ margin: 0, color: 'var(--accent-2)', letterSpacing: '0.05em', fontWeight: '600', textTransform: 'uppercase', minHeight: '1.8em', display: 'flex', alignItems: 'center' }}
              >
                {displayText}
                <span className="typewriter-cursor">|</span>
              </p>
            </div>

            <motion.p variants={itemVariants} className="hero-bio">
              {data.personal?.bio}
            </motion.p>

            <motion.div variants={itemVariants} className="hero-stats">
              {quickStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}+</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ marginTop: '80px' }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <FiArrowDown size={28} style={{ margin: '0 auto', color: 'var(--accent)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

