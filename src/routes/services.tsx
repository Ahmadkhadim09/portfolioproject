import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiReact, SiFigma, SiCloudflare, SiNodedotjs, SiGoogleanalytics, SiShopify } from "react-icons/si";
import { Img } from "@/components/Img";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { GlassCard } from "@/components/GlassCard";
import { motion, useReducedMotion } from "framer-motion";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Owais Ahmad Khan" },
      { name: "description", content: "Premium web development, branding, and digital transformation services." },
      { property: "og:title", content: "Services — Owais Ahmad Khan" },
    ],
  }),
  component: Services,
});

const servicesList = [
  {
    icon: SiReact,
    name: "Web Application Development",
    desc: "Custom, high-performance web apps built with modern stacks (React, Node, Next.js) tailored to your business needs.",
    href: "/contact",
    gradient: "from-fuchsia-500/25 via-violet-500/20 to-sky-500/15",
    iconColor: "text-fuchsia-200",
  },
  {
    icon: SiFigma,
    name: "UI/UX Design & Branding",
    desc: "Pixel-perfect, user-centric designs that elevate your brand and provide seamless interactive experiences.",
    href: "/contact",
    gradient: "from-cyan-500/25 via-sky-500/20 to-indigo-500/15",
    iconColor: "text-cyan-200",
  },
  {
    icon: SiCloudflare,
    name: "Digital Transformation",
    desc: "Modernizing legacy systems to agile, cloud-native solutions that empower data-driven growth.",
    href: "/contact",
    gradient: "from-violet-500/25 via-purple-500/20 to-pink-500/15",
    iconColor: "text-violet-200",
  },
  {
    icon: SiNodedotjs,
    name: "SaaS Platform Engineering",
    desc: "End-to-end architecture and deployment of scalable SaaS products from MVP to enterprise grade.",
    href: "/contact",
    gradient: "from-blue-500/25 via-indigo-500/20 to-cyan-500/15",
    iconColor: "text-blue-200",
  },
  {
    icon: SiGoogleanalytics,
    name: "IT Strategy & Consulting",
    desc: "Expert guidance on tech stacks, team leadership, and product direction for measurable outcomes.",
    href: "/contact",
    gradient: "from-emerald-500/25 via-teal-500/20 to-cyan-500/15",
    iconColor: "text-emerald-200",
  },
  {
    icon: SiShopify,
    name: "E-Commerce Solutions",
    desc: "Highly optimized, conversion-focused online stores with seamless payment and inventory integrations.",
    href: "/contact",
    gradient: "from-amber-500/25 via-orange-500/20 to-rose-500/15",
    iconColor: "text-amber-200",
  },
];

function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section className="relative flex min-h-[55vh] items-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <Img
            src="/images/gallery/00000049-PHOTO-2026-07-25-18-04-54.jpg"
            alt="Services"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0714] via-[#0D0714]/75 to-[#0D0714]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0714] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <RevealOnScroll>
            <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-violet-300">
              Services
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-tight text-white md:text-6xl tracking-tight">
              Transforming visions into <span className="gradient-text">digital realities</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/55 leading-relaxed">
              Elevate your business with my specialized tech and design services.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 section-spacing pb-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {servicesList.map((s, i) => (
            <RevealOnScroll key={s.name} delay={i * 0.1} className="h-full">
              <a href={s.href} className="block h-full">
                <GlassCard className="p-7 group h-full flex flex-col cursor-pointer !rounded-[20px]">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} ${s.iconColor} transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110`}>
                      <s.icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/20 transition-all group-hover:text-violet-400 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <div className="mt-6 font-display text-xl font-bold text-white">{s.name}</div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 flex-grow">{s.desc}</p>
                  <div className="mt-8 relative overflow-hidden h-px w-full bg-white/5">
                    <div className="absolute left-0 top-0 h-full w-0 bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </GlassCard>
              </a>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
