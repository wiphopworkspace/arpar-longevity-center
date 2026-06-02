"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { bannerSlideshow } from "@/data/content";

const { slides } = bannerSlideshow;
const count = slides.length;

/**
 * Simple, compact hero-style banner slideshow.
 * Image-only slides (clickable → service page), small dot pagination,
 * subtle desktop arrows. Brochure images are shown uncropped via
 * `object-contain` inside a soft cream/gold frame.
 */
export function BannerSlideshow() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((i: number) => setActive(((i % count) + count) % count), []);
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
    <section className="relative bg-cream-100 pt-24 pb-6 sm:pt-28 sm:pb-8">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="ARPAR wellness programs"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="group relative overflow-hidden rounded-3xl border border-gold/30 bg-cream-200/40 shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100"
        >
          {/* Wide banner frame — image stays fully visible (object-contain) */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]">
            {slides.map((slide, i) => {
              const isActive = i === active;
              return (
                <Link
                  key={slide.href}
                  href={slide.href}
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
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    priority={i === 0}
                    className="object-contain"
                  />
                </Link>
              );
            })}
          </div>

          {/* Subtle arrows — desktop only, over the cream side margins */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/80 text-gold opacity-0 shadow-soft backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 lg:flex"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/80 text-gold opacity-0 shadow-soft backdrop-blur-sm transition-all hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 lg:flex"
          >
            <Chevron dir="right" />
          </button>

          {/* Dot pagination — small, bottom-center */}
          <div
            role="tablist"
            aria-label="Slides"
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/70 px-3 py-2 shadow-soft backdrop-blur-sm sm:bottom-4"
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
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}
