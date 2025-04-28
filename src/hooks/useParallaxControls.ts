"use client";

import { useRef, useEffect, useCallback } from "react";
import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { throttle } from "@/utils/throttleDebounce"; // Import throttle & debounce utilities

interface ParallaxControlsProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollYProgress?: MotionValue<number> | null;
}

export function useParallaxControls({
  mouseX,
  mouseY,
  scrollYProgress: externalScrollYProgress,
}: ParallaxControlsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: internalScrollYProgress } = useScroll({
    layoutEffect: false,
  });
  const scrollY = externalScrollYProgress ?? internalScrollYProgress;

  const throttledScrollY = useRef(
    throttle((...args: unknown[]) => {
      const value = args[0];
      if (typeof value === "number") {
        scrollY.set(value);
      }
    }, 16)
  );

  const bgY = useTransform(scrollY, [0, 1], [0, -100]);
  const blurY = useTransform(scrollY, [0, 1], [0, -60]);
  const cloudY = useTransform(scrollY, [0, 1], [0, -100]);

  const lightOpacity = useTransform(scrollY, [0, 0.5, 1], [0.2, 0.5, 0.1]);
  const lightScale = useTransform(scrollY, [0, 1], [1, 1.4]);

  const flickerOpacityRaw = useTransform(
    scrollY,
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

  const cleanup = () => {
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
      scrollY,
    ].forEach((motionValue) => {
      if (motionValue && typeof motionValue.clearListeners === "function") {
        motionValue.clearListeners();
      }
    });
  };
  const onScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    throttledScrollY.current(scrollPosition); 
  }, []); 

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

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
