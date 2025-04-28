import { MotionStyle, MotionValue } from "framer-motion";

interface IconProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

interface ItemProjects {
  id: number;
  title: string;
  description: string;
  stack: string[];
  image: string;
  link: string | null;
}

interface LayerProps {
  scale?: MotionValue<number>;
  opacity?: MotionValue<number>;
  cloudX?: MotionValue<number>;
  springY?: MotionValue<number>;
  springX?: MotionValue<number>;
  lightX?: MotionValue<number>;
  lightY?: MotionValue<number>;
  flicker?: MotionValue<number>;
}

interface CinematicImageProps {
  src: string;
  alt: string;
  style?: React.CSSProperties | MotionStyle;
  className?: string;
  zIndex?: number;
  priority?: boolean;
}


interface HeaderProps {
  onShowWork: () => void;
  onShowContact: () => void;
}
export type { IconProps, ItemProjects, LayerProps, CinematicImageProps,HeaderProps };
