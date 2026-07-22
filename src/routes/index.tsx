import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Owais Ahmad Khan — CEO of Zai Systems | Portfolio" },
      { name: "description", content: "Home of Owais Ahmad Khan: 18+ years, 350+ projects, tech entrepreneur, speaker and IT coach." },
      { property: "og:title", content: "Owais Ahmad Khan — CEO of Zai Systems" },
      { property: "og:description", content: "18+ years, 350+ projects delivered. Visionary leader and IT coach." },
    ],
  }),
  component: Home,
});

const stats = [
  { value: "350+", label: "Projects Delivered" },
  { value: "18+", label: "Years of Expertise" },
  { value: "70+", label: "Satisfied Clients" },
  { value: "100+", label: "Team Members" },
];

const expertise = [
  { label: "Adaptability", score: 98 },
  { label: "Problem Solving", score: 86 },
  { label: "Attention to Detail", score: 95 },
  { label: "Collaboration", score: 89 },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="diagonal-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Visionary Leader · Tech Entrepreneur · IT Coach
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">
              We Build World-<span className="text-primary">Advancing</span> Software With Vision &amp; Passion
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              I&apos;m Owais Ahmad Khan — CEO and Founder of Zai Systems. I help organizations transform through
              front-line software solutions and people-centric leadership.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Get started now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                {["h1", "h2", "h3", "h4"].map((s) => (
                  <img
                    key={s}
                    src={`https://owaisahmadkhan.com/assets/${s}-${s === "h1" ? "DW6yvLLV" : s === "h2" ? "B9GrsYwW" : s === "h3" ? "Dr6jIs2K" : "BzQqrRIX"}.webp`}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div>
                <div className="text-sm font-medium">Trusted by industry experts</div>
                <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                  <span className="ml-1">4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            <div className="glow-panel col-span-1 flex flex-col items-center justify-center rounded-2xl p-6 text-center">
              <div className="font-display text-5xl font-bold text-primary">350+</div>
              <div className="mt-2 text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="glow-panel col-span-1 overflow-hidden rounded-2xl">
              <img
                src="https://owaisahmadkhan.com/assets/h9-DCRfwim3.jpeg"
                alt="Owais Ahmad Khan speaking"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glow-panel col-span-1 overflow-hidden rounded-2xl">
              <img
                src="https://owaisahmadkhan.com/assets/h5-BBWoL6zN.webp"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="glow-panel col-span-1 flex flex-col items-center justify-center rounded-2xl p-6 text-center">
              <div className="font-display text-5xl font-bold text-primary">18+</div>
              <div className="mt-2 text-sm text-muted-foreground">Years of Coding</div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="border-y border-border/50 bg-secondary/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Transforming Ideas Into Impact</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="glow-panel rounded-2xl p-6">
                <div className="font-display text-4xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Core Expertise</h2>
          <p className="mt-4 text-muted-foreground">
            Two decades honing the qualities that ship great software and lead great teams.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {expertise.map((e) => (
            <div key={e.label} className="glow-panel rounded-2xl p-6">
              <div className="flex items-baseline justify-between">
                <div className="font-display text-lg font-semibold">{e.label}</div>
                <div className="font-display text-2xl font-bold text-primary">{e.score}</div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary" style={{ width: `${e.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="glow-panel rounded-3xl p-10 text-center md:p-16">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Let&apos;s build something world-advancing</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Have an idea, a project, or a team that needs coaching? Reach out — or follow along on the broadcast channels.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Contact me
            </Link>
            <Link to="/broadcast" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">
              Broadcast channels
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
