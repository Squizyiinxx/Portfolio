// EnhancedHeroCanvas.tsx

"use client";

import { useRef, useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import MotionImage from "./MotionImage";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useDeviceCapabilities from "@/hooks/useDeviceCapabilities";
import { PerformanceTier } from "@/types/interfaceHero";
import ImageHoverDetector from "./ImageHoverDetector";
import { CANVAS_SIZE, PERFORMANCE_OPTIONS } from "@/constants/ImageCanvas";
import { usePanel } from "@/hooks/usePanel";
import { useRouter } from "next/navigation";
import { useIdleCallback } from "@/hooks/useIdleCallback";
import { prefetchProfile, prefetchWork } from "@/lib/prefetch";

const HoverBlurChara = dynamic(() => import("./HoverBlurChara"), {
  ssr: false,
});
const GlowEffect = dynamic(() => import("./GlowEffect"), {
  ssr: false,
});
const HeroText = dynamic(() => import("../HeroText"), {
  ssr: false,
});
const ShimmerEffect = dynamic(() => import("./ShimmerEffect"), {
  ssr: false,
});

function EnhancedHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const isInView = useIntersectionObserver(containerRef, {
    threshold: 0.1,
    rootMargin: "100px",
  });

  const deviceCapabilities = useDeviceCapabilities();
  const performanceTier = deviceCapabilities.tier as PerformanceTier;

  const performanceOptions =
    PERFORMANCE_OPTIONS[performanceTier] || PERFORMANCE_OPTIONS.medium;

  const [hovered, setHovered] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { handlers } = usePanel();

    useIdleCallback(() => {
      prefetchWork();
    }, 2000);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const onLoad = () => {
      setImageReady(true);
      const timer = setTimeout(
        () => setInitialized(true),
        performanceTier === "low" ? 600 : 300
      );
      return () => clearTimeout(timer);
    };

    if (img.complete && img.naturalWidth > 0) {
      onLoad();
    } else {
      img.addEventListener("load", onLoad);
      return () => img.removeEventListener("load", onLoad);
    }
  }, [performanceTier]);

  const shimmerIntensity = useMemo(
    () => (performanceTier === "high" ? 1 : 0.6),
    [performanceTier]
  );

  const containerMotionProps = useMemo(
    () => ({
      initial: { y: 50, opacity: 0 },
      animate: {
        y: isInView ? 0 : 50,
        opacity: initialized && isInView ? 1 : 0,
      },
      transition: {
        duration: performanceOptions.animationDuration + 0.4,
        ease: "easeOut",
      },
      layout: true,
      layoutRoot: true,
    }),
    [isInView, initialized, performanceOptions.animationDuration]
  );

  const motionImageStyle = useMemo(
    () => ({
      filter: hovered
        ? `drop-shadow(0 0 ${
            performanceTier === "low" ? "15px" : "25px"
          } rgba(255,224,130,0.9))`
        : "brightness(0.6)",
      transition: `filter ${performanceOptions.animationDuration}s ease`,
      width: "100%",
      height: "auto",
      maxWidth: `${CANVAS_SIZE}px`,
      willChange: "transform",
      transform: "translate3d(0,0,0)",
    }),
    [hovered, performanceTier, performanceOptions.animationDuration]
  );

  return (
    <div
      className="fixed bottom-0 left-1/2 w-full h-screen transform -translate-x-1/2 overflow-hidden"
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {hovered && performanceTier !== "low" && (
        <HoverBlurChara
          hovered={hovered}
          performanceOptions={performanceOptions}
        />
      )}

      <motion.div
        ref={containerRef}
        {...containerMotionProps}
        className={`absolute bottom-0 z-10 w-full flex justify-center ${
          hovered ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {imageReady && isInView && (
          <ImageHoverDetector
            imageRef={imageRef}
            canvasRef={canvasRef}
            onHoverChange={setHovered}
            onImageClick={() => {
              handlers.showProfile();
              prefetchProfile();
            }}
            canvasSize={CANVAS_SIZE}
            throttleMs={performanceTier === "low" ? 80 : 50}
          />
        )}

        {hovered && isInView && performanceOptions.enableShimmer && (
          <motion.div layout layoutId="shimmer-effect">
            <ShimmerEffect
              canvasSize={CANVAS_SIZE}
              intensity={shimmerIntensity}
            />
          </motion.div>
        )}

        {hovered && isInView && (
          <motion.div layout layoutId="glow-effect">
            <GlowEffect
              hovered={hovered}
              performanceTier={performanceTier}
              performanceOptions={performanceOptions}
            />
          </motion.div>
        )}

        {isInView && (
          <motion.div layout layoutId="hero-text">
            <HeroText
              hovered={hovered}
              animationSpeed={performanceTier === "low" ? 0.8 : 1}
            />
          </motion.div>
        )}

        <MotionImage
          ref={imageRef}
          src="/hero.webp"
          alt="hero"
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          priority
          decoding="async"
          fetchPriority="high"
          style={motionImageStyle}
          initial={{ y: 30, opacity: 0 }}
          animate={{
            scale: isInView ? (hovered ? 1.05 : 1) : 0.95,
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 30,
          }}
          transition={{
            duration: performanceOptions.animationDuration,
            ease: "easeOut",
          }}
          loading="eager"
        />
      </motion.div>
    </div>
  );
}

export default memo(EnhancedHeroCanvas);
