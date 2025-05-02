"use client";

import { motion, MotionValue, useTransform, MotionStyle } from "framer-motion";
import { memo, useMemo } from "react";
import CinematicImageLayer from "./CinematicImageLayer";

interface Props {
  bgSrc: string;
  bgAlt: string;
  bgY: MotionValue<number>;
  blurY: MotionValue<number>; // Reserved for future, or optional background blur motion
  flickerOpacity: MotionValue<number>;
  lightOpacity: MotionValue<number>;
  lightScale: MotionValue<number>;
  lightX: MotionValue<number>;
  lightY: MotionValue<number>;
  zIndexBg?: number;
  blurDataURL?: string;
  blurStyle?: string;
}

function CinematicBackgroundLayer({
  bgSrc,
  bgAlt,
  bgY,
  flickerOpacity,
  lightOpacity,
  lightScale,
  lightX,
  lightY,
  zIndexBg = 0,
  blurDataURL,
  blurStyle,
}: Props) {
  const bgTransform = useTransform(bgY, (y) => `translate3d(0, ${y}px, 0)`);

  const backdropStyle = useMemo<MotionStyle>(
    () => (blurStyle ? { filter: blurStyle, willChange: "filter" } : {}),
    [blurStyle]
  );

  const flickerStyle = useMemo<MotionStyle>(
    () => ({
      opacity: flickerOpacity,
      transform: "translateZ(0)",
      willChange: "opacity, transform",
    }),
    [flickerOpacity]
  );

  const lightStyle = useMemo<MotionStyle>(
    () => ({
      opacity: lightOpacity,
      scale: lightScale,
      x: lightX,
      y: lightY,
      transform: "translateZ(0)",
      willChange: "opacity, transform",
    }),
    [lightOpacity, lightScale, lightX, lightY]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black -z-10" />

      <CinematicImageLayer
        src={bgSrc}
        alt={bgAlt}
        style={{ transform: bgTransform }}
        className="absolute inset-0"
        zIndex={zIndexBg}
        blurDataURL={blurDataURL}
      />

      {blurStyle && (
        <motion.div
          className="absolute inset-0 z-[9999] backdrop-blur-md bg-black/60"
          style={backdropStyle}
        />
      )}

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent mix-blend-overlay z-[999]"
        style={flickerStyle}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-100/10 via-white/5 to-transparent mix-blend-overlay z-[999]"
        style={lightStyle}
      />
    </div>
  );
}

const areEqual = (prev: Props, next: Props) => {
  return (
    prev.bgSrc === next.bgSrc &&
    prev.bgAlt === next.bgAlt &&
    prev.bgY === next.bgY &&
    prev.blurY === next.blurY &&
    prev.flickerOpacity === next.flickerOpacity &&
    prev.lightOpacity === next.lightOpacity &&
    prev.lightScale === next.lightScale &&
    prev.lightX === next.lightX &&
    prev.lightY === next.lightY &&
    prev.zIndexBg === next.zIndexBg &&
    prev.blurDataURL === next.blurDataURL &&
    prev.blurStyle === next.blurStyle
  );
};

export default memo(CinematicBackgroundLayer, areEqual);
