"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { localePath, type Dictionary, type Locale } from "@/data/content";

export function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const home = localePath(locale, "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-line/70 bg-cream-100/85 backdrop-blur-md shadow-soft"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-rail flex h-20 items-center justify-between">
          <Link href={home} aria-label="ARPAR Longevity Center — home">
            <BrandMark />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {dict.nav.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className="relative text-sm font-medium text-ink/80 transition-colors hover:text-gold after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher locale={locale} />
            <Button href={localePath(locale, dict.cta.href)} size="md">
              {dict.cta.label}
            </Button>
          </div>

          {/* Mobile open toggle */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col items-center justify-center gap-[5px]">
              <span className="h-0.5 w-5 bg-ink" />
              <span className="h-0.5 w-5 bg-ink" />
              <span className="h-0.5 w-5 bg-ink" />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile menu overlay (sibling of header → not under backdrop-filter) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[999] overflow-y-auto bg-cream-100 transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-rail flex min-h-dvh flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between">
            <Link href={home} aria-label="ARPAR Longevity Center — home" onClick={close}>
              <BrandMark />
            </Link>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/70 text-ink transition-colors hover:text-gold"
            >
              <span className="sr-only">Close</span>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 pb-12 pt-4" aria-label="Mobile">
            {dict.nav.map((item, i) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                onClick={close}
                className="border-b border-line/60 py-4 font-heading text-lg font-medium text-ink transition-colors hover:text-gold"
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-medium text-ink-soft">ภาษา / Language</span>
              <LanguageSwitcher locale={locale} onNavigate={close} />
            </div>

            <Button
              href={localePath(locale, dict.cta.href)}
              size="lg"
              className="mt-6 w-full"
              onClick={close}
            >
              {dict.cta.label}
            </Button>
          </nav>
        </div>
      </div>
    </>
  );
}
