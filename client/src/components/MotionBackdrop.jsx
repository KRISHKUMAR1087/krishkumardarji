import { motion, useScroll, useTransform } from 'framer-motion';

export const MotionBackdrop = () => {
  const { scrollYProgress } = useScroll();
  const layerY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.div className="motion-backdrop" style={{ y: layerY }}>
      <motion.div
        className="backdrop-orb orb-a"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="backdrop-orb orb-b"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -25, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="backdrop-orb orb-c"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 40, -15, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="backdrop-grid" />
    </motion.div>
  );
};
