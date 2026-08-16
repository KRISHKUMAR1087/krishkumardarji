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
  SiNpm,
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
  SiPlotly,
  SiApachespark,
  SiAnaconda,
  SiGithub,
  SiVercel,
  SiNetlify,
  SiNotion,
  SiCisco,
  SiOpenai,
  SiGoogle,
  SiReplit
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { 
  FiLayout, 
  FiCpu, 
  FiUsers, 
  FiAward, 
  FiCheckCircle, 
  FiCompass, 
  FiCode, 
  FiHeart, 
  FiZap,
  FiSearch,
  FiImage,
  FiSmile,
  FiTerminal,
  FiEye,
  FiCommand,
  FiLayers
} from 'react-icons/fi';
import { TechWebNetwork } from './TechWebNetwork';

const iconMap = {
  Figma: SiFigma,
  'UI/UX Design': FiLayout,
  'Design Systems': FiLayout,
  'Wireframing & Prototyping': FiLayout,
  Adobe: SiAdobe,
  Canva: SiCanva,
  React: SiReact,
  'Next JS': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  TailwindCSS: SiTailwindcss,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  NodeJS: SiNodedotjs,
  Nodemon: SiNodedotjs,
  NPM: SiNpm,
  FastAPI: SiFastapi,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  SQL: SiMysql,
  DBMS: SiPostgresql,
  Python: SiPython,
  TensorFlow: SiTensorflow,
  'scikit-learn': SiScikitlearn,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Matplotlib: SiPython,
  Plotly: SiPlotly,
  'Apache Spark': SiApachespark,
  Anaconda: SiAnaconda,
  ChatGPT: SiOpenai,
  Claude: FiCpu,
  Gemini: SiGoogle,
  DeepSeek: FiEye,
  'GitHub Copilot': SiGithub,
  Cursor: FiCode,
  Lovable: FiHeart,
  'v0 by Vercel': SiVercel,
  'Bolt.new': FiZap,
  'Perplexity AI': FiSearch,
  'Devin AI': FiCommand,
  'Hugging Face': FiSmile,
  LangChain: FiLayers,
  Ollama: FiTerminal,
  'Replit Agent': SiReplit,
  Midjourney: FiImage,
  Phind: FiCompass,
  C: SiC,
  Java: FaJava,
  'Data Structures & Algorithms': FiCpu,
  GitHub: SiGithub,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  'VS Code': BiLogoVisualStudio,
  Notion: SiNotion,
  'Power BI': BiLogoVisualStudio,
  Cisco: SiCisco
};

const skillCategoryData = {
  "UI/UX & Design": [
    "Figma", 
    "UI/UX Design", 
    "Design Systems", 
    "Wireframing & Prototyping", 
    "Adobe", 
    "Canva"
  ],
  "Frontend": [
    "React", 
    "Next JS", 
    "TypeScript", 
    "JavaScript", 
    "TailwindCSS", 
    "HTML5", 
    "CSS3"
  ],
  "Backend & DB": [
    "NodeJS", 
    "Nodemon", 
    "NPM", 
    "FastAPI", 
    "PHP", 
    "PostgreSQL", 
    "MongoDB", 
    "MySQL", 
    "SQL", 
    "DBMS"
  ],
  "AI/ML & Data": [
    "Python", 
    "TensorFlow", 
    "scikit-learn", 
    "Pandas", 
    "NumPy", 
    "Matplotlib", 
    "Plotly", 
    "Apache Spark", 
    "Anaconda"
  ],
  "AI Tools": [
    "ChatGPT", 
    "Claude", 
    "Gemini", 
    "DeepSeek", 
    "GitHub Copilot", 
    "Cursor", 
    "Lovable", 
    "v0 by Vercel", 
    "Bolt.new", 
    "Perplexity AI", 
    "Devin AI", 
    "Hugging Face", 
    "LangChain", 
    "Ollama", 
    "Replit Agent", 
    "Midjourney", 
    "Phind"
  ],
  "Core & Tools": [
    "C", 
    "Java", 
    "Data Structures & Algorithms", 
    "GitHub", 
    "VS Code", 
    "Vercel", 
    "Netlify", 
    "Notion", 
    "Power BI", 
    "Cisco"
  ]
};

export const About = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All", 
    "UI/UX & Design", 
    "Frontend", 
    "Backend & DB", 
    "AI/ML & Data", 
    "AI Tools", 
    "Core & Tools"
  ];

  const allSkills = Object.values(skillCategoryData).flat();

  const displayedSkills = selectedCategory === "All"
    ? allSkills
    : (skillCategoryData[selectedCategory] || []);

  const softSkills = data?.about?.softSkills || [
    "User-Centric Thinking",
    "Leadership & Management",
    "Cross-Functional Teamwork",
    "Rapid Prototyping",
    "Complex Problem Solving",
    "Clear Communication"
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <FiLayout size={14} />
            <span>Profile & Craft</span>
          </div>
          <h2>About & Engineering Focus</h2>
          <p>
            Bridging intuitive UI/UX design and scalable full-stack engineering to build resilient, user-focused digital systems.
          </p>
        </div>

        <div className="bento-grid">
          {/* Bento Box 1: Short Bio & Background */}
          <div className="bento-card bento-col-8">
            <div className="bento-header">
              <div className="bento-icon-badge">
                <FiCompass size={22} />
              </div>
              <span className="project-category-tag">Engineering Mindset</span>
            </div>
            
            <h3 style={{ marginBottom: 12 }}>{data?.personal?.name || "Darji Krishkumar H."}</h3>
            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginBottom: 20 }}>
              {data?.about?.shortBio || data?.personal?.bio}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CURRENT FOCUS</div>
                <div style={{ fontWeight: 700, marginTop: 4, color: 'var(--text-primary)' }}>Full-Stack & UI/UX</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>INSTITUTION</div>
                <div style={{ fontWeight: 700, marginTop: 4, color: 'var(--text-primary)' }}>CHARUSAT (DEPSTAR)</div>
              </div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>LOCATION</div>
                <div style={{ fontWeight: 700, marginTop: 4, color: 'var(--text-primary)' }}>Gujarat, India</div>
              </div>
            </div>
          </div>

          {/* Bento Box 2: Design Philosophy */}
          <div className="bento-card bento-col-4">
            <div className="bento-header">
              <div className="bento-icon-badge" style={{ color: 'var(--accent-emerald)', borderColor: 'rgba(0, 255, 163, 0.25)', background: 'rgba(0, 255, 163, 0.08)' }}>
                <FiLayout size={22} />
              </div>
              <span className="project-category-tag" style={{ color: 'var(--accent-cyan)', background: 'rgba(0, 240, 255, 0.08)', borderColor: 'rgba(0, 240, 255, 0.2)' }}>
                UI/UX Philosophy
              </span>
            </div>

            <h4 style={{ marginBottom: 12, fontSize: '1.2rem' }}>Design With Empathy, Build With Precision</h4>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              "Every pixel, typography scale, micro-animation, and database response curve directly impacts the user's perception and trust."
            </p>

            <div style={{ marginTop: 24, padding: 14, background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-emerald)', fontSize: '0.85rem', fontWeight: 655 }}>
                <FiCheckCircle />
                <span>Accessibility & Clean Systems</span>
              </div>
            </div>
          </div>

          {/* Bento Box 3: Spider-Man Interactive Tech Web Network */}
          <div className="bento-card bento-col-12" style={{ padding: '36px 24px' }}>
            <TechWebNetwork />
          </div>

          {/* Bento Box 4: Soft Skills & Team Collaboration */}
          <div className="bento-card bento-col-12">
            <div className="bento-header">
              <div className="bento-icon-badge" style={{ color: 'var(--accent-violet)', borderColor: 'rgba(168, 85, 247, 0.25)', background: 'rgba(168, 85, 247, 0.08)' }}>
                <FiUsers size={22} />
              </div>
              <span className="project-category-tag" style={{ color: 'var(--accent-violet)', background: 'rgba(168, 85, 247, 0.08)', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
                Collaboration & Leadership
              </span>
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: 14 }}>Professional Strengths & Working Methodologies</h3>
            <div className="skill-chips-wrap">
              {softSkills.map((skill, idx) => (
                <div key={idx} className="skill-chip" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <FiAward style={{ color: 'var(--accent-cyan)' }} />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
