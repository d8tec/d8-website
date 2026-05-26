import { type Variants, useScroll, useTransform, useMotionValue } from "framer-motion";
import type { RefObject } from "react";

// D8 timing conventions
const D8_EASE = [0.16, 1, 0.3, 1] as const;
const D8_EASE_SNAP = [0.85, 0, 0, 1] as const;

// ─── 1. Sticky scroll-sequenced floating cards ───────────────────────────────
// Source: sticky awards stage (accenture.com) — cards pinned in 100svh stage
// while scroll content passes beneath; each card offset at different y depths.
// Requires: outer container position:relative + tall height; inner stage
// position:sticky top:0 height:100svh; use useStickyScrollCards for y values.

export const floatingCardEntrance: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: D8_EASE },
  },
};

export const floatingCardContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/** Maps scroll progress to y-parallax offsets for 3 staggered floating cards. */
export function useStickyScrollCards(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [80, 20]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [160, 60]);
  return [card1Y, card2Y, card3Y] as const;
}

// ─── 2. Text tilt-and-rotate entrance reveal ─────────────────────────────────
// Source: .animate .tilt / .notilt (accenture.com) — words fall into place
// from translateY(100%) rotate(15deg) → 0 / 0.
// Usage: wrap parent in textTiltContainer, each word span in textTiltWord.
// Set overflow:hidden on the parent line to clip the initial position.

export const textTiltContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const textTiltWord: Variants = {
  hidden: { y: "105%", rotate: 12, opacity: 0 },
  visible: {
    y: "0%",
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.5, 0, 0.35, 1] },
  },
};

// ─── 3. From-right entrance slide ────────────────────────────────────────────
// Source: @keyframes from-right (accenture.com) — viewport-relative offset
// so the slide distance scales with screen width, never feels too far/close.

export const fromRight: Variants = {
  hidden: { x: "8vw", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: D8_EASE },
  },
};

export const fromRightStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// ─── 4. CTA arrow double-icon slide ──────────────────────────────────────────
// Source: .rad-button--tertiary-dynamic (accenture.com) — icon pair starts at
// translateX(-200%), slides to 0 on hover; creates illusion of arrow arriving.
// Usage: wrap icon container with animate={isHovered ? "hover" : "rest"}.

export const ctaIconSlide: Variants = {
  rest: { x: "-200%", transition: { duration: 0.55, ease: D8_EASE_SNAP } },
  hover: { x: "0%", transition: { duration: 0.55, ease: D8_EASE_SNAP } },
};

// ─── 5. Button arrow nudge ───────────────────────────────────────────────────
// Source: .rad-button--tertiary:hover .icon-right (accenture.com).
// Usage: wrap arrow icon with animate={isHovered ? "hover" : "rest"}.

export const arrowNudge: Variants = {
  rest: { x: 0, transition: { duration: 0.55, ease: D8_EASE_SNAP } },
  hover: { x: 6, transition: { duration: 0.55, ease: D8_EASE_SNAP } },
};

// ─── 6. Logo symbol morph ────────────────────────────────────────────────────
// Source: .cmp-logo:hover (accenture.com) — symbol shrinks+shifts, text slides up.
// Adapt to D8: the ">" glyph scales down and shifts right; "D8" wordmark
// slides in from below. Use on a motion.div with whileHover="hover".

export const logoSymbol: Variants = {
  rest: { scale: 1, x: 0, transition: { duration: 0.55, ease: D8_EASE_SNAP } },
  hover: { scale: 0.5, x: 14, transition: { duration: 0.55, ease: D8_EASE_SNAP } },
};

export const logoWordmark: Variants = {
  rest: { y: 8, opacity: 0, transition: { duration: 0.55, ease: D8_EASE_SNAP } },
  hover: { y: 0, opacity: 1, transition: { duration: 0.55, ease: D8_EASE_SNAP } },
};

// ─── 7. Scroll-linked background glow drift ──────────────────────────────────
// Source: .rad-awards-card__motion-bg (accenture.com) — background element
// moves 1:1 with scroll progress. Adapted for D8's purple glow layer.
// Usage: apply returned y/opacity as style props on the glow motion.div.

export function useScrollLinkedBg(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.4, 1, 1, 0.4]
  );
  return { y, opacity };
}

// ─── 8. Diagonal clip-path wipe button fill ──────────────────────────────────
// Source: .btn-caps-stripe-primary::after (motion.dev) — a positioned overlay
// starts as a diagonal slice off-screen left, sweeps across on hover.
// Usage: place a motion.div as absolute inset-0 child inside the button.
// Set animate={hovered ? "hover" : "rest"} on it; set z-index below text.

export const clipPathWipe: Variants = {
  rest: {
    clipPath: "polygon(-1% 0%, -1% 0%, -100% 100%, -1% 100%)",
    transition: { duration: 0.4, ease: [0.25, 0, 0, 1] },
  },
  hover: {
    clipPath: "polygon(0% 0%, 200% 0%, 100% 100%, 0% 100%)",
    transition: { duration: 0.4, ease: [0.25, 0, 0, 1] },
  },
};

// ─── 9. Horizontal clip-path sweep reveal ────────────────────────────────────
// Source: @keyframes docs-console-sweep (motion.dev) — content hidden by
// inset(0 100% 0 0) is revealed by sweeping the right inset to 0.
// Usage: whileInView="visible" viewport={{ once: true }} on text, lines, borders.

export const sweepReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.7, ease: D8_EASE },
  },
};

export const sweepRevealStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

// ─── 10. Slide-up entrance (minimal) ─────────────────────────────────────────
// Source: @keyframes slide-up (motion.dev) — 8px lift + opacity, no scale.
// Lighter than floatingCardEntrance (y:40, scale:0.96). Use for body copy,
// secondary labels, and any element that should feel placed, not flown in.

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: D8_EASE },
  },
};

export const slideUpStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// ─── 11. Decorative ambient loop (translate-rotate-scale) ────────────────────
// Source: @keyframes home-diag-translate (motion.dev) — tile drifts right,
// rotates, scales up, holds, then returns. Keyframe times create breathing
// pauses. Use animate="animate" directly (no hidden/visible states needed).

export const decorativeLoop: Variants = {
  animate: {
    x: [0, 120, 120, 120, 0],
    rotate: [0, 15, 15, 15, 0],
    scale: [1, 1, 1.75, 1, 1],
    transition: {
      duration: 3.6,
      ease: [0.6, 0, 0.2, 1],
      times: [0, 0.34, 0.54, 0.64, 1],
      repeat: Infinity,
    },
  },
};

// ─── 12. Scale-X bar fill ────────────────────────────────────────────────────
// Source: .home-diag-bar-fill (motion.dev) — scaleX(0)→scaleX(1) with left
// transform origin. Use style={{ originX: 0 }} on the motion element.
// Suits stat bars, capability meters, progress indicators.

export const barFill: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.4, 0, 0.4, 1] },
  },
};

// ─── 13. Conic spinning gradient border ──────────────────────────────────────
// Source: .btn-outlined-spin::after (pomelo.la) — conic-gradient(from var(--angle))
// rotates continuously. Adapted: rotate the overlay div instead of CSS --angle.
// Usage: animate="animate" on a motion.div with conic-gradient background,
// absolute inset-0, mask cutting interior so only border ring shows.

export const conicSpinBorder: Variants = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// ─── 14. Mouse-tracked radial glow border ────────────────────────────────────
// Source: .card--border-glow::after (pomelo.la) — radial-gradient follows cursor
// via --glow-x/--glow-y CSS vars. Returns motion values + handler to spread onto
// the card element. Apply glowX/glowY as CSS vars via style={{ '--glow-x': glowX }}.

export function useMouseGlowBorder() {
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowOpacity = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(((e.clientX - rect.left) / rect.width) * 100);
    glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    glowOpacity.set(0);
  }

  return { glowX, glowY, glowOpacity, handleMouseMove, handleMouseLeave };
}

// ─── 15. Split-line hero text entrance ───────────────────────────────────────
// Source: .hero-split-line + GSAP (pomelo.la) — per-LINE stagger, no rotation.
// Different from textTiltWord (per-word, rotate 12deg). Wrap each text line in
// a motion.span with overflow-hidden on the parent to clip mid-animation.

export const splitLineContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const splitLineLine: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.85, 0.09, 0.15, 0.91] },
  },
};

// ─── 16. Link underline expand ───────────────────────────────────────────────
// Source: after:scale-x-0 hover:after:scale-x-100 (pomelo.la) — different from
// barFill which is scroll/inView triggered. This is hover-triggered on text links.
// Usage: add a motion.span as absolute underline with style={{ originX: 0 }},
// animate={hovered ? "hover" : "rest"} on a parent with useHover.

export const underlineExpand: Variants = {
  rest: { scaleX: 0, transition: { duration: 0.35, ease: D8_EASE_SNAP } },
  hover: { scaleX: 1, transition: { duration: 0.35, ease: D8_EASE_SNAP } },
};

// ─── 17. Gradient border reveal ──────────────────────────────────────────────
// Source: .latest-post-card --border-opacity (pomelo.la) — cards have a gradient
// border built with background-clip:border-box; --border-opacity transitions 0→1
// on hover. Adapted: opacity fade on an absolute overlay div styled as a gradient
// border ring using border-box background-clip + transparent border.

export const gradientBorderReveal: Variants = {
  rest: { opacity: 0, transition: { duration: 0.4, ease: D8_EASE } },
  hover: { opacity: 1, transition: { duration: 0.4, ease: D8_EASE } },
};

// ─── 18. Staggered drop-in from above ────────────────────────────────────────
// Source: @keyframes link-in + StaggeredFadeIn (apple.com) — items start 4px
// above their final position and drop into place. Direction is opposite to
// slideUp (which rises from below). Low magnitude feels intentional, not flown.
// Usage: wrap nav links, index items, bento labels in dropInStagger + dropIn.

export const dropInStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const dropIn: Variants = {
  hidden: { opacity: 0, y: -4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: D8_EASE },
  },
};

// ─── 19. Card hover lift ─────────────────────────────────────────────────────
// Source: .card-hover:hover (apple.com) — `cubic-bezier(0, 0, 0.5, 1)` is
// Apple's deceleration-only ease; feels springy and physical, never bouncy.
// Scale value 1.016 is intentionally subtle — just enough to feel lifted.
// Usage: animate={isHovered ? "hover" : "rest"} on project rows, founder cards.

export const cardHoverLift: Variants = {
  rest: { scale: 1, transition: { duration: 0.3, ease: [0, 0, 0.5, 1] } },
  hover: { scale: 1.016, transition: { duration: 0.3, ease: [0, 0, 0.5, 1] } },
};

// ─── 20. Ribbon drop from above ──────────────────────────────────────────────
// Source: @keyframes ribbon-drop (apple.com) — top bar or announcement strip
// starts at translateY(-100%) and drops to 0. Use for Nav entrance, mobile
// menu open, or any full-width bar that should feel decisively placed.
// Usage: initial="hidden" animate="visible" on a motion.div.

export const ribbonDrop: Variants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: D8_EASE },
  },
};

// ─── 21. Floating pill materialise ───────────────────────────────────────────
// Source: .all-access-pass__intro-element (apple.com) — floating sticky CTAs
// start at scale(0.01) + opacity 0 and expand to full size. Creates a
// "materialises from nothing" feel distinct from simple fade or slide.
// Usage: floating ContactCTA, sticky buttons; pair with position:sticky.

export const pillMaterialise: Variants = {
  hidden: { scale: 0.01, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: D8_EASE },
  },
};
