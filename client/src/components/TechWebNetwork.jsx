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
  SiVercel,
  SiNetlify,
  SiNotion,
  SiOpenai,
  SiGoogle,
  SiReplit
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { BiLogoVisualStudio } from 'react-icons/bi';
import { 
  FiCpu, 
  FiCode, 
  FiZap,
  FiSearch,
  FiImage,
  FiSmile,
  FiTerminal,
  FiEye,
  FiCommand,
  FiLayers
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
  { id: 'next', name: 'Next.js', icon: SiNextdotjs, ring: 2, angle: 22.5, color: '#ffffff' },
  { id: 'js', name: 'JavaScript', icon: SiJavascript, ring: 2, angle: 67.5, color: '#facc15' },
  { id: 'tailwind', name: 'TailwindCSS', icon: SiTailwindcss, ring: 2, angle: 112.5, color: '#38bdf8' },
  { id: 'mongo', name: 'MongoDB', icon: SiMongodb, ring: 2, angle: 157.5, color: '#22c55e' },
  { id: 'claude', name: 'Claude', icon: FiCpu, ring: 2, angle: 202.5, color: '#d97706' },
  { id: 'gemini', name: 'Gemini', icon: SiGoogle, ring: 2, angle: 247.5, color: '#3b82f6' },
  { id: 'cursor', name: 'Cursor', icon: FiCode, ring: 2, angle: 292.5, color: '#00f0ff' },
  { id: 'copilot', name: 'GitHub Copilot', icon: SiGithub, ring: 2, angle: 337.5, color: '#ffffff' },

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
  { id: 'devin', name: 'Devin AI', icon: FiCommand, ring: 3, angle: 350, color: '#00f0ff' },

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
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pulseCount, setPulseCount] = useState(0);

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

  // Generate realistic organic catenary drooping curves for each web ring
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

        // Inward catenary sag curve creating natural spider-web tension
        const midAngle = ((angle1 + angle2) / 2 + (i === spokesCount - 1 ? 180 : 0)) * (Math.PI / 180);
        const sagRadius = radius * 0.88;
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

  const handleSpiderCenterClick = () => {
    setPulseCount((prev) => prev + 1);
  };

  return (
    <div className="spider-web-outer-wrap">
      <div className="spider-web-header">
        <div className="marvel-spider-pill">
          <span className="marvel-spider-dot" />
          <span>MARVEL SPIDER-MAN WEB MATRIX</span>
        </div>
        <h3 className="spider-web-title">AUTHENTIC SPIDER SILK NETWORK</h3>
        <p>
          Hover over any thick web joint to inspect connected frameworks, tools, and AI models
        </p>
      </div>

      <div className="spider-web-canvas-container">
        <svg viewBox="0 0 900 900" className="spider-web-svg">
          {/* Render Authentic Solid Matte White Web Strands (No Glitter / No Neon) */}
          <g key={`clean-silk-web-${pulseCount}`}>
            {/* 1. Radial Spoke Strands (Thick Matte White Silk Threads) */}
            {spokeAngles.map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const endX = centerX + 425 * Math.cos(rad);
              const endY = centerY + 425 * Math.sin(rad);

              const midRadius = 220;
              const midBendAngle = (angle + (idx % 2 === 0 ? 1.5 : -1.5)) * (Math.PI / 180);
              const midX = centerX + midRadius * Math.cos(midBendAngle);
              const midY = centerY + midRadius * Math.sin(midBendAngle);

              const spokeD = `M ${centerX} ${centerY} Q ${midX} ${midY}, ${endX} ${endY}`;

              return (
                <motion.path
                  key={`spoke-${idx}-${pulseCount}`}
                  d={spokeD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.02, ease: 'easeOut' }}
                />
              );
            })}

            {/* 2. Curved Catenary Spiral Web Rings (Thick Matte White Silk) */}
            {ringPaths.map((pathD, rIdx) => (
              <motion.path
                key={`ring-${rIdx}-${pulseCount}`}
                d={pathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth={rIdx === ringPaths.length - 1 ? "3.2" : "2.6"}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                whileInView={{ pathLength: 1, opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.18 + rIdx * 0.1, ease: 'easeOut' }}
              />
            ))}

            {/* 3. Reinforced Solid White Silk Joint Knots */}
            {calculatedNodes.map((node, i) => (
              <circle
                key={`joint-knot-${i}`}
                cx={node.x}
                cy={node.y}
                r="5.5"
                fill="#ffffff"
              />
            ))}
          </g>

          {/* Clean Spider Center Base */}
          <circle
            cx={centerX}
            cy={centerY}
            r={34}
            fill="#0b0e17"
            stroke="#ffffff"
            strokeWidth="3"
          />
        </svg>

        {/* Center Spider Button (Clean Monochrome Matte) */}
        <motion.button
          onClick={handleSpiderCenterClick}
          className="spider-center-trigger-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          title="Pulse Web Network"
        >
          <svg viewBox="0 0 24 24" className="spider-emblem-svg">
            <path
              d="M12 2L15 8L20 6L17 12L22 15L17 18L21 22L15 20L12 24L9 20L3 22L7 18L2 15L7 12L4 6L9 8L12 2Z"
              fill="#ffffff"
            />
          </svg>
        </motion.button>

        {/* Clean Tech Nodes with ONLY Logos */}
        <div className="spider-nodes-overlay">
          {calculatedNodes.map((node, idx) => {
            const Icon = node.icon;
            const isHovered = hoveredNode?.id === node.id;

            return (
              <motion.div
                key={`${node.id}-${pulseCount}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.15 + (node.ring * 0.08) + ((idx % 8) * 0.02)
                }}
                className={`marvel-spider-node ${isHovered ? 'hovered' : ''}`}
                style={{
                  left: `${(node.x / 900) * 100}%`,
                  top: `${(node.y / 900) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                title={node.name}
              >
                <Icon 
                  style={{ 
                    color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)', 
                    fontSize: '19px',
                    transition: 'all 0.2s ease',
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)'
                  }} 
                />

                {/* Floating Tooltip Only When Hovered */}
                {isHovered && (
                  <span className="marvel-spider-tooltip">
                    <span className="tooltip-spider-indicator" style={{ background: '#ffffff' }} />
                    {node.name}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
