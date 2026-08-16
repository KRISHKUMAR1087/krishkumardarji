import { useState, useMemo } from 'react';
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
  FiCpu, 
  FiCode, 
  FiHeart, 
  FiZap,
  FiSearch,
  FiImage,
  FiSmile,
  FiTerminal,
  FiEye,
  FiCommand,
  FiLayers,
  FiRotateCcw
} from 'react-icons/fi';

const allTechNodes = [
  // Ring 1 (Core Foundations)
  { id: 'react', name: 'React', icon: SiReact, ring: 1, angle: 0, color: '#00f0ff' },
  { id: 'python', name: 'Python', icon: SiPython, ring: 1, angle: 45, color: '#38bdf8' },
  { id: 'node', name: 'NodeJS', icon: SiNodedotjs, ring: 1, angle: 90, color: '#00ffa3' },
  { id: 'figma', name: 'Figma', icon: SiFigma, ring: 1, angle: 135, color: '#f43f5e' },
  { id: 'ts', name: 'TypeScript', icon: SiTypescript, ring: 1, angle: 180, color: '#3b82f6' },
  { id: 'fastapi', name: 'FastAPI', icon: SiFastapi, ring: 1, angle: 225, color: '#10b981' },
  { id: 'postgres', name: 'PostgreSQL', icon: SiPostgresql, ring: 1, angle: 270, color: '#60a5fa' },
  { id: 'chatgpt', name: 'ChatGPT', icon: SiOpenai, ring: 1, angle: 315, color: '#10a37f' },

  // Ring 2 (Frameworks, DBs & AI Tools)
  { id: 'next', name: 'Next.js', icon: SiNextdotjs, ring: 2, angle: 20, color: '#ffffff' },
  { id: 'js', name: 'JavaScript', icon: SiJavascript, ring: 2, angle: 60, color: '#facc15' },
  { id: 'tailwind', name: 'TailwindCSS', icon: SiTailwindcss, ring: 2, angle: 100, color: '#38bdf8' },
  { id: 'mongo', name: 'MongoDB', icon: SiMongodb, ring: 2, angle: 140, color: '#22c55e' },
  { id: 'claude', name: 'Claude', icon: FiCpu, ring: 2, angle: 175, color: '#d97706' },
  { id: 'gemini', name: 'Gemini', icon: SiGoogle, ring: 2, angle: 210, color: '#3b82f6' },
  { id: 'cursor', name: 'Cursor', icon: FiCode, ring: 2, angle: 245, color: '#00f0ff' },
  { id: 'copilot', name: 'GitHub Copilot', icon: SiGithub, ring: 2, angle: 285, color: '#ffffff' },
  { id: 'lovable', name: 'Lovable', icon: FiHeart, ring: 2, angle: 325, color: '#ec4899' },
  { id: 'v0', name: 'v0 by Vercel', icon: SiVercel, ring: 2, angle: 350, color: '#ffffff' },

  // Ring 3 (Data Science, Cloud & Core Utilities)
  { id: 'tensorflow', name: 'TensorFlow', icon: SiTensorflow, ring: 3, angle: 10, color: '#f97316' },
  { id: 'scikit', name: 'scikit-learn', icon: SiScikitlearn, ring: 3, angle: 40, color: '#0284c7' },
  { id: 'pandas', name: 'Pandas', icon: SiPandas, ring: 3, angle: 75, color: '#6366f1' },
  { id: 'numpy', name: 'NumPy', icon: SiNumpy, ring: 3, angle: 110, color: '#38bdf8' },
  { id: 'spark', name: 'Apache Spark', icon: SiApachespark, ring: 3, angle: 130, color: '#f97316' },
  { id: 'deepseek', name: 'DeepSeek', icon: FiEye, ring: 3, angle: 155, color: '#00ffa3' },
  { id: 'bolt', name: 'Bolt.new', icon: FiZap, ring: 3, angle: 185, color: '#facc15' },
  { id: 'perplexity', name: 'Perplexity AI', icon: FiSearch, ring: 3, angle: 215, color: '#2dd4bf' },
  { id: 'ollama', name: 'Ollama', icon: FiTerminal, ring: 3, angle: 235, color: '#ffffff' },
  { id: 'langchain', name: 'LangChain', icon: FiLayers, ring: 3, angle: 260, color: '#00ffa3' },
  { id: 'huggingface', name: 'Hugging Face', icon: FiSmile, ring: 3, angle: 280, color: '#fbbf24' },
  { id: 'replit', name: 'Replit Agent', icon: SiReplit, ring: 3, angle: 305, color: '#f97316' },
  { id: 'midjourney', name: 'Midjourney', icon: FiImage, ring: 3, angle: 330, color: '#a855f7' },
  { id: 'devin', name: 'Devin AI', icon: FiCommand, ring: 3, angle: 345, color: '#00f0ff' },

  // Outer Ring 4 (Design & Tools)
  { id: 'adobe', name: 'Adobe', icon: SiAdobe, ring: 4, angle: 25, color: '#ef4444' },
  { id: 'canva', name: 'Canva', icon: SiCanva, ring: 4, angle: 65, color: '#00c4cc' },
  { id: 'html5', name: 'HTML5', icon: SiHtml5, ring: 4, angle: 95, color: '#f97316' },
  { id: 'css3', name: 'CSS3', icon: SiCss3, ring: 4, angle: 120, color: '#3b82f6' },
  { id: 'php', name: 'PHP', icon: SiPhp, ring: 4, angle: 150, color: '#818cf8' },
  { id: 'mysql', name: 'MySQL', icon: SiMysql, ring: 4, angle: 170, color: '#0284c7' },
  { id: 'java', name: 'Java', icon: FaJava, ring: 4, angle: 200, color: '#ef4444' },
  { id: 'c', name: 'C', icon: SiC, ring: 4, angle: 225, color: '#3b82f6' },
  { id: 'vscode', name: 'VS Code', icon: BiLogoVisualStudio, ring: 4, angle: 250, color: '#007acc' },
  { id: 'github', name: 'GitHub', icon: SiGithub, ring: 4, angle: 275, color: '#ffffff' },
  { id: 'vercel', name: 'Vercel', icon: SiVercel, ring: 4, angle: 295, color: '#ffffff' },
  { id: 'netlify', name: 'Netlify', icon: SiNetlify, ring: 4, angle: 315, color: '#00c7b7' },
  { id: 'notion', name: 'Notion', icon: SiNotion, ring: 4, angle: 335, color: '#ffffff' },
  { id: 'powerbi', name: 'Power BI', icon: BiLogoVisualStudio, ring: 4, angle: 355, color: '#eab308' }
];

export const TechWebNetwork = () => {
  const [isWebDeployed, setIsWebDeployed] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [shootCount, setShootCount] = useState(0);

  const centerX = 450;
  const centerY = 450;
  const ringRadii = [0, 115, 205, 295, 385];

  const calculatedNodes = useMemo(() => {
    return allTechNodes.map((node) => {
      const radius = ringRadii[node.ring];
      const rad = (node.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);
      return { ...node, x, y };
    });
  }, []);

  const spokesCount = 16;
  const spokeAngles = Array.from({ length: spokesCount }, (_, i) => (i * 360) / spokesCount);

  // Generate curved spider web strands for each ring
  const ringPaths = useMemo(() => {
    return ringRadii.slice(1).map((radius) => {
      let pathStr = '';
      for (let i = 0; i < spokesCount; i++) {
        const angle1 = (i * 360) / spokesCount;
        const angle2 = (((i + 1) % spokesCount) * 360) / spokesCount;
        const rad1 = (angle1 * Math.PI) / 180;
        const rad2 = (angle2 * Math.PI) / 180;
        
        const x1 = centerX + radius * Math.cos(rad1);
        const y1 = centerY + radius * Math.sin(rad1);
        const x2 = centerX + radius * Math.cos(rad2);
        const y2 = centerY + radius * Math.sin(rad2);

        const midAngle = ((angle1 + angle2) / 2 + (i === spokesCount - 1 ? 180 : 0)) * (Math.PI / 180);
        const sagRadius = radius * 0.90;
        const cx = centerX + sagRadius * Math.cos(midAngle);
        const cy = centerY + sagRadius * Math.sin(midAngle);

        if (i === 0) {
          pathStr += `M ${x1} ${y1} Q ${cx} ${cy}, ${x2} ${y2} `;
        } else {
          pathStr += `Q ${cx} ${cy}, ${x2} ${y2} `;
        }
      }
      return pathStr;
    });
  }, []);

  const handleShootWeb = () => {
    setIsWebDeployed(true);
    setShootCount((prev) => prev + 1);
  };

  const handleRetractWeb = (e) => {
    e.stopPropagation();
    setIsWebDeployed(false);
  };

  return (
    <div className="spider-web-outer-wrap">
      <div className="spider-web-header">
        <div className="marvel-spider-pill">
          <span className="marvel-spider-dot" />
          <span>MARVEL TECH WEB MATRIX</span>
        </div>
        <h3 className="spider-web-title">INTERCONNECTED TECH SILK</h3>
        <p>
          {!isWebDeployed 
            ? "Click the Spider Emblem below to trigger the THWIP! web shooter animation"
            : "Hover over any web joint to inspect connected frameworks, tools, and AI models"}
        </p>

        {isWebDeployed && (
          <div style={{ marginTop: 12, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button 
              onClick={handleShootWeb}
              className="spider-action-btn primary"
            >
              <span>🕷️ THWIP! Re-shoot Web</span>
            </button>
            <button 
              onClick={handleRetractWeb}
              className="spider-action-btn secondary"
            >
              <FiRotateCcw size={14} />
              <span>Retract Web</span>
            </button>
          </div>
        )}
      </div>

      <div className="spider-web-canvas-container">
        {/* Ambient Web Glow Behind */}
        <div className="spider-ambient-glow" />

        <svg viewBox="0 0 900 900" className="spider-web-svg">
          <defs>
            <filter id="marvelGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="9" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <radialGradient id="spiderCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff0055" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Render Web Strands only when Deployed */}
          {isWebDeployed && (
            <g key={`web-draw-${shootCount}`}>
              {/* Radial Silk Spokes */}
              {spokeAngles.map((angle, idx) => {
                const rad = (angle * Math.PI) / 180;
                const endX = centerX + 420 * Math.cos(rad);
                const endY = centerY + 420 * Math.sin(rad);
                return (
                  <motion.line
                    key={`spoke-${idx}-${shootCount}`}
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="1.5"
                    filter="url(#marvelGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.02, ease: 'easeOut' }}
                  />
                );
              })}

              {/* Curved Catenary Spider Web Rings */}
              {ringPaths.map((pathD, rIdx) => (
                <motion.path
                  key={`ring-path-${rIdx}-${shootCount}`}
                  d={pathD}
                  fill="none"
                  stroke={rIdx % 2 === 0 ? "rgba(0, 255, 163, 0.3)" : "rgba(0, 240, 255, 0.35)"}
                  strokeWidth={rIdx === ringPaths.length - 1 ? 1.8 : 1.3}
                  filter="url(#marvelGlow)"
                  initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                  animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 + rIdx * 0.1, ease: 'easeOut' }}
                />
              ))}

              {/* Connected Web Strands between adjacent nodes */}
              {calculatedNodes.map((node, i) => {
                const nextNode = calculatedNodes[(i + 1) % calculatedNodes.length];
                if (node.ring === nextNode.ring) {
                  const isHighlighted = hoveredNode?.id === node.id || hoveredNode?.id === nextNode.id;
                  return (
                    <line
                      key={`link-${i}`}
                      x1={node.x}
                      y1={node.y}
                      x2={nextNode.x}
                      y2={nextNode.y}
                      stroke={isHighlighted ? "rgba(0, 240, 255, 0.9)" : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isHighlighted ? 2.5 : 1}
                      filter={isHighlighted ? "url(#marvelGlow)" : undefined}
                    />
                  );
                }
                return null;
              })}
            </g>
          )}

          {/* Core Spider-Man Emblem & Trigger */}
          <circle
            cx={centerX}
            cy={centerY}
            r={isWebDeployed ? 50 : 64}
            fill="url(#spiderCoreGlow)"
            filter="url(#marvelGlow)"
            style={{ transition: 'r 0.3s ease' }}
          />

          <circle
            cx={centerX}
            cy={centerY}
            r={isWebDeployed ? 24 : 32}
            fill="#0b0f19"
            stroke="#ff0055"
            strokeWidth="3"
            filter="url(#marvelGlow)"
            style={{ transition: 'r 0.3s ease' }}
          />
        </svg>

        {/* Center Spider Button (Interactive Trigger) */}
        <motion.button
          onClick={handleShootWeb}
          className="spider-center-trigger-btn"
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          title={isWebDeployed ? "THWIP! Re-shoot Web" : "Click to Shoot Web"}
        >
          {/* Stylized Marvel Spider Icon */}
          <svg viewBox="0 0 24 24" className="spider-emblem-svg">
            <path
              d="M12 2L15 8L20 6L17 12L22 15L17 18L21 22L15 20L12 24L9 20L3 22L7 18L2 15L7 12L4 6L9 8L12 2Z"
              fill="#00f0ff"
            />
          </svg>
          {!isWebDeployed && (
            <span className="spider-shoot-callout">
              THWIP! Click to Shoot
            </span>
          )}
        </motion.button>

        {/* High-Tech Marvel Suit Tech Nodes (Shown when Deployed) */}
        <AnimatePresence>
          {isWebDeployed && (
            <div className="spider-nodes-overlay">
              {calculatedNodes.map((node, idx) => {
                const Icon = node.icon;
                const isHovered = hoveredNode?.id === node.id;

                return (
                  <motion.div
                    key={`${node.id}-${shootCount}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3 + (node.ring * 0.12) + ((idx % 8) * 0.02)
                    }}
                    className={`marvel-spider-node ${isHovered ? 'hovered' : ''}`}
                    style={{
                      left: `${(node.x / 900) * 100}%`,
                      top: `${(node.y / 900) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                      borderColor: isHovered ? node.color : 'rgba(255, 255, 255, 0.16)',
                      boxShadow: isHovered 
                        ? `0 0 25px ${node.color}, inset 0 0 12px ${node.color}` 
                        : '0 4px 14px rgba(0,0,0,0.6)'
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    title={node.name}
                  >
                    <Icon 
                      style={{ 
                        color: isHovered ? node.color : '#ffffff', 
                        fontSize: '19px',
                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                        filter: isHovered ? `drop-shadow(0 0 8px ${node.color})` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                      }} 
                    />

                    {/* Floating Tooltip Only When Hovered */}
                    {isHovered && (
                      <span className="marvel-spider-tooltip" style={{ borderColor: node.color }}>
                        <span className="tooltip-spider-indicator" style={{ background: node.color }} />
                        {node.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
