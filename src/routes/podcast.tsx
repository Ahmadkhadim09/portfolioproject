import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";

export const Route = createFileRoute("/podcast")({
  head: () => ({
    meta: [
      { title: "Podcast — Owais Ahmad Khan" },
      { name: "description", content: "Featured podcast appearances and conversations with Owais Ahmad Khan." },
      { property: "og:title", content: "Podcast — Owais Ahmad Khan" },
      { property: "og:description", content: "Featured podcast appearances and conversations." },
    ],
  }),
  component: Podcast,
});

const videos = [
  { id: "N1i5cabbZJM", title: "Vision, Leadership & Building Zai Systems" },
  { id: "sO_YCYUsXhI", title: "The Future of IT Coaching" },
  { id: "KU3E895Cll4", title: "From Developer to CEO" },
  { id: "8CwhVYMVfeU", title: "Empowering Teams Through Technology" },
  { id: "_iatU4wbwrA", title: "Delivering 350+ Projects" },
  { id: "jfB1K1bqfnY", title: "People-Centric Leadership" },
  { id: "dyX6XU0cpWI", title: "Innovation in Digital Transformation" },
];

function Podcast() {
  return (
    <>
      <section className="diagonal-bg mx-auto max-w-7xl px-6 py-20">
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          Featured Podcast
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
          Conversations on leadership, technology &amp; growth.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          A curated collection of podcast appearances and talks. Click any card to watch on YouTube.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <a
              key={v.id}
              href={`https://youtu.be/${v.id}`}
              target="_blank"
              rel="noreferrer"
              className="glow-panel group overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="font-display text-base font-semibold">{v.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">Watch on YouTube →</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
