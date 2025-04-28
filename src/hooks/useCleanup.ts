/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";

type CleanupOptions = {
  motionValues?: any[];
  animationFrames?: number[];
  timeouts?: number[];
  intervals?: number[];
  eventListeners?: {
    target: EventTarget;
    type: string;
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
  }[];
  onCustomCleanup?: () => void;
};

export const useCleanup = (options: CleanupOptions = {}) => {
  useEffect(() => {
    return () => {
      options.motionValues?.forEach((mv) => mv?.destroy?.());
      options.animationFrames?.forEach((frameId) =>
        cancelAnimationFrame(frameId)
      );
      options.timeouts?.forEach((timeoutId) => clearTimeout(timeoutId));
      options.intervals?.forEach((intervalId) => clearInterval(intervalId));
      options.eventListeners?.forEach(({ target, type, listener, options }) => {
        target?.removeEventListener(type, listener, options);
      });
      options.onCustomCleanup?.();
    };
  }, [options]);
};
