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

function CinematicImageLayerComponent({
  src,
  alt,
  style,
  className = "",
  blurDataURL,
  zIndex = 0,
}: CinematicImageProps) {
  const combinedStyle = useMemo<MotionStyle>(
    () => ({
      ...style,
      zIndex,
    }),
    [style, zIndex]
  );

  return (
    <motion.div
      style={combinedStyle}
      className={`absolute inset-0 w-[120%] h-[120%] -translate-x-1/12 -translate-y-1/12 pointer-events-none ${className}`}
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
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </motion.div>
  );
}

function arePropsEqual(prev: CinematicImageProps, next: CinematicImageProps) {
  return (
    prev.src === next.src &&
    prev.alt === next.alt &&
    prev.blurDataURL === next.blurDataURL &&
    prev.className === next.className &&
    prev.zIndex === next.zIndex &&
    JSON.stringify(prev.style) === JSON.stringify(next.style)
  );
}

export default memo(CinematicImageLayerComponent, arePropsEqual);
