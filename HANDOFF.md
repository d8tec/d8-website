# HANDOFF — d8tec.com
Current state: Iteration 1 animation pass complete and committed on `feature/animation-experiments`. Build clean.

---

## What exists
- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, react-hook-form, resend, next-intl v4 — clean build
- Full D8 token system: `text-primary` #f0f0f0, `text-secondary` #ffffff (pure white), `text-dim` #888888
- Google Fonts (Space Grotesk / IBM Plex Sans / JetBrains Mono); SVG favicon; og:image static PNG
- i18n: next-intl v4, `/en/` and `/es/` routes, full EN + ES translations
- **`src/lib/animations.ts`** — 23 named exports (21 Framer Motion variants + `useMagneticButton` + `useCardTilt`)

## Iteration 1 — Framer Motion pass (commit 618d8b7, branch feature/animation-experiments)
All components wired with variants from `animations.ts`:
- `Nav`: ribbonDrop entrance, dropInStagger links, underlineExpand hover
- `Hero`: scrollLinkedBg glow parallax, arrowNudge CTA, service row hover, glow-pulse CSS on bg
- `AboutHeader`: sweepReveal overline, splitLineLine h1, slideUpStagger body
- `Founders`: floatingCardEntrance, sweepReveal headings
- `Projects` (home): floatingCardEntrance rows, sweepReveal heading
- `ProjectsContent`: sweepReveal + splitLineLine header, industry row hover
- `CareersContent`: sweepReveal + splitLineLine header, principle row hover
- `ContactContent`: dropInStagger bento, gradientBorderReveal email tile
- `ContactCTA`: pillMaterialise, arrowNudge
- `ScrollProgress`: fixed 2px purple bar (Framer Motion useSpring)
- `Marquee`: ServicesMarquee / ProcessMarquee / TechMarquee (CSS keyframes) on home page

## What's next — Iteration 2: anime.js complementary effects

**Goal:** Make the site feel more alive without touching the Framer Motion foundation. Use anime.js for effects that Framer can't do well: text character effects, SVG drawing, precise timeline sequencing, and imperative DOM effects on specific triggers.

**Install:** `npm install animejs` (v4.4.1 — named ESM exports; dynamic import for SSR safety)

**Key anime.js v4 API:**
```ts
import { animate, scrambleText, createTimeline, stagger } from 'animejs';
// animate(targets, params) — returns { pause, play, ... }
// scrambleText({ chars, ease }) — FunctionValue for innerHTML tween
// stagger(value, { from, grid, ease }) — for multi-element offsets
```

**Planned effects:**

1. **Badge dot heartbeat** (`Hero.tsx`) — anime.js `animate()` on the purple dot: `scale [1, 1.45, 1]`, `opacity [1, 0.45, 1]`, `loop: true`. File to create: `src/lib/animePatterns.ts` → `useHeartbeatDot()` hook.

2. **Badge text scramble** (`Hero.tsx`) — on badge entrance complete, `animate(badgeSpan, { innerHTML: scrambleText({ chars: 'uppercase', ease: 'outExpo' }), duration: 1000 })`. Hook: `useAnimeScramble()` in `animePatterns.ts` — returns `{ ref, trigger }`.

3. **Magnetic button drift** (`Hero.tsx` primary CTA, `ContactCTA.tsx`) — already built as `useMagneticButton()` in `animations.ts` (Framer Motion, complete). Just needs wiring: wrap the Link in a `motion.div` with `style={{ x, y }}` + mouse handlers from the hook. Strength: `0.3`.

4. **3D card tilt on portraits** (`Founders.tsx`) — already built as `useCardTilt()` in `animations.ts` (Framer Motion, complete). Extract each founder card to a `FounderCard` component (can't call hooks in `.map()`), apply `style={{ rotateX, rotateY, transformPerspective: 800 }}` + mouse handlers to the portrait div.

5. **SVG path draw** — pick one SVG element on the site (e.g. a decorative line or the D8 logo in footer) and use anime.js `draw` property: `animate(path, { draw: '0 1', duration: 1200 })`. Requires adding `draw` attribute to the SVG element.

6. **Character stagger on section headings** (one heading per page, on first viewport entry) — use anime.js `TextSplitter` or manual char splitting + `stagger()` to animate each letter in with `opacity [0,1]` + `translateY ['0.5em', 0]`. Keep subtle — not every heading, just hero-level ones.

**Architecture:** Create `src/lib/animePatterns.ts` as the anime.js counterpart to `animations.ts`. All hooks use dynamic `import('animejs')` inside `useEffect` so SSR is safe. Return cleanup functions (`.pause()` on the animation instance).

**Do not touch:** Framer Motion variants, existing component structure, `animations.ts` exports. anime.js is additive only.

**Reference:** animejs.com — the site itself uses v4 scrambleText on headings, SVG draw on decorative elements, and stagger grids on feature lists.

---

## What's missing
- Fernando Montero portrait + full bio (M4.2 partially blocked)
- Real LinkedIn/Instagram URLs — blocked on profiles being created (M3.2)
- Spanish copy review by native speaker (M4.4)
- Vercel Analytics not yet added (M5.1)
- Changes not deployed — push `feature/animation-experiments` to production when iteration 2 is done

## Where to start next session
Branch: `feature/animation-experiments`. Run `npm install animejs`. Create `src/lib/animePatterns.ts` and implement the 6 effects above in order. Wire magnetic button on Hero primary CTA first (it's already built, just needs JSX).

---
Last updated: 2026-05-26  |  Session: 10  |  Git: committed 618d8b7 on feature/animation-experiments
