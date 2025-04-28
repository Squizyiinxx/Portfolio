"use client";
import { useRef, useEffect, useMemo } from "react";
interface ShimmerEffectProps {
  canvasSize: number;
  intensity: number;
}

export default function ShimmerEffect({
  canvasSize,
  intensity,
}: ShimmerEffectProps) {
  const shimmerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const frameRef = useRef(0);
  const runningRef = useRef(true);

  const canvasStyle = useMemo(
    () => ({
      width: `${canvasSize}px`,
      height: `${canvasSize}px`,
      opacity: intensity,
      transition: "opacity 0.4s ease",
      transform: "translateZ(0)",
      willChange: "transform",
    }),
    [canvasSize, intensity]
  );

  // Memoize canvas className untuk optimasi
  const canvasClassName = useMemo(
    () =>
      "absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu",
    []
  );

  useEffect(() => {
    const shimmerCanvas = shimmerCanvasRef.current;
    if (!shimmerCanvas) return;

    const ctx = shimmerCanvas.getContext("2d", {
      alpha: true,
      willReadFrequently: true,
    });
    if (!ctx) return;

    shimmerCanvas.width = shimmerCanvas.height = canvasSize;

    function animate() {
      if (!runningRef.current || !ctx) return;

      ctx.clearRect(0, 0, canvasSize, canvasSize);

      const currentFrame = frameRef.current;
      const gradient = ctx.createRadialGradient(
        canvasSize / 2 + Math.sin(currentFrame / 10) * 20,
        canvasSize / 2 + Math.cos(currentFrame / 15) * 20,
        100,
        canvasSize / 2,
        canvasSize / 2,
        350
      );

      gradient.addColorStop(0, "rgba(255,255,255,0.06)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      frameRef.current = currentFrame + 1;
      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      runningRef.current = false;
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (ctx) {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
      }
    };
  }, [canvasSize]);

  return (
    <canvas
      ref={shimmerCanvasRef}
      className={canvasClassName}
      style={canvasStyle}
      aria-hidden="true"
    />
  );
}
