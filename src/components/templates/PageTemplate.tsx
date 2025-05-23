"use client";

import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { m, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";
import {
  useAdaptiveMousePosition,
  useCleanup,
  useParallaxControls,
  useIdleCallback,
  useIntersectionObserver,
} from "@/hooks";
import { throttle } from "@/utils/throttleDebounce";
import ScrollContainer from "../ScrollContainer";
import { sectionVariant } from "../transitions/Variants";
import { useDeviceCapabilitiesStore } from "@/store/DeviceCapabilities";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const CinematicBackgroundLayer = dynamic(
  () => import("@/components/CinematicBackgroundLayer"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black/30" />,
  }
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
    const prefersReducedMotion = usePrefersReducedMotion();
    const { x: mouseX, y: mouseY } = useAdaptiveMousePosition();

    const tier = useDeviceCapabilitiesStore(
      (s) => s.capabilities?.tier || "medium"
    );
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

    const parallax = useParallaxControls({
     mouseX: prefersReducedMotion || !isLoaded ? zeroMotion : mouseX,
      mouseY: prefersReducedMotion
        ? zeroMotion
        : isLoaded
          ? mouseY
          : zeroMotion,
      scrollYProgress: prefersReducedMotion
        ? undefined
        : isLoaded
          ? scrollY
          : undefined,
    });

    useCleanup({
      motionValues: [scrollY],
      onCustomCleanup: () => parallax.cleanup?.(),
    });

    useIdleCallback(() => setIsLoaded(true), { timeout: 300 }, []);

    const throttledSetScroll = useMemo(
      () =>
        throttle(
          (...args: unknown[]) => {
            if (typeof args[0] === "number") {
              scrollY.set(args[0]);
            }
          },
          tier === "low" ? 90 : 50
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
          {isInView && (
            <>
              {isLoaded && Component}
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
