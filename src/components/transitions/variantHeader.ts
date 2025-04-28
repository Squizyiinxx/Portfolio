import { Variants } from "framer-motion";

export const headerMotionProps: Variants = {
  initial: { y: -40, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.7, ease: "easeOut" }
  },
};

export const logoHoverEffect = { opacity: 0.9, scale: 1.18 };
export const logoMotionProps: Variants = {
  whileHover: { 
    scale: 1.1, 
    rotate: -8, 
    transition: { type: "spring", stiffness: 300, damping: 18 }
  }
};
