"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/data/content";

const labels: Record<Locale, string> = { th: "ไทย", en: "EN" };

/**
 * TH / EN switcher. Keeps the current page context by swapping only the
 * locale prefix of the current path (e.g. /th/services/iv-drip → /en/...).
 */
export function LanguageSwitcher({
  locale,
  className = "",
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || `/${locale}`;
  const rest = pathname.replace(/^\/(th|en)(?=\/|$)/, "");

  return (
    <div
      role="group"
      aria-label="Language / ภาษา"
      className={`inline-flex items-center gap-0.5 rounded-full border border-line bg-white/70 p-0.5 ${className}`}
    >
      {locales.map((l) => {
        const href = `/${l}${rest}` || `/${l}`;
        const active = l === locale;
        return (
          <Link
            key={l}
            href={href}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            onClick={onNavigate}
            className={`rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
              active
                ? "bg-gold-gradient text-white shadow-soft"
                : "text-ink-soft hover:text-gold"
            }`}
          >
            {labels[l]}
          </Link>
        );
      })}
    </div>
  );
}
