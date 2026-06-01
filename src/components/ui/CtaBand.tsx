import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { SparkleGlyph, ArrowRight } from "./icons";
import { cta } from "@/data/content";

type Props = {
  title: string;
  subtitle?: string;
};

/** Gold gradient closing call-to-action band (shared across pages). */
export function CtaBand({ title, subtitle }: Props) {
  return (
    <section className="container-rail py-12 lg:py-16">
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
          <h2 className="mx-auto max-w-2xl text-balance font-thai text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/85">
              {subtitle}
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <Button
              href={cta.href}
              size="lg"
              variant="outline"
              className="border-white/70 bg-white/10 text-white hover:bg-white/20 hover:border-white"
            >
              {cta.label}
              <ArrowRight width={18} height={18} />
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
