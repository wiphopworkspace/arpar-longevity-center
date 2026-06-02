/* ============================================================
   ARPAR Longevity Center — Bilingual site content
   SINGLE SOURCE OF TRUTH for all editable copy & data (TH + EN).

   HOW IT WORKS
   - Every translatable text is authored with `L(thai, english)`.
   - `getDictionary(locale)` deep-resolves the `source` tree into a
     plain, fully-typed dictionary for one language.
   - Components receive `{ dict, locale }` and build locale-aware
     links with `localePath(locale, "/services")`.

   To edit copy: change the Thai/English strings inside the `L(...)`
   calls below. To add a service: add one entry to `source.services`.

   ⚠️  Items marked PLACEHOLDER need real client data before launch
   (see README "Launch checklist").
   ============================================================ */

import type { IconName } from "@/components/ui/icons";

/* ---------- Locales ---------- */
export const locales = ["th", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "th";

export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

/** Build a locale-prefixed internal path.
 *  "/" → "/th" · "/services" → "/th/services" · "/#contact" → "/th#contact" */
export function localePath(locale: Locale, href: string): string {
  if (!href || href === "/") return `/${locale}`;
  if (href.startsWith("/#")) return `/${locale}${href.slice(1)}`;
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return href; // external / absolute
}

/* ---------- Localized helper + resolver ---------- */
export type Localized<T> = { th: T; en: T };
/** Author a bilingual value compactly: L("ไทย", "English"). */
const L = <T,>(th: T, en: T): Localized<T> => ({ th, en });

type Resolve<T> = T extends Localized<infer U>
  ? Resolve<U>
  : T extends (infer E)[]
    ? Resolve<E>[]
    : T extends object
      ? { [K in keyof T]: Resolve<T[K]> }
      : T;

function isLocalized(v: unknown): v is Localized<unknown> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    Object.keys(v).length === 2 &&
    "th" in v &&
    "en" in v
  );
}

function resolveLocale(value: unknown, locale: Locale): unknown {
  if (Array.isArray(value)) return value.map((v) => resolveLocale(v, locale));
  if (isLocalized(value)) return resolveLocale(value[locale], locale);
  if (typeof value === "object" && value !== null) {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>)) {
      out[k] = resolveLocale((value as Record<string, unknown>)[k], locale);
    }
    return out;
  }
  return value;
}

/* ---------- Locale-independent constants ---------- */
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
  address: L(
    "ชั้น 3 อาคารตัวอย่าง ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110", // PLACEHOLDER
    "3rd Floor, Example Building, Sukhumvit Rd, Watthana, Bangkok 10110", // PLACEHOLDER
  ),
  hours: L("ทุกวัน 09:00 – 19:00 น.", "Open daily 09:00 – 19:00"),
};

type Tone = "warm" | "cool" | "gold";

/** A real image asset with required alt text and intrinsic dimensions. */
export type SiteImage = { src: string; alt: string; width: number; height: number };

/* ============================================================
   BILINGUAL SOURCE
   ============================================================ */
const source = {
  seo: {
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
    home: {
      title: L(
        "ARPAR Longevity Center | อาภา — ดูแลสุขภาพและความงามแบบองค์รวม",
        "ARPAR Longevity Center | อาภา — Personalized Longevity & Wellness",
      ),
      description: L(
        "ARPAR Longevity Center (อาภา) คลินิกเวลเนสระดับพรีเมียม ดูแลสุขภาพเชิงป้องกัน เวชศาสตร์ชะลอวัย และการฟื้นฟูเฉพาะบุคคล เพื่อสุขภาพที่ดีในระยะยาว",
        "ARPAR Longevity Center (อาภา) — a premium medical wellness clinic offering personalized longevity, regenerative, and preventive health programs designed to support long-term vitality.",
      ),
    },
    services: {
      title: L("บริการของเรา", "Services"),
      description: L(
        "สำรวจบริการเวลเนสของ ARPAR — ตั้งแต่ตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล วิตามินดริป ไปจนถึงการดูแลเชิงฟื้นฟู ภายใต้การดูแลของแพทย์",
        "Explore ARPAR's wellness-focused services — from personalized preventive checkups and IV drips to regenerative care, all under medical supervision.",
      ),
    },
  },

  nav: [
    { label: L("เกี่ยวกับเรา", "About"), href: "/#about" },
    { label: L("บริการ", "Services"), href: "/services" },
    { label: L("โปรแกรม", "Programs"), href: "/#programs" },
    { label: L("บทความ", "Articles"), href: "/#articles" },
    { label: L("ติดต่อ", "Contact"), href: "/#contact" },
  ],

  cta: { label: L("ปรึกษาผู้เชี่ยวชาญ", "Book a Consultation"), href: "/#contact" },

  /** Common reusable labels. */
  ui: {
    consult: L("ปรึกษาผู้เชี่ยวชาญ", "Talk to a specialist"),
    viewServices: L("ดูบริการของเรา", "Explore our services"),
    viewAll: L("ดูบริการทั้งหมด", "View all services"),
    learnMore: L("ดูรายละเอียด", "Learn more"),
    viewDetails: L("ดูรายละเอียดบริการ", "View service"),
    readAll: L("ดูบทความทั้งหมด", "View all articles"),
    readMore: L("อ่านต่อ", "Read more"),
    home: L("หน้าแรก", "Home"),
    services: L("บริการ", "Services"),
    serviceLabel: L("บริการ", "Service"),
    overview: L("ภาพรวม", "Overview"),
    overviewHeading: L(
      "แนวทางดูแลเฉพาะบุคคล เน้นความเป็นอยู่ที่ดี",
      "A personalized, wellness-focused approach",
    ),
    whoFor: L("เหมาะกับใคร", "Who it's for"),
    whatToExpect: L("สิ่งที่คุณจะได้รับ", "What to expect"),
    keyBenefits: L("จุดเด่นของบริการ", "Key Benefits"),
    benefitsHeading: L(
      "บริการนี้ออกแบบมาเพื่อสนับสนุนสิ่งใด",
      "What this service is designed to support",
    ),
    relatedServices: L("บริการที่เกี่ยวข้อง", "Related Services"),
    youMightExplore: L("คุณอาจสนใจบริการเหล่านี้", "You might also explore"),
    consultNoticeTitle: L("แนะนำให้เข้ารับคำปรึกษา", "A consultation is recommended"),
    consultNoticeBody: L(
      "บริการของ ARPAR เน้นการดูแลสุขภาพแบบเวลเนสภายใต้การดูแลของแพทย์ ความเหมาะสม แนวทาง และผลลัพธ์ที่คาดหวังจะพิจารณาเป็นรายบุคคลในระหว่างการปรึกษา ข้อมูลนี้เป็นคำแนะนำทั่วไป ไม่ใช่การวินิจฉัยหรือทดแทนคำแนะนำทางการแพทย์",
      "ARPAR services are wellness-focused and provided under medical supervision. Suitability, approach, and expected outcomes are determined on an individual basis during your consultation. This information is for general guidance and is not a substitute for professional medical advice.",
    ),
    consultAboutProgram: L("ปรึกษาเกี่ยวกับโปรแกรมนี้", "Ask about this program"),
  },

  hero: {
    eyebrow: L("ARPAR Longevity Center · อาภา", "ARPAR Longevity Center · อาภา"),
    brand: "ARPAR Longevity Center",
    headline: L(
      "เติมเต็มพลังชีวิต ด้วยโปรแกรมสุขภาพเหนือระดับ",
      "Renew your vitality with elevated wellness programs",
    ),
    subtitle: L(
      "โปรแกรมดูแลสุขภาพและความงามเฉพาะบุคคล ออกแบบเพื่อสุขภาพที่ดี พลังชีวิต และความมั่นใจในระยะยาว",
      "Personalized Longevity & Wellness Programs designed to support long-term health, vitality, and confidence.",
    ),
    primaryCta: { label: L("ปรึกษาผู้เชี่ยวชาญ", "Book a Consultation"), href: "/#contact" },
    secondaryCta: { label: L("ดูบริการของเรา", "Explore our services"), href: "/services" },
    stats: [
      { value: L("เฉพาะคุณ", "Tailored"), label: L("แผนดูแลเฉพาะบุคคล", "Personalized care plans") },
      { value: L("ดูแลโดยแพทย์", "Medical"), label: L("ภายใต้การดูแลของแพทย์", "Supervised programs") },
      { value: L("องค์รวม", "Holistic"), label: L("ดูแลสุขภาพแบบองค์รวม", "Whole-body wellness") },
    ],
    floatTitle: L("แผนเฉพาะบุคคล", "Personalized plan"),
    floatSub: L("ออกแบบเพื่อคุณ", "Designed around you"),
    imageLabel: L("แพทย์ให้คำปรึกษาผู้รับบริการ", "Doctor & patient consultation"),
  },

  bannerSlides: [
    {
      title: L("ดูแลสมดุลฮอร์โมน & น้ำหนัก", "Hormone Balance & HRT"),
      image: {
        src: "/images/services/hormone-hrt-weight-management.webp",
        alt: L(
          "โบรชัวร์ ARPAR เรื่องดูแลสมดุลฮอร์โมน HRT และการจัดการน้ำหนัก",
          "ARPAR hormone balance, HRT and weight management program brochure",
        ),
        width: 1280,
        height: 905,
      },
      href: "/services/hormone-balance-hrt",
    },
    {
      title: L("วิตามินดริป & ไมโครนิวเทรียนท์", "IV Drip & Micronutrients"),
      image: {
        src: "/images/services/micronutrients-iv-drip.webp",
        alt: L(
          "โบรชัวร์ ARPAR เรื่องไมโครนิวเทรียนท์ อาหารเสริมเฉพาะบุคคล และวิตามินดริป",
          "ARPAR micronutrients, personalized supplements and IV drip formulas brochure",
        ),
        width: 1280,
        height: 905,
      },
      href: "/services/iv-drip",
    },
    {
      title: L("สเต็มเซลล์ & ตรวจสุขภาพเชิงป้องกัน", "Stem Cell & Preventive Checkup"),
      image: {
        src: "/images/services/stem-cell-preventive-checkup.webp",
        alt: L(
          "โบรชัวร์ ARPAR เรื่องสเต็มเซลล์ NK cell และการตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล",
          "ARPAR stem cell, NK cell and personalized preventive checkup brochure",
        ),
        width: 1280,
        height: 905,
      },
      href: "/services/stem-cell-nk-cell",
    },
  ],

  brandPromise: {
    eyebrow: L("คำมั่นของเรา", "Our Promise"),
    title: L(
      "สุขภาพที่ดีขึ้น เพื่อการเดินทางที่ยาวนานไปด้วยกัน",
      "A Healthier Life, A Longer Journey Together",
    ),
    body: L(
      "อาภาเชื่อว่าการมีสุขภาพที่ดี เริ่มจากการดูแลร่างกายอย่างเข้าใจ เพื่อให้คุณมีพลัง แข็งแรง และมีความสุขในทุกวัน",
      "ARPAR believes good health begins with understanding your body — so you can feel energized, strong, and well every day.",
    ),
    image: {
      src: "/images/brand/arpar-brand-hero.webp",
      alt: L(
        "ภาพแบรนด์ ARPAR Longevity Center สื่อถึงสุขภาพดีและความสุขในการมีอายุยืน",
        "ARPAR Longevity Center brand visual promoting healthy and happy longevity",
      ),
      width: 1254,
      height: 1254,
    },
    ctaLabel: L("ปรึกษาผู้เชี่ยวชาญ", "Book a Consultation"),
    ctaHref: "/#contact",
  },

  about: {
    eyebrow: L("เกี่ยวกับ ARPAR", "About ARPAR"),
    title: L(
      "ศูนย์ดูแลสุขภาพแบบองค์รวม เพื่อชีวิตที่ยืนยาวอย่างมีคุณภาพ",
      "A holistic center for longevity and lasting vitality",
    ),
    lead: L(
      "ARPAR Longevity Center (อาภา) ผสานเวชศาสตร์ชะลอวัย การฟื้นฟูเชิงเวลเนส และการดูแลเฉพาะบุคคลไว้ด้วยกัน — พื้นที่ที่สงบและพิถีพิถันเพื่อดูแลสุขภาพของคุณในระยะยาว",
      "ARPAR Longevity Center (อาภา) brings together longevity medicine, regenerative wellness, and personalized care — a calm, considered home for your long-term health.",
    ),
    points: L(
      ["เวชศาสตร์ชะลอวัยและการป้องกัน", "การฟื้นฟูระดับเซลล์", "ดูแลเฉพาะบุคคลด้วยข้อมูล"],
      [
        "Longevity & preventive medicine",
        "Regenerative & cellular wellness",
        "Personalized, data-guided care",
      ],
    ),
    image: {
      src: "/images/about/arpar-about-longevity-clinic.webp",
      alt: L(
        "ภาพรวมเกี่ยวกับ ARPAR Longevity Center แนวคิดการดูแลแบบองค์รวม บริการ และวิสัยทัศน์",
        "About ARPAR Longevity Center — overview of the clinic's holistic care concept, services, and vision",
      ),
      width: 1280,
      height: 905,
    },
  },

  servicesSection: {
    eyebrow: L("บริการของเรา", "Our Services"),
    title: L(
      "ดูแลสุขภาพอย่างครบวงจรในทุกด้านของความเป็นอยู่ที่ดี",
      "Comprehensive care for every part of your wellbeing",
    ),
    description: L(
      "ตั้งแต่การตรวจคัดกรองเชิงป้องกันไปจนถึงการฟื้นฟูเชิงเวลเนส ทุกบริการดูแลภายใต้แพทย์และออกแบบเฉพาะบุคคล",
      "From preventive screening to regenerative wellness, each service is delivered with medical supervision and a personalized approach.",
    ),
  },

  servicesPage: {
    eyebrow: L("บริการของเรา", "Our Services"),
    title: L(
      "ดูแลสุขภาพอย่างครบวงจรในทุกด้านของความเป็นอยู่ที่ดี",
      "Comprehensive care for every part of your wellbeing",
    ),
    description: L(
      "ทุกบริการของ ARPAR ดูแลภายใต้แพทย์และออกแบบเฉพาะบุคคล แนะนำให้เข้ารับคำปรึกษาเพื่อหาสิ่งที่เหมาะกับคุณที่สุด",
      "Each ARPAR service is delivered with medical supervision and a personalized approach. A consultation is recommended to find what suits you best.",
    ),
  },

  services: [
    {
      slug: "stem-cell-nk-cell",
      icon: "cell" as IconName,
      tone: "gold" as Tone,
      image: {
        src: "/images/services/stem-cell-preventive-checkup.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องสเต็มเซลล์และ NK Cell การดูแลระดับเซลล์และภูมิคุ้มกัน",
          "ARPAR Stem Cell & NK Cell information sheet on regenerative cellular and immune wellness care",
        ),
        width: 1280,
        height: 905,
      },
      title: L("สเต็มเซลล์ และ NK Cell", "Stem Cell & NK Cell"),
      description: L(
        "โปรแกรมระดับเซลล์เพื่อสนับสนุนการฟื้นฟู ภูมิคุ้มกัน และพลังชีวิตในระยะยาว ภายใต้การดูแลของแพทย์",
        "Regenerative cellular programs designed to support recovery, immunity, and long-term vitality under medical supervision.",
      ),
      benefits: L(
        ["แนวทางเวลเนสเชิงฟื้นฟู", "ออกแบบเพื่อสนับสนุนภูมิคุ้มกันและการฟื้นตัว", "ดูแลภายใต้แพทย์"],
        [
          "Wellness-focused, regenerative approach",
          "Designed to support immunity & recovery",
          "Delivered under medical supervision",
        ],
      ),
      overview: L(
        "โปรแกรมเชิงฟื้นฟูระดับเซลล์ของเราออกแบบมาเพื่อสนับสนุนการฟื้นตัวและความแข็งแรงตามธรรมชาติของร่างกาย เริ่มต้นด้วยการประเมินทางการแพทย์อย่างละเอียด และดูแลโดยทีมผู้เชี่ยวชาญ แนะนำให้เข้ารับคำปรึกษาเพื่อพิจารณาความเหมาะสมสำหรับคุณ",
        "Our regenerative and cellular wellness programs are designed to support the body's natural recovery and resilience. Each program begins with a thorough medical assessment, and care is planned and supervised by experienced professionals. A consultation is recommended to determine whether this approach is suitable for you.",
      ),
      whoFor: L(
        ["ผู้ที่สนใจแนวทางเวลเนสเชิงฟื้นฟู", "ผู้ที่ให้ความสำคัญกับพลังชีวิตและการฟื้นตัวระยะยาว", "ผู้ที่ต้องการการดูแลระดับเซลล์ภายใต้แพทย์"],
        [
          "Those interested in regenerative wellness approaches",
          "People focused on long-term vitality and recovery",
          "Anyone seeking medically supervised cellular care",
        ],
      ),
      whatToExpect: L(
        ["ปรึกษาและประเมินทางการแพทย์เบื้องต้น", "แผนเฉพาะบุคคลตามเป้าหมายและประวัติของคุณ", "การดูแลภายใต้แพทย์พร้อมการติดตามผล"],
        [
          "Initial consultation and medical assessment",
          "A personalized plan based on your goals and history",
          "Supervised care with ongoing follow-up",
        ],
      ),
    },
    {
      slug: "preventive-checkup",
      icon: "checkup" as IconName,
      tone: "warm" as Tone,
      image: {
        src: "/images/services/stem-cell-preventive-checkup.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องการตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล",
          "ARPAR Personalized Preventive Checkup information sheet on tailored, risk-based health screening",
        ),
        width: 1280,
        height: 905,
      },
      title: L("ตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล", "Personalized Preventive Checkup"),
      description: L(
        "ตรวจสุขภาพเชิงลึกที่ออกแบบตามประวัติและเป้าหมายของคุณ เพื่อให้การป้องกันเริ่มต้นก่อนเกิดอาการ",
        "In-depth health screening tailored to your history and goals — so prevention can start before symptoms appear.",
      ),
      benefits: L(
        ["ตรวจคัดกรองตามประวัติของคุณ", "ปรึกษาแพทย์แบบตัวต่อตัว", "แผนสุขภาพเฉพาะบุคคลที่ชัดเจน"],
        [
          "Screening tailored to your history",
          "One-on-one doctor consultation",
          "Clear, personalized health plan",
        ],
      ),
      overview: L(
        "การตรวจสุขภาพเชิงป้องกันเฉพาะบุคคลช่วยให้คุณเห็นภาพสุขภาพในวันนี้ พร้อมแผนระยะยาวที่ออกแบบตามร่างกาย ไลฟ์สไตล์ และเป้าหมายของคุณ ทีมแพทย์จะทบทวนผลร่วมกับคุณและแนะนำขั้นตอนต่อไปที่เน้นการป้องกันและความสมดุล",
        "A Personalized Preventive Checkup gives you a clear picture of your health today, with a long-term plan designed around your biology, lifestyle, and goals. Our medical team reviews your results with you and recommends next steps focused on prevention and balance.",
      ),
      whoFor: L(
        ["ผู้ที่ต้องการเข้าใจสุขภาพของตนเองเชิงรุก", "ผู้ที่วางแผนสุขภาพระยะยาว", "ผู้ที่ให้ความสำคัญกับการป้องกันมากกว่าการรักษา"],
        [
          "Anyone wanting a proactive view of their health",
          "People planning for long-term wellbeing",
          "Those who prefer prevention over reaction",
        ],
      ),
      whatToExpect: L(
        ["ชุดตรวจคัดกรองที่ออกแบบเฉพาะคุณ", "ปรึกษาแบบตัวต่อตัวเพื่อทบทวนผล", "แผนสุขภาพระยะยาวเฉพาะบุคคล"],
        [
          "A tailored screening panel",
          "A one-on-one consultation to review results",
          "A personalized long-term health plan",
        ],
      ),
    },
    {
      slug: "micronutrient-test",
      icon: "flask" as IconName,
      tone: "cool" as Tone,
      image: {
        src: "/images/services/micronutrients-iv-drip.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องการตรวจวิเคราะห์วิตามินและแร่ธาตุระดับเซลล์",
          "ARPAR Micronutrient Test information sheet on cellular nutrient analysis and personalized supplementation",
        ),
        width: 1280,
        height: 905,
      },
      title: L("ตรวจวิเคราะห์วิตามินและแร่ธาตุ", "Micronutrient Test"),
      description: L(
        "เข้าใจสมดุลวิตามิน แร่ธาตุ และสารต้านอนุมูลอิสระของคุณ เพื่อช่วยวางแผนการเสริมอย่างเหมาะสมเฉพาะบุคคล",
        "Understand your vitamin, mineral, and antioxidant balance to help guide precise, personalized supplementation.",
      ),
      benefits: L(
        ["เห็นสมดุลสารอาหารของคุณ", "ช่วยวางแผนการเสริมอย่างแม่นยำ", "เฉพาะบุคคลตามผลตรวจ"],
        ["Insight into your nutrient balance", "Helps guide precise supplementation", "Personalized to your results"],
      ),
      overview: L(
        "การตรวจไมโครนิวเทรียนท์ช่วยให้คุณเข้าใจสมดุลวิตามิน แร่ธาตุ และสารต้านอนุมูลอิสระ ผลตรวจช่วยเปลี่ยนการคาดเดาให้เป็นแผนที่ชัดเจนและเฉพาะบุคคล และช่วยกำหนดแนวทางการเสริมและไลฟ์สไตล์ร่วมกับทีมดูแลของคุณ",
        "Micronutrient testing helps you understand your vitamin, mineral, and antioxidant balance. The results turn guesswork into a clearer, more personal plan, and can help guide supplementation and lifestyle choices with your care team.",
      ),
      whoFor: L(
        ["ผู้ที่กำลังพิจารณาการเสริมเฉพาะบุคคล", "ผู้ที่ต้องการความชัดเจนเรื่องสารอาหารในร่างกาย", "ผู้ที่วางแผนเวลเนสจากข้อมูล"],
        [
          "People considering personalized supplementation",
          "Those wanting clarity on their nutrient status",
          "Anyone building a data-guided wellness plan",
        ],
      ),
      whatToExpect: L(
        ["ขั้นตอนการตรวจที่ไม่ยุ่งยาก", "ทบทวนผลร่วมกับทีมของเรา", "คำแนะนำที่ออกแบบตามความต้องการของคุณ"],
        [
          "A straightforward testing process",
          "A review of your results with our team",
          "Recommendations tailored to your needs",
        ],
      ),
    },
    {
      slug: "personalized-supplements",
      icon: "capsule" as IconName,
      tone: "warm" as Tone,
      image: {
        src: "/images/services/micronutrients-iv-drip.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องอาหารเสริมเฉพาะบุคคลตามผลตรวจและการดูแลโดยแพทย์",
          "ARPAR Personalized Supplements information sheet on test-based, medically reviewed supplement guidance",
        ),
        width: 1280,
        height: 905,
      },
      title: L("อาหารเสริมเฉพาะบุคคล", "Personalized Supplements"),
      description: L(
        "คำแนะนำการเสริมที่ออกแบบตามผลตรวจและไลฟ์สไตล์ของคุณ ทบทวนโดยทีมแพทย์",
        "Supplement guidance matched to your test results and lifestyle, reviewed by our medical team.",
      ),
      benefits: L(
        ["อิงตามผลตรวจของคุณ", "ทบทวนโดยทีมแพทย์", "ออกแบบรอบไลฟ์สไตล์ของคุณ"],
        ["Matched to your test results", "Reviewed by our medical team", "Built around your lifestyle"],
      ),
      overview: L(
        "แทนที่จะเป็นสูตรเดียวสำหรับทุกคน คำแนะนำการเสริมเฉพาะบุคคลของเราอิงตามผลตรวจและกิจวัตรประจำวัน และทบทวนโดยทีมแพทย์ โดยเน้นการสนับสนุนที่เหมาะสมและพอดี ไม่เกินจำเป็น",
        "Rather than a one-size-fits-all approach, our personalized supplement guidance is matched to your test results and daily routine, and reviewed by our medical team. The goal is thoughtful, appropriate support — not excess.",
      ),
      whoFor: L(
        ["ผู้ที่ตรวจไมโครนิวเทรียนท์แล้ว", "ผู้ที่ต้องการคำแนะนำเฉพาะบุคคลอย่างพิถีพิถัน", "ผู้ที่ต้องการคำแนะนำที่ทบทวนโดยแพทย์"],
        [
          "Those who have completed micronutrient testing",
          "People seeking considered, personalized guidance",
          "Anyone wanting medically reviewed recommendations",
        ],
      ),
      whatToExpect: L(
        ["ทบทวนเป้าหมายและผลตรวจของคุณ", "คำแนะนำเฉพาะบุคคลที่ทบทวนโดยแพทย์", "ติดตามและปรับตามความต้องการที่เปลี่ยนไป"],
        [
          "A review of your goals and any test results",
          "Personalized, medically reviewed guidance",
          "Follow-up to adjust as your needs change",
        ],
      ),
    },
    {
      slug: "iv-drip",
      icon: "drip" as IconName,
      tone: "cool" as Tone,
      image: {
        src: "/images/services/micronutrients-iv-drip.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องวิตามินดริปเฉพาะบุคคลเพื่อสนับสนุนสุขภาพ",
          "ARPAR IV Drip Formulas information sheet on personalized intravenous vitamin and wellness support",
        ),
        width: 1280,
        height: 905,
      },
      title: L("วิตามินดริปเฉพาะบุคคล", "IV Drip Formulas"),
      description: L(
        "สูตรวิตามินดริปที่คัดสรรเพื่อสนับสนุนความชุ่มชื้น พลังงาน และการฟื้นตัว เป็นส่วนหนึ่งของการดูแลสุขภาพที่สมดุล",
        "Curated IV formulas to support hydration, energy, and recovery as part of a balanced wellness routine.",
      ),
      benefits: L(
        ["สูตรที่เหมาะกับความต้องการของคุณ", "ห้องทรีตเมนต์ที่สงบและสบาย", "ดูแลโดยบุคลากรทางการแพทย์"],
        ["Formulas matched to your needs", "Comfortable, calm treatment rooms", "Administered by medical staff"],
      ),
      overview: L(
        "สูตรวิตามินดริปของเราออกแบบมาเพื่อสนับสนุนความชุ่มชื้น พลังงาน และการฟื้นตัว เป็นส่วนหนึ่งของการดูแลสุขภาพที่สมดุลภายใต้การดูแลของแพทย์ แต่ละสูตรเลือกตามความต้องการของคุณ และให้บริการโดยบุคลากรทางการแพทย์ในห้องส่วนตัวที่สงบ",
        "Our IV drip formulas are designed to support hydration, energy, and recovery as part of a balanced, medically guided wellness routine. Each formula is selected with your needs in mind, and treatments are administered by medical staff in calm, private rooms.",
      ),
      whoFor: L(
        ["ผู้ที่ต้องการสนับสนุนความชุ่มชื้นและพลังงาน", "ผู้ที่ชอบบรรยากาศสงบและดูแลโดยแพทย์", "ผู้ที่ต้องการเสริมแผนเวลเนสโดยรวม"],
        [
          "People looking to support hydration and energy",
          "Those who prefer a calm, supervised setting",
          "Anyone complementing a broader wellness plan",
        ],
      ),
      whatToExpect: L(
        ["ปรึกษาสั้น ๆ เพื่อเลือกสูตรที่เหมาะสม", "รับบริการอย่างสบายในห้องส่วนตัว", "คำแนะนำเรื่องความถี่ที่เหมาะกับกิจวัตรของคุณ"],
        [
          "A short consultation to choose a suitable formula",
          "A comfortable treatment in a private room",
          "Guidance on frequency that fits your routine",
        ],
      ),
    },
    {
      slug: "hormone-balance-hrt",
      icon: "balance" as IconName,
      tone: "gold" as Tone,
      image: {
        src: "/images/services/hormone-hrt-weight-management.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องการดูแลสมดุลฮอร์โมนและ HRT ภายใต้การดูแลของแพทย์",
          "ARPAR Hormone Balance & HRT information sheet on personalized, medically supervised hormone wellness",
        ),
        width: 1280,
        height: 905,
      },
      title: L("ดูแลสมดุลฮอร์โมน", "Hormone Balance & HRT"),
      description: L(
        "ประเมินและปรับสมดุลฮอร์โมนอย่างพิถีพิถัน ออกแบบเพื่อสนับสนุนพลังงาน อารมณ์ การนอน และคุณภาพชีวิต",
        "Thoughtful hormone assessment and balancing designed to support energy, mood, sleep, and quality of life.",
      ),
      benefits: L(
        ["ประเมินเฉพาะบุคคลอย่างรอบคอบ", "ออกแบบเพื่อสนับสนุนความเป็นอยู่ที่ดีในทุกวัน", "ดูแลภายใต้แพทย์ตลอดกระบวนการ"],
        ["Careful, individual assessment", "Designed to support everyday wellbeing", "Medically supervised throughout"],
      ),
      overview: L(
        "สมดุลฮอร์โมนมีผลต่อพลังงาน อารมณ์ การนอน และคุณภาพชีวิตโดยรวม แนวทางการประเมินและปรับสมดุลของเราดูแลภายใต้แพทย์และออกแบบเฉพาะบุคคล แนะนำให้เข้ารับคำปรึกษาเพื่อพิจารณาแนวทางที่เหมาะกับคุณ",
        "Hormone balance can influence energy, mood, sleep, and overall quality of life. Our thoughtful assessment and balancing approach is medically supervised and personalized. A consultation is recommended to understand what is appropriate for you.",
      ),
      whoFor: L(
        ["ผู้ที่สังเกตการเปลี่ยนแปลงด้านพลังงาน อารมณ์ หรือการนอน", "ผู้ที่ต้องการแนวทางที่รอบคอบและดูแลโดยแพทย์", "ผู้ที่วางแผนสุขภาพระยะยาว"],
        [
          "People noticing changes in energy, mood, or sleep",
          "Those seeking a careful, supervised approach",
          "Anyone planning for long-term wellbeing",
        ],
      ),
      whatToExpect: L(
        ["ปรึกษาและประเมินอย่างละเอียด", "แผนเฉพาะบุคคลภายใต้การดูแลของแพทย์", "ติดตามและดูแลอย่างต่อเนื่อง"],
        [
          "A detailed consultation and assessment",
          "A personalized, medically supervised plan",
          "Ongoing monitoring and follow-up",
        ],
      ),
    },
    {
      slug: "weight-management",
      icon: "leaf" as IconName,
      tone: "warm" as Tone,
      image: {
        src: "/images/services/hormone-hrt-weight-management.webp",
        alt: L(
          "เอกสารข้อมูล ARPAR เรื่องโปรแกรมดูแลน้ำหนักอย่างยั่งยืนภายใต้การดูแลของแพทย์",
          "ARPAR Weight Management Program information sheet on sustainable, medically guided weight care",
        ),
        width: 1280,
        height: 905,
      },
      title: L("โปรแกรมดูแลน้ำหนัก", "Weight Management Program"),
      description: L(
        "โปรแกรมดูแลน้ำหนักอย่างยั่งยืนภายใต้การดูแลของแพทย์ ออกแบบตามระบบเผาผลาญและกิจวัตรของคุณ",
        "Sustainable, medically guided weight programs built around your metabolism and daily routine.",
      ),
      benefits: L(
        ["แนวทางที่ยั่งยืนและทำได้จริง", "ออกแบบตามระบบเผาผลาญของคุณ", "สนับสนุนภายใต้การดูแลของแพทย์"],
        ["Sustainable, realistic approach", "Built around your metabolism", "Medically guided support"],
      ),
      overview: L(
        "โปรแกรมดูแลน้ำหนักของเราเน้นการเปลี่ยนแปลงที่ยั่งยืนและทำได้จริง มากกว่าการเร่งรัด ออกแบบตามระบบเผาผลาญและกิจวัตรของคุณ และดูแลโดยทีมแพทย์ โดยมุ่งให้คุณก้าวหน้าอย่างมั่นคงและรักษาผลได้ในระยะยาว",
        "Our weight management programs focus on sustainable, realistic change rather than quick fixes. Built around your metabolism and daily routine and guided by our medical team, the aim is steady progress you can maintain.",
      ),
      whoFor: L(
        ["ผู้ที่มองหาแนวทางดูแลน้ำหนักอย่างยั่งยืน", "ผู้ที่ให้คุณค่ากับคำแนะนำและโครงสร้างจากแพทย์", "ผู้ที่มุ่งสร้างนิสัยสุขภาพดีในระยะยาว"],
        [
          "People seeking a sustainable approach to weight",
          "Those who value medical guidance and structure",
          "Anyone focused on long-term healthy habits",
        ],
      ),
      whatToExpect: L(
        ["ประเมินเป้าหมายและไลฟ์สไตล์ของคุณ", "แผนเฉพาะบุคคลภายใต้การดูแลของแพทย์", "ติดตามผลอย่างสม่ำเสมอเพื่อสนับสนุนความก้าวหน้า"],
        [
          "An assessment of your goals and lifestyle",
          "A personalized, medically guided plan",
          "Regular check-ins to support your progress",
        ],
      ),
    },
    {
      slug: "skin-beauty-recovery",
      icon: "sparkleFace" as IconName,
      tone: "gold" as Tone,
      image: {
        src: "/images/services/service-overview.webp",
        alt: L(
          "ภาพรวมบริการ ARPAR รวมถึงการฟื้นฟูผิวพรรณและความงามในโปรแกรมเวลเนสโดยรวม",
          "ARPAR services overview including skin and beauty recovery within the overall wellness program",
        ),
        width: 1280,
        height: 905,
      },
      title: L("ฟื้นฟูผิวพรรณและความงาม", "Skin & Beauty Recovery"),
      description: L(
        "การดูแลผิวพรรณและความงามอย่างอ่อนโยนและฟื้นฟู เสริมการดูแลสุขภาพจากภายในของคุณ",
        "Gentle, restorative skin and beauty care that complements your inner-health journey.",
      ),
      benefits: L(
        ["แนวทางอ่อนโยนและฟื้นฟู", "เสริมการดูแลสุขภาพจากภายใน", "เฉพาะบุคคลตามสภาพผิวของคุณ"],
        ["Gentle, restorative approach", "Complements inner-health care", "Personalized to your skin"],
      ),
      overview: L(
        "การฟื้นฟูผิวพรรณและความงามที่ ARPAR เน้นความอ่อนโยนและการฟื้นฟู ออกแบบเพื่อเสริมการดูแลสุขภาพจากภายในของคุณ ดูแลเฉพาะบุคคลตามสภาพผิวและเป้าหมาย โดยให้ความสำคัญกับประสบการณ์ที่สงบและพิถีพิถัน",
        "Skin and beauty recovery at ARPAR is gentle and restorative, designed to complement your broader inner-health journey. Care is personalized to your skin and goals, with an emphasis on a calm, considered experience.",
      ),
      whoFor: L(
        ["ผู้ที่ต้องการดูแลและฟื้นฟูผิวพรรณ", "ผู้ที่ดูแลทั้งภายนอกและภายในควบคู่กัน", "ผู้ที่มองหาแนวทางอ่อนโยนเฉพาะบุคคล"],
        [
          "Those wanting restorative skin and beauty care",
          "People pairing outer care with inner health",
          "Anyone seeking a gentle, personalized approach",
        ],
      ),
      whatToExpect: L(
        ["ปรึกษาเพื่อเข้าใจสภาพผิวและเป้าหมายของคุณ", "แผนการดูแลที่อ่อนโยนและเฉพาะบุคคล", "คำแนะนำเพื่อรักษาผลลัพธ์ในระยะยาว"],
        [
          "A consultation to understand your skin and goals",
          "A personalized, gentle care plan",
          "Guidance to maintain results over time",
        ],
      ),
    },
  ],

  programsSection: {
    eyebrow: L("โปรแกรมเด่น", "Featured Programs"),
    title: L("โปรแกรมเด่น ออกแบบเฉพาะบุคคล", "Signature programs, designed around you"),
    description: L(
      "สามโปรแกรมยอดนิยมของเรา — ดูแลครบทุกขั้นตอนโดยทีมแพทย์",
      "Three of our most requested programs — each guided end-to-end by our medical team.",
    ),
  },

  programsBanner: {
    src: "/images/services/service-overview.webp",
    alt: L(
      "ภาพรวมบริการเวลเนสและแนวคิดโปรแกรมสุขภาพของ ARPAR Longevity Center",
      "Overview of ARPAR Longevity Center wellness services and overall health program concept",
    ),
    width: 1280,
    height: 905,
  },

  programs: [
    {
      slug: "preventive-checkup",
      tag: L("เชิงป้องกัน", "Preventive"),
      title: L("ตรวจสุขภาพเชิงป้องกันเฉพาะบุคคล", "Personalized Preventive Checkup"),
      description: L(
        "เห็นภาพสุขภาพในวันนี้อย่างครบถ้วน พร้อมแผนที่ชัดเจนสำหรับวันข้างหน้า ออกแบบตามร่างกายและเป้าหมายของคุณ",
        "A comprehensive picture of your health today, with a clear plan for tomorrow — designed around your biology and goals.",
      ),
      bullets: L(
        ["ชุดตรวจคัดกรองเฉพาะบุคคล", "ปรึกษาแพทย์แบบตัวต่อตัว", "แผนสุขภาพระยะยาวเฉพาะบุคคล"],
        ["Tailored screening panel", "One-on-one doctor consultation", "Personalized long-term health plan"],
      ),
    },
    {
      slug: "iv-drip",
      tag: L("เพิ่มพลัง", "Vitality"),
      title: L("วิตามินดริปเฉพาะบุคคล", "IV Drip Formulas"),
      description: L(
        "สูตรวิตามินดริปที่ออกแบบมาเพื่อสนับสนุนพลังงาน ความชุ่มชื้น และการฟื้นตัว เป็นส่วนหนึ่งของการดูแลที่สมดุล",
        "Carefully composed IV formulas designed to support energy, hydration, and recovery as part of a balanced wellness routine.",
      ),
      bullets: L(
        ["สูตรที่เหมาะกับความต้องการของคุณ", "ห้องทรีตเมนต์ที่สงบและสบาย", "ดูแลโดยบุคลากรทางการแพทย์"],
        ["Formulas matched to your needs", "Comfortable, calm treatment rooms", "Administered by medical staff"],
      ),
    },
    {
      slug: "stem-cell-nk-cell",
      tag: L("เชิงฟื้นฟู", "Regenerative"),
      title: L("สเต็มเซลล์ และ NK Cell", "Stem Cell & NK Cell"),
      description: L(
        "โปรแกรมเชิงฟื้นฟูระดับเซลล์ ดูแลครบทุกขั้นตอนโดยทีมแพทย์ผู้มีประสบการณ์",
        "Regenerative and cellular wellness programs, guided end-to-end by our experienced medical team.",
      ),
      bullets: L(
        ["ประเมินทางการแพทย์อย่างละเอียดก่อนเริ่ม", "แนวทางที่อิงหลักฐาน", "ติดตามและดูแลอย่างต่อเนื่อง"],
        ["Thorough medical assessment first", "Evidence-informed protocols", "Ongoing follow-up and care"],
      ),
    },
  ],

  whyChoose: {
    eyebrow: L("ทำไมต้อง ARPAR", "Why Choose ARPAR"),
    title: L("มาตรฐานการดูแลระดับพรีเมียมที่คุณวางใจได้", "A premium standard of care you can trust"),
    subtitle: L(
      "เหตุผลที่หลายคนเลือกวางแผนสุขภาพระยะยาวกับเรา",
      "The reasons people choose us to plan their long-term health",
    ),
  },

  reasons: [
    {
      icon: "user" as IconName,
      title: L("ดูแลเฉพาะบุคคล", "Personalized Care"),
      description: L(
        "ทุกแผนออกแบบรอบตัวคุณ — ทั้งร่างกาย ไลฟ์สไตล์ และเป้าหมายส่วนตัว",
        "Every plan is built around you — your biology, lifestyle, and personal goals.",
      ),
    },
    {
      icon: "stethoscope" as IconName,
      title: L("ดูแลโดยแพทย์", "Medical Supervision"),
      description: L(
        "ทุกโปรแกรมออกแบบและดูแลโดยทีมแพทย์ผู้มีประสบการณ์",
        "Programs are designed and overseen by experienced medical professionals.",
      ),
    },
    {
      icon: "leaf" as IconName,
      title: L("ดูแลแบบองค์รวม", "Holistic Wellness"),
      description: L(
        "เราดูแลทั้งตัวบุคคล — ร่างกาย พลังงาน และความมั่นใจไปพร้อมกัน",
        "We care for the whole person — body, energy, and confidence together.",
      ),
    },
    {
      icon: "diamond" as IconName,
      title: L("ประสบการณ์ระดับพรีเมียม", "Premium Experience"),
      description: L(
        "บรรยากาศที่สงบ เป็นส่วนตัว และพิถีพิถันตั้งแต่ครั้งแรกที่มาเยือน",
        "A calm, private, and refined environment from your first visit onward.",
      ),
    },
    {
      icon: "calendar" as IconName,
      title: L("วางแผนสุขภาพระยะยาว", "Long-term Health Planning"),
      description: L(
        "เรามุ่งเน้นความเป็นอยู่ที่ดีอย่างยั่งยืนและการวางแผนสุขภาพระยะยาว",
        "We focus on sustainable wellbeing and long-term health planning.",
      ),
    },
  ],

  doctorsSection: {
    eyebrow: L("ทีมผู้เชี่ยวชาญ", "Our Experts"),
    title: L("ดูแลโดยทีมแพทย์ผู้มีประสบการณ์", "Guided by experienced medical professionals"),
    description: L(
      "ทุกโปรแกรมของ ARPAR ออกแบบและดูแลโดยผู้เชี่ยวชาญทางการแพทย์ที่ให้ความสำคัญกับสุขภาพระยะยาวของคุณ",
      "Every ARPAR program is designed and supervised by qualified medical experts who put your long-term wellbeing first.",
    ),
    disclaimer: L(
      "* ข้อมูลแพทย์ที่แสดงเป็นตัวอย่างชั่วคราว และจะอัปเดตด้วยข้อมูลทีมแพทย์จริงของ ARPAR",
      "* Doctor profiles shown are placeholders and will be updated with the ARPAR medical team.",
    ),
  },

  doctors: [
    {
      name: "Dr. [Name Placeholder]",
      position: L("ผู้อำนวยการแพทย์", "Medical Director"),
      specialty: L("เวชศาสตร์ชะลอวัยและการป้องกัน", "Longevity & Preventive Medicine"),
    },
    {
      name: "Dr. [Name Placeholder]",
      position: L("แพทย์เวชศาสตร์ฟื้นฟู", "Regenerative Medicine Physician"),
      specialty: L("เวลเนสระดับเซลล์และการฟื้นฟู", "Cellular & Regenerative Wellness"),
    },
    {
      name: "Dr. [Name Placeholder]",
      position: L("แพทย์เวชศาสตร์เวลเนส", "Wellness Physician"),
      specialty: L("สมดุลฮอร์โมนและโภชนาการ", "Hormone Balance & Nutrition"),
    },
  ],

  gallerySection: {
    eyebrow: L("ประสบการณ์ในคลินิก", "Clinic Experience"),
    title: L("พื้นที่ที่สงบและพิถีพิถัน เพื่อความเป็นอยู่ที่ดีของคุณ", "A calm, refined space designed for your wellbeing"),
    description: L(
      "ตั้งแต่เลานจ์ต้อนรับไปจนถึงห้องทรีตเมนต์ส่วนตัว ทุกรายละเอียดถูกออกแบบเพื่อความสบายและความไว้วางใจ",
      "From the reception lounge to private treatment rooms, every detail is considered for comfort and trust.",
    ),
  },

  gallery: [
    { label: L("บรรยากาศคลินิก", "Clinic atmosphere"), tone: "warm" as Tone },
    { label: L("ห้องให้คำปรึกษา", "Consultation room"), tone: "cool" as Tone },
    { label: L("ห้องทรีตเมนต์", "Treatment room"), tone: "gold" as Tone },
    { label: L("อุปกรณ์ทางการแพทย์", "Medical equipment"), tone: "cool" as Tone },
    { label: L("ประสบการณ์เวลเนส", "Wellness experience"), tone: "warm" as Tone },
    { label: L("แผนกต้อนรับและเลานจ์", "Reception & lounge"), tone: "gold" as Tone },
  ],

  articlesSection: {
    eyebrow: L("บทความ / ความรู้", "Articles / Knowledge"),
    title: L("เข้าใจเรื่องการมีอายุยืน ทีละบทความ", "Understanding longevity, one read at a time"),
  },

  articles: [
    {
      category: L("Longevity", "Longevity"),
      title: L("Longevity คืออะไร?", "What is Longevity?"),
      excerpt: L(
        "ทำความเข้าใจ longevity ในฐานะแนวทางดูแลสุขภาพเชิงรุกตลอดชีวิต — ไม่ใช่แค่อายุยืน แต่อยู่อย่างมีคุณภาพ",
        "Understanding longevity as a proactive, whole-life approach to health — not just living longer, but living well.",
      ),
      readingTime: L("อ่าน 4 นาที", "4 min read"),
    },
    {
      category: L("เชิงป้องกัน", "Preventive"),
      title: L("การตรวจสุขภาพเชิงป้องกันเฉพาะบุคคลเหมาะกับใคร?", "Who is a Personalized Preventive Checkup for?"),
      excerpt: L(
        "การตรวจคัดกรองเฉพาะบุคคลช่วยให้คนทุกช่วงวัยดูแลสุขภาพระยะยาวเชิงรุกได้อย่างไร",
        "How tailored screening helps people at every stage take a proactive role in their long-term health.",
      ),
      readingTime: L("อ่าน 5 นาที", "5 min read"),
    },
    {
      category: L("เพิ่มพลัง", "Vitality"),
      title: L("วิตามินดริปช่วยสนับสนุนอะไรได้บ้าง?", "What can IV Drip support?"),
      excerpt: L(
        "มุมมองที่สมเหตุสมผลว่าสูตรวิตามินดริปเข้ากับการดูแลสุขภาพที่สมดุลภายใต้แพทย์อย่างไร",
        "A grounded look at how IV formulas fit into a balanced, medically guided wellness routine.",
      ),
      readingTime: L("อ่าน 3 นาที", "3 min read"),
    },
    {
      category: L("เวลเนส", "Wellness"),
      title: L("สุขภาพดีเริ่มจากภายใน", "Health from the inside out"),
      excerpt: L(
        "ทำไมพลังชีวิตที่ยั่งยืนจึงเริ่มจากความสมดุลภายในร่างกาย — โภชนาการ ฮอร์โมน และการฟื้นตัว",
        "Why lasting vitality begins with balance inside the body — nutrition, hormones, and recovery.",
      ),
      readingTime: L("อ่าน 6 นาที", "6 min read"),
    },
    {
      category: L("การตรวจ", "Testing"),
      title: L("Micronutrient Testing คืออะไร?", "What is Micronutrient Testing?"),
      excerpt: L(
        "การวัดระดับวิตามินและแร่ธาตุช่วยเปลี่ยนการคาดเดาให้เป็นแผนที่ชัดเจนและเฉพาะบุคคลได้อย่างไร",
        "How measuring your vitamins and minerals can help turn guesswork into a clearer, personal plan.",
      ),
      readingTime: L("อ่าน 4 นาที", "4 min read"),
    },
  ],

  contact: {
    eyebrow: L("ติดต่อ / นัดหมาย", "Contact / Booking"),
    title: L("เริ่มต้นวางแผนสุขภาพของคุณกับ ARPAR", "Start planning your health with ARPAR"),
    body: L(
      "ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโปรแกรมสุขภาพเฉพาะคุณ — เราพร้อมดูแลคุณในทุกขั้นตอน",
      "Talk to our specialists to design a health program just for you — we're with you at every step.",
    ),
    panelTitle: L("ติดต่อ ARPAR", "Contact ARPAR"),
    panelSub: L("เลือกช่องทางที่สะดวกที่สุดสำหรับคุณ", "Choose the channel that's easiest for you"),
    quick: { line: L("ไลน์", "LINE"), phone: L("โทร", "Call"), facebook: L("เฟซบุ๊ก", "Facebook") },
    mapTitle: L("Google Map", "Google Map"),
    mapSub: L("ตำแหน่งคลินิก (ตัวอย่าง)", "Clinic location (placeholder)"),
    formTitle: L("นัดหมาย / ปรึกษาผู้เชี่ยวชาญ", "Book / talk to a specialist"),
    formSub: L(
      "กรอกข้อมูลด้านล่าง แล้วทีมงานจะติดต่อกลับเพื่อวางแผนสุขภาพร่วมกับคุณ",
      "Fill in the form below and our team will get back to you to plan your health together.",
    ),
  },

  form: {
    name: L("ชื่อ-นามสกุล", "Full name"),
    namePh: L("ชื่อของคุณ", "Your name"),
    phone: L("เบอร์โทรศัพท์", "Phone number"),
    phonePh: L("08X-XXX-XXXX", "08X-XXX-XXXX"),
    email: L("อีเมล", "Email"),
    emailPh: L("you@example.com", "you@example.com"),
    interest: L("บริการที่สนใจ", "Service of interest"),
    interestPh: L("เลือกบริการ", "Select a service"),
    interestOther: L("อื่น ๆ", "Other"),
    message: L("ข้อความ", "Message"),
    messagePh: L("เล่าเป้าหมายสุขภาพของคุณให้เราทราบ", "Tell us about your health goals"),
    submit: L("ส่งข้อมูลเพื่อให้เราติดต่อกลับ", "Send and we'll contact you"),
    submitting: L("กำลังส่ง...", "Sending..."),
    successFallback: L(
      "ขอบคุณค่ะ — เราได้รับข้อมูลของคุณแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด",
      "Thank you — we've received your details and will be in touch soon.",
    ),
    errorFallback: L(
      "เกิดข้อผิดพลาด กรุณาลองใหม่ หรือติดต่อเราผ่าน LINE/โทรศัพท์",
      "Something went wrong. Please try again, or reach us via LINE/phone.",
    ),
    networkError: L(
      "ไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาติดต่อเราผ่าน LINE หรือโทรศัพท์",
      "We couldn't send your details right now. Please reach us via LINE or phone.",
    ),
    privacy: L(
      "ข้อมูลของคุณจะถูกเก็บเป็นความลับและใช้เพื่อการติดต่อกลับเท่านั้น",
      "Your information is kept confidential and used only to contact you.",
    ),
  },

  footer: {
    blurb: L(
      "ดูแลสุขภาพและความงามระดับพรีเมียม — โปรแกรมเฉพาะบุคคลเพื่อสุขภาพ พลังชีวิต และความมั่นใจในระยะยาว",
      "Premium longevity & wellness — personalized programs for long-term health, vitality, and confidence.",
    ),
    explore: L("สำรวจ", "Explore"),
    services: L("บริการ", "Services"),
    visit: L("เยี่ยมชมเรา", "Visit us"),
    rights: L("สงวนลิขสิทธิ์", "All rights reserved."),
    tagline: L(
      "อาภา Longevity Center · ดูแลสุขภาพแบบองค์รวมเพื่อชีวิตที่ยืนยาว",
      "ARPAR Longevity Center · holistic care for a longer, healthier life",
    ),
  },

  /** Closing CTA band reused across services pages. */
  ctaBand: {
    title: L("เริ่มต้นวางแผนสุขภาพของคุณกับ ARPAR", "Start planning your health with ARPAR"),
    subtitle: L(
      "ปรึกษาผู้เชี่ยวชาญของเราเพื่อออกแบบโปรแกรมสุขภาพเฉพาะคุณ",
      "Talk to our specialists to design a health program just for you.",
    ),
  },
};

/* ============================================================
   Resolved dictionary
   ============================================================ */
export type Dictionary = Resolve<typeof source>;
export type DictService = Dictionary["services"][number];
export type DictBannerSlide = Dictionary["bannerSlides"][number];
export type DictProgram = Dictionary["programs"][number];

export function getDictionary(locale: Locale): Dictionary {
  return resolveLocale(source, locale) as Dictionary;
}

/* ---------- Service helpers (locale-independent slugs) ---------- */
export const serviceSlugs = source.services.map((s) => s.slug);

export const getServiceBySlug = (dict: Dictionary, slug: string): DictService | undefined =>
  dict.services.find((s) => s.slug === slug);

export const getRelatedServices = (
  dict: Dictionary,
  slug: string,
  count = 3,
): DictService[] => dict.services.filter((s) => s.slug !== slug).slice(0, count);
