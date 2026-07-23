import { createFileRoute } from "@tanstack/react-router";
import { Img } from "@/components/Img";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Owais Ahmad Khan" },
      { name: "description", content: "About Owais Ahmad Khan: CEO/Founder of Zai Systems with 18+ years of expertise across 350+ projects." },
      { property: "og:title", content: "About — Owais Ahmad Khan" },
      { property: "og:description", content: "CEO and Founder of Zai Systems — 18+ years, 350+ projects, 70+ clients." },
    ],
  }),
  component: About,
});

const gallery = Array.from({ length: 17 }, (_, i) => i + 1);

const stats = [
  { value: "350+", label: "Projects Delivered", desc: "Successfully executing over 350+ projects to drive innovation and growth." },
  { value: "18+", label: "Years of Expertise", desc: "Leveraging 18+ years of experience to provide cutting-edge solutions and insights." },
  { value: "70+", label: "Satisfied Clients", desc: "Trusted by over 70 clients for delivering impactful and lasting digital experiences." },
  { value: "100+", label: "Team Members", desc: "A passionate team of 100+ professionals working together to achieve excellence." },
];

function About() {
  return (
    <>
      <section className="diagonal-bg mx-auto max-w-7xl px-6 py-20">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          About
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Building the operating system for data-driven companies.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          I am the CEO and Founder of Zai Systems, a trailblazing technology company redefining digital transformation
          across industries. As a visionary leader with a passion for innovation, I have built my career at the
          intersection of front-line software solutions and people-centric leadership. My journey has been driven by a
          commitment to empowering businesses through front-line technology and fostering meaningful connections with
          people at every step of the way.
        </p>
      </section>

      <section className="border-y border-border/50 bg-secondary/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="glow-panel rounded-2xl p-6">
              <div className="font-display text-4xl font-bold text-primary">{s.value}</div>
              <div className="mt-2 font-display text-lg font-semibold">{s.label}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold md:text-4xl">Speaking &amp; Highlights</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Moments from seminars, panels and stage appearances across the industry.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {gallery.map((n) => (
            <div key={n} className="glow-panel aspect-[4/5] overflow-hidden rounded-2xl">
              <Img
                src={`/images/gallery-${n}.jpg`}
                alt={`Owais Ahmad Khan — photo ${n}`}
                placeholderLabel={`Gallery ${n}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
