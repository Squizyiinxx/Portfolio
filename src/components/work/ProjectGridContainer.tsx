"use client";

import { useRef, useCallback, memo, useEffect, useMemo, useState } from "react";
import { m } from "framer-motion";
import { projects } from "@/constants/projects";
import OptimizedProjectCard from "./ProjectCard";
import {
  useDeviceCapabilities,
  useIntersectionObserver,
  useCleanup,
} from "@/hooks";

const ProjectGridContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeCardId = useRef<string | null>(null);
  const rafId = useRef<number | null>(null);
  const lastMoveTime = useRef<number>(0);

  const { tier = "medium" } = useDeviceCapabilities();
  const [visibleItems, setVisibleItems] = useState<number>(12);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const inView = useIntersectionObserver(loadMoreRef, {
    threshold: 0.1,
    freezeOnceVisible: false,
  });

  const config = useMemo(
    () => ({
      enableTilt: tier !== "low",
      tiltIntensity: tier === "high" ? 1 : 0.6,
      animationDuration: tier === "low" ? 0.3 : 0.5,
      batchSize: tier === "high" ? 12 : tier === "medium" ? 9 : 6,
    }),
    [tier]
  );

  useEffect(() => {
    if (inView && visibleItems < projects.length) {
      setVisibleItems((prev) =>
        Math.min(prev + config.batchSize, projects.length)
      );
    }
  }, [inView, visibleItems, config.batchSize]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !config.enableTilt) return;

      const now = performance.now();
      if (now - lastMoveTime.current < 16) return;
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const card = target.closest(".project-card") as HTMLElement;
        if (!card) {
          rafId.current = null;
          return;
        }

        const cardId = card.dataset.id;
        if (!cardId) {
          rafId.current = null;
          return;
        }

        if (activeCardId.current && activeCardId.current !== cardId) {
          const prevCard = containerRef.current?.querySelector(
            `[data-id="${activeCardId.current}"]`
          );
          prevCard?.dispatchEvent(new CustomEvent("cardTiltReset"));
        }

        activeCardId.current = cardId;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        card.dispatchEvent(
          new CustomEvent("cardTilt", {
            detail: { mouseX, mouseY },
          })
        );

        lastMoveTime.current = performance.now();
        rafId.current = null;
      });
    },
    [config.enableTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current || !activeCardId.current) return;

    const card = containerRef.current.querySelector(
      `[data-id="${activeCardId.current}"]`
    );
    card?.dispatchEvent(new CustomEvent("cardTiltReset"));
    activeCardId.current = null;
  }, []);

  useCleanup({
    motionValues: [],
    onCustomCleanup: () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      activeCardId.current = null;
    },
  });

  return (
    <>
      <m.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 pb-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {projects.slice(0, visibleItems).map((project) => (
          <OptimizedProjectCard
            key={project.id}
            item={project}
            config={config}
          />
        ))}
      </m.div>
      {visibleItems < projects.length && (
        <div ref={loadMoreRef} className="h-10 w-full" />
      )}
    </>
  );
};

export default memo(ProjectGridContainer);
