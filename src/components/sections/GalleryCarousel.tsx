"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SparkleGlyph, ArrowRight } from "@/components/ui/icons";
import { galleryCarousel } from "@/data/content";

const { eyebrow, title, description, cta, slides } = galleryCarousel;
const count = slides.length;

export function GalleryCarousel() {
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

  // Practical mobile swipe support.
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  const current = slides[active];

  return (
    <section
      aria-label="ARPAR wellness programs gallery"
      className="relative bg-cream-100 pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16"
    >
      {/* Soft gold glow to match the premium top-of-page mood */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold-soft/25 blur-3xl"
      />

      <div className="container-rail relative">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow">
              <SparkleGlyph width={14} height={14} className="text-gold" />
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              {description}
            </p>
          </Reveal>
        </div>

        {/* Carousel */}
        <Reveal
          delay={120}
          as="div"
          className="mx-auto mt-10 max-w-4xl"
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={title}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100"
          >
            {/* Image frame — brochure shown uncropped (natural aspect ratio) */}
            <div className="overflow-hidden rounded-3xl border border-gold/30 bg-white p-2 shadow-card sm:p-3">
              <div className="overflow-hidden rounded-2xl">
                <div
                  className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ transform: `translateX(-${active * 100}%)` }}
                >
                  {slides.map((slide, i) => {
                    const isActive = i === active;
                    return (
                      <Link
                        key={slide.href}
                        href={slide.href}
                        className="block w-full shrink-0 basis-full"
                        aria-label={`${slide.title} — view service details`}
                        aria-hidden={!isActive}
                        tabIndex={isActive ? undefined : -1}
                      >
                        <Image
                          src={slide.image.src}
                          alt={slide.image.alt}
                          width={slide.image.width}
                          height={slide.image.height}
                          sizes="(max-width: 896px) 100vw, 896px"
                          priority={i === 0}
                          className="h-auto w-full"
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Active slide caption + CTA */}
          <div className="mx-auto mt-7 max-w-2xl text-center">
            <h3 className="font-heading text-xl font-semibold text-ink">
              {current.title}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink-soft">
              {current.description}
            </p>
            <div className="mt-5 flex justify-center">
              <Button href={current.href} size="md">
                {cta}
                <ArrowRight width={16} height={16} />
              </Button>
            </div>
          </div>

          {/* Controls: prev · dots · next */}
          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-all hover:-translate-x-0.5 hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              <Chevron dir="left" />
            </button>

            <div className="flex items-center gap-2.5" role="tablist" aria-label="Slides">
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
                    className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
                      isActive
                        ? "w-7 bg-gold-gradient"
                        : "w-2.5 bg-line hover:bg-gold/50"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold transition-all hover:translate-x-0.5 hover:bg-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              <Chevron dir="right" />
            </button>
          </div>
        </Reveal>
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
