import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { SparkleGlyph, ArrowRight } from "@/components/ui/icons";
import { hero } from "@/data/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream-radial pt-32 pb-20 sm:pt-36 lg:pt-40 lg:pb-28"
    >
      {/* Decorative gold glow + sparkles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold-soft/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-gold-soft/20 blur-3xl"
      />
      <SparkleGlyph
        aria-hidden="true"
        className="absolute left-[8%] top-32 hidden text-gold/40 animate-shimmer lg:block"
        width={26}
        height={26}
      />
      <SparkleGlyph
        aria-hidden="true"
        className="absolute right-[12%] bottom-24 hidden text-gold/30 animate-shimmer lg:block"
        width={18}
        height={18}
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container-rail grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <Reveal>
            <span className="eyebrow rounded-full border border-line bg-white/60 px-4 py-2 shadow-soft">
              <SparkleGlyph width={14} height={14} className="text-gold" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 font-thai text-xl font-medium text-ink-soft sm:text-2xl">
              {hero.titleTh}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight width={18} height={18} />
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-line/70 pt-8">
              {hero.stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="font-heading text-lg font-semibold text-gold sm:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={160} className="relative">
          <div className="relative">
            <Placeholder
              label="Doctor & patient consultation"
              tone="warm"
              aspect="aspect-[4/5]"
              className="animate-float"
            />
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-2xl border border-line bg-white/90 p-5 shadow-card backdrop-blur-sm sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-soft/50 text-gold">
                  <SparkleGlyph width={20} height={20} />
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-ink">
                    Personalized plan
                  </p>
                  <p className="text-xs text-ink-soft">Designed around you</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
