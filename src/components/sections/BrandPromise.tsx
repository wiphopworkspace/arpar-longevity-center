import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SparkleGlyph, ArrowRight } from "@/components/ui/icons";
import { localePath, type Dictionary, type Locale } from "@/data/content";

export function BrandPromise({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const bp = dict.brandPromise;
  return (
    <section
      id="brand-promise"
      className="relative scroll-mt-24 overflow-hidden py-20 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-gold-soft/25 blur-3xl"
      />

      <div className="container-rail grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">
              <SparkleGlyph width={14} height={14} className="text-gold" />
              {bp.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              {bp.title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 font-thai text-lg leading-relaxed text-ink-soft">
              {bp.body}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-9">
              <Button href={localePath(locale, bp.ctaHref)} size="lg">
                {bp.ctaLabel}
                <ArrowRight width={18} height={18} />
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div className="relative mx-auto max-w-xl rounded-3xl border border-gold/30 bg-white p-2 shadow-card sm:p-3">
            <Image
              src={bp.image.src}
              alt={bp.image.alt}
              width={bp.image.width}
              height={bp.image.height}
              sizes="(max-width: 1024px) 100vw, 36rem"
              className="h-auto w-full rounded-2xl"
              priority={false}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 -left-5 -z-10 hidden h-28 w-28 rounded-3xl border border-line bg-cream-200/70 lg:block"
          />
        </Reveal>
      </div>
    </section>
  );
}
