"use client";

import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { usePanel } from "@/hooks/usePanel";
import Header from "@/components/Header";
import ButtonNext from "@/components/ButtonNext";
import Panel from "@/components/templates/PanelTransition";
import {
  buttonVariants,
  blurTransition,
  fadeTransition,
} from "@/components/transitions/Variants";
import { useRef } from "react";
import { useIdleCallback, useIntersectionObserver } from "@/hooks";
import { useDeviceCapabilitiesStore } from "@/store/DeviceCapabilities";
import Hero from "./section/Hero";

const ProfileX = dynamic(() => import("@/components/profile/ProfileX"), {
  ssr: false,
});

const ProfileSection = dynamic(() => import("./section/Profile"), {
  ssr: false,
});

const SkillShowcaseSection = dynamic(() => import("./section/SkillShowCase"), {
  ssr: false,
});

const WorkSection = dynamic(() => import("./section/WorkSection"), {
  ssr: false,
});

const ContactSection = dynamic(() => import("./section/ContactSection"), {
  ssr: false,
});

function ContentClient() {
  const { panel, handlers, handleButtonNext } = usePanel();
  const btnNextRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(btnNextRef, {
    threshold: 0.5,
    freezeOnceVisible: true,
    rootMargin: "100px",
  });
  const { capabilities, hasDetected,detectCapabilities } = useDeviceCapabilitiesStore();
  const shouldShowNextBtn =
    !panel.profile && isInView && capabilities.performanceScore >= 30;

  useIdleCallback(() => {
    if (hasDetected) return;
    detectCapabilities();
  });

  const renderPanel = () => {
    if (panel.profile) {
      return (
        <m.div
          key="profile"
          {...blurTransition}
          layout
          className="fixed inset-0 z-[999] flex justify-center items-start overflow-y-auto px-4 py-16 backdrop-blur-md bg-black/60"
        >
          <ProfileX setShowProfile={handlers.closeProfile} />
          <div className="w-full max-w-6xl space-y-24 z-10">
            <ProfileSection />
            <SkillShowcaseSection />
          </div>
        </m.div>
      );
    }
    if (panel.work) {
      return (
        <m.div key="work" {...fadeTransition}>
          <Panel panelKey="work" zIndex={995}>
            <WorkSection onClose={handlers.closeWork} />
          </Panel>
        </m.div>
      );
    }
    if (panel.contact) {
      return (
        <m.div key="contact" {...fadeTransition}>
          <Panel panelKey="contact" zIndex={998}>
            <ContactSection onClose={handlers.closeContact} />
          </Panel>
        </m.div>
      );
    }
    return null;
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.main
        ref={btnNextRef}
        className="relative w-full min-h-screen overflow-hidden bg-neutral-950 text-white"
      >
        {!panel.work && !panel.contact && !panel.profile && (
          <Header
            key="header"
            onShowWork={handlers.showWork}
            onShowContact={handlers.showContact}
          />
        )}

        <AnimatePresence>
          {!panel.work && !panel.contact && (
            <m.div key="hero" {...blurTransition} layout>
              <Hero />
            </m.div>
          )}
          {renderPanel()}
        </AnimatePresence>

        {shouldShowNextBtn && (
          <m.div
            key="next"
            variants={buttonVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 right-30 z-[999]"
          >
            <ButtonNext
              setWorkShow={handleButtonNext}
              showWork={panel.work}
              showContact={panel.contact}
            />
          </m.div>
        )}
      </m.main>
    </LazyMotion>
  );
}

export default ContentClient;
