"use client";

import { panelVariants } from "@/components/transitions/Variants";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  panelKey: string;
  zIndex?: number;
  className?: string;
}

export default function Panel({
  children,
  panelKey,
  zIndex = 998,
  className = "",
}: PanelProps) {
  return (
    <motion.section
      key={panelKey}
      className={`absolute h-[100dvh] w-full top-0 left-0 flex justify-center items-center px-6 py-12 pa bg-primary-300 ${className} will-change-transform transform-gpu translate-z-0`}
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ zIndex }}
    >
      {children}
    </motion.section>
  );
}
