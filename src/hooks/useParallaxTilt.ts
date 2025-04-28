import { useMotionValue, useTransform } from "framer-motion";
import { useCallback } from "react";

export function useParallaxTilt(width = 1, height = 1) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / (rect.width || width);
      const y = (e.clientY - rect.top) / (rect.height || height);
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, width, height]
  );

  return { rotateX, rotateY, handleMouseMove };
}
