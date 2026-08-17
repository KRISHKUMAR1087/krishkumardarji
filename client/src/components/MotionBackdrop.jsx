import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const MotionBackdrop = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms for racing environment
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, -180]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, -90]);
  const speedStreakX = useTransform(smoothProgress, [0, 1], [-100, 200]);
  const ambientGlowOpacity = useTransform(smoothProgress, [0, 0.2, 0.5, 0.8, 1], [0.35, 0.6, 0.45, 0.7, 0.4]);

  return (
    <div className="f1-advanced-motion-backdrop" aria-hidden="true">
      {/* Racing Track Ambient Apex Radiance */}
      <motion.div
        className="f1-ambient-apex-glow apex-red"
        style={{
          y: layer1Y,
          opacity: ambientGlowOpacity
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="f1-ambient-apex-glow apex-yellow"
        style={{
          y: layer2Y
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="f1-ambient-apex-glow apex-green"
        style={{
          y: layer1Y
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          y: [0, -40, 0]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dynamic Scroll Speed Streaks */}
      <motion.div
        className="f1-scroll-speed-streak streak-1"
        style={{ x: speedStreakX }}
      />
      <motion.div
        className="f1-scroll-speed-streak streak-2"
        style={{ x: speedStreakX }}
      />

      {/* Subtle Carbon Mesh Texture Overlay */}
      <div className="f1-carbon-mesh-overlay" />
    </div>
  );
};
