"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/data/content";

/** Horizontal distance (px) before a drag counts as a slide change. */
const DRAG_THRESHOLD = 45;

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
  const [grabbing, setGrabbing] = useState(false);

  // Drag tracking (refs — no re-render on move).
  const startX = useRef<number | null>(null);
  const suppressClick = useRef(false);

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

  /* ---- Pointer drag / swipe (mouse + touch, unified) ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (!e.isPrimary) return;
    startX.current = e.clientX;
    setGrabbing(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      /* setPointerCapture can throw if the pointer is already released */
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (startX.current === null) {
      setGrabbing(false);
      return;
    }
    const dx = e.clientX - startX.current;
    startX.current = null;
    setGrabbing(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      // A real drag occurred → change slide and suppress the click that the
      // browser fires next, so the slide's Link doesn't navigate.
      suppressClick.current = true;
      if (dx < 0) next();
      else prev();
    }
  };

  const onPointerCancel = () => {
    startX.current = null;
    setGrabbing(false);
  };

  // Capture phase, before the slide Link's click — cancels navigation only when
  // the click was the tail end of a drag.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClick.current = false;
    }
  };

  return (
    <section className="bg-cream-100 pt-24 pb-5 sm:pt-28 sm:pb-6">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        {/* Clean banner — horizontal slide transition; natural brochure ratio (no crop) */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="ARPAR wellness programs"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={endDrag}
          onPointerCancel={onPointerCancel}
          onClickCapture={onClickCapture}
          className={`relative aspect-[1280/905] touch-pan-y select-none overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-100 ${
            grabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Track: a flex row of full-width slides moved by translateX */}
          <div
            className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slides.map((slide, i) => {
              const isActive = i === active;
              return (
                <Link
                  key={slide.href}
                  href={localePath(locale, slide.href)}
                  draggable={false}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? undefined : -1}
                  aria-label={`${slide.title} — view service details`}
                  className={`relative flex-[0_0_100%] ${
                    isActive ? "" : "pointer-events-none"
                  }`}
                >
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    draggable={false}
                    sizes="(max-width: 896px) 100vw, 896px"
                    priority={i === 0}
                    className="object-contain"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Dot pagination — just below the image */}
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
