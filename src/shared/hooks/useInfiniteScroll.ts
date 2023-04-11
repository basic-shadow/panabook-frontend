import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (callback: () => void) => {
  const observerElem = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target && target.isIntersecting) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const element = observerElem?.current;
    if (element === null) return;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [callback, handleObserver]);

  return observerElem;
};
