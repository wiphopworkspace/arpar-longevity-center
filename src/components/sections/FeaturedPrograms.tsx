import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { BrochureImage } from "@/components/ui/BrochureImage";
import { Button } from "@/components/ui/Button";
import { SparkleGlyph } from "@/components/ui/icons";
import { localePath, type Dictionary, type Locale } from "@/data/content";

const tones = ["gold", "warm", "cool"] as const;

export function FeaturedPrograms({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const section = dict.programsSection;
  return (
    <section id="programs" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-rail">
        <SectionHeading
          eyebrow={section.eyebrow}
          title={section.title}
          description={section.description}
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <BrochureImage
            image={dict.programsBanner}
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {dict.programs.map((program, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={program.slug ?? program.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal className={`relative ${reversed ? "lg:order-last" : ""}`}>
                  <Placeholder
                    label={program.title}
                    tone={tones[i % tones.length]}
                    aspect="aspect-[5/4]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold shadow-soft">
                    {program.tag}
                  </span>
                </Reveal>

                <Reveal delay={80}>
                  <h3 className="text-balance text-2xl font-semibold leading-snug sm:text-3xl">
                    {program.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    {program.description}
                  </p>

                  <ul className="mt-7 space-y-3.5">
                    {program.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-soft/50 text-gold">
                          <SparkleGlyph width={15} height={15} />
                        </span>
                        <span className="text-sm font-medium text-ink">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap gap-3">
                    {program.slug && (
                      <Button
                        href={localePath(locale, `/services/${program.slug}`)}
                        variant="outline"
                      >
                        {dict.ui.learnMore}
                      </Button>
                    )}
                    <Button href={localePath(locale, "/#contact")} variant="ghost">
                      {dict.ui.consultAboutProgram}
                    </Button>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
