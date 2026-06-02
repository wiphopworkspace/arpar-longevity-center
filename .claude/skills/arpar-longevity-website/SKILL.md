---
name: arpar-longevity-website
description: Use this skill when working on the ARPAR Longevity Center website project, especially for UI/UX changes, bilingual content, service pages, banner slideshow behavior, medical wellness copy, Netlify deployment, and future production-readiness tasks.
---

# ARPAR Longevity Center — Project Skill

> Project-local skill. Read this first when continuing work on this repo so you
> understand the brand, stack, conventions, and what must not be broken.

## 1. Purpose

This project is a **premium bilingual (Thai / English) website** for **ARPAR
Longevity Center / อาภา Longevity Center** — a longevity / wellness /
regenerative / anti-aging clinic concept. It should read as a calm, trustworthy,
high-end **medical wellness** brand, not a hospital and not a hard-sell beauty
clinic.

## 2. Project Context

- **Brand:** ARPAR Longevity Center / อาภา (`อาภา` = Thai brand name)
- **Website style:** premium medical wellness
- **Mood & tone:** clean, luxury, trustworthy, international, calm, medical wellness
- **Color theme:** white, cream, beige, muted gold, warm taupe / brown-gray
- **Stack:**
  - Next.js 14 (App Router) + TypeScript
  - Tailwind CSS (custom luxury-wellness theme in `tailwind.config.ts` + `globals.css`)
  - `next/font` — Montserrat (headings), Inter (EN body), Noto Sans Thai
  - Lightweight built-in i18n (no i18n library) + `src/middleware.ts`
  - Netlify deployment (Next.js Runtime)
- **Live URL:** https://arpar-longevity-center.netlify.app
- **GitHub repo:** https://github.com/wiphopworkspace/arpar-longevity-center
- **Default branch:** `main` (push → Netlify auto-deploys)

### Key files / structure
```
src/
  middleware.ts                      # / -> /th, legacy paths -> /th/...
  app/
    globals.css                      # design tokens + utilities
    sitemap.ts  robots.ts            # locale-aware SEO
    api/contact/route.ts             # contact form Route Handler (SAFE SKELETON, no backend)
    [locale]/
      layout.tsx                     # <html lang>, fonts, per-locale SEO + hreflang
      page.tsx                       # localized homepage (+ JSON-LD)
      services/page.tsx              # /<locale>/services index
      services/[slug]/page.tsx       # /<locale>/services/<slug> detail (SSG)
  components/
    layout/   Header, Footer, LanguageSwitcher
    sections/ Hero, BannerSlideshow, BrandPromise, About, Services,
              FeaturedPrograms, WhyChoose, Doctors, Gallery, Articles,
              Contact, ContactForm
    services/ ServiceCard
    ui/       Button, SectionHeading, Reveal, BrandMark, Placeholder,
              PageHero, CtaBand, BrochureImage, icons
  data/content.ts                    # SINGLE SOURCE OF TRUTH (bilingual)
public/images/{brand,about,services} # real WebP + JPG backups
```

## 3. Design Direction

- Use **white / cream / beige / soft (muted) gold**; primary text `#4A4035`,
  secondary `#7A6D5D`, gold `#B89542`/`#C9A646`, soft gold `#E8D7A8`, borders `#E6DDCC`.
- Spacious layout, generous whitespace, rounded sections/cards (20–28px),
  soft shadows, thin gold dividers, subtle gold sparkle/wave accents.
- **Avoid** a crowded, brochure-like layout.
- Premium medical-wellness tone — **avoid** a hard hospital look and **avoid**
  an aggressive beauty-clinic sales style.
- The uploaded ARPAR **brochure images contain embedded Thai text/logos** — treat
  them carefully. Prefer **natural image ratio / `object-contain`** for these;
  never `object-cover` if it would crop text/logo.

## 4. Important Existing Features

- **Homepage** (`app/[locale]/page.tsx`) section order:
  Header → **BannerSlideshow** → Hero → Brand Promise → About → Services →
  Featured Programs → Why Choose → Doctors (Experts) → Gallery → Articles →
  Contact → Footer.
- **Services index** (`/<locale>/services`) and **service detail** pages
  (`/<locale>/services/[slug]`, SSG for 8 services × 2 locales).
- **Contact API route skeleton** (`app/api/contact/route.ts`) — validates +
  honeypot + returns JSON; **NOT wired to any backend** yet (no secrets).
- **WebP images** (6 brochures converted; JPG backups kept).
- **Netlify Runtime deployment**, **bilingual i18n**, locale-aware
  **sitemap / robots / metadata (canonical + hreflang)**.

## 5. BannerSlideshow Rules  (`src/components/sections/BannerSlideshow.tsx`)

- Placed **after Header, before Hero**. Keep it **compact and image-focused**.
- **Do NOT turn it back into a large framed card carousel.** No heavy
  border/shadow/cream padding. Use a subtle `rounded-2xl`, natural brochure
  ratio (`aspect-[1280/905]`), `object-contain` (no crop).
- Keep **dot pagination**. Keep **arrows if present** (currently none — do not
  add unless asked). Keep **whole-slide clickable** `next/link`.
- **Gestures:** unified **Pointer Events** (mouse drag + touch swipe).
  - **Horizontal slide** transition (a flex track moved with
    `translateX(calc(-active*100% + dragOffset px))`) — **not** fade.
  - **Live drag-following:** track moves with the pointer while dragging
    (transition disabled during drag), then **snaps** to next/prev/current on
    release. Threshold ~45px.
  - `touch-pan-y` so vertical page scroll still works; `cursor-grab` /
    `cursor-grabbing`; `draggable={false}`; `select-none`.
  - **Suppress the link click after a real drag** (`onClickCapture` +
    `suppressClick` ref) so dragging never opens a service page; a plain
    tap/click still navigates.
- **Do not modify unrelated sections** when touching this file.
- Slide image → service mapping (locale prefix added at render via `localePath`):
  - `hormone-hrt-weight-management.webp` → `/services/hormone-balance-hrt`
  - `micronutrients-iv-drip.webp` → `/services/iv-drip`
  - `stem-cell-preventive-checkup.webp` → `/services/stem-cell-nk-cell`

## 6. Content Rules

- **Keep all editable, user-facing copy in `src/data/content.ts`.** It is
  bilingual: each text leaf is authored with `L("ไทย", "English")`; a generic
  resolver `getDictionary(locale)` produces a typed dictionary. Components take
  `{ dict, locale }` and build links with `localePath(locale, "/...")`.
- **Avoid hardcoding user-facing strings in components.** Add them to
  `content.ts` (usually `ui`, a section heading object, or `form`).
- **Medical / wellness copy MUST be safe** — no cure claims, no guaranteed
  results, no 100% prevention, no unverified statistics. Prefer:
  "designed to support", "may help support", "consultation is recommended",
  "personalized care", "medical supervision", "wellness-focused",
  "long-term health planning".
- **Thai tone:** สุภาพ พรีเมียม น่าเชื่อถือ เหมาะกับคลินิกสุขภาพ.
  **English tone:** premium, calm, trustworthy, medical wellness, international.

## 7. Bilingual / i18n  (IMPLEMENTED)

- Locales: `th` (default) and `en`. Source of truth: `content.ts`
  (`locales`, `defaultLocale`, `getDictionary`, `localePath`, `isLocale`).
- URL structure: `/th`, `/en`, `/th/services`, `/en/services`,
  `/th/services/[slug]`, `/en/services/[slug]`.
- Root `/` and legacy non-locale paths redirect to **Thai** via `src/middleware.ts`.
- **Language switcher** in the Header (`LanguageSwitcher.tsx`) swaps only the
  locale prefix, preserving page context (`/th/services/iv-drip` ↔ `/en/...`).
- Metadata is locale-aware: per-locale title/description, `<html lang>`,
  canonical, `hreflang` (th / en / x-default); sitemap lists both locales.
- The `[locale]/layout.tsx` is the root layout (renders `<html>`); there is
  **no** `app/layout.tsx`. The `/` redirect is handled by middleware.

## 8. Image Rules

- Real assets under `public/images/` — folders: `brand/`, `about/`, `services/`.
- **WebP preferred** for production (already converted, q≈82). JPG backups may
  remain until a final cleanup.
- Always use **`next/image`** with descriptive **alt** text (alt is bilingual in
  `content.ts`). The `BrochureImage` UI component renders brochures uncropped
  (natural ratio, gold-bordered cream card) for About / Featured / detail pages.
- **Never `object-cover`** if it cuts Thai text or a logo. Use `object-contain`
  or natural ratio for text-heavy brochures.
- For a true wide-banner feel later, commission/export **dedicated wide banner
  images** rather than force-cropping the brochures.

## 9. Deployment Rules

- Target: **Netlify** (Next.js Runtime via `@netlify/plugin-nextjs`). GitHub repo
  is connected; **push to `main` → auto-redeploy**.
- Keep `netlify.toml` configured for the Runtime: build `npm run build`,
  publish `.next`, Node 20.
- **Do NOT use `output: "export"` for production** — `/api/contact` and
  `next/image` optimization need the server runtime. (Static export was used
  once only for a throwaway drag-and-drop preview, then reverted.)
- `siteUrl` in `content.ts` = `https://arpar-longevity-center.netlify.app`
  (update if a custom domain is added; it feeds sitemap/robots/canonical/OG).
- **Always run `npm run lint` and `npm run build` (both must pass) before
  commit/push.** ESLint config: `.eslintrc.json` (`next/core-web-vitals`),
  run via `eslint .` (not interactive `next lint`).
- End commit messages with the `Co-Authored-By: Claude ...` trailer.

## 10. Commands

```bash
npm run dev            # http://localhost:3000 (→ /th)
npm run lint           # eslint .
npm run build          # production build (must pass before push)
npm run start          # serve the production build locally

git status
git add .
git commit -m "..."
git push               # to main → Netlify auto-deploys
```

Windows note: this repo is developed on Windows + PowerShell. To stop a running
dev/start server: `taskkill /F /IM node.exe`.

## 11. Quality Checklist (run before declaring done)

- [ ] `npm run lint` passes (0 errors)
- [ ] `npm run build` passes (currently ~26 pages + middleware)
- [ ] Homepage loads (`/` → `/th`, and `/en`)
- [ ] `/th/services` and `/en/services` work
- [ ] service detail pages work (e.g. `/th/services/iv-drip`)
- [ ] `/sitemap.xml` and `/robots.txt` resolve and use the right `siteUrl`
- [ ] mobile menu opens/closes; language switcher preserves context
- [ ] BannerSlideshow works desktop + mobile: dots, drag, swipe, click all work
- [ ] dragging the banner does NOT accidentally open a service page
- [ ] mobile vertical scroll still works over the banner (`touch-pan-y`)
- [ ] no unverified medical claims; no exposed secrets
- [ ] Netlify deploy succeeds

## 12. Future Work / Launch Checklist (PLACEHOLDERS to replace)

Search `content.ts` for `PLACEHOLDER` and `[Name Placeholder]`. Before launch:

- [ ] Real **phone, LINE, Facebook, email, address, hours** (`site` in `content.ts`)
- [ ] Real **Google Map embed** (replace the placeholder block in `Contact.tsx`)
- [ ] Real **doctor names, credentials, photos** (`doctors`; remove disclaimer)
- [ ] Real **clinic photos** (replace `<Placeholder>` gallery/doctor/hero stand-ins)
- [ ] **Approved medical disclaimer** (have a medical professional review all copy)
- [ ] **Contact form backend** — implement a channel in `api/contact/route.ts`,
      set env vars in Netlify (e.g. `CONTACT_TO_EMAIL`, `RESEND_API_KEY`,
      `LINE_NOTIFY_TOKEN`); never hardcode secrets
- [ ] **Favicon** (`app/icon.png`) and **OG share image**
- [ ] **Analytics / Facebook Pixel** if desired
- [ ] Re-add verified contact fields to the home-page **JSON-LD** (intentionally
      omitted while placeholders remain)
- [ ] Final **SEO review** (OG images, structured data, Lighthouse)
- [ ] Custom domain + update `siteUrl` (+ redirect netlify.app → custom domain)

> **All business data (phone/LINE/email/address), doctor profiles, and the map
> are PLACEHOLDERS.** Do not present them as real, and do not invent real-looking
> values.

## 13. Reference / Inspiration

- **Aura Bangkok Clinic** is used **only as layout/structure inspiration** —
  do NOT copy its branding, colors, or content.
- The **uploaded ARPAR brochure visuals** are the source of the
  white / cream / gold medical-wellness style and define the brand look.
