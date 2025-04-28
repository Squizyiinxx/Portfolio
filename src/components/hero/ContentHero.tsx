"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./heroCanvas/HeroCanvas"), {
  ssr: false,
});

const ContentHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCanvas(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="w-full relative">
      {showCanvas && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <HeroCanvas />
        </motion.div>
      )}
    </div>
  );
};

export default ContentHero;
