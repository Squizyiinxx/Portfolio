"use client";

import { memo, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  type Variants,
} from "framer-motion";
import Icon from "@/app/assets/icon/Icon";
import { socialMedia } from "@/constants/social-media";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

function SocialMedia() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        className="flex flex-wrap justify-center gap-6 pt-4"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        style={{ willChange: "opacity, transform" }}
        aria-label="Social media links"
      >
        {socialMedia.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="relative group bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-colors duration-300"
          >
            <Icon
              name={item.icon}
              className="w-6 h-6 text-white group-hover:text-amber-300 transition-transform duration-300 group-hover:scale-110"
            />
          </a>
        ))}
      </m.div>
    </LazyMotion>
  );
}

export default memo(SocialMedia);
