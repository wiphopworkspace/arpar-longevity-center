import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BrandPromise } from "@/components/sections/BrandPromise";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FeaturedPrograms } from "@/components/sections/FeaturedPrograms";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Doctors } from "@/components/sections/Doctors";
import { Gallery } from "@/components/sections/Gallery";
import { Articles } from "@/components/sections/Articles";
import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { site, siteUrl, seo } from "@/data/content";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* Structured data — helps search engines understand the business.
   NOTE: only verified, non-sensitive fields are included. Contact
   details (telephone, email, address, openingHours) are intentionally
   OMITTED until real business data is confirmed — add them here once
   the PLACEHOLDER values in content.ts are replaced. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: site.fullName,
  alternateName: site.fullNameTh,
  url: siteUrl,
  description: seo.description,
  medicalSpecialty: ["PreventiveMedicine"],
  areaServed: "TH",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <BrandPromise />
        <About />
        <Services />
        <FeaturedPrograms />
        <WhyChoose />
        <Doctors />
        <Gallery />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
