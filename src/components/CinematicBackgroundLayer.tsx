// src/components/CinematicBackgroundLayerComponent.tsx
"use client";

import { motion, MotionValue, useTransform, MotionStyle } from "framer-motion";
import CinematicImageLayer from "./CinematicImageLayer";
import { memo, useMemo } from "react";

interface Props {
  bgSrc: string;
  bgAlt: string;
  bgY: MotionValue<number>;
  blurY: MotionValue<number>;
  flickerOpacity: MotionValue<number>;
  lightOpacity: MotionValue<number>;
  lightScale: MotionValue<number>;
  lightX: MotionValue<number>;
  lightY: MotionValue<number>;
  zIndexBg?: number;
  blurDataURL?: string;
  zIndexCloud?: number;
  blurStyle?: string;
}

function CinematicBackgroundLayerComponent({
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
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-md z-[9999]"
        style={backdropStyle}
      />
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

function arePropsEqual(prev: Props, next: Props) {
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
    prev.zIndexCloud === next.zIndexCloud
  );
}

export default memo(CinematicBackgroundLayerComponent, arePropsEqual);
