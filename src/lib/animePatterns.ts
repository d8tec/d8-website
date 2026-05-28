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
// Phase 1 (SHUFFLE_DURATION ms): all characters cycle simultaneously through
//   random uppercase noise — no letter settles early.
// Phase 2 (~1800 ms): characters lock into their correct value strictly
//   left-to-right, one at a time; remaining chars keep shuffling until their turn.

export function useAnimeScramble() {
  const ref = useRef<HTMLSpanElement>(null);
  const shuffleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const resolveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shuffleTimer.current) clearInterval(shuffleTimer.current);
      if (resolveTimer.current) clearTimeout(resolveTimer.current);
    };
  }, []);

  function trigger() {
    if (!ref.current) return;
    const el = ref.current;
    const original = el.textContent ?? "";
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const SHUFFLE_DURATION = 2000; // ms — all chars scramble before any resolve
    const FRAME_MS = 45;           // redraw interval during shuffle

    const isLetter = original.split("").map(c => /[A-Za-z]/.test(c));
    const letterCount = isLetter.filter(Boolean).length;
    let lockedCount = 0;

    if (shuffleTimer.current) clearInterval(shuffleTimer.current);
    if (resolveTimer.current) clearTimeout(resolveTimer.current);

    // Phase 1: all letters cycle randomly
    shuffleTimer.current = setInterval(() => {
      el.textContent = original
        .split("")
        .map((char, i) => {
          if (i < lockedCount) return char;
          if (!isLetter[i]) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
    }, FRAME_MS);

    // Phase 2: lock characters left-to-right
    resolveTimer.current = setTimeout(() => {
      const stepMs = Math.max(40, 900 / letterCount);

      const resolveStep = () => {
        // advance past non-letter chars (spaces, punctuation)
        while (lockedCount < original.length && !isLetter[lockedCount]) {
          lockedCount++;
        }
        lockedCount++;

        if (lockedCount >= original.length) {
          if (shuffleTimer.current) clearInterval(shuffleTimer.current);
          el.textContent = original;
          return;
        }
        resolveTimer.current = setTimeout(resolveStep, stepMs);
      };

      resolveStep();
    }, SHUFFLE_DURATION);
  }

  return { ref, trigger };
}
