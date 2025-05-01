import { RefObject } from "react";

interface ParticleProps {
  effectiveType: string;
  saveData: boolean;
}

type PerformanceTier = "high" | "medium" | "low";

interface PerformanceOptions {
  particleCount: number;
  enableShimmer: boolean;
  blurAmount: string;
  saturationAmount: string;
  glowIntensity: number;
  animationDuration: number;
}

interface ImageHoverDetectorProps {
  imageRef: RefObject<HTMLImageElement | null>;
  canvasRef: RefObject<HTMLCanvasElement| null>;
  onHoverChange: (isHovered: boolean) => void;
  onImageClick: () => void;
  canvasSize: number;
  throttleMs?: number;
}

interface EnhancedHeroCanvasProps {
  setProfile: () => void;
}


export type { ParticleProps, PerformanceTier, PerformanceOptions, ImageHoverDetectorProps, EnhancedHeroCanvasProps };