import { Variants } from "framer-motion";

function getHasReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
  );
}

function getDuration(normalDuration: number) {
  return getHasReducedMotion() ? normalDuration * 0.5 : normalDuration;
}

export const buttonVariants = (): Variants => ({
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: getDuration(0.3), ease: [0.42, 0, 0.58, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: getDuration(0.2), ease: "easeIn" },
  },
  hover: {
    scale: getHasReducedMotion() ? 1 : 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
      duration: getDuration(0.2),
    },
  },
});

export const blurTransition: Variants = {
  initial: { opacity: 0, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: getDuration(0.5), ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    transition: { duration: getDuration(0.3), ease: "easeIn" },
  },
};

export const sectionVariant: Variants = {
  hidden: {
    x: "100%",
    filter: "blur(10px)",
    zIndex: 10,
  },
  visible: {
    x: 0,
    filter: "blur(0px)",
    zIndex: 20,
    transition: {
      x: { duration: 0.9, ease: [0.33, 1, 0.68, 1] },
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      filter: { duration: 0.6, ease: "easeOut" },
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: 0,
    filter: "blur(6px)",
    zIndex: -10,
    transition: {
      opacity: { duration: 0.4, ease: "easeOut" },
      filter: { duration: 0.5, ease: "easeOut" },
    },
  },
};

export const panelVariants: Variants = {
  hidden: {
    x: "100vw",
    filter: "blur(10px)",
    zIndex: 0,
  },
  visible: {
    x: 0,
    filter: "blur(0)",
    zIndex: 20, 
    transition: {
      x: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
      opacity: { duration: 0.5 },
      filter: { duration: 0.6 },
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: {
    x: 0, 
    filter: "blur(6px)",
    zIndex: -10,
    transition: {
      opacity: { duration: 0.4, ease: "easeOut" },
      filter: { duration: 0.5, ease: "easeOut" },
      zIndex: { delay: 0.5 },
    },
  },
};


export const menuVariants: Variants = {
  closed: { x: "100%", opacity: 0, scale: 0.98 },
  open: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 24, duration: 0.45 },
  },
  exit: { x: "100%", opacity: 0, scale: 0.98, transition: { duration: 0.25 } },
};

export const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 0.7, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
export const paragraphVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.4, ease: "easeInOut" },
  },
};
export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
export const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeTransition = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: getDuration(0.3),
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: getDuration(0.2),
      ease: "easeIn",
    },
  },
};
