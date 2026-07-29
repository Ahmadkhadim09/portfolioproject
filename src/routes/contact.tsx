import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Loader2 } from "lucide-react";
import { FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState, type FormEvent, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Img } from "@/components/Img";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { GlassCard } from "@/components/GlassCard";
import { motion, useReducedMotion } from "framer-motion";
import { EmailService } from "@/lib/EmailService";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Owais Ahmad Khan" },
      { name: "description", content: "Get in touch with Owais Ahmad Khan for speaking, coaching, and Zai Systems inquiries." },
      { property: "og:title", content: "Contact — Owais Ahmad Khan" },
      { property: "og:description", content: "Reach out for speaking, coaching and business inquiries." },
    ],
  }),
  component: Contact,
});

const channels = [
  { icon: FaEnvelope, label: "Email", value: "owais.ahmad60@gmail.com", href: "mailto:owais.ahmad60@gmail.com", accentClass: "bg-gradient-to-br from-fuchsia-500/25 to-violet-500/15 text-fuchsia-200" },
  { icon: FaPhone, label: "Phone", value: "0322 4221287", href: "tel:03224221287", accentClass: "bg-gradient-to-br from-cyan-500/25 to-sky-500/15 text-cyan-200" },
  { icon: FaGlobe, label: "Website", value: "zaisystems.com", href: "https://zaisystems.com", accentClass: "bg-gradient-to-br from-emerald-500/25 to-lime-500/15 text-emerald-200" },
  { icon: FaLinkedin, label: "LinkedIn", value: "linkedin.com/in/owaisahmadkhan", href: "https://linkedin.com/in/owaisahmadkhan", accentClass: "bg-gradient-to-br from-indigo-500/25 to-blue-500/15 text-indigo-200" },
  { icon: FaInstagram, label: "Instagram", value: "@theowaisahmadkhan", href: "https://www.instagram.com/theowaisahmadkhan/", accentClass: "bg-gradient-to-br from-amber-500/25 to-orange-500/15 text-amber-200" },
  { icon: FaLocationDot, label: "Location", value: "Lahore, Pakistan", href: "#", accentClass: "bg-gradient-to-br from-rose-500/25 to-pink-500/15 text-rose-200" },
];

interface FormFields {
  [key: string]: string;
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

function Contact() {
  const shouldReduceMotion = useReducedMotion();
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
    // Clear error on change
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
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Img
            src="/images/conatctmainimage.jpg"
            alt="Portrait of Owais Ahmad Khan"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-6 py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <RevealOnScroll className="max-w-3xl">
            <span className="inline-flex rounded-full shimmer-badge px-4 py-1.5 text-xs font-semibold tracking-wide text-white/70">
              Contact
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-white md:text-6xl tracking-tight">
              Let&apos;s connect and build something <span className="gradient-text">remarkable</span>.
            </h1>
            <p className="mt-6 text-lg text-white/55 leading-relaxed">
              Whether it&apos;s a project at Zai Systems, a coaching engagement, or a speaking invitation — I&apos;d love to hear from you.
            </p>
            <motion.div
              className="mt-8 inline-block"
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <a
                href="mailto:owais@zaisystems.com"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-lg transition-all hover:bg-white/10"
              >
                Reach out directly <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div role="button" tabIndex={0} className="group block w-full cursor-pointer" aria-label="Contact Owais Ahmad Khan">
              <GlassCard className="p-4 !rounded-[2rem] transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl h-full">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <Img
                    src="/images/conatctmainimage.jpg"
                    alt="Face portrait of Owais Ahmad Khan"
                    className="h-[420px] w-full object-cover object-center"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 px-2">
                  <div>
                    <p className="text-sm font-semibold text-white">Open for collaboration</p>
                    <p className="text-sm text-white/50">Leadership, consulting, speaking, and digital growth.</p>
                  </div>
                  <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-green-400">
                    Available
                  </span>
                </div>
              </GlassCard>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── Form & Channels ─── */}
      <section className="mx-auto max-w-7xl px-6 section-spacing">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ul className="space-y-3">
              {channels.map((c, i) => (
                <RevealOnScroll key={c.label} delay={i * 0.08}>
                  <li>
                    <a
                      href={c.href}
                      className="glass-card flex items-center gap-4 !rounded-2xl p-5 transition-all hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/5 group"
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.accentClass} transition-transform group-hover:scale-110`}>
                        <c.icon className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs uppercase tracking-wide text-white/35">{c.label}</span>
                        <span className="block font-medium text-white/80">{c.value}</span>
                      </span>
                    </a>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </div>

          <RevealOnScroll delay={0.2} className="lg:col-span-3">
            <GlassCard className="p-8 !rounded-3xl">
              <h2 className="font-display text-2xl font-bold text-white">Send a message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-white/40">Name</span>
                    <input
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      className={inputClass(errors.name)}
                      placeholder="Your name"
                      disabled={isSending}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                    )}
                  </label>
                  <label className="block">
                    <span className="text-xs font-medium text-white/40">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      className={inputClass(errors.email)}
                      placeholder="you@example.com"
                      disabled={isSending}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs font-medium text-white/40">Subject</span>
                  <input
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    className={inputClass(errors.subject)}
                    placeholder="What's this about?"
                    disabled={isSending}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
                  )}
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-white/40">Message</span>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    rows={5}
                    className={inputClass(errors.message)}
                    placeholder="Tell me about your project or idea..."
                    disabled={isSending}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                </label>
                <motion.button
                  type="submit"
                  disabled={isSending}
                  className="flex w-full items-center justify-center gap-2 rounded-full gradient-btn gradient-btn-hover py-3.5 text-sm font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={isSending || shouldReduceMotion ? {} : { scale: 1.01 }}
                  whileTap={isSending || shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
