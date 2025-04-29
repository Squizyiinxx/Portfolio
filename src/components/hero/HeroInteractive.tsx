"use client";

import { m } from "framer-motion";

export default function HeroInteractive() {
  return (
    <m.div
      className="absolute top-0 left-0 w-full h-full z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <m.div
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
      </m.div>
    </m.div>
  );
}
