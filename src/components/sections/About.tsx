import { Reveal } from "@/components/ui/Reveal";
import { BrochureImage } from "@/components/ui/BrochureImage";
import { SparkleGlyph } from "@/components/ui/icons";
import { about } from "@/data/content";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-rail">
        {/* Concise live intro (kept short — the brochure below carries detail) */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow">
              <SparkleGlyph width={14} height={14} className="text-gold" />
              {about.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              {about.title}
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-3 font-thai text-lg font-medium text-ink-soft">
              {about.titleTh}
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              {about.lead}
            </p>
          </Reveal>

          {/* Short, scannable category tags (not a copy of the brochure text) */}
          <Reveal delay={220}>
            <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
              {about.points.map((point) => (
                <li
                  key={point}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-2 text-sm font-medium text-ink shadow-soft"
                >
                  <SparkleGlyph width={13} height={13} className="text-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Full-width poster brochure — uncropped, readable on all widths */}
        <Reveal delay={120} className="mx-auto mt-12 max-w-4xl lg:mt-14">
          <BrochureImage
            image={about.image}
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </Reveal>
      </div>
    </section>
  );
}
