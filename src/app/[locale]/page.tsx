import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BannerSlideshow } from "@/components/sections/BannerSlideshow";
import { Hero } from "@/components/sections/Hero";
import { BrandPromise } from "@/components/sections/BrandPromise";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FeaturedPrograms } from "@/components/sections/FeaturedPrograms";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Doctors } from "@/components/sections/Doctors";
import { Gallery } from "@/components/sections/Gallery";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";
import { site, siteUrl, isLocale, getDictionary, type Locale } from "@/data/content";

// Home metadata (title, description, canonical, hreflang alternates) is provided
// by the locale layout's generateMetadata, so no page-level override is needed.

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);

  /* Structured data — verified-only fields (no placeholder contact details). */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.fullName,
    alternateName: site.fullNameTh,
    url: `${siteUrl}/${locale}`,
    description: dict.seo.home.description,
    medicalSpecialty: ["PreventiveMedicine"],
    areaServed: "TH",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header dict={dict} locale={locale} />
      <main>
        <BannerSlideshow dict={dict} locale={locale} />
        <Hero dict={dict} locale={locale} />
        <BrandPromise dict={dict} locale={locale} />
        <About dict={dict} />
        <Services dict={dict} locale={locale} />
        <FeaturedPrograms dict={dict} locale={locale} />
        <WhyChoose dict={dict} />
        <Doctors dict={dict} />
        <Gallery dict={dict} />
        <Articles dict={dict} locale={locale} />
        <Contact dict={dict} locale={locale} />
      </main>
      <Footer dict={dict} locale={locale} />
    </>
  );
}
