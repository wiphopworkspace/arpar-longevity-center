import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { articles } from "@/data/content";

const tones = ["warm", "cool", "gold"] as const;

export function Articles() {
  // Feature the first article, list the rest
  const [featured, ...rest] = articles;

  return (
    <section id="articles" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-rail">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Articles / Knowledge"
            title="Understanding longevity, one read at a time"
            titleTh="สาระความรู้เพื่อสุขภาพที่ยืนยาว"
          />
          <Reveal>
            <Button href="#articles" variant="ghost">
              ดูบทความทั้งหมด
              <ArrowRight width={16} height={16} />
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {/* Featured */}
          <Reveal>
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/80 bg-white/80 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <Placeholder
                label={featured.title}
                tone="gold"
                aspect="aspect-[16/10]"
                rounded="rounded-none"
                className="border-0 shadow-none"
              />
              <div className="flex flex-1 flex-col p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  {featured.category} · {featured.readingTime}
                </span>
                <h3 className="mt-3 font-heading text-2xl font-semibold leading-snug text-ink">
                  {featured.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">
                  {featured.excerpt}
                </p>
                <a
                  href="#articles"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5"
                >
                  อ่านต่อ
                  <ArrowRight width={16} height={16} />
                </a>
              </div>
            </article>
          </Reveal>

          {/* List */}
          <div className="flex flex-col gap-5">
            {rest.map((article, i) => (
              <Reveal key={article.title} delay={i * 70}>
                <article className="group flex gap-5 rounded-2xl border border-line/80 bg-white/80 p-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-card">
                  <Placeholder
                    label={article.category}
                    tone={tones[i % tones.length]}
                    aspect="aspect-square"
                    rounded="rounded-xl"
                    className="w-28 shrink-0 sm:w-32"
                  />
                  <div className="flex flex-col py-1">
                    <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">
                      {article.category} · {article.readingTime}
                    </span>
                    <h3 className="mt-1.5 font-heading text-base font-semibold leading-snug text-ink group-hover:text-gold">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                      {article.excerpt}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
