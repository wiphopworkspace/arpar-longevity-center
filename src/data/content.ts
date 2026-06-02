/* ============================================================
   ARPAR Longevity Center — Site content
   SINGLE SOURCE OF TRUTH for all editable copy & data.
   Edit text, services, programs, doctors, gallery, or articles
   here and the whole site (landing page + /services pages)
   updates automatically.

   ⚠️  Many values below are PLACEHOLDERS pending real client
   data — see the "Launch checklist" in README.md. Search for
   the word "PLACEHOLDER" to find items that must be replaced
   before production.
   ============================================================ */

import type { IconName } from "@/components/ui/icons";

/** Canonical production URL — used by metadata, sitemap, robots, JSON-LD.
 *  Live Netlify deployment (update if a custom domain is added later). */
export const siteUrl = "https://arpar-longevity-center.netlify.app";

export const site = {
  name: "ARPAR",
  nameTh: "อาภา",
  fullName: "ARPAR Longevity Center",
  fullNameTh: "อาภา Longevity Center",
  tagline: "Longevity & Wellness",
  url: siteUrl,
  // --- Contact details (PLACEHOLDER — replace with verified info) ---
  phone: "02 000 0000", // PLACEHOLDER
  phoneHref: "tel:+6620000000", // PLACEHOLDER
  lineId: "@arparlongevity", // PLACEHOLDER
  lineHref: "https://line.me/R/ti/p/@arparlongevity", // PLACEHOLDER
  facebook: "https://facebook.com/arparlongevity", // PLACEHOLDER
  email: "care@arpar-longevity.com", // PLACEHOLDER
  address: "ชั้น 3 อาคารตัวอย่าง ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110", // PLACEHOLDER
  hours: "ทุกวัน 09:00 – 19:00 น.", // PLACEHOLDER
};

/** Primary call-to-action reused across header & sections. */
export const cta = {
  label: "ปรึกษาผู้เชี่ยวชาญ",
  href: "/#contact",
};

/** Default SEO metadata (page-level metadata can override). */
export const seo = {
  defaultTitle:
    "ARPAR Longevity Center | อาภา — Personalized Longevity & Wellness",
  titleTemplate: "%s | ARPAR Longevity Center",
  description:
    "ARPAR Longevity Center (อาภา) — a premium medical wellness clinic offering personalized longevity, regenerative, and preventive health programs designed to support long-term vitality.",
  keywords: [
    "longevity",
    "wellness",
    "regenerative medicine",
    "anti-aging",
    "preventive health",
    "IV drip",
    "ARPAR",
    "อาภา",
  ],
  locale: "th_TH",
  alternateLocale: "en_US",
};

export type NavItem = { label: string; href: string };

/** Root-relative hrefs so navigation works from any page (home or /services). */
export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Programs", href: "/#programs" },
  { label: "Articles", href: "/#articles" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  eyebrow: "ARPAR Longevity Center · อาภา",
  title: "ARPAR Longevity Center",
  titleTh: "เติมเต็มพลังชีวิต ด้วยโปรแกรมสุขภาพเหนือระดับ",
  subtitle:
    "Personalized Longevity & Wellness Programs designed to support long-term health, vitality, and confidence.",
  primaryCta: { label: "ปรึกษาผู้เชี่ยวชาญ", href: "/#contact" },
  secondaryCta: { label: "ดูบริการของเรา", href: "/services" },
  // Qualitative trust badges (no unverified numbers/percentages).
  stats: [
    { value: "Tailored", label: "Personalized care plans" },
    { value: "Medical", label: "Supervised programs" },
    { value: "Holistic", label: "Whole-body wellness" },
  ],
};

/** A real image asset with required alt text and intrinsic dimensions
 *  (dimensions let next/image reserve space and avoid layout shift). */
export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const brandPromise = {
  eyebrow: "Our Promise",
  titleEn: "A Healthier Life, A Longer Journey Together",
  bodyTh:
    "อาภาเชื่อว่าการมีสุขภาพที่ดี เริ่มจากการดูแลร่างกายอย่างเข้าใจ เพื่อให้คุณมีพลัง แข็งแรง และมีความสุขในทุกวัน",
  imageSrc: "/images/brand/arpar-brand-hero.webp",
  imageAlt:
    "ARPAR Longevity Center brand visual promoting healthy and happy longevity",
  ctaLabel: "ปรึกษาผู้เชี่ยวชาญ",
  ctaHref: "/#contact",
};

/** Full services overview brochure — used as a supporting visual. */
export const servicesOverview: SiteImage = {
  src: "/images/services/service-overview.webp",
  alt: "Overview of ARPAR Longevity Center wellness services and overall health program concept",
  width: 1280,
  height: 905,
};

export type CarouselSlide = {
  title: string;
  description: string;
  image: SiteImage;
  href: string;
};

/** Top-of-homepage program carousel (brochure visuals → service pages). */
export const galleryCarousel = {
  eyebrow: "Wellness Programs",
  title: "Explore ARPAR Wellness Programs",
  description:
    "A closer look at our signature programs — browse through and open any visual to explore the full service.",
  cta: "ดูรายละเอียดบริการ",
  slides: [
    {
      title: "Hormone Balance & HRT",
      description:
        "Personalized, medically supervised hormone and weight-management care designed to support everyday wellbeing.",
      image: {
        src: "/images/services/hormone-hrt-weight-management.webp",
        alt: "ARPAR hormone balance, HRT and weight management program brochure",
        width: 1280,
        height: 905,
      },
      href: "/services/hormone-balance-hrt",
    },
    {
      title: "IV Drip & Micronutrients",
      description:
        "Curated IV drip formulas and micronutrient-guided supplementation to support hydration, energy, and recovery.",
      image: {
        src: "/images/services/micronutrients-iv-drip.webp",
        alt: "ARPAR micronutrients, personalized supplements and IV drip formulas brochure",
        width: 1280,
        height: 905,
      },
      href: "/services/iv-drip",
    },
    {
      title: "Stem Cell & Preventive Checkup",
      description:
        "Regenerative cellular wellness and tailored preventive screening, planned and supervised by our medical team.",
      image: {
        src: "/images/services/stem-cell-preventive-checkup.webp",
        alt: "ARPAR stem cell, NK cell and personalized preventive checkup brochure",
        width: 1280,
        height: 905,
      },
      href: "/services/stem-cell-nk-cell",
    },
  ] satisfies CarouselSlide[],
};

export const about = {
  eyebrow: "About ARPAR",
  title: "A holistic center for longevity and lasting vitality",
  titleTh: "ศูนย์ดูแลสุขภาพแบบองค์รวม เพื่อชีวิตที่ยืนยาวอย่างมีคุณภาพ",
  // Concise brand intro. The full positioning, services & vision live in the
  // brochure image below it (see `about.image`) — kept short to avoid
  // duplicating the brochure's embedded text.
  lead: "ARPAR Longevity Center (อาภา) brings together longevity medicine, regenerative wellness, and personalized care — a calm, considered home for your long-term health.",
  points: [
    "Longevity & preventive medicine",
    "Regenerative & cellular wellness",
    "Personalized, data-guided care",
  ],
  // Brochure visual summarizing ARPAR's positioning, services & vision.
  image: {
    src: "/images/about/arpar-about-longevity-clinic.webp",
    alt: "About ARPAR Longevity Center — overview of the clinic's holistic care concept, services, and vision",
    width: 1280,
    height: 905,
  } satisfies SiteImage,
};

export type Service = {
  slug: string;
  icon: IconName;
  tone: "warm" | "cool" | "gold";
  title: string;
  titleTh: string;
  /** Short one-line summary used on cards. */
  description: string;
  /** Key benefits (kept wellness-focused, no guarantees). */
  benefits: string[];
  /** Detail-page overview paragraph. */
  overview: string;
  /** Who the service is suitable for. */
  whoFor: string[];
  /** What a client can expect during the journey. */
  whatToExpect: string[];
  /** Brochure visual for the detail page (alt is page-specific even when
   *  the same brochure is shared by related services). */
  image: SiteImage;
};

export const services: Service[] = [
  {
    slug: "stem-cell-nk-cell",
    image: {
      src: "/images/services/stem-cell-preventive-checkup.webp",
      alt: "ARPAR Stem Cell & NK Cell information sheet on regenerative cellular and immune wellness care",
      width: 1280,
      height: 905,
    },
    icon: "cell",
    tone: "gold",
    title: "Stem Cell & NK Cell",
    titleTh: "สเต็มเซลล์ และ NK Cell",
    description:
      "Regenerative cellular programs designed to support recovery, immunity, and long-term vitality under medical supervision.",
    benefits: [
      "Wellness-focused, regenerative approach",
      "Designed to support immunity & recovery",
      "Delivered under medical supervision",
    ],
    overview:
      "Our regenerative and cellular wellness programs are designed to support the body's natural recovery and resilience. Each program begins with a thorough medical assessment, and care is planned and supervised by experienced professionals. A consultation is recommended to determine whether this approach is suitable for you.",
    whoFor: [
      "Those interested in regenerative wellness approaches",
      "People focused on long-term vitality and recovery",
      "Anyone seeking medically supervised cellular care",
    ],
    whatToExpect: [
      "Initial consultation and medical assessment",
      "A personalized plan based on your goals and history",
      "Supervised care with ongoing follow-up",
    ],
  },
  {
    slug: "preventive-checkup",
    image: {
      src: "/images/services/stem-cell-preventive-checkup.webp",
      alt: "ARPAR Personalized Preventive Checkup information sheet on tailored, risk-based health screening",
      width: 1280,
      height: 905,
    },
    icon: "checkup",
    tone: "warm",
    title: "Personalized Preventive Checkup",
    titleTh: "ตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล",
    description:
      "In-depth health screening tailored to your history and goals — so prevention can start before symptoms appear.",
    benefits: [
      "Screening tailored to your history",
      "One-on-one doctor consultation",
      "Clear, personalized health plan",
    ],
    overview:
      "A Personalized Preventive Checkup gives you a clear picture of your health today, with a long-term plan designed around your biology, lifestyle, and goals. Our medical team reviews your results with you and recommends next steps focused on prevention and balance.",
    whoFor: [
      "Anyone wanting a proactive view of their health",
      "People planning for long-term wellbeing",
      "Those who prefer prevention over reaction",
    ],
    whatToExpect: [
      "A tailored screening panel",
      "A one-on-one consultation to review results",
      "A personalized long-term health plan",
    ],
  },
  {
    slug: "micronutrient-test",
    image: {
      src: "/images/services/micronutrients-iv-drip.webp",
      alt: "ARPAR Micronutrient Test information sheet on cellular nutrient analysis and personalized supplementation",
      width: 1280,
      height: 905,
    },
    icon: "flask",
    tone: "cool",
    title: "Micronutrient Test",
    titleTh: "ตรวจวิเคราะห์วิตามินและแร่ธาตุ",
    description:
      "Understand your vitamin, mineral, and antioxidant balance to help guide precise, personalized supplementation.",
    benefits: [
      "Insight into your nutrient balance",
      "Helps guide precise supplementation",
      "Personalized to your results",
    ],
    overview:
      "Micronutrient testing helps you understand your vitamin, mineral, and antioxidant balance. The results turn guesswork into a clearer, more personal plan, and can help guide supplementation and lifestyle choices with your care team.",
    whoFor: [
      "People considering personalized supplementation",
      "Those wanting clarity on their nutrient status",
      "Anyone building a data-guided wellness plan",
    ],
    whatToExpect: [
      "A straightforward testing process",
      "A review of your results with our team",
      "Recommendations tailored to your needs",
    ],
  },
  {
    slug: "personalized-supplements",
    image: {
      src: "/images/services/micronutrients-iv-drip.webp",
      alt: "ARPAR Personalized Supplements information sheet on test-based, medically reviewed supplement guidance",
      width: 1280,
      height: 905,
    },
    icon: "capsule",
    tone: "warm",
    title: "Personalized Supplements",
    titleTh: "อาหารเสริมเฉพาะบุคคล",
    description:
      "Supplement guidance matched to your test results and lifestyle, reviewed by our medical team.",
    benefits: [
      "Matched to your test results",
      "Reviewed by our medical team",
      "Built around your lifestyle",
    ],
    overview:
      "Rather than a one-size-fits-all approach, our personalized supplement guidance is matched to your test results and daily routine, and reviewed by our medical team. The goal is thoughtful, appropriate support — not excess.",
    whoFor: [
      "Those who have completed micronutrient testing",
      "People seeking considered, personalized guidance",
      "Anyone wanting medically reviewed recommendations",
    ],
    whatToExpect: [
      "A review of your goals and any test results",
      "Personalized, medically reviewed guidance",
      "Follow-up to adjust as your needs change",
    ],
  },
  {
    slug: "iv-drip",
    image: {
      src: "/images/services/micronutrients-iv-drip.webp",
      alt: "ARPAR IV Drip Formulas information sheet on personalized intravenous vitamin and wellness support",
      width: 1280,
      height: 905,
    },
    icon: "drip",
    tone: "cool",
    title: "IV Drip Formulas",
    titleTh: "วิตามินดริปเฉพาะบุคคล",
    description:
      "Curated IV formulas to support hydration, energy, and recovery as part of a balanced wellness routine.",
    benefits: [
      "Formulas matched to your needs",
      "Comfortable, calm treatment rooms",
      "Administered by medical staff",
    ],
    overview:
      "Our IV drip formulas are designed to support hydration, energy, and recovery as part of a balanced, medically guided wellness routine. Each formula is selected with your needs in mind, and treatments are administered by medical staff in calm, private rooms.",
    whoFor: [
      "People looking to support hydration and energy",
      "Those who prefer a calm, supervised setting",
      "Anyone complementing a broader wellness plan",
    ],
    whatToExpect: [
      "A short consultation to choose a suitable formula",
      "A comfortable treatment in a private room",
      "Guidance on frequency that fits your routine",
    ],
  },
  {
    slug: "hormone-balance-hrt",
    image: {
      src: "/images/services/hormone-hrt-weight-management.webp",
      alt: "ARPAR Hormone Balance & HRT information sheet on personalized, medically supervised hormone wellness",
      width: 1280,
      height: 905,
    },
    icon: "balance",
    tone: "gold",
    title: "Hormone Balance & HRT",
    titleTh: "ดูแลสมดุลฮอร์โมน",
    description:
      "Thoughtful hormone assessment and balancing designed to support energy, mood, sleep, and quality of life.",
    benefits: [
      "Careful, individual assessment",
      "Designed to support everyday wellbeing",
      "Medically supervised throughout",
    ],
    overview:
      "Hormone balance can influence energy, mood, sleep, and overall quality of life. Our thoughtful assessment and balancing approach is medically supervised and personalized. A consultation is recommended to understand what is appropriate for you.",
    whoFor: [
      "People noticing changes in energy, mood, or sleep",
      "Those seeking a careful, supervised approach",
      "Anyone planning for long-term wellbeing",
    ],
    whatToExpect: [
      "A detailed consultation and assessment",
      "A personalized, medically supervised plan",
      "Ongoing monitoring and follow-up",
    ],
  },
  {
    slug: "weight-management",
    image: {
      src: "/images/services/hormone-hrt-weight-management.webp",
      alt: "ARPAR Weight Management Program information sheet on sustainable, medically guided weight care",
      width: 1280,
      height: 905,
    },
    icon: "leaf",
    tone: "warm",
    title: "Weight Management Program",
    titleTh: "โปรแกรมดูแลน้ำหนัก",
    description:
      "Sustainable, medically guided weight programs built around your metabolism and daily routine.",
    benefits: [
      "Sustainable, realistic approach",
      "Built around your metabolism",
      "Medically guided support",
    ],
    overview:
      "Our weight management programs focus on sustainable, realistic change rather than quick fixes. Built around your metabolism and daily routine and guided by our medical team, the aim is steady progress you can maintain.",
    whoFor: [
      "People seeking a sustainable approach to weight",
      "Those who value medical guidance and structure",
      "Anyone focused on long-term healthy habits",
    ],
    whatToExpect: [
      "An assessment of your goals and lifestyle",
      "A personalized, medically guided plan",
      "Regular check-ins to support your progress",
    ],
  },
  {
    slug: "skin-beauty-recovery",
    image: {
      src: "/images/services/service-overview.webp",
      alt: "ARPAR services overview including skin and beauty recovery within the overall wellness program",
      width: 1280,
      height: 905,
    },
    icon: "sparkleFace",
    tone: "gold",
    title: "Skin & Beauty Recovery",
    titleTh: "ฟื้นฟูผิวพรรณและความงาม",
    description:
      "Gentle, restorative skin and beauty care that complements your inner-health journey.",
    benefits: [
      "Gentle, restorative approach",
      "Complements inner-health care",
      "Personalized to your skin",
    ],
    overview:
      "Skin and beauty recovery at ARPAR is gentle and restorative, designed to complement your broader inner-health journey. Care is personalized to your skin and goals, with an emphasis on a calm, considered experience.",
    whoFor: [
      "Those wanting restorative skin and beauty care",
      "People pairing outer care with inner health",
      "Anyone seeking a gentle, personalized approach",
    ],
    whatToExpect: [
      "A consultation to understand your skin and goals",
      "A personalized, gentle care plan",
      "Guidance to maintain results over time",
    ],
  },
];

/** Helpers for service pages. */
export const serviceSlugs = services.map((s) => s.slug);
export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
export const getRelatedServices = (slug: string, count = 3) =>
  services.filter((s) => s.slug !== slug).slice(0, count);

export type Program = {
  /** Links to the matching service detail page when set. */
  slug?: string;
  tag: string;
  title: string;
  titleTh: string;
  description: string;
  bullets: string[];
};

export const programs: Program[] = [
  {
    slug: "preventive-checkup",
    tag: "Preventive",
    title: "Personalized Preventive Checkup",
    titleTh: "ตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล",
    description:
      "A comprehensive picture of your health today, with a clear plan for tomorrow — designed around your biology and goals.",
    bullets: [
      "Tailored screening panel",
      "One-on-one doctor consultation",
      "Personalized long-term health plan",
    ],
  },
  {
    slug: "iv-drip",
    tag: "Vitality",
    title: "IV Drip Formulas",
    titleTh: "วิตามินดริปเฉพาะบุคคล",
    description:
      "Carefully composed IV formulas designed to support energy, hydration, and recovery as part of a balanced wellness routine.",
    bullets: [
      "Formulas matched to your needs",
      "Comfortable, calm treatment rooms",
      "Administered by medical staff",
    ],
  },
  {
    slug: "stem-cell-nk-cell",
    tag: "Regenerative",
    title: "Stem Cell & NK Cell",
    titleTh: "สเต็มเซลล์ และ NK Cell",
    description:
      "Regenerative and cellular wellness programs, guided end-to-end by our experienced medical team.",
    bullets: [
      "Thorough medical assessment first",
      "Evidence-informed protocols",
      "Ongoing follow-up and care",
    ],
  },
];

export type Reason = {
  icon: IconName;
  title: string;
  description: string;
};

export const reasons: Reason[] = [
  {
    icon: "user",
    title: "Personalized Care",
    description:
      "Every plan is built around you — your biology, lifestyle, and personal goals.",
  },
  {
    icon: "stethoscope",
    title: "Medical Supervision",
    description:
      "Programs are designed and overseen by experienced medical professionals.",
  },
  {
    icon: "leaf",
    title: "Holistic Wellness",
    description:
      "We care for the whole person — body, energy, and confidence together.",
  },
  {
    icon: "diamond",
    title: "Premium Experience",
    description:
      "A calm, private, and refined environment from your first visit onward.",
  },
  {
    icon: "calendar",
    title: "Long-term Health Planning",
    description:
      "We focus on sustainable wellbeing and long-term health planning.",
  },
];

export type Doctor = {
  name: string;
  position: string;
  specialty: string;
};

/** PLACEHOLDER profiles — replace with the real ARPAR medical team. */
export const doctors: Doctor[] = [
  {
    name: "Dr. [Name Placeholder]",
    position: "Medical Director",
    specialty: "Longevity & Preventive Medicine",
  },
  {
    name: "Dr. [Name Placeholder]",
    position: "Regenerative Medicine Physician",
    specialty: "Cellular & Regenerative Wellness",
  },
  {
    name: "Dr. [Name Placeholder]",
    position: "Wellness Physician",
    specialty: "Hormone Balance & Nutrition",
  },
];

export type GalleryItem = { label: string; tone: "warm" | "cool" | "gold" };

export const gallery: GalleryItem[] = [
  { label: "Clinic atmosphere", tone: "warm" },
  { label: "Consultation room", tone: "cool" },
  { label: "Treatment room", tone: "gold" },
  { label: "Medical equipment", tone: "cool" },
  { label: "Wellness experience", tone: "warm" },
  { label: "Reception & lounge", tone: "gold" },
];

export type Article = {
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
};

export const articles: Article[] = [
  {
    category: "Longevity",
    title: "What is Longevity?",
    excerpt:
      "Understanding longevity as a proactive, whole-life approach to health — not just living longer, but living well.",
    readingTime: "4 min read",
  },
  {
    category: "Preventive",
    title: "Who is a Personalized Preventive Checkup for?",
    excerpt:
      "How tailored screening helps people at every stage take a proactive role in their long-term health.",
    readingTime: "5 min read",
  },
  {
    category: "Vitality",
    title: "What can IV Drip support?",
    excerpt:
      "A grounded look at how IV formulas fit into a balanced, medically guided wellness routine.",
    readingTime: "3 min read",
  },
  {
    category: "Wellness",
    title: "Health from the inside out",
    excerpt:
      "Why lasting vitality begins with balance inside the body — nutrition, hormones, and recovery.",
    readingTime: "6 min read",
  },
  {
    category: "Testing",
    title: "What is Micronutrient Testing?",
    excerpt:
      "How measuring your vitamins and minerals can help turn guesswork into a clearer, personal plan.",
    readingTime: "4 min read",
  },
];

export const contact = {
  eyebrow: "Contact / Booking",
  title: "เริ่มต้นวางแผนสุขภาพของคุณกับ ARPAR",
  titleEn: "Start planning your health with ARPAR",
  body: "ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโปรแกรมสุขภาพเฉพาะคุณ — เราพร้อมดูแลคุณในทุกขั้นตอน",
};
