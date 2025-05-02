"use client";

import { motion, MotionStyle } from "framer-motion";
import Image from "next/image";
import { memo, useMemo } from "react";

export interface CinematicImageProps {
  src: string;
  alt: string;
  style?: MotionStyle;
  className?: string;
  zIndex?: number;
  blurDataURL?: string;
}

function CinematicImageLayer({
  src,
  alt,
  style,
  className = "",
  blurDataURL,
  zIndex = 0,
}: CinematicImageProps) {
  const combinedStyle = useMemo<MotionStyle>(
    () => ({ ...style, zIndex }),
    [style, zIndex]
  );

  return (
    <motion.div
      className={`absolute inset-0 w-[120%] h-[120%] -translate-x-1/12 -translate-y-1/12 pointer-events-none ${className}`}
      style={combinedStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        loading="eager"
        sizes="100vw"
        className="object-cover object-center select-none"
        draggable={false}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
      />
    </motion.div>
  );
}

function arePropsEqual(prev: CinematicImageProps, next: CinematicImageProps) {
  return (
    prev.src === next.src &&
    prev.alt === next.alt &&
    prev.className === next.className &&
    prev.zIndex === next.zIndex &&
    prev.blurDataURL === next.blurDataURL &&
    shallowEqualMotionStyle(prev.style, next.style)
  );
}

function shallowEqualMotionStyle(a?: MotionStyle, b?: MotionStyle): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(
    (key) => a[key as keyof MotionStyle] === b[key as keyof MotionStyle]
  );
}

export default memo(CinematicImageLayer, arePropsEqual);
