import { useState, useEffect, useRef } from "react";

/**
 * Animates a numeric value from 0 up to `target` over `duration` ms using
 * an easeOutQuart curve.  Replays automatically whenever `target` changes.
 *
 * @param target   The final value to count up to.
 * @param duration Animation length in milliseconds (default 800 — fast enough
 *                 to feel snappy on mount but slow enough to be readable).
 * @returns        The current animated integer value.
 */
export function useCountUp(target: number, duration = 800): number {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart: decelerates quickly for a snappy feel
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}
