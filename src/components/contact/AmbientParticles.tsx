"use client";

import { useEffect, useRef, memo, useMemo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useAnimationControls,
  useMotionValue,
} from "framer-motion";
import { useDeviceCapabilitiesStore } from "@/store/DeviceCapabilities";

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
  private dpr: number;
  private width = 0;
  private height = 0;
  private animId: number | null = null;
  private resizeObserver: ResizeObserver;
  private targetParticleCount: number;
  private frameTimes: number[] = [];
  private readonly maxFrameSamples = 30;
  private tier: "low" | "medium" | "high";

  constructor(
    canvas: HTMLCanvasElement,
    initialParticleCount: number,
    tier: "low" | "medium" | "high"
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: true });
    if (!ctx) throw new Error("Canvas context unavailable");
    this.ctx = ctx;

    this.dpr = window.devicePixelRatio || 1;
    this.targetParticleCount = initialParticleCount;
    this.tier = tier;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.canvas.parentElement || document.body);

    this.resize();
    this.animate();
  }

  private createParticle(): Particle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      r: 1.5 + Math.random() * 1.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: `hsla(${Math.random() * 360}, 80%, 70%, 0.5)`,
    };
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

    this.particles = Array.from({ length: this.targetParticleCount }, () =>
      this.createParticle()
    );
  }

  private adjustParticlesBasedOnFPS(averageFPS: number) {
    const optimal = this.targetParticleCount;
    const tier = this.tier;

    let minFPS = 50;
    let maxFPS = 58;
    if (tier === "low") {
      minFPS = 55;
      maxFPS = 60;
    } else if (tier === "medium") {
      minFPS = 50;
      maxFPS = 58;
    } else {
      minFPS = 45;
      maxFPS = 55;
    }

    if (averageFPS < minFPS && this.particles.length > 10) {
      this.particles.length = Math.max(
        10,
        Math.floor(this.particles.length * 0.8)
      );
    } else if (averageFPS > maxFPS && this.particles.length < optimal) {
      this.particles.push(
        ...Array.from({ length: 5 }, () => this.createParticle())
      );
    }
  }

  private animate = (timestamp?: number) => {
    const { ctx, width, height, particles } = this;
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
    }

    const now = typeof timestamp === "number" ? timestamp : performance.now();
    if (this.frameTimes.length > 0) {
      const delta = now - this.frameTimes[this.frameTimes.length - 1];
      const fps = 1000 / delta;
      if (
        process.env.NODE_ENV !== "production" &&
        this.frameTimes.length % 60 === 0
      ) {
        console.debug(
          `[Particles] Frame: ${
            this.frameTimes.length
          }, Timestamp: ${now.toFixed(2)}, FPS: ${fps.toFixed(2)}`
        );
      }
      this.frameTimes.push(now);

      if (this.frameTimes.length > this.maxFrameSamples) {
        this.frameTimes.shift();
        const avgFPS =
          1000 /
          ((this.frameTimes[this.frameTimes.length - 1] - this.frameTimes[0]) /
            this.frameTimes.length);
        this.adjustParticlesBasedOnFPS(avgFPS);
      }
    } else {
      this.frameTimes.push(now);
    }

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
  const optimalParticleCount = useMemo(() => {
    return getOptimalParticleCount(120); 
  }, [getOptimalParticleCount, tier]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    engineRef.current = new ParticleEngine(canvas, optimalParticleCount, tier);

    controls.start({
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    });

    return () => {
      engineRef.current?.destroy();
    };
  }, [controls, optimalParticleCount, tier]);

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        x.set((e.clientX / window.innerWidth - 0.5) * 15);
        y.set((e.clientY / window.innerHeight - 0.5) * 15);
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
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
