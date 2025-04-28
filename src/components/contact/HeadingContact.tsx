"use client";

import React, { memo, useEffect, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import {
  containerVariants,
  paragraphVariants,
} from "../transitions/Variants";

const HeadingContact: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, {
    threshold: 0.5,
    freezeOnceVisible: true,
  });

  const shadowIntensity = useMotionValue(0);
  const springShadow = useSpring(shadowIntensity, {
    stiffness: 80,
    damping: 15,
  });
  const textShadow = useTransform(
    springShadow,
    (v) => `0 0 ${v}px rgba(255,255,0,${Math.min(v / 8, 0.8)})`
  );

  useEffect(() => {
    let animation: ReturnType<typeof animate> | undefined;

    if (isInView) {
      controls.start("visible");

      animation = animate(shadowIntensity, [0, 8, 0], {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      });
    } else {
      controls.start("hidden");
      animation?.stop();
    }

    return () => {
      animation?.stop();
    };
  }, [isInView, controls, shadowIntensity]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={ref}
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        style={{
          willChange: "opacity, transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        <m.h2
          className="text-5xl font-bold text-primary-300 mb-4"
          variants={paragraphVariants}
          initial="hidden"
          animate={controls}
          style={{
            textShadow,
            willChange: "text-shadow, opacity",
          }}
        >
          Get In Touch
        </m.h2>

        <m.p
          className="text-lg text-primary-300"
          variants={paragraphVariants}
          initial="hidden"
          animate={controls}
        >
          Let&apos;s create something magical together. Feel free to reach out.
        </m.p>
      </m.div>
    </LazyMotion>
  );
};

export default memo(HeadingContact);
