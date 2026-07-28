import { createFileRoute } from "@tanstack/react-router";
import { FaPlay } from "react-icons/fa";
import { Img } from "@/components/Img";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { GlassCard } from "@/components/GlassCard";
import { motion, useReducedMotion } from "framer-motion";

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
  { id: "0IpEIRkiCbk", title: "Vision, Leadership & Building Zai Systems" },
  { id: "3kHrsk89tIY", title: "The Future of IT Coaching" },
  { id: "JDCrWpmznI8", title: "From Developer to CEO" },
  { id: "ydnSXopfnjU", title: "Empowering Teams Through Technology" },
  { id: "RUeJFhg-7Sk", title: "Delivering 350+ Projects" },
  { id: "FIUQggDtWVA", title: "People-Centric Leadership" },
];

function Podcast() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <>
      <section className="relative flex min-h-[60vh] items-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <Img src="/images/mainpodcastimage.jpg" alt="Podcast Background" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/75 to-[#0B0F19]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <RevealOnScroll className="max-w-2xl">
            <span className="inline-flex rounded-full shimmer-badge px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70">Featured Conversations</span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl tracking-tight">
              Conversations on leadership, technology &amp; <span className="gradient-text">growth</span>.
            </h1>
            <p className="mt-6 text-lg text-white/55 leading-relaxed md:text-xl">A curated collection of podcast appearances and talks.</p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 section-spacing pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {videos.map((v, i) => (
            <RevealOnScroll key={v.id} delay={i * 0.1}>
              <a href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="block">
                <GlassCard className="group overflow-hidden !rounded-2xl">
                  <div className="relative aspect-video overflow-hidden rounded-t-[23px]">
                    <Img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} placeholderLabel={v.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full gradient-btn text-white shadow-xl"><FaPlay className="ml-0.5 h-5 w-5" /></span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-display text-base font-semibold text-white">{v.title}</div>
                    <div className="mt-1.5 text-xs font-medium gradient-text">Watch on YouTube →</div>
                  </div>
                </GlassCard>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <div className="w-full overflow-hidden border-t border-white/[0.04] py-7" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...videos, ...videos, ...videos, ...videos].map((v, i) => (
            <a key={`${v.id}-${i}`} href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="mx-3 block w-56 shrink-0 overflow-hidden rounded-xl glass-card transition-all hover:scale-105 hover:border-purple-500/20">
              <div className="relative aspect-video w-full">
                <Img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
