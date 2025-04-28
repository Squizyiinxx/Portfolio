"use client";

import React, { memo, useEffect, useState } from "react";

const Heading = memo(function Heading() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const prefersMotion = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;

    const enableAnimationWithDelay = () => {
      if (prefersMotion) {
        setTimeout(() => {
          setShouldAnimate(true);
        }, 300); // Delay 300ms agar tidak bentrok dengan LCP atau main-thread tasks
      }
    };

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      enableAnimationWithDelay();
    } else {
      document.addEventListener("DOMContentLoaded", enableAnimationWithDelay);
      return () =>
        document.removeEventListener(
          "DOMContentLoaded",
          enableAnimationWithDelay
        );
    }
  }, []);

  return (
    <h1
      className={`text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight leading-tight text-primary-300 mb-4 lg:hidden ${
        shouldAnimate
          ? "animate-pulse text-shadow-[0_0_10px_rgba(255,255,0,0.8)]"
          : ""
      }`}
    >
      FULLSTACK DEVELOPER
    </h1>
  );
});

Heading.displayName = "Heading";

export default Heading;
