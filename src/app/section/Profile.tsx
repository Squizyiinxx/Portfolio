"use client";

import { memo, Suspense, useMemo } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import dynamic from "next/dynamic";

const ProfileText = dynamic(() =>import("@/components/profile/ProfileComponents").then((mod) => mod.ProfileText),
{ssr: false});

const ProfileImage = dynamic(() =>import("@/components/profile/ProfileComponents").then((mod) => mod.ProfileImage),
{ssr: false});

const SectionContainer = memo(function SectionContainer({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"section"> & { className?: string }) {
  const motionProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 40 },
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
      className={`w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between py-20 items-center optimizing-transition ${className}`}
      {...props}
    >
      {children}
    </motion.section>
  );
});

function ProfileSection() {
  return (
    <SectionContainer className="px-4 min-h-[100dvh]">
      <motion.div layout className="flex flex-col gap-8 max-w-xl">
        <Suspense
          fallback={
            <div className="h-32 animate-pulse bg-slate-800 rounded-2xl" />
          }
        >
          <ProfileText />
        </Suspense>
      </motion.div>
      <motion.div layout>
        <Suspense
          fallback={
            <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-slate-800 rounded-2xl animate-pulse" />
          }
        >
          <ProfileImage />
        </Suspense>
      </motion.div>
    </SectionContainer>
  );
}

export default memo(ProfileSection);
