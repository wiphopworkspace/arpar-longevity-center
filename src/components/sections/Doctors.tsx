import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { doctors } from "@/data/content";

export function Doctors() {
  return (
    <section id="doctors" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-rail">
        <SectionHeading
          eyebrow="Our Experts"
          title="Guided by experienced medical professionals"
          titleTh="ทีมแพทย์และผู้เชี่ยวชาญที่ดูแลคุณ"
          description="Every ARPAR program is designed and supervised by qualified medical experts who put your long-term wellbeing first."
        />

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doc, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <article className="group overflow-hidden rounded-3xl border border-line/80 bg-white/80 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <Placeholder
                  label="Doctor / Expert"
                  tone={i === 1 ? "gold" : "warm"}
                  aspect="aspect-[4/5]"
                  rounded="rounded-none"
                  className="border-0 shadow-none"
                />
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-ink">
                    {doc.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold">
                    {doc.position}
                  </p>
                  <div className="mt-3 gold-divider" />
                  <p className="mt-3 text-sm text-ink-soft">{doc.specialty}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-xs text-ink-soft/70">
            * Doctor profiles shown are placeholders and will be updated with the
            ARPAR medical team.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
