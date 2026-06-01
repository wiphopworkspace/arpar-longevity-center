import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  // Gold CTA
  primary:
    "bg-gold-gradient text-white shadow-gold hover:shadow-card hover:-translate-y-0.5 focus-visible:ring-gold",
  // Gold outline
  outline:
    "border border-gold/60 text-gold bg-white/40 hover:bg-gold/10 hover:border-gold focus-visible:ring-gold",
  // Subtle text/ghost
  ghost: "text-ink hover:text-gold bg-transparent focus-visible:ring-line",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Renders as a Next.js Link when `href` is provided, otherwise a <button>. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const cls = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <Link className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
