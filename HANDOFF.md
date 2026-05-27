# HANDOFF — d8tec.com
Current state: Interactive 3D wheel visual live on About Us page (`feature/animation-experiments`). Y-spoke alloy wheel with drag/scroll/idle animation. Build clean.

---

## What exists
- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, animejs, react-hook-form, resend, next-intl v4 — clean build
- Full D8 token system: `text-primary` #f0f0f0, `text-secondary` #ffffff, `text-dim` #888888, `bg` #080808, `surface` #111111
- Google Fonts (Space Grotesk / IBM Plex Sans / JetBrains Mono); SVG favicon; og:image static PNG
- i18n: next-intl v4, `/en/` and `/es/` routes, full EN + ES translations
- All animation effects from Session 11 intact (anime.js heartbeat/scramble, FM magnetic CTA, card tilt, marquee)

## About Us page — current state
- `AboutHeader.tsx`: animated overline + h1 + 3 body paragraphs (left) + `WheelVisual` (right, hidden on mobile)
- `WheelVisual.tsx` (`src/components/WheelVisual.tsx`): React Three Fiber Canvas, 5 Y-spokes with carrier ring + bead seat + hub flange + hex bolt sockets; drag + scroll-linked + idle oscillation; wheel floats on black (no border/card)
- Lighting: key `[-3,5,4]` intensity 6.5, fill `[4,0,3]` intensity 2.4, camera-axis fill `[0,0.5,8]`, ambient purple, rim light `[0,0,-6]` purple

## What's missing
- Deploy `feature/animation-experiments` to production (all work on this branch is undeployed)
- Fernando Montero portrait + full bio (M4.2 — content blocked)
- Real LinkedIn/Instagram URLs (M3.2 — profiles not created)
- Spanish copy review (M4.4)
- Vercel Analytics (M5.1)
- Future wheel upgrade: turbine/blade spoke geometry was prototyped this session — can revisit next session if desired

## Where to start next session
Deploy `feature/animation-experiments` to production, or open `src/components/WheelVisual.tsx` to continue the turbine-spoke redesign (turbine geometry was built and tested this session — ask user which direction).

---
Last updated: 2026-05-27  |  Session: 12
