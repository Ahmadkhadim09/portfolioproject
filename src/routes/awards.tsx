import { createFileRoute } from "@tanstack/react-router";

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

const awards = [
  ["10", "C1WZB765.png"],
  ["1", "CC2idTUf.png"],
  ["2", "ByyF3-_a.png"],
  ["3", "BdjZBPBo.png"],
  ["4", "sIOpyl5-.png"],
  ["5", "GY4lX8s2.png"],
  ["6", "B5PNotq6.png"],
  ["7", "DKlquHpE.png"],
  ["8", "eNBlnuj5.png"],
  ["9", "Ds0mH89j.png"],
];

const certs = [
  ["cone", "CL529mAm.webp"],
  ["ctwo", "D7-VmKts.webp"],
  ["cthree", "BroXIcvB.webp"],
  ["cfour", "BG-QMxQP.webp"],
  ["cfive", "DG5iTpQz.webp"],
  ["csix", "BY8F04R7.webp"],
  ["cseven", "bjwfSMnJ.webp"],
  ["ceight", "CLY_RiJT.webp"],
  ["cnine", "pKtBph8H.webp"],
  ["cten", "CEv_4FZF.webp"],
  ["celeven", "CW3OZQCu.webp"],
  ["ctwelve", "C_VBWYlm.webp"],
];

const testimonials = [
  {
    name: "Huzaifa Ali",
    role: "React & Next JS Developer — Spark AI",
    avatar: "https://owaisahmadkhan.com/assets/huzaifa-2OJSdIbj.webp",
    quote:
      "Sir Owais played an integral role in helping me develop my skills. He positively influenced my career trajectory and helped me build confidence in this challenging field.",
  },
  {
    name: "Muhammad Zeeshan Tanveer",
    role: "Web Developer — Soloinsight Inc.",
    avatar: "https://owaisahmadkhan.com/assets/zeeshan-TvGiwOiQ.webp",
    quote:
      "He exceeded my expectations with his exceptional leadership, strategic thinking, and technical skills. Every project delivered on time and within budget.",
  },
  {
    name: "Zahid Imam",
    role: "Digital Evangelist — I'm Innovator",
    avatar: "https://owaisahmadkhan.com/assets/zahid-Bi2q9mYA.webp",
    quote:
      "Beyond his technical prowess, Owais stood out for his exceptional cooperation and kindness towards every team member.",
  },
  {
    name: "Ahmed Sohail",
    role: "Principal Software Engineer — Certified Nerds",
    avatar: "https://owaisahmadkhan.com/assets/ahmad-BiLaL8ze.webp",
    quote:
      "Consistently delivered great quality code and service within schedule. Strong technical, analytical, and communication skills.",
  },
  {
    name: "Ushna Sadaf Dar",
    role: "Guest Speaker Testimonial",
    avatar: "https://owaisahmadkhan.com/assets/ushna-CVbSez7c.webp",
    quote:
      "A skilled, innovative, and professional leader who would be an asset to any team. He has proven his expertise and excellence in the IT industry.",
  },
  {
    name: "Hamza Afzal",
    role: "WordPress Developer — S&D Marketing",
    avatar: "https://owaisahmadkhan.com/assets/hamza-DHJ67O-x.webp",
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
          {awards.map(([n, f]) => (
            <div key={n} className="glow-panel flex aspect-square items-center justify-center rounded-2xl p-4">
              <img
                src={`https://owaisahmadkhan.com/assets/${n}-${f}`}
                alt={`Award ${n}`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Certifications</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {certs.map(([n, f]) => (
            <div key={n} className="glow-panel flex aspect-[3/4] items-center justify-center rounded-2xl p-3">
              <img
                src={`https://owaisahmadkhan.com/assets/${n}-${f}`}
                alt={`Certification ${n}`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
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
                  <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
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
