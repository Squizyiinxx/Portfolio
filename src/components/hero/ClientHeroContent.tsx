"use client";

import { Suspense, memo } from "react";
import dynamic from "next/dynamic";
import ContentHero from "./ContentHero";

const HeroHeading = dynamic(() => import("./Heading"), {
  ssr: false,
});

const HeroInteractive = dynamic(() => import("./HeroInteractive"), {
  ssr: true,
});

const ClientHeroContent = memo(function ClientHeroContent() {
  return (
    <>
      <Suspense
        fallback={<div className="h-32 w-full bg-neutral-800/10 rounded-lg" />}
      >
        <HeroHeading />
      </Suspense>

      <Suspense
        fallback={<div className="h-48 w-full bg-neutral-800/10 rounded-lg" />}
      >
        <HeroInteractive />
      </Suspense>
      <ContentHero />
    </>
  );
});

export default ClientHeroContent;
