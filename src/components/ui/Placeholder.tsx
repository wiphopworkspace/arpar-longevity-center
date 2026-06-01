import type { IconName } from "./icons";
import { Icon, SparkleGlyph } from "./icons";

type Tone = "warm" | "cool" | "gold";

const tones: Record<Tone, { from: string; to: string; ring: string }> = {
  warm: { from: "#F6F1E8", to: "#ECE2CF", ring: "#E6DDCC" },
  cool: { from: "#FFFFFF", to: "#F1EDE4", ring: "#E6DDCC" },
  gold: { from: "#F3E7C4", to: "#E8D7A8", ring: "#D9C28A" },
};

type Props = {
  label?: string;
  tone?: Tone;
  icon?: IconName;
  className?: string;
  rounded?: string;
  /** Aspect ratio utility class, e.g. "aspect-[4/5]" */
  aspect?: string;
};

/**
 * Premium image placeholder — soft cream/gold gradient with subtle
 * sparkle texture and an optional label. Swap for <Image> + real
 * photography (doctor, IV drip, clinic interior, etc.) later.
 */
export function Placeholder({
  label = "ARPAR",
  tone = "warm",
  icon,
  className = "",
  rounded = "rounded-3xl",
  aspect = "aspect-[4/3]",
}: Props) {
  const t = tones[tone];
  return (
    <div
      role="img"
      aria-label={`${label} — image placeholder`}
      className={`group relative isolate overflow-hidden ${rounded} ${aspect} border border-line/70 shadow-soft ${className}`}
      style={{
        background: `linear-gradient(140deg, ${t.from} 0%, ${t.to} 100%)`,
      }}
    >
      {/* Soft gold curve */}
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-50"
        aria-hidden="true"
      >
        <path
          d="M0 220 C 110 150 180 250 280 190 C 340 155 380 175 400 160 L400 300 L0 300 Z"
          fill="rgba(184,149,66,0.10)"
        />
        <path
          d="M0 250 C 120 200 200 280 320 230 C 360 212 384 224 400 214"
          fill="none"
          stroke="rgba(184,149,66,0.30)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Scattered sparkles */}
      <SparkleGlyph
        width={22}
        height={22}
        className="absolute right-6 top-6 text-gold/40 animate-shimmer"
      />
      <SparkleGlyph
        width={13}
        height={13}
        className="absolute left-8 top-12 text-gold/30 animate-shimmer"
        style={{ animationDelay: "1.2s" }}
      />

      {/* Center glyph + label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
        {icon ? (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/55 text-gold shadow-soft">
            <Icon name={icon} width={26} height={26} />
          </span>
        ) : (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/55 text-gold shadow-soft">
            <SparkleGlyph width={24} height={24} />
          </span>
        )}
        <span className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">
          {label}
        </span>
      </div>
    </div>
  );
}
