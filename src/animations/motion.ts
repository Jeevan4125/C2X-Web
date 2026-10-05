import type { Variants, Easing } from "framer-motion";

export const easeOut: Easing = [0.22, 1, 0.36, 1];

// Optimized for performance - reduced animation complexity
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: custom * 0.05, ease: easeOut },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: custom * 0.05, ease: easeOut },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: custom * 0.05, ease: easeOut },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
};

export const viewportOnce = { once: true, margin: "-60px" };

export const cardHover = {
  y: -2,
  transition: { duration: 0.2, ease: easeOut },
};

export const buttonTap = { scale: 0.97 };
