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

// 8 Defined Primary Ray Spokes matching the reference diagram exactly (with angles in degrees)
const SPOKE_ANGLES = [-90, -45, 0, 45, 90, 135, 180, 225];
const RING_RADII = [0, 80, 150, 220, 290];

// Clean node distribution where EVERY node sits precisely on a spoke ray intersection joint!
const webNodes = [
  // Ring 1 (Inner core)
  { id: 'react', name: 'React', icon: SiReact, spokeIdx: 0, ring: 1, color: '#00f0ff' },
  { id: 'python', name: 'Python', icon: SiPython, spokeIdx: 1, ring: 1, color: '#38bdf8' },
  { id: 'node', name: 'NodeJS', icon: SiNodedotjs, spokeIdx: 2, ring: 1, color: '#00ffa3' },
  { id: 'figma', name: 'Figma', icon: SiFigma, spokeIdx: 3, ring: 1, color: '#f43f5e' },
  { id: 'ts', name: 'TypeScript', icon: SiTypescript, spokeIdx: 4, ring: 1, color: '#3b82f6' },
  { id: 'fastapi', name: 'FastAPI', icon: SiFastapi, spokeIdx: 5, ring: 1, color: '#10b981' },
  { id: 'postgres', name: 'PostgreSQL', icon: SiPostgresql, spokeIdx: 6, ring: 1, color: '#60a5fa' },
  { id: 'chatgpt', name: 'ChatGPT', icon: SiOpenai, spokeIdx: 7, ring: 1, color: '#10a37f' },

  // Ring 2 (Frameworks & AI Tools)
  { id: 'next', name: 'Next.js', icon: SiNextdotjs, spokeIdx: 0, ring: 2, color: '#ffffff' },
  { id: 'js', name: 'JavaScript', icon: SiJavascript, spokeIdx: 1, ring: 2, color: '#facc15' },
  { id: 'tailwind', name: 'TailwindCSS', icon: SiTailwindcss, spokeIdx: 2, ring: 2, color: '#38bdf8' },
  { id: 'mongo', name: 'MongoDB', icon: SiMongodb, spokeIdx: 3, ring: 2, color: '#22c55e' },
  { id: 'gemini', name: 'Gemini', icon: SiGoogle, spokeIdx: 4, ring: 2, color: '#3b82f6' },
  { id: 'cursor', name: 'Cursor', icon: FiCode, spokeIdx: 5, ring: 2, color: '#00f0ff' },
  { id: 'copilot', name: 'GitHub Copilot', icon: SiGithub, spokeIdx: 6, ring: 2, color: '#ffffff' },
  { id: 'claude', name: 'Claude', icon: FiCpu, spokeIdx: 7, ring: 2, color: '#d97706' },

  // Ring 3 (Data Science, Cloud & Core Utilities)
  { id: 'tensorflow', name: 'TensorFlow', icon: SiTensorflow, spokeIdx: 0, ring: 3, color: '#f97316' },
  { id: 'scikit', name: 'scikit-learn', icon: SiScikitlearn, spokeIdx: 1, ring: 3, color: '#0284c7' },
  { id: 'pandas', name: 'Pandas', icon: SiPandas, spokeIdx: 2, ring: 3, color: '#6366f1' },
  { id: 'numpy', name: 'NumPy', icon: SiNumpy, spokeIdx: 3, ring: 3, color: '#38bdf8' },
  { id: 'spark', name: 'Apache Spark', icon: SiApachespark, spokeIdx: 4, ring: 3, color: '#f97316' },
  { id: 'deepseek', name: 'DeepSeek', icon: FiEye, spokeIdx: 5, ring: 3, color: '#00ffa3' },
  { id: 'bolt', name: 'Bolt.new', icon: FiZap, spokeIdx: 6, ring: 3, color: '#facc15' },
  { id: 'perplexity', name: 'Perplexity AI', icon: FiSearch, spokeIdx: 7, ring: 3, color: '#2dd4bf' },

  // Ring 4 (Design & Tools)
  { id: 'adobe', name: 'Adobe', icon: SiAdobe, spokeIdx: 0, ring: 4, color: '#ef4444' },
  { id: 'canva', name: 'Canva', icon: SiCanva, spokeIdx: 1, ring: 4, color: '#00c4cc' },
  { id: 'html5', name: 'HTML5', icon: SiHtml5, spokeIdx: 2, ring: 4, color: '#f97316' },
  { id: 'css3', name: 'CSS3', icon: SiCss3, spokeIdx: 3, ring: 4, color: '#3b82f6' },
  { id: 'php', name: 'PHP', icon: SiPhp, spokeIdx: 4, ring: 4, color: '#818cf8' },
  { id: 'mysql', name: 'MySQL', icon: SiMysql, spokeIdx: 5, ring: 4, color: '#0284c7' },
  { id: 'java', name: 'Java', icon: FaJava, spokeIdx: 6, ring: 4, color: '#ef4444' },
  { id: 'c', name: 'C', icon: SiC, spokeIdx: 7, ring: 4, color: '#3b82f6' }
];

export const TechWebNetwork = () => {
  const [isWebOpen, setIsWebOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Web center coordinates matching the authentic reference layout
  const centerX = 450;
  const centerY = 310;
  const spiderRestY = 700;

  // Calculate precise joint coordinates for all spokes and rings
  const jointPoints = useMemo(() => {
    const points = [];
    for (let r = 1; r < RING_RADII.length; r++) {
      const radius = RING_RADII[r];
      const ringPts = [];
      for (let s = 0; s < SPOKE_ANGLES.length; s++) {
        const rad = (SPOKE_ANGLES[s] * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);
        ringPts.push({ x, y });
      }
      points.push(ringPts);
    }
    return points;
  }, []);

  // Map each node directly to its exact structural joint
  const calculatedNodes = useMemo(() => {
    return webNodes.map((node) => {
      const ringIdx = node.ring - 1;
      const pt = jointPoints[ringIdx][node.spokeIdx];
      return {
        ...node,
        x: pt.x,
        y: pt.y
      };
    });
  }, [jointPoints]);

  // Generate authentic curved concave spiral loops connecting adjacent spoke joints
  const ringArcs = useMemo(() => {
    const arcs = [];
    for (let r = 0; r < jointPoints.length; r++) {
      const ringPts = jointPoints[r];
      const radius = RING_RADII[r + 1];
      for (let s = 0; s < ringPts.length; s++) {
        const p1 = ringPts[s];
        const p2 = ringPts[(s + 1) % ringPts.length];
        const a1 = SPOKE_ANGLES[s];
        const a2 = SPOKE_ANGLES[(s + 1) % ringPts.length];

        // Deep concave inward droop toward center (authentic scalloped web from diagram)
        const midAngle = ((a1 + a2) / 2 + (a2 < a1 ? 180 : 0)) * (Math.PI / 180);
        const sagRadius = radius * 0.76;
        const cx = centerX + sagRadius * Math.cos(midAngle);
        const cy = centerY + sagRadius * Math.sin(midAngle);

        arcs.push({
          d: `M ${p1.x} ${p1.y} Q ${cx} ${cy}, ${p2.x} ${p2.y}`,
          ring: r
        });
      }
    }
    return arcs;
  }, [jointPoints]);

  // Long realistic anchor threads reaching outward to page edges (exact replica of diagram)
  const anchorThreads = [
    `M ${centerX} ${centerY} L 310 15`,
    `M ${centerX} ${centerY} L 590 15`,
    `M ${centerX} ${centerY} L 20 220`,
    `M ${centerX} ${centerY} L 880 210`,
    `M ${centerX} ${centerY} L 15 640`,
    `M ${centerX} ${centerY} L 885 530`
  ];

  return (
    <div className="spider-web-outer-wrap">
      <div className="spider-web-header">
        <div className="marvel-spider-pill">
          <span className="marvel-spider-dot" />
          <span>INTERACTIVE SPIDER SILK MATRIX</span>
        </div>
        <h3 className="spider-web-title">PULL THE SPIDER TO WEAVE THE WEB</h3>
        <p>
          {!isWebOpen 
            ? "👇 Pull down or click the dangling spider below to spin the authentic silk web and unlock all technology nodes" 
            : "✨ Web woven! Hover over any joint to inspect connected frameworks, tools, and AI models"}
        </p>
      </div>

      <div className="spider-web-canvas-container">
        <svg viewBox="0 0 900 860" className="spider-web-svg">
          {/* 1. Long Outer Tension Anchor Threads (Always Anchor the Web Structure) */}
          <g>
            {anchorThreads.map((d, i) => (
              <path
                key={`anchor-${i}`}
                d={d}
                fill="none"
                stroke="rgba(255, 255, 255, 0.45)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* 2. Hanging Vertical Silk Thread to the Spider */}
          <motion.line
            x1={centerX}
            y1={centerY}
            x2={centerX}
            y2={isWebOpen ? spiderRestY + 30 : spiderRestY}
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            initial={{ opacity: 0.7 }}
            animate={{ 
              opacity: isWebOpen ? 0.9 : 1,
              y2: isWebOpen ? spiderRestY + 30 : spiderRestY
            }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
          />

          {/* 3. Authentic Web Structure (Unfolds upon pulling/clicking spider) */}
          <AnimatePresence>
            {isWebOpen && (
              <g key="woven-silk-web">
                {/* 8 Primary Radial Structural Spokes (Reaching 340px out from center) */}
                {SPOKE_ANGLES.map((angle, idx) => {
                  const rad = (angle * Math.PI) / 180;
                  const length = idx % 2 === 0 ? 350 : 320;
                  const endX = centerX + length * Math.cos(rad);
                  const endY = centerY + length * Math.sin(rad);

                  return (
                    <motion.line
                      key={`spoke-line-${idx}`}
                      x1={centerX}
                      y1={centerY}
                      x2={endX}
                      y2={endY}
                      stroke="#ffffff"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.45, delay: idx * 0.03, ease: "easeOut" }}
                    />
                  );
                })}

                {/* Curved Concave Web Rings (Authentic Scalloped Arches) */}
                {ringArcs.map((arc, aIdx) => (
                  <motion.path
                    key={`arc-${aIdx}`}
                    d={arc.d}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={arc.ring === 3 ? "3.2" : "2.4"}
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0, scale: 0.75 }}
                    animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, delay: 0.12 + arc.ring * 0.08, ease: "easeOut" }}
                  />
                ))}

                {/* Reinforced Silk Knots at every joint */}
                {calculatedNodes.map((node, i) => (
                  <motion.circle
                    key={`knot-${i}`}
                    cx={node.x}
                    cy={node.y}
                    r="4.5"
                    fill="#ffffff"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + (node.ring * 0.05) }}
                  />
                ))}

                {/* Central Silk Hub Anchor */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="8"
                  fill="#ffffff"
                />
              </g>
            )}
          </AnimatePresence>
        </svg>

        {/* 4. Interactive Dangling Realistic Spider (Draggable & Clickable) */}
        <motion.div
          className="hanging-spider-interactive-wrap"
          style={{
            left: `${(centerX / 900) * 100}%`,
            top: `${(spiderRestY / 860) * 100}%`
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 80 }}
          dragElastic={0.4}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            if (info.offset.y > 15 || !isWebOpen) {
              setIsWebOpen(true);
            }
          }}
          onClick={() => {
            if (!isDragging) {
              setIsWebOpen((prev) => !prev);
            }
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          title={isWebOpen ? "Click to Retract Web" : "Pull or Click to Weave Web"}
        >
          {/* Realistic Spider SVG (Solid white silhouette matching reference image) */}
          <svg viewBox="0 0 100 120" className="realistic-spider-svg">
            <circle cx="50" cy="8" r="4" fill="#ffffff" />
            
            {/* Left 4 Legs */}
            <path d="M44 48 Q20 25 15 10 Q14 25 24 40" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M43 54 Q10 45 6 35 Q10 52 22 62" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M44 60 Q8 68 5 85 Q16 80 28 72" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M46 66 Q15 95 18 115 Q26 102 34 84" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />

            {/* Right 4 Legs */}
            <path d="M56 48 Q80 25 85 10 Q86 25 76 40" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M57 54 Q90 45 94 35 Q90 52 78 62" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M56 60 Q92 68 95 85 Q84 80 72 72" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M54 66 Q85 95 82 115 Q74 102 66 84" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" />

            {/* Spider Head & Body */}
            <ellipse cx="50" cy="38" rx="8" ry="7" fill="#ffffff" />
            <ellipse cx="50" cy="52" rx="12" ry="10" fill="#ffffff" />
            <ellipse cx="50" cy="74" rx="18" ry="22" fill="#ffffff" />
            <circle cx="50" cy="74" r="7" fill="#080c16" />
          </svg>

          {/* Pull Prompt Callout Badge */}
          {!isWebOpen && (
            <motion.div 
              className="spider-pull-badge"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <span>👇 PULL ME!</span>
            </motion.div>
          )}
        </motion.div>

        {/* 5. Colored Tech Logo Nodes Displayed when Web is Open (All sit precisely on web joints) */}
        <AnimatePresence>
          {isWebOpen && (
            <div className="spider-nodes-overlay">
              {calculatedNodes.map((node, idx) => {
                const Icon = node.icon;
                const isHovered = hoveredNode?.id === node.id;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 22,
                      delay: 0.18 + (node.ring * 0.07) + ((idx % 8) * 0.02)
                    }}
                    className={`marvel-spider-node ${isHovered ? 'hovered' : ''}`}
                    style={{
                      left: `${(node.x / 900) * 100}%`,
                      top: `${(node.y / 860) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                    title={node.name}
                  >
                    <Icon 
                      style={{ 
                        color: node.color, 
                        fontSize: '21px',
                        transition: 'all 0.2s ease',
                        transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
                      }} 
                    />

                    {/* Tooltip on Hover */}
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
