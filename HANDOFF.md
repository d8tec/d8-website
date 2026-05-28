# HANDOFF — d8tec.com
Current state: Animation polish complete — JumpFlipHeading on Projects, re-triggering animations on Careers/Contact, sticky process bar scoped to content section. All sessions 11–14 changes undeployed on `feature/animation-experiments`.

---

## What exists
- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, animejs, react-hook-form, resend, next-intl v4 — clean build
- Full D8 token system: `text-primary` #f0f0f0, `text-secondary` #ffffff, `text-dim` #888888, `bg` #080808, `surface` #111111
- Google Fonts (Space Grotesk / IBM Plex Sans / JetBrains Mono); SVG favicon; og:image static PNG
- i18n: next-intl v4, `/en/` and `/es/` routes, full EN + ES translations
- All animation effects from Sessions 11–12 intact (anime.js heartbeat/scramble, FM magnetic CTA, card tilt, marquee)
- `playwright-screenshots/` folder in `.gitignore`; root workspace clean of loose PNGs
- `ProjectsContent.tsx`: `JumpFlipHeading` subcomponent (letter jump+flip, `whileInView once: false`); sticky process bar contained to content section
- `CareersContent.tsx` + `ContactContent.tsx`: all entrance animations re-trigger on scroll re-entry (`once: false`)

## About Us page — current state
- `AboutHeader.tsx`: animated overline + h1 + 3 body paragraphs (left) + `WheelVisual` (right, hidden on mobile)
- `WheelVisual.tsx`: React Three Fiber Canvas — loads `2796N16_Omni-Directional_Wheel-draco.glb` via GLTFLoader + DRACOLoader; 3 meshes (`mesh_0` end caps → dark, `mesh_0_1` carrier → dark gunmetal, `mesh_0_2` rollers → D8 purple); drag + scroll-linked + idle oscillation; Suspense fallback (spinning torus); SSR-safe
- Draco decoder files at `public/draco/`; compressed model at `public/models/2796N16_Omni-Directional_Wheel-draco.glb`

## What's missing
- Deploy `feature/animation-experiments` to production — **all work since Session 9 is undeployed**
- Remove uncompressed `public/models/2796N16_Omni-Directional_Wheel.glb` and `.gltf` before deploying
- Move loose PNG screenshots in project root to `playwright-screenshots/` before committing
- Fernando Montero portrait + full bio (M4.2 — content blocked)
- Real LinkedIn/Instagram URLs (M3.2 — profiles not created)
- Spanish copy review (M4.4)
- Vercel Analytics (M5.1)

## Where to start next session
Deploy `feature/animation-experiments` to production: move root PNGs to `playwright-screenshots/`, delete uncompressed GLB/GLTF from `public/models/`, commit, then run `vercel --prod` or push to trigger Vercel deploy.

---
Last updated: 2026-05-28  |  Session: 14
