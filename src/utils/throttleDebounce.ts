type Options = { leading?: boolean; trailing?: boolean };

export function throttle<
  T extends (...args: Args) => R,
  Args extends unknown[] = unknown[],
  R = unknown
>(func: T, wait = 16, options: Options = {}): (...args: Args) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let previous = 0;

  return function throttled(...args: Args): void {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;

    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func(...args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(() => {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        func(...args);
      }, remaining);
    }
  };
}

