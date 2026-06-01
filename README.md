# ARPAR Longevity Center — Website

Premium website for **ARPAR Longevity Center / อาภา**, a medical wellness &
longevity clinic. Calm, trustworthy, high-end (white · cream · soft gold).
Currently a landing page plus a multi-page **Services** section, structured to
keep growing.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom luxury-wellness theme)
- `next/font` — Montserrat (headings) · Inter (body) · Noto Sans Thai

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
  app/
    layout.tsx              # fonts + global SEO metadata (from content.ts)
    page.tsx                # landing page (sections + JSON-LD)
    globals.css             # design tokens + base styles + utilities
    sitemap.ts              # SEO sitemap (/, /services, /services/[slug])
    robots.ts               # SEO robots
    services/
      page.tsx              # /services index (card grid)
      [slug]/page.tsx       # /services/<slug> detail (static-generated)
    api/
      contact/route.ts      # contact form Route Handler (safe skeleton)
  components/
    layout/                 Header (sticky + mobile menu), Footer
    sections/               Hero, BrandPromise, About, Services,
                            FeaturedPrograms, WhyChoose, Doctors, Gallery,
                            Articles, Contact, ContactForm
    services/               ServiceCard
    ui/                     Button, SectionHeading, Reveal, BrandMark,
                            Placeholder, PageHero, CtaBand, icons
  data/
    content.ts              # ALL editable copy & data — single source of truth
public/
  images/                   real images (e.g. arpar-brand-hero.jpg)
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

## Editing content

**Everything editable lives in `src/data/content.ts`.** Change text there and the
whole site updates. Key exports: `site`, `cta`, `seo`, `siteUrl`, `nav`, `hero`,
`brandPromise`, `about`, `services`, `programs`, `reasons`, `doctors`, `gallery`,
`articles`, `contact`.

### Update business / contact information

Edit the `site` object in `content.ts` (`phone`, `phoneHref`, `lineId`,
`lineHref`, `facebook`, `email`, `address`, `hours`) and `siteUrl` (production
domain). These feed the Header, Footer, Contact section, sitemap, robots, and
metadata. Items still set to samples are commented `// PLACEHOLDER`.

### Add a new service

Append an object to the `services` array in `content.ts`:

```ts
{
  slug: "my-new-service",      // becomes /services/my-new-service
  icon: "leaf",                // an IconName from components/ui/icons.tsx
  tone: "warm",                // "warm" | "cool" | "gold" (placeholder art)
  title: "My New Service",
  titleTh: "บริการใหม่",
  description: "One-line summary used on cards.",
  benefits: ["Benefit one", "Benefit two", "Benefit three"],
  overview: "Detail-page overview paragraph.",
  whoFor: ["Who it's for line 1", "line 2"],
  whatToExpect: ["Step 1", "Step 2", "Step 3"],
}
```

The card grid, the dynamic detail page, the sitemap, and static generation all
pick it up automatically. No new files needed.

### Add a new article

Append to the `articles` array in `content.ts` (`category`, `title`, `excerpt`,
`readingTime`). _(Article detail pages are a future step — see Phase 3.)_

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
