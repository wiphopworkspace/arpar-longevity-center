import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BrochureImage } from "@/components/ui/BrochureImage";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Icon, SparkleGlyph, ArrowRight } from "@/components/ui/icons";
import {
  getServiceBySlug,
  getRelatedServices,
  serviceSlugs,
} from "@/data/content";

type Params = { slug: string };

/** Pre-render every service detail page at build time (static generation). */
export function generateStaticParams(): Params[] {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: "Service not found" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | ARPAR Longevity Center`,
      description: service.description,
      url: `/services/${service.slug}`,
    },
  };
}

export default function ServiceDetailPage({ params }: { params: Params }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug, 3);

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Service"
          title={service.title}
          titleTh={service.titleTh}
          description={service.description}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.slug}` },
          ]}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" size="lg">
              ปรึกษาผู้เชี่ยวชาญ
              <ArrowRight width={18} height={18} />
            </Button>
            <Button href="/services" variant="outline" size="lg">
              ดูบริการทั้งหมด
            </Button>
          </div>
        </PageHero>

        {/* Overview text + full uncropped brochure visual */}
        <section className="container-rail py-12 lg:py-16">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">
              <SparkleGlyph width={14} height={14} className="text-gold" />
              Overview
            </span>
            <h2 className="mt-4 text-balance text-2xl font-semibold leading-snug sm:text-3xl">
              A personalized, wellness-focused approach
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-soft">
              {service.overview}
            </p>
          </Reveal>

          <Reveal delay={80} className="mx-auto mt-10 max-w-4xl">
            <BrochureImage
              image={service.image}
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </Reveal>
        </section>

        {/* Who it's for + What to expect */}
        <section className="bg-cream-200/60 py-16 lg:py-20">
          <div className="container-rail grid gap-7 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-line/80 bg-white/80 p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft/40 text-gold">
                  <Icon name="user" width={24} height={24} />
                </span>
                <h2 className="mt-5 font-heading text-xl font-semibold text-ink">
                  Who it&rsquo;s for
                </h2>
                <ul className="mt-5 space-y-3.5">
                  {service.whoFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <SparkleGlyph
                        width={15}
                        height={15}
                        className="mt-1 shrink-0 text-gold"
                      />
                      <span className="text-sm leading-relaxed text-ink">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-line/80 bg-white/80 p-8 shadow-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft/40 text-gold">
                  <Icon name="calendar" width={24} height={24} />
                </span>
                <h2 className="mt-5 font-heading text-xl font-semibold text-ink">
                  What to expect
                </h2>
                <ol className="mt-5 space-y-4">
                  {service.whatToExpect.map((step, i) => (
                    <li key={step} className="flex items-start gap-3.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-xs font-semibold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 text-sm leading-relaxed text-ink">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Key benefits */}
        <section className="container-rail py-16 lg:py-20">
          <Reveal>
            <span className="eyebrow">
              <SparkleGlyph width={14} height={14} className="text-gold" />
              Key Benefits
            </span>
            <h2 className="mt-4 text-balance text-2xl font-semibold sm:text-3xl">
              What this service is designed to support
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit} delay={(i % 3) * 70}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-line/80 bg-white/80 p-6 shadow-soft">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-soft/50 text-gold">
                    <SparkleGlyph width={16} height={16} />
                  </span>
                  <p className="pt-1 text-sm font-medium leading-relaxed text-ink">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Consultation notice */}
        <section className="container-rail pb-4">
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl border border-gold/30 bg-gold-soft/20 p-6 sm:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold shadow-soft">
                <Icon name="stethoscope" width={22} height={22} />
              </span>
              <div>
                <h3 className="font-heading text-base font-semibold text-ink">
                  A consultation is recommended
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  ARPAR services are wellness-focused and provided under medical
                  supervision. Suitability, approach, and expected outcomes are
                  determined on an individual basis during your consultation.
                  This information is for general guidance and is not a
                  substitute for professional medical advice.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Related services */}
        {related.length > 0 && (
          <section className="container-rail py-16 lg:py-20">
            <div className="flex items-end justify-between gap-6">
              <Reveal>
                <span className="eyebrow">
                  <SparkleGlyph width={14} height={14} className="text-gold" />
                  Related Services
                </span>
                <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                  You might also explore
                </h2>
              </Reveal>
              <Reveal>
                <Link
                  href="/services"
                  className="hidden items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5 sm:inline-flex"
                >
                  ดูบริการทั้งหมด
                  <ArrowRight width={16} height={16} />
                </Link>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} delay={(i % 3) * 80} compact />
              ))}
            </div>
          </section>
        )}

        <CtaBand
          title="เริ่มต้นวางแผนสุขภาพของคุณกับ ARPAR"
          subtitle="ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโปรแกรมสุขภาพเฉพาะคุณ"
        />
      </main>
      <Footer />
    </>
  );
}
