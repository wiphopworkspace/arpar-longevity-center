import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Placeholder } from "@/components/ui/Placeholder";
import { gallery } from "@/data/content";

/* Varied spans for an editorial, non-uniform grid */
const spans = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "",
  "sm:col-span-2",
  "",
];

const aspects = [
  "aspect-square sm:aspect-auto sm:h-full",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[16/9] sm:aspect-auto sm:h-full",
  "aspect-[4/3]",
];

export function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-cream-200/60 py-20 lg:py-28"
    >
      <div className="container-rail">
        <SectionHeading
          eyebrow="Clinic Experience"
          title="A calm, refined space designed for your wellbeing"
          titleTh="บรรยากาศคลินิกที่สงบ หรูหรา และผ่อนคลาย"
          description="From the reception lounge to private treatment rooms, every detail is considered for comfort and trust."
        />

        <Reveal className="mt-14">
          <div className="grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-3">
            {gallery.map((item, i) => (
              <Placeholder
                key={item.label}
                label={item.label}
                tone={item.tone}
                aspect={aspects[i] ?? "aspect-[4/3]"}
                rounded="rounded-2xl"
                className={`h-full w-full ${spans[i] ?? ""}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
