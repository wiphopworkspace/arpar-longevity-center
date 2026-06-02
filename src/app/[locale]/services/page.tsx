import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { ServiceCard } from "@/components/services/ServiceCard";
import {
  siteUrl,
  isLocale,
  getDictionary,
  localePath,
  type Locale,
} from "@/data/content";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = (isLocale(params.locale) ? params.locale : "th") as Locale;
  const dict = getDictionary(locale);
  return {
    title: dict.seo.services.title,
    description: dict.seo.services.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/services`,
      languages: {
        th: `${siteUrl}/th/services`,
        en: `${siteUrl}/en/services`,
        "x-default": `${siteUrl}/th/services`,
      },
    },
    openGraph: {
      title: `${dict.seo.services.title} | ARPAR Longevity Center`,
      description: dict.seo.services.description,
      url: `${siteUrl}/${locale}/services`,
    },
  };
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Header dict={dict} locale={locale} />
      <main>
        <PageHero
          eyebrow={dict.servicesPage.eyebrow}
          title={dict.servicesPage.title}
          description={dict.servicesPage.description}
          breadcrumbs={[
            { label: dict.ui.home, href: localePath(locale, "/") },
            { label: dict.ui.services, href: localePath(locale, "/services") },
          ]}
        />

        <section className="container-rail py-12 lg:py-16">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {dict.services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                service={service}
                dict={dict}
                locale={locale}
                delay={(i % 3) * 80}
              />
            ))}
          </div>
        </section>

        <CtaBand
          dict={dict}
          locale={locale}
          title={dict.ctaBand.title}
          subtitle={dict.ctaBand.subtitle}
        />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
