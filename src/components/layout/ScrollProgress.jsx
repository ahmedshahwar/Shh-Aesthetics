import { motion, useScroll, useSpring } from 'framer-motion';

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: 2,
  zIndex: 1001,
  background: 'var(--champagne)',
  transformOrigin: '0 50%',
};

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ ...style, scaleX }} aria-hidden="true" />;
}
