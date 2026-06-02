# ARPAR Longevity Center — Website

Premium **bilingual (Thai / English)** website for **ARPAR Longevity Center /
อาภา**, a medical wellness & longevity clinic. Calm, trustworthy, high-end
(white · cream · soft gold). A landing page plus a multi-page **Services**
section, localized under `/th` and `/en`.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom luxury-wellness theme)
- `next/font` — Montserrat (headings) · Inter (body) · Noto Sans Thai
- Lightweight built-in i18n (no extra dependency) — see "Languages" below

## Languages (i18n)

- **Supported locales:** `th` (Thai, **default**) and `en` (English).
- **URL structure** — every page is under a locale segment:
  - `/th`, `/en` (home)
  - `/th/services`, `/en/services`
  - `/th/services/<slug>`, `/en/services/<slug>`
- **Root & legacy redirects** (`src/middleware.ts`): `/` → `/th`,
  `/services` → `/th/services`, `/services/<slug>` → `/th/services/<slug>`.
- **Language switcher** (header, desktop + mobile) swaps only the locale prefix,
  preserving the current page (`/th/services/iv-drip` ↔ `/en/services/iv-drip`).
- **SEO:** per-locale `title`/`description`, `<html lang>`, canonical, and
  `hreflang` alternates (`th`, `en`, `x-default`). Sitemap includes both locales.

### How bilingual content works

`src/data/content.ts` is the single source of truth. Each translatable string is
authored once with the `L(thai, english)` helper, e.g.:

```ts
title: L("ตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล", "Personalized Preventive Checkup"),
```

`getDictionary(locale)` deep-resolves the bilingual `source` tree into a plain,
fully-typed dictionary for one language. Pages do
`const dict = getDictionary(locale)` and pass `{ dict, locale }` to components.
Build locale-aware links with `localePath(locale, "/services")`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint . (ESLint CLI, non-interactive)
npm run lint:fix # eslint . --fix
```

Linting uses the ESLint CLI directly (`eslint .`) with the standard
`next/core-web-vitals` config in `.eslintrc.json`; build/output folders are
excluded via `.eslintignore`.

## Project structure

```
src/
  middleware.ts             # locale redirect (/ → /th, legacy paths → /th/...)
  app/
    globals.css             # design tokens + base styles + utilities
    sitemap.ts              # SEO sitemap (th + en: /, /services, /services/[slug])
    robots.ts               # SEO robots
    api/contact/route.ts    # contact form Route Handler (safe skeleton)
    [locale]/
      layout.tsx            # <html lang>, fonts, per-locale SEO + hreflang
      page.tsx              # localized landing page (sections + JSON-LD)
      services/
        page.tsx            # /<locale>/services index (card grid)
        [slug]/page.tsx     # /<locale>/services/<slug> detail (SSG)
  components/
    layout/                 Header (+ mobile menu), Footer, LanguageSwitcher
    sections/               Hero, BannerSlideshow, BrandPromise, About, Services,
                            FeaturedPrograms, WhyChoose, Doctors, Gallery,
                            Articles, Contact, ContactForm
    services/               ServiceCard
    ui/                     Button, SectionHeading, Reveal, BrandMark,
                            Placeholder, PageHero, CtaBand, BrochureImage, icons
  data/
    content.ts              # ALL editable copy & data (TH+EN) — single source
public/
  images/                   real images (brand, about, services brochures)
```

## Design system

Tokens live in `tailwind.config.ts` and `globals.css`:

| Token            | Value                        |
| ---------------- | ---------------------------- |
| Surfaces         | `#FFFFFF` `#FAF8F2` `#F6F1E8` |
| Primary text     | `#4A4035`                    |
| Secondary text   | `#7A6D5D`                    |
| Gold / light     | `#B89542` / `#C9A646`        |
| Soft gold        | `#E8D7A8`                    |
| Border / divider | `#E6DDCC`                    |

Rounded cards (20–28px), soft shadows, gold gradient CTAs, thin gold dividers,
subtle sparkle/wave decorations.

---

## Editing content (Thai + English)

**Everything editable lives in `src/data/content.ts`.** Translatable text is
authored once with `L(thai, english)`; structural fields (slug, icon, image src,
href) are language-independent. Edit the Thai/English strings inside the `L(...)`
calls and the whole site updates in both languages.

### Update business / contact information

Edit the `site` object in `content.ts` (`phone`, `phoneHref`, `lineId`,
`lineHref`, `facebook`, `email`) and `siteUrl` (production domain). `address` and
`hours` are bilingual (`L(...)`). These feed the Header, Footer, Contact section,
sitemap, robots, and metadata. Items still set to samples are commented
`// PLACEHOLDER`.

### Add a new service (both languages)

Append an object to `source.services` in `content.ts` — note each text field is
bilingual via `L(...)`:

```ts
{
  slug: "my-new-service",            // becomes /<locale>/services/my-new-service
  icon: "leaf" as IconName,          // from components/ui/icons.tsx
  tone: "warm" as Tone,              // "warm" | "cool" | "gold" (placeholder art)
  image: { src: "/images/services/x.webp", alt: L("ไทย", "English"), width: 1280, height: 905 },
  title: L("บริการใหม่", "My New Service"),
  description: L("สรุปสั้น ๆ", "One-line summary used on cards."),
  benefits: L(["ข้อดี 1", "ข้อดี 2"], ["Benefit one", "Benefit two"]),
  overview: L("ย่อหน้าอธิบาย", "Detail-page overview paragraph."),
  whoFor: L(["เหมาะกับ…"], ["Who it's for…"]),
  whatToExpect: L(["ขั้นตอน 1"], ["Step 1"]),
}
```

Both `/th/...` and `/en/...` card grids, detail pages, sitemap, and static
generation pick it up automatically. No new files needed.

### Add a new article (both languages)

Append to `source.articles` in `content.ts` with bilingual fields:
`category: L(...)`, `title: L(...)`, `excerpt: L(...)`, `readingTime: L(...)`.
_(Article detail pages are a future step — see Phase 3.)_

### Add a new localized page

Create it under `src/app/[locale]/your-page/page.tsx`, read the locale from
`params.locale`, call `getDictionary(locale)`, and render `Header`/`Footer` with
`{ dict, locale }`. Build internal links with `localePath(locale, "/your-page")`.

### Testing localized routes

```bash
npm run dev
# then visit:
#   http://localhost:3000/            → redirects to /th
#   http://localhost:3000/th , /en
#   http://localhost:3000/th/services , /en/services
#   http://localhost:3000/th/services/iv-drip , /en/services/iv-drip
#   http://localhost:3000/services    → redirects to /th/services
# Use the TH/EN switcher in the header to confirm context is preserved.
```

---

## Images

- Real images go in `public/images/` and are rendered with **`next/image`**.
- Decorative/section imagery currently uses `<Placeholder>` (an elegant SVG
  stand-in — no broken links). Swap for `next/image` when photography is ready:

  ```tsx
  import Image from "next/image";
  <Image src="/images/hero.jpg" alt="…" fill className="object-cover rounded-3xl" />
  ```

- For remote/CDN images, add the host to `images.remotePatterns` in
  `next.config.mjs`.
- Use descriptive `alt` text and a `sizes` value that matches the real rendered
  width. Example (Brand Promise image, capped at `max-w-xl`):

  ```tsx
  sizes="(max-width: 1024px) 100vw, 36rem"
  ```

### Image optimization note

`next/image` automatically serves resized **WebP/AVIF** in production, so source
JPEGs are not shipped as-is. The brand visual `public/images/arpar-brand-hero.jpg`
is ~251 KB at 1254×1254 — **recommended (optional):** convert the source to
`.webp` to trim the stored asset. Not required for correctness or runtime
performance.

---

## Contact form & backend integration

The form (`components/sections/ContactForm.tsx`) POSTs to the Route Handler at
`src/app/api/contact/route.ts`. The handler is a **safe skeleton**: it validates
required fields, applies a honeypot anti-bot check, and returns clear JSON — but
**does not yet deliver the message anywhere**.

To go live, implement one delivery channel inside the `TODO(integration)` block
in `route.ts`, reading credentials from environment variables (never hard-code
secrets). Create `.env.local` with only the vars for the channel you choose:

```bash
# Example — pick the channel you use:
CONTACT_TO_EMAIL=leads@your-domain.com
RESEND_API_KEY=...            # if sending email via Resend
LINE_NOTIFY_TOKEN=...         # if using LINE Notify
```

No third-party service is connected until you add these and the corresponding
code. Until then the form works end-to-end as a validated demo.

---

## SEO

- Global defaults: `app/layout.tsx` (from `seo` in `content.ts`).
- Per-page metadata: `/services` and each `/services/[slug]` export their own.
- `sitemap.ts` and `robots.ts` use `siteUrl`; sitemap includes `/`, `/services`,
  and every service slug.
- JSON-LD (`MedicalClinic`) is in `app/page.tsx`. **Contact details are
  intentionally omitted** until verified — re-add `telephone`/`email`/`address`/
  `openingHours` once the `site` placeholders are real.

---

## 🚀 Launch checklist (replace before production)

- [ ] **Domain** — set `siteUrl` in `content.ts` to the real production URL.
- [ ] **Phone** — `site.phone` / `site.phoneHref` (currently `02 000 0000`).
- [ ] **LINE** — `site.lineId` / `site.lineHref`.
- [ ] **Facebook** — `site.facebook`.
- [ ] **Email** — `site.email`.
- [ ] **Address & hours** — `site.address`, `site.hours`.
- [ ] **Google Map** — replace the map placeholder in `Contact.tsx` with a real
      embed/iframe for the verified address.
- [ ] **Doctors** — replace the 3 placeholder profiles in `doctors`
      (names/positions/specialties) and remove the placeholder disclaimer in
      `Doctors.tsx` once real.
- [ ] **Doctor photos & clinic gallery** — swap `<Placeholder>` for real
      `next/image` photography (clinic, consultation/treatment rooms, equipment).
- [ ] **Service copy** — review the 8 services; confirm each is accurate for the
      clinic's actual offerings.
- [ ] **JSON-LD** — re-add verified contact fields in `page.tsx`.
- [ ] **Contact form backend** — implement a delivery channel in
      `api/contact/route.ts` and set env vars.
- [ ] **Claims review** — have a medical professional approve all copy.
- [ ] **OG/Twitter image** — add a social share image.
- [ ] **Favicon** — add `app/icon.png` / `app/favicon.ico`.
- [ ] **Analytics** — add GA4 / Facebook Pixel if desired.

### Remaining placeholders (quick reference)

Search `content.ts` for **`PLACEHOLDER`** to find every sample value. Search the
codebase for `<Placeholder` to find every stand-in image, and `[Name Placeholder]`
for doctor profiles.

---

## Notes on copy

Copy is intentionally **wellness-focused and conservative** — it avoids
guarantees, cure claims, percentages, and unverified statistics. It favors
wording like "designed to support", "medical supervision", "personalized care",
and "a consultation is recommended". Keep new copy in the same register, and have
medical content reviewed before launch.
