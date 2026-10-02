/* Shared Framer Motion presets. One easing curve everywhere keeps the site feeling like one hand made it. */

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];

export const inView = { once: true, margin: '-10% 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

export const staggerParent = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.1, delay, ease: EASE_IN_OUT },
  }),
};
