import { useEffect, useRef } from "react";

// ─── 1. Badge dot heartbeat ───────────────────────────────────────────────────
// Looping scale + opacity pulse on the purple badge dot in Hero.
// Dynamic import keeps animejs out of the SSR bundle.

export function useHeartbeatDot() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    let instance: { pause: () => void } | null = null;

    import("animejs").then(({ animate }) => {
      if (!ref.current) return;
      instance = animate(ref.current, {
        scale: [1, 1.5, 1],
        opacity: [1, 0.4, 1],
        duration: 1500,
        ease: "inOutSine",
        loop: true,
      });
    });

    return () => {
      instance?.pause();
    };
  }, []);

  return ref;
}

// ─── 2. Badge text scramble ───────────────────────────────────────────────────
// One-shot scramble on badge text triggered when its entrance animation ends.
// Scrambles current text content through uppercase noise then resolves to original.

export function useAnimeScramble() {
  const ref = useRef<HTMLSpanElement>(null);

  function trigger() {
    if (!ref.current) return;
    import("animejs").then(({ animate, scrambleText }) => {
      if (!ref.current) return;
      animate(ref.current, {
        innerHTML: scrambleText({ chars: "uppercase", ease: "outExpo" }),
        duration: 2500,
      });
    });
  }

  return { ref, trigger };
}
