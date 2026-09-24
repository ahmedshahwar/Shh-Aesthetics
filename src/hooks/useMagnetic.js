import { useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/** Element drifts toward the pointer while hovered, then springs home. */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.4 });

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x, y }, handlers: { onPointerMove, onPointerLeave } };
}
