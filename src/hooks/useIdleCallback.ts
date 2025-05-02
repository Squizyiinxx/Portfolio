import { useEffect, useRef, DependencyList } from "react";

export interface IdleOptions {
  timeout?: number;
}

export function useIdleCallback(
  callback: () => void,
  options: IdleOptions = {},
  deps: DependencyList = []
) {
  const handleRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let active = true;

    const requestIdle: (
      cb: IdleRequestCallback,
      opts?: IdleRequestOptions
    ) => number =
      window.requestIdleCallback?.bind(window) ??
      ((fn: IdleRequestCallback, opts?: IdleRequestOptions) => {
        const effectiveTimeout = opts?.timeout ?? options.timeout ?? 2000;
        return window.setTimeout(
          fn as unknown as FrameRequestCallback,
          effectiveTimeout
        );
      });

    const cancelIdle: (id: number) => void =
      window.cancelIdleCallback?.bind(window) ?? clearTimeout;

    handleRef.current = requestIdle(
      () => {
        if (active) callback();
      },
      { timeout: options.timeout }
    );

    return () => {
      active = false;
      if (handleRef.current !== null) {
        cancelIdle(handleRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, options.timeout, ...deps]);
}
