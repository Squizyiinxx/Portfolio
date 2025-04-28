// SkillShowcaseSection.tsx

"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { memo, useEffect, useRef, useState, useMemo, Suspense } from "react";
import { skills } from "@/constants/skills";
import { useInView } from "react-intersection-observer";
import { useParallaxTilt } from "@/hooks/useParallaxTilt";
import dynamic from "next/dynamic";
import LoadingSpinner from "../../components/LoadingSpinner";

const AnimatedSkill = dynamic(
  () => import("../../components/skillShowCase/SkillComponent").then((m) => ({ default: m.AnimatedSkill })),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const SkillGridItem = dynamic(
  () => import("../../components/skillShowCase/SkillComponent").then((m) => ({ default: m.SkillGridItem })),
  {
    ssr: false,
    loading: () => (
      <div className="h-32 w-full animate-pulse bg-slate-800 rounded-2xl" />
    ),
  }
);

const SectionContainer = memo(function SectionContainer({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"section"> & { className?: string }) {
  const motionProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 50 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 1 },
      layout: true,
    }),
    []
  );

  return (
    <motion.section
      {...motionProps}
      className={`w-full max-w-6xl mx-auto flex flex-col items-center text-center px-6 py-24 rounded-3xl shadow-2xl ${className}`}
      style={{ transform: "translate3d(0,0,0)", willChange: "transform" }}
      {...props}
    >
      {children}
    </motion.section>
  );
});

function SkillShowcaseSection() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const { rotateX, rotateY, handleMouseMove } = useParallaxTilt();

  const headingMotionProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2 },
      layout: true,
    }),
    []
  );

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (inView) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % skills.length);
      }, 2200);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [inView]);

  return (
    <SectionContainer ref={ref} aria-label="Skill Showcase Section">
      <motion.h2
        {...headingMotionProps}
        className="text-4xl font-semibold drop-shadow-[0_0_10px_rgba(255,255,0,0.8)] text-primary-300 mb-10 leading-6 tracking-wide"
      >
        Skill Showcase
      </motion.h2>

      <Suspense fallback={<LoadingSpinner />}>
        <motion.div
          layout
          className="relative w-full max-w-xl h-64 rounded-2xl bg-primary-300 overflow-hidden shadow-lg cursor-pointer before:content-[''] before:w-[350px] before:h-[350px] before:absolute before:-top-10 before:-left-20 before:bg-[url('/house.webp')] before:bg-cover before:bg-no-repeat bg-origin-content"
          onMouseMove={handleMouseMove}
          style={{
            rotateX,
            rotateY,
            transform: "translate3d(0,0,0)",
            willChange: "transform",
          }}
        >
          {skills.map((skill, i) => (
            <AnimatedSkill
              key={skill.name}
              skill={skill}
              active={index === i}
            />
          ))}
        </motion.div>
      </Suspense>

      <Suspense fallback={<div className="h-32 w-full animate-pulse" />}>
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-12 w-full justify-center"
        >
          {skills.map((skill) => (
            <SkillGridItem key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </Suspense>
    </SectionContainer>
  );
}

export default memo(SkillShowcaseSection);
