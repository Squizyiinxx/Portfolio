"use client";

import { motion } from "framer-motion";

export default function HeroInteractive() {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.div
        className="squares"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.4,
            },
          },
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div key={i} className="square" aria-hidden="true" />
        ))}
      </motion.div>
    </motion.div>
  );
}
