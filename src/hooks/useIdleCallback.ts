import { useEffect, useCallback, useRef } from "react";

export interface IdleOptions {
  timeout?: number;
}
export function useIdleCallback(
  callback: () => void,
  options: IdleOptions = {},
  deps: any[] = []
) {
  const memoCb = useCallback(callback, deps);
  const handleRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let active = true;
    const { timeout } = options;
    const requestIdle =
      window.requestIdleCallback?.bind(window) ??
      ((fn: IdleRequestCallback, _opts?: IdleRequestOptions) =>
        window.setTimeout(fn as unknown as FrameRequestCallback, timeout ?? 2000));
    const cancelIdle =
      window.cancelIdleCallback?.bind(window) ??
      ((id: number) => clearTimeout(id));

    // Jadwalkan idle callback
    handleRef.current = requestIdle(
      (deadline: IdleDeadline) => {
        if (active) memoCb();
      },
      timeout !== undefined ? { timeout } : undefined
    ) as unknown as number;

    // Cleanup: batalkan timer saat unmount
    return () => {
      active = false;
      if (handleRef.current !== null) {
        cancelIdle(handleRef.current);
      }
    };
  }, [memoCb, options.timeout]);
}
