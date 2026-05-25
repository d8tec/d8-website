# ROADMAP — d8tec.com

> Permanent project document. Do not rewrite each session.
> Update manually when scope changes or an objective is completed.
> HANDOFF.md references items here by ID (e.g. `← M1.1`).

Last updated: 2026-05-24

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
| M1.1 | Scaffold Next.js 14 project with Tailwind D8 tokens, Google Fonts (Space Grotesk / IBM Plex Sans / JetBrains Mono) | ✅ |
| M1.2 | Home page — Hero, value proposition, ContactCTA | ✅ |
| M1.3 | About Us (/about_us) page — brand story, Founders section, featured projects | ✅ |
| M1.4 | Projects page — real project rows with process key (Research/Model/Design/Prototype) | ✅ |
| M1.5 | Careers page — principles + unsolicited application form | ✅ |
| M1.6 | Contact page — contact rows + modal dialog (Name, Email, Phone, Message) | ✅ |
| M1.7 | EN/ES i18n — next-intl v4, URL-based routing (`/en/`, `/es/`), full translations | ✅ |
| M1.8 | SVG favicon + page title metadata (EN/ES) | ✅ |

---

## M2 — Infrastructure

Email, hosting, and form delivery in production.

| ID | Objective | Status |
|---|---|---|
| M2.1 | GitHub repository — `github.com/d8tec/d8-website` | ✅ |
| M2.2 | Vercel deployment at `d8tec.com` | ✅ |
| M2.3 | Resend domain verification — `d8tec.com` via Squarespace DNS | ✅ |
| M2.4 | `/api/careers` — FormData POST, Resend email with optional attachment | ✅ |
| M2.5 | `/api/contact` — JSON POST, Resend email from `contact@d8tec.com` | ✅ |
| M2.6 | Careers form drag-and-drop file upload (4 MB, PDF/image/ZIP) | ✅ |
| M2.7 | Contact modal auto-open via `?open=1` query param and `d8:open-contact` event | ✅ |
| M2.8 | `RESEND_API_KEY` + `CAREERS_EMAIL` env vars active on Vercel | ✅ |
| M2.9 | Set `CONTACT_EMAIL` env var explicitly on Vercel (currently using hardcoded fallback) | ✅ |

---

## M3 — Polish & SEO

Quality pass before active outreach.

| ID | Objective | Status |
|---|---|---|
| M3.1 | `og:image` — create asset and wire into locale layout metadata | ✅ |
| M3.2 | Real LinkedIn and Instagram URLs (currently placeholders) | ⏳ |
| M3.3 | Visual design iteration — style pass post-deploy | ⏳ |
| M3.4 | Resolve em dashes in About Us body copy (pending explicit decision) | ✅ |
| M3.5 | Monitor hero service titles at `lg:text-5xl` on 1024–1280px ("Hardware & Software" wrap risk) | ✅ |
| M3.6 | Hero glow feel on very tall viewports — evaluate and adjust if needed | ✅ |

---

## M4 — Content

Real content replacing placeholder copy.

| ID | Objective | Status |
|---|---|---|
| M4.1 | Projects page — real case studies with client/outcome detail | ✅ |
| M4.2 | About Us — final approved copy (no placeholder sections) | ⏳ |
| M4.3 | Careers — publish open roles when hiring begins | 💡 |
| M4.4 | Spanish copy review by a native speaker | 💡 |

---

## M5 — Growth

Post-launch expansion, not required for initial outreach.

| ID | Objective | Status |
|---|---|---|
| M5.1 | Analytics — privacy-respecting provider (Fathom, Plausible, or Vercel Analytics) | 💡 |
| M5.2 | Blog / Insights section — thought leadership, SEO traffic | 💡 |
| M5.3 | Core Web Vitals pass — LCP, CLS, INP targets | 💡 |
| M5.4 | Spanish SEO strategy — `/es/` indexing, keyword targeting for CR market | 💡 |
| M5.5 | Cookie / privacy notice — required if analytics added | 💡 |

---

<!-- Update this file manually when scope changes or an objective is completed. -->
<!-- Never rewrite the whole file each session — append or edit rows only. -->
