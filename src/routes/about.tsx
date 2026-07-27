import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Img } from "@/components/Img";
import { ArrowRight, GraduationCap, CheckCircle2, Cloud, Server, Shield, FileCode } from "lucide-react";
import { FaChessKnight, FaLaptopCode, FaBuilding, FaChalkboardTeacher } from "react-icons/fa";
import { FaUsersGear, FaShieldHalved } from "react-icons/fa6";
import { SiReact, SiTypescript, SiNodedotjs, SiMongodb, SiPostgresql, SiNextdotjs, SiTailwindcss, SiJavascript, SiPython, SiLaravel, SiDocker, SiGit } from "react-icons/si";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { GlassCard } from "@/components/GlassCard";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Owais Ahmad Khan" },
      { name: "description", content: "About Owais Ahmad Khan: CTO of Zai Systems with 18+ years of expertise across 350+ projects." },
    ],
  }),
  component: About,
});

const mainSkills = [
  { title: "Strategy", blurb: "Brand, growth, and business clarity", icon: FaChessKnight, accentClass: "bg-gradient-to-br from-fuchsia-500/25 to-violet-500/15 text-fuchsia-300" },
  { title: "Technology", blurb: "Modern platforms, product engineering, delivery", icon: FaLaptopCode, accentClass: "bg-gradient-to-br from-cyan-500/25 to-sky-500/15 text-cyan-300" },
  { title: "Leadership", blurb: "Teams, mentoring, and product direction", icon: FaUsersGear, accentClass: "bg-gradient-to-br from-amber-500/25 to-orange-500/15 text-amber-300" },
  { title: "Execution", blurb: "Delivery excellence and measurable outcomes", icon: FaShieldHalved, accentClass: "bg-gradient-to-br from-emerald-500/25 to-lime-500/15 text-emerald-300" },
];

const education = [
  { school: "FAST NUCES Lahore", degree: "Master of Science in Software Engineering", year: "2016-2018", logo: "/images/fast-nuces-logo.svg" },
  { school: "The University of Lahore", degree: "Bachelor of Science in Computer Science", year: "2012-2016", logo: "/images/uol-logo.svg" },
];

const experience = [
  { company: "ZAI Systems (SMC-Private) Limited", role: "Founder / CEO", period: "Jan 2015 - Present", logo: "/images/mainonelogo.webp", accentClass: "bg-gradient-to-br from-fuchsia-500/20 to-violet-500/10 text-fuchsia-300" },
  { company: "Soloinsight - Cloud Gate Platform", role: "Technical Project Manager", period: "Feb 2023 - Present", logo: "https://www.google.com/s2/favicons?sz=128&domain=soloinsight.com", accentClass: "bg-gradient-to-br from-cyan-500/20 to-sky-500/10 text-cyan-300" },
  { company: "National Vocational and Technical Training Commission (NAVTTC)", role: "Mentor", period: "May 2023 - Present", logo: "https://www.google.com/s2/favicons?sz=128&domain=navttc.org.pk", accentClass: "bg-gradient-to-br from-amber-500/20 to-orange-500/10 text-amber-300" },
  { company: "EVS Professional Training Institute", role: "Mentor", period: "Aug 2021 - Mar 2023", logo: FaChalkboardTeacher, accentClass: "bg-gradient-to-br from-emerald-500/20 to-lime-500/10 text-emerald-300" },
  { company: "Rodeo Logistics", role: "Project Manager / Scrum Master", period: "May 2022 - Jan 2023", logo: "/images/rodeo-logistics-logo.svg", accentClass: "bg-gradient-to-br from-rose-500/20 to-pink-500/10 text-rose-300" },
  { company: "SIMPLEX LOGIX", role: "Senior Software Engineer / Project Lead", period: "Oct 2020 - Apr 2022", logo: "https://www.google.com/s2/favicons?sz=128&domain=simplexlogix.com", accentClass: "bg-gradient-to-br from-indigo-500/20 to-blue-500/10 text-indigo-300" },
];

const techStack = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, color: "#13AA52" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Java", icon: FileCode, color: "#007396" },
  { name: "AWS", icon: Server, color: "#FF9900" },
  { name: "Azure", icon: Cloud, color: "#0078D4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F1502F" },
  { name: "Jira", icon: Shield, color: "#0052CC" },
];

const skills = [
  {
    category: "Frontend",
    items: ["HTML 5", "CSS3", "Sass", "Bootstrap 5", "JavaScript", "ECMAScript", "AJAX", "JSON", "jQuery", "React Js", "Redux", "Material UI", "TypeScript", "Angular", "Vue JS"],
  },
  {
    category: "Backend",
    items: ["Php (Laravel)", "Java", "C Sharp (C#)", "Asp.net Core", "Asp.net MVC5", "Node Js", "C/ C++ Language", "Python"],
  },
  {
    category: "Database",
    items: ["SQL (SQL Server)", "My SQL", "MongoDB", "Firebase", "Azure Data Studio"],
  },
  {
    category: "Deployment",
    items: ["DevOps", "AWS", "Azure", "Heroku", "Salesforce", "Netlify", "Git/GitHub", "Namecheap", "GoDaddy", "Bluehost", "Smarter Asp.net"],
  },
  {
    category: "Management",
    items: ["Agile Scrum Master", "Product Owner", "Technical Project Manager", "Technical Product Manager", "Technical Program Manager", "Technical Portfolio Manager", "Jira Expert", "Time Management", "Communication", "Leadership", "Team Management", "Marketing Skills"],
  },
];

type TabType = "about" | "education" | "experience" | "skills" | "awards";

function About() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const tabs: { id: TabType; label: string }[] = [
    { id: "about", label: "About me" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <>
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Img
            src="/images/aboutimage1.webp"
            alt="About Owais"
            className="h-full w-full object-cover object-[70%_top]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0714] via-[#0D0714]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0714] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
          <RevealOnScroll className="max-w-2xl">
            <h1 className="font-display text-5xl font-bold leading-[1.08] text-white md:text-6xl lg:text-[4.5rem] tracking-tight">
              You&apos;re More Than a Brand.
              <br />
              You&apos;re a <span className="gradient-text">Movement</span>.
            </h1>
            <p className="mt-7 max-w-[90%] text-lg text-white/60 md:text-xl leading-relaxed">
              Helping you turn connections into opportunities through authentic branding.
            </p>

            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-5 rounded-full border border-white/10 bg-white/5 py-2.5 pl-7 pr-2.5 font-medium text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/10"
              >
                Request a Call
                <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-btn text-white shadow-lg shadow-violet-500/20">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Interactive Resume Section ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-28 pt-10">
        <RevealOnScroll className="mb-12 text-center">
          <span className="inline-flex font-semibold tracking-widest uppercase text-violet-400 text-sm mb-3">
            18+ Years of Experience
          </span>
          <h2 className="font-display text-5xl font-bold text-white tracking-tight">
            My <span className="gradient-text">Resume</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-[12px] py-4 px-6 text-sm font-semibold transition-all duration-300 ${activeTab === tab.id
                  ? "bg-[#221230] text-white border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                  : "bg-white/[0.02] text-white/50 border border-white/5 hover:bg-white/[0.06] hover:text-white"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {activeTab === "about" && (
                <div className="space-y-12 max-w-4xl mx-auto">
                  <GlassCard className="p-8 !rounded-[20px]">
                    <h3 className="font-display text-3xl font-bold text-white mb-6">
                      Building the operating system for <span className="gradient-text">data-driven</span> companies.
                    </h3>
                    <p className="text-lg leading-[1.8] text-white/60 text-justify">
                      I am the CTO of Zai Systems, a trailblazing technology company redefining digital transformation
                      across industries. As a visionary leader with a passion for innovation, I have built my career at the
                      intersection of front-line software solutions and people-centric leadership. My journey has been driven by a
                      commitment to empowering businesses through front-line technology and fostering meaningful connections with
                      people at every step of the way.
                    </p>
                  </GlassCard>

                  <div className="grid gap-4 md:grid-cols-2 auto-rows-fr">
                    {mainSkills.map((skill, i) => {
                      const Icon = skill.icon;
                      return (
                        <GlassCard key={i} className="p-6 h-full !rounded-[20px] flex flex-col group">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${skill.accentClass} group-hover:scale-110 transition-transform`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-display text-xl font-semibold text-white">{skill.title}</h3>
                          </div>
                          <p className="text-sm leading-relaxed text-white/55">{skill.blurb}</p>
                        </GlassCard>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === "education" && (
                <div className="grid gap-5 max-w-3xl mx-auto">
                  {education.map((edu, i) => (
                    <GlassCard key={i} className="p-8 !rounded-[20px] transition-all hover:bg-white/[0.08] hover:border-violet-500/30">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white p-2 shadow-sm">
                          <Img src={edu.logo} alt={`${edu.school} logo`} className="h-full w-full object-contain" />
                        </div>
                        <div className="flex-grow">
                          <div className="mb-2 inline-flex text-xs font-semibold tracking-widest gradient-text">
                            {edu.year}
                          </div>
                          <h4 className="font-display text-xl font-bold text-white mb-1">{edu.degree}</h4>
                          <p className="text-white/60 font-medium">{edu.school}</p>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              )}

              {activeTab === "experience" && (
                <div className="grid gap-5 max-w-3xl mx-auto">
                  {experience.map((exp, i) => {
                    const LogoIcon = typeof exp.logo === "string" ? null : exp.logo;
                    return (
                      <GlassCard key={i} className="p-8 !rounded-[20px] transition-all hover:bg-white/[0.08] hover:border-violet-500/30">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                          <div className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/90 p-2 shadow-sm ${exp.accentClass}`}>
                            {LogoIcon ? (
                              <LogoIcon className="h-6 w-6" />
                            ) : (
                              <Img src={exp.logo as string} alt={`${exp.company} logo`} className="h-full w-full object-contain" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="mb-2 inline-flex text-xs font-semibold tracking-widest gradient-text">
                              {exp.period}
                            </div>
                            <h4 className="font-display text-xl font-bold text-white mb-1">{exp.role}</h4>
                            <p className="text-white/60 font-medium">{exp.company}</p>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              )}

              {activeTab === "skills" && (
                <div className="space-y-8">
                  {/* Tech Stack Banner */}
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                    <div className="tech-banner-wrapper">
                      <motion.div 
                        className="flex gap-8 py-8"
                        animate={{ x: [0, -2000] }}
                        transition={{ 
                          duration: 30, 
                          repeat: Infinity, 
                          ease: "linear"
                        }}
                      >
                        {[...techStack, ...techStack].map((tech, idx) => {
                          const Icon = tech.icon;
                          return (
                            <div key={idx} className="flex-shrink-0 flex flex-col items-center gap-3 px-8">
                              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-all hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-violet-500/20" style={{ boxShadow: `0 0 0 1px ${tech.color}22 inset` }}>
                                <Icon className="h-8 w-8" style={{ color: tech.color }} />
                              </div>
                              <span className="text-xs font-medium text-white/70 text-center whitespace-nowrap">{tech.name}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid gap-5 md:grid-cols-2 auto-rows-fr">
                    {skills.map((skillGroup, idx) => (
                      <GlassCard key={idx} className="p-6 h-full flex flex-col !rounded-[20px]">
                        <h3 className="mb-5 flex items-center gap-3 font-display text-2xl font-bold text-white">
                          <CheckCircle2 className="h-5 w-5 text-violet-400" /> {skillGroup.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.items.map((skill, i) => (
                            <span
                              key={i}
                              className="rounded-[10px] border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/70 transition-all hover:bg-violet-500/20 hover:text-white hover:border-violet-500/40 cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 text-center">
          <Link to="/awards" className="inline-flex rounded-full px-8 py-3 text-sm font-semibold gradient-btn gradient-btn-hover text-white transition-all">
            View Awards &amp; Achievements
          </Link>
        </div>
      </section>
    </>
  );
}
