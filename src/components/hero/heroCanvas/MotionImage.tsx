import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { forwardRef, memo } from "react";

const CustomImage = memo(
  forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
    <Image
      {...props}
      ref={ref}
      alt="character-hero"
    />
  ))
);

CustomImage.displayName = "CustomImage";

const MotionImage = motion.create(CustomImage);
export default MotionImage;
