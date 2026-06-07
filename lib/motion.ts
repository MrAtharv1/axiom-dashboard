import type { Variants } from "framer-motion";

export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20, 
};

export const axiomSpring = { 
  type: "spring" as const,
  stiffness: 300, 
  damping: 24 
};

export const cardHover = {
  scale: 1.02,
  transition: axiomSpring
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
};