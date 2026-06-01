import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SparkleGlyph } from "./icons";

type Crumb = { label: string; href: string };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  titleTh?: string;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
};

/**
 * Subpage hero. Includes top padding to clear the fixed header,
 * a soft gold glow, optional breadcrumbs, and the shared heading style.
 */
export function PageHero({
  eyebrow,
  title,
  titleTh,
  description,
  breadcrumbs,
  children,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-cream-radial pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-soft/25 blur-3xl"
      />
      <SparkleGlyph
        aria-hidden="true"
        className="absolute left-[8%] top-36 hidden text-gold/40 animate-shimmer lg:block"
        width={22}
        height={22}
      />

      <div className="container-rail relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                {breadcrumbs.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 && <span className="text-line">/</span>}
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-gold"
                    >
                      {crumb.label}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <span className="eyebrow">
                <SparkleGlyph width={14} height={14} className="text-gold" />
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={60}>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          {titleTh && (
            <Reveal delay={110}>
              <p className="mt-4 font-thai text-xl font-medium text-ink-soft">
                {titleTh}
              </p>
            </Reveal>
          )}
          {description && (
            <Reveal delay={160}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {description}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={220}>
              <div className="mt-8">{children}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
