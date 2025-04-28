"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface HeroTextProps {
  hovered: boolean;
  animationSpeed: number;
}

export default function HeroText({ hovered, animationSpeed }: HeroTextProps) {
  const heroTexts = useMemo(
    () => [
      { text: "FULLSTACK", position: "top-30 left-[30%]", delay: 0 },
      { text: "DEVELOPER", position: "bottom-60 left-[70%]", delay: 0.2 },
    ],
    []
  );

  const textStyle = useMemo(
    () => ({
      textShadow: hovered ? "0 0 10px rgba(255,255,0,0.8)" : "none",
      color: hovered ? "var(--color-primary-300)" : "var(--color-primary-500)",
      transform: "translateZ(0)",
    }),
    [hovered]
  );

  return (
    <>
      {heroTexts.map(({ text, position, delay }, idx) => (
        <motion.h1
          key={text}
          className={`absolute hidden lg:block text-[70px] xl:text-[100px] ${position} transform transition-all duration-500 will-change-transform`}
          style={textStyle}
          initial={{
            opacity: 0,
            x: idx === 0 ? "-30%" : "-70%",
            y: 0,
            z: 0, 
          }}
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? "-50%" : idx === 0 ? "-30%" : "-70%",
            y: 0,
            z: 0,
          }}
          transition={{
            duration: animationSpeed,
            ease: "easeOut",
            delay: delay,
          }}
        >
          {text}
        </motion.h1>
      ))}
    </>
  );
}
