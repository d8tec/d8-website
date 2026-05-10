# ROADMAP — d8tec.com

> Permanent project document. Do not rewrite each session.
> Update manually when scope changes or an objective is completed.
> HANDOFF.md references items here by ID (e.g. `← R01`).

Last updated: 2026-05-10

---

## Status legend

| Symbol | Meaning |
|---|---|
| ✅ | Done — shipped to production |
| 🔄 | In progress |
| ⏳ | Pending — scoped but not started |
| 💡 | Idea — not yet committed |

---

## M1 — Foundation

Core site scaffold and all five pages live.

| ID | Objective | Status |
|---|---|---|
| R01 | Scaffold Next.js 14 project with Tailwind D8 tokens, Google Fonts (Space Grotesk / IBM Plex Sans / JetBrains Mono) | ✅ |
| R02 | Home page — Hero, value proposition, ContactCTA | ✅ |
| R03 | About Us (Services) page — brand story, tech focus, featured projects | ✅ |
| R04 | Projects page — 6-industry matrix with stage tags | ✅ |
| R05 | Careers page — principles + unsolicited application form | ✅ |
| R06 | Contact page — contact rows + modal dialog (Name, Email, Phone, Message) | ✅ |
| R07 | EN/ES i18n — next-intl v4, URL-based routing (`/en/`, `/es/`), full translations | ✅ |
| R08 | SVG favicon + page title metadata (EN/ES) | ✅ |

---

## M2 — Infrastructure

Email, hosting, and form delivery in production.

| ID | Objective | Status |
|---|---|---|
| R09 | GitHub repository — `github.com/d8tec/d8-website` | ✅ |
| R10 | Vercel deployment at `d8tec.com` | ✅ |
| R11 | Resend domain verification — `d8tec.com` via Squarespace DNS | ✅ |
| R12 | `/api/careers` — FormData POST, Resend email with optional attachment | ✅ |
| R13 | `/api/contact` — JSON POST, Resend email from `contact@d8tec.com` | ✅ |
| R14 | Careers form drag-and-drop file upload (4 MB, PDF/image/ZIP) | ✅ |
| R15 | Contact modal auto-open via `?open=1` query param and `d8:open-contact` event | ✅ |
| R16 | `RESEND_API_KEY` + `CAREERS_EMAIL` env vars active on Vercel | ✅ |
| R17 | Set `CONTACT_EMAIL` env var explicitly on Vercel (currently using hardcoded fallback) | ✅ |

---

## M3 — Polish & SEO

Quality pass before active outreach.

| ID | Objective | Status |
|---|---|---|
| R18 | `og:image` — create asset and wire into locale layout metadata | ✅ |
| R19 | Real LinkedIn and Instagram URLs (currently placeholders) | ⏳ |
| R20 | Visual design iteration — style pass post-deploy | ⏳ |
| R21 | Resolve em dashes in About Us body copy (pending explicit decision) | ✅ |
| R22 | Monitor hero service titles at `lg:text-5xl` on 1024–1280px ("Hardware & Software" wrap risk) | ✅ |
| R23 | Hero glow feel on very tall viewports — evaluate and adjust if needed | ✅ |

---

## M4 — Content

Real content replacing placeholder copy.

| ID | Objective | Status |
|---|---|---|
| R24 | Projects page — real case studies with client/outcome detail | ⏳ |
| R25 | About Us — final approved copy (no placeholder sections) | ⏳ |
| R26 | Careers — publish open roles when hiring begins | 💡 |
| R27 | Spanish copy review by a native speaker | 💡 |

---

## M5 — Growth

Post-launch expansion, not required for initial outreach.

| ID | Objective | Status |
|---|---|---|
| R28 | Analytics — privacy-respecting provider (Fathom, Plausible, or Vercel Analytics) | 💡 |
| R29 | Blog / Insights section — thought leadership, SEO traffic | 💡 |
| R30 | Core Web Vitals pass — LCP, CLS, INP targets | 💡 |
| R31 | Spanish SEO strategy — `/es/` indexing, keyword targeting for CR market | 💡 |
| R32 | Cookie / privacy notice — required if analytics added | 💡 |

---

<!-- Update this file manually when scope changes or an objective is completed. -->
<!-- Never rewrite the whole file each session — append or edit rows only. -->
