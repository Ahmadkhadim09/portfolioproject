import { createFileRoute } from "@tanstack/react-router";
import { Img } from "@/components/Img";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognition — Owais Ahmad Khan" },
      { name: "description", content: "Awards, certifications and industry recognition earned by Owais Ahmad Khan." },
      { property: "og:title", content: "Awards & Recognition — Owais Ahmad Khan" },
      { property: "og:description", content: "Awards, certifications and testimonials." },
    ],
  }),
  component: Awards,
});

const awards = Array.from({ length: 10 }, (_, i) => i + 1);
const certs = Array.from({ length: 12 }, (_, i) => i + 1);

const testimonials = [
  {
    name: "Huzaifa Ali",
    role: "React & Next JS Developer — Spark AI",
    slug: "huzaifa",
    quote:
      "Sir Owais played an integral role in helping me develop my skills. He positively influenced my career trajectory and helped me build confidence in this challenging field.",
  },
  {
    name: "Muhammad Zeeshan Tanveer",
    role: "Web Developer — Soloinsight Inc.",
    slug: "zeeshan",
    quote:
      "He exceeded my expectations with his exceptional leadership, strategic thinking, and technical skills. Every project delivered on time and within budget.",
  },
  {
    name: "Zahid Imam",
    role: "Digital Evangelist — I'm Innovator",
    slug: "zahid",
    quote:
      "Beyond his technical prowess, Owais stood out for his exceptional cooperation and kindness towards every team member.",
  },
  {
    name: "Ahmed Sohail",
    role: "Principal Software Engineer — Certified Nerds",
    slug: "ahmed",
    quote:
      "Consistently delivered great quality code and service within schedule. Strong technical, analytical, and communication skills.",
  },
  {
    name: "Ushna Sadaf Dar",
    role: "Guest Speaker Testimonial",
    slug: "ushna",
    quote:
      "A skilled, innovative, and professional leader who would be an asset to any team. He has proven his expertise and excellence in the IT industry.",
  },
  {
    name: "Hamza Afzal",
    role: "WordPress Developer — S&D Marketing",
    slug: "hamza",
    quote:
      "Dedicated, technically strong, and eager to learn new technologies. Delivered tasks in very tight deadlines with best quality.",
  },
];

function Awards() {
  return (
    <>
      <section className="diagonal-bg mx-auto max-w-7xl px-6 py-20">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          Awards &amp; Recognition
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Two decades of excellence, honored.
        </h1>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Awards</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {awards.map((n) => (
            <div key={n} className="glow-panel flex aspect-square items-center justify-center overflow-hidden rounded-2xl p-4">
              <Img
                src={`/images/award-${n}.png`}
                alt={`Award ${n}`}
                placeholderLabel={`Award ${n}`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Certifications</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {certs.map((n) => (
            <div key={n} className="glow-panel flex aspect-[3/4] items-center justify-center overflow-hidden rounded-2xl p-3">
              <Img
                src={`/images/cert-${n}.png`}
                alt={`Certification ${n}`}
                placeholderLabel={`Cert ${n}`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Recommendations</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="glow-panel flex flex-col rounded-2xl p-6">
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <Img
                    src={`/images/testimonial-${t.slug}.jpg`}
                    alt={t.name}
                    placeholderLabel={t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                    className="h-11 w-11 shrink-0 overflow-hidden rounded-full object-cover"
                  />
                  <div>
                    <div className="font-display text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
