"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useMotionValue,
} from "framer-motion";
import { throttle } from "@/utils/throttleDebounce";

interface ParallaxControlsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress?: MotionValue<number> | null;
  manualScrollHandling?: boolean;
}
export function useParallaxControls({
  mouseX,
  mouseY,
  scrollYProgress: externalProgress,
  manualScrollHandling = false,
}: ParallaxControlsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const internalProgress = useScroll({ layoutEffect: false }).scrollYProgress;
  const manualProgress = useMotionValue(0);
  const effectiveProgress =
    externalProgress ??
    (manualScrollHandling ? manualProgress : internalProgress);

  useEffect(() => {
    if (!manualScrollHandling) return;

    const setNormalizedScroll = throttle(() => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const normalized = maxScroll > 0 ? scrollY / maxScroll : 0;
      effectiveProgress.set(normalized);
    }, 16);

    window.addEventListener("scroll", setNormalizedScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", setNormalizedScroll);
    };
  }, [manualScrollHandling, effectiveProgress]);

  const bgY = useTransform(effectiveProgress, [0, 1], [0, -100]);
  const blurY = useTransform(effectiveProgress, [0, 1], [0, -60]);
  const cloudY = useTransform(effectiveProgress, [0, 1], [0, -100]);

  const lightOpacity = useTransform(
    effectiveProgress,
    [0, 0.5, 1],
    [0.2, 0.5, 0.1]
  );
  const lightScale = useTransform(effectiveProgress, [0, 1], [1, 1.4]);

  const flickerOpacityRaw = useTransform(
    effectiveProgress,
    [0, 0.2, 0.4, 0.6, 1],
    [0.1, 0.5, 0.2, 0.6, 0.3]
  );

  const flickerOpacity = useSpring(flickerOpacityRaw, {
    stiffness: 80,
    damping: 20,
    mass: 0.6,
  });

  const cloudX = useTransform(mouseX, [-0.5, 0.5], [40, -40]);
  const lightX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const lightY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const cleanup = useCallback(() => {
    [
      bgY,
      blurY,
      cloudY,
      lightOpacity,
      lightScale,
      flickerOpacity,
      flickerOpacityRaw,
      cloudX,
      lightX,
      lightY,
      effectiveProgress,
    ].forEach((mv) => {
      if (typeof mv?.clearListeners === "function") mv.clearListeners();
    });
  }, [
    bgY,
    blurY,
    cloudY,
    lightOpacity,
    lightScale,
    flickerOpacity,
    flickerOpacityRaw,
    cloudX,
    lightX,
    lightY,
    effectiveProgress,
  ]);

  return {
    scrollRef,
    bgY,
    blurY,
    cloudY,
    cloudX,
    lightX,
    lightY,
    lightOpacity,
    lightScale,
    flickerOpacity,
    cleanup,
  };
}
