"use client";

import { useEffect, useRef, memo, useMemo, useCallback } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useAnimationControls,
  useMotionValue,
} from "framer-motion";
import { useDeviceCapabilitiesStore } from "@/store/DeviceCapabilities";
import { useIdleCallback } from "@/hooks/useIdleCallback";

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private width = 0;
  private height = 0;
  private dpr = window.devicePixelRatio || 1;
  private frameTimestamps: number[] = [];
  private readonly maxSamples = 60;
  private animId: number | null = null;
  private resizeObserver: ResizeObserver;
  private tier: "low" | "medium" | "high";
  private targetCount: number;
  private minCount = 10;

  constructor(
    canvas: HTMLCanvasElement,
    count: number,
    tier: "low" | "medium" | "high"
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas context unavailable");
    this.ctx = ctx;
    this.tier = tier;
    this.targetCount = count;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas.parentElement || document.body);

    this.resize();
    this.animate();
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);

    this.particles = Array.from({ length: this.targetCount }, () =>
      this.createParticle()
    );
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      r: 1.5 + Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      color: `hsla(${Math.random() * 360}, 80%, 70%, 0.5)`,
    };
  }

  private calculateFPS(now: number): number {
    this.frameTimestamps.push(now);
    if (this.frameTimestamps.length > this.maxSamples) {
      this.frameTimestamps.shift();
    }
    const frames = this.frameTimestamps.length;
    const elapsed = this.frameTimestamps[frames - 1] - this.frameTimestamps[0];
    return frames > 1 ? (1000 * (frames - 1)) / elapsed : 60;
  }

  private adjustParticleCount(fps: number) {
    const thresholds = {
      low: { min: 55, max: 60 },
      medium: { min: 50, max: 58 },
      high: { min: 45, max: 55 },
    }[this.tier];

    if (fps < thresholds.min && this.particles.length > this.minCount) {
      const reduceBy = Math.max(1, Math.floor(this.particles.length * 0.1));
      this.particles.length = Math.max(
        this.minCount,
        this.particles.length - reduceBy
      );
    } else if (
      fps > thresholds.max &&
      this.particles.length < this.targetCount
    ) {
      const add = Math.min(10, this.targetCount - this.particles.length);
      this.particles.push(
        ...Array.from({ length: add }, () => this.createParticle())
      );
    }
  }

  private animate = (now: number = performance.now()) => {
    const { ctx, width, height } = this;
    ctx.clearRect(0, 0, width, height);

    for (const p of this.particles) {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();
    }

    const fps = this.calculateFPS(now);
    this.adjustParticleCount(fps);

    this.animId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.resizeObserver.disconnect();
  }
}

const AmbientParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);
  const controls = useAnimationControls();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tier = useDeviceCapabilitiesStore(
    (s) => s.capabilities?.tier || "medium"
  );
  const getOptimalParticleCount = useDeviceCapabilitiesStore(
    (s) => s.getOptimalParticleCount
  );
  const count = useMemo(
    () => getOptimalParticleCount(120),
    [getOptimalParticleCount]
  );

  const idleCallbackHandler = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    engineRef.current = new ParticleEngine(canvas, count, tier);

    controls.start({
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    });

    return () => engineRef.current?.destroy();
  }, [count, tier, controls]);

  useIdleCallback(idleCallbackHandler, { timeout: 1500 });

  useEffect(() => {
    let raf: number | null = null;
    const onMouse = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set((e.clientX / window.innerWidth - 0.5) * 15);
        y.set((e.clientY / window.innerHeight - 0.5) * 15);
      });
    };
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [x, y]);

  return (
    <LazyMotion features={domAnimation}>
      <m.canvas
        ref={canvasRef}
        initial={{ opacity: 0 }}
        animate={controls}
        className="fixed inset-0 z-10 pointer-events-none mix-blend-screen"
        aria-hidden="true"
        style={{
          x,
          y,
          filter: "drop-shadow(0 0 8px rgba(255,255,0,0.6))",
          willChange: "transform, opacity",
          contain: "strict",
          transform: "translateZ(0)",
        }}
      />
    </LazyMotion>
  );
};

export default memo(AmbientParticles);
