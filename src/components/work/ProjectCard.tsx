"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ItemProjects } from "@/types/interface";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useIdleCallback } from "@/hooks/useIdleCallback";

const PLACEHOLDER_STYLE =
  "absolute inset-0 z-10 animate-pulse bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800 rounded-lg";
const IMAGE_SIZES = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";

interface ProjectCardProps {
  item: ItemProjects;
  config: {
    enableTilt: boolean;
    tiltIntensity: number;
    animationDuration: number;
  };
}

function shouldEnableTilt(configEnable: boolean): boolean {
  if (!configEnable || typeof window === "undefined") return false;
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const lowEnd =
    navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  return !(reducedMotion || lowEnd || isMobile);
}

const OptimizedProjectCard = memo(({ item, config }: ProjectCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const enableTilt = shouldEnableTilt(config.enableTilt);

  useIdleCallback(() => setReady(true), { timeout: 500 }, [item.id]);

  const tilt = useTiltEffect({
    max: 10 * config.tiltIntensity,
    speed: 400,
    throttleMs: 40,
    disabled: !ready || !enableTilt,
  });

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    performance.mark(`image-loaded-${item.id}`);
  }, [item.id]);

  useEffect(() => {
    const el = tilt.elementRef.current;
    if (!el || !ready || !enableTilt) return;

    el.addEventListener("mousemove", tilt.handleMouseMove);
    el.addEventListener("mouseleave", tilt.handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", tilt.handleMouseMove);
      el.removeEventListener("mouseleave", tilt.handleMouseLeave);
    };
  }, [ready, enableTilt, tilt]);

  return (
    <motion.div
      ref={tilt.elementRef as React.RefObject<HTMLDivElement>}
      className="project-card group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 transition-colors duration-300 cursor-pointer"
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
        transform: "translateZ(0)",
        willChange: "transform, opacity",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: config.animationDuration,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className="relative w-full h-52 rounded-lg overflow-hidden mb-4">
        {!isLoaded && <div className={PLACEHOLDER_STYLE} />}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={IMAGE_SIZES}
          className={`object-cover rounded-lg transition-opacity duration-700 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-slate-300 mb-4">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="bg-white/10 text-xs px-3 py-1 rounded-full text-white border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});
OptimizedProjectCard.displayName = "OptimizedProjectCard";

export default OptimizedProjectCard;
