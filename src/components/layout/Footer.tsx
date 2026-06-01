import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import {
  LineGlyph,
  PhoneGlyph,
  FacebookGlyph,
  MailGlyph,
  MapPin,
} from "@/components/ui/icons";
import { nav, services, site } from "@/data/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 bg-ink text-cream-200">
      {/* Thin gold top divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container-rail grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <BrandMark light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-200/70">
            Premium longevity &amp; wellness — personalized programs for
            long-term health, vitality, and confidence.
          </p>
          <div className="mt-6 flex gap-3">
            <SocialIcon href={site.lineHref} label="LINE">
              <LineGlyph width={20} height={20} />
            </SocialIcon>
            <SocialIcon href={site.phoneHref} label="Phone">
              <PhoneGlyph width={20} height={20} />
            </SocialIcon>
            <SocialIcon href={site.facebook} label="Facebook">
              <FacebookGlyph width={20} height={20} />
            </SocialIcon>
            <SocialIcon href={`mailto:${site.email}`} label="Email">
              <MailGlyph width={20} height={20} />
            </SocialIcon>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-cream-200">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream-200/70 transition-colors hover:text-gold-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-cream-200">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.title}>
                <Link
                  href="#services"
                  className="text-cream-200/70 transition-colors hover:text-gold-light"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-cream-200">
            Visit us
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-cream-200/70">
            <li className="flex gap-3">
              <MapPin width={18} height={18} className="mt-0.5 shrink-0 text-gold-light" />
              <span className="font-thai leading-relaxed">{site.address}</span>
            </li>
            <li className="flex gap-3">
              <PhoneGlyph width={18} height={18} className="mt-0.5 shrink-0 text-gold-light" />
              <a href={site.phoneHref} className="hover:text-gold-light">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MailGlyph width={18} height={18} className="mt-0.5 shrink-0 text-gold-light" />
              <a href={`mailto:${site.email}`} className="hover:text-gold-light">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rail flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-200/50 sm:flex-row">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <p className="font-thai">
            {site.fullNameTh} · ดูแลสุขภาพแบบองค์รวมเพื่อชีวิตที่ยืนยาว
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream-200/80 transition-all hover:border-gold/60 hover:text-gold-light hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
