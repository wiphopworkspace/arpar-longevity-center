import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore ARPAR Longevity Center's wellness-focused services — from personalized preventive checkups and micronutrient testing to IV drip formulas and regenerative cellular care, all under medical supervision.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | ARPAR Longevity Center",
    description:
      "Personalized, medically supervised longevity & wellness services at ARPAR Longevity Center (อาภา).",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Our Services"
          title="Comprehensive care for every part of your wellbeing"
          titleTh="บริการดูแลสุขภาพแบบครบวงจร เฉพาะคุณ"
          description="From preventive screening to regenerative wellness, each ARPAR service is delivered with medical supervision and a personalized approach. A consultation is recommended to find what suits you best."
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
          ]}
        />

        <section className="container-rail py-12 lg:py-16">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                delay={(i % 3) * 80}
              />
            ))}
          </div>
        </section>

        <CtaBand
          title="เริ่มต้นวางแผนสุขภาพของคุณกับ ARPAR"
          subtitle="ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโปรแกรมสุขภาพเฉพาะคุณ"
        />
      </main>
      <Footer />
    </>
  );
}
