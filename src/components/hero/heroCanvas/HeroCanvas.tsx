"use client";

import { m } from "framer-motion";
import dynamic from "next/dynamic";
import MotionImage from "./MotionImage";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import ImageHoverDetector from "./ImageHoverDetector";
import { PerformanceTier } from "@/types/interfaceHero";
import { CANVAS_SIZE, PERFORMANCE_OPTIONS } from "@/constants/ImageCanvas";
import { usePanel } from "@/hooks/usePanel";
import { prefetchProfile } from "@/lib/prefetch";
import { useRef, useState, useEffect, useMemo, memo } from "react";
import { useDeviceCapabilitiesStore } from "@/store/DeviceCapabilities";

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
    threshold: 0.5,
    rootMargin: "100px",
  });

  const deviceCapabilities = useDeviceCapabilitiesStore((s) => s.capabilities);
  const performanceTier = deviceCapabilities.tier as PerformanceTier;

  const performanceOptions =
    PERFORMANCE_OPTIONS[performanceTier] || PERFORMANCE_OPTIONS.medium;

  const [hovered, setHovered] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { handlers } = usePanel();

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

  const motionAnimate = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    }),
    []
  );

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
            performanceTier === "low" ? "10px" : "20px"
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
    <div className="fixed bottom-0 left-1/2 w-full h-screen transform -translate-x-1/2 overflow-hidden">
      {hovered && performanceTier !== "low" && (
        <HoverBlurChara
          hovered={hovered}
          performanceOptions={performanceOptions}
        />
      )}

      <m.div
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
            onHoverChange={() => {
              setHovered(!hovered);
              prefetchProfile();
            }}
            onImageClick={handlers.showProfile}
            canvasSize={CANVAS_SIZE}
            throttleMs={performanceTier === "low" ? 85 : 50}
          />
        )}

        {hovered && isInView && performanceOptions.enableShimmer && (
          <m.div
          {...motionAnimate}
          >
            <ShimmerEffect
              canvasSize={CANVAS_SIZE}
              intensity={shimmerIntensity}
            />
          </m.div>
        )}

        {hovered && isInView && (
          <m.div {...motionAnimate}>
            <GlowEffect
              hovered={hovered}
              performanceTier={performanceTier}
              performanceOptions={performanceOptions}
            />
          </m.div>
        )}

        {isInView && (
          <m.div layout layoutId="hero-text">
            <HeroText
              hovered={hovered}
              animationSpeed={performanceTier === "low" ? 0.5 : 1}
            />
          </m.div>
        )}

        <MotionImage
          ref={imageRef}
          src="/hero.webp"
          priority
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          sizes={`(max-width: 768px) 80vw, ${CANVAS_SIZE}px`}
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
        />
      </m.div>
    </div>
  );
}

export default memo(EnhancedHeroCanvas);
