"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type ScrollContainerProps = {
  children: React.ReactNode;
  onScrollProgress?: (progress: number) => void;
};

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  onScrollProgress,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const smoothProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { scrollYProgress } = useScroll({
    container: scrollRef,
    layoutEffect: true,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      smoothProgress.set(value);
      if (onScrollProgress) onScrollProgress(value);
    });
    return () => unsubscribe();
  }, [scrollYProgress, smoothProgress, onScrollProgress]);

  return (
    <motion.div
      ref={scrollRef}
      className="relative z-20 overflow-y-auto h-full px-6 py-12 will-change-transform transform-gpu translate-z-0 overscroll-behavior-contain"
      aria-label="content project"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
        contain: "content",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-10 content-visibility-auto contain-intrinsic-size-[300px]">
        {children}
      </div>
    </motion.div>
  );
};

export default React.memo(ScrollContainer);
