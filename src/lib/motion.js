/* Shared Framer Motion presets. One easing curve everywhere keeps the site feeling like one hand made it. */

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT = [0.76, 0, 0.24, 1];

export const inView = { once: true, margin: '-12% 0px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: EASE },
  }),
};

export const staggerParent = (stagger = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const clipReveal = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.4, delay, ease: EASE_IN_OUT },
  }),
};

export const lineGrow = {
  hidden: { scaleX: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    transition: { duration: 1.2, delay, ease: EASE },
  }),
};
