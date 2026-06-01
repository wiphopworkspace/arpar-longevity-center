import Image from "next/image";
import type { SiteImage } from "@/data/content";

type Props = {
  image: SiteImage;
  /** Responsive sizes hint — defaults to a full-width-ish brochure. */
  sizes?: string;
  /** Optional caption shown beneath the card. */
  caption?: string;
  priority?: boolean;
  className?: string;
};

/**
 * Premium card for brochure-style images that contain embedded text/logos.
 * Renders at the image's NATURAL aspect ratio (`h-auto w-full`) so nothing is
 * ever cropped — no `object-cover`. Soft gold-bordered cream frame matches the
 * ARPAR design system.
 */
export function BrochureImage({
  image,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  caption,
  priority = false,
  className = "",
}: Props) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-3xl border border-gold/30 bg-white p-2 shadow-card sm:p-3">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full rounded-2xl"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
