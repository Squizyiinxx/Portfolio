"use client";

import { useState, useEffect, useMemo } from "react";

export default function useIntersectionObserver(
  elementRef: React.RefObject<HTMLElement | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    freezeOnceVisible = false,
  } = {}
) {
  const [isInView, setIsInView] = useState(false);

  const obsOptions = useMemo(
    () => ({ threshold, root, rootMargin }),
    [threshold, root, rootMargin]
  );

  useEffect(() => {
    const node = elementRef?.current;
    if (!node || typeof IntersectionObserver !== "function") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      const isVisible = entry?.isIntersecting;

      if (isVisible) {
        setIsInView(true);
        if (freezeOnceVisible) {
          observer.disconnect();
        }
      } else {
        if (!freezeOnceVisible) {
          setIsInView(false);
        }
      }
    }, obsOptions);

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, obsOptions, freezeOnceVisible]);

  return isInView;
}
