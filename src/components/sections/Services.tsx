import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon, ArrowRight } from "@/components/ui/icons";
import { services } from "@/data/content";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-cream-200/60 py-20 lg:py-28"
    >
      <div className="container-rail">
        <SectionHeading
          eyebrow="Our Services"
          title="Comprehensive care for every part of your wellbeing"
          titleTh="บริการดูแลสุขภาพแบบครบวงจร เฉพาะคุณ"
          description="From preventive screening to regenerative wellness, each service is delivered with medical supervision and a personalized approach."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 80}>
              <article className="group flex h-full flex-col rounded-2xl border border-line/80 bg-white/80 p-7 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-soft/40 text-gold transition-colors group-hover:bg-gold-gradient group-hover:text-white">
                  <Icon name={service.icon} width={26} height={26} />
                </span>
                <h3 className="mt-6 font-heading text-lg font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-1 font-thai text-sm text-ink-soft">
                  {service.titleTh}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5"
                >
                  ดูรายละเอียด
                  <ArrowRight width={16} height={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/services" variant="outline" size="lg">
            ดูบริการทั้งหมด
            <ArrowRight width={18} height={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
