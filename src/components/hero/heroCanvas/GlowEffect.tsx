import { memo, useMemo } from "react";
import { PerformanceTier } from "@/types/interfaceHero";
import { PerformanceOptions } from "@/types/interfaceHero";
import { motion } from "framer-motion";

const GlowEffect = memo(
  ({
    hovered,
    performanceTier,
    performanceOptions,
  }: {
    hovered: boolean;
    performanceTier: PerformanceTier;
    performanceOptions: PerformanceOptions;
  }) => {

    const styleGlowEffect = useMemo(
      () => ({
        width: performanceTier === "low" ? "600px" : "700px",
        height: performanceTier === "low" ? "600px" : "700px",
        top: "50%",
        left: "50%",
        transform: "translate3d(-50%, -50%, 0)",
        mixBlendMode: "screen" as const,
        willChange: "transform, opacity",
      }),
      [performanceTier]
    );

    return(
    <motion.div
      className="absolute z-0 rounded-full bg-purple-300 blur-3xl pointer-events-none"
      style={styleGlowEffect}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: hovered ? 1 : 0.8,
        opacity: hovered ? performanceOptions.glowIntensity : 0,
      }}
      transition={{
        duration: performanceOptions.animationDuration + 0.2,
        ease: "easeInOut",
      }}
    />
  )}
);
GlowEffect.displayName = "GlowEffect";

export default GlowEffect;
