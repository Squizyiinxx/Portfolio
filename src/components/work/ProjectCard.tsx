// src/components/OptimizedProjectCard.tsx
"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ItemProjects } from "@/types/interface";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

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

const TechBadge = memo(({ tech }: { tech: string }) => (
  <span className="bg-white/10 text-xs px-3 py-1 rounded-full text-white border border-white/20">
    {tech}
  </span>
));
TechBadge.displayName = "TechBadge";

const OptimizedCardImage = memo(
  ({
    src,
    alt,
    isLoaded,
    onLoad,
  }: {
    src: string;
    alt: string;
    isLoaded: boolean;
    onLoad: () => void;
  }) => (
    <>
      {!isLoaded && <div className={PLACEHOLDER_STYLE} />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={IMAGE_SIZES}
        className={`object-cover rounded-lg transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={onLoad}
        loading="lazy"
      />
    </>
  )
);
OptimizedCardImage.displayName = "OptimizedCardImage";

const CardContent = memo(
  ({
    title,
    description,
    stack,
    animationDuration,
  }: {
    title: string;
    description: string;
    stack: string[];
    animationDuration: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: 0.1, duration: animationDuration }}
    >
      <h3 className="text-xl leading-6 tracking-wide font-semibold mb-2">
        {title}
      </h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech) => (
          <TechBadge key={tech} tech={tech} />
        ))}
      </div>
    </motion.div>
  )
);
CardContent.displayName = "CardContent";

const OptimizedProjectCard = memo(({ item, config }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(cardRef, {
    threshold: 0.1,
    rootMargin: "100px",
    freezeOnceVisible: true,
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const tiltValues = useTiltEffect({
    max: 10 * config.tiltIntensity,
    speed: 400,
    disabled: !config.enableTilt,
  });

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    performance.mark(`image-loaded-${item.id}`);
  }, [item.id]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element || !config.enableTilt) return;

    const handleTilt = (e: Event) => {
      const { mouseX, mouseY } = (e as CustomEvent).detail;
      requestAnimationFrame(() => {
        tiltValues.rotateX.set(
          (mouseY / element.clientHeight - 0.5) * -20 * config.tiltIntensity
        );
        tiltValues.rotateY.set(
          (mouseX / element.clientWidth - 0.5) * 20 * config.tiltIntensity
        );
        tiltValues.scale.set(1.05);
        performance.mark(`tilt-updated-${item.id}`);
      });
    };

    const handleReset = () => {
      requestAnimationFrame(() => {
        tiltValues.rotateX.set(0);
        tiltValues.rotateY.set(0);
        tiltValues.scale.set(1);
      });
    };

    element.addEventListener("cardTilt", handleTilt);
    element.addEventListener("cardTiltReset", handleReset);

    return () => {
      element.removeEventListener("cardTilt", handleTilt);
      element.removeEventListener("cardTiltReset", handleReset);
    };
  }, [config.enableTilt, tiltValues, config.tiltIntensity, item.id]);

  const cardStyle = {
    rotateX: tiltValues.rotateX,
    rotateY: tiltValues.rotateY,
    scale: tiltValues.scale,
    transformPerspective: 1000,
    transformStyle: "preserve-3d" as const,
    transform: "translateZ(0)",
    willChange: "transform, opacity",
  };

  return (
    <motion.div
      ref={cardRef}
      data-id={item.id.toString()}
      className="project-card group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/10 transition-colors duration-300 cursor-pointer"
      style={cardStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: config.animationDuration,
        ease: [0.23, 1, 0.32, 1],
      }}
      layout
      layoutId={`project-${item.id}`}
    >
      <div className="relative w-full h-52 rounded-lg overflow-hidden mb-4">
        <OptimizedCardImage
          src={item.image}
          alt={item.title}
          isLoaded={isLoaded}
          onLoad={handleImageLoad}
        />
      </div>
      <CardContent
        title={item.title}
        description={item.description}
        stack={item.stack}
        animationDuration={config.animationDuration}
      />
    </motion.div>
  );
});

OptimizedProjectCard.displayName = "OptimizedProjectCard";

export default OptimizedProjectCard;
