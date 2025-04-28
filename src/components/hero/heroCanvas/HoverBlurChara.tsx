import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { PerformanceOptions } from "@/types/interfaceHero";

const HoverBlurChara = memo(
  ({
    hovered,
    performanceOptions,
  }: {
    hovered: boolean;
    performanceOptions: PerformanceOptions;
  }) => {
    const styleHoverBlurChara = useMemo(() => ({
      backdropFilter: `blur(${performanceOptions.blurAmount}) saturate(${performanceOptions.saturationAmount})`,
      background: "rgba(255,255,255,0.05)",
      willChange: "transform, opacity",
    }), [performanceOptions])
    return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: hovered ? 1 : 0 }}
      transition={{
        duration: performanceOptions.animationDuration,
        ease: "easeInOut",
      }}
      style={styleHoverBlurChara}
    />
    )}
);

HoverBlurChara.displayName = "HoverBlurChara";

export default HoverBlurChara;
