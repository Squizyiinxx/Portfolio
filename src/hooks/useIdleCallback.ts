import { useEffect } from "react";

export function useIdleCallback(callback: () => void, timeout = 2000) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;
    const idleCallback =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, timeout);

    const id = idleCallback(() => mounted && callback());

    return () => {
      mounted = false;
      if ("cancelIdleCallback" in window && typeof id === "number") {
        window.cancelIdleCallback(id as number);
      } else {
        clearTimeout(id as ReturnType<typeof setTimeout>);
      }
    };
  }, [callback, timeout]);
}