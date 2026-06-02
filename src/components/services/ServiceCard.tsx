import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { Icon, ArrowRight, SparkleGlyph } from "@/components/ui/icons";
import {
  localePath,
  type DictService,
  type Dictionary,
  type Locale,
} from "@/data/content";

type Props = {
  service: DictService;
  dict: Dictionary;
  locale: Locale;
  /** Stagger delay for the reveal animation. */
  delay?: number;
  /** Compact variant (used for "related services"): hides benefits. */
  compact?: boolean;
};

/** Reusable service card — used on /services and in related-services lists. */
export function ServiceCard({
  service,
  dict,
  locale,
  delay = 0,
  compact = false,
}: Props) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line/80 bg-white/80 shadow-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-card">
        <div className="relative">
          <Placeholder
            label={service.title}
            tone={service.tone}
            icon={service.icon}
            aspect="aspect-[16/10]"
            rounded="rounded-none"
            className="border-0 shadow-none"
          />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft/40 text-gold transition-colors group-hover:bg-gold-gradient group-hover:text-white">
            <Icon name={service.icon} width={24} height={24} />
          </span>

          <h3 className="mt-5 font-heading text-lg font-semibold text-ink">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            {service.description}
          </p>

          {!compact && (
            <ul className="mt-5 space-y-2.5">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <SparkleGlyph width={14} height={14} className="mt-1 shrink-0 text-gold" />
                  <span className="text-sm text-ink">{benefit}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
            <Link
              href={localePath(locale, `/services/${service.slug}`)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5"
            >
              {dict.ui.learnMore}
              <ArrowRight width={16} height={16} />
            </Link>
            <Link
              href={localePath(locale, "/#contact")}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-gold"
            >
              {dict.ui.consult}
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
