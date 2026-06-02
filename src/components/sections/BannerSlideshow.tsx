"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/data/content";

export function BannerSlideshow({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const slides = dict.bannerSlides;
  const count = slides.length;
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (i: number) => setActive(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section className="bg-cream-100 pt-24 pb-5 sm:pt-28 sm:pb-6">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Clean banner — no card frame; natural brochure ratio (no crop, no letterbox) */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="ARPAR wellness programs"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100"
        >
          <div className="relative aspect-[1280/905]">
            {slides.map((slide, i) => {
              const isActive = i === active;
              return (
                <Link
                  key={slide.href}
                  href={localePath(locale, slide.href)}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? undefined : -1}
                  aria-label={`${slide.title} — view service details`}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority={i === 0}
                    className="object-contain"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dot pagination — just below the image, no added frame height */}
        <div
          role="tablist"
          aria-label="Slides"
          className="mt-3 flex items-center justify-center gap-2"
        >
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <button
                key={slide.href}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${i + 1} of ${count}: ${slide.title}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
                  isActive ? "w-6 bg-gold-gradient" : "w-2 bg-line hover:bg-gold/50"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
