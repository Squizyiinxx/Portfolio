import { PerformanceOptions, PerformanceTier } from "@/types/interfaceHero";


const PERFORMANCE_OPTIONS: Record<PerformanceTier, PerformanceOptions> = {
  high: {
    particleCount: 30,
    enableShimmer: true,
    blurAmount: "20px",
    saturationAmount: "150%",
    glowIntensity: 0.2,
    animationDuration: 0.6,
  },
  medium: {
    particleCount: 15,
    enableShimmer: true,
    blurAmount: "15px",
    saturationAmount: "130%",
    glowIntensity: 0.15,
    animationDuration: 0.8,
  },
  low: {
    particleCount: 8,
    enableShimmer: false,
    blurAmount: "10px",
    saturationAmount: "110%",
    glowIntensity: 0.1,
    animationDuration: 1,
  },
};

const CANVAS_SIZE = 700;

export {PERFORMANCE_OPTIONS, CANVAS_SIZE};