import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { BrochureImage } from "@/components/ui/BrochureImage";
import { Button } from "@/components/ui/Button";
import { SparkleGlyph } from "@/components/ui/icons";
import { programs, servicesOverview } from "@/data/content";

const tones = ["gold", "warm", "cool"] as const;

export function FeaturedPrograms() {
  return (
    <section id="programs" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-rail">
        <SectionHeading
          eyebrow="Featured Programs"
          title="Signature programs, designed around you"
          titleTh="โปรแกรมเด่น ออกแบบเฉพาะบุคคล"
          description="Three of our most requested programs — each guided end-to-end by our medical team."
        />

        {/* Full services-overview brochure as a supporting visual */}
        <Reveal className="mx-auto mt-12 max-w-4xl">
          <BrochureImage
            image={servicesOverview}
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </Reveal>

        <div className="mt-16 flex flex-col gap-16 lg:gap-24">
          {programs.map((program, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={program.title}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image */}
                <Reveal
                  className={`relative ${reversed ? "lg:order-last" : ""}`}
                >
                  <Placeholder
                    label={program.title}
                    tone={tones[i % tones.length]}
                    aspect="aspect-[5/4]"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold shadow-soft">
                    {program.tag}
                  </span>
                </Reveal>

                {/* Copy */}
                <Reveal delay={80}>
                  <h3 className="text-balance text-2xl font-semibold leading-snug sm:text-3xl">
                    {program.title}
                  </h3>
                  <p className="mt-2 font-thai text-lg font-medium text-ink-soft">
                    {program.titleTh}
                  </p>
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
                      <Button href={`/services/${program.slug}`} variant="outline">
                        ดูรายละเอียด
                      </Button>
                    )}
                    <Button href="/#contact" variant="ghost">
                      ปรึกษาเกี่ยวกับโปรแกรมนี้
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
