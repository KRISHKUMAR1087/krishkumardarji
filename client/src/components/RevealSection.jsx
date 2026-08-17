import { motion } from 'framer-motion';

/**
 * RevealSection
 * Drop-in wrapper for any section/card content to give it a cinematic
 * scroll-triggered entrance. Wrap existing section content with it —
 * no need to rewrite the section itself.
 *
 * <RevealSection variant="speed-wipe">
 *   <YourExistingSectionMarkup />
 * </RevealSection>
 *
 * variants:
 *  - "speed-wipe"   : content slides in behind a motion-blur speed streak (F1 pit-lane feel)
 *  - "gauge-count"   : content pops in like a dial snapping to a reading
 *  - "stagger-cards" : direct children fade/rise in one after another (use for grids)
 *  - "curtain"       : a dark panel wipes away to reveal the section (dramatic, use sparingly)
 */
const variants = {
  'speed-wipe': {
    hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  'gauge-count': {
    hidden: { opacity: 0, scale: 0.85, rotate: -3 },
    show: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 140, damping: 14 },
    },
  },
  curtain: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  },
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export const RevealSection = ({
  children,
  variant = 'speed-wipe',
  className = '',
  once = true,
  amount = 0.2,
  showCurtain = false,
}) => {
  if (variant === 'stagger-cards') {
    return (
      <motion.div
        className={className}
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={staggerChild}>
                {child}
              </motion.div>
            ))
          : <motion.div variants={staggerChild}>{children}</motion.div>}
      </motion.div>
    );
  }

  const v = variants[variant] || variants['speed-wipe'];

  return (
    <motion.div
      className={`reveal-section reveal-${variant} ${className}`}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {variant === 'speed-wipe' && (
        <motion.span
          className="reveal-speed-streak"
          initial={{ scaleX: 0, opacity: 0.8 }}
          whileInView={{ scaleX: [0, 1, 0], opacity: [0.8, 1, 0] }}
          viewport={{ once, amount }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
      {showCurtain && variant === 'curtain' && (
        <motion.div
          className="reveal-curtain-panel"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once, amount }}
          transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
        />
      )}
      {children}
    </motion.div>
  );
};

export default RevealSection;
