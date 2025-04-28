"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white"
      animate={{ rotate: 360, scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
    />
  );
}
