import { site } from "@/data/content";

type Props = {
  className?: string;
  /** Show the Thai sub-wordmark under ARPAR */
  showThai?: boolean;
  /** Render light variant for dark backgrounds (footer) */
  light?: boolean;
};

/**
 * ARPAR wordmark: a soft gold sparkle/leaf monogram + the brand name.
 * Pure SVG/text so it stays crisp and lightweight at any size.
 */
export function BrandMark({ className = "", showThai = true, light = false }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative inline-flex h-11 w-11 items-center justify-center">
        <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden="true">
          <defs>
            <linearGradient id="arpar-mark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C9A646" />
              <stop offset="55%" stopColor="#B89542" />
              <stop offset="100%" stopColor="#E8D7A8" />
            </linearGradient>
          </defs>
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="url(#arpar-mark)"
            strokeWidth="1.5"
          />
          {/* Soft sparkle / seed of vitality */}
          <path
            d="M24 11c1.2 7.6 3.4 9.8 11 11-7.6 1.2-9.8 3.4-11 11-1.2-7.6-3.4-9.8-11-11 7.6-1.2 9.8-3.4 11-11Z"
            fill="url(#arpar-mark)"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-xl font-semibold tracking-[0.18em] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {site.name}
        </span>
        {showThai && (
          <span
            className={`mt-1 font-thai text-[0.7rem] tracking-[0.2em] ${
              light ? "text-cream-200/80" : "text-ink-soft"
            }`}
          >
            {site.nameTh} · {site.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
