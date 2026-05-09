# Session Comparison — d8tec.com Design Directions

## Session 2 approach (branch: design/session-2-baseline)

**What worked:**
- The horizontal divider row pattern (tag | title | description) was the single strongest design
  decision of the project. It rejects the card-grid reflex entirely and reads as editorial and
  authoritative — exactly right for a B2B engineering firm.
- Dark-only theme was a committed, correct call. The reasoning was sound (Andrés at a desk
  evaluating partners — dim room forces dark).
- Token system was clean from the start. No hard-coded colors anywhere.
- Accessibility fixes in Session 1 were thorough: skip link, aria-current, aria-expanded,
  focus rings, reduced motion, 44px touch targets.
- The hero badge (rounded-full pill with purple dot) is a distinctive component — not generic SaaS.

**What felt generic:**
- Container was max-w-6xl (1152px) — slightly tight, made the generous row pattern feel more
  constrained than it needed to be.
- Section spacing was uniform (py-16 to py-24 across most sections) — no rhythm, same padding
  everywhere.
- Nav "Get in touch" was a ghost bordered button — hesitant. It looked like a secondary action
  rather than a primary CTA.
- Footer was minimal to the point of being invisible — the brand block (D8 + tagline) had no
  presence or identity weight.
- Page backgrounds were flat throughout — no section-level tonal differentiation. Every section
  sat on the same #080808 canvas with only hairline borders as separators.
- Service title scale capped at lg:text-4xl — correct technically, but the usedrop reference
  revealed the rows could carry more vertical weight.
- Inner page headers were left-aligned (correct for editorial authority) but without a
  max-width constraint on the content block — the text ran uncomfortably wide at large viewports.

---

## Session 3 approach (branch: design/session-3-usedrop-reference)

**What worked:**
- max-w-7xl container (1280px) gives the row pattern room to breathe. The three-column grid
  (tag | title | description) reads with much better proportions.
- Section-level tonal alternation (bg-d8-bg / bg-d8-surface) adds visual rhythm without
  introducing a second color. The Contact page's header/rows split is the cleanest execution.
- Solid purple nav CTA is decisive. It closes the hesitancy of the bordered ghost.
- Increased section spacing (pt-40 / pb-28–32) gives each page a stronger sense of pace.
- Tag numbers upgraded to text-sm font-semibold — more visually prominent, consistent across
  all pages. The 3rem column width is a tighter, more precise grid.
- Footer brand block now has identity presence — D8 at 2xl with a fuller tagline reads as
  a brand statement, not an afterthought.
- Service titles at lg:text-5xl on the hero panel — the added scale makes the rows feel
  like a feature, not a list.
- max-w-4xl constraint on inner page content blocks prevents text from running wide.
- P1/P2 accessibility fixes across all pages: live regions on the Careers form,
  select chevron, inline error messages, h1 on About Us, text-xs on all labels.

**What felt forced:**
- The usedrop.io reference is a B2C CRM product — its centered, symmetrical, aspirational
  energy is genuinely at odds with D8's direct editorial voice. The translation map correctly
  identified this and adapted (kept left-aligned inner pages), but the primary value extracted
  was spacing, container width, and nav/footer upgrades — not layout logic per se.
- The bg-d8-surface alternation is correct but subtle. On a calibrated monitor it reads as
  intended rhythm. On a bright, high-gamma display it may read as barely visible — the tonal
  step between #080808 and #111111 is narrow. Worth testing on uncalibrated hardware.
- hero service titles at lg:text-5xl (48px) are large. They work well as display-scale
  section titles when the title is short (R&D, Hardware & Software) but "Hardware & Software"
  at 48px is four words that wraps on some breakpoints. Monitor at 1024–1280px viewport.

---

## Recommendation

**Take Session 3 as the baseline.** The improvements are net-positive across every dimension:
wider container, stronger nav CTA, section rhythm, better footer, consistent tag treatment,
and a full accessibility pass that Session 2 was missing.

The horizontal row pattern — D8's most distinctive visual signature — is unchanged. Session 3
did not touch the structural component that makes the site feel like itself.

**Three things to carry forward regardless of direction:**
1. The row pattern (tag | title | description with hover:bg-d8-surface) — protect this at all costs.
2. text-d8-purple-light (#b84dff) for all small purple text — the contrast rule is non-negotiable.
3. The two-section page structure (header on bg-d8-bg / content on bg-d8-surface) — use it
   on every inner page that has a clear header + body split. Contact is the cleanest example.

**One thing to revisit:** The hero glow was expanded from h-[480px] to h-[640px]. On very
tall viewports (1440px height) this may look heavy. Consider a max-height clamp or reducing
the glow opacity as an alternative.

---

Last updated: 2026-05-09 | Session: 3
