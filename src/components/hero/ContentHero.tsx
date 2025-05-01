"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
const HeroCanvas = dynamic(() => import("./heroCanvas/HeroCanvas"), {
  ssr: false,
});

const ContentHero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => {
            setShouldRender(true);
          }, 600); 
          observer.disconnect();

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="w-full relative">
      {shouldRender && (
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
