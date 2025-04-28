"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface TiltConfig {
  max?: number;
  scale?: number;
  speed?: number;
  disabled?: boolean;
  throttleMs?: number;
}

interface TiltValues {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  elementRef: React.RefObject<HTMLElement | null>;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseLeave: () => void;
}

export function useTiltEffect(config: TiltConfig = {}): TiltValues {
  const {
    max = 10,
    scale = 1.05,
    speed = 300,
    disabled = false,
    throttleMs = 50,
  } = config;

  const elementRef = useRef<HTMLElement | null>(null);
  const lastProcessTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scaleValue = useMotionValue(1);

  const springRotateX = useSpring(rotateX, { stiffness: speed, damping: 25 });
  const springRotateY = useSpring(rotateY, { stiffness: speed, damping: 25 });
  const springScale = useSpring(scaleValue, { stiffness: speed, damping: 25 });

  const processMouseMove = useCallback(
    (e: MouseEvent) => {
      if (disabled || !elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPercentage = (mouseX - width / 2) / width;
      const yPercentage = (mouseY - height / 2) / height;

      rotateX.set(yPercentage * -max);
      rotateY.set(xPercentage * max);
      scaleValue.set(scale);
    },
    [disabled, max, scale, rotateX, rotateY, scaleValue]
  );

  // Throttled mouse move handler dengan RAF
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafIdRef.current) return;

      const now = performance.now();
      const elapsed = now - lastProcessTimeRef.current;

      if (elapsed < throttleMs) return;

      rafIdRef.current = requestAnimationFrame(() => {
        processMouseMove(e);
        lastProcessTimeRef.current = performance.now();
        rafIdRef.current = null;
      });
    },
    [processMouseMove, throttleMs]
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    rotateX.set(0);
    rotateY.set(0);
    scaleValue.set(1);
  }, [disabled, rotateX, rotateY, scaleValue]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rotateX.destroy();
      rotateY.destroy();
      scaleValue.destroy();
      springRotateX.destroy();
      springRotateY.destroy();
      springScale.destroy();
    };
  }, [rotateX, rotateY, scaleValue, springRotateX, springRotateY, springScale]);

  return {
    rotateX: springRotateX,
    rotateY: springRotateY,
    scale: springScale,
    elementRef,
    handleMouseMove,
    handleMouseLeave,
  };
}
