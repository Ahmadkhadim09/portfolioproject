import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Play, Mail, Phone, MessageCircle } from "lucide-react";
import { FaCode, FaPaintBrush, FaRocket, FaChartLine, FaUsers, FaClock, FaPalette, FaMicrochip, FaLayerGroup } from "react-icons/fa";
import { Img } from "@/components/Img";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { GlassCard } from "@/components/GlassCard";
import { galleryData } from "@/data/galleryData";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { toast } from "sonner";
import { EmailService } from "@/lib/EmailService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zai Systems — Premium Web Development Agency" },
      { name: "description", content: "Futuristic and premium web development agency delivering high-end SaaS applications." },
    ],
  }),
  component: Home,
});

const features = [
  {
    title: "AI Integrations",
    desc: "Integrating LLMs, chatbots, and AI APIs into modern applications.",
    icon: FaMicrochip,
    accentClass: "bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-400",
  },
  {
    title: "Workflow Automation",
    desc: "Automating business processes with n8n, APIs, and intelligent workflows.",
    icon: FaLayerGroup,
    accentClass: "bg-gradient-to-br from-cyan-500/30 to-blue-500/20 text-cyan-400",
  },
  {
    title: "AI Agents",
    desc: "Developing autonomous AI assistants that can analyze, decide, and execute tasks.",
    icon: FaChartLine,
    accentClass: "bg-gradient-to-br from-fuchsia-500/30 to-violet-500/20 text-fuchsia-400",
  },
  {
    title: "Full-Stack Development",
    desc: "Building scalable React, Node.js, and database-powered applications.",
    icon: FaCode,
    accentClass: "bg-gradient-to-br from-amber-500/30 to-orange-500/20 text-amber-400",
  },
  {
    title: "Cloud Deployment",
    desc: "Deploying secure, production-ready applications with modern DevOps practices.",
    icon: FaRocket,
    accentClass: "bg-gradient-to-br from-emerald-500/30 to-lime-500/20 text-emerald-400",
  },
];

const technologies = [
  {
    label: "Enterprise Automation",
    desc: "Streamlining internal operations with intelligent workflows, document processing, and AI-driven decision making.",
    icon: FaLayerGroup,
    accentClass: "from-cyan-500/30 to-blue-500/20 text-cyan-400",
  },
  {
    label: "Maintenance & Scaling",
    desc: "Providing continuous monitoring, updates, security improvements, and infrastructure scaling as your business grows.",
    icon: FaMicrochip,
    accentClass: "from-emerald-500/30 to-lime-500/20 text-emerald-400",
  },
];

const podcastVideos = [
  { id: "0IpEIRkiCbk", title: "Vision, Leadership & Building Zai Systems" },
  { id: "3kHrsk89tIY", title: "The Future of IT Coaching" },
  { id: "JDCrWpmznI8", title: "From Developer to CEO" },
  { id: "ydnSXopfnjU", title: "Empowering Teams Through Technology" },
  { id: "RUeJFhg-7Sk", title: "Delivering 350+ Projects" },
  { id: "FIUQggDtWVA", title: "People-Centric Leadership" },
];

// ─── Hero Content Configuration ─── (Easy to modify)
const heroContent = {
  badge: "Elevating Digital Experiences",
  headline: "Crafting\nPremium Digital\nExperiences.",
  description:
    "I build modern websites, web applications, and digital experiences that combine elegant design, exceptional performance, and cutting-edge technology to help businesses grow online.",
  primaryCTA: { text: "Get In Touch", href: "/contact" },
  secondaryCTA: { text: "View Portfolio", href: "/gallery" },
};

const heroStats = [
  { value: "350+", label: "Projects Completed", icon: FaChartLine, accentClass: "bg-gradient-to-br from-amber-500/30 to-orange-500/20 text-amber-400" },
  { value: "120+", label: "Happy Clients", icon: FaUsers, accentClass: "bg-gradient-to-br from-cyan-500/30 to-sky-500/20 text-cyan-400" },
  { value: "18+", label: "Years Experience", icon: FaClock, accentClass: "bg-gradient-to-br from-emerald-500/30 to-lime-500/20 text-emerald-400" },
];

const headlineLines = [
  [{ text: "Crafting", accent: false }],
  [
    { text: "Premium", accent: false },
    { text: "Digital", accent: true },
  ],
  [{ text: "Experiences.", accent: false }],
];

function AnimatedHeadline({ reducedMotion }: { reducedMotion: boolean | null }) {
  let wordIndex = 0;

  return (
    <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-black leading-[1.08] tracking-[-0.03em] text-white">
      {headlineLines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.map((word) => {
            const idx = wordIndex++;
            return (
              <motion.span
                key={idx}
                initial={reducedMotion ? false : { opacity: 0, y: 28, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.15 + idx * 0.2,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1] as any,
                }}
                className={`mr-[0.28em] inline-block ${word.accent
                  ? "bg-gradient-to-r from-[#A855F7] via-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent"
                  : ""
                  }`}
              >
                {word.text}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function Home() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const wordCount = headlineLines.reduce((n, line) => n + line.length, 0);
  const contentDelay = 0.15 + wordCount * 0.2 + 0.25;

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
      };

  return (
    <div className="relative">
      {/* Mouse Follow Glow */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-50 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/[0.1] blur-[100px]"
          style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        />
      )}

      {/* ─── Hero Section ─── */}
      <section className="relative flex min-h-[calc(100vh-90px)] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Img
            src="/images/MainHomeImage.png"
            alt="Zai Systems"
            className="hero-photo-mask h-full w-[112%] max-w-none origin-[62%_22%] scale-[0.75] object-cover object-[62%_22%]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0714] via-[#0D0714]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0714] via-[#0D0714]/20 to-[#0D0714]/25" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_72%_40%,rgba(139,92,246,0.12),transparent_65%)]" />
          <div className="hero-grid-lines pointer-events-none absolute inset-y-0 right-0 w-[42%] opacity-[0.14]" />
          <div className="hero-dots-pattern pointer-events-none absolute inset-y-0 right-0 w-[38%] opacity-[0.22]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 pb-14 sm:py-12 sm:pb-16">
          <div className="relative max-w-xl">
            <div
              className="hero-text-scrim pointer-events-none absolute -inset-x-6 -inset-y-5 rounded-[28px] sm:-inset-x-8 sm:-inset-y-6"
              aria-hidden
            />

            <div className="relative flex flex-col gap-5">
              <motion.div
                {...fadeUp(0)}
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-sm sm:text-xs"
              >
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                {heroContent.badge}
              </motion.div>

              <AnimatedHeadline reducedMotion={shouldReduceMotion} />

              <motion.p
                {...fadeUp(contentDelay)}
                className="max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:text-base md:text-lg text-justify"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                {...fadeUp(contentDelay + 0.15)}
                className="mt-3 flex w-full flex-col items-start justify-start gap-3 sm:mt-4 sm:flex-row"
              >
                <Link
                  to={heroContent.primaryCTA.href}
                  className="gradient-btn gradient-btn-hover inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white transition-all sm:w-auto sm:px-7 sm:py-3.5"
                >
                  {heroContent.primaryCTA.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to={heroContent.secondaryCTA.href}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto sm:px-7 sm:py-3.5"
                >
                  <Play className="h-4 w-4" />
                  {heroContent.secondaryCTA.text}
                </Link>
              </motion.div>

              <motion.div
                {...fadeUp(contentDelay + 0.3)}
                className="mt-1 grid grid-cols-3 gap-2.5 pb-1 sm:mt-2 sm:gap-3"
              >
                {heroStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    {...fadeUp(contentDelay + 0.35 + i * 0.08)}
                  >
                    <GlassCard className="!rounded-2xl border border-white/10 bg-white/[0.06] p-4 sm:p-[1.125rem] flex flex-col items-center text-center">
                      <div className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl ${stat.accentClass}`}>
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <p className="text-xl font-semibold leading-none text-white sm:text-2xl">{stat.value}</p>
                      <p className="mt-1.5 text-[0.65rem] leading-snug text-white/60 sm:text-xs">{stat.label}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Overview ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8" style={{
        backgroundImage: 'url(/images/mainhomeimage3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '24px'
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0714]/80 via-[#0D0714]/75 to-[#0D0714]/70 rounded-3xl" />
        <div className="relative z-10">
          <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
              Building Intelligent Digital Solutions
            </h2>
            <p className="mt-5 text-[#A8A8B8] text-lg">
              Leveraging cutting-edge AI, intelligent automation, and modern web development to build scalable applications that drive efficiency, optimize business processes, and create exceptional digital experiences.
            </p>
          </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
          {features.map((f, i) => (
            <RevealOnScroll key={f.title} delay={i * 0.1}>
              <GlassCard className="p-8 h-full flex flex-col items-center text-center group cursor-default">
                <div className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${f.accentClass}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">{f.title}</h3>
                <p className="mt-3 text-[#A8A8B8] leading-relaxed flex-1 text-justify">{f.desc}</p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
        </div>
      </section>

      {/* ─── Deep Dive Section ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-2 auto-rows-fr">
          {technologies.map((tech, i) => (
            <RevealOnScroll key={tech.label} delay={i * 0.15}>
              <GlassCard className="p-10 h-full group relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity duration-500 group-hover:opacity-10 text-white">
                  <tech.icon className="h-40 w-40 transform translate-x-4 -translate-y-4" />
                </div>

                <div className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${tech.accentClass}`}>
                  <tech.icon className="h-6 w-6" />
                </div>

                <h3 className="font-display text-3xl font-bold text-white tracking-tight relative z-10">{tech.label}</h3>
                <p className="mt-4 text-[#A8A8B8] text-lg max-w-sm relative z-10 text-justify">{tech.desc}</p>

                <div className="mt-12 relative z-10 w-full flex justify-center">
                  <div className="w-10 h-1 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] transition-all duration-300 group-hover:w-20" />
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ─── Education Section ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        {/* Floating Glowing Particles */}
        <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'visible' }}>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${139 + Math.random() * 60},${92 + Math.random() * 60},${246},0.4), transparent)`,
                filter: `blur(${Math.random() * 30 + 20}px)`,
                boxShadow: `0 0 ${Math.random() * 40 + 20}px rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
        <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Education & Foundation
          </h2>
          <p className="mt-5 text-[#A8A8B8] text-lg">
            Grounded in rigorous computer science education from Pakistan's premier technology university.
          </p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          <RevealOnScroll delay={0}>
            <GlassCard className="p-8 sm:p-12 text-center h-full">
              <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl gradient-btn text-white shadow-lg shadow-purple-500/20 overflow-hidden mb-6 transition-transform duration-300">
                <img src="/images/fastlogo.png" alt="FAST Logo" className="h-full w-full object-contain" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">FAST - NUCES</h3>
              <p className="mt-3 text-[#A8A8B8] text-lg font-semibold">
                Master of Science in Computer Science
              </p>
              <p className="mt-2 text-white/70 text-sm">
                National University of Computer and Emerging Sciences<br />
                Lahore Campus
              </p>
            </GlassCard>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <GlassCard className="p-8 sm:p-12 text-center h-full">
              <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-2xl gradient-btn text-white shadow-lg shadow-purple-500/20 overflow-hidden mb-6 transition-transform duration-300 bg-white/10">
                <img src="/images/uollogo.png" alt="UOL Logo" className="h-full w-full object-contain" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white tracking-tight">University of Lahore</h3>
              <p className="mt-3 text-[#A8A8B8] text-lg font-semibold">
                Bachelor in Software Engineering
              </p>
              <p className="mt-2 text-white/70 text-sm">
                Computer Software Engineering<br />
                Lahore
              </p>
            </GlassCard>
          </RevealOnScroll>
        </div>
        </div>
      </section>

      {/* ─── Awards & Certifications Section ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Recognition &amp; Achievements
          </h2>
          <p className="mt-5 text-[#A8A8B8] text-lg">
            Awards and certifications that reflect our commitment to excellence.
          </p>
        </RevealOnScroll>

        <div className="w-full overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.01)" }}>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[
              "/images/corectaward.png",
              "/images/corraward2.png",
              "/images/corraward3.png",
              "/images/corraward4.png",
              "/images/cert-1.png",
              "/images/cert-2.png",
              "/images/cert-3.png",
              "/images/cert4.png",
            ].map((img, i) => (
              <div key={i} className="mx-6 flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-xl glow-panel p-4">
                <Img
                  src={img}
                  alt={`Award ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── YouTube Podcast Banner ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Latest Podcast Episodes
          </h2>
          <p className="mt-5 text-[#A8A8B8] text-lg">
            Insights and stories from recent podcast appearances.
          </p>
        </RevealOnScroll>

        <div className="w-full overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.01)" }}>
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...podcastVideos, ...podcastVideos, ...podcastVideos].map((v, i) => (
              <a key={`${v.id}-${i}`} href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer" className="mx-4 block w-72 shrink-0 overflow-hidden rounded-xl glass-card transition-all hover:scale-105 hover:border-purple-500/20">
                <div className="relative aspect-video w-full group">
                  <Img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white">
                      <Play className="h-5 w-5 ml-0.5" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services Section ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Services &amp; Expertise
          </h2>
          <p className="mt-5 text-[#A8A8B8] text-lg">
            Comprehensive solutions tailored to your digital transformation needs.
          </p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 auto-rows-fr">
          {[
            {
              title: "AI & Generative AI",
              icon: FaMicrochip,
              skills: [
                "LLM Applications | RAG Systems | AI Agents | AI Voice Agents",
                "LangChain | LlamaIndex | Vector Databases",
                "Prompt Engineering | Function Calling | Multi-Agent Systems",
                "Fine-Tuning (LoRA, QLoRA, PEFT)",
                "OpenAI GPT-4o | Claude 3.5 | Gemini | LLaMA | Mistral",
                "Hallucination Detection & AI Evaluation"
              ],
              desc: "Building intelligent AI solutions that transform business challenges into competitive advantages."
            },
            {
              title: "Data Science & Machine Learning",
              icon: FaChartLine,
              skills: [
                "Python (NumPy, Pandas, scikit-learn, TensorFlow, PyTorch)",
                "ML: SVM, Random Forest, Gradient Boosting, Regression",
                "Deep Learning: CNN, RNN/LSTM, Transformers",
                "NLP: Text Classification, Sentiment Analysis",
                "Data Mining, Feature Engineering & Predictive Modeling",
                "AI-driven analytics & automation systems"
              ],
              desc: "Turning complex data into actionable intelligence through advanced analytics and machine learning."
            },
            {
              title: "Full-Stack & Cloud",
              icon: FaLayerGroup,
              skills: [
                "React.js | Angular | TypeScript",
                "ASP.NET Core | C# | Node.js | Python",
                "REST APIs | Microservices | Secure Authentication",
                "SQL, NoSQL, Neo4j | ETL Pipelines",
                "AWS | Azure | GCP | Docker | CI/CD",
                "Serverless Architecture | Kubernetes Orchestration"
              ],
              desc: "Delivered 100+ projects across AI, SaaS, automation, and enterprise systems for global clients."
            },
            {
              title: "Leadership & Delivery",
              icon: FaUsers,
              skills: [
                "Agile Project Management & Scrum",
                "Product Roadmaps & Technical Strategy",
                "Remote Team Coordination & Mentoring",
                "System Audits & Performance Optimization",
                "Clean, scalable, business-aligned architecture",
                "Stakeholder Management & Risk Mitigation"
              ],
              desc: "Building intelligent, secure, and scalable systems that drive measurable growth — not just writing code."
            },
          ].map((service, i) => (
            <RevealOnScroll key={service.title} delay={i * 0.1}>
              <GlassCard className="p-8 h-full flex flex-col group cursor-default hover:border-white/30 transition-colors">
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 ${i === 0 ? "bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-violet-300" :
                  i === 1 ? "bg-gradient-to-br from-cyan-500/30 to-sky-500/20 text-cyan-300" :
                    i === 2 ? "bg-gradient-to-br from-pink-500/30 to-rose-500/20 text-pink-300" :
                      "bg-gradient-to-br from-orange-500/30 to-amber-500/20 text-orange-300"
                  }`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight">{service.title}</h3>
                <ul className="mt-4 space-y-2 flex-1 text-sm text-[#A8A8B8] text-left">
                  {service.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-violet-400">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[#A8A8B8] text-sm leading-relaxed text-left italic">{service.desc}</p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* ─── Gallery Showcase ─── */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-8">
        <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
            Moments That Matter
          </h2>
          <p className="mt-5 text-[#A8A8B8] text-lg">
            Highlights from our latest projects and collaborations.
          </p>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
          {galleryData.slice(0, 4).map((image, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <Link to="/gallery" className="block">
                <div className="glow-panel group relative overflow-hidden rounded-2xl aspect-square cursor-pointer">
                  <Img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-white font-semibold">{image.title}</p>
                      <p className="text-sm text-white/60 mt-1">{image.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-8 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#8B5CF6]/50 transition-all duration-300"
          >
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </Link>
        </RevealOnScroll>
      </section>

      {/* ─── Contact Section ─── */}
      <ContactSection />
    </div>
  );
}

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }
  if (!fields.email.trim() || !EMAIL_REGEX.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.subject.trim() || fields.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }
  if (!fields.message.trim() || fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }
  return errors;
}

function ContactSection() {
  const [isSending, setIsSending] = useState(false);
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSending(true);

    const phoneNumber = "03224221287";
    const message = `Hello, I am ${fields.name}.\nEmail: ${fields.email}\nSubject: ${fields.subject}\n\n${fields.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening WhatsApp now", {
        description: "Your message has been prepared for Owais.",
      });
      setFields({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Could not open WhatsApp automatically. Please try again.", {
        description: "You can also contact us directly on WhatsApp.",
      });
    } finally {
      setIsSending(false);
    }
  }

  const inputClass = (hasError?: string) =>
    `mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/20 bg-white/[0.03] ${hasError
      ? "border-red-500/50 focus:border-red-500/70 focus:shadow-lg focus:shadow-red-500/5"
      : "border-white/[0.06] focus:border-purple-500/40 focus:shadow-lg focus:shadow-purple-500/5"
    }`;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
      <RevealOnScroll className="max-w-2xl mx-auto text-center mb-12">
        <h2 className="font-display text-4xl font-bold text-white tracking-tight sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-5 text-[#A8A8B8] text-lg">
          Have a project in mind? Let's discuss how we can help bring your vision to life.
        </p>
      </RevealOnScroll>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevealOnScroll>
            <GlassCard className="p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-white/60">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass(errors.name)}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wide text-white/60">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className={inputClass(errors.email)}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/60">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className={inputClass(errors.subject)}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/60">Message</label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows={5}
                    className={inputClass(errors.message)}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-8 py-3 text-base font-semibold text-white hover:shadow-lg hover:shadow-[#8B5CF6]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </RevealOnScroll>
        </div>

        <div>
          <RevealOnScroll delay={0.2}>
            <div className="space-y-4">
              <GlassCard className="p-6 !rounded-2xl border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 text-emerald-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50">Email</p>
                    <p className="text-white font-semibold">owais.ahmad60@gmail.com</p>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-6 !rounded-2xl border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 text-blue-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50">Phone</p>
                    <p className="text-white font-semibold">0322 4221287</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
