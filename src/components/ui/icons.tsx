import type { SVGProps } from "react";

/* ============================================================
   Thin gold line-icon set (1.5 stroke, currentColor).
   Use text-gold on the wrapper to render in gold.
   ============================================================ */

export type IconName =
  | "cell"
  | "checkup"
  | "flask"
  | "capsule"
  | "drip"
  | "balance"
  | "leaf"
  | "sparkleFace"
  | "user"
  | "stethoscope"
  | "diamond"
  | "calendar";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

const Cell = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="10" cy="10" r="2" />
    <circle cx="15" cy="14" r="1.4" />
    <circle cx="9.5" cy="15" r="1" />
  </svg>
);

const Checkup = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="5" y="3" width="14" height="18" rx="2.5" />
    <path d="M9 3.5V6h6V3.5" />
    <path d="M8 11l2 2 4-4" />
    <path d="M8 16.5h6" />
  </svg>
);

const Flask = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 3h6" />
    <path d="M10 3v5.2L5.6 17a2 2 0 0 0 1.8 2.9h9.2a2 2 0 0 0 1.8-2.9L14 8.2V3" />
    <path d="M7.5 14h9" />
  </svg>
);

const Capsule = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-30 12 12)" />
    <path d="M12 7.6l4 7" />
  </svg>
);

const Drip = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="8" y="3" width="8" height="11" rx="2" />
    <path d="M8 7h8" />
    <path d="M12 14v3.5" />
    <path d="M12 21c1.4 0 2.4-1.1 2.4-2.4 0-1.1-2.4-3.6-2.4-3.6s-2.4 2.5-2.4 3.6C9.6 19.9 10.6 21 12 21Z" />
  </svg>
);

const Balance = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v15" />
    <path d="M6 19h12" />
    <path d="M5 7h14" />
    <path d="M5 7l-2.5 4.5a2.5 2.5 0 0 0 5 0L5 7Z" />
    <path d="M19 7l-2.5 4.5a2.5 2.5 0 0 0 5 0L19 7Z" />
  </svg>
);

const Leaf = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 19c0-7 5-13 14-13 0 9-6 14-13 14" />
    <path d="M5 19c2-4 5-6.5 9-8" />
  </svg>
);

const SparkleFace = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4.5a7.5 7.5 0 1 0 6.6 11" />
    <path d="M9.5 11h.01M14 11h.01" />
    <path d="M9.5 14.5c1.5 1.3 3.5 1.3 5 0" />
    <path d="M18 3l.7 1.8L20.5 5.5l-1.8.7L18 8l-.7-1.8L15.5 5.5l1.8-.7L18 3Z" />
  </svg>
);

const User = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

const Stethoscope = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 3v4a4 4 0 0 0 8 0V3" />
    <path d="M6 3H4.5M14 3h1.5" />
    <path d="M10 15v1a5 5 0 0 0 10 0v-2" />
    <circle cx="20" cy="13" r="2" />
  </svg>
);

const Diamond = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 9h14l-7 11L5 9Z" />
    <path d="M8 4h8l3 5H5l3-5Z" />
    <path d="M9.5 9 12 20l2.5-11" />
  </svg>
);

const Calendar = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="5" width="16" height="16" rx="2.5" />
    <path d="M4 9h16M8 3v4M16 3v4" />
    <path d="M8.5 14l2 2 4-4" />
  </svg>
);

const registry: Record<IconName, (p: IconProps) => JSX.Element> = {
  cell: Cell,
  checkup: Checkup,
  flask: Flask,
  capsule: Capsule,
  drip: Drip,
  balance: Balance,
  leaf: Leaf,
  sparkleFace: SparkleFace,
  user: User,
  stethoscope: Stethoscope,
  diamond: Diamond,
  calendar: Calendar,
};

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = registry[name];
  return <Cmp {...props} />;
}

/* ---- Standalone brand / UI glyphs ---- */

export const SparkleGlyph = (p: IconProps) => (
  <svg {...base({ strokeWidth: 1.25, ...p })}>
    <path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6Z" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const LineGlyph = (p: IconProps) => (
  <svg {...base({ strokeWidth: 1.5, ...p })}>
    <rect x="3" y="4.5" width="18" height="13" rx="4" />
    <path d="M8 16.5c-1 1.5-3 2.3-4 2.6.6-1 .8-2 .6-2.8" />
    <path d="M7 9v4M7 9l2.5 4V9M12 9v4h2.2M16.5 9v4M19 9h-2.2v4H19" />
  </svg>
);

export const PhoneGlyph = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 3.5h3l1.2 4-2 1.3a11 11 0 0 0 4.2 4.2l1.3-2 4 1.2v3a1.5 1.5 0 0 1-1.6 1.5C12.4 20.2 3.8 11.6 5 4.9A1.5 1.5 0 0 1 6.5 3.5Z" />
  </svg>
);

export const FacebookGlyph = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14.5 8.5V7c0-.8.4-1.2 1.3-1.2H17V3h-2.2c-2.3 0-3.3 1.4-3.3 3.4v2.1H9.5V11h2v9h3v-9h2.1l.4-2.5h-2.5Z" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const ClockGlyph = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const MailGlyph = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);
