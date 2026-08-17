import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiFigma,
  SiAdobe,
  SiCanva,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiFastapi,
  SiPhp,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiPython,
  SiC,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiApachespark,
  SiGithub,
  SiDocker,
  SiLinux,
  SiOpenai,
  SiGoogle
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { 
  FiCpu, 
  FiCode, 
  FiZap, 
  FiCompass, 
  FiCheckCircle, 
  FiLayers, 
  FiActivity,
  FiTerminal,
  FiTrendingUp
} from 'react-icons/fi';
import { RevealSection } from './RevealSection';

const machineSubsystems = [
  {
    id: "engine",
    title: "🧠 THE ENGINE // CORE LOGIC",
    badge: "POWERTRAIN CORE",
    description: "High-performance foundational languages, algorithmic problem-solving engines, and data structures.",
    color: "#e10600",
    specs: [
      { name: "Python", icon: SiPython, level: "Advanced", desc: "Data Science, AI Automation & Scripts" },
      { name: "JavaScript", icon: SiJavascript, level: "Advanced", desc: "ES6+, Async Architectures & V8 Engine" },
      { name: "TypeScript", icon: SiTypescript, level: "Proficient", desc: "Type-Safe Enterprise Applications" },
      { name: "C / C++", icon: SiC, level: "Core", desc: "Memory Optimization & Systems Foundation" },
      { name: "Java", icon: FaJava, level: "Core", desc: "Object-Oriented Architecture" },
      { name: "DSA", icon: FiCode, level: "Active", desc: "Competitive Coding & Algorithmic Efficiency" }
    ]
  },
  {
    id: "powerunit",
    title: "⚙️ POWER UNIT // FULL-STACK",
    badge: "TRANSMISSION & APIS",
    description: "Scalable client-server frameworks, reactive interfaces, in-memory pipelines, and microservices.",
    color: "#00d26a",
    specs: [
      { name: "React", icon: SiReact, level: "Advanced", desc: "Component Trees, Hooks & State Machines" },
      { name: "Next.js", icon: SiNextdotjs, level: "Proficient", desc: "SSR, Edge Runtimes & Routing" },
      { name: "FastAPI", icon: SiFastapi, level: "Advanced", desc: "Asynchronous Python Microservices" },
      { name: "Node.js / Express", icon: SiNodedotjs, level: "Advanced", desc: "REST APIs & Streaming Backends" },
      { name: "PHP", icon: SiPhp, level: "Proficient", desc: "MVC Architecture & Server-Side Logic" },
      { name: "TailwindCSS", icon: SiTailwindcss, level: "Advanced", desc: "Utility-First Responsive UI" }
    ]
  },
  {
    id: "data",
    title: "🧮 DATA SYSTEM // TELEMETRY & DBS",
    badge: "DATA PIPELINES",
    description: "Relational tables, document stores, analytical data processing pipelines, and query optimization.",
    color: "#0284c7",
    specs: [
      { name: "PostgreSQL", icon: SiPostgresql, level: "Advanced", desc: "ACID Relational Indexing & Schemas" },
      { name: "MongoDB", icon: SiMongodb, level: "Proficient", desc: "NoSQL Collections & Document Models" },
      { name: "MySQL / SQL", icon: SiMysql, level: "Advanced", desc: "Normalized Schemas & Complex Queries" },
      { name: "Pandas & NumPy", icon: SiPandas, level: "Advanced", desc: "Numerical Analysis & Dataframes" },
      { name: "Apache Spark", icon: SiApachespark, level: "Working", desc: "Distributed Big Data Workflows" }
    ]
  },
  {
    id: "ai",
    title: "🤖 AI & NEURAL SYSTEMS // TELEMETRY",
    badge: "GEN-AI CORES",
    description: "Large Language Models, multimodal processing pipelines, intelligent prompt orchestration, and ML.",
    color: "#a855f7",
    specs: [
      { name: "Generative AI", icon: SiOpenai, level: "Advanced", desc: "Multi-Agent Workflows & Orchestration" },
      { name: "TensorFlow & Scikit", icon: SiTensorflow, level: "Proficient", desc: "Machine Learning Classifiers & Models" },
      { name: "LLM APIs (GPT/Claude)", icon: FiCpu, level: "Advanced", desc: "Embeddings, RAG & Tool Calling" },
      { name: "Cursor / AI Tools", icon: FiZap, level: "Advanced", desc: "Rapid AI-Augmented Engineering" }
    ]
  },
  {
    id: "aerodynamics",
    title: "🎨 AERODYNAMICS // UI/UX PRECISION",
    badge: "DOWNFORCE & UX",
    description: "Design systems, ergonomic user interfaces, responsive layouts, and frictionless interactive flows.",
    color: "#f59e0b",
    specs: [
      { name: "Figma", icon: SiFigma, level: "Advanced", desc: "Design Systems, Auto-Layout & Prototypes" },
      { name: "UI/UX Engineering", icon: FiLayers, level: "Advanced", desc: "Information Hierarchy & Usability" },
      { name: "Adobe Creative Suite", icon: SiAdobe, level: "Proficient", desc: "Visual Assets & Asset Optimization" },
      { name: "Wireframing", icon: FiCompass, level: "Advanced", desc: "Rapid Low-to-High Fidelity Sprints" }
    ]
  },
  {
    id: "control",
    title: "🛞 CONTROL SYSTEMS // DEV & CLOUD",
    badge: "ECU & TOOLING",
    description: "Version control telemetry, containerization, deployment pipelines, and developer environments.",
    color: "#f4f1ea",
    specs: [
      { name: "Git & GitHub", icon: SiGithub, level: "Advanced", desc: "Branches, CI/CD Actions & PR Reviews" },
      { name: "REST & JWT Security", icon: FiActivity, level: "Advanced", desc: "Token Auth & Encrypted Headers" },
      { name: "VS Code / Terminal", icon: FiTerminal, level: "Advanced", desc: "Unix CLI, Scripts & Workspaces" },
      { name: "Cloud Deployments", icon: FiTrendingUp, level: "Advanced", desc: "Vercel, Netlify, Render & GitHub Pages" }
    ]
  }
];

export const F1MachineTelemetry = () => {
  const [activeSubsystem, setActiveSubsystem] = useState("engine");

  const currentSystem = machineSubsystems.find(s => s.id === activeSubsystem) || machineSubsystems[0];

  return (
    <section id="machine" className="section f1-machine-section">
      <div className="container">
        <RevealSection variant="speed-wipe">
          <div className="section-header">
            <div className="f1-section-badge">
              <span className="f1-badge-red-block">02</span>
              <span>THE MACHINE // TECHNICAL SPECIFICATION</span>
            </div>
            <h2>Car Setup & Engineering Architecture</h2>
            <p>
              An F1-engineered technical specification of languages, frameworks, AI neural cores, and telemetry systems.
            </p>
          </div>

          {/* Subsystem Selector Buttons (F1 ECU Style) */}
          <div className="f1-subsystem-nav-strip">
            {machineSubsystems.map((sub) => (
              <motion.button
                key={sub.id}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveSubsystem(sub.id)}
                className={`f1-subsystem-btn ${activeSubsystem === sub.id ? 'active' : ''}`}
              >
                <span>{sub.title.split('//')[0]}</span>
                <span className="f1-subsystem-btn-tag">{sub.badge}</span>
              </motion.button>
            ))}
          </div>
        </RevealSection>

        {/* Active Machine Subsystem Spec Panel with Spring entrance & dynamic spec staggering */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSystem.id}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="f1-machine-spec-card"
          >
            <div className="f1-spec-card-header">
              <div>
                <span className="f1-spec-badge-pill" style={{ borderColor: currentSystem.color, color: currentSystem.color }}>
                  {currentSystem.badge}
                </span>
                <h3 className="f1-spec-title" style={{ marginTop: 6 }}>{currentSystem.title}</h3>
                <p className="f1-spec-desc">{currentSystem.description}</p>
              </div>
              <div className="f1-spec-status-tag">
                <span className="f1-live-dot" style={{ background: currentSystem.color, boxShadow: `0 0 8px ${currentSystem.color}` }} />
                <span>SYSTEM: 100% OPERATIONAL</span>
              </div>
            </div>

            {/* Staggered Grid of Technical Components */}
            <motion.div 
              className="f1-spec-grid"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06 }
                }
              }}
            >
              {currentSystem.specs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx} 
                    className="f1-spec-item-box"
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    whileHover={{ y: -4, borderColor: currentSystem.color, boxShadow: `0 8px 24px rgba(0,0,0,0.6), 0 0 16px ${currentSystem.color}33` }}
                  >
                    <div className="f1-spec-item-top">
                      <div className="f1-spec-icon-wrap" style={{ color: currentSystem.color }}>
                        <Icon size={22} />
                      </div>
                      <span className="f1-spec-level-tag">{item.level}</span>
                    </div>
                    <h4 className="f1-spec-name">{item.name}</h4>
                    <p className="f1-spec-subdesc">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
