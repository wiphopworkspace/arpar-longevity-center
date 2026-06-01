import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SparkleGlyph } from "./icons";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  titleTh?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Consistent section header: gold eyebrow + heading + optional Thai line + description. */
export function SectionHeading({
  eyebrow,
  title,
  titleTh,
  description,
  align = "center",
  className = "",
}: Props) {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-4 ${
        isCenter ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {eyebrow && (
        <span className="eyebrow">
          <SparkleGlyph width={14} height={14} className="text-gold" />
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h2>
      {titleTh && (
        <p className="font-thai text-lg font-medium text-ink-soft sm:text-xl">
          {titleTh}
        </p>
      )}
      {description && (
        <p
          className={`max-w-2xl text-base leading-relaxed text-ink-soft ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
