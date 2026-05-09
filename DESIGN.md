---
name: d8tec.com
description: Full-spectrum technology company — engineering for those who demand more
colors:
  primary: "#9900ff"
  primary-accessible: "#b84dff"
  primary-deep: "#6600bb"
  bg-void: "#080808"
  surface-raised: "#111111"
  border-hairline: "#1e1e1e"
  text-primary: "#f0f0f0"
  text-secondary: "#888888"
  text-dim: "#555555"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  sharp: "2px"
  full: "9999px"
spacing:
  section-y: "96px"
  section-x: "24px"
  container-max: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.sharp}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sharp}"
    padding: "12px 24px"
  button-ghost-hover:
    textColor: "{colors.text-primary}"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sharp}"
    padding: "8px 16px"
  nav-cta-hover:
    textColor: "{colors.primary}"
---

# Design System: d8tec.com

## 1. Overview

**Creative North Star: "The Precision Engine"**

This is a system designed to prove a thesis before the reader finishes the first scroll: D8 builds things that work, without wasted material. Every spacing step is deliberate. Every border is hairline-thin or absent. Every color decision is load-bearing, not decorative. The canvas is near-black because the work commands all attention — ornament has nowhere to hide.

The dominant aesthetic is restraint at the surface, density underneath. Not minimalism as trend, but minimalism as engineering doctrine. PRODUCT.md calls for "simple outside, powerful inside." This system achieves that by making the whitespace earn its place, the typography carry full structural weight, and the one expressive color — Ultraviolet — appear only where it needs to cut through.

The system explicitly rejects: startup-palette accents (neons, saturated yellows), gradient text, glassmorphism used decoratively, hero-metric templates, identical card grids, bounce animations, purple-to-blue gradients, stock photo heroes, and any aesthetic that depends on a trend to function. If the design still works in 2030, it passes.

**Key Characteristics:**
- Near-black canvas with near-zero ornamentation
- Single expressive color (Ultraviolet) used sparingly — never decoratively
- Sharp 2px corners everywhere — no softness, no warmth at rest
- Typography carries all hierarchy; icons and illustration are absent
- Flat surfaces at rest; depth through tonal stepping and hairline borders
- Interactive hover states use color shift or opacity reduction — no scale, no bounce

## 2. Colors: The Ultraviolet Palette

One accent at maximum saturation. Everything else recedes.

### Primary
- **Ultraviolet** (`#9900ff`): The D8 brand marker. Used on hero h1 accent spans (large text only, 48px+ where 3.62:1 ratio passes AA large), primary CTA button fills, and dot-pulse indicators. Nowhere else — its scarcity is the point.
- **Ultraviolet Accessible** (`#b84dff`): The AA-safe lift (+1.67 lightness stops, 5.29:1 on Void). Used for small-text purple (label accents, section overlines), focus rings (2px outline), and any context where the base Ultraviolet fails AA at the given size.
- **Ultraviolet Deep** (`#6600bb`): Reserved. Available for active or pressed states, or future dark-on-purple scenarios. Not yet applied in the interface.

### Neutral
- **Void** (`#080808`): Page canvas. The definitive background. Not pure black — slightly lifted to prevent harsh optical edges on dark displays.
- **Surface** (`#111111`): Raised surfaces: cards, hero badge, header background (at 90% opacity). The single step above Void.
- **Hairline** (`#1e1e1e`): All borders and dividers. Applied at 1px. This color never fills a surface.
- **Primary Text** (`#f0f0f0`): All headings, active nav links, primary labels. Not pure white — a trace of warmth.
- **Secondary Text** (`#888888`): Body copy, nav links at rest, secondary labels, metadata. The default reading color.
- **Dim Text** (`#555555`): Tertiary hierarchy. De-emphasized content only. Never body copy that must be read comfortably.

### Named Rules

**The One Voice Rule.** Ultraviolet (`#9900ff`) is used on 10% or less of any given screen. Its rarity is the mechanism. When it appears, it is the only thing asking for attention. Never introduce a second accent color.

**The Large-Text Exception.** `#9900ff` on `#080808` yields 3.62:1 — AA-compliant at 18px bold or 24px regular and above. Below those thresholds, use `#b84dff` (5.29:1). Never use the base Ultraviolet for body copy or small labels.

## 3. Typography

**Display Font:** Space Grotesk (`var(--font-space-grotesk)`, geometric sans-serif)
**Body Font:** IBM Plex Sans (`var(--font-ibm-plex-sans)`, humanist sans-serif)
**Label/Mono Font:** JetBrains Mono (`var(--font-jetbrains-mono)`)

**Character:** Space Grotesk provides technical authority without coldness — its distinctive alternate letterforms read as engineered rather than designed. IBM Plex Sans grounds body copy in legibility and trust. JetBrains Mono marks the technical provenance of D8 without announcing it; it appears only where precision labeling is genuinely needed.

### Hierarchy

- **Display** (Semibold, clamp 48px–72px responsive, line-height 1.1, letter-spacing −0.025em): Hero `<h1>` only. Responsive via `text-5xl` / `sm:text-6xl` / `lg:text-7xl` Tailwind stack.
- **Headline** (Semibold, 30px / 1.875rem, line-height 1.2, letter-spacing −0.015em): Section `<h2>` titles. "Selected work", "Have something to build?".
- **Title** (Semibold, 18px / 1.125rem, line-height 1.3): Project entry `<h3>` titles within list rows.
- **Body** (Regular, 16px / 1rem or 18px for hero leads, line-height 1.6): All body copy. Maximum line length 65–75ch enforced via `max-w-2xl` / `max-w-md` containers.
- **Label** (Regular, 12px / 0.75rem, letter-spacing 0.1em, uppercase): JetBrains Mono. Section overlines ("Full-spectrum technology", "Work with us"), tech stack tags, category markers. Always uppercase. Never more than four words.

### Named Rules

**The Scale Gap Rule.** Display to Headline is a 2.4x jump (72px to 30px). This gap is load-bearing: it prevents the page from reading as a flat list of equally-weighted headings. Do not introduce intermediate heading sizes that compress this ratio.

**The Mono Reservation Rule.** JetBrains Mono is reserved for labels, tags, and technical markers. Never use it for body copy or nav links. Its appearance signals: "this is a category, a system, a technical datum."

## 4. Elevation

This system is flat by default. No ambient drop shadows at rest. Depth is expressed through tonal stepping: Void (`#080808`) as the canvas, Surface (`#111111`) as the raised plane, and Hairline (`#1e1e1e`) as the visible edge between them. These three values are the complete depth vocabulary for static states.

On hover, interactive elements may develop a faint Ultraviolet ambient bloom: `box-shadow: 0 0 24px rgba(153, 0, 255, 0.15)`. This reads as the surface energizing, not floating. It is the only permitted shadow effect in the system.

The Nav bar achieves perceived elevation through `backdrop-blur-sm` and 90% background opacity (`rgba(8,8,8,0.9)`), not a drop shadow. The blur is evidence of layering, not decoration.

### Named Rules

**The Bloom Rule.** The only permitted shadow is the Ultraviolet ambient bloom on interactive hover (`box-shadow: 0 0 24px rgba(153, 0, 255, 0.15)`). Drop shadows, card shadows, and elevation shadows at rest are prohibited. If a surface needs to feel elevated at rest, step the tonal value — never add a shadow.

**The Blur Rule.** `backdrop-filter: blur` is permitted only on the fixed Nav, where it is structural (it proves the bar floats above content). Blur applied to cards, modals, or decorative overlays is glassmorphism. Prohibited.

## 5. Components

### Buttons

Buttons do not try to please. They signal with precision and recede when not needed.

- **Shape:** Near-square (2px radius). No pill, no soft rounding anywhere.
- **Primary:** Ultraviolet fill (`#9900ff`), white text, padding 12px 24px. Hover: opacity drops to 90%. The color stays, the button recedes slightly. No border, no outline change.
- **Ghost:** Transparent background, Hairline border (1px `#1e1e1e`), Secondary Text (`#888888`), same padding. Hover: text lifts to Primary Text, border lifts to Dim Text. Does not shift to Ultraviolet — that would compete with the primary button.
- **Nav CTA:** Same ghost treatment, tighter padding (8px 16px). Hover: border and text both shift to Ultraviolet. This is the only ghost variant that goes purple — it is the header's solitary call-to-action.

### Chips / Tags

- **Tech stack tags:** JetBrains Mono, 12px, Secondary Text. No background, no border, no container. Raw mono text is the chip. Nothing further.
- **Hero badge:** Rounded-full pill (9999px), Surface background (`#111111`), Hairline border, with a 6px Ultraviolet dot at left and Label text. The only "badge" shape in the system.

### Cards / Containers

- **Corner Style:** 2px radius (near-square).
- **Background:** Surface (`#111111`).
- **Shadow Strategy:** None at rest. Ultraviolet bloom on hover where applicable (see Elevation).
- **Border:** 1px Hairline (`#1e1e1e`).
- **Internal Padding:** 32px vertical (py-8) for list row entries; 64px vertical (py-16) for featured CTA containers.

### Inputs / Fields

Not yet implemented. When built (Contact page): stroke style — transparent background, 1px Hairline border, 2px radius. Focus: 2px Ultraviolet Accessible outline (`#b84dff`), 3px offset, matching the global `:focus-visible` rule. No fill-on-focus, no glow — color shift only.

### Navigation

- **Style:** Fixed top bar, `rgba(8,8,8,0.9)` background, `backdrop-blur-sm`, 1px Hairline bottom border.
- **Logo:** Space Grotesk Semibold, 20px, Primary Text. The wordmark is the logo — no emblem, no icon.
- **Desktop links:** IBM Plex Sans, 14px, Secondary Text at rest. Hover: transitions to Primary Text. Active page: Primary Text via `aria-[current=page]` selector. No underlines, no indicators.
- **Nav CTA:** Ghost button with Ultraviolet hover (see Buttons).
- **Mobile:** Animated 3-line hamburger (1px Primary Text bars) that crosses into an X on open. Menu drops below the header, separated by Hairline border. All touch targets minimum 44×44px.

### Services Rows (Signature Component)

Full-width horizontal rows with 1px Hairline dividers between entries. Three columns on desktop: tag column (JetBrains Mono label, left-aligned) | title column (Display-scale, `text-5xl` at `lg:`) | description column (Body text). On row hover: title shifts to Ultraviolet Accessible (`#b84dff`), row background fills to Surface (`#111111`). No card container, no border on the row itself — the divider line and the color shift are the only affordances.

## 6. Do's and Don'ts

### Do:
- **Do** use `#b84dff` (Ultraviolet Accessible) for any purple text below 24px, or bold text below 18px. The base `#9900ff` on Void fails AA at small sizes.
- **Do** keep Ultraviolet to 10% or less of any given screen surface. One dominant CTA, one accent span, one dot indicator — that is the full budget per view.
- **Do** use JetBrains Mono for all technical labels, stack tags, and category markers. Always uppercase, always `tracking-widest`. This is how the system signals precision without announcing it.
- **Do** maintain 2px radius on every interactive element and container. One softened corner anywhere reads as a contradiction.
- **Do** use 1px Hairline borders (`#1e1e1e`) as dividers. Visible only on close inspection — that is the intent.
- **Do** honor `prefers-reduced-motion`. All Framer Motion animations must check `useReducedMotion()` and set duration to 0 when true.
- **Do** cap body copy at 65–75ch via `max-w-2xl` or `max-w-md` containers on all pages.
- **Do** step tonal values (Void to Surface) to create depth at rest. Tonal layering is the only permitted elevation tool outside of hover states.

### Don't:
- **Don't** use gears, circuit boards, wrenches, or generic engineering iconography as decoration. PRODUCT.md is explicit: these are hard prohibited.
- **Don't** use gradient text (`background-clip: text` with a gradient background). The system has one accent color; gradients dilute it and are banned outright.
- **Don't** use glassmorphism decoratively. The Nav's `backdrop-blur-sm` is structural. Blur on cards, modals, or decorative layers is prohibited.
- **Don't** use purple-to-blue gradients or mix Ultraviolet with other saturated hues. PRODUCT.md calls this out by name.
- **Don't** add drop shadows, ambient shadows, or glow effects at rest. The Bloom Rule: the Ultraviolet ambient bloom appears on hover only.
- **Don't** use Inter. PRODUCT.md lists Inter as an explicit anti-reference. Space Grotesk for headings, IBM Plex Sans for body — no substitutions.
- **Don't** introduce a second accent color. If semantic colors are needed (error states, warnings), use muted tints of existing neutrals — never a new saturated hue.
- **Don't** use bounce or elastic easing on any animation. Ease-out only. The system does not have a personality that bounces.
- **Don't** place cards inside cards. Nesting container surfaces collapses the tonal vocabulary and reads as confusion.
- **Don't** use stock photo heroes or mascot illustrations. Typography and craft do the talking.
- **Don't** add taglines inside the logo, founding-year callouts, or "since 2025" anywhere.
- **Don't** use startup palette accents: neon green, saturated yellow, retro pastels, or any color that "screams." One voice, always Ultraviolet.
