import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import {
  LineGlyph,
  PhoneGlyph,
  FacebookGlyph,
  MapPin,
  ClockGlyph,
  SparkleGlyph,
} from "@/components/ui/icons";
import { site, contact } from "@/data/content";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-rail">
        {/* Closing CTA banner */}
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gold-gradient px-8 py-12 text-center shadow-gold sm:px-12 sm:py-14">
            <SparkleGlyph
              aria-hidden="true"
              className="absolute left-8 top-8 text-white/40 animate-shimmer"
              width={24}
              height={24}
            />
            <SparkleGlyph
              aria-hidden="true"
              className="absolute bottom-8 right-10 text-white/30 animate-shimmer"
              width={18}
              height={18}
              style={{ animationDelay: "1.4s" }}
            />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              {contact.eyebrow}
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance font-thai text-2xl font-semibold leading-snug text-white sm:text-3xl">
              {contact.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85">
              {contact.body}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left: contact details + quick actions + map */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="card-surface p-7">
                <h3 className="font-heading text-xl font-semibold text-ink">
                  ติดต่อ ARPAR
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  เลือกช่องทางที่สะดวกที่สุดสำหรับคุณ
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <QuickAction
                    href={site.lineHref}
                    label="LINE"
                    sub={site.lineId}
                    icon={<LineGlyph width={22} height={22} />}
                  />
                  <QuickAction
                    href={site.phoneHref}
                    label="โทร"
                    sub={site.phone}
                    icon={<PhoneGlyph width={22} height={22} />}
                  />
                  <QuickAction
                    href={site.facebook}
                    label="Facebook"
                    sub="ARPAR"
                    icon={<FacebookGlyph width={22} height={22} />}
                  />
                </div>

                <div className="mt-6 space-y-3 border-t border-line/70 pt-5 text-sm text-ink-soft">
                  <p className="flex gap-3">
                    <MapPin width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                    <span className="font-thai leading-relaxed">{site.address}</span>
                  </p>
                  <p className="flex gap-3">
                    <ClockGlyph width={18} height={18} className="mt-0.5 shrink-0 text-gold" />
                    <span className="font-thai">{site.hours}</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Map placeholder */}
            <Reveal delay={80}>
              <div
                role="img"
                aria-label="Map location placeholder"
                className="relative flex h-56 items-center justify-center overflow-hidden rounded-3xl border border-line bg-cream-200/70"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(#e6ddcc 1px, transparent 1px), linear-gradient(90deg, #e6ddcc 1px, transparent 1px)",
                    backgroundSize: "44px 44px",
                  }}
                />
                <div className="relative flex flex-col items-center gap-2 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gold shadow-soft">
                    <MapPin width={24} height={24} />
                  </span>
                  <span className="font-heading text-sm font-semibold text-ink">
                    Google Map
                  </span>
                  <span className="text-xs text-ink-soft">
                    ตำแหน่งคลินิก (placeholder)
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={60}>
            <div className="card-surface p-7 sm:p-8">
              <h3 className="font-heading text-xl font-semibold text-ink">
                นัดหมาย / ปรึกษาผู้เชี่ยวชาญ
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                กรอกข้อมูลด้านล่าง แล้วทีมงานจะติดต่อกลับเพื่อวางแผนสุขภาพร่วมกับคุณ
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuickAction({
  href,
  label,
  sub,
  icon,
}: {
  href: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-white/70 p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-soft"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/40 text-gold transition-colors group-hover:bg-gold-gradient group-hover:text-white">
        {icon}
      </span>
      <span className="font-heading text-sm font-semibold text-ink">{label}</span>
      <span className="text-xs text-ink-soft">{sub}</span>
    </a>
  );
}
