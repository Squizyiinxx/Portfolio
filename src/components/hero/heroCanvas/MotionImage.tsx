import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { forwardRef, memo } from "react";

// Menggunakan memo untuk mencegah re-render yang tidak perlu
const CustomImage = memo(
  forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
    <Image
      {...props}
      ref={ref}
      alt={props.alt || "Character"}
      fetchPriority={props.fetchPriority || "high"}
      decoding={props.decoding || "async"}
    />
  ))
);

CustomImage.displayName = "CustomImage";

// Komponen ini melakukan transformasi melalui Framer motion dengan optimasi GPU
const MotionImage = motion.create(CustomImage);
export default MotionImage;
