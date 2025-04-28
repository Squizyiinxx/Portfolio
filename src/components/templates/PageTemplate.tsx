"use client";

import React, { useRef, useState, useMemo, useCallback } from "react";
import { m, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import {useAdaptiveMousePosition,useCleanup,useDeviceCapabilities,useParallaxControls,useIdleCallback,useIntersectionObserver } from "@/hooks"
import { throttle } from "@/utils/throttleDebounce";
import ScrollContainer from "../ScrollContainer";
import { sectionVariant } from "../transitions/Variants";

const CinematicBackgroundLayer = dynamic(
  () => import("@/components/CinematicBackgroundLayer"),
  { ssr: false }
);

export interface PageTemplateProps {
  className: string;
  children: React.ReactNode;
  bgSrc: string;
  bgAlt: string;
  blurData: string;
  pageType: "work" | "contact";
  Component?: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = React.memo(
  ({ children, className, pageType, bgSrc, bgAlt, blurData, Component }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const scrollY = useMotionValue(0);
    const zeroMotion = useMotionValue(0);
    const { x: mouseX, y: mouseY } = useAdaptiveMousePosition();
    const parallax = useParallaxControls({
      mouseX: isLoaded ? mouseX : zeroMotion,
      mouseY: isLoaded ? mouseY : zeroMotion,
      scrollYProgress: isLoaded ? scrollY : undefined,
    });
    const { tier = "medium" } = useDeviceCapabilities();
    const blurStyle = useMemo(() => {
      return tier === "low"
        ? "blur(2px)"
        : tier === "medium"
        ? "blur(6px)"
        : "blur(12px)";
    }, [tier]);
    const isInView = useIntersectionObserver(sectionRef, {
      threshold: 0.2,
      rootMargin: "200px",
      freezeOnceVisible: true,
    });
    useCleanup({
      motionValues: [scrollY],
      onCustomCleanup: () => parallax.cleanup?.(),
    });
    useIdleCallback(() => setIsLoaded(true), 1500);
    const throttledSetScroll = useMemo(
      () =>
        throttle(
          (...args: unknown[]) => {
            if (typeof args[0] === "number") {
              scrollY.set(args[0]);
            }
          },
          tier === "low" ? 100 : 50
        ),
      [scrollY, tier]
    );
    const handleScrollProgress = useCallback(
      (v: number) => throttledSetScroll(v),
      [throttledSetScroll]
    );

    return (
      <m.div
        ref={sectionRef}
        key={pageType}
        className={className}
        variants={sectionVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          willChange: "transform, opacity",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {isLoaded && isInView && (
            <>
              {Component}
              <CinematicBackgroundLayer
                bgSrc={bgSrc}
                bgAlt={bgAlt}
                blurDataURL={blurData}
                blurStyle={blurStyle}
                {...parallax}
              />
            </>
          )}
          <ScrollContainer onScrollProgress={handleScrollProgress}>
            {isLoaded && isInView ? children : null}
          </ScrollContainer>
        </div>
      </m.div>
    );
  }
);

PageTemplate.displayName = "PageTemplate";
export default PageTemplate;
