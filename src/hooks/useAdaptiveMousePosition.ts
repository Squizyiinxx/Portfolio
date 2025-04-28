
import { useLayoutEffect, useRef, useCallback } from "react";
import { useMotionValue } from "framer-motion";

export function useAdaptiveMousePosition(threshold = 0.01) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const frame = useRef<number | null>(null);

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const newX = (clientX - width / 2) / width;
      const newY = (clientY - height / 2) / height;

      const deltaX = Math.abs(newX - x.get());
      const deltaY = Math.abs(newY - y.get());

      if (deltaX > threshold || deltaY > threshold) {
        x.set(newX);
        y.set(newY);
      }
    },
    [x, y, threshold]
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const handlePointerMove = (e: PointerEvent) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      const { clientX, clientY } = e;
      frame.current = requestAnimationFrame(() => {
        updatePosition(clientX, clientY);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [updatePosition]);

  return { x, y };
}
