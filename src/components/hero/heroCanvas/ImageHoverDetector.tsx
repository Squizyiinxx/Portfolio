
import { ImageHoverDetectorProps } from "@/types/interfaceHero";
import React, { useEffect, useRef, useCallback } from "react";

const ImageHoverDetector = ({
  imageRef,
  canvasRef,
  onHoverChange,
  onImageClick,
  canvasSize,
  throttleMs = 50,
}: ImageHoverDetectorProps) => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const isHoveredRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const lastProcessTimeRef = useRef(0);
  const mountedRef = useRef(true);

  const getCanvasCoordinates = useCallback(
    (e: MouseEvent | PointerEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvasSize / rect.width;
      const scaleY = canvasSize / rect.height;
      const x = Math.round((e.clientX - rect.left) * scaleX);
      const y = Math.round((e.clientY - rect.top) * scaleY);

      if (x < 0 || y < 0 || x >= canvasSize || y >= canvasSize) return null;
      return { x, y };
    },
    [canvasSize]
  );

  const isPixelVisible = useCallback(
    (x: number, y: number, ctx: CanvasRenderingContext2D): boolean => {
      try {
        return ctx.getImageData(x, y, 1, 1).data[3] > 50;
      } catch {
        return false;
      }
    },
    []
  );

  useEffect(() => {
    mountedRef.current = true;
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctxRef.current = ctx;
    canvas.width = canvas.height = canvasSize;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    ctx.drawImage(img, 0, 0, canvasSize, canvasSize);

    return () => {
      mountedRef.current = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      ctxRef.current = null;
    };
  }, [canvasRef, imageRef, canvasSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafIdRef.current) return;
      if (!mountedRef.current) return;

      const now = performance.now();
      const elapsed = now - lastProcessTimeRef.current;
      if (elapsed < throttleMs) return;

      rafIdRef.current = requestAnimationFrame(() => {
        const coords = getCanvasCoordinates(e, canvas);
        if (!coords) {
          if (isHoveredRef.current) {
            isHoveredRef.current = false;
            onHoverChange(false);
          }
          rafIdRef.current = null;
          return;
        }

        const { x, y } = coords;
        const ctx = ctxRef.current;
        if (!ctx) {
          rafIdRef.current = null;
          return;
        }

        const newHoveredState = isPixelVisible(x, y, ctx);
        if (newHoveredState !== isHoveredRef.current) {
          isHoveredRef.current = newHoveredState;
          onHoverChange(newHoveredState);
        }
        rafIdRef.current = null;
        lastProcessTimeRef.current = performance.now();
      });
    };

    const handlePointerLeave = () => {
      if (isHoveredRef.current) {
        isHoveredRef.current = false;
        onHoverChange(false);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const coords = getCanvasCoordinates(e, canvas);
      if (!coords) return;

      const { x, y } = coords;
      const ctx = ctxRef.current;
      if (!ctx) return;

      if (isPixelVisible(x, y, ctx)) {
        onImageClick();
      }
    };

    container.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    container.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });
    container.addEventListener("click", handleClick, { passive: true });

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);
    };
  }, [
    canvasRef,
    onHoverChange,
    onImageClick,
    getCanvasCoordinates,
    isPixelVisible,
    throttleMs,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none left-1/2 -translate-x-1/2 opacity-0"
      style={{
        width: "100%",
        height: "auto",
        maxWidth: `${canvasSize}px`,
      }}
      aria-hidden="true"
    />
  );
};

export default ImageHoverDetector;
