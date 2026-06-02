import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";
import { type Dictionary } from "@/data/content";

export function WhyChoose({ dict }: { dict: Dictionary }) {
  const section = dict.whyChoose;
  return (
    <section className="relative scroll-mt-24 overflow-hidden bg-ink py-20 text-cream-200 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="container-rail relative">
        <div className="flex flex-col items-center gap-4 text-center">
          <Reveal>
            <span className="eyebrow text-gold-light">{section.eyebrow}</span>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {section.title}
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="max-w-2xl font-thai text-lg text-cream-200/70">
              {section.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {dict.reasons.map((reason, i) => (
            <Reveal key={reason.title} delay={(i % 5) * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-white/[0.07]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/30 p-3 text-gold-light">
                  <Icon name={reason.icon} width={24} height={24} />
                </span>
                <h3 className="mt-5 font-heading text-base font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-200/65">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
